import { motion } from 'motion/react';
import { useV2Theme } from './ThemeContext';

const logos = [
  { name: 'Urban Gabru', src: '/img/logos/urban-gabru.svg' },
  { name: 'Asian Shoes', src: '/img/logos/asian-shoes.svg' },
  { name: 'Zeel Rainwear', src: '/img/logos/zeel-rainwear.svg' },
  { name: 'ARTMENT', src: '/img/logos/artment.svg' },
  { name: 'Fast & Up', src: '/img/logos/fast-and-up.svg' },
  { name: 'MARS Cosmetics', src: '/img/logos/mars-cosmetics.svg' },
  { name: 'Nat Habit', src: '/img/logos/nat-habit.svg' },
  { name: 'neude Skin', src: '/img/logos/neude-skin.svg' },
  { name: 'Rovers', src: '/img/logos/rovers.svg' },
  { name: 'Seoulskin', src: '/img/logos/seoulskin.svg' },
  { name: 'Trimfinity', src: '/img/logos/trimfinity.svg' },
  { name: 'Urban Yog', src: '/img/logos/urban-yog.svg' },
  { name: 'XYXX', src: '/img/logos/xyxx.svg' },
];

export default function TrustStripV2() {
  const { theme } = useV2Theme();
  const isDark = theme === 'dark';
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
