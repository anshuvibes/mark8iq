import { motion } from 'motion/react';

const credentials = [
  { abbr: 'AMZ', name: 'Amazon Ads Advisory Board Member', proof: "One of a handful of agencies globally invited to shape Amazon's advertising direction." },
  { abbr: 'TOP 5', name: 'Top 5 Amazon Ads Agency in India', proof: "Amazon Advanced Partner. Ranked among India's best for performance and outcomes." },
  { abbr: 'NVDA', name: 'NVIDIA Inception Program', proof: '$1 million grant. Powering our AI infrastructure and model training.' },
  { abbr: 'NIXI', name: 'NIXI Partner', proof: '1.5 Crore IPs for compliant, reliable data collection at scale.' },
  { abbr: 'SI', name: 'Startup India Recognised', proof: "Officially recognised under India's national startup programme." },
];

export default function CredentialsV2() {
  return (
    <section style={{ background: '#FFFFFF', padding: '80px 0' }}>
      <div className="container">
        {credentials.map((c, i) => (
          <motion.div
            key={c.abbr}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ delay: i * 0.1 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '24px',
              padding: '24px 0',
              borderBottom: i < credentials.length - 1 ? '1px solid rgba(8,13,25,0.08)' : 'none',
            }}
          >
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '12px',
              background: 'rgba(142,89,255,0.06)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <span className="m8-p6" style={{ color: '#8E59FF', fontWeight: 500, fontSize: '12px', textAlign: 'center' }}>{c.abbr}</span>
            </div>
            <div>
              <h3 className="m8-p3-medium" style={{ color: '#080D19', marginBottom: '4px' }}>{c.name}</h3>
              <p className="m8-p5" style={{ color: 'rgba(8,13,25,0.5)' }}>{c.proof}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
