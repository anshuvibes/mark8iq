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

type TableRow = { cells: string[]; statusColor?: string; statusLabel?: string; actionLabel?: string };
type TableDef = { headers: string[]; rows: TableRow[] };

const mockupData: Record<string, TableDef> = {
  ads: {
    headers: ['Keyword', 'Spend', 'ROAS', 'Status'],
    rows: [
      { cells: ['Running shoes', '₹4.2L', '8.1x', ''], statusColor: '#22c55e', statusLabel: 'Active' },
      { cells: ['Sports footwear', '₹2.8L', '5.9x', ''], statusColor: '#22c55e', statusLabel: 'Active' },
      { cells: ['Nike alternative', '₹1.1L', '3.2x', ''], statusColor: '#f59e0b', statusLabel: 'Review' },
    ],
  },
  sight: {
    headers: ['Keyword', 'Amazon Rank', 'Flipkart Rank', 'Change'],
    rows: [
      { cells: ['Face serum', '#3', '#7', '▲2'], statusColor: '#22c55e' },
      { cells: ['Vitamin C cream', '#1', '#2', '—'], statusColor: '#9ca3af' },
      { cells: ['Anti-aging serum', '#8', '#12', '▼1'], statusColor: '#ef4444' },
    ],
  },
  shelf: {
    headers: ['ASIN', 'Title Score', 'Image Score', 'Status'],
    rows: [
      { cells: ['B08X4RZT91', '94/100', '88/100', ''], statusColor: '#22c55e', statusLabel: 'Healthy' },
      { cells: ['B07QWK8DJM', '71/100', '60/100', ''], statusColor: '#f59e0b', statusLabel: 'Needs Review' },
      { cells: ['B09NKDP2LF', '55/100', '45/100', ''], statusColor: '#ef4444', statusLabel: 'Action Required' },
    ],
  },
  returns: {
    headers: ['Reason', 'Volume', 'Revenue Impact', 'Risk'],
    rows: [
      { cells: ['Size mismatch', '142 units', '₹2.1L', ''], statusColor: '#f59e0b', statusLabel: 'Medium' },
      { cells: ['Wrong item', '38 units', '₹0.6L', ''], statusColor: '#ef4444', statusLabel: 'High' },
      { cells: ['Changed mind', '91 units', '₹1.3L', ''], statusColor: '#22c55e', statusLabel: 'Low' },
    ],
  },
  reco: {
    headers: ['Source', 'Amount', 'Status', 'Action'],
    rows: [
      { cells: ['Amazon FBA Reimbursement', '₹1,24,000', ''], statusColor: '#f59e0b', statusLabel: 'Pending', actionLabel: 'Claim Now' },
      { cells: ['Flipkart Short Payment', '₹38,500', ''], statusColor: '#ef4444', statusLabel: 'Overdue', actionLabel: 'Escalate' },
      { cells: ['Return without credit', '₹21,200', ''], statusColor: '#22c55e', statusLabel: 'Recovered', actionLabel: 'Closed' },
    ],
  },
  inventory: {
    headers: ['SKU', 'Stock', 'Days Cover', 'Alert'],
    rows: [
      { cells: ['SKU-SHOE-42B', '284 units', '18 days', ''], statusColor: '#22c55e', statusLabel: 'Healthy' },
      { cells: ['SKU-SHOE-38W', '43 units', '4 days', ''], statusColor: '#ef4444', statusLabel: 'Reorder Now' },
      { cells: ['SKU-SHOE-40B', '121 units', '9 days', ''], statusColor: '#f59e0b', statusLabel: 'Watch' },
    ],
  },
};

function DataTable({ moduleKey, accent }: { moduleKey: string; accent: string }) {
  const data = mockupData[moduleKey];
  if (!data) return null;

  const headerBg = accent + '14'; // ~8% opacity
  const headerBorder = accent + '26'; // ~15% opacity

  return (
    <div style={{
      background: 'rgba(8,13,25,0.03)',
      borderRadius: '10px',
      border: '1px solid rgba(8,13,25,0.06)',
      overflow: 'hidden',
      width: '100%',
    }}>
      {/* Header */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${data.headers.length}, 1fr)`,
        background: headerBg,
        borderBottom: `1px solid ${headerBorder}`,
        padding: '10px 16px',
      }}>
        {data.headers.map((h) => (
          <span key={h} className="m8-p6" style={{ fontWeight: 600, color: 'rgba(8,13,25,0.6)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{h}</span>
        ))}
      </div>
      {/* Rows */}
      {data.rows.map((row, ri) => (
        <div
          key={ri}
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${data.headers.length}, 1fr)`,
            padding: '10px 16px',
            borderBottom: ri < data.rows.length - 1 ? '1px solid rgba(8,13,25,0.05)' : 'none',
          }}
        >
          {data.headers.map((_, ci) => {
            const isLastCol = ci === data.headers.length - 1;
            // Status/action column
            if (isLastCol && (row.statusLabel || row.cells[ci])) {
              // For sight module, the change value is in cells
              if (moduleKey === 'sight') {
                return (
                  <span key={ci} className="m8-p6" style={{ color: row.statusColor, fontWeight: 500 }}>
                    {row.cells[ci]}
                  </span>
                );
              }
              // For reco, show action button
              if (moduleKey === 'reco' && row.actionLabel) {
                return (
                  <div key={ci} style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <span className="m8-p6" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: row.statusColor, display: 'inline-block' }} />
                      <span style={{ color: 'rgba(8,13,25,0.6)' }}>{row.statusLabel}</span>
                    </span>
                  </div>
                );
              }
              // Default status pill
              return (
                <span key={ci} className="m8-p6" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: row.statusColor, display: 'inline-block' }} />
                  <span style={{ color: 'rgba(8,13,25,0.6)' }}>{row.statusLabel}</span>
                </span>
              );
            }
            // For reco, column 3 (Status) is actually index 2
            if (moduleKey === 'reco' && ci === 2) {
              return (
                <span key={ci} className="m8-p6" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: row.statusColor, display: 'inline-block' }} />
                  <span style={{ color: 'rgba(8,13,25,0.6)' }}>{row.statusLabel}</span>
                </span>
              );
            }
            if (moduleKey === 'reco' && ci === 3) {
              return (
                <span key={ci} className="m8-p6" style={{ color: accent, fontWeight: 500, cursor: 'pointer' }}>
                  {row.actionLabel}
                </span>
              );
            }
            return (
              <span key={ci} className="m8-p6" style={{ color: ci === 0 ? '#080D19' : 'rgba(8,13,25,0.6)' }}>
                {row.cells[ci]}
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
}

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
          className="product-suite-grid"
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
            className="product-suite-detail"
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
            <DataTable moduleKey={activeModule} accent={active.accent} />
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
          .product-suite-grid {
            grid-template-columns: 1fr !important;
          }
          .product-suite-detail {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
