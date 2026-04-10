import { motion } from 'motion/react';

const phases = [
  {
    number: '01',
    name: 'Acquire & Onboard',
    timeline: 'Week 1–2',
    bullets: [
      'Dedicated outreach team contacts every seller',
      'Personalized pitch: demonstrate ads ROI potential',
      'Onboarding workshop: ads setup, account audit, goal-setting',
      'Segment sellers by category, GMV, & readiness',
    ],
  },
  {
    number: '02',
    name: 'Activate & Optimize',
    timeline: 'Month 1–3',
    bullets: [
      'Launch campaigns with structured ad strategies',
      'Weekly performance reviews & bid optimization',
      'Data-driven SKU selection for maximum ROAS',
      'Real-time dashboards so sellers see their own growth',
    ],
  },
  {
    number: '03',
    name: 'Retain & Scale',
    timeline: 'Month 3+',
    bullets: [
      'Demonstrate clear ROI to drive continued investment',
      'Transition sellers to self-funded ads with proven playbook',
      'Ongoing support tiers to maximize retention',
      'Success stories & peer proof drive organic adoption',
    ],
  },
];

export default function DeckSection05Approach() {
  return (
    <section style={{ background: '#080D19', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', overflow: 'hidden', padding: '80px 40px' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/img/bg-pattern.svg)', backgroundRepeat: 'repeat', opacity: 0.04, pointerEvents: 'none', zIndex: 0 }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto', width: '100%' }}>
        <motion.p className="m8-p5" style={{ color: '#8E59FF', marginBottom: 12 }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6, ease: 'easeOut' }}>
          Our Approach
        </motion.p>
        <motion.h2 className="m8-h2" style={{ color: '#FFFFFF', marginBottom: 56 }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}>
          3-Phase Seller Activation Engine
        </motion.h2>

        <div className="deck-three-col" style={{ display: 'flex', gap: 0 }}>
          {phases.map((phase, i) => (
            <motion.div
              key={i}
              style={{
                flex: 1,
                padding: '0 32px',
                position: 'relative',
                borderRight: i < phases.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none',
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: i * 0.15 }}
            >
              {/* Watermark number */}
              <div style={{ position: 'absolute', top: -20, right: 16, color: 'rgba(142,89,255,0.06)', fontSize: 120, lineHeight: 1, pointerEvents: 'none' }}>
                {phase.number}
              </div>

              <div style={{ display: 'inline-block', padding: '4px 12px', borderRadius: 20, border: '1px solid rgba(142,89,255,0.3)', marginBottom: 16 }}>
                <span className="m8-p6" style={{ color: '#8E59FF' }}>{phase.timeline}</span>
              </div>

              <p className="m8-h4" style={{ color: '#FFFFFF', marginBottom: 20 }}>{phase.name}</p>

              {phase.bullets.map((b, j) => (
                <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 12 }}>
                  <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#8E59FF', marginTop: 8, flexShrink: 0 }} />
                  <p className="m8-p6" style={{ color: 'rgba(255,255,255,0.75)' }}>{b}</p>
                </div>
              ))}
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 991px) {
          .deck-three-col { flex-direction: column !important; }
          .deck-three-col > div { flex: 0 0 100% !important; border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 32px !important; margin-bottom: 32px !important; }
        }
      `}</style>
    </section>
  );
}
