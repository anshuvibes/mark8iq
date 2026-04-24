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
    logo: '/img/logos/asian-shoes.png',
    stat: '68%',
    statLabel: 'less ad spend. Same sales.',
    category: 'Footwear',
    primaryColor: '#52bfbc',
  },
  {
    name: 'Zeel Rainwear',
    logo: '/img/logos/zeel-rainwear.png',
    stat: '50x',
    statLabel: 'revenue growth in 5 years',
    category: 'D2C Rainwear',
    primaryColor: '#0202e5',
  },
  {
    name: 'MARS Cosmetics',
    logo: '/img/logos/mars-cosmetics.png',
    stat: '₹4.8 Cr',
    statLabel: 'monthly sales, built from scratch',
    category: 'Beauty',
    primaryColor: '#fc7459',
  },
  {
    name: 'Nat Habit',
    stat: '+39%',
    statLabel: 'more sales, with lower ad costs',
    category: 'Personal Care',
    primaryColor: '#c3502b',
  },
  {
    name: 'XYXX',
    logo: '/img/logos/xyxx.png',
    stat: '+45%',
    statLabel: 'more revenue from the same ad budget',
    category: 'Apparel',
    primaryColor: '#004c9d',
  },
  {
    name: 'Fast & Up',
    logo: '/img/logos/fast-and-up.png',
    stat: '₹2.54 Cr',
    statLabel: 'monthly sales, up from ₹1.5 Cr',
    category: 'Sports Nutrition',
    primaryColor: '#015cbb',
  },
  {
    name: 'ARTMENT',
    logo: '/img/logos/artment.png',
    stat: '2x',
    statLabel: 'revenue, and ranked #1 in the category',
    category: 'Home & Decor',
    primaryColor: '#662d26',
  },
  {
    name: 'neude Skin',
    logo: '/img/logos/neude-skin.png',
    stat: '3x',
    statLabel: 'sales growth, now in top 60 on Amazon',
    category: 'Skincare',
    primaryColor: '#d9ae9d',
  },
  {
    name: 'Beast Life',
    logo: '/img/logos/beast-life.png',
    stat: '+60%',
    statLabel: 'more customers coming back to buy again',
    category: 'Fitness & Nutrition',
    primaryColor: '#f7941d',
  },
  {
    name: 'Urban Gabru',
    logo: '/img/logos/urban-gabru.png',
    stat: '3.2x',
    statLabel: 'return on every rupee spent on ads',
    category: "Men's Grooming",
    primaryColor: '#f4b800',
  },
  {
    name: 'Rovers',
    logo: '/img/logos/rovers.png',
    stat: '+38%',
    statLabel: 'more visibility without spending more on ads',
    category: 'Footwear',
    primaryColor: '#2d4a3e',
  },
  {
    name: 'Quench',
    logo: '/img/logos/quench.png',
    stat: '2.1x',
    statLabel: 'revenue in 6 months',
    category: 'Beverages',
    primaryColor: '#00a4a6',
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
    const handleHorizontalWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaX) < 2 || Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return;

      const trigger = scrollTriggerRef.current;
      const section = sectionRef.current;
      if (!trigger || !section) return;

      const currentScroll = window.scrollY;
      const isWithinPinnedRange = currentScroll >= trigger.start - 2 && currentScroll <= trigger.end + 2;
      if (!trigger.isActive && !isWithinPinnedRange) return;

      event.preventDefault();
      const nextScroll = Math.max(trigger.start, Math.min(trigger.end, currentScroll + event.deltaX));
      window.scrollTo({ top: nextScroll, behavior: 'auto' });
    };

    document.addEventListener('wheel', handleHorizontalWheel, { passive: false, capture: true });
    return () => document.removeEventListener('wheel', handleHorizontalWheel, { capture: true });
  }, []);

  return (
    <section ref={sectionRef} style={{ position: 'relative' }}>
      <div ref={stickyRef} style={{ minHeight: '100vh', padding: '120px 0 0', overflow: 'hidden' }}>
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
