# TourFlow frontend

Customer-facing application for TourFlow. Customers can browse tours and
activities, create bookings, submit tour reviews, and manage their bookings.

## Stack

- Next.js 16 with the App Router
- React 19 and TypeScript
- Tailwind CSS 4
- TanStack Query for authenticated client-side data
- shadcn/ui primitives

Public catalog and detail pages are rendered on the server. Authentication and
customer-specific requests use TanStack Query in client components because the
customer token is stored in the browser.

## Features

- Server-rendered tour and activity catalogs
- URL-based search, category filtering, sorting, and pagination
- Tour and activity detail pages with dynamic metadata
- Customer registration, login, and session handling
- Tour and activity booking with confirmation details
- Customer account and booking cancellation
- Tour reviews, categories, and testimonials
- Responsive layouts and optimized remote images

## Getting started

### Requirements

- Node.js 20.9 or newer
- npm
- A running TourFlow API

Install dependencies:

```bash
npm install
```

Create `.env.local` in the project root:

```env
NEXT_PUBLIC_FETCH_URL=http://127.0.0.1:7000
```

`NEXT_PUBLIC_FETCH_URL` must be the base URL of the TourFlow API without a
trailing endpoint path.

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Commands

```bash
npm run dev       # Start the development server
npm run lint      # Run ESLint
npx tsc --noEmit  # Check TypeScript
npm run build     # Create a production build
npm start         # Run the production build
```

## Project structure

```text
src/
├── app/                # Next.js routes, layouts, and route metadata
├── assets/             # Images bundled by Next.js
├── components/         # Shared application and UI components
│   └── ui/             # shadcn/ui primitives (lowercase filenames)
├── features/           # Feature-owned UI, API functions, types, and queries
│   ├── activities/
│   ├── auth/
│   ├── bookings/
│   ├── categories/
│   ├── tours/
│   └── ...
└── lib/                # Shared API client, session helpers, and utilities
```

Route files in `src/app` should stay small. Feature behavior belongs in the
corresponding folder under `src/features`, while reusable primitives belong in
`src/components` or `src/lib`.

## Routes

| Route | Description |
| --- | --- |
| `/` | Featured tours, activities, categories, and testimonials |
| `/tours` | Paginated tour catalog with filters and sorting |
| `/tours/[id]` | Tour details, booking controls, and reviews |
| `/activities` | Paginated activity catalog with filters and sorting |
| `/activities/[id]` | Activity details and booking controls |
| `/booking` | Booking form for a selected tour or activity |
| `/booking/confirmation` | Booking confirmation and reference number |
| `/account` | Customer details and booking history |
| `/login` | Customer login |
| `/register` | Customer registration |
| `/about` | About TourFlow |
| `/contact` | Contact information |

Catalog URLs use one-based page numbers for customers. The API request adapters
convert them to the API's zero-based pagination internally.

## API errors and authentication

All requests go through `src/lib/api/client.ts`. Authenticated requests attach
the customer token using the `x-access-token` header. A `401` response clears the
local session and redirects the customer to login while preserving the intended
destination.

Do not commit `.env.local` or other environment files.
