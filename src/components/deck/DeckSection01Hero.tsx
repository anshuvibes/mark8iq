import { motion } from 'motion/react';

const metrics = [
  { value: '100+ Cr', label: 'Ad Spend Optimized', accent: '#8E59FF' },
  { value: '1,000+ Cr', label: 'GMV Managed', accent: '#52BFBC' },
  { value: 'Top 5', label: 'Amazon Ads Agency in India', accent: '#FCB24F' },
];

export default function DeckSection01Hero() {
  return (
    <section
      style={{
        background: '#080D19',
        minHeight: '100vh',
        paddingTop: 60,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* Slide number watermark */}
      <div className="deck-slide-number" style={{ color: 'rgba(255,255,255,0.03)' }}>01</div>

      {/* Grid overlay */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/img/bg-pattern.svg)', backgroundRepeat: 'repeat', opacity: 0.04, pointerEvents: 'none', zIndex: 0 }} />
      {/* Violet orb */}
      <div style={{ position: 'absolute', top: -120, right: -120, width: 480, height: 480, borderRadius: '50%', background: 'radial-gradient(circle, rgba(142,89,255,0.25), transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />

      <div className="deck-two-col" style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', width: '100%', maxWidth: 1200, margin: '0 auto', padding: '80px 40px' }}>
        {/* Left column */}
        <div style={{ flex: '0 0 55%', maxWidth: '55%', position: 'relative' }}>
          {/* SCALE watermark */}
          <div style={{ position: 'absolute', top: '-40px', left: '-20px', fontFamily: "'Saira', sans-serif", fontSize: '160px', lineHeight: 1, color: 'rgba(255,255,255,0.03)', pointerEvents: 'none', userSelect: 'none', letterSpacing: '-0.03em', transform: 'rotate(-2deg)', zIndex: 0 }}>
            SCALE
          </div>

          <motion.p
            className="m8-p5"
            style={{ color: '#8E59FF', marginBottom: 16, position: 'relative', zIndex: 1 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Seller Ads Acceleration at Scale
          </motion.p>
          <motion.h1
            className="m8-h1-large"
            style={{ color: '#FFFFFF', marginBottom: 24, position: 'relative', zIndex: 1 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Driving Ads Adoption & Growth for Large Seller Ecosystems
          </motion.h1>
          <motion.p
            className="m8-p4"
            style={{ color: 'rgba(255,255,255,0.5)', position: 'relative', zIndex: 1 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Infytrix Ecom Pvt Ltd
          </motion.p>
        </div>

        {/* Right column */}
        <div style={{ flex: '0 0 45%', maxWidth: '45%', display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-end' }}>
          {metrics.map((m, i) => (
            <motion.div
              key={i}
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderLeft: `3px solid ${m.accent}`,
                borderRadius: 12,
                padding: '24px 32px',
                width: '100%',
                maxWidth: 320,
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
            >
              <p className="m8-h3-xl" style={{ color: m.accent, marginBottom: 4 }}>{m.value}</p>
              <p className="m8-p6" style={{ color: 'rgba(255,255,255,0.6)' }}>{m.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom confidentiality with pulse dot */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '12px 40px',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: 8,
        }}
      >
        <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#8E59FF', animation: 'deckPulse 2s ease-in-out infinite' }} />
        <span className="m8-p6" style={{ color: 'rgba(255,255,255,0.3)' }}>
          Infytrix Ecom Pvt Ltd &nbsp;|&nbsp; Confidential
        </span>
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
        @keyframes deckPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.4); }
        }
        @media (max-width: 991px) {
          .deck-two-col { flex-direction: column !important; }
          .deck-two-col > div { flex: 0 0 100% !important; max-width: 100% !important; }
        }
      `}</style>
    </section>
  );
}
