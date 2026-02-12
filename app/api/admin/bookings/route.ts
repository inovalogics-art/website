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
import { updateBookingSchema } from '@/lib/appointments/validation';

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
 * GET /api/admin/bookings
 * Get all bookings with optional filters
 * 
 * Query parameters:
 * - status: string (optional, filter by booking status)
 * - date: string (optional, filter by date)
 * - email: string (optional, search by email)
 */
export async function GET(request: NextRequest) {
  try {
    if (!(await checkAuth())) {
      return unauthorizedResponse();
    }

    const searchParams = request.nextUrl.searchParams;
    const filters = {
      status: searchParams.get('status') || undefined,
      date: searchParams.get('date') || undefined,
      email: searchParams.get('email') || undefined,
    };

    const bookings = await AppointmentService.getAllBookings(filters);
    return successResponse(bookings, 'Bookings retrieved successfully');
  } catch (error) {
    return serverErrorResponse(error);
  }
}

/**
 * PUT /api/admin/bookings
 * Update a booking
 * 
 * Request body:
 * - id: string (required)
 * - status: string (optional)
 * - notes: string (optional)
 * - scheduled_date: string (optional)
 * - scheduled_time: string (optional)
 * - meeting_type: string (optional)
 */
export async function PUT(request: NextRequest) {
  try {
    if (!(await checkAuth())) {
      return unauthorizedResponse();
    }

    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return errorResponse('Booking ID is required', 400);
    }

    // Validate update data
    const validation = updateBookingSchema.safeParse(updates);
    if (!validation.success) {
      const errors = validation.error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message,
      }));
      return validationErrorResponse(errors);
    }

    // Check if booking exists
    try {
      await AppointmentService.getBookingById(id);
    } catch {
      return notFoundResponse('Booking');
    }

    // Update booking
    const updatedBooking = await AppointmentService.updateBooking(id, validation.data);
    return successResponse(updatedBooking, 'Booking updated successfully');
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('not available')) {
        return errorResponse(error.message, 409);
      }
      return errorResponse(error.message, 400);
    }
    return serverErrorResponse(error);
  }
}

/**
 * DELETE /api/admin/bookings
 * Delete/Cancel a booking
 * 
 * Query parameters:
 * - id: string (required, booking ID)
 * - reason: string (optional, cancellation reason)
 */
export async function DELETE(request: NextRequest) {
  try {
    if (!(await checkAuth())) {
      return unauthorizedResponse();
    }

    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');
    const reason = searchParams.get('reason');

    if (!id) {
      return errorResponse('Booking ID is required', 400);
    }

    // Check if booking exists
    try {
      await AppointmentService.getBookingById(id);
    } catch {
      return notFoundResponse('Booking');
    }

    // Cancel booking
    const cancelledBooking = await AppointmentService.cancelBooking(id, reason || undefined);
    return successResponse(cancelledBooking, 'Booking cancelled successfully');
  } catch (error) {
    return serverErrorResponse(error);
  }
}
