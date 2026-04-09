import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';

const moduleCards = [
  { name: 'Mark8 Ads', accent: '#FC7459', desc: 'Ad performance' },
  { name: 'Mark8 Sight', accent: '#6895FC', desc: 'Visibility intel' },
  { name: 'Mark8 Shelf', accent: '#6895FC', desc: 'Digital shelf' },
  { name: 'Mark8 Returns', accent: '#52BFBC', desc: 'Return control' },
  { name: 'Mark8 Reco', accent: '#7CBC71', desc: 'Reconciliation' },
  { name: 'Mark8 Inventory', accent: '#FCB24F', desc: 'Procurement' },
];

export default function HeroV2() {
  return (
    <section style={{ background: '#FFFFFF', minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '120px 0 80px' }}>
      <div className="container" style={{ display: 'flex', gap: '48px', alignItems: 'center', flexWrap: 'wrap' }}>
        {/* Left column */}
        <div style={{ flex: '1 1 55%', minWidth: 340 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0 }}
            style={{
              display: 'inline-block',
              padding: '6px 16px',
              borderRadius: '9999px',
              border: '1px solid rgba(142,89,255,0.2)',
              background: 'rgba(142,89,255,0.06)',
              marginBottom: 24,
            }}
          >
            <span className="m8-p6" style={{ color: '#8E59FF' }}>Trusted by 8+ brands across 15+ marketplaces</span>
          </motion.div>

          <motion.h1
            className="m8-h1-display"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{ color: '#080D19', marginBottom: 24 }}
          >
            The operating system behind India's fastest growing e-commerce brands.
          </motion.h1>

          <motion.p
            className="m8-p1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            style={{ color: '#40445a', maxWidth: 520, marginBottom: 36 }}
          >
            The only platform that unifies every marketplace, thinks with your data, and acts while you sleep.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            style={{ marginBottom: 32 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              style={{ display: 'inline-block' }}
            >
              <Button variant="m8-violet" size="lg" asChild>
                <a href="/get-in-touch">Book a Demo</a>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            className="m8-p6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            style={{ color: 'rgba(8,13,25,0.4)' }}
          >
            Amazon Advanced Partner &nbsp;·&nbsp; NVIDIA Inception Program &nbsp;·&nbsp; Startup India Recognised
          </motion.div>
        </div>

        {/* Right column */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ flex: '1 1 40%', minWidth: 320 }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
            {moduleCards.map((card, i) => (
              <motion.div
                key={card.name}
                whileHover={{ y: -3, boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}
                transition={{ duration: 0.15 }}
                style={{
                  padding: '12px 16px',
                  borderLeft: `3px solid ${card.accent}`,
                  background: 'white',
                  border: `1px solid rgba(8,13,25,0.08)`,
                  borderLeftWidth: 3,
                  borderLeftColor: card.accent,
                  borderRadius: 10,
                  cursor: 'pointer',
                }}
              >
                <div className="m8-p5" style={{ fontWeight: 500, color: '#080D19' }}>{card.name}</div>
                <div className="m8-p6" style={{ color: 'rgba(8,13,25,0.5)' }}>{card.desc}</div>
              </motion.div>
            ))}
          </div>

          <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(8,13,25,0.08)' }}>
            <img
              src="https://admin.infytrix.info/assets/home/ecom-growth.webp"
              alt="Mark8 IQ Dashboard"
              style={{ width: '100%', display: 'block' }}
              loading="lazy"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
