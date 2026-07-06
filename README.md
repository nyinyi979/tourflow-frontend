# TourFlow — Frontend

Customer-facing web application for TourFlow, a full-stack tour and travel booking platform. Browse tour packages and activities, search by destination, book with Stripe payments, and manage bookings from a personal dashboard.

**Live demo:** _coming soon_  
**Backend repo:** [tourflow-api](https://github.com/[your-org]/tourflow-api)

---

## Stack

- **Framework** — Next.js 15 (App Router)
- **Language** — TypeScript
- **Styling** — Tailwind CSS
- **State** — Zustand
- **Data fetching** — TanStack Query
- **Forms** — React Hook Form + Zod
- **Animations** — Framer Motion
- **Payments** — Stripe.js

---

## Features

- Tour and activity listing with filters (category, price, duration, difficulty)
- Tour detail page with image gallery, itinerary, availability calendar, and sticky booking sidebar
- Multi-step checkout flow — guest details → Stripe payment → confirmation
- User authentication (register, login, JWT)
- Personal dashboard — upcoming and past bookings with status tracking
- Search across tours and activities by destination and date
- Category pages and review sections per tour
- Fully responsive, mobile-first

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm
- A running instance of [tourflow-api](https://github.com/[your-org]/tourflow-api)

### Installation

```bash
git clone https://github.com/[your-org]/tourflow-frontend.git
cd tourflow-frontend
npm install
```

### Environment Variables

Create a `.env.local` file in the root:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
```

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_API_URL` | Base URL of the TourFlow backend API |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key for payment UI |

### Development

```bash
npm run dev
```

App runs at [http://localhost:3000](http://localhost:3000).

### Build

```bash
npm run build
npm start
```

---

## Project Structure

```
src/
├── app/                  # Next.js App Router pages
│   ├── (auth)/           # Login and register pages
│   ├── tours/            # Tour listing and detail pages
│   ├── activities/       # Activity listing and detail pages
│   ├── booking/          # Checkout flow and confirmation
│   ├── search/           # Search results page
│   ├── profile/          # User dashboard and bookings
│   └── categories/       # Category landing pages
├── components/           # Shared UI components
│   ├── ui/               # Base components (buttons, inputs, cards)
│   ├── tours/            # Tour-specific components
│   ├── booking/          # Checkout step components
│   └── layout/           # Header, footer, nav
├── hooks/                # Custom React hooks
├── lib/                  # API client, auth helpers, utils
├── stores/               # Zustand stores
└── types/                # TypeScript types and interfaces
```

---

## Pages

| Route | Description |
|---|---|
| `/` | Home — featured tours, activities, categories, testimonials |
| `/tours` | Tour listing with filter sidebar and sort |
| `/tours/[slug]` | Tour detail — gallery, itinerary, booking sidebar, reviews |
| `/activities` | Activity listing |
| `/activities/[slug]` | Activity detail |
| `/categories/[slug]` | Category landing page |
| `/search` | Search results for tours and activities |
| `/booking` | Multi-step checkout flow |
| `/booking/confirmation` | Booking confirmation with reference number |
| `/login` | Login |
| `/register` | Register |
| `/profile` | User profile and booking history |

---

## Deployment

The frontend is deployed on [Vercel](https://vercel.com). Push to `main` triggers an automatic deployment.

Set the same environment variables in your Vercel project settings under **Settings → Environment Variables**.

---

## Related

- [tourflow-api](https://github.com/[your-org]/tourflow-api) — Fastify + PostgreSQL backend