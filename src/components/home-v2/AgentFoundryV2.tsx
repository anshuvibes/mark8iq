import { motion } from 'motion/react';
import { Badge } from '@/components/ui/badge';

const beats = [
  { num: '01', label: 'Build', desc: 'Configure agents for any task. Bid adjustments, inventory alerts, return flags, reconciliation triggers.' },
  { num: '02', label: 'Deploy', desc: 'Push agents live across every marketplace simultaneously. One action. Complete coverage.' },
  { num: '03', label: 'Run', desc: 'Agents execute in real time. Every signal, every trigger, every action. Without waiting for a human.' },
];

const agents = [
  { name: 'Price Tracker Agent', status: 'Active', last: '2 min ago', next: '58 min', highlight: false },
  { name: 'ROAS Optimiser Agent', status: 'Active', last: '14 min ago', next: '46 min', highlight: true },
  { name: 'Stock Alert Agent', status: 'Active', last: '1 hr ago', next: '59 min', highlight: false },
  { name: 'Return Reconciler Agent', status: 'Active', last: '3 hrs ago', next: '21 min', highlight: false },
];

export default function AgentFoundryV2() {
  return (
    <section style={{ background: '#FFFFFF', padding: '100px 0' }}>
      <div className="container">
        {/* Power line */}
        <motion.p className="m8-p2" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          style={{ color: 'rgba(8,13,25,0.45)', textAlign: 'center', fontStyle: 'italic', marginBottom: 64 }}>
          While your competitors wait for Monday morning reports, your agents already acted on Friday night's data.
        </motion.p>

        <div style={{ display: 'flex', gap: 64, alignItems: 'center', flexWrap: 'wrap' }}>
          {/* Left — console */}
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }} transition={{ delay: 0.2 }}
            style={{ flex: '1 1 52%', minWidth: 340 }}>
            <div style={{
              background: '#0C1120', borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)',
            }}>
              {/* Console header */}
              <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="m8-p5" style={{ color: '#FFFFFF', fontWeight: 500 }}>Agent Foundry</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#7CBC71' }} />
                  <span className="m8-p6" style={{ color: 'rgba(255,255,255,0.5)' }}>4 agents running</span>
                </div>
              </div>

              {/* Column headers */}
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', padding: '10px 20px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                {['Agent', 'Status', 'Last action', 'Next run'].map(h => (
                  <span key={h} className="m8-p6" style={{ color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: 1 }}>{h}</span>
                ))}
              </div>

              {/* Rows */}
              {agents.map((agent) => (
                <div key={agent.name} style={{
                  display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', padding: '14px 20px',
                  borderBottom: '1px solid rgba(255,255,255,0.04)',
                  background: agent.highlight ? 'rgba(142,89,255,0.06)' : 'transparent',
                }}>
                  <span className="m8-p5" style={{ color: 'rgba(255,255,255,0.85)' }}>{agent.name}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#7CBC71' }} />
                    <span className="m8-p6" style={{ color: '#7CBC71' }}>{agent.status}</span>
                  </span>
                  <span className="m8-p6" style={{ color: 'rgba(255,255,255,0.5)' }}>{agent.last}</span>
                  <span className="m8-p6" style={{ color: 'rgba(255,255,255,0.5)' }}>{agent.next}</span>
                </div>
              ))}

              {/* Footer */}
              <div style={{ padding: '14px 20px', display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                {['100+ signals monitored', '24/7 autonomous execution', 'Zero manual intervention'].map(stat => (
                  <span key={stat} className="m8-p6" style={{ color: 'rgba(255,255,255,0.3)' }}>{stat}</span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — text */}
          <div style={{ flex: '1 1 40%', minWidth: 300 }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }}>
              <Badge variant="outline" style={{ marginBottom: 16 }}>Agent Foundry</Badge>
            </motion.div>

            <motion.h2 className="m8-h1-large" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }} transition={{ delay: 0.1 }}
              style={{ color: '#080D19', marginBottom: 20 }}>
              Set it once. Let it run forever.
            </motion.h2>

            <motion.p className="m8-p2" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }} transition={{ delay: 0.2 }}
              style={{ color: 'rgba(8,13,25,0.65)', marginBottom: 40 }}>
              Agent Foundry builds and deploys autonomous agents that execute decisions across your entire operation. Day or night. Holiday or not.
            </motion.p>

            {beats.map((beat, i) => (
              <motion.div key={beat.num} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }} transition={{ delay: i * 0.1 }}
                style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: '50%', background: '#FCB24F', color: 'white',
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
              100+ signals. 24 by 7. Zero delays.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
