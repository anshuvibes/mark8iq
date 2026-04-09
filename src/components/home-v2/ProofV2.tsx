import { motion } from 'motion/react';

const metrics = [
  { number: '1,000 Cr+', label: 'GMV Managed' },
  { number: '105 Cr+', label: 'Ad Spend Optimized' },
  { number: '35%', label: 'Avg ROAS Gain' },
  { number: '90%', label: 'Client Retention' },
  { number: '15+', label: 'Marketplaces' },
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
    <section style={{ background: '#EDF0F7', padding: '100px 0' }}>
      <div className="container">
        <motion.h2
          className="m8-h1-large"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          style={{ color: '#080D19', textAlign: 'center', marginBottom: 64 }}
        >
          Real brands. Real numbers. Real outcomes.
        </motion.h2>

        {/* Metrics strip */}
        <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', marginBottom: 72, flexWrap: 'wrap', gap: 24 }}>
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: i * 0.1 }}
              style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
              <span className="m8-h2" style={{ color: '#080D19' }}>{m.number}</span>
              <span className="m8-p6" style={{ color: 'rgba(8,13,25,0.5)' }}>{m.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Brand journey cards */}
        <div style={{ display: 'flex', gap: 20, marginBottom: 56, flexWrap: 'wrap' }}>
          {journeys.map((card, i) => (
            <motion.div
              key={card.brand}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: i * 0.1 }}
              style={{
                flex: '1 1 300px',
                background: 'white',
                borderRadius: 16,
                padding: 32,
                borderTop: '4px solid #8E59FF',
              }}
            >
              <span className="m8-p6" style={{ color: 'rgba(8,13,25,0.4)', marginBottom: 8, display: 'block' }}>{card.stage}</span>
              <h3 className="m8-p3-medium" style={{ color: '#080D19', marginBottom: 12 }}>{card.brand}</h3>
              <p className="m8-p5" style={{ color: '#080D19', marginBottom: 8 }}>{card.whatChanged}</p>
              <p className="m8-p5" style={{ color: '#8E59FF', marginBottom: 16 }}>{card.outcome}</p>
              <p className="m8-p6" style={{ color: 'rgba(8,13,25,0.45)', fontStyle: 'italic' }}>{card.oneLine}</p>
            </motion.div>
          ))}
        </div>

        {/* Testimonial placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          style={{
            background: 'white',
            borderRadius: 16,
            padding: '40px 48px',
          }}
        >
          <span className="m8-h2" style={{ color: 'rgba(142,89,255,0.15)', display: 'block', marginBottom: 16 }}>"</span>
          <p className="m8-p2" style={{ color: 'rgba(8,13,25,0.5)', fontStyle: 'italic', marginBottom: 20 }}>
            Client testimonial to be added before launch. Sourcing from Sugar Cosmetics, Urban Gabru, or Asian Shoes.
          </p>
          <p className="m8-p6" style={{ color: 'rgba(8,13,25,0.35)' }}>Name — Title, Brand Name</p>
        </motion.div>
      </div>
    </section>
  );
}
