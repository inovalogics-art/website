/**
 * TypeScript types and interfaces for the appointment system
 * Use these for type-safe frontend and backend code
 */

import type { Booking, AvailableSlot, BlockedDate } from '@/lib/types';

/**
 * Request body for creating a booking
 */
export interface CreateBookingRequest {
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  scheduled_date: string;
  scheduled_time: string;
  timezone?: string;
  meeting_type?: 'video' | 'phone' | 'in_person';
  message?: string | null;
  category_id?: string | null;
}

/**
 * Request body for updating a booking
 */
export interface UpdateBookingRequest {
  id: string;
  status?: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'no_show';
  notes?: string | null;
  scheduled_date?: string;
  scheduled_time?: string;
  meeting_type?: 'video' | 'phone' | 'in_person';
}

/**
 * Request body for creating a time slot
 */
export interface CreateTimeSlotRequest {
  day_of_week: number;
  start_time: string;
  end_time: string;
  is_active?: boolean;
}

/**
 * Request body for updating a time slot
 */
export interface UpdateTimeSlotRequest {
  id: string;
  day_of_week?: number;
  start_time?: string;
  end_time?: string;
  is_active?: boolean;
}

/**
 * Request body for blocking a date
 */
export interface BlockDateRequest {
  date: string;
  reason?: string;
}

/**
 * Available slots response
 */
export interface AvailableSlotsResponse {
  available_times: string[];
  blocked: boolean;
  day_name: string;
}

/**
 * Booking statistics response
 */
export interface BookingStatsResponse {
  total: number;
  pending: number;
  confirmed: number;
  completed: number;
  cancelled: number;
}

/**
 * Generic API response wrapper
 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message: string;
  timestamp: string;
}

/**
 * Validation error response
 */
export interface ValidationErrorResponse {
  success: false;
  error: string;
  errors: Array<{
    field: string;
    message: string;
  }>;
  timestamp: string;
}

/**
 * Paginated response wrapper
 */
export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  total: number;
  page: number;
  limit: number;
  timestamp: string;
}

/**
 * Filter options for getting bookings
 */
export interface BookingFilters {
  status?: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'no_show';
  date?: string;
  email?: string;
  category_id?: string;
  startDate?: string;
  endDate?: string;
}

/**
 * Extended booking with calculated properties
 */
export interface BookingWithMetadata extends Booking {
  dayName?: string;
  formattedDate?: string;
  formattedTime?: string;
  durationMinutes?: number;
  isPastBooking?: boolean;
  canBeCancelled?: boolean;
  canBeRescheduled?: boolean;
}

/**
 * Time slot with metadata
 */
export interface TimeSlotWithMetadata extends AvailableSlot {
  dayName: string;
  shortDayName: string;
  isWeekend: boolean;
  totalSlots?: number;
  bookedSlots?: number;
  availableSlots?: number;
}

/**
 * Calendar day with booking information
 */
export interface CalendarDay {
  date: string;
  dayOfWeek: number;
  dayName: string;
  isToday: boolean;
  isBlocked: boolean;
  hasBookings: boolean;
  bookingCount: number;
  availableSlots: number;
  bookings?: Booking[];
}

/**
 * Calendar month view
 */
export interface CalendarMonth {
  month: number;
  year: number;
  monthName: string;
  days: CalendarDay[];
  totalBookings: number;
}

/**
 * Time slot availability
 */
export interface TimeSlotAvailability {
  time: string;
  available: boolean;
  booked: boolean;
  blocked: boolean;
  reason?: string;
}

/**
 * Booking confirmation details
 */
export interface BookingConfirmation {
  success: boolean;
  bookingId: string;
  clientName: string;
  clientEmail: string;
  scheduledDate: string;
  scheduledTime: string;
  meetingType: string;
  timezone: string;
  confirmationCode: string;
  createdAt: string;
}

/**
 * Email notification data
 */
export interface BookingEmailData {
  to: string;
  subject: string;
  bookingId: string;
  clientName: string;
  scheduledDate: string;
  scheduledTime: string;
  meetingType: string;
  timezone: string;
  confirmationUrl: string;
  cancellationUrl?: string;
}

/**
 * Booking statistics breakdown
 */
export interface BookingStatisticsBreakdown {
  total: number;
  pending: number;
  confirmed: number;
  completed: number;
  cancelled: number;
  noShow: number;
  pendingPercentage: number;
  confirmationRate: number;
  completionRate: number;
  cancellationRate: number;
  noShowRate: number;
}

/**
 * Availability summary for a date range
 */
export interface AvailabilitySummary {
  startDate: string;
  endDate: string;
  totalDays: number;
  availableDays: number;
  blockedDays: number;
  weekendDays: number;
  totalAvailableSlots: number;
  totalBookedSlots: number;
  utilizationRate: number;
  nextAvailableDate: string | null;
}

/**
 * Booking search result
 */
export interface BookingSearchResult {
  id: string;
  name: string;
  email: string;
  scheduledDate: string;
  scheduledTime: string;
  status: string;
  relevanceScore: number;
}

/**
 * Booking export data (for CSV/Excel)
 */
export interface BookingExportData {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  scheduledDate: string;
  scheduledTime: string;
  timezone: string;
  meetingType: string;
  status: string;
  message: string | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

/**
 * Time slot with availability details
 */
export interface TimeSlotDetails {
  slotId: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  totalMinutes: number;
  dayName: string;
  status: 'active' | 'inactive';
  bookingsThisWeek: number;
  averageUtilization: number;
}

/**
 * Rescheduling options
 */
export interface RescheduleOptions {
  currentDate: string;
  currentTime: string;
  availableDates: string[];
  availableTimes: string[];
  reason?: string;
}

/**
 * Booking analytics event
 */
export interface BookingAnalyticsEvent {
  eventType: 'booking_created' | 'booking_confirmed' | 'booking_cancelled' | 'booking_completed';
  bookingId: string;
  clientEmail: string;
  meetingType: string;
  scheduledDate: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

/**
 * Availability configuration
 */
export interface AvailabilityConfig {
  defaultDuration: number; // minutes
  defaultBuffer: number; // minutes
  timezone: string;
  advanceDaysLimit: number;
  businessDays: number[]; // 0-6 (0=Sunday)
  holidayDates: string[];
  customBlockedDates: string[];
  enableWeekends: boolean;
  enableAfterHours: boolean;
}

/**
 * Booking system settings
 */
export interface BookingSystemSettings {
  enabled: boolean;
  autoConfirm: boolean;
  requireClientConfirmation: boolean;
  sendConfirmationEmail: boolean;
  sendReminderEmail: boolean;
  reminderHoursBefore: number;
  requirePayment: boolean;
  paymentRequired: number; // amount in cents
  defaultTimeZone: string;
  maxConcurrentBookings: number;
  allowRescheduling: boolean;
  allowCancellation: boolean;
  cancellationDaysBefore: number;
}

/**
 * Helper type to extract status from string
 */
export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'no_show';

/**
 * Helper type to extract meeting type
 */
export type MeetingType = 'video' | 'phone' | 'in_person';

/**
 * Type guard function
 */
export function isBookingRequest(obj: unknown): obj is CreateBookingRequest {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'name' in obj &&
    'email' in obj &&
    'scheduled_date' in obj &&
    'scheduled_time' in obj
  );
}

/**
 * Type guard function for available slots response
 */
export function isAvailableSlotsResponse(obj: unknown): obj is AvailableSlotsResponse {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'available_times' in obj &&
    Array.isArray((obj as any).available_times)
  );
}

/**
 * Type guard function for API response
 */
export function isApiResponse<T = unknown>(obj: unknown): obj is ApiResponse<T> {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'success' in obj &&
    'message' in obj &&
    'timestamp' in obj
  );
}
