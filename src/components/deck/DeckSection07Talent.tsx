import { motion } from 'motion/react';

const colleges = [
  { name: 'IIT Kharagpur', desc: 'Premier IIT — top-tier engineering & data science talent' },
  { name: 'DJ Sanghvi College of Engineering', desc: "Mumbai's leading private engineering college" },
  { name: 'K.J. Somaiya College of Engineering', desc: 'Strong CS & IT programs, industry-connected' },
  { name: 'Thadomal Shahani Engineering College', desc: 'Mumbai University — strong placement record' },
  { name: 'Thakur College of Engineering', desc: 'Large graduating batches, consistent pipeline' },
  { name: 'Vidyavardhini College of Engineering', desc: 'Vasai-Virar — cost-effective talent pool' },
];

const talentStats = [
  { value: '20–30 hires', label: 'Ramped per program' },
  { value: '4–6 weeks', label: 'Full team ramp time' },
  { value: '2 weeks', label: 'New hire to productive' },
];

export default function DeckSection07Talent() {
  return (
    <section style={{ background: '#EDF0F7', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '80px 40px', position: 'relative', overflow: 'hidden' }}>
      {/* Slide number watermark */}
      <div className="deck-slide-number" style={{ color: 'rgba(8,13,25,0.03)' }}>07</div>

      <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <motion.p className="m8-p5" style={{ color: '#8E59FF', marginBottom: 12 }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6, ease: 'easeOut' }}>
            Talent Pipeline
          </motion.p>
          <motion.h2 className="m8-h2" style={{ color: '#080D19', marginBottom: 16 }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}>
            Campus Recruitment — Scaling Is in Our DNA
          </motion.h2>
          <motion.p className="m8-p4" style={{ color: '#12182B', maxWidth: 720, margin: '0 auto' }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}>
            Structured campus hiring for 2+ years. A repeatable talent pipeline that lets us scale teams rapidly.
          </motion.p>
        </div>

        {/* Typographic college grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px 48px', marginBottom: 48 }}>
          {colleges.map((college, i) => (
            <motion.div
              key={i}
              style={{ padding: '16px 0', borderBottom: '1px solid rgba(8,13,25,0.08)' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: i * 0.08 }}
            >
              <span className="m8-p6" style={{ color: 'rgba(142,89,255,0.5)', display: 'block', marginBottom: 4 }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="m8-p3-medium" style={{ color: '#080D19', marginBottom: 4 }}>{college.name}</p>
              <p className="m8-p6" style={{ color: '#12182B' }}>{college.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Stat bar */}
        <motion.div
          style={{ background: '#080D19', borderRadius: 16, padding: '32px 48px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
        >
          {talentStats.map((s, i, arr) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ textAlign: 'center', padding: '0 40px' }}>
                <p className="m8-h3-xl" style={{ color: '#8E59FF', marginBottom: 4 }}>{s.value}</p>
                <p className="m8-p6" style={{ color: 'rgba(255,255,255,0.6)' }}>{s.label}</p>
              </div>
              {i < arr.length - 1 && <div style={{ width: 1, height: 40, background: 'rgba(255,255,255,0.1)' }} />}
            </div>
          ))}
        </motion.div>
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
