import { motion } from 'motion/react';

type Badge = {
  src: string;
  alt: string;
  title: string[];
};

const BADGES: Badge[] = [
  { src: '/img/badges/iso-9001.svg', alt: 'ISO 9001', title: ['Quality Management', 'Systems'] },
  { src: '/img/badges/iso-14001.svg', alt: 'ISO 14001', title: ['Environmental Management', 'Systems'] },
  { src: '/img/badges/iso-27001.svg', alt: 'ISO 27001', title: ['Information Security', 'Management System'] },
  { src: '/img/badges/soc2-type2.svg', alt: 'AICPA SOC2 Type 2', title: ['AICPA System &', 'Organization Controls 2'] },
];

function BadgeMedallion({ b }: { b: Badge }) {
  return (
    <img
      src={b.src}
      alt={b.alt}
      width={90}
      height={90}
      style={{ display: 'block', width: '90px', height: '90px' }}
    />
  );
}

export default function CredentialsV2() {
  return (
    <section data-section="credentials" style={{ position: 'relative', background: 'transparent' }}>
      <div style={{ padding: '100px 0' }}>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div
            style={{
              display: 'flex',
              gap: '100px',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
            }}
          >
            {/* Left: copy */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              style={{ flex: '1 1 420px', minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '16px' }}
            >
              <p className="m8-eyebrow" style={{ color: '#8e59ff', marginBottom: '4px' }}>
                SECURITY & COMPLIANCE
              </p>
              <h2 className="m8-h2" style={{ color: 'var(--v2-text)', margin: 0 }}>
                Certified to protect what your business runs on
              </h2>
              <p className="m8-p4" style={{ color: '#40445a', maxWidth: '520px', margin: '8px 0 0' }}>
                When you connect your marketplace accounts, advertising data, and financial records to a platform, you are trusting it with the intelligence your business runs on.
              </p>
              <p className="m8-p4" style={{ color: '#40445a', maxWidth: '520px', margin: 0 }}>
                Mark8 IQ is independently certified across international security and quality standards — audited, verified, and built for enterprise compliance.
              </p>
            </motion.div>

            {/* Right: badge grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 320px)',
                gap: '16px',
                flex: '0 0 auto',
              }}
            >
              {BADGES.map((b, i) => (
                <motion.div
                  key={b.alt}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ delay: i * 0.08, duration: 0.5, ease: 'easeOut' }}
                  whileHover={{ y: -3 }}
                  style={{
                    background: '#FFFFFF',
                    borderRadius: '16px',
                    padding: '30px',
                    border: '1px solid rgba(15,23,42,0.06)',
                    boxShadow: '0 12px 28px -18px rgba(15,23,42,0.16)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '21px',
                    width: '320px',
                  }}
                >
                  <BadgeMedallion b={b} />
                  <div
                    style={{
                      fontFamily: "'Saira', sans-serif",
                      fontWeight: 500,
                      fontSize: '16px',
                      lineHeight: 1.5,
                      color: '#40445a',
                    }}
                  >
                    {b.title.map((line, j) => (
                      <div key={j}>{line}</div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
