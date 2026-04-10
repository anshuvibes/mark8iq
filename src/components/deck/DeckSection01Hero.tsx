import { motion } from 'motion/react';

const metrics = [
  { value: '100+ Cr', label: 'Ad Spend Optimized' },
  { value: '1,000+ Cr', label: 'GMV Managed' },
  { value: 'Top 5', label: 'Amazon Ads Agency in India' },
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
      {/* Grid overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/img/bg-pattern.svg)',
          backgroundRepeat: 'repeat',
          opacity: 0.04,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      {/* Violet orb */}
      <div
        style={{
          position: 'absolute',
          top: -120,
          right: -120,
          width: 480,
          height: 480,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(142,89,255,0.25), transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div className="deck-two-col" style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', width: '100%', maxWidth: 1200, margin: '0 auto', padding: '80px 40px' }}>
        {/* Left column */}
        <div style={{ flex: '0 0 55%', maxWidth: '55%' }}>
          <motion.p
            className="m8-p5"
            style={{ color: '#8E59FF', marginBottom: 16 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Seller Ads Acceleration at Scale
          </motion.p>
          <motion.h1
            className="m8-h1-large"
            style={{ color: '#FFFFFF', marginBottom: 24 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Driving Ads Adoption & Growth for Large Seller Ecosystems
          </motion.h1>
          <motion.p
            className="m8-p4"
            style={{ color: 'rgba(255,255,255,0.5)' }}
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
                borderRadius: 12,
                padding: '24px 32px',
                width: '100%',
                maxWidth: 320,
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
            >
              <p className="m8-h3-xl" style={{ color: '#8E59FF', marginBottom: 4 }}>{m.value}</p>
              <p className="m8-p6" style={{ color: 'rgba(255,255,255,0.6)' }}>{m.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom confidentiality */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '12px 40px',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          textAlign: 'right',
        }}
      >
        <span className="m8-p6" style={{ color: 'rgba(255,255,255,0.3)' }}>
          Infytrix Ecom Pvt Ltd &nbsp;|&nbsp; Confidential
        </span>
      </div>

      <style>{`
        @media (max-width: 991px) {
          .deck-two-col { flex-direction: column !important; }
          .deck-two-col > div { flex: 0 0 100% !important; max-width: 100% !important; }
        }
      `}</style>
    </section>
  );
}
