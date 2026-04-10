import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';

const fadeIn = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
});

export default function HeroV2() {
  return (
    <section style={{ position: 'relative', zIndex: 1, paddingTop: '120px', paddingBottom: '0' }}>
      <div className="container" style={{ textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
        {/* Headline */}
        <motion.h1
          className="m8-h1-display"
          style={{ color: '#080D19', marginBottom: '24px', fontSize: 'clamp(36px, 5vw, 64px)', lineHeight: 1.15, fontWeight: 700 }}
          {...fadeIn(0)}
        >
          Scale every mark8 with the{' '}
          <span
            style={{
              background: 'linear-gradient(90deg, #8E59FF 0%, #FC7459 50%, #FCB24F 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            best e-commerce platform
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="m8-p1"
          style={{ color: '#6b7280', maxWidth: '600px', margin: '0 auto 36px', fontSize: 'clamp(16px, 2vw, 20px)' }}
          {...fadeIn(0.15)}
        >
          One-platform solution that unifies every marketplace,
          <br />
          thinks with your data, and acts while you sleep.
        </motion.p>

        {/* CTA */}
        <motion.div {...fadeIn(0.3)} style={{ marginBottom: '20px' }}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            style={{ display: 'inline-block' }}
          >
            <Button variant="m8-violet" size="lg" asChild>
              <a href="/get-in-touch" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                Get Started
                <span style={{ fontSize: '18px' }}>→</span>
              </a>
            </Button>
          </motion.div>
        </motion.div>

        {/* Trust line */}
        <motion.p
          className="m8-p6"
          style={{ color: 'rgba(8,13,25,0.4)', marginBottom: '48px' }}
          {...fadeIn(0.45)}
        >
          Amazon Advanced Partner &nbsp;✦&nbsp; NVIDIA Inception Program &nbsp;✦&nbsp; Startup India Recognised
        </motion.p>

        {/* Dashboard placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            width: '100%',
            maxWidth: '1100px',
            margin: '0 auto',
            borderRadius: '16px 16px 0 0',
            overflow: 'hidden',
            boxShadow: '0 -4px 60px rgba(0,0,0,0.08)',
            border: '1px solid rgba(8,13,25,0.08)',
            borderBottom: 'none',
            background: '#f3f4f6',
            aspectRatio: '16/9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span style={{ color: '#9ca3af', fontSize: '18px', fontWeight: 500 }}>Dashboard image placeholder</span>
        </motion.div>
      </div>
    </section>
  );
}
