/**
 * Constants and configuration for the appointment booking system
 */

/**
 * Booking status enum
 */
export const BOOKING_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  NO_SHOW: 'no_show',
} as const;

export type BookingStatus = typeof BOOKING_STATUS[keyof typeof BOOKING_STATUS];

/**
 * Meeting type enum
 */
export const MEETING_TYPE = {
  VIDEO: 'video',
  PHONE: 'phone',
  IN_PERSON: 'in_person',
} as const;

export type MeetingType = typeof MEETING_TYPE[keyof typeof MEETING_TYPE];

/**
 * Day of week enum (0 = Sunday, 6 = Saturday)
 */
export const DAY_OF_WEEK = {
  SUNDAY: 0,
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6,
} as const;

/**
 * Default timezone
 */
export const DEFAULT_TIMEZONE = 'America/New_York';

/**
 * Default booking settings
 */
export const DEFAULT_BOOKING_SETTINGS = {
  /** Duration of each appointment in minutes */
  DURATION_MINUTES: 30,
  /** Buffer time between appointments in minutes */
  BUFFER_MINUTES: 15,
  /** How many days in advance bookings can be made */
  ADVANCE_DAYS: 30,
  /** Minimum time slot interval in minutes */
  SLOT_INTERVAL: 30,
} as const;

/**
 * Business hours (default)
 */
export const DEFAULT_BUSINESS_HOURS = {
  START_TIME: '09:00',
  END_TIME: '17:00',
} as const;

/**
 * Status display labels
 */
export const BOOKING_STATUS_LABELS: Record<BookingStatus, string> = {
  [BOOKING_STATUS.PENDING]: 'Pending',
  [BOOKING_STATUS.CONFIRMED]: 'Confirmed',
  [BOOKING_STATUS.COMPLETED]: 'Completed',
  [BOOKING_STATUS.CANCELLED]: 'Cancelled',
  [BOOKING_STATUS.NO_SHOW]: 'No Show',
};

/**
 * Meeting type display labels
 */
export const MEETING_TYPE_LABELS: Record<MeetingType, string> = {
  [MEETING_TYPE.VIDEO]: 'Video Call',
  [MEETING_TYPE.PHONE]: 'Phone Call',
  [MEETING_TYPE.IN_PERSON]: 'In Person',
};

/**
 * Day names
 */
export const DAY_NAMES = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
] as const;

/**
 * Short day names
 */
export const SHORT_DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const;

/**
 * Validation error messages
 */
export const VALIDATION_MESSAGES = {
  INVALID_EMAIL: 'Please enter a valid email address',
  INVALID_PHONE: 'Please enter a valid phone number',
  INVALID_DATE_FORMAT: 'Date must be in YYYY-MM-DD format',
  INVALID_TIME_FORMAT: 'Time must be in HH:MM format',
  NAME_REQUIRED: 'Name is required',
  NAME_TOO_SHORT: 'Name must be at least 2 characters',
  NAME_TOO_LONG: 'Name cannot exceed 100 characters',
  EMAIL_REQUIRED: 'Email is required',
  COMPANY_TOO_LONG: 'Company name cannot exceed 100 characters',
  PHONE_INVALID: 'Invalid phone format',
  MESSAGE_TOO_LONG: 'Message cannot exceed 1000 characters',
  DATE_IN_PAST: 'Booking date cannot be in the past',
  INVALID_DAY_OF_WEEK: 'Day of week must be between 0-6',
  TIME_SLOT_CONFLICT: 'This time slot is already booked',
  DATE_BLOCKED: 'This date is not available for bookings',
  NO_AVAILABLE_SLOTS: 'No available time slots for this date',
} as const;

/**
 * HTTP status codes
 */
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
} as const;

/**
 * Common timezones
 */
export const COMMON_TIMEZONES = [
  'America/New_York',
  'America/Chicago',
  'America/Denver',
  'America/Los_Angeles',
  'America/Anchorage',
  'Pacific/Honolulu',
  'Europe/London',
  'Europe/Paris',
  'Europe/Berlin',
  'Asia/Tokyo',
  'Asia/Shanghai',
  'Asia/Hong_Kong',
  'Asia/Singapore',
  'Australia/Sydney',
  'Australia/Melbourne',
  'India/Kolkata',
  'America/Toronto',
  'America/Mexico_City',
  'America/Buenos_Aires',
  'Europe/Dubai',
] as const;

/**
 * Get status color for UI display
 */
export function getStatusColor(status: BookingStatus): string {
  switch (status) {
    case BOOKING_STATUS.PENDING:
      return 'bg-yellow-100 text-yellow-800';
    case BOOKING_STATUS.CONFIRMED:
      return 'bg-blue-100 text-blue-800';
    case BOOKING_STATUS.COMPLETED:
      return 'bg-green-100 text-green-800';
    case BOOKING_STATUS.CANCELLED:
      return 'bg-red-100 text-red-800';
    case BOOKING_STATUS.NO_SHOW:
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

/**
 * Get meeting type icon
 */
export function getMeetingTypeIcon(type: MeetingType): string {
  switch (type) {
    case MEETING_TYPE.VIDEO:
      return 'video';
    case MEETING_TYPE.PHONE:
      return 'phone';
    case MEETING_TYPE.IN_PERSON:
      return 'map-pin';
    default:
      return 'calendar';
  }
}

/**
 * Working days (Monday to Friday)
 */
export const WORKING_DAYS = [
  DAY_OF_WEEK.MONDAY,
  DAY_OF_WEEK.TUESDAY,
  DAY_OF_WEEK.WEDNESDAY,
  DAY_OF_WEEK.THURSDAY,
  DAY_OF_WEEK.FRIDAY,
] as const;

/**
 * Weekend days
 */
export const WEEKEND_DAYS = [DAY_OF_WEEK.SATURDAY, DAY_OF_WEEK.SUNDAY] as const;

/**
 * Check if day is weekend
 */
export function isWeekendDay(dayOfWeek: number): boolean {
  return WEEKEND_DAYS.includes(dayOfWeek as typeof WEEKEND_DAYS[number]);
}

/**
 * Check if day is working day
 */
export function isWorkingDay(dayOfWeek: number): boolean {
  return WORKING_DAYS.includes(dayOfWeek as typeof WORKING_DAYS[number]);
}
