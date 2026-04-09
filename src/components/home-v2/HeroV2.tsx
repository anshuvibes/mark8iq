import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';

const fadeIn = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] },
});

const modules = [
  { name: 'Mark8 Ads', accent: '#FC7459', desc: 'Ad performance' },
  { name: 'Mark8 Sight', accent: '#6895FC', desc: 'Visibility intel' },
  { name: 'Mark8 Shelf', accent: '#6895FC', desc: 'Digital shelf' },
  { name: 'Mark8 Returns', accent: '#52BFBC', desc: 'Return control' },
  { name: 'Mark8 Reco', accent: '#7CBC71', desc: 'Reconciliation' },
  { name: 'Mark8 Inventory', accent: '#FCB24F', desc: 'Procurement' },
];

export default function HeroV2() {
  return (
    <section style={{ background: '#FFFFFF', minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', zIndex: 1 }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '48px', paddingTop: '120px', paddingBottom: '80px' }}>
        {/* Left Column */}
        <div style={{ flex: '0 0 55%', maxWidth: '55%' }}>
          <motion.div
            {...fadeIn(0)}
            style={{
              display: 'inline-block',
              padding: '8px 18px',
              borderRadius: '9999px',
              border: '1px solid rgba(142,89,255,0.2)',
              background: 'rgba(142,89,255,0.06)',
              marginBottom: '28px',
            }}
          >
            <span className="m8-p6" style={{ color: '#8E59FF' }}>Trusted by 8+ brands across 15+ marketplaces</span>
          </motion.div>

          <motion.h1 className="m8-h1-display" style={{ color: '#080D19', marginBottom: '24px' }} {...fadeIn(0.1)}>
            The operating system behind India's fastest growing e-commerce brands.
          </motion.h1>

          <motion.p className="m8-p1" style={{ color: '#40445a', maxWidth: '520px', marginBottom: '36px' }} {...fadeIn(0.25)}>
            The only platform that unifies every marketplace, thinks with your data, and acts while you sleep.
          </motion.p>

          <motion.div {...fadeIn(0.4)} style={{ marginBottom: '32px' }}>
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

          <motion.div {...fadeIn(0.55)} className="m8-p6" style={{ color: 'rgba(8,13,25,0.4)' }}>
            Amazon Advanced Partner &nbsp;·&nbsp; NVIDIA Inception Program &nbsp;·&nbsp; Startup India Recognised
          </motion.div>
        </div>

        {/* Right Column */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ flex: '0 0 45%', maxWidth: '45%' }}
        >
          {/* Module Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
            {modules.map((mod, i) => (
              <motion.div
                key={mod.name}
                whileHover={{ y: -3, boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}
                transition={{ duration: 0.15 }}
                style={{
                  padding: '12px 16px',
                  borderLeft: `3px solid ${mod.accent}`,
                  background: '#fff',
                  border: `1px solid rgba(8,13,25,0.08)`,
                  borderLeftWidth: '3px',
                  borderLeftStyle: 'solid',
                  borderLeftColor: mod.accent,
                  borderRadius: '10px',
                  cursor: 'pointer',
                }}
              >
                <div className="m8-p5" style={{ fontWeight: 500, color: '#080D19', marginBottom: '2px' }}>{mod.name}</div>
                <div className="m8-p6" style={{ color: 'rgba(8,13,25,0.5)' }}>{mod.desc}</div>
              </motion.div>
            ))}
          </div>

          {/* Dashboard Image */}
          <div style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 12px 40px rgba(0,0,0,0.08)', border: '1px solid rgba(8,13,25,0.06)' }}>
            <img
              src="https://admin.infytrix.info/uploads/product_ads_banner_1_9e9a7e9c51.webp"
              alt="Mark8 IQ Dashboard"
              style={{ width: '100%', display: 'block' }}
              loading="lazy"
            />
          </div>
        </motion.div>
      </div>

      {/* Mobile responsive */}
      <style>{`
        @media (max-width: 991px) {
          .container > div:first-child { flex: 0 0 100% !important; max-width: 100% !important; }
          .container { flex-direction: column !important; }
          section > .container > div:last-child { flex: 0 0 100% !important; max-width: 100% !important; }
        }
      `}</style>
    </section>
  );
}
