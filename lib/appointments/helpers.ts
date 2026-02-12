/**
 * Appointment helper utilities for calendar and scheduling logic
 */

/**
 * Convert time string to minutes for comparison
 * @example timeToMinutes("09:30") => 570
 */
export function timeToMinutes(timeStr: string): number {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + minutes;
}

/**
 * Convert minutes to time string
 * @example minutesToTime(570) => "09:30"
 */
export function minutesToTime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
}

/**
 * Validate if a date string is in the future
 */
export function isDateInFuture(dateStr: string, advanceDays: number = 1): boolean {
  const bookingDate = new Date(dateStr);
  const today = new Date();
  today.setDate(today.getDate() + advanceDays);
  today.setHours(0, 0, 0, 0);
  bookingDate.setHours(0, 0, 0, 0);
  return bookingDate >= today;
}

/**
 * Validate if a date is not in the past
 */
export function isDateValid(dateStr: string): boolean {
  const bookingDate = new Date(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  bookingDate.setHours(0, 0, 0, 0);
  return bookingDate >= today;
}

/**
 * Get day of week (0 = Sunday, 6 = Saturday)
 */
export function getDayOfWeek(dateStr: string): number {
  return new Date(dateStr).getDay();
}

/**
 * Get day name from date string
 */
export function getDayName(dateStr: string): string {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[getDayOfWeek(dateStr)];
}

/**
 * Generate time slots between start and end time
 * @param startTime "09:00" format
 * @param endTime "17:00" format
 * @param intervalMinutes slot duration (default 30)
 */
export function generateTimeSlots(
  startTime: string,
  endTime: string,
  intervalMinutes: number = 30
): string[] {
  const slots: string[] = [];
  const startMinutes = timeToMinutes(startTime);
  const endMinutes = timeToMinutes(endTime);

  for (let time = startMinutes; time < endMinutes; time += intervalMinutes) {
    slots.push(minutesToTime(time));
  }

  return slots;
}

/**
 * Filter out booked times from available slots
 */
export function getAvailableSlots(
  possibleSlots: string[],
  bookedTimes: string[]
): string[] {
  const bookedSet = new Set(bookedTimes);
  return possibleSlots.filter(slot => !bookedSet.has(slot));
}

/**
 * Check if time is within operating hours
 */
export function isTimeWithinHours(
  timeStr: string,
  startTime: string,
  endTime: string
): boolean {
  const time = timeToMinutes(timeStr);
  const start = timeToMinutes(startTime);
  const end = timeToMinutes(endTime);
  return time >= start && time < end;
}

/**
 * Format booking details for email/notification
 */
export function formatBookingDetails(booking: {
  name: string;
  email: string;
  scheduled_date: string;
  scheduled_time: string;
  meeting_type: string;
  timezone: string;
  company?: string;
  message?: string;
}): string {
  const date = new Date(booking.scheduled_date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return `
Booking Confirmation
=====================
Name: ${booking.name}
Email: ${booking.email}
Company: ${booking.company || 'N/A'}
Date: ${date}
Time: ${booking.scheduled_time} (${booking.timezone})
Meeting Type: ${booking.meeting_type}
${booking.message ? `\nMessage:\n${booking.message}` : ''}
`;
}

/**
 * Calculate buffer time between appointments
 */
export function addBufferTime(
  timeStr: string,
  bufferMinutes: number
): string {
  const minutes = timeToMinutes(timeStr) + bufferMinutes;
  return minutesToTime(Math.min(minutes, 24 * 60 - 1)); // Ensure we don't exceed 24 hours
}

/**
 * Check if date is a weekend
 */
export function isWeekend(dateStr: string): boolean {
  const dayOfWeek = getDayOfWeek(dateStr);
  return dayOfWeek === 0 || dayOfWeek === 6; // Sunday or Saturday
}

/**
 * Get next available date for booking (skip weekends if needed)
 */
export function getNextAvailableDate(
  startDate: string,
  skipWeekends: boolean = false,
  maxDays: number = 30
): string | null {
  const date = new Date(startDate);
  const maxDate = new Date(startDate);
  maxDate.setDate(maxDate.getDate() + maxDays);

  while (date <= maxDate) {
    if (!skipWeekends || !isWeekend(date.toISOString().split('T')[0])) {
      return date.toISOString().split('T')[0];
    }
    date.setDate(date.getDate() + 1);
  }

  return null;
}

/**
 * Validate time slot format and return normalized version
 */
export function normalizeTimeSlot(timeStr: string): string {
  const [hours, minutes] = timeStr.split(':').map(Number);
  
  if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
    throw new Error('Invalid time format');
  }

  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:00`;
}
