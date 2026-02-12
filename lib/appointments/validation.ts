import { z } from 'zod';

/**
 * Validation schema for creating a new appointment booking
 */
export const createBookingSchema = z.object({
  category_id: z.string().uuid().optional().nullable(),
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^[\d\s\-\+\(\)]*$/, 'Invalid phone format').optional().nullable(),
  company: z.string().max(100).optional().nullable(),
  scheduled_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)'),
  scheduled_time: z.string().regex(/^\d{2}:\d{2}(:\d{2})?$/, 'Invalid time format (HH:MM)'),
  timezone: z.string().default('America/New_York'),
  meeting_type: z.enum(['video', 'phone', 'in_person']).default('video'),
  message: z.string().max(1000).optional().nullable(),
});

/**
 * Validation schema for updating an existing booking
 */
export const updateBookingSchema = z.object({
  status: z.enum(['pending', 'confirmed', 'completed', 'cancelled', 'no_show']).optional(),
  notes: z.string().max(500).optional().nullable(),
  scheduled_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  scheduled_time: z.string().regex(/^\d{2}:\d{2}(:\d{2})?$/).optional(),
  meeting_type: z.enum(['video', 'phone', 'in_person']).optional(),
});

/**
 * Validation schema for available time slots
 */
export const slotSchema = z.object({
  day_of_week: z.number().int().min(0).max(6),
  start_time: z.string().regex(/^\d{2}:\d{2}$/, 'Invalid time format (HH:MM)'),
  end_time: z.string().regex(/^\d{2}:\d{2}$/, 'Invalid time format (HH:MM)'),
  is_active: z.boolean().default(true),
});

/**
 * Validation schema for blocked dates
 */
export const blockedDateSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  reason: z.string().max(255).optional().nullable(),
});

/**
 * Validate and parse booking data
 */
export function validateBookingData(data: unknown) {
  try {
    return createBookingSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        valid: false,
        errors: error.errors.map(e => ({ field: e.path.join('.'), message: e.message }))
      };
    }
    throw error;
  }
}

/**
 * Validate and parse update data
 */
export function validateUpdateData(data: unknown) {
  try {
    return updateBookingSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        valid: false,
        errors: error.errors.map(e => ({ field: e.path.join('.'), message: e.message }))
      };
    }
    throw error;
  }
}
