import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';

const fadeIn = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
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
    <section style={{ position: 'relative', zIndex: 1 }}>
      {/* Zone 1: Centered headline block */}
      <div className="container" style={{ paddingTop: '140px', paddingBottom: '48px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
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
            The operating system behind{' '}
            <span style={{ color: '#8E59FF' }}>India's fastest growing brands.</span>
          </motion.h1>

          <motion.p className="m8-p1" style={{ color: '#40445a', maxWidth: '600px', margin: '0 auto 36px' }} {...fadeIn(0.25)}>
            The only platform that unifies every marketplace, thinks with your data, and acts while you sleep.
          </motion.p>

          <motion.div {...fadeIn(0.4)} style={{ marginBottom: '24px' }}>
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
      </div>

      {/* Zone 2: Two-column visual block */}
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          className="hero-visual-block"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', marginTop: '48px' }}
        >
          {/* Left: Dashboard screenshot */}
          <div style={{ flex: '0 0 60%', maxWidth: '60%' }}>
            <div style={{
              borderRadius: '16px 16px 0 0',
              overflow: 'hidden',
              boxShadow: '0 16px 48px rgba(0,0,0,0.1)',
            }}>
              <img
                src="https://admin.infytrix.info/uploads/product_ads_banner_1_9e9a7e9c51.webp"
                alt="Mark8 IQ Dashboard"
                style={{ width: '100%', display: 'block' }}
                loading="lazy"
              />
            </div>
          </div>

          {/* Right: Module selector card */}
          <div style={{ flex: '0 0 40%', maxWidth: '40%' }}>
            <div style={{
              background: '#FFFFFF',
              borderRadius: '16px',
              padding: '28px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.06)',
              border: '1px solid rgba(8,13,25,0.06)',
            }}>
              <p className="m8-p4" style={{ color: '#080D19', marginBottom: '20px' }}>
                What do you want to manage?
              </p>

              {/* Module grid: 2 columns */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '24px' }}>
                {modules.map((mod) => (
                  <div
                    key={mod.name}
                    style={{
                      padding: '12px 14px',
                      borderRadius: '10px',
                      background: `${mod.accent}08`,
                      border: `1px solid ${mod.accent}30`,
                      cursor: 'pointer',
                      transition: 'background 0.15s, border-color 0.15s',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLDivElement).style.background = `${mod.accent}14`;
                      (e.currentTarget as HTMLDivElement).style.borderColor = `${mod.accent}50`;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLDivElement).style.background = `${mod.accent}08`;
                      (e.currentTarget as HTMLDivElement).style.borderColor = `${mod.accent}30`;
                    }}
                  >
                    <div style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: mod.accent,
                      marginBottom: '8px',
                    }} />
                    <div className="m8-p6" style={{ color: '#080D19', marginBottom: '2px' }}>{mod.name}</div>
                    <div className="m8-p6" style={{ color: 'rgba(8,13,25,0.45)' }}>{mod.desc}</div>
                  </div>
                ))}
              </div>

              {/* Credential badges */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  '1,000+ Cr GMV managed',
                  '35% avg ROAS improvement',
                  '90% client retention',
                ].map((stat) => (
                  <div
                    key={stat}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      background: 'rgba(8,13,25,0.02)',
                    }}
                  >
                    <div style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: '#8E59FF',
                    }} />
                    <span className="m8-p6" style={{ color: '#080D19' }}>{stat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Mobile responsive */}
      <style>{`
        @media (max-width: 991px) {
          .hero-visual-block { flex-direction: column !important; }
          .hero-visual-block > div { flex: 0 0 100% !important; max-width: 100% !important; }
        }
      `}</style>
    </section>
  );
}
