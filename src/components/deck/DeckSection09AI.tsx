import { motion } from 'motion/react';

const agentMarkBullets = [
  'Role-based AI chat — asks the right questions, gives the right answers to each user type',
  'Analysts get Excel-ready data exports in seconds instead of hours of manual pulling',
  "KAMs get instant RCA & recommendations — 'Why did ACOS spike?' answered in one click",
  'CXOs get bird\'s-eye dashboards & strategic insights without waiting for reports',
];

const agentFoundryBullets = [
  'Low-code agent builder — automate repetitive tasks across all seller accounts simultaneously',
  'Auto-alerts: budget exhaustion, ACOS spikes, stock-outs triggered before they cost money',
  'Rule-based bid optimization — runs 24/7 across thousands of campaigns without human intervention',
  'Marketplace actions: pause/resume campaigns, adjust budgets, update bids — all automated at scale',
];

export default function DeckSection09AI() {
  return (
    <section style={{ background: '#12182B', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '80px 40px', position: 'relative', overflow: 'hidden' }}>
      {/* Slide number watermark */}
      <div className="deck-slide-number" style={{ color: 'rgba(255,255,255,0.03)' }}>09</div>

      <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <motion.p className="m8-p5" style={{ color: '#8E59FF', marginBottom: 12 }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6, ease: 'easeOut' }}>
            AI Capabilities
          </motion.p>
          <motion.h2 className="m8-h2" style={{ color: '#FFFFFF', marginBottom: 16 }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}>
            AI Agents That Make Scale Possible
          </motion.h2>
          <motion.p className="m8-p4" style={{ color: 'rgba(255,255,255,0.6)', maxWidth: 800, margin: '0 auto' }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}>
            Managing thousands of seller accounts isn't just about people — it's about AI doing the heavy lifting so our team focuses on what matters.
          </motion.p>
        </div>

        <div className="deck-two-col" style={{ display: 'flex', gap: 48, position: 'relative' }}>
          {/* Gradient divider */}
          <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 2, background: 'linear-gradient(to bottom, transparent, #8E59FF, transparent)', transform: 'translateX(-50%)' }} />

          {/* Agent Mark */}
          <motion.div style={{ flex: 1 }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}>
            {/* SVG first */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 32 }}>
              <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
                <defs>
                  <radialGradient id="orbGrad09" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#8E59FF" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#8E59FF" stopOpacity="0" />
                  </radialGradient>
                </defs>
                {/* Outer glow ring */}
                <circle cx="100" cy="100" r="70" stroke="#8E59FF" strokeWidth="0.5" strokeOpacity="0.15" fill="none" />
                <circle cx="100" cy="100" r="60" fill="url(#orbGrad09)" />
                <circle cx="100" cy="100" r="20" fill="#8E59FF" fillOpacity="0.3" />
                <circle cx="100" cy="100" r="8" fill="#8E59FF" className="deck-orb-glow" />
                {/* Dashed radiating lines */}
                <line x1="100" y1="80" x2="100" y2="30" stroke="#8E59FF" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="4 3" />
                <line x1="120" y1="100" x2="170" y2="100" stroke="#8E59FF" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="4 3" />
                <line x1="100" y1="120" x2="100" y2="170" stroke="#8E59FF" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="4 3" />
                <line x1="80" y1="100" x2="30" y2="100" stroke="#8E59FF" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="4 3" />
                {/* Nodes */}
                <circle cx="100" cy="25" r="5" fill="#8E59FF" fillOpacity="0.5" />
                <circle cx="175" cy="100" r="5" fill="#8E59FF" fillOpacity="0.5" />
                <circle cx="100" cy="175" r="5" fill="#8E59FF" fillOpacity="0.5" />
                <circle cx="25" cy="100" r="5" fill="#8E59FF" fillOpacity="0.5" />
                {/* Labels */}
                <text x="100" y="15" fill="rgba(255,255,255,0.5)" fontSize="9" textAnchor="middle" fontFamily="'Saira', sans-serif">Analyst</text>
                <text x="190" y="104" fill="rgba(255,255,255,0.5)" fontSize="9" textAnchor="start" fontFamily="'Saira', sans-serif">KAM</text>
                <text x="100" y="195" fill="rgba(255,255,255,0.5)" fontSize="9" textAnchor="middle" fontFamily="'Saira', sans-serif">CXO</text>
                <text x="10" y="104" fill="rgba(255,255,255,0.5)" fontSize="9" textAnchor="end" fontFamily="'Saira', sans-serif">Data</text>
              </svg>
            </div>

            <p className="m8-h4" style={{ color: '#FFFFFF', marginBottom: 4 }}>Agent Mark</p>
            <p className="m8-p5" style={{ color: '#8E59FF', marginBottom: 20 }}>Instant Insights Engine</p>
            {agentMarkBullets.map((b, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 12 }}>
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#8E59FF', marginTop: 8, flexShrink: 0 }} />
                <p className="m8-p6" style={{ color: 'rgba(255,255,255,0.75)' }}>{b}</p>
              </div>
            ))}
          </motion.div>

          {/* Agent Foundry */}
          <motion.div style={{ flex: 1 }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}>
            {/* SVG first */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 32 }}>
              <svg width="280" height="180" viewBox="0 0 280 180" fill="none">
                {/* Background grid */}
                {[40, 100, 160].map(y => <line key={y} x1="0" y1={y} x2="280" y2={y} stroke="#8E59FF" strokeWidth="0.3" strokeOpacity="0.15" />)}
                {[60, 140, 220].map(x => <line key={x} x1={x} y1="0" x2={x} y2="180" stroke="#8E59FF" strokeWidth="0.3" strokeOpacity="0.15" />)}
                {/* Agent node boxes */}
                <rect x="20" y="25" width="80" height="30" rx="6" stroke="#8E59FF" strokeWidth="1" fill="rgba(142,89,255,0.08)" />
                <rect x="100" y="75" width="80" height="30" rx="6" stroke="#8E59FF" strokeWidth="1" fill="rgba(142,89,255,0.08)" />
                <rect x="180" y="125" width="80" height="30" rx="6" stroke="#8E59FF" strokeWidth="1" fill="rgba(142,89,255,0.08)" />
                {/* Connector lines */}
                <line x1="100" y1="55" x2="140" y2="75" stroke="#8E59FF" strokeWidth="1" strokeOpacity="0.4" />
                <line x1="180" y1="105" x2="220" y2="125" stroke="#8E59FF" strokeWidth="1" strokeOpacity="0.4" />
                {/* Active status dots */}
                <circle cx="92" cy="33" r="3" fill="#52BFBC" className="deck-active-dot" />
                <circle cx="172" cy="83" r="3" fill="#52BFBC" className="deck-active-dot" />
                <circle cx="252" cy="133" r="3" fill="#52BFBC" className="deck-active-dot" />
                {/* Node text */}
                <text x="60" y="44" fill="rgba(255,255,255,0.6)" fontSize="9" textAnchor="middle" fontFamily="'Saira', sans-serif">Bid Agent</text>
                <text x="140" y="94" fill="rgba(255,255,255,0.6)" fontSize="9" textAnchor="middle" fontFamily="'Saira', sans-serif">Budget Agent</text>
                <text x="220" y="144" fill="rgba(255,255,255,0.6)" fontSize="9" textAnchor="middle" fontFamily="'Saira', sans-serif">Alert Agent</text>
                {/* Active labels */}
                <text x="92" y="24" fill="#52BFBC" fontSize="7" textAnchor="middle" fontFamily="'Saira', sans-serif">Active</text>
                <text x="172" y="74" fill="#52BFBC" fontSize="7" textAnchor="middle" fontFamily="'Saira', sans-serif">Active</text>
                <text x="252" y="124" fill="#52BFBC" fontSize="7" textAnchor="middle" fontFamily="'Saira', sans-serif">Active</text>
              </svg>
            </div>

            <p className="m8-h4" style={{ color: '#FFFFFF', marginBottom: 4 }}>Agent Foundry</p>
            <p className="m8-p5" style={{ color: '#8E59FF', marginBottom: 20 }}>Automation Engine</p>
            {agentFoundryBullets.map((b, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 12 }}>
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#8E59FF', marginTop: 8, flexShrink: 0 }} />
                <p className="m8-p6" style={{ color: 'rgba(255,255,255,0.75)' }}>{b}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <style>{`
        .deck-slide-number {
          position: absolute;
          top: 60px;
          right: 48px;
          font-family: 'Saira', sans-serif;
          font-size: 120px;
          font-weight: 400;
          line-height: 1;
          pointer-events: none;
          letter-spacing: -0.03em;
          user-select: none;
        }
        .deck-orb-glow {
          animation: orbGlow 3s ease-in-out infinite;
        }
        @keyframes orbGlow {
          0%, 100% { opacity: 1; r: 8; }
          50% { opacity: 0.6; r: 12; }
        }
        .deck-active-dot {
          animation: activePulse 2s ease-in-out infinite;
        }
        @keyframes activePulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @media (max-width: 991px) {
          .deck-two-col { flex-direction: column !important; }
          .deck-two-col > div { flex: 0 0 100% !important; max-width: 100% !important; }
        }
      `}</style>
    </section>
  );
}
