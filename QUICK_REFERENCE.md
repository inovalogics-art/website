# Backend Calendar System - Quick Reference

## 📚 Import What You Need

```typescript
// Everything
import * from '@/lib/appointments';

// Service only
import { AppointmentService } from '@/lib/appointments/service';

// Validation only
import { validateBookingData } from '@/lib/appointments/validation';

// Constants only
import { BOOKING_STATUS, MEETING_TYPE } from '@/lib/appointments/constants';

// Types only
import type { CreateBookingRequest, ApiResponse } from '@/lib/appointments/types';
```

## 🎯 Common Operations

### Create a Booking
```typescript
const booking = await AppointmentService.createBooking({
  name: 'John Doe',
  email: 'john@example.com',
  scheduled_date: '2024-12-25',
  scheduled_time: '14:30',
  meeting_type: 'video',
});
```

### Get Available Slots
```typescript
const slots = await AppointmentService.getAvailableSlotsForDate('2024-12-25');
console.log(slots.available_times); // ["09:00:00", "09:30:00", ...]
```

### Update Booking (Admin)
```typescript
const updated = await AppointmentService.updateBooking(bookingId, {
  status: 'confirmed',
  notes: 'Confirmed via email',
});
```

### Cancel Booking
```typescript
await AppointmentService.cancelBooking(bookingId, 'Client requested cancellation');
```

### Get All Bookings (Admin)
```typescript
const bookings = await AppointmentService.getAllBookings({
  status: 'pending',
  date: '2024-12-25',
});
```

### Check Slot Availability
```typescript
const available = await AppointmentService.isSlotAvailable('2024-12-25', '14:30');
```

## 🔌 API Endpoints

### Public
```
POST   /api/bookings              # Create booking
GET    /api/bookings?date=YYYY-MM-DD  # Get slots
```

### Admin (Need Authentication)
```
GET    /api/admin/bookings        # List bookings
PUT    /api/admin/bookings        # Update booking
DELETE /api/admin/bookings        # Cancel booking
GET    /api/admin/slots           # List slots
POST   /api/admin/slots           # Create slot/block
PUT    /api/admin/slots           # Update slot
DELETE /api/admin/slots           # Delete slot
```

## 📋 Request/Response Examples

### Create Booking (POST /api/bookings)

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "scheduled_date": "2024-12-25",
  "scheduled_time": "14:30",
  "meeting_type": "video"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "John Doe",
    "status": "pending",
    "scheduled_date": "2024-12-25",
    "scheduled_time": "14:30:00"
  },
  "message": "Booking created successfully",
  "timestamp": "2024-11-15T10:30:00Z"
}
```

### Get Available Slots (GET /api/bookings?date=2024-12-25)

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

## ✅ Constants Reference

### Booking Status
```typescript
BOOKING_STATUS.PENDING      // "pending"
BOOKING_STATUS.CONFIRMED    // "confirmed"
BOOKING_STATUS.COMPLETED    // "completed"
BOOKING_STATUS.CANCELLED    // "cancelled"
BOOKING_STATUS.NO_SHOW      // "no_show"
```

### Meeting Type
```typescript
MEETING_TYPE.VIDEO          // "video"
MEETING_TYPE.PHONE          // "phone"
MEETING_TYPE.IN_PERSON      // "in_person"
```

### Day of Week
```typescript
DAY_OF_WEEK.SUNDAY          // 0
DAY_OF_WEEK.MONDAY          // 1
DAY_OF_WEEK.TUESDAY         // 2
DAY_OF_WEEK.WEDNESDAY       // 3
DAY_OF_WEEK.THURSDAY        // 4
DAY_OF_WEEK.FRIDAY          // 5
DAY_OF_WEEK.SATURDAY        // 6
```

## 🛠️ Helper Functions

```typescript
// Time utilities
timeToMinutes('09:30')              // 570
minutesToTime(570)                  // "09:30"

// Date utilities
isDateValid('2024-12-25')           // true/false
isDateInFuture('2024-12-25', 1)    // true/false
getDayOfWeek('2024-12-25')         // 1 (Monday)
getDayName('2024-12-25')           // "Monday"
isWeekend('2024-12-25')            // false

// Slot utilities
generateTimeSlots('09:00', '17:00', 30)  // ["09:00", "09:30", ...]
normalizeTimeSlot('14:30')                // "14:30:00"
```

## 🔐 Error Handling

### Try-Catch Pattern
```typescript
try {
  const booking = await AppointmentService.createBooking(data);
} catch (error) {
  if (error instanceof Error) {
    console.error('Error:', error.message);
  }
}
```

### HTTP Error Status Codes
```
200 - Success
201 - Created
400 - Bad Request
401 - Unauthorized
404 - Not Found
409 - Conflict (slot unavailable)
422 - Validation Error
500 - Server Error
```

## 📝 Validation Examples

### Valid Booking Data
```typescript
{
  name: 'John Doe',
  email: 'john@example.com',
  phone: '+1-555-123-4567',
  company: 'Acme Corp',
  scheduled_date: '2024-12-25',
  scheduled_time: '14:30',
  timezone: 'America/New_York',
  meeting_type: 'video',
  message: 'Looking forward to it'
}
```

### Invalid Examples (Will Fail)
```typescript
// Missing required field
{ name: 'John', email: 'john@example.com', scheduled_date: '2024-12-25' }

// Invalid email
{ email: 'not-an-email', ... }

// Invalid date format (must be YYYY-MM-DD)
{ scheduled_date: '12/25/2024', ... }

// Invalid time format (must be HH:MM)
{ scheduled_time: '2:30 PM', ... }

// Date in the past
{ scheduled_date: '2020-01-01', ... }
```

## 🧪 Testing Quick Snippets

### Create Test Booking
```typescript
const booking = await AppointmentService.createBooking({
  name: 'Test User',
  email: 'test@example.com',
  scheduled_date: '2024-12-25',
  scheduled_time: '14:00',
  meeting_type: 'video',
});
console.log('Created:', booking.id);
```

### Get Stats
```typescript
const stats = await AppointmentService.getBookingStats();
console.log('Total bookings:', stats.total);
console.log('Pending:', stats.pending);
```

### List All Slots
```typescript
const slots = await AppointmentService.getAvailableSlots();
slots.forEach(slot => {
  console.log(`${slot.day_of_week}: ${slot.start_time}-${slot.end_time}`);
});
```

## 🚀 Quick Start (5 minutes)

1. **Install/Review Files**
   - All files already created in `lib/appointments/`

2. **Create Booking**
   ```typescript
   const booking = await AppointmentService.createBooking({
     name: 'Client Name',
     email: 'client@example.com',
     scheduled_date: '2024-12-25',
     scheduled_time: '14:00',
   });
   ```

3. **Get Available Slots**
   ```typescript
   const slots = await AppointmentService.getAvailableSlotsForDate('2024-12-25');
   ```

4. **Update Booking (Admin)**
   ```typescript
   await AppointmentService.updateBooking(id, { status: 'confirmed' });
   ```

## 📖 Documentation Files

- **README.md** - Complete API documentation
- **examples.ts** - 18 working code examples
- **constants.ts** - All enums and constants
- **types.ts** - TypeScript interfaces
- **APPOINTMENT_SYSTEM_GUIDE.md** - Implementation guide
- **BACKEND_IMPROVEMENTS.md** - Detailed summary

## 🔗 Service Methods Summary

| Method | Purpose |
|--------|---------|
| `createBooking(data)` | Create new appointment |
| `getBookingById(id)` | Fetch single booking |
| `getAllBookings(filters)` | List bookings with filters |
| `updateBooking(id, updates)` | Update booking |
| `cancelBooking(id, reason)` | Cancel appointment |
| `getBookingStats()` | Get statistics |
| `isSlotAvailable(date, time)` | Check availability |
| `getAvailableSlotsForDate(date)` | Get slots for date |
| `getAvailableSlots()` | List all slots |
| `addTimeSlot(slot)` | Create slot |
| `updateTimeSlot(id, updates)` | Modify slot |
| `getBlockedDates()` | List blocked dates |
| `blockDate(date, reason)` | Block date |
| `unblockDate(id)` | Unblock date |

## ⚠️ Common Mistakes to Avoid

❌ **Wrong:** Using old API routes directly
✅ **Right:** Use `AppointmentService` methods

❌ **Wrong:** Skipping validation
✅ **Right:** Always validate input with Zod schemas

❌ **Wrong:** Ignoring error messages
✅ **Right:** Check error message for specific failure reason

❌ **Wrong:** Using wrong date format
✅ **Right:** Always use YYYY-MM-DD format

❌ **Wrong:** Booking for past dates
✅ **Right:** Always validate date is in future

## 💡 Pro Tips

1. Always catch and log errors with context
2. Validate input before sending to API
3. Use TypeScript interfaces for type safety
4. Check available slots before creating booking
5. Provide meaningful error messages to users
6. Use constants instead of magic strings
7. Implement email notifications on booking
8. Add SMS reminders for appointments
9. Cache available slots to reduce queries
10. Log booking actions for analytics

---

**For more details, see:**
- `/lib/appointments/README.md` - Full API docs
- `/lib/appointments/examples.ts` - Working code
- `/APPOINTMENT_SYSTEM_GUIDE.md` - Implementation guide
