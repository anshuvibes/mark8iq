import { motion } from 'motion/react';

const beats = [
  { num: '01', label: 'Analyse', desc: 'Processes every data point across all six modules simultaneously. No spreadsheet needed.' },
  { num: '02', label: 'Insight', desc: 'Surfaces what matters. Buries what does not. Prioritized for your role.' },
  { num: '03', label: 'Recommend', desc: 'Tells you exactly what action to take. With the reasoning behind it.' },
];

export default function AgentMarkV2() {
  return (
    <section style={{ padding: '100px 0', position: 'relative' }}>
      <div className="container" style={{ display: 'flex', gap: '64px', alignItems: 'center', position: 'relative', zIndex: 1 }}>
        {/* Left column - text */}
        <div style={{ flex: '0 0 44%', maxWidth: '44%' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            style={{
              display: 'inline-block',
              padding: '6px 16px',
              borderRadius: '9999px',
              background: 'rgba(142,89,255,0.08)',
              border: '1px solid rgba(142,89,255,0.18)',
              marginBottom: '16px',
            }}
          >
            <span className="m8-p6" style={{ color: '#8E59FF', fontWeight: 500 }}>Agent Mark</span>
          </motion.div>

          <motion.h2
            className="m8-h1-large"
            style={{ color: 'var(--v2-text)', marginBottom: '20px' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ delay: 0.1 }}
          >
            Your smartest team member never sleeps.
          </motion.h2>

          <motion.p
            className="m8-p2"
            style={{ color: 'var(--v2-text-secondary)', marginBottom: '40px' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ delay: 0.15 }}
          >
            Agent Mark reads every signal across every marketplace, every department, every rupee. And tells you exactly what to do next.
          </motion.p>

          {beats.map((beat, i) => (
            <motion.div
              key={beat.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: 0.2 + i * 0.1 }}
              style={{ marginBottom: '28px' }}
            >
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                background: 'rgba(142,89,255,0.1)',
                marginBottom: '10px',
              }}>
                <span className="m8-p6" style={{ color: '#8E59FF', fontWeight: 500 }}>{beat.num}</span>
              </div>
              <h4 className="m8-p3-medium" style={{ color: 'var(--v2-text)', marginBottom: '6px' }}>{beat.label}</h4>
              <p className="m8-p5" style={{ color: 'var(--v2-text-subtle)' }}>{beat.desc}</p>
            </motion.div>
          ))}

          <motion.p
            className="m8-p4"
            style={{ color: 'var(--v2-text-muted)', fontStyle: 'italic', marginTop: '28px' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
          >
            Role-aware. Always on. Never generic.
          </motion.p>
        </div>

        {/* Right column - Chat UI (stays dark themed always) */}
        <motion.div
          style={{ flex: '0 0 56%', maxWidth: '56%' }}
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div style={{
            background: '#0D1117',
            borderRadius: '16px',
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.06)',
            boxShadow: `0 20px 60px var(--v2-shadow-strong)`,
          }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, #8E59FF, #6C3AE0)' }} />
              <div style={{ flex: 1 }}>
                <p className="m8-p5" style={{ color: '#fff', fontWeight: 500, marginBottom: '2px' }}>Agent Mark</p>
                <p className="m8-p6" style={{ color: 'rgba(255,255,255,0.4)' }}>Monitoring 14 signals · 6 modules active</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ade80' }} />
                <span className="m8-p6" style={{ color: 'rgba(255,255,255,0.5)' }}>Live</span>
              </div>
            </div>

            <div style={{ padding: '24px 20px', minHeight: '300px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <div style={{
                  background: '#8E59FF',
                  borderRadius: '12px 12px 4px 12px',
                  padding: '12px 16px',
                  maxWidth: '70%',
                }}>
                  <p className="m8-p5" style={{ color: '#fff' }}>Why did our ROAS drop today?</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'linear-gradient(135deg, #8E59FF, #6C3AE0)', flexShrink: 0, marginTop: '4px' }} />
                <div style={{ maxWidth: '80%' }}>
                  <div style={{
                    background: 'rgba(255,255,255,0.06)',
                    borderRadius: '4px 12px 12px 12px',
                    padding: '14px 16px',
                    marginBottom: '8px',
                  }}>
                    <p className="m8-p5" style={{ color: 'rgba(255,255,255,0.85)' }}>
                      Your ROAS on Amazon dropped 18% in the last 6 hours. A competitor increased bids on your top 3 keywords.
                    </p>
                  </div>
                  <div style={{
                    background: 'rgba(142,89,255,0.1)',
                    border: '1px solid rgba(142,89,255,0.2)',
                    borderRadius: '8px',
                    padding: '12px 16px',
                  }}>
                    <p className="m8-p6" style={{ color: '#8E59FF', fontWeight: 500, marginBottom: '6px' }}>Recommended action</p>
                    <p className="m8-p6" style={{ color: 'rgba(255,255,255,0.7)' }}>
                      Increase bids by 12% on exact match. Estimated ROAS recovery: 4 hours.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ padding: '12px 20px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                flex: 1,
                background: 'rgba(255,255,255,0.04)',
                borderRadius: '8px',
                padding: '10px 14px',
              }}>
                <p className="m8-p6" style={{ color: 'rgba(255,255,255,0.25)' }}>Ask Agent Mark anything...</p>
              </div>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                background: '#8E59FF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: '16px',
                cursor: 'pointer',
              }}>
                ↑
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 991px) {
          section > .container { flex-direction: column !important; }
          section > .container > div { flex: 0 0 100% !important; max-width: 100% !important; }
        }
      `}</style>
    </section>
  );
}
