import { useState } from 'react'
import type { FormEvent } from 'react'

import { isSupabaseConfigured, submitRsvp } from '../lib/supabase'
import {
  attendanceOptions,
  foodPreferenceOptions,
  affiliationOptions,
  type RsvpFormValues,
  type RsvpSubmitState,
} from '../types/rsvp'

type RsvpFormProps = {
  className?: string
}

const defaultValues: RsvpFormValues = {
  guestName: '',
  partySize: 1,
  attendance: 'yes',
  foodPreference: 'veg',
  affiliation: 'both',
  message: '',
}

const s = `
  .rf { display: grid; gap: 1.25rem; width: 100%; }
  .rf-p { display: grid; gap: 1.25rem; padding: 1.5rem; border: 1px solid var(--border); border-radius: var(--radius-lg); background: var(--card-bg); backdrop-filter: blur(10px); }
  .rf-h { display: grid; gap: 0.35rem; }
  .rf-t { margin: 0; font-size: 1.2rem; line-height: 1.2; color: var(--text); font-family: var(--serif); }
  .rf-i { margin: 0; color: var(--text-secondary); line-height: 1.5; font-size: 0.9rem; }
  .rf-g { display: grid; gap: 1rem; }
  .rf-f { display: grid; gap: 0.5rem; }
  .rf-l { font-weight: 600; font-size: 0.85rem; color: var(--text); }
  .rf-c { width: 100%; border: 1px solid var(--border); border-radius: var(--radius-md); padding: 0.85rem 0.95rem; font: inherit; color: var(--text); background: var(--surface); transition: border-color 150ms ease, box-shadow 150ms ease; }
  .rf-c:focus { outline: none; border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-glow); }
  .rf-c:disabled { cursor: not-allowed; opacity: 0.6; }
  .rf-s { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.65rem; }
  .rf-t3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.65rem; }
  .rf-pill { border: 1px solid var(--border); border-radius: 999px; background: var(--surface); color: var(--text); font: inherit; font-weight: 600; font-size: 0.85rem; padding: 0.8rem 1rem; cursor: pointer; transition: all 150ms ease; }
  .rf-pill:hover:not(:disabled) { border-color: var(--accent); }
  .rf-pill:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--accent-glow); }
  .rf-pill--sel { border-color: var(--accent); background: var(--accent); color: var(--bg); box-shadow: 0 0 20px var(--accent-glow); }
  .rf-msg { min-height: 6rem; resize: vertical; }
  .rf-acts { display: flex; flex-wrap: wrap; align-items: center; gap: 0.85rem; }
  .rf-sub { border: none; border-radius: 999px; padding: 0.9rem 1.5rem; font: inherit; font-weight: 700; background: var(--accent); color: var(--bg); cursor: pointer; transition: all 150ms ease; font-size: 0.9rem; }
  .rf-sub:hover:not(:disabled) { box-shadow: 0 0 30px var(--accent-glow); transform: translateY(-2px); }
  .rf-sub:disabled { cursor: not-allowed; opacity: 0.6; }
  .rf-status { padding: 0.75rem 0.9rem; border-radius: var(--radius-sm); font-size: 0.85rem; }
  .rf-status--ok { color: #4ade80; background: rgba(74, 222, 128, 0.1); border: 1px solid rgba(74, 222, 128, 0.2); }
  .rf-status--err { color: #f87171; background: rgba(248, 113, 113, 0.1); border: 1px solid rgba(248, 113, 113, 0.2); }
  .rf-status--info { color: var(--accent); background: rgba(212, 168, 83, 0.1); border: 1px solid rgba(212, 168, 83, 0.2); }
  @media (max-width: 640px) {
    .rf-p { padding: 1rem; }
    .rf-s { grid-template-columns: 1fr; }
    .rf-t3 { grid-template-columns: 1fr; }
    .rf-acts { flex-direction: column; align-items: stretch; }
    .rf-sub { width: 100%; }
  }
`

function fmtOpt(opt: string) {
  return opt === 'non-veg' ? 'Non-Veg' : opt.charAt(0).toUpperCase() + opt.slice(1)
}

function fmtAffil(opt: string) {
  if (opt === 'bride') return "Bride's Side"
  if (opt === 'groom') return "Groom's Side"
  return 'Both Families'
}

export default function RsvpForm({ className }: RsvpFormProps) {
  const [vals, setVals] = useState<RsvpFormValues>(defaultValues)
  const [state, setState] = useState<RsvpSubmitState>('idle')
  const [msg, setMsg] = useState('')


  const cls = ['rf', className].filter(Boolean).join(' ')
  const submitting = state === 'submitting'

  function onText(field: 'guestName' | 'message', value: string) {
    setVals(v => ({ ...v, [field]: value }))
  }

  function onParty(v: string) {
    const n = Number.parseInt(v, 10)
    setVals(v => ({ ...v, partySize: Number.isNaN(n) ? 1 : Math.max(1, n) }))
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const name = vals.guestName.trim()
    const note = vals.message.trim()
    if (!name) {
      setState('error'); setMsg('Please add the guest name.')
      return
    }
    if (!isSupabaseConfigured) {
      setState('error'); setMsg('Supabase is not configured yet.')
      return
    }
    try {
      setState('submitting'); setMsg('Sending...')
      await submitRsvp({
        guest_name: name,
        party_size: Math.max(1, vals.partySize),
        attendance: vals.attendance,
        food_preference: vals.foodPreference,
        affiliation: vals.affiliation,
        message: note,
      })
      const wasYes = vals.attendance === 'yes'
      setState('success')
      setMsg(wasYes
        ? 'Thank you! We cannot wait to celebrate with you.'
        : 'Thank you for letting us know.')
      setVals(defaultValues)
      if (wasYes) {
        window.open('https://www.google.com/calendar/render?action=TEMPLATE&text=Wedding%20of%20Sharon%20%26%20Amala&dates=20260708T050000Z%2F20260708T100000Z&details=A%20church%20wedding%20wrapped%20in%20grace%2C%20family%2C%20and%20golden%20daylight.&location=St.%20Peter%27s%20Forane%20Church%2C%20Parassala%20%E2%80%93%20Reception%20at%20GS%20Convention%20Centre%2C%20Kurumkutty&sf=true&output=xml', '_blank')
      }
    } catch (err) {
      setState('error')
      setMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    }
  }

  return (
    <>
      <style>{s}</style>
      <form className={cls} onSubmit={onSubmit} noValidate>
        <div className="rf-p">
          <header className="rf-h">
            <h2 className="rf-t">Let us know if you can make it</h2>
            <p className="rf-i">Confirm your participation directly here.</p>
          </header>

          <div className="rf-g">
            <label className="rf-f">
              <span className="rf-l">Guest Name</span>
              <input className="rf-c" type="text" value={vals.guestName}
                onChange={e => onText('guestName', e.target.value)}
                placeholder="Enter your full name" autoComplete="name"
                disabled={submitting} required />
            </label>

            <label className="rf-f">
              <span className="rf-l">Party Size</span>
              <input className="rf-c" type="number" value={vals.partySize}
                onChange={e => onParty(e.target.value)}
                min={1} step={1} inputMode="numeric" disabled={submitting} required />
            </label>

            <div className="rf-f">
              <span className="rf-l">You are with the</span>
              <div className="rf-t3" role="group" aria-label="Affiliation">
                {affiliationOptions.map(o => (
                  <button key={o} type="button"
                    className={`rf-pill${vals.affiliation === o ? ' rf-pill--sel' : ''}`}
                    onClick={() => setVals(v => ({ ...v, affiliation: o }))}
                    aria-pressed={vals.affiliation === o} disabled={submitting}>
                    {fmtAffil(o)}
                  </button>
                ))}
              </div>
            </div>

            <div className="rf-f">
              <span className="rf-l">Will you attend?</span>
              <div className="rf-s" role="group" aria-label="Attendance">
                {attendanceOptions.map(o => (
                  <button key={o} type="button"
                    className={`rf-pill${vals.attendance === o ? ' rf-pill--sel' : ''}`}
                    onClick={() => setVals(v => ({ ...v, attendance: o }))}
                    aria-pressed={vals.attendance === o} disabled={submitting}>
                    {o === 'yes' ? 'Joyfully attending' : 'Sending regrets'}
                  </button>
                ))}
              </div>
            </div>

            <div className="rf-f">
              <span className="rf-l">Food Preference</span>
              <div className="rf-s" role="group" aria-label="Food preference">
                {foodPreferenceOptions.map(o => (
                  <button key={o} type="button"
                    className={`rf-pill${vals.foodPreference === o ? ' rf-pill--sel' : ''}`}
                    onClick={() => setVals(v => ({ ...v, foodPreference: o }))}
                    aria-pressed={vals.foodPreference === o} disabled={submitting}>
                    {fmtOpt(o)}
                  </button>
                ))}
              </div>
            </div>

            <label className="rf-f">
              <span className="rf-l">Message (Optional)</span>
              <textarea className="rf-c rf-msg" value={vals.message}
                onChange={e => onText('message', e.target.value)}
                placeholder="Share any note for the couple" disabled={submitting} />
            </label>
          </div>

          <div className="rf-acts">
            <button className="rf-sub" type="submit" disabled={submitting}>
              {submitting ? 'Sending...' : 'Send RSVP'}
            </button>
            {msg && (
              <p className={`rf-status rf-status--${state === 'success' ? 'ok' : state === 'error' ? 'err' : 'info'}`}
                role={state === 'error' ? 'alert' : 'status'}>{msg}</p>
            )}
          </div>


        </div>
      </form>
    </>
  )
}
