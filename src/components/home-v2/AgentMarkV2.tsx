import { motion } from 'motion/react';
import { Badge } from '@/components/ui/badge';

const beats = [
  { num: '01', label: 'Analyse', desc: 'Processes every data point across all six modules simultaneously. No spreadsheet needed.' },
  { num: '02', label: 'Insight', desc: 'Surfaces what matters. Buries what does not. Prioritized for your role.' },
  { num: '03', label: 'Recommend', desc: 'Tells you exactly what action to take. With the reasoning behind it.' },
];

export default function AgentMarkV2() {
  return (
    <section style={{ background: '#F2F2F4', padding: '100px 0' }}>
      <div className="container" style={{ display: 'flex', gap: 64, alignItems: 'center', flexWrap: 'wrap' }}>
        {/* Left — text */}
        <div style={{ flex: '1 1 44%', minWidth: 320 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }}>
            <Badge variant="outline" style={{ marginBottom: 16 }}>Agent Mark</Badge>
          </motion.div>

          <motion.h2 className="m8-h1-large" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }} transition={{ delay: 0.1 }}
            style={{ color: '#080D19', marginBottom: 20 }}>
            Your smartest team member never sleeps.
          </motion.h2>

          <motion.p className="m8-p2" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }} transition={{ delay: 0.2 }}
            style={{ color: 'rgba(8,13,25,0.65)', marginBottom: 40 }}>
            Agent Mark reads every signal across every marketplace, every department, every rupee. And tells you exactly what to do next.
          </motion.p>

          {beats.map((beat, i) => (
            <motion.div key={beat.num} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }} transition={{ delay: i * 0.1 }}
              style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
              <div style={{
                width: 36, height: 36, borderRadius: '50%', background: '#8E59FF', color: 'white',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                fontFamily: "'Saira', sans-serif", fontSize: 13, fontWeight: 500,
              }}>{beat.num}</div>
              <div>
                <div className="m8-p3-medium" style={{ color: '#080D19', marginBottom: 4 }}>{beat.label}</div>
                <div className="m8-p5" style={{ color: 'rgba(8,13,25,0.55)' }}>{beat.desc}</div>
              </div>
            </motion.div>
          ))}

          <motion.p className="m8-p4" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            style={{ color: 'rgba(8,13,25,0.45)', fontStyle: 'italic', marginTop: 28 }}>
            Role-aware. Always on. Never generic.
          </motion.p>
        </div>

        {/* Right — chat UI */}
        <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }} transition={{ delay: 0.2 }}
          style={{ flex: '1 1 50%', minWidth: 340 }}>
          <div style={{
            background: '#0C1120', borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)',
          }}>
            {/* Header */}
            <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, #8E59FF, #6895FC)' }} />
              <div style={{ flex: 1 }}>
                <div className="m8-p5" style={{ color: '#FFFFFF', fontWeight: 500 }}>Agent Mark</div>
                <div className="m8-p6" style={{ color: 'rgba(255,255,255,0.4)' }}>Monitoring 14 signals · 6 modules active</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#7CBC71' }} />
                <span className="m8-p6" style={{ color: '#7CBC71' }}>Live</span>
              </div>
            </div>

            {/* Messages */}
            <div style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* User message */}
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <div style={{ background: '#8E59FF', borderRadius: '12px 12px 2px 12px', padding: '10px 16px', maxWidth: '75%' }}>
                  <p className="m8-p5" style={{ color: '#FFFFFF' }}>Why did our ROAS drop today?</p>
                </div>
              </div>

              {/* Agent response */}
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'linear-gradient(135deg, #8E59FF, #6895FC)', flexShrink: 0, marginTop: 2 }} />
                <div>
                  <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '12px 12px 12px 2px', padding: '12px 16px', marginBottom: 10 }}>
                    <p className="m8-p5" style={{ color: 'rgba(255,255,255,0.85)' }}>
                      Your ROAS on Amazon dropped 18% in the last 6 hours. A competitor increased bids on your top 3 keywords.
                    </p>
                  </div>
                  <div style={{ background: 'rgba(142,89,255,0.08)', border: '1px solid rgba(142,89,255,0.15)', borderRadius: 10, padding: '12px 16px' }}>
                    <p className="m8-p6" style={{ color: '#8E59FF', marginBottom: 6 }}>Recommended action</p>
                    <p className="m8-p5" style={{ color: 'rgba(255,255,255,0.75)' }}>
                      Increase bids by 12% on exact match. Estimated ROAS recovery: 4 hours.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Input bar */}
            <div style={{ padding: '12px 20px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ flex: 1, background: 'rgba(255,255,255,0.04)', borderRadius: 8, padding: '10px 14px' }}>
                <span className="m8-p5" style={{ color: 'rgba(255,255,255,0.25)' }}>Ask Agent Mark anything...</span>
              </div>
              <div style={{
                width: 36, height: 36, borderRadius: 8, background: '#8E59FF',
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 16,
              }}>↑</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
