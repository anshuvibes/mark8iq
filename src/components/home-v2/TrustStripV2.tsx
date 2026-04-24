import { motion } from 'motion/react';

const logos = [
  { name: 'Asian Shoes', src: '/img/logos/asian-shoes.png' },
  { name: 'Beast Life', src: '/img/logos/beast-life.png' },
  { name: 'Urban Gabru', src: '/img/logos/urban-gabru.png' },
  { name: 'Zeel Rainwear', src: '/img/logos/zeel-rainwear.png' },
  { name: 'Fast & Up', src: '/img/logos/fast-and-up.png' },
  { name: 'Rovers', src: '/img/logos/rovers.png' },
  { name: 'Quench', src: '/img/logos/quench.png' },
  { name: 'ARTMENT', src: '/img/logos/artment.png' },
  { name: 'neude Skin', src: '/img/logos/neude-skin.png' },
  { name: 'MARS Cosmetics', src: '/img/logos/mars-cosmetics.png' },
  { name: 'XYXX', src: '/img/logos/xyxx.png' },
];

export default function TrustStripV2() {
  return (
    <section style={{ paddingTop: '20px', paddingBottom: '60px', position: 'relative', overflow: 'hidden' }}>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.p
          className="m8-p6"
          style={{
            textAlign: 'center',
            color: 'var(--v2-text-muted)',
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

      <div style={{ overflow: 'hidden', width: '100%' }}>
        <div className="trust-marquee-track">
          {[...logos, ...logos].map((logo, i) => (
            <div key={i} style={{ padding: '6px 28px', flexShrink: 0 }}>
              <img
                src={logo.src}
                alt={logo.name}
                style={{ height: '32px', width: 'auto' }}
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
