import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import GridOverlay from './GridOverlay';

const roles = [
  {
    label: 'Analyst',
    tagline: 'Stop building reports. Start finding answers.',
    body: 'Raw data exports. ASIN-level breakdowns. Campaign performance tables. Reconciliation reports.',
    visual: 'Data table view',
  },
  {
    label: 'E-Commerce Manager',
    tagline: 'See what is moving, what is stuck, and why. Before your morning meeting.',
    body: 'Trend lines. Week-on-week movement. Marketplace comparison. Inventory alerts.',
    visual: 'Trend dashboard view',
  },
  {
    label: 'CEO / Founder',
    tagline: 'The full picture. In the time it takes to pour your first coffee.',
    body: 'P&L impact. Blended ROAS. GMV trajectory. Financial leakage alerts.',
    visual: 'Executive summary view',
  },
];

export default function RoleBasedValueV2() {
  const [activeRole, setActiveRole] = useState(0);

  return (
    <section style={{ background: 'rgba(237,240,247,0.85)', padding: '100px 0', position: 'relative' }}>
      <GridOverlay />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.h2
          className="m8-h1-large"
          style={{ color: '#080D19', textAlign: 'center' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
        >
          Everyone on your team gets exactly what they need.
        </motion.h2>
        <motion.p
          className="m8-p2"
          style={{ color: 'rgba(8,13,25,0.6)', textAlign: 'center', maxWidth: '520px', margin: '0 auto 56px' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ delay: 0.1 }}
        >
          Same data. Delivered differently. For every role.
        </motion.p>

        <div style={{ display: 'flex', gap: '16px', marginBottom: '40px' }}>
          {roles.map((role, i) => {
            const isActive = activeRole === i;
            return (
              <motion.div
                key={role.label}
                onClick={() => setActiveRole(i)}
                style={{
                  flex: isActive ? 1.4 : 1,
                  padding: '24px',
                  background: '#fff',
                  borderRadius: '12px',
                  border: '1px solid rgba(8,13,25,0.08)',
                  borderLeft: isActive ? '3px solid #8E59FF' : '1px solid rgba(8,13,25,0.08)',
                  boxShadow: isActive ? '0 8px 32px rgba(0,0,0,0.08)' : 'none',
                  cursor: 'pointer',
                  transition: 'flex 0.3s ease, box-shadow 0.2s ease',
                  overflow: 'hidden',
                }}
                whileHover={!isActive ? { boxShadow: '0 4px 16px rgba(0,0,0,0.06)' } : {}}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ delay: i * 0.1 }}
              >
                <h3 className="m8-p3-medium" style={{ color: '#080D19', marginBottom: '8px' }}>{role.label}</h3>
                <p className="m8-p5" style={{ color: 'rgba(8,13,25,0.55)', marginBottom: isActive ? '16px' : 0 }}>{role.tagline}</p>

                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ overflow: 'hidden' }}
                    >
                      <p className="m8-p5" style={{ color: '#080D19', marginBottom: '16px' }}>{role.body}</p>
                      <div style={{
                        background: 'rgba(8,13,25,0.04)',
                        borderRadius: '8px',
                        height: '120px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                        <span className="m8-p6" style={{ color: 'rgba(8,13,25,0.4)' }}>{role.visual}</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        <motion.p
          className="m8-p3"
          style={{ color: 'rgba(8,13,25,0.55)', textAlign: 'center' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
        >
          One platform. Every role. No version of the truth gets lost.
        </motion.p>
      </div>

      <style>{`
        @media (max-width: 768px) {
          section > .container > div[style*="display: flex"] { flex-direction: column !important; }
        }
      `}</style>
    </section>
  );
}
