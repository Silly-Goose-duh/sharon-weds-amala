import type { RsvpInsert } from '../types/rsvp'

type Env = {
  VITE_SUPABASE_URL?: string
  VITE_SUPABASE_ANON_KEY?: string
  VITE_APP_MODE?: string
}

const env = (import.meta as any).env as Env

const supabaseUrl = env.VITE_SUPABASE_URL?.trim() ?? ''
const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY?.trim() ?? ''
const tableName = env.VITE_APP_MODE === 'simple' ? 'rsvps_sa' : 'rsvps'

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)

export async function submitRsvp(payload: RsvpInsert): Promise<void> {
  if (!isSupabaseConfigured) {
    throw new Error('Supabase is not configured.')
  }

  const res = await fetch(`${supabaseUrl}/rest/v1/${tableName}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: supabaseAnonKey,
      Authorization: `Bearer ${supabaseAnonKey}`,
      Prefer: 'return=minimal',
    },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    const body = await res.text()
    let msg: string
    try {
      msg = JSON.parse(body).message ?? body
    } catch {
      msg = body
    }
    throw new Error(msg)
  }
}
