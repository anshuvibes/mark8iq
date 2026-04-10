import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/components/ui/button';
import heroDashboard from '@/assets/hero-dashboard.svg';

const fadeIn = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
});

const modules = [
  { name: 'Mark8 Ads', accent: '#FC7459', desc: 'Ad performance', logo: '/img/product-logos/black/mark8-ads.svg' },
  { name: 'Mark8 Sight', accent: '#6895FC', desc: 'Visibility intel', logo: '/img/product-logos/black/mark8-sight.svg' },
  { name: 'Mark8 Shelf', accent: '#6895FC', desc: 'Digital shelf', logo: '/img/product-logos/black/mark8-shelf.svg' },
  { name: 'Mark8 Returns', accent: '#52BFBC', desc: 'Return control', logo: '/img/product-logos/black/mark8-returns.svg' },
  { name: 'Mark8 Reco', accent: '#7CBC71', desc: 'Reconciliation', logo: '/img/product-logos/black/mark8-reco.svg' },
  { name: 'Mark8 Inventory', accent: '#FCB24F', desc: 'Procurement', logo: '/img/product-logos/black/mark8-po.svg' },
];

export default function HeroV2() {
  const [activeModule, setActiveModule] = useState(0);
  const imgContainerRef = useRef<HTMLDivElement>(null);
  const [imgHeight, setImgHeight] = useState<number | null>(null);

  // Lock the image container height once the first image loads to prevent layout shift
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
      {/* ZONE 1: Headline block — compact spacing */}
      <div style={{ paddingTop: '80px', paddingBottom: '32px', textAlign: 'center' }}>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <motion.h1 className="m8-h2" style={{ color: '#080D19', marginBottom: '16px' }} {...fadeIn(0.1)}>
              The operating system behind{' '}
              <span style={{ color: '#8E59FF' }}><br />India's fastest growing brands</span>
            </motion.h1>

            <motion.p className="m8-p2" style={{ color: '#40445a', maxWidth: '600px', margin: '0 auto 28px' }} {...fadeIn(0.25)}>
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
        {/* Dashboard image — full width, fixed height container */}
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

        {/* Floating module selector card — positioned on the right */}
        <div
          className="hero-module-card"
          style={{
            position: 'absolute',
            top: '24px',
            right: '-40px',
            width: '320px',
            background: '#FFFFFF',
            borderRadius: '16px',
            padding: '28px',
            boxShadow: '0 12px 40px rgba(0,0,0,0.1)',
            border: '1px solid rgba(8,13,25,0.06)',
            zIndex: 2,
          }}
        >
          <p className="m8-p4" style={{ color: '#080D19', marginBottom: '20px' }}>
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
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  minHeight: '72px',
                }}
              >
                <img src={mod.logo} alt={mod.name} style={{ height: '16px', width: 'auto', marginBottom: '6px', objectFit: 'contain', alignSelf: 'flex-start' }} />
                <div className="m8-p6" style={{ color: 'rgba(8,13,25,0.45)' }}>{mod.desc}</div>
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
