import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';

export default function CtaBlockV2() {
  return (
    <section style={{ background: '#8E59FF', padding: '100px 0', position: 'relative' }}>
      <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <motion.p
          className="m8-eyebrow"
          style={{ color: 'rgba(255,255,255,0.65)', marginBottom: '12px' }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
        >
          BOOK A DEMO
        </motion.p>
        <motion.h2
          className="m8-h1-large"
          style={{ color: '#fff', marginBottom: '40px' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ delay: 0.05 }}
        >
          Your operation should run itself.
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ delay: 0.2 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            style={{ display: 'inline-block' }}
          >
            <Button variant="m8-cta" size="lg" asChild>
              <a href="/get-in-touch">Book a Demo</a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
