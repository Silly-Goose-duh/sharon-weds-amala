# Sharon & Amala Wedding Website

Light-themed wedding website for Sharon and Amala, built with `React + TypeScript + Vite`.

## Included

- Animated loading screen with swipe-style reveal
- Full-screen hero with photo backdrop
- Event details and live wedding countdown
- Schedule timeline
- Infinite scrolling gallery
- In-page RSVP form backed by Supabase
- Contact section for guest coordination

## Run Locally

```bash
npm install
npm run dev
```

Local preview: `http://127.0.0.1:4173` when started with `npm run dev -- --host 127.0.0.1 --port 4173`

## Supabase Setup

1. Copy `.env.example` to `.env`.
2. Fill in `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
3. Run the SQL inside `supabase/schema.sql` in your Supabase project.

## Build

```bash
npm run build
npm run lint
```

## Main Files

- `src/App.tsx`: page structure and motion flow
- `src/content.ts`: editable wedding copy, dates, links, and gallery data
- `src/components/RsvpForm.tsx`: RSVP form UI and submit flow
- `src/lib/supabase.ts`: Supabase client and insert helper
- `supabase/schema.sql`: RSVP table schema and policy
