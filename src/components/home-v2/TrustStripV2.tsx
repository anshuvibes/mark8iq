import { motion } from 'motion/react';

const brands = [
  'Sugar Cosmetics',
  'Urban Gabru',
  'MARS Cosmetics',
  'Beast Life',
  'Asian Shoes',
  'NGT Habit',
];

export default function TrustStripV2() {
  return (
    <section style={{ paddingTop: '40px', paddingBottom: '60px', position: 'relative' }}>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.p
          className="m8-p6"
          style={{
            textAlign: 'center',
            color: 'rgba(8,13,25,0.4)',
            marginBottom: '24px',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
          }}
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
            gap: '0',
            flexWrap: 'wrap',
            alignItems: 'center',
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {brands.map((brand, i) => (
            <div key={brand} style={{ display: 'flex', alignItems: 'center' }}>
              <span
                className="m8-p5"
                style={{
                  color: 'rgba(8,13,25,0.45)',
                  padding: '6px 20px',
                  whiteSpace: 'nowrap',
                }}
              >
                {brand}
              </span>
              {i < brands.length - 1 && (
                <div style={{
                  width: '1px',
                  height: '16px',
                  background: 'rgba(8,13,25,0.12)',
                }} />
              )}
            </div>
          ))}
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          section > .container > div:last-child {
            overflow-x: auto;
            flex-wrap: nowrap !important;
            justify-content: flex-start !important;
            padding-bottom: 8px;
          }
        }
      `}</style>
    </section>
  );
}
