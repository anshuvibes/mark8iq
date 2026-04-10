import { motion } from 'motion/react';

const roles = [
  { title: 'Outreach & Onboarding Team', desc: 'Tele-calling, seller education, activation' },
  { title: 'Ads Execution Pod', desc: 'Campaign setup, optimization, bid management' },
  { title: 'Account Managers (KAMs)', desc: 'Cohort-based seller management' },
  { title: 'Data & Reporting Analysts', desc: 'Performance dashboards, weekly seller reports' },
  { title: 'Program Lead (SPOC)', desc: 'Escalation, KPI tracking, partner coordination' },
];

const stats = [
  { value: '80%', label: 'Reduction in manual analysis time via AI dashboards' },
  { value: '8,000+', label: 'SKUs managed simultaneously — proven at Asian Shoes scale' },
  { value: '56', label: 'Team members in Andheri, Mumbai. Near-zero attrition.' },
  { value: '80%', label: 'Reduction in support queries via seller self-service portal' },
];

export default function DeckSection06Operations() {
  return (
    <section style={{ background: '#FFFFFF', minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '80px 40px', position: 'relative', overflow: 'hidden' }}>
      {/* Slide number watermark */}
      <div className="deck-slide-number" style={{ color: 'rgba(8,13,25,0.03)' }}>06</div>

      <div className="deck-two-col" style={{ display: 'flex', gap: 64, maxWidth: 1200, margin: '0 auto', width: '100%' }}>
        {/* Left */}
        <div style={{ flex: '0 0 45%', maxWidth: '45%' }}>
          <motion.p className="m8-p5" style={{ color: '#8E59FF', marginBottom: 12 }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6, ease: 'easeOut' }}>
            Operational Model
          </motion.p>
          <motion.h2 className="m8-h2" style={{ color: '#080D19', marginBottom: 12 }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}>
            Built to Scale Seller Programs
          </motion.h2>

          {roles.map((role, i) => (
            <motion.div
              key={i}
              style={{ borderLeft: '2px solid #8E59FF', paddingLeft: 16, marginBottom: 20 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 + i * 0.1 }}
            >
              <p className="m8-p3-medium" style={{ color: '#080D19' }}>{role.title}</p>
              <p className="m8-p6" style={{ color: '#12182B' }}>{role.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Right — typographic stats */}
        <div style={{ flex: '0 0 55%', maxWidth: '55%', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 40, alignContent: 'center' }}>
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              style={{ padding: 8 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: i * 0.1 }}
            >
              <p className="m8-h1-large" style={{ color: '#8E59FF', marginBottom: 8 }}>{stat.value}</p>
              <p className="m8-p6" style={{ color: '#12182B' }}>{stat.label}</p>
            </motion.div>
          ))}
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
