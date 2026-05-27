import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useV2Theme } from './ThemeContext';

const metrics = [
  { numeric: 100, suffix: 'Cr+', label: 'GMV Managed', format: (n: number) => `${Math.round(n)}` },
  { numeric: 50, suffix: 'Cr+', label: 'Ad Spend Optimised', format: (n: number) => `${Math.round(n)}` },
  { numeric: 42, suffix: '%', label: 'SOV Improvement', format: (n: number) => `${Math.round(n)}` },
  { numeric: 30, suffix: '%', label: 'ACOS Reduction', format: (n: number) => `${Math.round(n)}` },
  { numeric: 40, suffix: '+', label: 'Hours Saved Monthly', format: (n: number) => `${Math.round(n)}` },
];

const LOGOS = [
  { name: 'Asian Shoes', src: '/img/logos/asian-shoes.svg' },
  { name: 'Urban Gabru', src: '/img/logos/urban-gabru.svg' },
  { name: 'Zeel', src: '/img/logos/zeel-rainwear.svg' },
  { name: 'Fast&Up', src: '/img/logos/fast-and-up.svg' },
  { name: 'Rovars', src: '/img/logos/rovers.svg' },
  { name: 'Artment', src: '/img/logos/artment.svg' },
  { name: 'Neude', src: '/img/logos/neude-skin.svg' },
  { name: 'MARS', src: '/img/logos/mars-cosmetics.svg' },
  { name: 'XYXX', src: '/img/logos/xyxx.svg' },
  { name: 'Nat Habit', src: '/img/logos/nat-habit.svg' },
  { name: 'Urban Yog', src: '/img/logos/urban-yog.svg' },
  { name: 'Seoulskin', src: '/img/logos/seoulskin.svg' },
  { name: 'Trimfinity', src: '/img/logos/trimfinity.svg' },
  { name: 'MakeMeeBold', label: 'MakeMeeBold' },
];

type LogoItem = { name: string; src?: string; label?: string };



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
            India's fastest-growing brands{' '}
            <span className="proof-headline-break" />
            run on Mark8 IQ.
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

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(7, 1fr)',
              gap: '12px',
            }}
            data-logo-grid
          >
            {(LOGOS as LogoItem[]).map((logo, i) => (
              <motion.div
                key={logo.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: 0.03 * i, duration: 0.5 }}
                whileHover={{ y: -4 }}
                className="proof-logo-card"
              >
                {logo.src ? (
                  <img
                    src={logo.src}
                    alt={logo.name}
                    loading="lazy"
                    className="proof-logo-img"
                  />
                ) : (
                  <span style={{ fontFamily: 'Georgia, serif', fontSize: '18px', color: '#0f172a', letterSpacing: '-0.01em' }}>
                    {logo.label}
                  </span>
                )}
              </motion.div>
            ))}

          </div>
        </div>
      </div>

      <style>{`
        .proof-logo-card {
          background: #ffffff;
          border-radius: 8px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 16px;
          box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);
          border: 1px solid transparent;
          transition: box-shadow 0.35s ease, border-color 0.35s ease, background 0.35s ease;
          cursor: pointer;
          overflow: hidden;
        }
        .proof-logo-card:hover {
          box-shadow: 0 12px 28px -12px rgba(15, 23, 42, 0.18);
          border-color: rgba(15, 23, 42, 0.08);
          background: #fbfcfe;
        }
        .proof-logo-img {
          max-width: 100%;
          max-height: 32px;
          object-fit: contain;
          transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), filter 0.35s ease;
          filter: grayscale(15%);
        }
        .proof-logo-card:hover .proof-logo-img {
          transform: scale(1.06);
          filter: grayscale(0%);
        }
        .proof-headline-break {
          display: block;
        }
        @media (max-width: 1024px) {
          section[data-section="proof"] [data-logo-grid] {
            grid-template-columns: repeat(4, 1fr) !important;
          }
        }
        @media (max-width: 600px) {
          section[data-section="proof"] [data-logo-grid] {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>

    </section>
  );
}
