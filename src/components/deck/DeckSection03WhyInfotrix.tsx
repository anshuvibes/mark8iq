import { motion } from 'motion/react';

const credentials = [
  'Top 5 Amazon Ads Agency in India — Amazon Ads Advanced Partner & Advisor',
  'Amazon Ads Advisory Board Member — one of only 5 in India',
  '100+ Cr Ad Spend Optimized | 1,000+ Cr GMV Managed',
  '56-member team in Andheri, Mumbai — near-zero historical attrition',
  'NVIDIA Inception Program Member — AI/ML in e-commerce intelligence',
  'Exclusive Tech Partner with The Foundery (Kishore Biyani)',
  'Startup India Recognised | NIXI Partner | Great Place to Work Certified',
];

const badges = [
  { abbr: 'AMZ', color: '#FF9900' },
  { abbr: 'NVDA', color: '#76B900' },
  { abbr: 'NIXI', color: '#003DA5' },
  { abbr: 'SI', color: '#FF9933' },
];

export default function DeckSection03WhyInfotrix() {
  return (
    <section style={{ background: '#080D19', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', overflow: 'hidden', padding: '80px 40px' }}>
      {/* Slide number watermark */}
      <div className="deck-slide-number" style={{ color: 'rgba(255,255,255,0.03)' }}>03</div>

      {/* Grid overlay */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/img/bg-pattern.svg)', backgroundRepeat: 'repeat', opacity: 0.04, pointerEvents: 'none', zIndex: 0 }} />

      {/* Giant "5" anchor */}
      <motion.div
        style={{ position: 'absolute', left: 40, top: '50%', transform: 'translateY(-50%)', fontFamily: "'Saira', sans-serif", fontSize: 320, lineHeight: 1, color: 'rgba(142,89,255,0.06)', pointerEvents: 'none', userSelect: 'none', letterSpacing: '-0.03em', zIndex: 0 }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        5
      </motion.div>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto', width: '100%' }}>
        {/* Top block — pushed right */}
        <div style={{ marginLeft: '28%', marginBottom: 56 }}>
          <motion.p className="m8-p5" style={{ color: '#8E59FF', marginBottom: 12 }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6, ease: 'easeOut' }}>
            Why Infytrix
          </motion.p>
          <motion.h2 className="m8-h2" style={{ color: '#FFFFFF', marginBottom: 0 }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}>
            India's Fastest-Growing
          </motion.h2>
          <motion.h2 className="m8-h2" style={{ color: 'rgba(255,255,255,0.35)' }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}>
            Marketplace Ads Partner
          </motion.h2>
        </div>

        {/* Credentials — full-width horizontal bands */}
        <div style={{ marginLeft: '28%' }}>
          {credentials.map((cred, i) => (
            <motion.div
              key={i}
              style={{ display: 'flex', alignItems: 'baseline', gap: 16, padding: '14px 0', borderTop: '1px solid rgba(255,255,255,0.06)' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 + i * 0.08 }}
            >
              <span className="m8-p6" style={{ color: 'rgba(142,89,255,0.5)', minWidth: 24 }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="m8-p5" style={{ color: 'rgba(255,255,255,0.85)' }}>{cred}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Badge cluster */}
      <div style={{ position: 'absolute', bottom: 60, right: 60, display: 'flex', gap: -8, zIndex: 1 }}>
        {badges.map((b, i) => (
          <motion.div
            key={i}
            style={{
              width: 64,
              height: 72,
              borderRadius: 10,
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.08)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: i > 0 ? -8 : 0,
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.5 + i * 0.1 }}
          >
            <span className="m8-p6" style={{ color: b.color }}>{b.abbr}</span>
          </motion.div>
        ))}
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
      `}</style>
    </section>
  );
}
