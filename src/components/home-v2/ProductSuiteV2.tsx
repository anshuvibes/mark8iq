import { useState, useRef, useEffect, forwardRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import gsap from 'gsap';
import { useV2Theme } from './ThemeContext';

const modules: Record<string, { name: string; abbr: string; accent: string; pain: string; metric: string; logo: string }> = {
  ads: { name: 'Mark8 Ads', abbr: 'AD', accent: '#dd4062', logo: '/img/product-logos/black/mark8-ads.svg', pain: 'Your ad spend across every marketplace. Optimized in real time.', metric: '105 Cr in ad spend optimized. 35% average ROAS improvement.' },
  sight: { name: 'Mark8 Sight', abbr: 'SI', accent: '#52bfbc', logo: '/img/product-logos/black/mark8-sight.svg', pain: 'Know exactly where your brand ranks. Before your competitor does.', metric: 'Real-time rank tracking across 15+ marketplaces.' },
  shelf: { name: 'Mark8 Shelf', abbr: 'SH', accent: '#6895fc', logo: '/img/product-logos/black/mark8-shelf.svg', pain: 'Your listings, your content, your digital shelf. Always at its best.', metric: 'ASIN-level visibility across every platform.' },
  returns: { name: 'Mark8 Returns', abbr: 'RE', accent: '#fc7459', logo: '/img/product-logos/black/mark8-returns.svg', pain: 'Stop losing money to returns you cannot see coming.', metric: 'Returns analyzed and flagged before they hit your P&L.' },
  reco: { name: 'Mark8 Reco', abbr: 'RC', accent: '#7cbc71', logo: '/img/product-logos/black/mark8-reco.svg', pain: 'Reconciliation that closes itself. No chasing. No leakage.', metric: 'Financial leakages identified in real time.' },
  inventory: { name: 'Mark8 Inventory', abbr: 'PO', accent: '#fcb24f', logo: '/img/product-logos/black/mark8-po.svg', pain: 'Never stockout. Never overstock. Always exactly right.', metric: 'Inventory decisions automated across all warehouses.' },
  marketone: { name: 'Market One', abbr: 'M1', accent: '#8e59ff', logo: '/img/product-logos/black/market-one.svg', pain: 'Every product is a consolidated product.\nMarket One is the consolidation of all consolidations.', metric: '6 dashboards. 15+ marketplaces. One source of truth.' },
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

  const headerBg = accent + '14';
  const headerBorder = accent + '26';

  return (
    <div style={{
      background: 'var(--v2-bg-card)',
      borderRadius: '10px 0 0 0',
      border: '1px solid var(--v2-border)',
      width: '100%',
      height: '100%',
      marginTop: '28px',
      marginRight: '28px',
      overflow: 'hidden',
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${data.headers.length}, 1fr)`,
        background: headerBg,
        borderBottom: `1px solid ${headerBorder}`,
        padding: '10px 16px',
      }}>
        {data.headers.map((h) => (
          <span key={h} className="m8-p6" style={{ fontWeight: 500, color: 'var(--v2-text-secondary)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{h}</span>
        ))}
      </div>
      {data.rows.map((row, ri) => (
        <div
          key={ri}
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${data.headers.length}, 1fr)`,
            padding: '10px 16px',
            borderBottom: ri < data.rows.length - 1 ? '1px solid var(--v2-border)' : 'none',
          }}
        >
          {data.headers.map((_, ci) => {
            const isLastCol = ci === data.headers.length - 1;
            if (isLastCol && (row.statusLabel || row.cells[ci])) {
              if (moduleKey === 'sight') {
                return (
                  <span key={ci} className="m8-p6" style={{ color: row.statusColor, fontWeight: 500 }}>
                    {row.cells[ci]}
                  </span>
                );
              }
              if (moduleKey === 'reco' && row.actionLabel) {
                return (
                  <div key={ci} style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <span className="m8-p6" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: row.statusColor, display: 'inline-block' }} />
                      <span style={{ color: 'var(--v2-text-secondary)' }}>{row.statusLabel}</span>
                    </span>
                  </div>
                );
              }
              return (
                <span key={ci} className="m8-p6" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: row.statusColor, display: 'inline-block' }} />
                  <span style={{ color: 'var(--v2-text-secondary)' }}>{row.statusLabel}</span>
                </span>
              );
            }
            if (moduleKey === 'reco' && ci === 2) {
              return (
                <span key={ci} className="m8-p6" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: row.statusColor, display: 'inline-block' }} />
                  <span style={{ color: 'var(--v2-text-secondary)' }}>{row.statusLabel}</span>
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
              <span key={ci} className="m8-p6" style={{ color: ci === 0 ? 'var(--v2-text)' : 'var(--v2-text-secondary)' }}>
                {row.cells[ci]}
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
}

const ModuleCard = forwardRef<HTMLDivElement, { k: string; mod: typeof modules.ads; active: boolean; onMouseEnter: () => void }>(
  ({ mod, active, onMouseEnter }, ref) => (
    <div
      ref={ref}
      onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; onMouseEnter(); }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
      style={{
        padding: '20px',
        borderRadius: '14px',
        border: `1px solid ${active ? mod.accent + '40' : 'var(--v2-border)'}`,
        background: '#ffffff',
        backgroundImage: active
          ? `radial-gradient(ellipse at 0% 100%, ${mod.accent}22 0%, transparent 65%)`
          : `radial-gradient(ellipse at 0% 100%, ${mod.accent}12 0%, transparent 60%)`,
        cursor: 'pointer',
        boxShadow: active
          ? `0 4px 24px ${mod.accent}25`
          : '0 1px 3px rgba(0,0,0,0.04)',
        transition: 'all 0.2s ease',
        position: 'relative',
        zIndex: 1,
        overflow: 'hidden',
      }}
    >

      {/* Logo */}
      <img
        src={mod.logo}
        alt={mod.name}
        style={{
          height: '20px',
          width: 'auto',
          display: 'block',
          marginBottom: '8px',
          opacity: active ? 1 : 0.75,
          transition: 'opacity 0.2s ease',
        }}
      />

      {/* Pain copy */}
      <p className="m8-p6" style={{ color: 'var(--v2-text-subtle)', margin: 0, lineHeight: '1.5' }}>
        {mod.pain}
      </p>
    </div>
  )
);
ModuleCard.displayName = 'ModuleCard';

export default function ProductSuiteV2() {
  const [activeModule, setActiveModule] = useState('marketone');
  const active = modules[activeModule];
  const { theme } = useV2Theme();
  const activeLogo = active.logo.replace('/black/', `/${theme === 'dark' ? 'white' : 'black'}/`);

  const hubRef = useRef<HTMLDivElement | null>(null);
  const centerRef = useRef<HTMLDivElement | null>(null);
  const dashRefs = useRef<Record<string, SVGPathElement | null>>({});
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [paths, setPaths] = useState<Array<{ id: string; d: string; accent: string }>>([]);
  const [hubSize, setHubSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const measure = () => {
      const hub = hubRef.current;
      const center = centerRef.current;
      if (!hub || !center) return;

      const hubRect = hub.getBoundingClientRect();
      const centerRect = center.getBoundingClientRect();

      setHubSize({ w: hubRect.width, h: hubRect.height });

      const cx = centerRect.left - hubRect.left + centerRect.width / 2;
      const cy = centerRect.top - hubRect.top + centerRect.height / 2;
      const r = centerRect.width / 2;

      const computed: Array<{ id: string; d: string; accent: string }> = [];

      // Entry point offsets — 24px spacing between each path at circle edge
      const leftOffsets  = [-24, 0, 24];  // ads, shelf, reco (top to bottom)
      const rightOffsets = [-24, 0, 24];  // sight, returns, inventory (top to bottom)

      leftKeys.forEach((k, i) => {
        const card = cardRefs.current[k];
        if (!card) return;

        const cardRect = card.getBoundingClientRect();
        const cardX = cardRect.right - hubRect.left;
        const cardY = cardRect.top - hubRect.top + cardRect.height / 2;

        // West pole with vertical offset
        const originX = cx - r;
        const originY = cy + leftOffsets[i];

        const span = Math.abs(cardX - originX);
        const pull = span * 0.42;

        const cp1x = cardX + pull;
        const cp1y = cardY;
        const cp2x = originX - pull * 0.5;
        const cp2y = originY;

        const d = `M ${cardX} ${cardY} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${originX} ${originY}`;
        computed.push({ id: k, d, accent: modules[k].accent });
      });

      rightKeys.forEach((k, i) => {
        const card = cardRefs.current[k];
        if (!card) return;

        const cardRect = card.getBoundingClientRect();
        const cardX = cardRect.left - hubRect.left;
        const cardY = cardRect.top - hubRect.top + cardRect.height / 2;

        // East pole with vertical offset
        const originX = cx + r;
        const originY = cy + rightOffsets[i];

        const span = Math.abs(cardX - originX);
        const pull = span * 0.42;

        const cp1x = cardX - pull;
        const cp1y = cardY;
        const cp2x = originX + pull * 0.5;
        const cp2y = originY;

        const d = `M ${cardX} ${cardY} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${originX} ${originY}`;
        computed.push({ id: k, d, accent: modules[k].accent });
      });

      setPaths(computed);
    };

    measure();
    // Re-measure shortly after mount in case fonts/layout settle
    const t = setTimeout(measure, 100);
    window.addEventListener('resize', measure);
    return () => {
      clearTimeout(t);
      window.removeEventListener('resize', measure);
    };
  }, []);

  useEffect(() => {
    if (paths.length === 0) return;

    const animations: gsap.core.Tween[] = [];

    paths.forEach((p, i) => {
      const el = dashRefs.current[p.id];
      if (!el) return;

      const length = el.getTotalLength();

      // Start: dash at card end (position 0 of the path = card edge)
      // This is the beginning of the inward journey
      gsap.set(el, {
        strokeDasharray: `20 ${length}`,
        strokeDashoffset: 0,
      });

      // Animate to: dash travels from card → circle
      // dashOffset increases from 0 to length+20, moving dash along path toward circle
      const anim = gsap.to(el, {
        strokeDashoffset: -(length + 20),
        duration: 2.4,       // Match pulse cycle exactly (suiteWave1 = 2.4s)
        ease: 'none',
        repeat: -1,
        delay: 0,
      });

      animations.push(anim);
    });

    return () => {
      animations.forEach((a) => a.kill());
    };
  }, [paths]);

  return (
    <section style={{ padding: '100px 0', position: 'relative', zIndex: 1 }}>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.h2
          className="m8-h1-large"
          style={{ color: 'var(--v2-text)', textAlign: 'center' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
        >
          Six products. One operating system.
        </motion.h2>
        <motion.p
          className="m8-p2"
          style={{ color: 'var(--v2-text-secondary)', textAlign: 'center', maxWidth: '500px', margin: '0 auto 64px' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ delay: 0.1 }}
        >
          Every function your brand runs on. Built to work together.
        </motion.p>

        <div style={{
          border: `1px solid ${active.accent}30`,
          borderRadius: '20px',
          overflow: 'visible',
          background: '#ffffff',
          backgroundImage: `radial-gradient(ellipse at 0% 100%, ${active.accent}12 0%, transparent 60%)`,
          transition: 'background-image 0.3s ease, border-color 0.3s ease',
          marginBottom: '32px',
        }}>
        <motion.div
          ref={hubRef}
          className="product-suite-grid"
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '40px',
            padding: '40px 32px',
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ delay: 0.2 }}
        >
          <div className="product-suite-col" style={{ display: 'flex', flexDirection: 'column', gap: '14px', flex: '0 0 280px', position: 'relative', zIndex: 2 }}>
            {leftKeys.map((k) => (
              <ModuleCard
                key={k}
                k={k}
                mod={modules[k]}
                active={activeModule === k}
                onMouseEnter={() => setActiveModule(k)}
                ref={(el) => { cardRefs.current[k] = el; }}
              />
            ))}
          </div>

          {/* Center circle */}
          <div className="product-suite-center" style={{
            position: 'relative',
            flex: '0 0 300px',
            height: '300px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2,
            overflow: 'visible',
          }}>
            {/* Outer glow — bleeds into background */}
            <div style={{
              position: 'absolute',
              inset: '-60px',
              borderRadius: '50%',
              background: 'radial-gradient(circle at 50% 50%, rgba(142,89,255,0.18), transparent 65%)',
              pointerEvents: 'none',
              zIndex: 0,
            }} />

            {/* Pulse waves — three sonar rings */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '300px',
              height: '300px',
              marginTop: '-150px',
              marginLeft: '-150px',
              borderRadius: '50%',
              border: '1px solid rgba(142,89,255,0.35)',
              animation: 'suiteWave1 3s ease-out infinite',
              pointerEvents: 'none',
              transformOrigin: 'center',
              zIndex: 0,
            }} />
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '300px',
              height: '300px',
              marginTop: '-150px',
              marginLeft: '-150px',
              borderRadius: '50%',
              border: '1px solid rgba(142,89,255,0.3)',
              animation: 'suiteWave1 3s ease-out infinite',
              animationDelay: '0.8s',
              pointerEvents: 'none',
              transformOrigin: 'center',
              zIndex: 0,
            }} />
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '300px',
              height: '300px',
              marginTop: '-150px',
              marginLeft: '-150px',
              borderRadius: '50%',
              border: '1px solid rgba(142,89,255,0.25)',
              animation: 'suiteWave1 3s ease-out infinite',
              animationDelay: '1.6s',
              pointerEvents: 'none',
              transformOrigin: 'center',
              zIndex: 0,
            }} />

            {/* Main circle — 3D feel */}
            <div ref={centerRef}
              onMouseEnter={() => setActiveModule('marketone')}
              style={{
              width: '300px',
              height: '300px',
              borderRadius: '50%',
              background: 'radial-gradient(circle at 32% 28%, #2a2440 0%, #15182a 40%, #080D19 100%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              padding: '20px',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 18px 50px rgba(8,13,25,0.5), inset 0 -8px 24px rgba(0,0,0,0.4), inset 0 2px 2px rgba(255,255,255,0.08)',
              zIndex: 2,
              cursor: 'pointer',
            }}>
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(circle at 50% 50%, rgba(142,89,255,0.18), transparent 70%)',
                pointerEvents: 'none',
              }} />
              <img
                src="/img/product-logos/white/market-one.svg"
                alt="Market One"
                style={{
                  height: '32px',
                  width: 'auto',
                  display: 'block',
                  position: 'relative',
                  zIndex: 1,
                }}
              />
              <span style={{ color: 'rgba(255,255,255,0.45)', textAlign: 'center', padding: '0 20px', position: 'relative', zIndex: 1, lineHeight: 1.4, fontSize: '11px', fontFamily: "'Saira', sans-serif", fontWeight: 300 }}>
                Single source of truth
              </span>
            </div>
          </div>

          <div className="product-suite-col" style={{ display: 'flex', flexDirection: 'column', gap: '14px', flex: '0 0 280px', position: 'relative', zIndex: 2 }}>
            {rightKeys.map((k) => (
              <ModuleCard
                key={k}
                k={k}
                mod={modules[k]}
                active={activeModule === k}
                onMouseEnter={() => setActiveModule(k)}
                ref={(el) => { cardRefs.current[k] = el; }}
              />
            ))}
          </div>

          {/* SVG overlay */}
          <svg
            width={hubSize.w}
            height={hubSize.h}
            viewBox={`0 0 ${hubSize.w} ${hubSize.h}`}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
              zIndex: 1,
            }}
          >
            {paths.map((p) => (
              <g key={p.id}>
                <path
                  d={p.d}
                  fill="none"
                  stroke={p.accent}
                  strokeWidth="1"
                  strokeOpacity="0.12"
                  strokeLinecap="round"
                />
                <path
                  ref={(el) => { dashRefs.current[p.id] = el; }}
                  d={p.d}
                  fill="none"
                  stroke={p.accent}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeDasharray="20 200"
                  strokeDashoffset="0"
                  strokeOpacity="0.9"
                />
              </g>
            ))}
          </svg>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeModule}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="product-suite-detail"
            style={{
              display: activeModule === 'marketone' ? 'block' : 'grid',
              gridTemplateColumns: activeModule === 'marketone' ? undefined : '1fr 1fr',
              gap: activeModule === 'marketone' ? undefined : '32px',
              background: `#ffffff`,
              backgroundImage: `radial-gradient(ellipse at 0% 100%, ${active.accent}35 0%, ${active.accent}12 50%, transparent 100%)`,
              opacity: 1,
              borderRadius: '12px',
              border: `1px solid var(--v2-border)`,
              margin: '0 32px 32px 32px',
              height: '220px',
              overflow: 'hidden',
            }}
          >
            {activeModule === 'marketone' ? (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: '32px 60px',
                gap: '14px',
                height: '100%',
              }}>
                <img
                  src="/img/product-logos/black/market-one.svg"
                  alt="Market One"
                  style={{ height: '26px', width: 'auto', marginBottom: '4px' }}
                />
                <p className="m8-p2" style={{ color: 'var(--v2-text)', margin: 0, maxWidth: '560px', whiteSpace: 'pre-line' }}>
                  Every product is a consolidated product.{"\n"}Market One is the consolidation of all consolidations.
                </p>
                <p className="m8-p5" style={{ color: 'var(--v2-text-subtle)', margin: 0 }}>
                  6 dashboards. 15+ marketplaces. One source of truth.
                </p>
              </div>
            ) : (
              <>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', gap: '10px', padding: '28px 28px' }}>
                  <img
                    src={activeLogo}
                    alt={active.name}
                    style={{ height: '22px', width: 'auto', display: 'block', opacity: 0.85, alignSelf: 'flex-start' }}
                  />
                  <p className="m8-p2" style={{
                    color: 'var(--v2-text)',
                    margin: 0,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}>{active.pain}</p>
                  <p className="m8-p5" style={{
                    color: 'var(--v2-text-subtle)',
                    margin: 0,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}>{active.metric}</p>
                </div>
                <DataTable moduleKey={activeModule} accent={active.accent} />
              </>
            )}
          </motion.div>
        </AnimatePresence>
        </div>

        <motion.p
          className="m8-p3"
          style={{ color: 'var(--v2-text-subtle)', textAlign: 'center' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
        >
          Everything talks to everything. Through Market One, your single source of truth.
        </motion.p>
      </div>

      <style>{`
        @keyframes suiteWave1 {
          0%   { transform: scale(1);   opacity: 0.7; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        @media (max-width: 768px) {
          .product-suite-grid {
            flex-direction: column !important;
          }
          .product-suite-col {
            flex: 1 1 auto !important;
            width: 100%;
          }
          .product-suite-detail {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
