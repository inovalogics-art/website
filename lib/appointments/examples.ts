/**
 * Usage Examples and Best Practices for the Appointment System
 * These are documented examples of proper ways to use the appointment APIs
 */

import { AppointmentService, validateBookingData } from './index';
import { BOOKING_STATUS, MEETING_TYPE, DEFAULT_BOOKING_SETTINGS } from './constants';

/**
 * EXAMPLE 1: Create a new booking with proper validation
 */
export async function exampleCreateBooking() {
  const bookingData = {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1-555-123-4567',
    company: 'Acme Corp',
    scheduled_date: '2024-12-25',
    scheduled_time: '14:30',
    timezone: 'America/New_York',
    meeting_type: 'video' as const,
    message: 'Looking forward to discussing the project',
    category_id: 'some-uuid', // optional
  };

  try {
    // Validate data first
    const validation = validateBookingData(bookingData);
    if ('errors' in validation) {
      console.error('Validation errors:', validation.errors);
      return;
    }

    // Create booking using service
    const booking = await AppointmentService.createBooking(validation);
    console.log('Booking created successfully:', booking);
    return booking;
  } catch (error) {
    console.error('Failed to create booking:', error);
  }
}

/**
 * EXAMPLE 2: Get available slots for a specific date
 */
export async function exampleGetAvailableSlots() {
  try {
    const date = '2024-12-25';
    const result = await AppointmentService.getAvailableSlotsForDate(
      date,
      DEFAULT_BOOKING_SETTINGS.BUFFER_MINUTES
    );

    if (result.blocked) {
      console.log(`Date ${date} is blocked`);
      return;
    }

    console.log(`Available slots for ${result.day_name}:`, result.available_times);
    return result.available_times;
  } catch (error) {
    console.error('Failed to get available slots:', error);
  }
}

/**
 * EXAMPLE 3: Admin - Retrieve all pending bookings
 */
export async function exampleGetPendingBookings() {
  try {
    const bookings = await AppointmentService.getAllBookings({
      status: BOOKING_STATUS.PENDING,
    });

    console.log(`Found ${bookings.length} pending bookings:`);
    bookings.forEach(booking => {
      console.log(`- ${booking.name} on ${booking.scheduled_date} at ${booking.scheduled_time}`);
    });

    return bookings;
  } catch (error) {
    console.error('Failed to fetch bookings:', error);
  }
}

/**
 * EXAMPLE 4: Admin - Get bookings for a specific date
 */
export async function exampleGetBookingsByDate() {
  try {
    const date = '2024-12-25';
    const bookings = await AppointmentService.getAllBookings({
      date,
    });

    console.log(`Bookings for ${date}:`, bookings);
    return bookings;
  } catch (error) {
    console.error('Failed to fetch bookings:', error);
  }
}

/**
 * EXAMPLE 5: Admin - Search bookings by email
 */
export async function exampleSearchBookingsByEmail() {
  try {
    const email = 'john@example.com';
    const bookings = await AppointmentService.getAllBookings({
      email,
    });

    console.log(`Bookings for ${email}:`, bookings);
    return bookings;
  } catch (error) {
    console.error('Failed to search bookings:', error);
  }
}

/**
 * EXAMPLE 6: Admin - Confirm a booking
 */
export async function exampleConfirmBooking(bookingId: string) {
  try {
    const updatedBooking = await AppointmentService.updateBooking(bookingId, {
      status: BOOKING_STATUS.CONFIRMED,
      notes: 'Confirmed via email',
    });

    console.log('Booking confirmed:', updatedBooking);
    return updatedBooking;
  } catch (error) {
    console.error('Failed to confirm booking:', error);
  }
}

/**
 * EXAMPLE 7: Admin - Reschedule a booking
 */
export async function exampleRescheduleBooking(
  bookingId: string,
  newDate: string,
  newTime: string
) {
  try {
    const updatedBooking = await AppointmentService.updateBooking(bookingId, {
      scheduled_date: newDate,
      scheduled_time: newTime,
      notes: 'Rescheduled at client request',
    });

    console.log('Booking rescheduled:', updatedBooking);
    return updatedBooking;
  } catch (error) {
    console.error('Failed to reschedule booking:', error);
  }
}

/**
 * EXAMPLE 8: Admin - Cancel a booking
 */
export async function exampleCancelBooking(bookingId: string, reason?: string) {
  try {
    const cancelledBooking = await AppointmentService.cancelBooking(
      bookingId,
      reason || 'Cancelled by user'
    );

    console.log('Booking cancelled:', cancelledBooking);
    return cancelledBooking;
  } catch (error) {
    console.error('Failed to cancel booking:', error);
  }
}

/**
 * EXAMPLE 9: Admin - Add a new available time slot
 */
export async function exampleAddTimeSlot() {
  try {
    // Monday: 9 AM to 5 PM
    const slot = await AppointmentService.addTimeSlot({
      day_of_week: 1, // Monday
      start_time: '09:00',
      end_time: '17:00',
      is_active: true,
    });

    console.log('Time slot added:', slot);
    return slot;
  } catch (error) {
    console.error('Failed to add time slot:', error);
  }
}

/**
 * EXAMPLE 10: Admin - Block a date (holiday, vacation)
 */
export async function exampleBlockDate() {
  try {
    const blockedDate = await AppointmentService.blockDate(
      '2024-12-25',
      'Christmas Holiday'
    );

    console.log('Date blocked:', blockedDate);
    return blockedDate;
  } catch (error) {
    console.error('Failed to block date:', error);
  }
}

/**
 * EXAMPLE 11: Admin - Get all available time slots
 */
export async function exampleGetAllTimeSlots() {
  try {
    const slots = await AppointmentService.getAvailableSlots();

    console.log('All available time slots:');
    slots.forEach(slot => {
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      console.log(`${days[slot.day_of_week]}: ${slot.start_time} - ${slot.end_time}`);
    });

    return slots;
  } catch (error) {
    console.error('Failed to get time slots:', error);
  }
}

/**
 * EXAMPLE 12: Admin - Get booking statistics
 */
export async function exampleGetBookingStats() {
  try {
    const stats = await AppointmentService.getBookingStats();

    console.log('Booking Statistics:', {
      total: stats.total,
      pending: stats.pending,
      confirmed: stats.confirmed,
      completed: stats.completed,
      cancelled: stats.cancelled,
    });

    return stats;
  } catch (error) {
    console.error('Failed to get booking stats:', error);
  }
}

/**
 * EXAMPLE 13: Check if a specific slot is available
 */
export async function exampleCheckSlotAvailability() {
  try {
    const isAvailable = await AppointmentService.isSlotAvailable(
      '2024-12-25',
      '14:30'
    );

    if (isAvailable) {
      console.log('Slot is available for booking');
    } else {
      console.log('Slot is not available');
    }

    return isAvailable;
  } catch (error) {
    console.error('Failed to check slot availability:', error);
  }
}

/**
 * EXAMPLE 14: Get a specific booking by ID
 */
export async function exampleGetBookingById(bookingId: string) {
  try {
    const booking = await AppointmentService.getBookingById(bookingId);

    console.log('Booking details:', {
      name: booking.name,
      email: booking.email,
      date: booking.scheduled_date,
      time: booking.scheduled_time,
      status: booking.status,
      meeting_type: booking.meeting_type,
    });

    return booking;
  } catch (error) {
    console.error('Failed to get booking:', error);
  }
}

/**
 * EXAMPLE 15: API Usage - Client-side fetch example
 */
export async function exampleClientSideBooking() {
  try {
    const response = await fetch('/api/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Jane Smith',
        email: 'jane@example.com',
        scheduled_date: '2024-12-26',
        scheduled_time: '10:00',
        meeting_type: 'video',
        message: 'Interested in web development services',
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Booking failed:', error.message);
      return;
    }

    const result = await response.json();
    console.log('Booking created:', result.data);
    return result.data;
  } catch (error) {
    console.error('Request failed:', error);
  }
}

/**
 * EXAMPLE 16: API Usage - Get available slots from client
 */
export async function exampleClientGetAvailableSlots(date: string) {
  try {
    const response = await fetch(`/api/bookings?date=${date}&buffer=15`);

    if (!response.ok) {
      const error = await response.json();
      console.error('Failed to get slots:', error.message);
      return;
    }

    const result = await response.json();
    console.log(`Available slots for ${date}:`, result.data.available_times);
    return result.data.available_times;
  } catch (error) {
    console.error('Request failed:', error);
  }
}

/**
 * EXAMPLE 17: Complete booking flow
 */
export async function exampleCompleteBookingFlow() {
  try {
    // Step 1: Get available slots for target date
    console.log('Step 1: Checking availability...');
    const availableDate = '2024-12-25';
    const slots = await AppointmentService.getAvailableSlotsForDate(availableDate);

    if (slots.blocked || slots.available_times.length === 0) {
      console.log('No slots available for this date');
      return;
    }

    console.log(`Found ${slots.available_times.length} available slots`);

    // Step 2: Create booking
    console.log('Step 2: Creating booking...');
    const booking = await AppointmentService.createBooking({
      name: 'Client Name',
      email: 'client@example.com',
      scheduled_date: availableDate,
      scheduled_time: slots.available_times[0], // Pick first available
      meeting_type: MEETING_TYPE.VIDEO,
      timezone: 'America/New_York',
    });

    console.log('Booking created:', booking.id);

    // Step 3: Verify booking
    console.log('Step 3: Verifying booking...');
    const verifiedBooking = await AppointmentService.getBookingById(booking.id);
    console.log('Booking verified. Status:', verifiedBooking.status);

    // Step 4: Get stats
    console.log('Step 4: Checking stats...');
    const stats = await AppointmentService.getBookingStats();
    console.log('Current stats:', stats);

    return booking;
  } catch (error) {
    console.error('Booking flow failed:', error);
  }
}

/**
 * EXAMPLE 18: Error handling patterns
 */
export async function exampleErrorHandling() {
  try {
    // This will fail because date is in the past
    await AppointmentService.createBooking({
      name: 'John',
      email: 'john@example.com',
      scheduled_date: '2020-01-01', // Past date
      scheduled_time: '10:00',
      meeting_type: MEETING_TYPE.VIDEO,
      timezone: 'America/New_York',
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('past')) {
        console.log('User attempted to book a past date');
      } else if (error.message.includes('available')) {
        console.log('Requested slot is already booked');
      } else {
        console.log('Generic error:', error.message);
      }
    }
  }
}
