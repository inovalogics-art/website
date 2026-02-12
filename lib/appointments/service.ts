import { createAdminClient } from '@/lib/supabase/admin';
import { createClient } from '@/lib/supabase/server';
import { Booking, AvailableSlot, BlockedDate } from '@/lib/types';
import {
  getDayOfWeek,
  generateTimeSlots,
  getAvailableSlots,
  isDateInFuture,
  isDateValid,
  normalizeTimeSlot,
} from './helpers';

/**
 * Service layer for appointment and booking operations
 * Handles all database interactions and business logic
 */

export class AppointmentService {
  /**
   * Check if a specific time slot is available
   */
  static async isSlotAvailable(date: string, time: string): Promise<boolean> {
    try {
      // Validate date is not in the past
      if (!isDateValid(date)) {
        throw new Error('Date cannot be in the past');
      }

      const supabase = await createClient();

      // Check for blocked date
      const { data: blockedDate, error: blockedError } = await supabase
        .from('blocked_dates')
        .select('id')
        .eq('date', date)
        .single();

      if (blockedError && blockedError.code !== 'PGRST116') throw blockedError;
      if (blockedDate) return false;

      // Check for existing booking
      const { data: existingBooking, error: bookingError } = await supabase
        .from('bookings')
        .select('id')
        .eq('scheduled_date', date)
        .eq('scheduled_time', normalizeTimeSlot(time))
        .neq('status', 'cancelled')
        .single();

      if (bookingError && bookingError.code !== 'PGRST116') throw bookingError;
      return !existingBooking;
    } catch (error) {
      console.error('[AppointmentService] Error checking slot availability:', error);
      throw new Error('Failed to check slot availability');
    }
  }

  /**
   * Get all available time slots for a specific date
   */
  static async getAvailableSlotsForDate(
    date: string,
    bufferMinutes: number = 15
  ): Promise<{
    available_times: string[];
    blocked: boolean;
    day_name: string;
  }> {
    try {
      if (!isDateValid(date)) {
        return {
          available_times: [],
          blocked: true,
          day_name: new Date(date).toLocaleDateString('en-US', { weekday: 'long' }),
        };
      }

      const supabase = await createClient();
      const dayOfWeek = getDayOfWeek(date);

      // Get available time slots for this day of week
      const { data: slots, error: slotsError } = await supabase
        .from('available_slots')
        .select('*')
        .eq('day_of_week', dayOfWeek)
        .eq('is_active', true);

      if (slotsError) throw slotsError;

      // Check if date is blocked
      const { data: blockedDate, error: blockedError } = await supabase
        .from('blocked_dates')
        .select('id')
        .eq('date', date)
        .single();

      if (blockedError && blockedError.code !== 'PGRST116') throw blockedError;
      if (blockedDate) {
        return {
          available_times: [],
          blocked: true,
          day_name: new Date(date).toLocaleDateString('en-US', { weekday: 'long' }),
        };
      }

      // Get existing bookings for this date
      const { data: bookings, error: bookingsError } = await supabase
        .from('bookings')
        .select('scheduled_time')
        .eq('scheduled_date', date)
        .neq('status', 'cancelled');

      if (bookingsError) throw bookingsError;

      // Generate available time slots
      let allTimeSlots: string[] = [];
      slots?.forEach(slot => {
        const slotsForThisBlock = generateTimeSlots(
          slot.start_time,
          slot.end_time,
          30
        );
        allTimeSlots = [...allTimeSlots, ...slotsForThisBlock];
      });

      const bookedTimes = bookings?.map(b => normalizeTimeSlot(b.scheduled_time)) || [];
      const availableTimes = getAvailableSlots(
        allTimeSlots.map(time => normalizeTimeSlot(time)),
        bookedTimes
      );

      return {
        available_times: availableTimes,
        blocked: false,
        day_name: new Date(date).toLocaleDateString('en-US', { weekday: 'long' }),
      };
    } catch (error) {
      console.error('[AppointmentService] Error getting available slots:', error);
      throw new Error('Failed to get available slots');
    }
  }

  /**
   * Create a new booking/appointment
   */
  static async createBooking(bookingData: {
    category_id?: string | null;
    name: string;
    email: string;
    phone?: string | null;
    company?: string | null;
    scheduled_date: string;
    scheduled_time: string;
    timezone: string;
    meeting_type: string;
    message?: string | null;
  }): Promise<Booking> {
    try {
      // Validate date and time
      if (!isDateValid(bookingData.scheduled_date)) {
        throw new Error('Scheduled date cannot be in the past');
      }

      // Check slot availability
      const isAvailable = await this.isSlotAvailable(
        bookingData.scheduled_date,
        bookingData.scheduled_time
      );

      if (!isAvailable) {
        throw new Error('This time slot is no longer available');
      }

      const supabase = await createClient();

      const { data, error } = await supabase
        .from('bookings')
        .insert({
          category_id: bookingData.category_id || null,
          name: bookingData.name,
          email: bookingData.email,
          phone: bookingData.phone || null,
          company: bookingData.company || null,
          scheduled_date: bookingData.scheduled_date,
          scheduled_time: normalizeTimeSlot(bookingData.scheduled_time),
          timezone: bookingData.timezone,
          meeting_type: bookingData.meeting_type,
          message: bookingData.message || null,
          status: 'pending',
        })
        .select()
        .single();

      if (error) throw error;
      if (!data) throw new Error('Failed to create booking');

      return data;
    } catch (error) {
      console.error('[AppointmentService] Error creating booking:', error);
      if (error instanceof Error) throw new Error(error.message);
      throw new Error('Failed to create booking');
    }
  }

  /**
   * Get all bookings (admin only)
   */
  static async getAllBookings(filters?: {
    status?: string;
    date?: string;
    email?: string;
  }): Promise<Booking[]> {
    try {
      const supabase = createAdminClient();
      let query = supabase
        .from('bookings')
        .select('*, category:categories(*)')
        .order('scheduled_date', { ascending: true });

      if (filters?.status) {
        query = query.eq('status', filters.status);
      }

      if (filters?.date) {
        query = query.eq('scheduled_date', filters.date);
      }

      if (filters?.email) {
        query = query.ilike('email', `%${filters.email}%`);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('[AppointmentService] Error fetching bookings:', error);
      throw new Error('Failed to fetch bookings');
    }
  }

  /**
   * Get a specific booking by ID
   */
  static async getBookingById(bookingId: string): Promise<Booking> {
    try {
      const supabase = createAdminClient();
      const { data, error } = await supabase
        .from('bookings')
        .select('*, category:categories(*)')
        .eq('id', bookingId)
        .single();

      if (error) throw error;
      if (!data) throw new Error('Booking not found');

      return data;
    } catch (error) {
      console.error('[AppointmentService] Error fetching booking:', error);
      throw new Error('Failed to fetch booking');
    }
  }

  /**
   * Update a booking status or details
   */
  static async updateBooking(
    bookingId: string,
    updates: {
      status?: string;
      notes?: string | null;
      scheduled_date?: string;
      scheduled_time?: string;
      meeting_type?: string;
    }
  ): Promise<Booking> {
    try {
      const supabase = createAdminClient();

      // If rescheduling, check new slot availability
      if (updates.scheduled_date && updates.scheduled_time) {
        const isAvailable = await this.isSlotAvailable(
          updates.scheduled_date,
          updates.scheduled_time
        );
        if (!isAvailable) {
          throw new Error('New time slot is not available');
        }
        updates.scheduled_time = normalizeTimeSlot(updates.scheduled_time);
      }

      const { data, error } = await supabase
        .from('bookings')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', bookingId)
        .select()
        .single();

      if (error) throw error;
      if (!data) throw new Error('Failed to update booking');

      return data;
    } catch (error) {
      console.error('[AppointmentService] Error updating booking:', error);
      if (error instanceof Error) throw new Error(error.message);
      throw new Error('Failed to update booking');
    }
  }

  /**
   * Cancel a booking
   */
  static async cancelBooking(bookingId: string, reason?: string): Promise<Booking> {
    return this.updateBooking(bookingId, {
      status: 'cancelled',
      notes: reason || 'Cancelled by user',
    });
  }

  /**
   * Get all available time slots configuration
   */
  static async getAvailableSlots(): Promise<AvailableSlot[]> {
    try {
      const supabase = createAdminClient();
      const { data, error } = await supabase
        .from('available_slots')
        .select('*')
        .order('day_of_week', { ascending: true });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('[AppointmentService] Error fetching slots:', error);
      throw new Error('Failed to fetch time slots');
    }
  }

  /**
   * Add a new time slot configuration
   */
  static async addTimeSlot(slot: {
    day_of_week: number;
    start_time: string;
    end_time: string;
    is_active: boolean;
  }): Promise<AvailableSlot> {
    try {
      const supabase = createAdminClient();
      const { data, error } = await supabase
        .from('available_slots')
        .insert(slot)
        .select()
        .single();

      if (error) throw error;
      if (!data) throw new Error('Failed to create time slot');

      return data;
    } catch (error) {
      console.error('[AppointmentService] Error adding time slot:', error);
      throw new Error('Failed to add time slot');
    }
  }

  /**
   * Update a time slot configuration
   */
  static async updateTimeSlot(
    slotId: string,
    updates: Partial<AvailableSlot>
  ): Promise<AvailableSlot> {
    try {
      const supabase = createAdminClient();
      const { data, error } = await supabase
        .from('available_slots')
        .update(updates)
        .eq('id', slotId)
        .select()
        .single();

      if (error) throw error;
      if (!data) throw new Error('Failed to update time slot');

      return data;
    } catch (error) {
      console.error('[AppointmentService] Error updating time slot:', error);
      throw new Error('Failed to update time slot');
    }
  }

  /**
   * Get all blocked dates
   */
  static async getBlockedDates(): Promise<BlockedDate[]> {
    try {
      const supabase = createAdminClient();
      const { data, error } = await supabase
        .from('blocked_dates')
        .select('*')
        .order('date', { ascending: true });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('[AppointmentService] Error fetching blocked dates:', error);
      throw new Error('Failed to fetch blocked dates');
    }
  }

  /**
   * Add a blocked date
   */
  static async blockDate(date: string, reason?: string): Promise<BlockedDate> {
    try {
      const supabase = createAdminClient();
      const { data, error } = await supabase
        .from('blocked_dates')
        .insert({
          date,
          reason: reason || null,
        })
        .select()
        .single();

      if (error) throw error;
      if (!data) throw new Error('Failed to block date');

      return data;
    } catch (error) {
      console.error('[AppointmentService] Error blocking date:', error);
      throw new Error('Failed to block date');
    }
  }

  /**
   * Remove a blocked date
   */
  static async unblockDate(blockedDateId: string): Promise<void> {
    try {
      const supabase = createAdminClient();
      const { error } = await supabase
        .from('blocked_dates')
        .delete()
        .eq('id', blockedDateId);

      if (error) throw error;
    } catch (error) {
      console.error('[AppointmentService] Error unblocking date:', error);
      throw new Error('Failed to unblock date');
    }
  }

  /**
   * Get booking statistics
   */
  static async getBookingStats(): Promise<{
    total: number;
    pending: number;
    confirmed: number;
    completed: number;
    cancelled: number;
  }> {
    try {
      const supabase = createAdminClient();
      const { data, error } = await supabase
        .from('bookings')
        .select('status', { count: 'exact' });

      if (error) throw error;

      const stats = {
        total: data?.length || 0,
        pending: data?.filter(b => b.status === 'pending').length || 0,
        confirmed: data?.filter(b => b.status === 'confirmed').length || 0,
        completed: data?.filter(b => b.status === 'completed').length || 0,
        cancelled: data?.filter(b => b.status === 'cancelled').length || 0,
      };

      return stats;
    } catch (error) {
      console.error('[AppointmentService] Error getting booking stats:', error);
      throw new Error('Failed to get booking statistics');
    }
  }
}
