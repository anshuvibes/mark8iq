import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/components/ui/button';
import heroDashboard from '@/assets/hero-dashboard.svg';
import ThemeToggle from './ThemeToggle';

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
  const [activeModule, setActiveModule] = useState(0);
  const imgContainerRef = useRef<HTMLDivElement>(null);
  const [imgHeight, setImgHeight] = useState<number | null>(null);

  useEffect(() => {
    const container = imgContainerRef.current;
    if (!container) return;
    const img = container.querySelector('img');
    if (img && img.complete && img.naturalHeight > 0) {
      setImgHeight(container.offsetHeight);
    }
  }, []);

  const handleImageLoad = () => {
    if (imgHeight === null && imgContainerRef.current) {
      setImgHeight(imgContainerRef.current.offsetHeight);
    }
  };

  return (
    <section style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column' }}>
      {/* Theme toggle — top right */}
      <div style={{ position: 'absolute', top: '80px', right: '40px', zIndex: 60 }}>
        <ThemeToggle />
      </div>

      {/* ZONE 1: Headline block */}
      <div style={{ paddingTop: '80px', paddingBottom: '32px', textAlign: 'center' }}>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <motion.h1 className="m8-h2" style={{ color: 'var(--v2-text)', marginBottom: '16px' }} {...fadeIn(0.1)}>
              The operating system behind{' '}
              <span style={{ color: '#8E59FF' }}><br />India's fastest growing brands</span>
            </motion.h1>

            <motion.p className="m8-p2" style={{ color: 'var(--v2-text-secondary)', maxWidth: '600px', margin: '0 auto 28px' }} {...fadeIn(0.25)}>
              The only platform that unifies every marketplace, thinks with your data, and acts while you sleep
            </motion.p>

            <motion.div {...fadeIn(0.4)}>
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
          </div>
        </div>
      </div>

      {/* ZONE 2: Full-width visual block with floating card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        style={{ position: 'relative', width: '100%', maxWidth: '1200px', margin: '0 auto' }}
      >
        <div
          ref={imgContainerRef}
          style={{
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '16px 16px 0 0',
            minHeight: imgHeight ?? undefined,
          }}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={activeModule}
              src={heroDashboard}
              alt={`${modules[activeModule].name} Dashboard`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              style={{ width: '100%', display: 'block' }}
              onLoad={handleImageLoad}
            />
          </AnimatePresence>
        </div>

        {/* Floating module selector card */}
        <div
          className="hero-module-card"
          style={{
            position: 'absolute',
            top: '24px',
            right: '-40px',
            width: '320px',
            background: 'var(--v2-bg-card)',
            borderRadius: '16px',
            padding: '28px',
            boxShadow: `0 12px 40px var(--v2-shadow)`,
            border: '1px solid var(--v2-border)',
            zIndex: 2,
          }}
        >
          <p className="m8-p4" style={{ color: 'var(--v2-text)', marginBottom: '20px' }}>
            What do you want to manage?
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '24px' }}>
            {modules.map((mod, i) => (
              <div
                key={mod.name}
                onMouseEnter={() => setActiveModule(i)}
                style={{
                  padding: '12px 14px',
                  borderRadius: '10px',
                  background: activeModule === i ? `${mod.accent}18` : `${mod.accent}08`,
                  border: `1.5px solid ${activeModule === i ? mod.accent : `${mod.accent}30`}`,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: mod.accent,
                  marginBottom: '8px',
                }} />
                <div className="m8-p6" style={{ color: 'var(--v2-text)', marginBottom: '2px' }}>{mod.name}</div>
                <div className="m8-p6" style={{ color: 'var(--v2-text-muted)' }}>{mod.desc}</div>
              </div>
            ))}
          </div>

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
                  background: 'var(--v2-bg-subtle)',
                }}
              >
                <div style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: '#8E59FF',
                }} />
                <span className="m8-p6" style={{ color: 'var(--v2-text)' }}>{stat}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <style>{`
        @media (max-width: 1280px) {
          .hero-module-card {
            right: 16px !important;
          }
        }
        @media (max-width: 991px) {
          .hero-module-card {
            position: relative !important;
            top: auto !important;
            right: auto !important;
            width: 100% !important;
            margin-top: 16px;
          }
        }
      `}</style>
    </section>
  );
}
