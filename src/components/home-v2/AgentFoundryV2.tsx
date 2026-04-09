import { motion } from 'motion/react';
import GridOverlay from './GridOverlay';

const beats = [
  { num: '01', label: 'Build', desc: 'Configure agents for any task. Bid adjustments, inventory alerts, return flags, reconciliation triggers.', color: '#FCB24F' },
  { num: '02', label: 'Deploy', desc: 'Push agents live across every marketplace simultaneously. One action. Complete coverage.', color: '#FCB24F' },
  { num: '03', label: 'Run', desc: 'Agents execute in real time. Every signal, every trigger, every action. Without waiting for a human.', color: '#FCB24F' },
];

const agents = [
  { name: 'Price Tracker Agent', status: 'Active', last: '2 min ago', next: '58 min', highlight: false },
  { name: 'ROAS Optimiser Agent', status: 'Active', last: '14 min ago', next: '46 min', highlight: true },
  { name: 'Stock Alert Agent', status: 'Active', last: '1 hr ago', next: '59 min', highlight: false },
  { name: 'Return Reconciler Agent', status: 'Active', last: '3 hrs ago', next: '21 min', highlight: false },
];

export default function AgentFoundryV2() {
  return (
    <section style={{ background: '#FFFFFF', padding: '100px 0', position: 'relative' }}>
      <GridOverlay />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Power line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          style={{
            textAlign: 'center',
            marginBottom: '64px',
            padding: '32px',
            background: 'rgba(8,13,25,0.03)',
            borderRadius: '12px',
          }}
        >
          <p className="m8-p2" style={{ color: 'rgba(8,13,25,0.6)', fontStyle: 'italic' }}>
            While your competitors wait for Monday morning reports, your agents already acted on Friday night's data.
          </p>
        </motion.div>

        <div style={{ display: 'flex', gap: '64px', alignItems: 'center' }}>
          {/* Left column - Console UI */}
          <motion.div
            style={{ flex: '0 0 56%', maxWidth: '56%' }}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div style={{
              background: '#0D1117',
              borderRadius: '16px',
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.06)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
            }}>
              {/* Console header */}
              <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="m8-p5" style={{ color: '#fff', fontWeight: 500 }}>Agent Foundry</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ade80' }} />
                  <span className="m8-p6" style={{ color: 'rgba(255,255,255,0.5)' }}>4 agents running</span>
                </div>
              </div>

              {/* Column headers */}
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', padding: '10px 20px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                {['Agent', 'Status', 'Last action', 'Next run'].map((h) => (
                  <span key={h} className="m8-p6" style={{ color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</span>
                ))}
              </div>

              {/* Agent rows */}
              {agents.map((agent) => (
                <div
                  key={agent.name}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '2fr 1fr 1fr 1fr',
                    padding: '14px 20px',
                    borderBottom: '1px solid rgba(255,255,255,0.03)',
                    background: agent.highlight ? 'rgba(142,89,255,0.06)' : 'transparent',
                  }}
                >
                  <span className="m8-p5" style={{ color: 'rgba(255,255,255,0.85)' }}>{agent.name}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ade80' }} />
                    <span className="m8-p6" style={{ color: '#4ade80' }}>{agent.status}</span>
                  </div>
                  <span className="m8-p6" style={{ color: 'rgba(255,255,255,0.45)' }}>{agent.last}</span>
                  <span className="m8-p6" style={{ color: 'rgba(255,255,255,0.45)' }}>{agent.next}</span>
                </div>
              ))}

              {/* Footer stats */}
              <div style={{ padding: '14px 20px', display: 'flex', gap: '24px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                {['100+ signals monitored', '24/7 autonomous execution', 'Zero manual intervention'].map((stat) => (
                  <span key={stat} className="m8-p6" style={{ color: 'rgba(255,255,255,0.3)' }}>{stat}</span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right column - text */}
          <div style={{ flex: '0 0 44%', maxWidth: '44%' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              style={{
                display: 'inline-block',
                padding: '6px 16px',
                borderRadius: '9999px',
                background: 'rgba(252,180,79,0.1)',
                border: '1px solid rgba(252,180,79,0.2)',
                marginBottom: '16px',
              }}
            >
              <span className="m8-p6" style={{ color: '#FCB24F', fontWeight: 500 }}>Agent Foundry</span>
            </motion.div>

            <motion.h2
              className="m8-h1-large"
              style={{ color: '#080D19', marginBottom: '20px' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: 0.1 }}
            >
              Set it once. Let it run forever.
            </motion.h2>

            <motion.p
              className="m8-p2"
              style={{ color: 'rgba(8,13,25,0.65)', marginBottom: '40px' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: 0.15 }}
            >
              Agent Foundry builds and deploys autonomous agents that execute decisions across your entire operation. Day or night. Holiday or not.
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
                  background: 'rgba(252,180,79,0.12)',
                  marginBottom: '10px',
                }}>
                  <span className="m8-p6" style={{ color: '#FCB24F', fontWeight: 500 }}>{beat.num}</span>
                </div>
                <h4 className="m8-p3-medium" style={{ color: '#080D19', marginBottom: '6px' }}>{beat.label}</h4>
                <p className="m8-p5" style={{ color: 'rgba(8,13,25,0.55)' }}>{beat.desc}</p>
              </motion.div>
            ))}

            <motion.p
              className="m8-p4"
              style={{ color: 'rgba(8,13,25,0.45)', fontStyle: 'italic', marginTop: '28px' }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-80px' }}
            >
              100+ signals. 24 by 7. Zero delays.
            </motion.p>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 991px) {
          section > .container > div[style*="display: flex"] { flex-direction: column !important; }
          section > .container > div[style*="display: flex"] > div { flex: 0 0 100% !important; max-width: 100% !important; }
        }
      `}</style>
    </section>
  );
}
