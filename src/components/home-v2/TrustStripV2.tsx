import { motion } from 'motion/react';

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
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '12px',
            flexWrap: 'wrap',
            alignItems: 'center',
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {brands.map((brand) => (
            <span
              key={brand}
              style={{
                background: 'rgba(8,13,25,0.04)',
                border: '1px solid rgba(8,13,25,0.08)',
                borderRadius: '9999px',
                padding: '8px 20px',
                fontFamily: 'Saira, sans-serif',
                fontSize: '14px',
                color: 'rgba(8,13,25,0.5)',
                fontWeight: 500,
              }}
            >
              {brand}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
