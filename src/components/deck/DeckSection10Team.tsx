import { motion } from 'motion/react';

const people = [
  {
    name: 'Abhijeet Tiwari', role: 'CEO & Co-Founder', isFounder: true,
    creds: ['Ex-Amazon GTS', 'Amazon Ads Advanced & Verified Partner', 'BTech SIT Lonavla', '9+ years in marketplace advertising'],
    note: null,
  },
  {
    name: 'Ankit Bera', role: 'Strategy & Ops Advisor', isFounder: false,
    creds: ['IIM Bangalore MBA', 'Senior Manager at Amazon (Global Trade, Ads, Prime Video)', 'Co-founder Tradio (IndiNest)', "Author: 'E-commerce Exports from India'"],
    note: 'Deep Amazon ecosystem expertise and operational scaling frameworks — critical for managing large seller programs.',
  },
  {
    name: 'Abhishek Tiwari', role: 'CTO & Co-Founder', isFounder: true,
    creds: ['BTech CSE', 'Exec MBA — IMT Ghaziabad', 'MIT Data Science & ML', 'PMI-ACP', 'Built ERP for Pharma industry'],
    note: null,
  },
  {
    name: 'Dennis Wilfred', role: 'HR & Talent Advisor', isFounder: false,
    creds: ['Stanford Executive Leadership Program', 'Director Talent Acquisition — Guidewire Software', 'Built teams at Equinix, PayPal, Yahoo!, Intuit, Fidelity'],
    note: 'Ensures we hire, train, and retain the right team to scale rapidly through our campus recruitment pipeline.',
  },
];

export default function DeckSection10Team() {
  return (
    <section style={{ background: '#FFFFFF', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '80px 40px', position: 'relative', overflow: 'hidden' }}>
      {/* Slide number watermark */}
      <div className="deck-slide-number" style={{ color: 'rgba(8,13,25,0.03)' }}>10</div>

      <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <motion.p className="m8-p5" style={{ color: '#8E59FF', marginBottom: 12 }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6, ease: 'easeOut' }}>
            Our People
          </motion.p>
          <motion.h2 className="m8-h2" style={{ color: '#080D19' }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}>
            Leadership & Strategic Advisors
          </motion.h2>
        </div>

        <div style={{ display: 'flex', gap: 20 }}>
          {people.map((person, i) => (
            <motion.div
              key={i}
              style={{
                flex: person.isFounder ? 1.3 : 1,
                background: person.isFounder ? '#080D19' : '#FFFFFF',
                border: person.isFounder ? '1px solid rgba(142,89,255,0.15)' : '1px solid #EDF0F7',
                borderRadius: 12,
                padding: 24,
                position: 'relative',
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: i * 0.1 }}
            >
              {person.isFounder && (
                <div style={{ position: 'absolute', top: 12, right: 12, padding: '2px 10px', borderRadius: 20, background: 'rgba(142,89,255,0.2)' }}>
                  <span className="m8-p6" style={{ color: '#8E59FF' }}>Founder</span>
                </div>
              )}
              <p className="m8-p3-medium" style={{ color: person.isFounder ? '#FFFFFF' : '#080D19', marginBottom: 4 }}>{person.name}</p>
              <p className="m8-p6" style={{ color: '#8E59FF', marginBottom: 16 }}>{person.role}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {person.creds.map((c, j) => (
                  <div key={j} style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                    <span className="m8-p6" style={{ color: 'rgba(142,89,255,0.5)', minWidth: 16 }}>{String(j + 1).padStart(2, '0')}</span>
                    <p className="m8-p6" style={{ color: person.isFounder ? 'rgba(255,255,255,0.5)' : '#12182B' }}>{c}</p>
                  </div>
                ))}
              </div>
              {person.note && (
                <div style={{ marginTop: 16, padding: '12px 16px', background: '#F5F0FF', borderRadius: 8 }}>
                  <p className="m8-p6" style={{ color: '#12182B' }}>{person.note}</p>
                </div>
              )}
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
      `}</style>
    </section>
  );
}
