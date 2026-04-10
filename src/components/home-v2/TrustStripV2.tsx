import { motion } from 'motion/react';

const logos = Array.from({ length: 11 }, (_, i) => ({
  name: `Partner ${i + 1}`,
  src: `/img/logos/logo_${i + 1}.png`,
}));

export default function TrustStripV2() {
  return (
    <section style={{ paddingTop: '40px', paddingBottom: '60px', position: 'relative', overflow: 'hidden' }}>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.p
          className="m8-p6"
          style={{
            textAlign: 'center',
            color: 'rgba(8,13,25,0.4)',
            marginBottom: '24px',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
        >
          Trusted by India's fastest growing brands
        </motion.p>
      </div>

      {/* Infinite scrolling marquee */}
      <div style={{ overflow: 'hidden', width: '100%' }}>
        <div className="trust-marquee-track">
          {[...logos, ...logos].map((logo, i) => (
            <div key={i} style={{ padding: '6px 28px', flexShrink: 0 }}>
              <img
                src={logo.src}
                alt={logo.name}
                style={{ height: '24px', width: 'auto' }}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .trust-marquee-track {
          display: flex;
          align-items: center;
          width: max-content;
          animation: trustScroll 30s linear infinite;
        }
        @keyframes trustScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
