import { motion } from 'motion/react';
import GridOverlay from './GridOverlay';

const brands = ['Sugar Cosmetics', 'Urban Gabru', 'MARS Cosmetics', 'Beast Life', 'Asian Shoes', 'NGT Habit'];

export default function TrustStripV2() {
  return (
    <section style={{ paddingTop: '40px', paddingBottom: '60px', position: 'relative' }}>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.p
          className="m8-p6"
          style={{ textAlign: 'center', color: 'rgba(8,13,25,0.4)', marginBottom: '24px', textTransform: 'uppercase', letterSpacing: '0.08em' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
        >
          Trusted by India's fastest growing brands
        </motion.p>
        <motion.div
          style={{ display: 'flex', justifyContent: 'center', gap: '48px', flexWrap: 'wrap', alignItems: 'center' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {brands.map((brand, i) => (
            <span
              key={brand}
              className="m8-p4"
              style={{ color: '#080D19', opacity: 0.28 + i * 0.02, fontWeight: 400 }}
            >
              {brand}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
