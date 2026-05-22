import { useRef } from 'react';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import heroDashboardImg from '@/assets/hero-dashboard.png';
import HeroDemoCard from './HeroDemoCard';


const fadeIn = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
});

export default function HeroV2() {
  const imgContainerRef = useRef<HTMLDivElement>(null);

  return (
    <section data-section="hero" style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column' }}>
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
        initial={{ y: 30 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        style={{ position: 'relative', width: '100%', maxWidth: '1200px', margin: '0 auto' }}
      >
        <div
          ref={imgContainerRef}
          style={{
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '16px 16px 0 0',
            minHeight: '520px',
          }}
        >
          <img
            src={heroDashboardImg}
            alt="Mark8 IQ Dashboard"
            className="hero-dashboard-svg"
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />

        </div>

        {/* Floating demo booking card */}
        <HeroDemoCard />
      </motion.div>

      <style>{`
        .hero-dashboard-svg svg {
          width: 100%;
          height: auto;
          display: block;
        }

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
