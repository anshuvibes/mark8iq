import { motion } from 'motion/react';

const contacts = [
  { name: 'Abhijeet Tiwari (CEO)', email: 'abhijeet@infytrix.com' },
  { name: 'Abhishek Tiwari (CTO)', email: 'abhishek@infytrix.com' },
];

export default function DeckSection11Close() {
  return (
    <section style={{ background: '#8E59FF', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', position: 'relative', overflow: 'hidden', padding: '80px 40px' }}>
      {/* Violet orb */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.15), transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <motion.h2 className="m8-h1-large" style={{ color: '#FFFFFF', marginBottom: 8 }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6, ease: 'easeOut' }}>
          The Right Tech.
        </motion.h2>
        <motion.h2 className="m8-h1-large" style={{ color: '#FFFFFF', marginBottom: 8 }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}>
          The Right Team.
        </motion.h2>
        <motion.h2 className="m8-h1-large" style={{ color: '#FFFFFF', marginBottom: 32 }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}>
          The Right Partner.
        </motion.h2>

        <motion.p className="m8-p4" style={{ color: 'rgba(255,255,255,0.8)', marginBottom: 56 }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}>
          AI-powered platform &nbsp;·&nbsp; 56-member team &nbsp;·&nbsp; Proven at scale &nbsp;·&nbsp; Ready now
        </motion.p>

        <motion.div
          style={{ display: 'flex', gap: 40, justifyContent: 'center', marginBottom: 80 }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
        >
          {contacts.map((c, i) => (
            <div key={i}>
              <p className="m8-p3-medium" style={{ color: '#FFFFFF' }}>{c.name}</p>
              <p className="m8-p5" style={{ color: 'rgba(255,255,255,0.7)' }}>{c.email}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom confidentiality */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '12px 40px', borderTop: '1px solid rgba(255,255,255,0.15)', textAlign: 'center' }}>
        <span className="m8-p6" style={{ color: 'rgba(255,255,255,0.5)' }}>
          Infytrix Ecom Pvt Ltd &nbsp;|&nbsp; Confidential
        </span>
      </div>
    </section>
  );
}
