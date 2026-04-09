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
      <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {credentials.map((c, i) => (
          <motion.div
            key={c.abbr}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ delay: i * 0.1 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 24,
              padding: '28px 0',
              borderBottom: '1px solid rgba(8,13,25,0.08)',
            }}
          >
            <span className="m8-p3-medium" style={{ color: '#8E59FF', minWidth: 60 }}>{c.abbr}</span>
            <div>
              <div className="m8-p3-medium" style={{ color: '#080D19' }}>{c.name}</div>
              <div className="m8-p5" style={{ color: 'rgba(8,13,25,0.5)' }}>{c.proof}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
