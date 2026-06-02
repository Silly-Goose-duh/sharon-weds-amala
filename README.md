# Sharon Weds Amala

A wedding reservation website for Sharon & Amala — built to share with WhatsApp groups so guests can RSVP instantly.

## Tech Stack

| Layer | Choice |
|---|---|
| **Frontend** | React 19 + TypeScript + Vite |
| **Animations** | Framer Motion |
| **Styling** | Custom CSS with theme system (dark/light/emerald/rose) |
| **RSVP Database** | Supabase (PostgreSQL) — guest name, party size, attendance, food preference, affiliation (bride/groom/both), message |
| **Deployment** | Vercel (two variants: full 3-event version & simple 2-event version) |
| **Images** | Sharp (batch conversion to WebP) |
| **Maps** | OpenStreetMap embeds (no API key needed) |
| **Calendar** | Google Calendar link (opens pre-filled event on RSVP) |

## Live Sites

- Full version (3 events): [sharonwedsamala.vercel.app](https://sharonwedsamala.vercel.app)
- Simple version (2 events): [weddingcardsa.vercel.app](https://weddingcardsa.vercel.app)

## Run Locally

```bash
npm install
npm run dev
```

## Supabase Setup

1. Copy `.env.example` to `.env`.
2. Fill in `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
3. Run the SQL inside `supabase/schema.sql` in your Supabase project SQL Editor.

## Project Structure

- `src/App.tsx` — page layout, sections, theme toggle, loader
- `src/content.ts` — all wedding copy, dates, gallery, events (switches by `VITE_APP_MODE`)
- `src/components/RsvpForm.tsx` — RSVP form with affiliation picker + Google Calendar redirect
- `src/lib/supabase.ts` — direct fetch to Supabase REST API (no SDK)
- `src/lib/calendar.ts` — Google Calendar URL builder utility
- `src/types/rsvp.ts` — TypeScript types for RSVP data
- `supabase/schema.sql` — full database schema with RLS policies

## Features

- Animated loading screen with liquid swirl reveal
- Countdown timer to the wedding day
- Event cards with maps for each venue
- Creative schedule timeline with icons
- Infinite marquee gallery
- Theme switcher with lock
- RSVP form with Google Calendar auto-redirect on confirmation
- Two deployment modes via `VITE_APP_MODE` env var
