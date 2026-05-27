import { motion } from 'motion/react';

type Badge = {
  prefix: string;       // "ISO" or "AICPA"
  code: string;         // "9001", "27001", "SOC2"
  suffix?: string;      // "TYPE 2"
  title: string[];      // label lines
};

const BADGES: Badge[] = [
  { prefix: 'ISO', code: '9001', title: ['Quality Management', 'Systems'] },
  { prefix: 'ISO', code: '14001', title: ['Environmental Management', 'Systems'] },
  { prefix: 'ISO', code: '27001', title: ['Information Security', 'Management System'] },
  { prefix: 'AICPA', code: 'SOC2', suffix: 'TYPE 2', title: ['AICPA System &', 'Organization Controls 2'] },
];

function BadgeMedallion({ b }: { b: Badge }) {
  return (
    <div
      style={{
        position: 'relative',
        width: '90px',
        height: '90px',
        borderRadius: '999px',
        overflow: 'hidden',
        backgroundImage:
          'radial-gradient(circle at 30% 25%, rgba(243,19,255,0.25), transparent 55%), linear-gradient(180deg, #1a0838 0%, #5900e7 55%, #2a0c5e 100%)',
        boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.18), 0 6px 18px -8px rgba(89,0,231,0.55)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Outer ring */}
      <div
        style={{
          position: 'absolute',
          inset: 4,
          borderRadius: '999px',
          border: '1px solid rgba(255,255,255,0.25)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 10,
          borderRadius: '999px',
          border: '1px dashed rgba(255,255,255,0.15)',
        }}
      />

      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
        {b.suffix ? (
          <>
            <span style={{ fontFamily: "'Saira', sans-serif", fontSize: '9px', color: 'rgba(255,255,255,0.85)', letterSpacing: '0.08em' }}>
              {b.prefix}
            </span>
            <span style={{ height: '1px', width: '36px', background: 'rgba(255,255,255,0.35)' }} />
            <span style={{ fontFamily: "'Saira', sans-serif", fontSize: '20px', color: '#FFFFFF', lineHeight: 1, letterSpacing: '-0.02em' }}>
              {b.code}
            </span>
            <span style={{ height: '1px', width: '36px', background: 'rgba(255,255,255,0.35)' }} />
            <span style={{ fontFamily: "'Saira', sans-serif", fontSize: '9px', color: 'rgba(255,255,255,0.9)', letterSpacing: '0.08em' }}>
              {b.suffix}
            </span>
          </>
        ) : (
          <>
            <span
              style={{
                fontFamily: "'Saira', sans-serif",
                fontSize: '24px',
                lineHeight: 1,
                background: 'linear-gradient(180deg, #FFFFFF 40%, rgba(255,255,255,0.55) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-0.02em',
              }}
            >
              {b.prefix}
            </span>
            <span style={{ fontFamily: "'Saira', sans-serif", fontSize: '12px', color: '#FFFFFF', letterSpacing: '0.05em' }}>
              {b.code}
            </span>
          </>
        )}
      </div>
    </div>
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
                  key={b.code}
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
