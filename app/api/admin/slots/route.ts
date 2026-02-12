import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { AppointmentService } from '@/lib/appointments/service';
import {
  successResponse,
  errorResponse,
  unauthorizedResponse,
  notFoundResponse,
  serverErrorResponse,
  validationErrorResponse,
} from '@/lib/appointments/response';
import { slotSchema, blockedDateSchema } from '@/lib/appointments/validation';

/**
 * Authentication middleware for admin routes
 */
async function checkAuth(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin_session');

  if (!session) return false;

  try {
    const data = JSON.parse(session.value);
    return data.exp > Date.now();
  } catch {
    return false;
  }
}

/**
 * GET /api/admin/slots
 * Get all available time slots and blocked dates
 * No authentication required for reading
 */
export async function GET() {
  try {
    const [slots, blockedDates] = await Promise.all([
      AppointmentService.getAvailableSlots(),
      AppointmentService.getBlockedDates(),
    ]);

    return successResponse(
      { slots, blockedDates },
      'Slots and blocked dates retrieved successfully'
    );
  } catch (error) {
    return serverErrorResponse(error);
  }
}

/**
 * POST /api/admin/slots
 * Create a new time slot or blocked date
 * 
 * Request body for time slot:
 * {
 *   "type": "slot",
 *   "day_of_week": 1-5,
 *   "start_time": "09:00",
 *   "end_time": "17:00",
 *   "is_active": true
 * }
 * 
 * Request body for blocked date:
 * {
 *   "type": "blocked_date",
 *   "date": "2024-12-25",
 *   "reason": "Holiday"
 * }
 */
export async function POST(request: NextRequest) {
  try {
    if (!(await checkAuth())) {
      return unauthorizedResponse();
    }

    const body = await request.json();
    const { type, ...data } = body;

    if (type === 'slot') {
      // Validate slot data
      const validation = slotSchema.safeParse(data);
      if (!validation.success) {
        const errors = validation.error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message,
        }));
        return validationErrorResponse(errors);
      }

      const slot = await AppointmentService.addTimeSlot(validation.data);
      return successResponse(slot, 'Time slot created successfully', 201);
    } else if (type === 'blocked_date') {
      // Validate blocked date data
      const validation = blockedDateSchema.safeParse(data);
      if (!validation.success) {
        const errors = validation.error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message,
        }));
        return validationErrorResponse(errors);
      }

      const blockedDate = await AppointmentService.blockDate(
        validation.data.date,
        validation.data.reason
      );
      return successResponse(blockedDate, 'Date blocked successfully', 201);
    }

    return errorResponse('Invalid type. Must be "slot" or "blocked_date"', 400);
  } catch (error) {
    if (error instanceof Error) {
      return errorResponse(error.message, 400);
    }
    return serverErrorResponse(error);
  }
}

/**
 * PUT /api/admin/slots
 * Update a time slot
 * 
 * Request body:
 * {
 *   "id": "slot-id",
 *   "start_time": "10:00",
 *   "end_time": "18:00",
 *   "is_active": false
 * }
 */
export async function PUT(request: NextRequest) {
  try {
    if (!(await checkAuth())) {
      return unauthorizedResponse();
    }

    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return errorResponse('Slot ID is required', 400);
    }

    // Validate update data
    const validation = slotSchema.partial().safeParse(updates);
    if (!validation.success) {
      const errors = validation.error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message,
      }));
      return validationErrorResponse(errors);
    }

    const updatedSlot = await AppointmentService.updateTimeSlot(id, validation.data);
    return successResponse(updatedSlot, 'Time slot updated successfully');
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('not found')) {
        return notFoundResponse('Time slot');
      }
      return errorResponse(error.message, 400);
    }
    return serverErrorResponse(error);
  }
}

/**
 * DELETE /api/admin/slots
 * Delete a time slot or blocked date
 * 
 * Query parameters:
 * - id: string (required)
 * - type: "slot" | "blocked_date" (optional, default: "slot")
 */
export async function DELETE(request: NextRequest) {
  try {
    if (!(await checkAuth())) {
      return unauthorizedResponse();
    }

    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');
    const type = searchParams.get('type') || 'slot';

    if (!id) {
      return errorResponse('ID parameter is required', 400);
    }

    if (type === 'blocked_date') {
      await AppointmentService.unblockDate(id);
      return successResponse({ id }, 'Date unblocked successfully');
    } else if (type === 'slot') {
      // Delete time slot by updating it or by direct deletion
      // Since we don't have a direct delete function, we'll update is_active to false
      const updatedSlot = await AppointmentService.updateTimeSlot(id, {
        is_active: false,
      });
      return successResponse(updatedSlot, 'Time slot deleted successfully');
    }

    return errorResponse('Invalid type. Must be "slot" or "blocked_date"', 400);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('not found')) {
        return notFoundResponse('Resource');
      }
      return errorResponse(error.message, 400);
    }
    return serverErrorResponse(error);
  }
}
