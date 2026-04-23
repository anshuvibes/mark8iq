import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import BrandMarqueeStrip from './BrandMarqueeStrip';
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
    name: 'Asian Shoes',
    body: 'Massive spend leakage across 400+ campaigns with no daily root cause visibility.',
    stat: '68%',
    statLabel: 'reduction in ad spend, same revenue',
    primaryColor: '#52bfbc',
    secondaryColor: '#52bfbc',
  },
  {
    name: 'Zeel Rainwear',
    body: 'Only 3–4 active months per year. One wrong week means the season is lost.',
    stat: '50x',
    statLabel: 'revenue growth in 5 seasons',
    primaryColor: '#0202e5',
    secondaryColor: '#0202e5',
  },
  {
    name: 'MARS Cosmetics',
    logo: 'https://cdn.brandfetch.io/id6fZTFLGi/w/120/h/31/theme/light/logo.png?c=1bxjibca5cadngmz811n4l5ew0mP2vz2H5p',
    body: 'Started Amazon from ₹0 in 2021. No brand presence. Needed competitor data from scratch.',
    stat: '₹4.8 Cr',
    statLabel: 'monthly revenue from zero in 4 years',
    primaryColor: '#cd0053',
    secondaryColor: '#cd0053',
  },
  {
    name: 'Nat Habit',
    body: '60+ sub-categories made daily analysis, insight extraction, and action near-impossible.',
    stat: '−8%',
    statLabel: 'TACOS reduction, gross sales +39%',
    primaryColor: '#7cbc71',
    secondaryColor: '#7cbc71',
  },
  {
    name: 'XYXX',
    body: '10,000+ SKUs and too many campaigns — no structured grouping, insights were slow and inaccurate.',
    stat: '+45%',
    statLabel: 'ad sales growth, ROAS 3.34 → 4.16',
    primaryColor: '#004c9d',
    secondaryColor: '#004c9d',
    logo: 'https://cdn.brandfetch.io/id3OhjEzZP/w/200/h/58/theme/light/logo.png?c=1bxjibca5cadngmz811n4l5ew0mP2vz2H5p',
  },
  {
    name: 'Fast & Up',
    body: 'Amazon Pi, SQPA, SFR data never leveraged. No competitive benchmarking.',
    stat: '₹2.54 Cr',
    statLabel: 'monthly revenue, up from ₹1.5 Cr',
    primaryColor: '#015cbb',
    secondaryColor: '#015cbb',
  },
  {
    name: 'ARTMENT',
    body: 'Ads running on products about to go out of stock — driving TACOS up and wasting budget.',
    stat: '#1',
    statLabel: 'GV rank, revenue nearly doubled',
    primaryColor: '#662d26',
    secondaryColor: '#662d26',
  },
  {
    name: 'neude Skin',
    logo: 'https://cdn.brandfetch.io/idkBp9UXib/theme/light/logo.svg?c=1bxjibca5cadngmz811n4l5ew0mP2vz2H5p',
    body: 'Delivery delays killing scale. No keyword rank visibility on peak hours.',
    stat: '3x',
    statLabel: 'sales growth, BSR #170 → #53',
    primaryColor: '#d9ae9d',
    secondaryColor: '#d9ae9d',
  },
];

function useCountUp(target: number, duration: number = 1200, decimals: number = 0) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const startTime = performance.now();

          const tick = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(parseFloat((eased * target).toFixed(decimals)));
            if (progress < 1) requestAnimationFrame(tick);
          };

          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration, decimals]);

  return { count, ref };
}

function MetricItem({ metric, index }: {
  metric: typeof metrics[0];
  index: number;
}) {
  const { count, ref } = useCountUp(metric.numeric, 1400);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
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
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setTheme('light');
        else if (entry.boundingClientRect.top > 0) setTheme('dark');
      },
      { threshold: 0, rootMargin: '0px 0px -20% 0px' }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [setTheme]);

  return (
    <section ref={sectionRef} style={{ padding: '100px 0 0', position: 'relative' }}>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.p
          className="m8-eyebrow"
          style={{ color: 'var(--v2-text-secondary)', textAlign: 'center', marginBottom: '12px' }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
        >
          PROOF
        </motion.p>
        <motion.h2
          className="m8-h1-large"
          style={{ color: 'var(--v2-text)', textAlign: 'center', marginBottom: '64px' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ delay: 0.05 }}
        >
          Real brands. Real numbers. Real outcomes.
        </motion.h2>

        <div style={{
          display: 'flex',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          marginBottom: '72px',
          flexWrap: 'wrap',
          gap: '0',
        }}>
          {metrics.map((m, i) => (
            <MetricItem key={m.label} metric={m} index={i} />
          ))}
        </div>

      </div>

      <BrandMarqueeStrip brands={BRANDS} />

      <style>{`
        @media (max-width: 768px) {
          section article[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
