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

### 1. Install dependencies
```bash
shadcn css and theme configuration
components 

```


## Error handling & UX states

- `app/error.tsx` — global error with retry
- `app/not-found.tsx` — styled 404 
- `loading.tsx` files under `services/`, `technicians/`, `dashboard/my-bookings/` — route-level skeletons
- Every Server Action returns `{ error?, fieldErrors?, success? }` (see `lib/types.ts` →
  `ActionState`), surfaced inline
- `EmptyState` component for zero-result lists



## 💳 Payment flow

Booking → technician **accepts** → customer clicks **Pay now** on the booking detail page
→ redirected to Stripe Checkout → on completion, Stripe redirects back to
`/payment/success?session_id=...`, which confirms the payment server-side
(`(publicGroup)/_actions/confirmPayment.ts` → `POST /payments/confirm`) and shows the
result. Closing checkout early lands on `/payment/cancel` — no charge, booking stays
`ACCEPTED` and payable again later. Full payment history: `/dashboard/payments`.









