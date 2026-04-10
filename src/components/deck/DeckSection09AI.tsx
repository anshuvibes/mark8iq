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
    <section style={{ background: '#12182B', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '80px 40px' }}>
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
          {/* Vertical divider */}
          <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 1, background: 'rgba(142,89,255,0.2)', transform: 'translateX(-50%)' }} />

          {/* Agent Mark */}
          <motion.div style={{ flex: 1 }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}>
            <p className="m8-h4" style={{ color: '#FFFFFF', marginBottom: 4 }}>Agent Mark</p>
            <p className="m8-p5" style={{ color: '#8E59FF', marginBottom: 20 }}>Instant Insights Engine</p>
            {agentMarkBullets.map((b, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 12 }}>
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#8E59FF', marginTop: 8, flexShrink: 0 }} />
                <p className="m8-p6" style={{ color: 'rgba(255,255,255,0.75)' }}>{b}</p>
              </div>
            ))}

            {/* Agent Mark visual */}
            <svg width="200" height="200" viewBox="0 0 200 200" fill="none" style={{ marginTop: 24 }}>
              <defs>
                <radialGradient id="orbGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#8E59FF" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#8E59FF" stopOpacity="0" />
                </radialGradient>
              </defs>
              <circle cx="100" cy="100" r="60" fill="url(#orbGrad)" />
              <circle cx="100" cy="100" r="20" fill="#8E59FF" fillOpacity="0.3" />
              <circle cx="100" cy="100" r="8" fill="#8E59FF" />
              {/* Lines to nodes */}
              <line x1="100" y1="80" x2="100" y2="30" stroke="#8E59FF" strokeWidth="1" strokeOpacity="0.3" />
              <line x1="120" y1="100" x2="170" y2="100" stroke="#8E59FF" strokeWidth="1" strokeOpacity="0.3" />
              <line x1="100" y1="120" x2="100" y2="170" stroke="#8E59FF" strokeWidth="1" strokeOpacity="0.3" />
              <line x1="80" y1="100" x2="30" y2="100" stroke="#8E59FF" strokeWidth="1" strokeOpacity="0.3" />
              {/* Nodes */}
              <circle cx="100" cy="25" r="5" fill="#8E59FF" fillOpacity="0.5" />
              <circle cx="175" cy="100" r="5" fill="#8E59FF" fillOpacity="0.5" />
              <circle cx="100" cy="175" r="5" fill="#8E59FF" fillOpacity="0.5" />
              <circle cx="25" cy="100" r="5" fill="#8E59FF" fillOpacity="0.5" />
              {/* Labels */}
              <text x="100" y="15" fill="rgba(255,255,255,0.5)" fontSize="9" textAnchor="middle">Analyst</text>
              <text x="190" y="104" fill="rgba(255,255,255,0.5)" fontSize="9" textAnchor="start">KAM</text>
              <text x="100" y="195" fill="rgba(255,255,255,0.5)" fontSize="9" textAnchor="middle">CXO</text>
              <text x="10" y="104" fill="rgba(255,255,255,0.5)" fontSize="9" textAnchor="end">Data</text>
            </svg>
          </motion.div>

          {/* Agent Foundry */}
          <motion.div style={{ flex: 1 }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}>
            <p className="m8-h4" style={{ color: '#FFFFFF', marginBottom: 4 }}>Agent Foundry</p>
            <p className="m8-p5" style={{ color: '#8E59FF', marginBottom: 20 }}>Automated Task Engine</p>
            {agentFoundryBullets.map((b, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 12 }}>
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#8E59FF', marginTop: 8, flexShrink: 0 }} />
                <p className="m8-p6" style={{ color: 'rgba(255,255,255,0.75)' }}>{b}</p>
              </div>
            ))}

            {/* Agent Foundry visual */}
            <svg width="200" height="160" viewBox="0 0 200 160" fill="none" style={{ marginTop: 24 }}>
              {/* Grid lines */}
              <line x1="0" y1="40" x2="200" y2="40" stroke="#8E59FF" strokeWidth="0.3" strokeOpacity="0.2" />
              <line x1="0" y1="80" x2="200" y2="80" stroke="#8E59FF" strokeWidth="0.3" strokeOpacity="0.2" />
              <line x1="0" y1="120" x2="200" y2="120" stroke="#8E59FF" strokeWidth="0.3" strokeOpacity="0.2" />
              <line x1="50" y1="0" x2="50" y2="160" stroke="#8E59FF" strokeWidth="0.3" strokeOpacity="0.2" />
              <line x1="100" y1="0" x2="100" y2="160" stroke="#8E59FF" strokeWidth="0.3" strokeOpacity="0.2" />
              <line x1="150" y1="0" x2="150" y2="160" stroke="#8E59FF" strokeWidth="0.3" strokeOpacity="0.2" />
              {/* Agent boxes */}
              <rect x="20" y="25" width="60" height="30" rx="6" stroke="#8E59FF" strokeWidth="1" fill="rgba(142,89,255,0.08)" />
              <rect x="70" y="65" width="60" height="30" rx="6" stroke="#8E59FF" strokeWidth="1" fill="rgba(142,89,255,0.08)" />
              <rect x="120" y="105" width="60" height="30" rx="6" stroke="#8E59FF" strokeWidth="1" fill="rgba(142,89,255,0.08)" />
              {/* Connecting lines */}
              <line x1="80" y1="55" x2="100" y2="65" stroke="#8E59FF" strokeWidth="1" strokeOpacity="0.4" />
              <line x1="130" y1="95" x2="150" y2="105" stroke="#8E59FF" strokeWidth="1" strokeOpacity="0.4" />
              {/* Status dots */}
              <circle cx="72" cy="33" r="3" fill="#52BFBC" />
              <circle cx="122" cy="73" r="3" fill="#52BFBC" />
              <circle cx="172" cy="113" r="3" fill="#52BFBC" />
              {/* Labels */}
              <text x="50" y="44" fill="rgba(255,255,255,0.6)" fontSize="8" textAnchor="middle">Bid Agent</text>
              <text x="100" y="84" fill="rgba(255,255,255,0.6)" fontSize="8" textAnchor="middle">Budget Agent</text>
              <text x="150" y="124" fill="rgba(255,255,255,0.6)" fontSize="8" textAnchor="middle">Alert Agent</text>
            </svg>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 991px) {
          .deck-two-col { flex-direction: column !important; }
          .deck-two-col > div { flex: 0 0 100% !important; max-width: 100% !important; }
        }
      `}</style>
    </section>
  );
}
