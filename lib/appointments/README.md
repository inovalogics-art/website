# Calendar Appointment System Documentation

This document outlines the proper backend architecture for the calendar appointment booking system.

## Architecture Overview

The system is built using a **service-based architecture** with proper separation of concerns:

```
API Routes (app/api/bookings/*, app/api/admin/*)
    ↓
Response Layer (lib/appointments/response.ts)
    ↓
Service Layer (lib/appointments/service.ts)
    ↓
Validation Layer (lib/appointments/validation.ts)
    ↓
Database (Supabase)
```

## Core Components

### 1. Validation Layer (`validation.ts`)
Handles all input validation using Zod schemas:
- `createBookingSchema` - Validates new booking creation
- `updateBookingSchema` - Validates booking updates
- `slotSchema` - Validates time slot configuration
- `blockedDateSchema` - Validates blocked date creation

**Key Features:**
- Type-safe validation
- Comprehensive error messages
- Field-level error tracking
- Pattern validation for dates and times (YYYY-MM-DD, HH:MM)

### 2. Helper Functions (`helpers.ts`)
Utility functions for appointment logic:
- `timeToMinutes()` / `minutesToTime()` - Time conversion
- `generateTimeSlots()` - Generate available slots between times
- `getAvailableSlots()` - Filter booked times
- `isDateInFuture()` / `isDateValid()` - Date validation
- `getDayOfWeek()` / `getDayName()` - Day utilities
- `formatBookingDetails()` - Format data for emails
- `isWeekend()` - Weekend detection
- `normalizeTimeSlot()` - Standardize time format

### 3. Service Layer (`service.ts`)
Core business logic with proper error handling:

#### Booking Operations
- `createBooking()` - Create new appointment
- `getBookingById()` - Fetch specific booking
- `getAllBookings()` - List all bookings with filters
- `updateBooking()` - Update booking details
- `cancelBooking()` - Cancel appointment
- `getBookingStats()` - Get booking statistics

#### Time Slot Management
- `getAvailableSlots()` - List all configured slots
- `addTimeSlot()` - Create new time slot
- `updateTimeSlot()` - Modify existing slot
- `isSlotAvailable()` - Check slot availability
- `getAvailableSlotsForDate()` - Get available times for specific date

#### Blocked Date Management
- `getBlockedDates()` - List all blocked dates
- `blockDate()` - Add blocked date (holiday, vacation, etc.)
- `unblockDate()` - Remove blocked date

### 4. Response Layer (`response.ts`)
Standardized API response formatting:

**Success Responses:**
- `successResponse()` - Standard success with data
- Status codes: 200 (default), 201 (created), etc.

**Error Responses:**
- `errorResponse()` - General error
- `validationErrorResponse()` - Validation failures
- `unauthorizedResponse()` - Authentication failures
- `notFoundResponse()` - Resource not found
- `conflictResponse()` - Conflict (duplicate, unavailable slot, etc.)
- `serverErrorResponse()` - Server errors

All responses include:
```json
{
  "success": boolean,
  "data": T | undefined,
  "error": string | undefined,
  "message": string,
  "timestamp": ISO 8601 string
}
```

## API Endpoints

### Public Endpoints

#### POST `/api/bookings`
Create a new booking.

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1-555-123-4567",
  "company": "Acme Corp",
  "scheduled_date": "2024-12-25",
  "scheduled_time": "14:30",
  "timezone": "America/New_York",
  "meeting_type": "video",
  "message": "Looking forward to our call"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "scheduled_date": "2024-12-25",
    "scheduled_time": "14:30:00",
    "status": "pending",
    "created_at": "2024-11-15T10:30:00Z"
  },
  "message": "Booking created successfully",
  "timestamp": "2024-11-15T10:30:00Z"
}
```

**Error Cases:**
- 400: Invalid input data or date in the past
- 409: Time slot no longer available
- 422: Validation failure

---

#### GET `/api/bookings?date=YYYY-MM-DD&buffer=15`
Get available time slots for a date.

**Query Parameters:**
- `date` (required): Date in YYYY-MM-DD format
- `buffer` (optional): Buffer minutes between appointments (default: 15)

**Response (200):**
```json
{
  "success": true,
  "data": {
    "available_times": ["09:00:00", "09:30:00", "10:00:00"],
    "blocked": false,
    "day_name": "Monday"
  },
  "message": "Available slots retrieved successfully",
  "timestamp": "2024-11-15T10:30:00Z"
}
```

**Error Cases:**
- 400: Missing or invalid date parameter

---

### Admin Endpoints

All admin endpoints require authentication (admin session cookie).

#### GET `/api/admin/bookings?status=pending&date=2024-12-25&email=john`
Get all bookings with optional filters.

**Query Parameters:**
- `status` (optional): Filter by status (pending, confirmed, completed, cancelled)
- `date` (optional): Filter by date
- `email` (optional): Search by email

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "John Doe",
      "email": "john@example.com",
      "scheduled_date": "2024-12-25",
      "scheduled_time": "14:30:00",
      "status": "pending",
      "category": { ... },
      "created_at": "2024-11-15T10:30:00Z"
    }
  ],
  "message": "Bookings retrieved successfully",
  "timestamp": "2024-11-15T10:30:00Z"
}
```

---

#### PUT `/api/admin/bookings`
Update a booking.

**Request:**
```json
{
  "id": "booking-id",
  "status": "confirmed",
  "notes": "Confirmed via email"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "status": "confirmed",
    "notes": "Confirmed via email",
    "updated_at": "2024-11-15T11:00:00Z"
  },
  "message": "Booking updated successfully",
  "timestamp": "2024-11-15T11:00:00Z"
}
```

---

#### DELETE `/api/admin/bookings?id=booking-id&reason=Client%20cancelled`
Cancel a booking.

**Query Parameters:**
- `id` (required): Booking ID to cancel
- `reason` (optional): Cancellation reason

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "status": "cancelled",
    "notes": "Client cancelled"
  },
  "message": "Booking cancelled successfully",
  "timestamp": "2024-11-15T11:00:00Z"
}
```

---

#### GET `/api/admin/slots`
Get all time slot configurations and blocked dates.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "slots": [
      {
        "id": "uuid",
        "day_of_week": 1,
        "start_time": "09:00",
        "end_time": "17:00",
        "is_active": true
      }
    ],
    "blockedDates": [
      {
        "id": "uuid",
        "date": "2024-12-25",
        "reason": "Christmas"
      }
    ]
  },
  "message": "Slots and blocked dates retrieved successfully",
  "timestamp": "2024-11-15T10:30:00Z"
}
```

---

#### POST `/api/admin/slots`
Create time slot or blocked date.

**Time Slot Request:**
```json
{
  "type": "slot",
  "day_of_week": 1,
  "start_time": "09:00",
  "end_time": "17:00",
  "is_active": true
}
```

**Blocked Date Request:**
```json
{
  "type": "blocked_date",
  "date": "2024-12-25",
  "reason": "Holiday"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": { ... },
  "message": "Time slot created successfully",
  "timestamp": "2024-11-15T10:30:00Z"
}
```

---

#### PUT `/api/admin/slots`
Update a time slot.

**Request:**
```json
{
  "id": "slot-id",
  "start_time": "10:00",
  "end_time": "18:00",
  "is_active": false
}
```

---

#### DELETE `/api/admin/slots?id=slot-id&type=slot`
Delete time slot or blocked date.

**Query Parameters:**
- `id` (required): Resource ID
- `type` (optional): "slot" or "blocked_date" (default: "slot")

---

## Error Handling

All errors follow a consistent format:

```json
{
  "success": false,
  "error": "Error type",
  "message": "Human-readable message",
  "timestamp": "2024-11-15T10:30:00Z"
}
```

### Common Status Codes

- **400**: Bad Request - Invalid input, validation failed
- **401**: Unauthorized - Missing/invalid authentication
- **404**: Not Found - Resource doesn't exist
- **409**: Conflict - Slot unavailable, duplicate entry
- **422**: Unprocessable Entity - Validation errors with field details
- **500**: Internal Server Error - Server-side failure

### Validation Errors

Status 422 responses include detailed field-level errors:

```json
{
  "success": false,
  "error": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email address"
    },
    {
      "field": "scheduled_date",
      "message": "Invalid date format (YYYY-MM-DD)"
    }
  ],
  "timestamp": "2024-11-15T10:30:00Z"
}
```

## Usage Examples

### Client-Side Booking Creation

```typescript
const createBooking = async (data) => {
  const response = await fetch('/api/bookings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return response.json();
};

// Usage
try {
  const booking = await createBooking({
    name: 'John Doe',
    email: 'john@example.com',
    scheduled_date: '2024-12-25',
    scheduled_time: '14:30',
    meeting_type: 'video'
  });
  console.log('Booking created:', booking.data);
} catch (error) {
  console.error('Booking failed:', error.message);
}
```

### Getting Available Slots

```typescript
const getAvailableSlots = async (date) => {
  const response = await fetch(`/api/bookings?date=${date}`);
  const result = await response.json();
  return result.data.available_times;
};

// Usage
const slots = await getAvailableSlots('2024-12-25');
console.log('Available times:', slots);
```

### Admin: Confirming Bookings

```typescript
const confirmBooking = async (bookingId) => {
  const response = await fetch('/api/admin/bookings', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id: bookingId,
      status: 'confirmed',
      notes: 'Confirmed by admin'
    })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return response.json();
};
```

## Best Practices

1. **Always validate input** - Use the schema validators before processing
2. **Handle errors gracefully** - Provide clear error messages to clients
3. **Use consistent response formats** - Use the response utilities
4. **Check authorization** - Validate admin status before sensitive operations
5. **Normalize time formats** - Always use HH:MM:SS format internally
6. **Validate dates** - Ensure dates are not in the past
7. **Check slot availability** - Always verify before confirming
8. **Use transactions** - Group related operations
9. **Log errors** - Include context in error logs
10. **Cache when appropriate** - Cache blocked dates and slots

## Database Schema

The system uses these Supabase tables:

- `bookings` - Appointment records
- `available_slots` - Recurring time slot configurations
- `blocked_dates` - Dates unavailable for booking
- `categories` - Service categories (referenced by bookings)

All tables have Row Level Security (RLS) enabled for proper access control.

## Future Enhancements

- Email notifications on booking confirmation
- Calendar integration (Google Calendar, Outlook)
- SMS reminders
- Timezone conversion
- Recurring bookings
- Cancellation fees
- Payment integration
- Video call link generation
