# FixService Payment Frontend



This is a Next.js 16 (App Router) frontend for home services the FixService_Payment Backend project
built with route groups, private `_actions`/`_components` folders, Server Actions,
shadcn/ui, and a `proxy.ts`-centralized access-token/refresh-token auth flow.


## Design concept

The visual identity is a **"job docket"** — every service, booking, and technician card is
styled like a paper work order (stub notch, dashed tear-lines, mono-font status stamps),
mirroring the product's real booking lifecycle.

## Tech stack

- **Next.js 16** — App Router, Server Components, Server Actions, `proxy.ts` (the
  renamed Middleware), 
- **React 19** (`useTransition`)
- **TypeScript**
- **Tailwind CSS v4** — CSS-first config via `@theme` in `app/globals.css`
- **shadcn/ui** (Radix primitives) — `components/ui/`
- **React Hook Form + Zod** — client-side validation on every form (`lib/schemas.ts`), errors shown inline
- **sonner** — toast notifications for every mutation's success/error state
- **jsonwebtoken** — access/refresh token signing & verification
- **Stripe Checkout** — payment flow with `/payment/success` and `/payment/cancel` pages


## Authentication & authorization — access token + refresh token via `proxy.ts`

Next.js 16 renamed `middleware.ts` to `proxy.ts` (same execution point, same purpose —
just a clearer name, and it now always runs on the Node.js runtime instead of Edge,
which is what lets us use `jsonwebtoken` directly). This project centralizes **all**
authentication and authorization in that one file:



`lib/backendFetch.ts` is a separate, plain fetch helper.

## Project structure

```
app/
├── (authGroup)/
│   ├── _actions/authActions.ts       # loginAction - set  cookies
│   ├── _components/LoginForm.tsx, RegisterForm.tsx
│   └── login/page.tsx, register/page.tsx
|
├── (dashboardGroup)/
│   ├── _actions/                       # bookingActions, profileActions, serviceActions, adminActions
│   ├── _components/                     # BookingCard, BookingList, BookingSkeleton, 
│   ├── admin-dashboard/, technician-dashboard/, dashboard/{my-bookings,profile}/
│   └── layout.tsx                        # proxy.ts owns the auth gat
|
├── (publicGroup)/
│   ├── _actions/getServices.ts, getTechnicians.ts, createBooking.ts
│   ├── _components/services/, technicians/
│   ├── services/, technicians/, book/[serviceId]/
│   └── page.tsx                            # homepage
|
├── error.tsx, loading.tsx, not-found.tsx, layout.tsx, globals.css
components/
├── shared/          # navbar, footer, status-badge, rating-stars, empty-state, pagination
└── ui/              # shadcn/ui: button, input, label, textarea, badge, card, dialog, checkbox, dropdown-menu, sonner
lib/                 # types.ts, utils.ts, backendFetch.ts (server-only backend fetch wrapper)
service/             # getMe.ts, logout.ts, refreshToken.ts
utils/               # jwt.ts (jsonwebtoken-based verify)
proxy.ts             # Proxy — auth + authorization  here
```

## Getting started
```bash
npx create-next-app@latest
```
```bash
shadcn css and theme configuration
components 

```

### Install dependencies

# Main Dependencies

| Package | Purpose |
|----------|---------|
| **Next.js 16** | React Full-Stack Framework |
| **React 19** | UI Library |
| **TypeScript** | Static Type Checking |
| **Tailwind CSS v4** | Utility-first CSS Framework |
| **Shadcn/UI** | Modern UI Component Library |
| **Radix UI** | Accessible UI Primitives |
| **React Hook Form** | Form State Management |
| **Zod v4** | Form Validation |
| **@hookform/resolvers** | React Hook Form + Zod Integration |
| **Sonner** | Toast Notifications |
| **Lucide React** | Icon Library |
| **Remix Icon** | Icon Set |
| **jsonwebtoken** | JWT Authentication |
| **server-only** | Server-only Module Protection |
| **clsx** | Conditional Class Names |
| **tailwind-merge** | Tailwind Class Merging |
| **class-variance-authority (CVA)** | Component Variant Management |
| **tw-animate-css** | Tailwind Animation Utilities |

---

# Installed Packages

### Core Framework

```bash
npm install next react react-dom
```

### Styling

```bash
npm install tailwind-merge clsx class-variance-authority tw-animate-css
```

### UI Components

```bash
npm install shadcn @base-ui/react
```

### Radix UI

```bash
npm install @radix-ui/react-dialog
npm install @radix-ui/react-dropdown-menu
npm install @radix-ui/react-popover
npm install @radix-ui/react-slot
```

### Icons

```bash
npm install lucide-react @remixicon/react
```

### Forms & Validation

```bash
npm install react-hook-form
npm install zod
npm install @hookform/resolvers
```

### Authentication

```bash
npm install jsonwebtoken
npm install server-only
```

### Notifications

```bash
npm install sonner
```

---

# Development Dependencies

```bash
npm install -D typescript
npm install -D @types/node
npm install -D @types/react
npm install -D @types/react-dom
npm install -D @types/jsonwebtoken
npm install -D eslint
npm install -D eslint-config-next
npm install -D tailwindcss
npm install -D @tailwindcss/postcss
```



## Error handling & UX states

- `app/error.tsx` — global error with retry
- `app/not-found.tsx` — styled 404 
- `loading.tsx` files under `services/`, `technicians/`, `dashboard/my-bookings/` — route-level skeletons
- Every Server Action returns `{ error?, fieldErrors?, success? }` (see `lib/types.ts` →
  `ActionState`), surfaced inline
- `EmptyState` component for zero-result lists



## Payment flow

Booking → technician **accepts** → customer clicks **Pay now** on the booking detail page
→ redirected to Stripe Checkout → on completion, Stripe redirects back to
`/payment/success?session_id=...`, which confirms the payment server-side
(`(publicGroup)/_actions/confirmPayment.ts` → `POST /payments/confirm`) and shows the
result. Closing checkout early lands on `/payment/cancel` — no charge, booking stays
`ACCEPTED` and payable again later. Full payment history: `/dashboard/payments`.



# Summary API Integration with backend API

## Authentication API Integration

| Frontend Component | Backend API                       |
| ------------------ | --------------------------------- |
| `LoginForm.tsx`    | `POST /api/auth/login`            |
| `RegisterForm.tsx` | `POST /api/auth/register`         |
| `Navbar.tsx`       | Local JWT Decode (`getSession()`) |
| `getMe.ts`         | `GET /api/auth/me`                |
| `logout.ts`        | Clears Authentication Cookies     |
| `proxy.ts`         | `POST /api/auth/refresh`          |


## Overview Mapping


| Next.js Route                 | Component / Feature                                         | Backend API Consumption                                                                                     |
| ----------------------------- | ----------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `/`                           | Home page (Featured Services, Categories, Technician Stats) | `GET /api/services?limit=6`, `GET /api/categories`, `GET /api/technician?limit=1`                           |
| `/services`                   | Browse & Filter Services                                    | `GET /api/services`, `GET /api/categories`                                                                  |
| `/services/[id]`              | Service Details                                             | `GET /api/users/services/:id`                                                                                     |
| `/technicians`                | Browse Technicians                                          | `GET /api/technician`                                                                                       |
| `/technician/[id]`           | Technician Profile (Services, Reviews, Availability)        | `GET /api/technician/single/:id`                                                                            |
| `/book/[serviceId]`           | Booking Form                                                | `GET /api/technician/single/:id`, `POST /api/bookings`                                                      |
| `/login`                      | Login Form                                                  | `POST /api/auth/login`                                                                                      |
| `/register`                   | Registration Form                                           | `POST /api/auth/register`                                                                                   |
| `/payment/success`            | Stripe Payment Success                                      | `POST /api/payments/confirm`                                                                                |
| `/payment/cancel`             | Payment Cancel Page                                         | *(No API call)*                                                                                             |
| `/dashboard`                  | Customer Dashboard Overview                                 | `GET /api/bookings`                                                                                         |
| `/dashboard/my-bookings`      | Customer Booking History                                    | `GET /api/bookings`                                                                                         |
| `/dashboard/my-bookings/[id]` | Booking Details                                             | `GET /api/bookings/:id`                                                                                     |
| `/dashboard/payments`         | Customer Payment History                                    | `GET /api/payments`                                                                                         |
| `/dashboard/profile`          | Customer Profile                                            | `GET /api/auth/me`                                                                                          |
| `/technician-dashboard`       | Technician Dashboard                                        | `GET /api/auth/me`, `GET /api/technician/bookings`, `GET /api/categories`, `GET /api/technician/single/:id` |
| `/admin-dashboard`            | Admin Dashboard                                             | `GET /api/admin/users`, `GET /api/admin/bookings`, `GET /api/categories`                                    |




# Conclusion

FixService-Payment Frontend demonstrates the development of a production-ready service marketplace by combining modern frontend technologies with a scalable backend architecture. The project emphasizes clean code organization, reusable components, secure authentication, robust form validation, efficient API integration, and responsive user experience.

Throughout this project we have implemented-

- Role-Based Authentication (Customer, Technician, Admin)
- Protected Routes using Next.js Middleware
- JWT Authentication with HTTP-only Cookies
- Server Actions for Secure Data Mutations
- RESTful API Integration
- Stripe Payment Gateway Integration
- Form Validation with React Hook Form & Zod v4
- Responsive UI with Tailwind CSS & Shadcn/UI
- Modular and Scalable App Router Architecture
- CRUD Operations with Real-Time UI Updates
- Error Handling and User Feedback using Sonner Toasts

This project reflects modern full-stack development practices and serves as a strong foundation for building scalable marketplace applications. Its modular architecture allows future enhancements such as real-time notifications, chat functionality, advanced search, AI-powered technician recommendations, analytics dashboards, and mobile application support.

---

##  Future Improvements


- Real-Time Notifications
- Customer–Technician Live Chat
- AI-Based Technician Recommendation
- Google Maps & Location Services
- Advanced Review & Rating Analytics
- Interactive Admin Dashboard Analytics
- Multi-Language Support
- Email & SMS Notifications
- Invoice & Receipt Generation


---

## Author

**Md. Mustafizur Rahman** @rahmancoder 

Computer Science & Engineering Student | Full Stack Developer

Passionate about building scalable web applications, solving real-world problems, and continuously learning modern technologies. I enjoy transforming ideas into reliable, maintainable, and user-friendly software.












