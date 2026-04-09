import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const modules: Record<string, { name: string; abbr: string; accent: string; pain: string; metric: string }> = {
  ads:       { name: 'Mark8 Ads',       abbr: 'AD', accent: '#FC7459', pain: 'Your ad spend across every marketplace. Optimized in real time.',        metric: '105 Cr in ad spend optimized. 35% average ROAS improvement.' },
  sight:     { name: 'Mark8 Sight',     abbr: 'SI', accent: '#6895FC', pain: 'Know exactly where your brand ranks. Before your competitor does.',       metric: 'Real-time rank tracking across 15+ marketplaces.' },
  shelf:     { name: 'Mark8 Shelf',     abbr: 'SH', accent: '#6895FC', pain: 'Your listings, your content, your digital shelf. Always at its best.',    metric: 'ASIN-level visibility across every platform.' },
  returns:   { name: 'Mark8 Returns',   abbr: 'RE', accent: '#52BFBC', pain: 'Stop losing money to returns you cannot see coming.',                     metric: 'Returns analyzed and flagged before they hit your P&L.' },
  reco:      { name: 'Mark8 Reco',      abbr: 'RC', accent: '#7CBC71', pain: 'Reconciliation that closes itself. No chasing. No leakage.',             metric: 'Financial leakages identified in real time.' },
  inventory: { name: 'Mark8 Inventory', abbr: 'PO', accent: '#FCB24F', pain: 'Never stockout. Never overstock. Always exactly right.',                  metric: 'Inventory decisions automated across all warehouses.' },
};

const leftKeys = ['ads', 'shelf', 'reco'];
const rightKeys = ['sight', 'returns', 'inventory'];

function ModuleCard({ moduleKey, mod, isActive, onClick }: { moduleKey: string; mod: typeof modules[string]; isActive: boolean; onClick: () => void }) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.15 }}
      style={{
        padding: '18px 20px',
        borderRadius: 12,
        border: `1px solid ${isActive ? mod.accent + '40' : 'rgba(8,13,25,0.08)'}`,
        borderLeft: `3px solid ${mod.accent}`,
        backgroundColor: isActive ? mod.accent + '0d' : '#ffffff',
        cursor: 'pointer',
        boxShadow: isActive ? `0 4px 20px ${mod.accent}20` : 'none',
        transition: 'all 0.2s ease',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
        <span className="m8-p6" style={{ color: mod.accent, fontWeight: 500 }}>{mod.abbr}</span>
        <span className="m8-p5" style={{ fontWeight: 500, color: '#080D19' }}>{mod.name}</span>
      </div>
      <p className="m8-p6" style={{ color: 'rgba(8,13,25,0.5)' }}>{mod.pain}</p>
    </motion.div>
  );
}

export default function ProductSuiteV2() {
  const [activeModule, setActiveModule] = useState('ads');
  const active = modules[activeModule];

  return (
    <section style={{ background: '#FFFFFF', padding: '100px 0' }}>
      <div className="container">
        <motion.h2
          className="m8-h1-large"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          style={{ color: '#080D19', textAlign: 'center' }}
        >
          Six products. One operating system.
        </motion.h2>
        <motion.p
          className="m8-p2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ delay: 0.1 }}
          style={{ color: 'rgba(8,13,25,0.6)', textAlign: 'center', maxWidth: 500, margin: '0 auto 64px' }}
        >
          Every function your brand runs on. Built to work together.
        </motion.p>

        {/* Hub-and-spoke grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 260px 1fr', gap: 16, alignItems: 'start' }}>
          {/* Left column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {leftKeys.map(k => (
              <ModuleCard key={k} moduleKey={k} mod={modules[k]} isActive={activeModule === k} onClick={() => setActiveModule(k)} />
            ))}
          </div>

          {/* Center — Market One */}
          <div style={{
            background: '#080D19',
            borderRadius: 16,
            padding: '32px 20px',
            textAlign: 'center',
            boxShadow: '0 0 60px rgba(142,89,255,0.15)',
            alignSelf: 'center',
          }}>
            <div className="m8-p3-medium" style={{ color: '#FFFFFF', marginBottom: 4 }}>Market One</div>
            <div className="m8-p6" style={{ color: 'rgba(255,255,255,0.5)', marginBottom: 20 }}>Your single source of truth</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center' }}>
              {Object.values(modules).map(m => (
                <span key={m.abbr} style={{
                  width: 8, height: 8, borderRadius: '50%', background: m.accent, display: 'inline-block',
                }} />
              ))}
            </div>
          </div>

          {/* Right column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {rightKeys.map(k => (
              <ModuleCard key={k} moduleKey={k} mod={modules[k]} isActive={activeModule === k} onClick={() => setActiveModule(k)} />
            ))}
          </div>
        </div>

        {/* Active module detail */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeModule}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            style={{
              marginTop: 48,
              display: 'flex',
              gap: 32,
              padding: 32,
              background: active.accent + '08',
              border: `1px solid ${active.accent}20`,
              borderRadius: 16,
              flexWrap: 'wrap',
            }}
          >
            <div style={{ flex: '1 1 300px' }}>
              <p className="m8-p2" style={{ color: '#080D19', marginBottom: 12 }}>{active.pain}</p>
              <p className="m8-p5" style={{ color: active.accent }}>{active.metric}</p>
            </div>
            <div style={{
              flex: '1 1 300px',
              background: 'rgba(8,13,25,0.04)',
              borderRadius: 8,
              height: 180,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <span className="m8-p5" style={{ color: 'rgba(8,13,25,0.35)' }}>{active.name} dashboard UI — placeholder</span>
            </div>
          </motion.div>
        </AnimatePresence>

        <p className="m8-p3" style={{ color: 'rgba(8,13,25,0.5)', textAlign: 'center', marginTop: 48 }}>
          Everything talks to everything. Through Market One, your single source of truth.
        </p>
      </div>
    </section>
  );
}
