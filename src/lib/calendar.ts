type CalEvent = {
  title: string
  description: string
  venue: string
  calendarStart: string
  calendarDuration: number
}

function pad(n: number) {
  return String(n).padStart(2, '0')
}

function addHours(iso: string, hours: number) {
  const h = Number(iso.slice(9, 11))
  const m = iso.slice(11, 13)
  const s = iso.slice(13, 15)
  const newH = (h + hours) % 24
  const day = Number(iso.slice(6, 8)) + Math.floor((h + hours) / 24)
  return `${iso.slice(0, 6)}${pad(day)}T${pad(newH)}${m}${s}Z`
}

export function buildGoogleCalUrl(event: CalEvent): string {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: `Sharon & Amala — ${event.title}`,
    dates: `${event.calendarStart}/${addHours(event.calendarStart, event.calendarDuration)}`,
    details: event.description,
    location: event.venue,
    sf: 'true',
    output: 'xml',
  })
  return `https://www.google.com/calendar/render?${params.toString()}`
}
