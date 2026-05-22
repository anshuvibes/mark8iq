import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import BrandCard from './BrandCard';
import { useV2Theme } from './ThemeContext';

const metrics = [
  { numeric: 1000, suffix: ' Cr+', label: 'GMV Managed', format: (n: number) => `${Math.round(n).toLocaleString('en-IN')}` },
  { numeric: 105, suffix: ' Cr+', label: 'Ad Spend Optimized', format: (n: number) => `${Math.round(n)}` },
  { numeric: 35, suffix: '%', label: 'Avg ROAS Gain', format: (n: number) => `${Math.round(n)}` },
  { numeric: 90, suffix: '%', label: 'Client Retention', format: (n: number) => `${Math.round(n)}` },
  { numeric: 15, suffix: '+', label: 'Marketplaces', format: (n: number) => `${Math.round(n)}` },
];

const BRANDS = [
  {
    name: 'Zeel Rainwear',
    logo: '/img/logos/zeel-rainwear.svg',
    stat: '50x',
    statLabel: 'revenue growth in 5 years',
    category: 'D2C Rainwear',
    primaryColor: '#0202e5',
  },
  {
    name: 'Asian Shoes',
    logo: '/img/logos/asian-shoes.svg',
    stat: '68%',
    statLabel: 'less ad spend. Same sales.',
    category: 'Footwear',
    primaryColor: '#52bfbc',
  },
  {
    name: 'neude Skin',
    logo: '/img/logos/neude-skin.svg',
    stat: '3x',
    statLabel: 'sales growth, now in top 60 on Amazon',
    category: 'Skincare',
    primaryColor: '#d9ae9d',
  },
  {
    name: 'MARS Cosmetics',
    logo: '/img/logos/mars-cosmetics.svg',
    stat: '₹4.8 Cr',
    statLabel: 'monthly sales, built from scratch',
    category: 'Beauty',
    primaryColor: '#fc7459',
  },
];

function useCountUp(target: number, duration: number = 1200, decimals: number = 0) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);
  const frameRef = useRef<number | null>(null);

  const start = useCallback(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(parseFloat((eased * target).toFixed(decimals)));

      if (progress < 1) frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);
  }, [target, duration, decimals]);

  useEffect(() => () => {
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
  }, []);

  return { count, start };
}

function MetricItem({ metric, index }: {
  metric: typeof metrics[0];
  index: number;
}) {
  const { count, start } = useCountUp(metric.numeric, 1400);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      onViewportEnter={start}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ delay: index * 0.1 }}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '24px',
        flex: '1 1 0',
        justifyContent: 'center',
        minWidth: '0',
      }}
    >
      <div style={{ textAlign: 'center', width: '100%' }}>
        <div style={{ fontFamily: "'Saira', sans-serif", fontSize: '36px', fontWeight: 400, lineHeight: 1.1, letterSpacing: '-0.03em', color: 'var(--v2-text)', textAlign: 'center' }}>{metric.format(count)}{metric.suffix}</div>
        <div className="m8-p6" style={{ color: 'var(--v2-text-muted)', textAlign: 'center' }}>{metric.label}</div>
      </div>
    </motion.div>
  );
}

export default function ProofV2() {
  const { setTheme } = useV2Theme();
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    if (!section) return;

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 80%',
      end: 'bottom 20%',
      onEnter: () => setTheme('light'),
      onEnterBack: () => setTheme('light'),
      onUpdate: (self) => { if (self.isActive) setTheme('light'); },
    });
    return () => { trigger.kill(); };
  }, [setTheme]);

  return (
    <section ref={sectionRef} data-section="proof" style={{ position: 'relative' }}>
      <div style={{ padding: '120px 0 80px' }}>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.p
            className="m8-eyebrow"
            style={{ color: 'var(--v2-text-secondary)', textAlign: 'center', marginBottom: '12px' }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
          >
            CLIENT RESULTS
          </motion.p>
          <motion.h2
            className="m8-h1-large"
            style={{ color: 'var(--v2-text)', textAlign: 'center', marginBottom: '42px' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ delay: 0.05 }}
          >
            India's fastest-growing brands run on Mark8 IQ.
          </motion.h2>

          <div style={{
            display: 'flex',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            marginBottom: '48px',
            flexWrap: 'wrap',
            gap: '0',
          }}>
            {metrics.map((m, i) => (
              <MetricItem key={m.label} metric={m} index={i} />
            ))}
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '20px',
          }}>
            {BRANDS.map((brand) => (
              <div key={brand.name}>
                <BrandCard {...brand} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          section[data-section="proof"] .container > div:last-child {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 600px) {
          section[data-section="proof"] .container > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
