import { lazy, useCallback, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CalendarDays,
  Clock3,
  Heart,
  MapPin,
  ChevronRight,
  ExternalLink,
  Sun,
  Users,
  PartyPopper,
  Music,
} from 'lucide-react'
import { siteContent } from './content'

const RsvpForm = lazy(() => import('./components/RsvpForm'))

const THEMES = ['dark', 'light', 'emerald', 'rose'] as const
type Theme = typeof THEMES[number]

type CountdownParts = {
  days: string
  hours: string
  minutes: string
  seconds: string
}

const countdownTarget = new Date(siteContent.wedding.isoDate).getTime()

function getCountdownParts(): CountdownParts {
  const distance = countdownTarget - Date.now()
  if (distance <= 0) return { days: '00', hours: '00', minutes: '00', seconds: '00' }
  return {
    days: String(Math.floor(distance / (1000 * 60 * 60 * 24))).padStart(2, '0'),
    hours: String(Math.floor((distance / (1000 * 60 * 60)) % 24)).padStart(2, '0'),
    minutes: String(Math.floor((distance / (1000 * 60)) % 60)).padStart(2, '0'),
    seconds: String(Math.floor((distance / 1000) % 60)).padStart(2, '0'),
  }
}

const galleryImages = [...siteContent.gallery, ...siteContent.gallery]
const galleryImagesRev = [...siteContent.gallery].reverse()
const galleryImagesRev2 = [...galleryImagesRev, ...galleryImagesRev]

export default function App() {
  const [showLoader, setShowLoader] = useState(true)
  const [countdown, setCountdown] = useState<CountdownParts>(getCountdownParts)
  const [theme, setTheme] = useState<Theme>('dark')
  const [themeLocked, setThemeLocked] = useState(false)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  useEffect(() => {
    const timeout = setTimeout(() => setShowLoader(false), 2800)
    return () => clearTimeout(timeout)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => setCountdown(getCountdownParts()), 1000)
    return () => clearInterval(interval)
  }, [])

  const cycleTheme = useCallback(() => {
    if (themeLocked) return
    setTheme(t => THEMES[(THEMES.indexOf(t) + 1) % THEMES.length])
  }, [themeLocked])

  const toggleLockTheme = useCallback(() => {
    setThemeLocked(l => !l)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const heroBg = `/photos/home.webp`

  return (
    <>
      {/* ─── LOADER ─── */}
      <AnimatePresence>
        {showLoader && (
          <motion.div
            className="loader-screen"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="loader-content">
              <div className="loader-name">Sharon & Amala</div>
              <p className="loader-quote">{siteContent.scripture.quote}</p>
              <span className="loader-ref">{siteContent.scripture.reference}</span>
            </div>

            {/* Liquid swirl reveal */}
            <motion.div
              className="loader-swirl"
              initial={{ scaleY: 0, scaleX: 0, rotate: -45 }}
              animate={{
                scaleY: [0, 1.5, 0],
                scaleX: [0, 1.5, 0],
                rotate: -45,
              }}
              transition={{
                delay: 1.8,
                duration: 1,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                position: 'absolute',
                width: '200vw',
                height: '200vw',
                borderRadius: '50%',
                background: `radial-gradient(circle, ${theme === 'light' ? '#faf6f0' : '#0d0d0d'} 0%, transparent 70%)`,
                filter: 'blur(40px)',
                opacity: 0.8,
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── THEME TOGGLE ─── */}
      <button
        className="theme-toggle"
        onClick={cycleTheme}
        onDoubleClick={toggleLockTheme}
        title={themeLocked ? `Theme locked to ${theme}` : 'Click to cycle themes, double-click to lock'}
      >
        <span>{themeLocked ? '🔒' : theme.charAt(0).toUpperCase() + theme.slice(1)}</span>
        <span className={`theme-toggle__dot theme-toggle__dot--${theme}`} />
      </button>

      <main className="page-shell">
        {/* ─── HERO ─── */}
        <section className="hero-section" id="home">
          <div
            className="hero-backdrop"
            style={{ backgroundImage: `url(${heroBg})` }}
          />
          <div className="hero-overlay" />

          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="hero-ref">{siteContent.scripture.reference}</span>
            <p className="hero-scripture">{siteContent.scripture.quote}</p>
            <h1 className="hero-title">{siteContent.coupleDisplay}</h1>
            <p className="hero-sub">{siteContent.heroSubtitle}</p>

            <div className="hero-details">
              <span className="hero-detail">
                <CalendarDays size={16} />
                {siteContent.wedding.readableDate}
              </span>
              <span className="hero-detail">
                <Clock3 size={16} />
                {siteContent.wedding.time}
              </span>
              <span className="hero-detail">
                <MapPin size={16} />
                {siteContent.wedding.venueShort}
              </span>
            </div>

            <button className="hero-cta" onClick={() => scrollTo('details')}>
              Explore the day <ChevronRight size={16} />
            </button>
          </motion.div>

          <div className="scroll-indicator">Scroll</div>
        </section>

        {/* ─── COUNTDOWN ─── */}
        <section className="glow-section countdown-section" id="details">
          <div className="glow-section-inner">
            <span className="countdown-label">Save The Date</span>
            <h2 className="countdown-heading">
              Counting the days until &ldquo;I do.&rdquo;
            </h2>

            <div className="countdown-bar">
              <CountUnit value={countdown.days} label="Days" />
              <CountUnit value={countdown.hours} label="Hrs" />
              <CountUnit value={countdown.minutes} label="Min" />
              <CountUnit value={countdown.seconds} label="Sec" />
            </div>
          </div>
        </section>

        {/* ─── EVENTS ─── */}
        <section className="glow-section" id="events">
          <div className="glow-section-inner">
            <SectionTitle
              eyebrow="Event Details"
              title="Every detail, in one place."
              text="A guide for guests arriving to celebrate with Sharon and Amala."
            />

            <div className="events-grid">
              {siteContent.events.map((event, i) => (
                <motion.div
                  className="event-card"
                  key={event.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.7, delay: i * 0.1 }}
                >
                  <div className="event-badge">
                    <Heart size={12} />
                    {event.badge}
                  </div>
                  <h3>{event.title}</h3>
                  <p>{event.description}</p>
                  <div className="event-meta">
                    <span className="event-meta-item">
                      <CalendarDays size={14} />
                      {event.date}
                    </span>
                    <span className="event-meta-item">
                      <Clock3 size={14} />
                      {event.time}
                    </span>
                    <span className="event-meta-item">
                      <MapPin size={14} />
                      {event.venue}
                    </span>
                  </div>
                  <a className="event-link" href={event.mapLink} target="_blank" rel="noreferrer">
                    View location <ExternalLink size={12} />
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── SCHEDULE ─── */}
        <section className="glow-section" id="schedule">
          <div className="glow-section-inner">
            <SectionTitle
              eyebrow="Schedule"
              title="A graceful flow for the day."
              text="A simple timeline so guests know what to expect."
            />

            <div className="schedule-timeline">
              <div className="schedule-line" />
              {siteContent.schedule.map((item, i) => {
                const icons = [Sun, Users, PartyPopper, Music] as const
                const Icon = icons[i] ?? PartyPopper
                return (
                  <motion.div
                    className="schedule-block"
                    key={item.title}
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.7, delay: i * 0.15 }}
                  >
                    <div className="schedule-icon">
                      <Icon size={24} />
                    </div>
                    <div className="schedule-connector" />
                    <div className="schedule-body">
                      <span className="time">{item.time}</span>
                      <h4>{item.title}</h4>
                      <p>{item.text}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ─── GALLERY ─── */}
        <section className="gallery-section" id="gallery">
          <SectionTitle
            eyebrow="Gallery"
            title="Moments already full of joy."
            text="A flowing stream of memories, gliding like an unfolding album."
          />

          <div className="gallery-track-wrap">
            <motion.div
              className="gallery-track"
              animate={{ x: [0, -siteContent.gallery.length * 19 * 16] }}
              transition={{
                duration: 40,
                repeat: Infinity,
                ease: 'linear',
                repeatType: 'loop',
              }}
            >
              {galleryImages.map((img, i) => (
                <figure className="gallery-card" key={`${img.src}-${i}`}>
                  <img src={img.src} alt={img.alt} loading="lazy" />
                </figure>
              ))}
            </motion.div>
          </div>

          <div className="gallery-track-wrap" style={{ marginTop: '-0.5rem' }}>
            <motion.div
              className="gallery-track-2"
              animate={{ x: [0, siteContent.gallery.length * 15 * 16] }}
              transition={{
                duration: 35,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              {galleryImagesRev2.map((img, i) => (
                <figure className="gallery-card" key={`rev-${img.src}-${i}`}>
                  <img src={img.src} alt={img.alt} loading="lazy" />
                </figure>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ─── MAP ─── */}
        <section className="map-section" id="map">
          <SectionTitle
            eyebrow="Location"
            title="Find your way."
            text="The ceremony and reception venues are just moments apart."
          />

          <div className="map-container">
            <iframe
              title="Church location"
              src="https://www.openstreetmap.org/export/embed.html?bbox=77.142%2C8.335%2C77.162%2C8.355&layer=mapnik&marker=8.345%2C77.152"
              loading="lazy"
              style={{ width: '100%', height: '100%', border: 0 }}
            />
          </div>

          <div className="map-container" style={{ marginTop: '1rem', height: '200px' }}>
            <iframe
              title="Reception location"
              src="https://www.openstreetmap.org/export/embed.html?bbox=77.140%2C8.340%2C77.165%2C8.360&layer=mapnik&marker=8.348%2C77.153"
              loading="lazy"
              style={{ width: '100%', height: '100%', border: 0 }}
            />
          </div>

          {siteContent.events.length > 2 && (
            <div className="map-container" style={{ marginTop: '1rem', height: '200px' }}>
              <iframe
                title="Post-Marriage Reception location"
                src="https://www.openstreetmap.org/export/embed.html?bbox=76.940%2C8.495%2C76.962%2C8.515&layer=mapnik&marker=8.505%2C76.952"
                loading="lazy"
                style={{ width: '100%', height: '100%', border: 0 }}
              />
            </div>
          )}
        </section>

        {/* ─── RSVP + CONTACT ─── */}
        <section className="rsvp-contact-section" id="rsvp">
          <div className="rsvp-contact-inner">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7 }}
            >
              <SectionTitle
                eyebrow="RSVP"
                title="Reply with ease."
                text="Confirm your participation directly here."
              />
              <RsvpForm />
            </motion.div>

            <motion.div
              className="contact-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              id="contact"
            >
              <Heart size={20} color="var(--accent)" style={{ marginBottom: '0.5rem' }} />
              <h3>With love from the families.</h3>
              <p>{siteContent.contact.note}</p>
              <p style={{ fontSize: '0.85rem', color: 'var(--muted)', marginBottom: '1.5rem' }}>
                For any arrival questions or coordination on the day, feel free to reach out.
              </p>
              <a className="contact-number" href={`tel:${siteContent.contact.people[0].phone}`}>
                <Heart size={16} />
                {siteContent.contact.people[0].label}: {siteContent.contact.people[0].phone}
              </a>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  )
}

function CountUnit({ value, label }: { value: string; label: string }) {
  return (
    <div className="countdown-unit">
      <motion.span
        className="countdown-num"
        key={value}
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        {value}
      </motion.span>
      <span className="countdown-lbl">{label}</span>
    </div>
  )
}

function SectionTitle({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string
  title: string
  text: string
}) {
  return (
    <motion.div
      className="section-title"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7 }}
    >
      <span className="section-title__eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </motion.div>
  )
}
