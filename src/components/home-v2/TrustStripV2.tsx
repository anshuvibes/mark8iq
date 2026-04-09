import { motion } from 'motion/react';

const brands = ['Sugar Cosmetics', 'Urban Gabru', 'MARS Cosmetics', 'Beast Life', 'Asian Shoes', 'NGT Habit'];

export default function TrustStripV2() {
  return (
    <section style={{ background: '#FFFFFF', padding: '48px 0' }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <p className="m8-p6" style={{ color: 'rgba(8,13,25,0.4)', marginBottom: 24 }}>
          Trusted by India's fastest growing brands
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 48, flexWrap: 'wrap' }}>
          {brands.map((brand, i) => (
            <motion.span
              key={brand}
              className="m8-p3-medium"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.28 + i * 0.02 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: i * 0.1 }}
              style={{ color: '#080D19' }}
            >
              {brand}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
