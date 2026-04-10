import { motion } from 'motion/react';

const features = [
  { name: 'Unified Dashboard', desc: 'All sellers on one screen — real-time ad spend, clicks, ACOS, sales across accounts' },
  { name: 'AI-Driven Optimization', desc: 'Automated bid adjustments, budget pacing, & keyword targeting at scale' },
  { name: 'Proprietary Crawl Data', desc: 'Hourly marketplace intelligence — search rank, competitor pricing, BSR tracking' },
  { name: 'Automated Alerts', desc: 'Budget exhaustion, ACOS spikes, stock-outs — catch issues before they cost money' },
  { name: 'Seller Self-Service', desc: 'Each seller sees their own performance — reduces manual reporting by 80%' },
  { name: 'Bulk Operations', desc: 'Campaign creation, bid changes, budget allocation — across thousands of accounts simultaneously' },
];

export default function DeckSection08Tech() {
  return (
    <section style={{ background: '#080D19', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', overflow: 'hidden', padding: '80px 40px' }}>
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

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {features.map((f, i) => (
            <motion.div
              key={i}
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: 24 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: i * 0.1 }}
            >
              <p className="m8-p3-medium" style={{ color: '#FFFFFF', marginBottom: 8 }}>{f.name}</p>
              <p className="m8-p6" style={{ color: 'rgba(255,255,255,0.65)' }}>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
