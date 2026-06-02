# Final Report

- Project: `Sharon & Amala` wedding website
- Status: design, development, local verification, and Vercel deployment completed
- Live site: `https://sharonwedsamala.vercel.app`
- Backup deployment URL: `https://sharonwedsamala-divr8vznm-silly-gooses-projects.vercel.app`

## What Was Built

- Animated loading screen with `Sharon & Amala` and italic loading line
- Swipe-style reveal transition into the main website
- Full-screen hero section with couple photo background
- Event details section with venue links
- Live countdown to the wedding date
- Schedule timeline
- Auto-sliding repeating gallery
- In-page RSVP form
- Contact section

## Design Direction

- Light theme with ivory, champagne gold, blush, and warm cream tones
- Editorial serif typography with a soft luxury invitation feel
- Motion designed to feel ceremonial rather than flashy
- Layout inspired by premium invitation-style wedding microsites

## RSVP + Supabase

- RSVP form is connected in the app and ready for Supabase
- Data captured:
  - Guest name
  - Party size
  - Attendance
  - Food preference
  - Optional message
- Required to activate production RSVP:
  - Add `VITE_SUPABASE_URL`
  - Add `VITE_SUPABASE_ANON_KEY`
  - Run `supabase/schema.sql` in your Supabase project

## Main Project Files

- `src/App.tsx`
- `src/content.ts`
- `src/components/RsvpForm.tsx`
- `src/lib/supabase.ts`
- `supabase/schema.sql`
- `.env.example`

## Verification Completed

- `npm run build`
- `npm run lint`
- Local browser check on `http://127.0.0.1:4173`
- Production deployment on Vercel

## Notes

- The website is live now
- RSVP submissions will not work on production until Supabase env vars are added in Vercel
- All editable wedding copy and section content are centralized in `src/content.ts`
