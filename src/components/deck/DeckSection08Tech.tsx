import { motion } from 'motion/react';

const features = [
  { name: 'Unified Dashboard', desc: 'All sellers on one screen — real-time ad spend, clicks, ACOS, sales across accounts. One view replaces five tools.' },
  { name: 'AI-Driven Optimization', desc: 'Automated bid adjustments, budget pacing, & keyword targeting at scale' },
  { name: 'Proprietary Crawl Data', desc: 'Hourly marketplace intelligence — search rank, competitor pricing, BSR tracking' },
  { name: 'Automated Alerts', desc: 'Budget exhaustion, ACOS spikes, stock-outs — catch issues before they cost money' },
  { name: 'Seller Self-Service', desc: 'Each seller sees their own performance — reduces manual reporting by 80%' },
  { name: 'Bulk Operations', desc: 'Campaign creation, bid changes, budget allocation — across thousands of accounts simultaneously' },
];

export default function DeckSection08Tech() {
  return (
    <section style={{ background: '#080D19', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', overflow: 'hidden', padding: '80px 40px' }}>
      {/* Slide number watermark */}
      <div className="deck-slide-number" style={{ color: 'rgba(255,255,255,0.03)' }}>08</div>

      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/img/bg-pattern.svg)', backgroundRepeat: 'repeat', opacity: 0.04, pointerEvents: 'none', zIndex: 0 }} />

      {/* Faint dashboard wireframe */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.06, pointerEvents: 'none', zIndex: 0 }} viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
        <rect x="100" y="80" width="400" height="200" rx="8" stroke="#8E59FF" strokeWidth="1" fill="none" />
        <rect x="100" y="300" width="400" height="120" rx="8" stroke="#8E59FF" strokeWidth="1" fill="none" />
        <rect x="520" y="80" width="580" height="340" rx="8" stroke="#8E59FF" strokeWidth="1" fill="none" />
        <line x1="540" y1="150" x2="1080" y2="150" stroke="#8E59FF" strokeWidth="0.5" />
        <line x1="540" y1="220" x2="1080" y2="220" stroke="#8E59FF" strokeWidth="0.5" />
        <line x1="540" y1="290" x2="1080" y2="290" stroke="#8E59FF" strokeWidth="0.5" />
        <rect x="100" y="450" width="1000" height="280" rx="8" stroke="#8E59FF" strokeWidth="1" fill="none" />
        <circle cx="200" cy="560" r="60" stroke="#8E59FF" strokeWidth="0.5" fill="none" />
      </svg>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto', width: '100%' }}>
        <div style={{ marginBottom: 48 }}>
          <motion.div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6, ease: 'easeOut' }}>
            <img src="/img/product-logos/white/mark8-iq.svg" alt="mark8 IQ" style={{ height: 20 }} />
            <span className="m8-p5" style={{ color: '#8E59FF' }}>mark8 IQ</span>
          </motion.div>
          <motion.p className="m8-p5" style={{ color: '#8E59FF', marginBottom: 12 }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6, ease: 'easeOut', delay: 0.05 }}>
            Tech-Powered Scale
          </motion.p>
          <motion.h2 className="m8-h2" style={{ color: '#FFFFFF', marginBottom: 12 }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}>
            Mark8IQ: Our Unfair Advantage
          </motion.h2>
          <motion.p className="m8-p4" style={{ color: 'rgba(255,255,255,0.6)' }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}>
            Purpose-built AI platform for marketplace advertising — not spreadsheets, not guesswork
          </motion.p>
        </div>

        {/* Hero + list layout */}
        <div className="deck-two-col" style={{ display: 'flex', gap: 32 }}>
          {/* Hero card — Unified Dashboard */}
          <motion.div
            style={{ flex: '0 0 55%', maxWidth: '55%', background: 'rgba(142,89,255,0.07)', border: '1px solid rgba(142,89,255,0.2)', borderRadius: 16, padding: 32 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
          >
            {/* Mini dashboard wireframe */}
            <div style={{ marginBottom: 24 }}>
              <svg width="100%" height="140" viewBox="0 0 400 140" fill="none" preserveAspectRatio="xMidYMid meet">
                <rect x="0" y="0" width="120" height="60" rx="6" stroke="#8E59FF" strokeWidth="0.8" fill="rgba(142,89,255,0.05)" />
                <rect x="140" y="0" width="120" height="60" rx="6" stroke="#8E59FF" strokeWidth="0.8" fill="rgba(142,89,255,0.05)" />
                <rect x="280" y="0" width="120" height="60" rx="6" stroke="#8E59FF" strokeWidth="0.8" fill="rgba(142,89,255,0.05)" />
                <rect x="0" y="80" width="260" height="60" rx="6" stroke="#8E59FF" strokeWidth="0.8" fill="rgba(142,89,255,0.05)" />
                <rect x="280" y="80" width="120" height="60" rx="6" stroke="#8E59FF" strokeWidth="0.8" fill="rgba(142,89,255,0.05)" />
              </svg>
            </div>

            <span className="m8-p6" style={{ color: '#8E59FF', display: 'block', marginBottom: 8 }}>Core Feature</span>
            <p className="m8-h4" style={{ color: '#FFFFFF', marginBottom: 12 }}>{features[0].name}</p>
            <p className="m8-p5" style={{ color: 'rgba(255,255,255,0.75)' }}>{features[0].desc}</p>
          </motion.div>

          {/* Five remaining features as stacked list */}
          <div style={{ flex: '0 0 45%', maxWidth: '45%', display: 'flex', flexDirection: 'column', gap: 0 }}>
            {features.slice(1).map((feature, i) => (
              <motion.div
                key={i}
                style={{ display: 'flex', alignItems: 'flex-start', gap: 16, padding: '16px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 + i * 0.08 }}
              >
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#8E59FF', marginTop: 8, flexShrink: 0 }} />
                <div>
                  <p className="m8-p3-medium" style={{ color: '#FFFFFF', marginBottom: 4 }}>{feature.name}</p>
                  <p className="m8-p6" style={{ color: 'rgba(255,255,255,0.65)' }}>{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
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
        @media (max-width: 991px) {
          .deck-two-col { flex-direction: column !important; }
          .deck-two-col > div { flex: 0 0 100% !important; max-width: 100% !important; }
        }
      `}</style>
    </section>
  );
}
