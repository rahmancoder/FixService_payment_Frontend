# Mapping Backend API to frontend API Integration

How each part of the FixItNow frontend consumes the FixItNow backend API
(`API_URL`, local/Development server `http://localhost:5000/api`,
 Live/Production server `https://fixservice-payment-frontend.vercel.app/api`
).

All server-side calls go through `fetch`:

- `lib/backendFetch.ts` → `backendFetch()` — attaches the access-token cookie, used by Server Actions.
- `proxy.ts` (root) — the Next.js Proxy/middleware; verifies/refreshes tokens on every request.




## Public browsing Mapping

| Frontend | Backend endpoint |
|---|---|
| `(publicGroup)/page.tsx` (homepage) | `GET /categories`, `GET /services?limit=6`, `GET /technicians?limit=1` |
| `(publicGroup)/services/page.tsx` + `_components/services/*` | `GET /services` (filters: `searchTerm`, `categoryId`, `minPrice`, `maxPrice`), `GET /categories` |
| `(publicGroup)/services/[id]/page.tsx` | `GET /services/:id` |
| `(publicGroup)/technicians/page.tsx` + `_components/technicians/*` | `GET /technicians` (filters: `searchTerm`, `location`, `minRating`) |
| `(publicGroup)/technicians/[id]/page.tsx` | `GET /technician/single/:id` ( services, availability, reviews) |


## Authentication and Authorization Mapping

| Frontend | Backend endpoint | Notes |
|---|---|---|
| `(authGroup)/_components/LoginForm.tsx` → `_actions/authActions.ts#loginAction` | `POST /auth/login` | RHF+Zod (`lib/schemas.ts#loginSchema`). Sets `fixitnow_access_token` + `fixitnow_refresh_token` httpOnly cookies. |
| `(authGroup)/_components/RegisterForm.tsx` → `_actions/authActions.ts#registerAction` | `POST /auth/register` | RHF+Zod (`registerSchema`). Same cookie handling. |
| `components/shared/navbar.tsx` (via `service/getMe.ts#getSession`) | *(local JWT decode )* | Cheap role/identity  rendering. |
| `service/getMe.ts#getMe` | `GET /auth/me` | Full user record incl. `technicianProfile`. |
| `service/logout.ts#logout` | *(clears cookies only)* | |
| `proxy.ts` (root) | `POST /auth/refresh-token` (via `service/refreshToken.ts`) |  access-token renewal on every request when expired. |




## Booking & payment flow (customer) Mapping


| Frontend | Backend endpoint |
|---|---|
| `(publicGroup)/book/[serviceId]/BookingForm.tsx` → `_actions/createBooking.ts` | `GET /technicians/:id` (for availability, time-slot picker), `POST /bookings` |
| `(dashboardGroup)/dashboard/page.tsx` (overview) | `GET /bookings` |
| `(dashboardGroup)/dashboard/my-bookings/page.tsx` | `GET /bookings` |
| `(dashboardGroup)/dashboard/my-bookings/[id]/page.tsx` | `GET /bookings/:id` |
| `.../[id]/BookingActions.tsx` → `_actions/bookingActions.ts#cancelBooking` | `PATCH /bookings/:id/cancel` |
| `.../[id]/BookingActions.tsx` → `#payForBooking` | `POST /payments/create` → redirects to Stripe Checkout |
| `(publicGroup)/payment/success/page.tsx` → `_actions/confirmPayment.ts` | `POST /payments/confirm` (with Stripe `session_id`) |
| `(publicGroup)/payment/cancel/page.tsx` | *(informational only)* |
| `(dashboardGroup)/dashboard/payments/page.tsx` | `GET /payments` |
| `.../[id]/BookingActions.tsx` → `#submitReview` | `POST /reviews` |
| `(dashboardGroup)/dashboard/profile/page.tsx` | `GET /auth/me` |




## Technician dashboard Mapping

| Frontend | Backend endpoint |
|---|---|
| `technician-dashboard/page.tsx` | `GET /auth/me`, `GET /technician/bookings`, `GET /categories`, `GET /technician/single/:id` |
| `BookingsTab.tsx` → `_actions/bookingActions.ts#updateBookingStatus` | `PATCH /technician/bookings/:id` |
| `ProfileTab.tsx` → `_actions/profileActions.ts#updateProfile` | `PUT /technician/profile` |
| `AvailabilityTab.tsx` → `#updateAvailability` | `PUT /technician/availability` |
| `ServicesTab.tsx` / `_components/ServiceFormDialog.tsx` → `_actions/serviceActions.ts` | `POST /services`, `DELETE /services/:id` |


## Admin dashboard Mapping

| Frontend | Backend endpoint |
|---|---|
| `admin-dashboard/page.tsx` | `GET /admin/users`, `GET /admin/bookings`, `GET /categories` |
| `UsersTab.tsx` → `_actions/adminActions.ts#toggleUserStatus` | `PATCH /admin/users/:id` |
| `CategoriesTab.tsx` → `#createCategory` | `POST /admin/categories` |

Stats cards on both the admin and technician dashboards (`_components/StatsCard.tsx`).



# Role Based Mapping OverView

## Customer 

| Frontend Component | Backend API                      |
| ------------------ | -------------------------------- |
| Dashboard Overview | `GET /api/bookings`              |
| Booking List       | `GET /api/bookings`              |
| Booking Details    | `GET /api/bookings/:id`          |
| Cancel Booking     | `PATCH /api/bookings/:id/cancel` |
| Payment History    | `GET /api/payments`              |
| Pay for Booking    | `POST /api/payments/create`      |
| Payment Success    | `POST /api/payments/confirm`     |
| Submit Review      | `POST /api/reviews`              |
| Customer Profile   | `GET /api/auth/me`               |


## Technician

| Frontend Component      | Backend API                          |
| ----------------------- | ------------------------------------ |
| Dashboard Overview      | `GET /api/auth/me`                   |
| Technician Profile      | `PUT /api/technician/profile`        |
| Availability Management | `PUT /api/technician/availability`   |
| Booking Management      | `GET /api/technician/bookings`       |
| Update Booking Status   | `PATCH /api/technician/bookings/:id` |
| Create Service          | `POST /api/services`                 |
| Delete Service          | `DELETE /api/services/:id`           |
| Categories Dropdown     | `GET /api/categories`                |



## Admin

| Frontend Component | Backend API                                       |
| ------------------ | ------------------------------------------------- |
| Dashboard Overview | `GET /api/admin/users`, `GET /api/admin/bookings` |
| User Management    | `GET /api/admin/users`                            |
| Ban / Unban User   | `PATCH /api/admin/users/:id`                      |
| Booking Management | `GET /api/admin/bookings`                         |
| Category List      | `GET /api/categories`                             |
| Create Category    | `POST /api/admin/categories`                      |



## Public 


| Frontend Component           | Backend API                      |
| ---------------------------- | -------------------------------- |
| Homepage                     | `GET /api/services?limit=6`      |
| Homepage Categories          | `GET /api/categories`            |
| Homepage Featured Technician | `GET /api/technician?limit=1`    |
| Service Listing              | `GET /api/services`              |
| Service Details              | `GET /api/services/:id`          |
| Technician Listing           | `GET /api/technician`            |
| Technician Details           | `GET /api/technician/single/:id` |
