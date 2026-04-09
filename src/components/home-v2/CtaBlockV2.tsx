import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';

export default function CtaBlockV2() {
  return (
    <section style={{ background: '#8E59FF', padding: '100px 0' }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <motion.h2
          className="m8-h1-large"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          style={{ color: '#FFFFFF', marginBottom: 20 }}
        >
          Your operation should run itself.
        </motion.h2>
        <motion.p
          className="m8-p2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ delay: 0.1 }}
          style={{ color: 'rgba(255,255,255,0.75)', marginBottom: 40 }}
        >
          See what Mark8 IQ does for brands like yours. Book a 20-minute demo.
        </motion.p>
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
