import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const modules: Record<string, { name: string; abbr: string; accent: string; pain: string; metric: string }> = {
  ads: { name: 'Mark8 Ads', abbr: 'AD', accent: '#FC7459', pain: 'Your ad spend across every marketplace. Optimized in real time.', metric: '105 Cr in ad spend optimized. 35% average ROAS improvement.' },
  sight: { name: 'Mark8 Sight', abbr: 'SI', accent: '#6895FC', pain: 'Know exactly where your brand ranks. Before your competitor does.', metric: 'Real-time rank tracking across 15+ marketplaces.' },
  shelf: { name: 'Mark8 Shelf', abbr: 'SH', accent: '#6895FC', pain: 'Your listings, your content, your digital shelf. Always at its best.', metric: 'ASIN-level visibility across every platform.' },
  returns: { name: 'Mark8 Returns', abbr: 'RE', accent: '#52BFBC', pain: 'Stop losing money to returns you cannot see coming.', metric: 'Returns analyzed and flagged before they hit your P&L.' },
  reco: { name: 'Mark8 Reco', abbr: 'RC', accent: '#7CBC71', pain: 'Reconciliation that closes itself. No chasing. No leakage.', metric: 'Financial leakages identified in real time.' },
  inventory: { name: 'Mark8 Inventory', abbr: 'PO', accent: '#FCB24F', pain: 'Never stockout. Never overstock. Always exactly right.', metric: 'Inventory decisions automated across all warehouses.' },
};

const leftKeys = ['ads', 'shelf', 'reco'];
const rightKeys = ['sight', 'returns', 'inventory'];

function ModuleCard({ k, mod, active, onClick }: { k: string; mod: typeof modules.ads; active: boolean; onClick: () => void }) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.15 }}
      style={{
        padding: '18px 20px',
        borderRadius: '12px',
        border: `1px solid ${active ? mod.accent + '40' : 'rgba(8,13,25,0.08)'}`,
        borderLeft: `3px solid ${mod.accent}`,
        backgroundColor: active ? mod.accent + '0d' : '#ffffff',
        cursor: 'pointer',
        boxShadow: active ? `0 4px 20px ${mod.accent}20` : 'none',
        transition: 'all 0.2s ease',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
        <span className="m8-p6" style={{ color: mod.accent, fontWeight: 500 }}>{mod.abbr}</span>
        <span className="m8-p5" style={{ fontWeight: 500, color: '#080D19' }}>{mod.name}</span>
      </div>
      <p className="m8-p6" style={{ color: 'rgba(8,13,25,0.55)' }}>{mod.pain}</p>
    </motion.div>
  );
}

export default function ProductSuiteV2() {
  const [activeModule, setActiveModule] = useState('ads');
  const active = modules[activeModule];

  return (
    <section style={{ padding: '100px 0', position: 'relative', zIndex: 1 }}>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.h2
          className="m8-h1-large"
          style={{ color: '#080D19', textAlign: 'center' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
        >
          Six products. One operating system.
        </motion.h2>
        <motion.p
          className="m8-p2"
          style={{ color: 'rgba(8,13,25,0.6)', textAlign: 'center', maxWidth: '500px', margin: '0 auto 64px' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ delay: 0.1 }}
        >
          Every function your brand runs on. Built to work together.
        </motion.p>

        {/* Hub-spoke grid */}
        <motion.div
          style={{ display: 'grid', gridTemplateColumns: '1fr 260px 1fr', gap: '16px', alignItems: 'start', marginBottom: '40px' }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ delay: 0.2 }}
        >
          {/* Left column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {leftKeys.map((k) => (
              <ModuleCard key={k} k={k} mod={modules[k]} active={activeModule === k} onClick={() => setActiveModule(k)} />
            ))}
          </div>

          {/* Market One center */}
          <div style={{
            background: '#080D19',
            borderRadius: '16px',
            padding: '28px 20px',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            alignSelf: 'stretch',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
          }}>
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(circle at 50% 50%, rgba(142,89,255,0.15), transparent 70%)',
              pointerEvents: 'none',
            }} />
            <h3 className="m8-p3-medium" style={{ color: '#fff', position: 'relative', zIndex: 1 }}>Market One</h3>
            <p className="m8-p6" style={{ color: 'rgba(255,255,255,0.5)', position: 'relative', zIndex: 1 }}>Your single source of truth</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'center', position: 'relative', zIndex: 1, marginTop: '8px' }}>
              {Object.values(modules).map((m) => (
                <div key={m.abbr} style={{ width: '8px', height: '8px', borderRadius: '50%', background: m.accent }} />
              ))}
            </div>
          </div>

          {/* Right column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {rightKeys.map((k) => (
              <ModuleCard key={k} k={k} mod={modules[k]} active={activeModule === k} onClick={() => setActiveModule(k)} />
            ))}
          </div>
        </motion.div>

        {/* Active module detail */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeModule}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '32px',
              padding: '32px',
              background: 'rgba(8,13,25,0.03)',
              borderRadius: '16px',
              border: '1px solid rgba(8,13,25,0.06)',
              marginBottom: '48px',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <p className="m8-p2" style={{ color: '#080D19', marginBottom: '12px' }}>{active.pain}</p>
              <p className="m8-p5" style={{ color: 'rgba(8,13,25,0.55)' }}>{active.metric}</p>
            </div>
            <div style={{
              background: 'rgba(8,13,25,0.04)',
              borderRadius: '12px',
              height: '200px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <span className="m8-p5" style={{ color: 'rgba(8,13,25,0.35)' }}>{active.name} dashboard UI — placeholder</span>
            </div>
          </motion.div>
        </AnimatePresence>

        <motion.p
          className="m8-p3"
          style={{ color: 'rgba(8,13,25,0.55)', textAlign: 'center' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
        >
          Everything talks to everything. Through Market One, your single source of truth.
        </motion.p>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .container > div[style*="grid-template-columns: 1fr 260px 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
