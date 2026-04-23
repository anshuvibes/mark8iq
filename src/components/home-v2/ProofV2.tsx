import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import BrandCard from './BrandCard';
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
    category: 'Footwear · 12K SKUs · 400+ Campaigns',
    challenge: 'Massive spend leakage across 400+ campaigns with no daily root cause visibility.',
    result: '₹90L spend → ₹28L spend, same ₹6.5Cr sales. Scaled to ₹50L spend, sales ₹9.5Cr. BSR: 10 → 180+ products.',
    accent: '#52bfbc',
  },
  {
    name: 'Zeel Rainwear',
    category: 'D2C Rainwear · Seasonal',
    challenge: 'Only 3–4 active months/yr. Must enter Amazon\'s ad algo in days — one wrong week means the season is lost.',
    result: '₹30L (2021) → ₹15Cr (2025). 50x in 5 seasons.',
    accent: '#8e59ff',
  },
  {
    name: 'MARS Cosmetics',
    category: 'Beauty · Launched from Zero',
    challenge: 'Started Amazon from ₹0 in 2021. No brand presence. Needed competitor data to build strategy from scratch.',
    result: '₹0 → ₹4.8 Cr/month in 4 years.',
    accent: '#fc7459',
  },
  {
    name: 'Nat Habit',
    category: 'Personal Care · 60+ Sub-categories',
    challenge: '60+ sub-categories made daily analysis, insight extraction, and action near-impossible.',
    result: 'TACOS 29.7% → 21.7%. Gross Sales +39%.',
    accent: '#7cbc71',
  },
  {
    name: 'XYXX',
    category: 'Apparel · 10,000+ SKUs',
    challenge: '10,000+ SKUs and too many campaigns — no structured grouping, insights were slow and inaccurate.',
    result: 'Ad Sales +45%, ROAS 3.34 → 4.16.',
    accent: '#8e59ff',
  },
  {
    name: 'Fast & Up',
    category: 'Sports Nutrition',
    challenge: 'Amazon Pi, SQPA, SFR data never leveraged. No competitive benchmarking.',
    result: '₹1.5 Cr/mo → ₹2.54 Cr/mo.',
    accent: '#52bfbc',
  },
  {
    name: 'ARTMENT',
    category: 'Home & Decor · Importer',
    challenge: 'Ads running on products about to go out of stock — driving TACOS up and wasting budget.',
    result: '₹1.1 Cr → ₹2.07 Cr/mo. GV Rank: Top 5 → #1.',
    accent: '#fc7459',
  },
  {
    name: 'neude Skin',
    category: 'Skincare · Fast-Growing',
    challenge: 'Delivery delays killing scale. No keyword rank visibility on peak hours.',
    result: 'Sales ₹8.2L → ₹25L. BSR #170 → #53.',
    accent: '#7cbc71',
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{ marginBottom: '72px' }}
        >
          <BrandCard {...BRANDS[0]} size="hero" />
        </motion.div>
      </div>

      <BrandMarqueeStrip brands={BRANDS.slice(1)} />

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
