import { motion } from 'motion/react';

const metrics = [
  { value: '1,000 Cr+', label: 'GMV Managed' },
  { value: '105 Cr+', label: 'Ad Spend Optimized' },
  { value: '35%', label: 'Avg ROAS Gain' },
  { value: '90%', label: 'Client Retention' },
  { value: '15+', label: 'Marketplaces' },
];

const journeys = [
  {
    brand: 'Asian Shoes',
    stage: 'Scaling on Amazon — ₹90L monthly ad spend',
    whatChanged: 'Spend reduced to ₹28 lakh. Same ₹6.5 Cr monthly sales.',
    outcome: '₹60 lakh saved every month.',
    oneLine: 'Same sales. 68% less ad spend. Every single month.',
  },
  {
    brand: 'Urban Gabru',
    stage: 'Multi-marketplace expansion',
    whatChanged: 'All marketplace data consolidated. Real-time decisions enabled.',
    outcome: 'Faster market response. Reduced team dependency.',
    oneLine: 'Stopped reacting. Started deciding.',
  },
  {
    brand: 'MARS Cosmetics',
    stage: 'Growing D2C brand, fragmented ops',
    whatChanged: 'Unified view across ads, inventory, and returns.',
    outcome: 'Financial leakages identified and plugged.',
    oneLine: 'Found the money that was hiding in plain sight.',
  },
];

export default function ProofV2() {
  return (
    <section style={{ background: 'rgba(237,240,247,0.85)', padding: '100px 0', position: 'relative' }}>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.h2
          className="m8-h1-large"
          style={{ color: '#080D19', textAlign: 'center', marginBottom: '64px' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
        >
          Real brands. Real numbers. Real outcomes.
        </motion.h2>

        {/* Metrics strip */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          marginBottom: '72px',
          flexWrap: 'wrap',
          gap: '24px',
        }}>
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: i * 0.1 }}
              style={{
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
                gap: '24px',
              }}
            >
              <div>
                <div className="m8-h2" style={{ color: '#080D19' }}>{m.value}</div>
                <div className="m8-p6" style={{ color: 'rgba(8,13,25,0.5)' }}>{m.label}</div>
              </div>
              {i < metrics.length - 1 && (
                <div style={{ width: '1px', height: '60px', background: 'rgba(8,13,25,0.12)' }} />
              )}
            </motion.div>
          ))}
        </div>

        {/* Brand journey cards */}
        <div style={{ display: 'flex', gap: '20px', marginBottom: '56px', flexWrap: 'wrap' }}>
          {journeys.map((j, i) => (
            <motion.div
              key={j.brand}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: i * 0.1 }}
              style={{
                flex: 1,
                minWidth: '280px',
                background: '#fff',
                borderRadius: '16px',
                padding: '32px',
                borderTop: '4px solid #8E59FF',
              }}
            >
              <p className="m8-p6" style={{ color: 'rgba(8,13,25,0.45)', marginBottom: '8px' }}>{j.stage}</p>
              <h3 className="m8-p3-medium" style={{ color: '#080D19', marginBottom: '16px' }}>{j.brand}</h3>
              <p className="m8-p5" style={{ color: '#080D19', marginBottom: '8px' }}>{j.whatChanged}</p>
              <p className="m8-p5" style={{ color: '#8E59FF', fontWeight: 500, marginBottom: '16px' }}>{j.outcome}</p>
              <p className="m8-p6" style={{ color: 'rgba(8,13,25,0.45)', fontStyle: 'italic' }}>{j.oneLine}</p>
            </motion.div>
          ))}
        </div>

        {/* Testimonial placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          style={{
            background: '#fff',
            borderRadius: '16px',
            padding: '40px 48px',
          }}
        >
          <span style={{ fontSize: '48px', color: '#8E59FF', lineHeight: 1 }}>"</span>
          <p className="m8-p2" style={{ color: 'rgba(8,13,25,0.55)', fontStyle: 'italic', marginBottom: '20px' }}>
            Client testimonial to be added before launch. Sourcing from Sugar Cosmetics, Urban Gabru, or Asian Shoes.
          </p>
          <p className="m8-p5" style={{ color: 'rgba(8,13,25,0.4)' }}>Name — Title, Brand Name</p>
        </motion.div>
      </div>
    </section>
  );
}
