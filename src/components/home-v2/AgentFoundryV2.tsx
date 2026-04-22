import { motion } from 'motion/react';

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
    <>
      {/* Contained dark card callout */}
      <section style={{
        padding: '40px 0',
        background: 'transparent',
        position: 'relative',
      }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{
              background: '#080d19',
              borderRadius: '20px',
              border: '1px solid rgba(142,89,255,0.2)',
              padding: '72px 60px',
              position: 'relative',
              overflow: 'hidden',
              textAlign: 'center',
            }}
          >
            {/* Violet glow */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '500px',
              height: '250px',
              background: 'radial-gradient(ellipse, rgba(142,89,255,0.18) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />

            <p style={{
              fontFamily: "'Saira', sans-serif",
              fontSize: '24px',
              fontWeight: 400,
              lineHeight: '1.6',
              color: '#ffffff',
              margin: 0,
              position: 'relative',
              zIndex: 1,
              maxWidth: '760px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}>
              While your competitors wait for Monday morning reports,<br />
              what if your agents already acted on Friday night's data?
            </p>
          </motion.div>
        </div>
      </section>

    <section style={{ padding: '100px 0', position: 'relative' }}>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>

        <div style={{ display: 'flex', flexDirection: 'row', gap: '64px', alignItems: 'center' }}>
          <div style={{ flex: '0 0 44%', maxWidth: '44%', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <motion.p
              className="m8-eyebrow"
              style={{ color: '#FCB24F', marginBottom: '12px' }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
            >
              INTRODUCING AGENT FOUNDRY
            </motion.p>

            <motion.h2
              className="m8-h1-large"
              style={{ color: 'var(--v2-text)', marginBottom: '40px' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: 0.1 }}
            >
              Deploy a workforce that never clocks out.
            </motion.h2>

            <motion.p
              className="m8-p3"
              style={{ color: 'var(--v2-text-subtle)', marginBottom: '40px', marginTop: '-24px' }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: 0.15 }}
            >
              Configure agents on your business data. Deploy across every marketplace. Run automated logic 24/7. Add as many agents as your operation demands. From anywhere.
            </motion.p>

            {beats.map((beat, i) => (
              <motion.div
                key={beat.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ delay: 0.2 + i * 0.1 }}
                style={{ marginBottom: '28px', width: '100%', maxWidth: '360px', textAlign: 'left' }}
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
                <h4 className="m8-p3-medium" style={{ color: 'var(--v2-text)', marginBottom: '6px' }}>{beat.label}</h4>
                <p className="m8-p5" style={{ color: 'var(--v2-text-subtle)' }}>{beat.desc}</p>
              </motion.div>
            ))}

            <motion.p
              className="m8-p4"
              style={{ color: 'var(--v2-text-muted)', marginTop: '28px', width: '100%', maxWidth: '360px', textAlign: 'left' }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-80px' }}
            >
              100+ signals. 24 by 7. Zero delays.
            </motion.p>
          </div>

          <motion.div
            style={{ flex: '0 0 56%', maxWidth: '56%' }}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div style={{
              background: '#0D1117',
              borderRadius: '16px',
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.06)',
              boxShadow: `0 20px 60px var(--v2-shadow-strong)`,
            }}>
              <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="m8-p5" style={{ color: '#fff', fontWeight: 500 }}>Agent Foundry</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ade80' }} />
                  <span className="m8-p6" style={{ color: 'rgba(255,255,255,0.5)' }}>4 agents running</span>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', padding: '10px 20px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                {['Agent', 'Status', 'Last action', 'Next run'].map((h) => (
                  <span key={h} className="m8-p6" style={{ color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</span>
                ))}
              </div>

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

              <div style={{ padding: '14px 20px', display: 'flex', gap: '24px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                {['100+ signals monitored', '24/7 autonomous execution', 'Zero manual intervention'].map((stat) => (
                  <span key={stat} className="m8-p6" style={{ color: 'rgba(255,255,255,0.3)' }}>{stat}</span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 991px) {
          section > .container > div[style*="display: flex"] { flex-direction: column !important; }
          section > .container > div[style*="display: flex"] > div { flex: 0 0 100% !important; max-width: 100% !important; }
        }
      `}</style>
    </section>
    </>
  );
}
