function createContent() {
  const base = {
    coupleDisplay: 'Sharon & Amala',
    heroSubtitle: 'A church wedding wrapped in grace, family, and golden daylight.',
    scripture: {
      quote: '"He has made everything beautiful in its time."',
      reference: 'Ecclesiastes 3:11',
    },
    wedding: {
      isoDate: '2026-07-08T10:30:00+05:30',
      readableDate: 'Wednesday, 8 July 2026',
      time: '10:30 AM',
      venueShort: "St. Peter's Forane Church, Parassala",
      venueFull: "St. Peter's Forane Church, Parassala, Thiruvananthapuram",
      receptionVenue: 'GS Convention Centre, Kurumkutty, Parassala',
    },
    gallery: [
      { src: '/photos/3.webp', alt: 'Sharon and Amala together' },
      { src: '/photos/0G0A3525.webp', alt: 'Couple portrait' },
      { src: '/photos/0G0A3549.webp', alt: 'Elegant couple frame' },
      { src: '/photos/0G0A3553.webp', alt: 'Romantic portrait' },
      { src: '/photos/0G0A3559.webp', alt: 'Warm embrace' },
      { src: '/photos/0G0A3561.webp', alt: 'Joyful moment' },
      { src: '/photos/0G0A3563.webp', alt: 'Candid smile' },
      { src: '/photos/0G0A3570.webp', alt: 'Beautiful couple' },
      { src: '/photos/0G0A3572.webp', alt: 'Together forever' },
      { src: '/photos/0G0A3573.webp', alt: 'Love in frames' },
      { src: '/photos/0G0A3576.webp', alt: 'Precious memory' },
      { src: '/photos/0G0A3586.webp', alt: 'Stunning portrait' },
      { src: '/photos/0G0A3591.webp', alt: 'Couple goals' },
      { src: '/photos/0G0A3592.webp', alt: 'Blissful smiles' },
      { src: '/photos/0G0A3595.webp', alt: 'Golden hour glow' },
      { src: '/photos/0G0A3598.webp', alt: 'Heartwarming gaze' },
      { src: '/photos/0G0A3600.webp', alt: 'Cherished moment' },
      { src: '/photos/0G0A3604.webp', alt: 'Eternal bond' },
      { src: '/photos/0G0A3608.webp', alt: 'Radiant couple' },
      { src: '/photos/0G0A3618.webp', alt: 'Gentle embrace' },
      { src: '/photos/0G0A3619.webp', alt: 'Dreamy portrait' },
      { src: '/photos/0G0A3628.webp', alt: 'Laughter and love' },
      { src: '/photos/0G0A3629.webp', alt: 'Tender moment' },
      { src: '/photos/0G0A3642.webp', alt: 'Joyful hearts' },
      { src: '/photos/0G0A3643.webp', alt: 'Forever yours' },
      { src: '/photos/0G0A3646.webp', alt: 'Sunlit smiles' },
      { src: '/photos/0G0A3649.webp', alt: 'Perfect pair' },
    ],
    contact: {
      note: 'For any arrival questions or coordination on the day, feel free to reach out.',
      people: [{ label: 'Family Contact', phone: '7736103322' }],
    },
    churchCoords: { lat: 8.345, lng: 77.152 },
  }

  return {
    ...base,
    events: [
      {
        badge: 'Main Ceremony',
        title: 'Wedding Ceremony',
        description:
          'A sacred ceremony surrounded by prayer, family, and the people who have shaped their story.',
        date: 'Wednesday, 8 July 2026',
        time: '10:30 AM',
        venue: "St. Peter's Forane Church, Parassala, Thiruvananthapuram",
        mapLink:
          'https://www.google.com/maps/search/?api=1&query=St.+Peter%27s+Forane+Church+Parassala+Thiruvananthapuram',
        calendarStart: '20260708T050000Z',
        calendarDuration: 1,
      },
    ],
    schedule: [
      {
        time: '09:45 AM',
        title: 'Guests Arrive',
        text: 'Please arrive a little early to settle in, meet family, and find your seat.',
      },
      {
        time: '10:30 AM',
        title: 'Wedding Ceremony',
        text: 'The vows and blessings begin at the church in a moment of prayer and joy.',
      },
    ],
  }
}

export const siteContent = createContent()
