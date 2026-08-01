# Mapping Backend API to frontend API Integration

How each part of the FixItNow frontend consumes the FixItNow backend API
(`API_URL`, local/Development server `http://localhost:5000/api`,
 Live/Production server `https://fixservice-payment-frontend.vercel.app/api`
).

All server-side calls go through `fetch`:

- `lib/backendFetch.ts` → `backendFetch()` — attaches the access-token cookie, used by Server Actions.
- `proxy.ts` (root) — the Next.js Proxy/middleware; verifies/refreshes tokens on every request.




## Public browsing

| Frontend | Backend endpoint |
|---|---|
| `(publicGroup)/page.tsx` (homepage) | `GET /categories`, `GET /services?limit=6`, `GET /technicians?limit=1` |
| `(publicGroup)/services/page.tsx` + `_components/services/*` | `GET /services` (filters: `searchTerm`, `categoryId`, `minPrice`, `maxPrice`), `GET /categories` |
| `(publicGroup)/services/[id]/page.tsx` | `GET /services/:id` |
| `(publicGroup)/technicians/page.tsx` + `_components/technicians/*` | `GET /technicians` (filters: `searchTerm`, `location`, `minRating`) |
| `(publicGroup)/technicians/[id]/page.tsx` | `GET /technician/single/:id` ( services, availability, reviews) |


## Booking & payment flow (customer)



## Technician dashboard

| Frontend | Backend endpoint |
|---|---|
| `technician-dashboard/page.tsx` | `GET /auth/me`, `GET /technician/bookings`, `GET /categories`, `GET /technician/single/:id` |
| `BookingsTab.tsx` → `_actions/bookingActions.ts#updateBookingStatus` | `PATCH /technician/bookings/:id` |
| `ProfileTab.tsx` → `_actions/profileActions.ts#updateProfile` | `PUT /technician/profile` |
| `AvailabilityTab.tsx` → `#updateAvailability` | `PUT /technician/availability` |
| `ServicesTab.tsx` / `_components/ServiceFormDialog.tsx` → `_actions/serviceActions.ts` | `POST /services`, `DELETE /services/:id` |


## Admin dashboard

| Frontend | Backend endpoint |
|---|---|
| `admin-dashboard/page.tsx` | `GET /admin/users`, `GET /admin/bookings`, `GET /categories` |
| `UsersTab.tsx` → `_actions/adminActions.ts#toggleUserStatus` | `PATCH /admin/users/:id` |
| `CategoriesTab.tsx` → `#createCategory` | `POST /admin/categories` |

Stats cards on both the admin and technician dashboards (`_components/StatsCard.tsx`).
