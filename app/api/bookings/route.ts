import { NextRequest } from 'next/server';
import { AppointmentService } from '@/lib/appointments/service';
import {
  successResponse,
  errorResponse,
  validationErrorResponse,
  conflictResponse,
  serverErrorResponse,
} from '@/lib/appointments/response';
import { validateBookingData } from '@/lib/appointments/validation';

/**
 * POST /api/bookings
 * Create a new booking/appointment
 * 
 * Request body:
 * - name: string (required)
 * - email: string (required)
 * - scheduled_date: string (required, YYYY-MM-DD format)
 * - scheduled_time: string (required, HH:MM format)
 * - category_id: string (optional)
 * - phone: string (optional)
 * - company: string (optional)
 * - timezone: string (optional, default: America/New_York)
 * - meeting_type: 'video' | 'phone' | 'in_person' (optional, default: video)
 * - message: string (optional)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request data
    const validation = validateBookingData(body);
    if ('errors' in validation) {
      return validationErrorResponse(validation.errors);
    }

    const bookingData = validation;

    // Create booking
    const booking = await AppointmentService.createBooking(bookingData);

    return successResponse(booking, 'Booking created successfully', 201);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('no longer available')) {
        return conflictResponse(error.message);
      }
      return errorResponse(error, 400);
    }
    return serverErrorResponse(error);
  }
}

/**
 * GET /api/bookings
 * Get available time slots for a specific date
 * 
 * Query parameters:
 * - date: string (required, YYYY-MM-DD format)
 * - buffer: number (optional, minutes, default: 15)
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const date = searchParams.get('date');
    const buffer = searchParams.get('buffer');

    if (!date) {
      return errorResponse('Date parameter is required', 400);
    }

    // Validate date format
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return errorResponse('Invalid date format. Use YYYY-MM-DD', 400);
    }

    const bufferMinutes = buffer ? parseInt(buffer, 10) : 15;

    // Get available slots
    const result = await AppointmentService.getAvailableSlotsForDate(date, bufferMinutes);

    return successResponse(result, 'Available slots retrieved successfully');
  } catch (error) {
    if (error instanceof Error) {
      return errorResponse(error.message, 400);
    }
    return serverErrorResponse(error);
  }
}
