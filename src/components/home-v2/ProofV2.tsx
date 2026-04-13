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

const testimonials = [
  {
    quote: 'Mark8 IQ changed how we think about Amazon. We stopped guessing and started knowing. The savings paid for the platform in the first month.',
    name: 'Rajesh Kumar',
    title: 'Head of E-Commerce, Asian Shoes',
  },
  {
    quote: 'Every marketplace, every department, one view. Our team went from three reporting tools to one conversation with Agent Mark.',
    name: 'Priya Mehta',
    title: 'Founder, MARS Cosmetics',
  },
];

export default function ProofV2() {
  return (
    <section style={{ background: 'var(--v2-bg-alt)', padding: '100px 0', position: 'relative' }}>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.h2
          className="m8-h1-large"
          style={{ color: 'var(--v2-text)', textAlign: 'center', marginBottom: '64px' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
        >
          Real brands. Real numbers. Real outcomes.
        </motion.h2>

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
                <div className="m8-h2" style={{ color: 'var(--v2-text)' }}>{m.value}</div>
                <div className="m8-p6" style={{ color: 'var(--v2-text-muted)' }}>{m.label}</div>
              </div>
              {i < metrics.length - 1 && (
                <div style={{ width: '1px', height: '60px', background: 'var(--v2-border-strong)' }} />
              )}
            </motion.div>
          ))}
        </div>

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
                background: 'var(--v2-bg-card)',
                borderRadius: '16px',
                padding: '32px',
                borderTop: '4px solid #8E59FF',
              }}
            >
              <p className="m8-p6" style={{ color: 'var(--v2-text-muted)', marginBottom: '8px' }}>{j.stage}</p>
              <h3 className="m8-p3-medium" style={{ color: 'var(--v2-text)', marginBottom: '16px' }}>{j.brand}</h3>
              <p className="m8-p5" style={{ color: 'var(--v2-text)', marginBottom: '8px' }}>{j.whatChanged}</p>
              <p className="m8-p5" style={{ color: '#8E59FF', fontWeight: 500, marginBottom: '16px' }}>{j.outcome}</p>
              <p className="m8-p6" style={{ color: 'var(--v2-text-muted)', fontStyle: 'italic' }}>{j.oneLine}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}
        >
          {testimonials.map((t) => (
            <div
              key={t.name}
              style={{
                background: 'var(--v2-bg-card)',
                borderRadius: '16px',
                padding: '40px 40px 32px',
                position: 'relative',
              }}
            >
              <div style={{ fontSize: '64px', color: '#8E59FF', lineHeight: 0.8, marginBottom: '20px', fontFamily: 'Georgia, serif' }}>"</div>
              <p className="m8-p2" style={{ color: 'var(--v2-text-secondary)', fontStyle: 'italic', marginBottom: '28px' }}>
                {t.quote}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'rgba(142,89,255,0.1)',
                  flexShrink: 0,
                }} />
                <div>
                  <p className="m8-p5" style={{ color: 'var(--v2-text)', fontWeight: 500 }}>{t.name}</p>
                  <p className="m8-p6" style={{ color: 'var(--v2-text-muted)' }}>{t.title}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          section > .container > div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
