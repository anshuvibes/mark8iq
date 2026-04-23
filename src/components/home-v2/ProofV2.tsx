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
    name: 'Asian Shoes',
    logo: '/img/logos/logo_1.png',
    stat: '68%',
    statLabel: 'reduction in ad spend, same revenue',
    category: 'Footwear',
    primaryColor: '#52bfbc',
  },
  {
    name: 'Zeel Rainwear',
    logo: '/img/logos/logo_4.png',
    stat: '50x',
    statLabel: 'revenue growth in 5 seasons',
    category: 'D2C Rainwear',
    primaryColor: '#0202e5',
  },
  {
    name: 'MARS Cosmetics',
    logo: '/img/logos/19eba7c1-31f9-4c46-8391-1b5a2852c4c7.png',
    stat: '₹4.8 Cr',
    statLabel: 'monthly revenue from zero in 4 years',
    category: 'Beauty',
    primaryColor: '#fc7459',
  },
  {
    name: 'Nat Habit',
    stat: '−8%',
    statLabel: 'TACOS reduction, gross sales +39%',
    category: 'Personal Care',
    primaryColor: '#c3502b',
  },
  {
    name: 'XYXX',
    logo: '/img/logos/logo_11.png',
    stat: '+45%',
    statLabel: 'ad sales growth, ROAS 3.34 → 4.16',
    category: 'Apparel',
    primaryColor: '#004c9d',
  },
  {
    name: 'Fast & Up',
    logo: '/img/logos/logo_5.png',
    stat: '₹2.54 Cr',
    statLabel: 'monthly revenue, up from ₹1.5 Cr',
    category: 'Sports Nutrition',
    primaryColor: '#015cbb',
  },
  {
    name: 'ARTMENT',
    logo: '/img/logos/logo_8.png',
    stat: '#1',
    statLabel: 'GV rank, revenue nearly doubled',
    category: 'Home & Decor',
    primaryColor: '#662d26',
  },
  {
    name: 'neude Skin',
    logo: '/img/logos/logo_9.png',
    stat: '3x',
    statLabel: 'sales growth, BSR #170 → #53',
    category: 'Skincare',
    primaryColor: '#d9ae9d',
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
  const stickyRef = useRef<HTMLDivElement | null>(null);
  const carouselWrapperRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setTheme('light');
      },
      { threshold: 0, rootMargin: '0px 0px -20% 0px' }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [setTheme]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const track = trackRef.current;
    const wrapper = carouselWrapperRef.current;
    if (!section || !track || !wrapper) return;

    const getSiteInset = () => Math.max(24, (window.innerWidth - 1200) / 2);
    const getTravel = () => {
      const lastCard = track.lastElementChild as HTMLElement | null;
      if (!lastCard) return Math.max(0, track.scrollWidth - wrapper.clientWidth);

      const lastCardRight = lastCard.offsetLeft + lastCard.offsetWidth;
      return Math.max(0, lastCardRight - (wrapper.clientWidth - getSiteInset()));
    };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${Math.max(window.innerHeight * 1.8, getTravel() * 1.1)}`,
        scrub: 1.2,
        pin: stickyRef.current,
        pinSpacing: true,
        invalidateOnRefresh: true,
      },
    });

    tl.to(track, {
      x: () => -getTravel(),
      ease: 'none',
    });

    scrollTriggerRef.current = tl.scrollTrigger ?? null;

    return () => {
      scrollTriggerRef.current = null;
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  useEffect(() => {
    const wrapper = carouselWrapperRef.current;
    if (!wrapper) return;

    const handleHorizontalWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return;

      const trigger = scrollTriggerRef.current;
      if (!trigger) return;

      const currentScroll = window.scrollY;
      if (currentScroll < trigger.start || currentScroll > trigger.end) return;

      event.preventDefault();
      const nextScroll = Math.max(trigger.start, Math.min(trigger.end, currentScroll + event.deltaX));
      window.scrollTo({ top: nextScroll, behavior: 'auto' });
    };

    wrapper.addEventListener('wheel', handleHorizontalWheel, { passive: false });
    return () => wrapper.removeEventListener('wheel', handleHorizontalWheel);
  }, []);

  return (
    <section ref={sectionRef} style={{ position: 'relative' }}>
      <div ref={stickyRef} style={{ minHeight: '100vh', padding: '72px 0 0', overflow: 'hidden' }}>
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
          style={{ color: 'var(--v2-text)', textAlign: 'center', marginBottom: '42px' }}
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
          marginBottom: '36px',
          flexWrap: 'wrap',
          gap: '0',
        }}>
          {metrics.map((m, i) => (
            <MetricItem key={m.label} metric={m} index={i} />
          ))}
        </div>

      </div>

      <div style={{ marginTop: '20px' }}>
        <div
          ref={carouselWrapperRef}
          style={{
            overflow: 'hidden',
            width: '100vw',
            marginLeft: 'calc(50% - 50vw)',
            marginRight: 'calc(50% - 50vw)',
          }}
        >
          <div ref={trackRef} style={{
            display: 'flex',
            gap: '20px',
            paddingLeft: 'max(24px, calc((100vw - 1200px) / 2))',
            paddingRight: 'max(24px, calc((100vw - 1200px) / 2))',
            willChange: 'transform',
          }}>
            {BRANDS.map((brand) => (
              <div
                key={brand.name}
                style={{
                  flex: '0 0 390px',
                  minWidth: 0,
                }}
              >
                <BrandCard {...brand} />
              </div>
            ))}
          </div>
        </div>

      </div>
      </div>

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
