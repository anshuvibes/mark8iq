import { motion } from 'motion/react';

const years = [
  {
    year: 'Year 1',
    label: 'Journey Begins',
    revenue: '₹1 Cr',
    isCurrent: false,
    milestones: [] as string[],
    bullets: [
      'Ads services launched',
      'Patented data collection technology built',
    ],
  },
  {
    year: 'Year 2',
    label: 'Foundation Locked',
    revenue: '₹20 Cr',
    isCurrent: false,
    milestones: ['Amazon Advanced Partner', 'NIXI Partner'],
    bullets: [
      'Mark8 Ads + Mark8 Sight: product MVP shipped',
    ],
  },
  {
    year: 'Year 3',
    label: 'Category Leader',
    revenue: '₹60 Cr',
    isCurrent: false,
    milestones: ['Amazon Advisory Board', 'NVIDIA Inception'],
    bullets: [
      'Mark8 IQ Suite: POC completed',
      'AI capabilities unlocked',
    ],
  },
  {
    year: 'Year 4',
    label: 'The Next Chapter',
    revenue: null,
    isCurrent: true,
    milestones: ['The Foundry Partnership'],
    bullets: [
      'Agent Mark launched',
      'Agent Foundry launched',
      'Mark8 IQ: full suite operational',
    ],
  },
];

export default function DeckSection10Journey() {
  return (
    <section style={{ background: '#080D19', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '80px 40px', position: 'relative', overflow: 'hidden' }}>

      {/* Grid overlay */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)', backgroundSize: '60px 60px', pointerEvents: 'none' }} />

      {/* Slide number watermark */}
      <div className="deck-slide-number" style={{ color: 'rgba(255,255,255,0.03)' }}>10</div>

      <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>

        {/* Top block */}
        <div style={{ marginBottom: 56 }}>
          <motion.p className="m8-p5" style={{ color: '#8E59FF', marginBottom: 12 }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6, ease: 'easeOut' }}>
            Our Journey
          </motion.p>
          <motion.h2 className="m8-h2" style={{ color: '#FFFFFF', marginBottom: 12 }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}>
            Four years. Built to last.
          </motion.h2>
          <motion.p className="m8-p4" style={{ color: 'rgba(255,255,255,0.5)', maxWidth: 560 }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}>
            From a single service to an AI-powered operating system for Indian commerce.
          </motion.p>
        </div>

        {/* Timeline container */}
        <div style={{ position: 'relative', marginBottom: 64 }}>

          {/* Horizontal timeline bar — runs behind columns */}
          <div style={{ position: 'absolute', top: 8, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, rgba(142,89,255,0.1), #8E59FF, rgba(142,89,255,0.1))', zIndex: 0 }} />

          {/* Four year columns */}
          <div className="journey-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, position: 'relative', zIndex: 1 }}>
            {years.map((year, i) => (
              <motion.div
                key={i}
                style={{ paddingTop: 32, position: 'relative' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: i * 0.1 }}
              >
                {/* Timeline dot connector */}
                <div style={{ position: 'absolute', top: 0, left: 0, width: 16, height: 16, borderRadius: '50%', background: year.isCurrent ? '#8E59FF' : 'rgba(142,89,255,0.3)', border: year.isCurrent ? '3px solid rgba(142,89,255,0.4)' : '2px solid rgba(142,89,255,0.2)' }} />

                {/* NOW badge — only Year 4 */}
                {year.isCurrent && (
                  <div style={{ position: 'absolute', top: -8, left: 24, padding: '2px 10px', borderRadius: 20, background: 'rgba(142,89,255,0.2)' }}>
                    <span className="m8-p6" style={{ color: '#8E59FF' }}>Now</span>
                  </div>
                )}

                {/* Year label */}
                <p className="m8-p6" style={{ color: 'rgba(255,255,255,0.35)', marginBottom: 4, marginTop: 8 }}>
                  {year.year}
                </p>

                {/* Stage label */}
                <p className="m8-p3-medium" style={{ color: '#FFFFFF', marginBottom: 8 }}>
                  {year.label}
                </p>

                {/* Revenue number */}
                {year.revenue ? (
                  <p className="m8-h3-xl" style={{ color: '#8E59FF', marginBottom: 16 }}>
                    {year.revenue}
                  </p>
                ) : (
                  <div style={{ marginBottom: 16 }}>
                    <span className="m8-h3-xl" style={{ color: '#8E59FF' }}>→</span>
                  </div>
                )}

                {/* Milestone badges */}
                {year.milestones.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
                    {year.milestones.map((m) => (
                      <span key={m} className="m8-p6" style={{ padding: '3px 10px', borderRadius: 20, background: 'rgba(142,89,255,0.1)', color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(142,89,255,0.15)' }}>
                        {m}
                      </span>
                    ))}
                  </div>
                )}

                {/* Divider */}
                <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', marginBottom: 16 }} />

                {/* Bullets */}
                {year.bullets.map((b, bi) => (
                  <div key={bi} style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 6 }}>
                    <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(142,89,255,0.4)', flexShrink: 0, marginTop: 6 }} />
                    <p className="m8-p6" style={{ color: 'rgba(255,255,255,0.5)' }}>
                      {b}
                    </p>
                  </div>
                ))}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Revenue growth bar — visual at bottom */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6, ease: 'easeOut', delay: 0.5 }}>
          <p className="m8-p6" style={{ color: 'rgba(255,255,255,0.3)', marginBottom: 12 }}>
            Revenue trajectory
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 2, height: 32 }}>
            {/* Growth bar segments */}
            {[
              { width: '5%',  label: '₹1 Cr',  color: 'rgba(142,89,255,0.4)' },
              { width: '20%', label: '₹20 Cr', color: 'rgba(142,89,255,0.6)' },
              { width: '60%', label: '₹60 Cr', color: '#8E59FF' },
            ].map((seg, i) => (
              <div key={i} style={{ width: seg.width, height: '100%', background: seg.color, borderRadius: 4, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className="m8-p6" style={{ color: '#FFFFFF', whiteSpace: 'nowrap' }}>{seg.label}</span>
              </div>
            ))}
            {/* Arrow for Year 4 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 8 }}>
              <span className="m8-p5" style={{ color: '#8E59FF' }}>→</span>
              <span className="m8-p6" style={{ color: 'rgba(255,255,255,0.4)' }}>Year 4</span>
            </div>
          </div>
        </motion.div>

      </div>

      <style>{`
        .deck-slide-number {
          position: absolute;
          top: 60px;
          right: 48px;
          font-family: 'Saira', sans-serif;
          font-size: 120px;
          font-weight: 400;
          line-height: 1;
          pointer-events: none;
          letter-spacing: -0.03em;
          user-select: none;
        }
        @media (max-width: 991px) {
          .journey-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 600px) {
          .journey-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
