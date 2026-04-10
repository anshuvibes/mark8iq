import { motion } from 'motion/react';

const logos = [
  { name: 'Myntra', src: 'https://admin.infytrix.info/uploads/myntra_0ef843ae4c.svg' },
  { name: 'Amazon', src: 'https://admin.infytrix.info/uploads/amazon_87c06fbfc9.svg' },
  { name: 'Nykaa', src: 'https://admin.infytrix.info/uploads/nykaa_31b44d3a37.svg' },
  { name: 'Ajio', src: 'https://admin.infytrix.info/uploads/ajio_91cab1aa57.svg' },
  { name: 'Meesho', src: 'https://admin.infytrix.info/uploads/meesho_67acd12206.svg' },
  { name: 'Tira', src: 'https://admin.infytrix.info/uploads/tira_e819ed76f7.svg' },
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
          {logos.map((logo, i) => (
            <div key={logo.name} style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ padding: '6px 20px' }}>
                <img
                  src={logo.src}
                  alt={logo.name}
                  style={{
                    height: '24px',
                    width: 'auto',
                    filter: 'grayscale(100%) opacity(0.45)',
                  }}
                  loading="lazy"
                />
              </div>
              {i < logos.length - 1 && (
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
            scrollbar-width: none;
          }
          section > .container > div:last-child::-webkit-scrollbar {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
