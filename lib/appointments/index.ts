/**
 * Appointments Module
 * Central export point for all appointment/booking related utilities
 */

// Service layer
export { AppointmentService } from './service';

// Validation utilities
export {
  createBookingSchema,
  updateBookingSchema,
  slotSchema,
  blockedDateSchema,
  validateBookingData,
  validateUpdateData,
} from './validation';

// Helper functions
export {
  timeToMinutes,
  minutesToTime,
  isDateInFuture,
  isDateValid,
  getDayOfWeek,
  getDayName,
  generateTimeSlots,
  getAvailableSlots,
  isTimeWithinHours,
  formatBookingDetails,
  addBufferTime,
  isWeekend,
  getNextAvailableDate,
  normalizeTimeSlot,
} from './helpers';

// Response utilities
export {
  successResponse,
  errorResponse,
  validationErrorResponse,
  unauthorizedResponse,
  notFoundResponse,
  conflictResponse,
  serverErrorResponse,
  type ApiResponse,
} from './response';
