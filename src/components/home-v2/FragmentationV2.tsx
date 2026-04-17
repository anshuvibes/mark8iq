import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useV2Theme } from './ThemeContext';


const marketplacePills = [
  { label: 'Amazon',           logo: '/img/home-v2/fragmentation/amazon.png',            size: 80,  blur: 0,   x: -480, y: -220 },
  { label: 'Flipkart',         logo: '/img/home-v2/fragmentation/flipkart.png',          size: 72,  blur: 0,   x:  460, y: -180 },
  { label: 'Myntra',           logo: '/img/home-v2/fragmentation/myntra.png',            size: 52,  blur: 1.5, x: -300, y:   80 },
  { label: 'Meesho',           logo: '/img/home-v2/fragmentation/meesho.png',            size: 60,  blur: 0,   x:  500, y:   60 },
  { label: 'Zepto',            logo: '/img/home-v2/fragmentation/zepto.png',             size: 44,  blur: 2,   x: -160, y:  280 },
  { label: 'Blinkit',          logo: '/img/home-v2/fragmentation/blinkit.png',           size: 68,  blur: 0,   x:  200, y:  260 },
  { label: 'Swiggy Instamart', logo: '/img/home-v2/fragmentation/swiggy-instamart.png',  size: 48,  blur: 1,   x:   60, y: -300 },
];

const departmentTags = [
  { label: 'Ads',             opacity: 0.9,  x: -510, y:  -90 },
  { label: 'Inventory',       opacity: 0.6,  x:  510, y:   70 },
  { label: 'Returns',         opacity: 0.8,  x: -490, y:  170 },
  { label: 'Finance',         opacity: 0.5,  x:  490, y: -150 },
  { label: 'PO Management',   opacity: 0.7,  x: -310, y: -230 },
  { label: 'Market Research', opacity: 0.55, x:  330, y:  230 },
  { label: 'Reconciliation',  opacity: 0.65, x:   10, y: -310 },
];

const personaLabels = [
  { label: 'Analyst',              opacity: 0.9,  x: -610, y:  -70 },
  { label: 'E-Commerce Manager',   opacity: 0.6,  x:  600, y:  -50 },
  { label: 'CXO',                  opacity: 0.8,  x: -580, y:  210 },
  { label: 'CAM',                  opacity: 0.5,  x:  560, y:  190 },
  { label: 'Ops Head',             opacity: 0.7,  x:    0, y: -330 },
];

/* headingBase kept for anchor copy */

const headingBase: React.CSSProperties = {
  position: 'absolute',
  left: '50%',
  top: '50%',
  fontFamily: "'Saira', sans-serif",
  fontSize: '60px',
  fontWeight: 400,
  lineHeight: '110%',
  letterSpacing: '-0.03em',
  textAlign: 'center',
  pointerEvents: 'none',
  zIndex: 10,
  maxWidth: '820px',
  width: '90vw',
  transition: 'color 0.5s ease',
};

export default function FragmentationV2() {
  const { setTheme } = useV2Theme();
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const depthWrapperRef = useRef<HTMLDivElement>(null);

  const mktRefs = useRef<(HTMLDivElement | null)[]>([]);
  const deptRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const personaRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const text3Ref = useRef<HTMLDivElement>(null);
  const pivotRef = useRef<HTMLDivElement>(null);

  const circleRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const subCopyRef = useRef<HTMLDivElement>(null);

  // Store setTheme in a ref so GSAP callbacks can access it without stale closures
  const setThemeRef = useRef(setTheme);
  setThemeRef.current = setTheme;

  // ScrollTrigger-based theme toggle — uses global V2 theme context
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const container = containerRef.current;
    if (!container) return;

    const themeTrigger = ScrollTrigger.create({
      trigger: container,
      start: 'top 80%',
      end: 'bottom bottom',
      onEnter: () => setThemeRef.current('dark'),
      onLeave: () => setThemeRef.current('light'),
      onLeaveBack: () => setThemeRef.current('light'),
      onEnterBack: () => setThemeRef.current('dark'),
    });

    return () => {
      themeTrigger.kill();
      setThemeRef.current('light');
    };
  }, []);

  // GSAP scroll-driven timeline
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    if (!container) return;

    const PERSPECTIVE = 1200;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top 70%',
        end: 'bottom bottom',
        scrub: 1.5,
      },
    });

    // PHASE 1: Marketplace logos emerge from depth (z: -600 → 0)
    mktRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, {
        opacity: 0,
        x: marketplacePills[i].x,
        y: marketplacePills[i].y,
        z: 600,
        xPercent: -50,
        yPercent: -50,
        scale: 2.5,
        transformPerspective: PERSPECTIVE,
      });
      tl.to(el, {
        opacity: 1,
        z: 0,
        scale: 1,
        duration: 6,
        ease: 'power2.out',
      }, 0 + i * 0.8);
    });

    // PHASE 2: Text 1 emerges from depth (large/close → settle)
    gsap.set(text1Ref.current, {
      opacity: 0,
      scale: 2.5,
      z: 600,
      xPercent: -50,
      yPercent: -50,
      transformPerspective: PERSPECTIVE,
    });
    tl.to(text1Ref.current, {
      opacity: 1,
      scale: 1,
      z: 0,
      duration: 5,
      ease: 'power2.out',
    }, 8);

    // PHASE 3: Text 1 blooms out
    tl.to(text1Ref.current, {
      opacity: 0,
      scale: 1.15,
      duration: 5,
      ease: 'power2.in',
    }, 12);

    // PHASE 4: Department tags emerge from deeper Z (-1000 → 0)
    deptRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, {
        opacity: 0,
        x: departmentTags[i].x,
        y: departmentTags[i].y,
        z: 1000,
        xPercent: -50,
        yPercent: -50,
        scale: 3,
        transformPerspective: PERSPECTIVE,
      });
      tl.to(el, {
        opacity: departmentTags[i].opacity,
        z: 0,
        scale: 1,
        duration: 6,
        ease: 'power2.out',
      }, 16 + i * 0.8);
    });

    // No marketplace compress — they stay at their x/y positions

    // PHASE 5: Text 2 blooms in
    gsap.set(text2Ref.current, { opacity: 0, scale: 0.5, xPercent: -50, yPercent: -50 });
    tl.to(text2Ref.current, {
      opacity: 1,
      scale: 1,
      duration: 5,
      ease: 'power2.out',
    }, 22);

    // PHASE 6: Text 2 blooms out
    tl.to(text2Ref.current, {
      opacity: 0,
      scale: 1.15,
      duration: 5,
      ease: 'power2.in',
    }, 26);

    // PHASE 7: Persona labels emerge from deepest Z (-1400 → 0)
    personaRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, {
        opacity: 0,
        x: personaLabels[i].x,
        y: personaLabels[i].y,
        z: 1400,
        xPercent: -50,
        yPercent: -50,
        scale: 4,
        transformPerspective: PERSPECTIVE,
      });
      tl.to(el, {
        opacity: personaLabels[i].opacity,
        z: 0,
        scale: 1,
        duration: 5,
        ease: 'power2.out',
      }, 30 + i * 1.0);
    });

    // PHASE 8: Text 3 blooms in
    gsap.set(text3Ref.current, { opacity: 0, scale: 0.5, xPercent: -50, yPercent: -50 });
    tl.to(text3Ref.current, {
      opacity: 1,
      scale: 1,
      duration: 5,
      ease: 'power2.out',
    }, 36);

    // PHASE 9: Text 3 blooms out
    tl.to(text3Ref.current, {
      opacity: 0,
      scale: 1.15,
      duration: 4,
      ease: 'power2.in',
    }, 40);

    // PHASE 10: "Until now." blooms in
    gsap.set(pivotRef.current, { opacity: 0, scale: 0.5, xPercent: -50, yPercent: -50 });
    tl.to(pivotRef.current, {
      opacity: 1,
      scale: 1,
      duration: 4,
      ease: 'power2.out',
    }, 44);

    // PHASE 11: Everything flies PAST the camera (positive Z = toward viewer)
    tl.to(pivotRef.current, {
      opacity: 0,
      scale: 0.8,
      duration: 3,
      ease: 'power2.in',
    }, 48);

    mktRefs.current.forEach((el) => {
      if (!el) return;
      tl.to(el, {
        z: -800,
        scale: 0.1,
        opacity: 0,
        duration: 4,
        ease: 'power2.in',
      }, 48);
    });

    deptRefs.current.forEach((el) => {
      if (!el) return;
      tl.to(el, {
        z: -800,
        scale: 0.1,
        opacity: 0,
        duration: 4,
        ease: 'power2.in',
      }, 48);
    });

    personaRefs.current.forEach((el) => {
      if (!el) return;
      tl.to(el, {
        z: -800,
        scale: 0.1,
        opacity: 0,
        duration: 4,
        ease: 'power2.in',
      }, 48);
    });

    // PHASE 12: Circle expands, logo reveals
    gsap.set(circleRef.current, { scale: 0, opacity: 0, xPercent: -50, yPercent: -50 });
    tl.to(circleRef.current, {
      scale: 40,
      opacity: 1,
      duration: 4,
      ease: 'power3.inOut',
    }, 52);

    gsap.set(logoRef.current, { opacity: 0, xPercent: -50, yPercent: -50 });
    tl.to(logoRef.current, {
      opacity: 1,
      duration: 2,
      ease: 'power2.out',
    }, 55);

    gsap.set(subCopyRef.current, { opacity: 0, xPercent: -50 });
    tl.to(subCopyRef.current, {
      opacity: 1,
      duration: 2,
      ease: 'power2.out',
    }, 57);

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <div ref={containerRef} data-section="fragmentation" style={{ height: '350vh', position: 'relative' }}>
      <div
        ref={stickyRef}
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          width: '100%',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background-color 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {/* Background color layer */}
        <div
          ref={bgRef}
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'transparent',
            zIndex: 0,
          }}
        />

        {/* 3D depth wrapper for floating elements */}
        <div
          ref={depthWrapperRef}
          style={{
            position: 'absolute',
            inset: 0,
            transformStyle: 'preserve-3d',
            perspective: '1200px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Marketplace logos */}
          {marketplacePills.map((pill, i) => (
            <div
              key={pill.label}
              ref={(el) => { mktRefs.current[i] = el; }}
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                pointerEvents: 'none',
                zIndex: 2,
                width: `${pill.size}px`,
                height: `${pill.size}px`,
                overflow: 'visible',
              }}
            >
              <img
                src={pill.logo}
                alt={pill.label}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  display: 'block',
                  filter: pill.blur > 0 ? `blur(${pill.blur}px)` : 'none',
                }}
              />
            </div>
          ))}

          {/* Department tags */}
          {departmentTags.map((tag, i) => (
            <span
              key={tag.label}
              ref={(el) => { deptRefs.current[i] = el; }}
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                color: '#ffffff',
                opacity: tag.opacity,
                fontSize: '18px',
                fontFamily: "'Saira', sans-serif",
                fontWeight: 300,
                whiteSpace: 'nowrap',
                pointerEvents: 'none',
                zIndex: 2,
                letterSpacing: '-0.01em',
              }}
            >
              {tag.label}
            </span>
          ))}

          {/* Persona labels */}
          {personaLabels.map((persona, i) => (
            <span
              key={persona.label}
              ref={(el) => { personaRefs.current[i] = el; }}
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                color: '#ffffff',
                opacity: persona.opacity,
                fontSize: '18px',
                fontFamily: "'Saira', sans-serif",
                fontWeight: 300,
                whiteSpace: 'nowrap',
                pointerEvents: 'none',
                zIndex: 2,
                letterSpacing: '-0.01em',
              }}
            >
              {persona.label}
            </span>
          ))}
        </div>

        {/* Text 1 */}
        <div
          ref={text1Ref}
          style={{
            ...headingBase,
            color: 'var(--v2-frag-heading-text)',
          }}
        >
          Your data is everywhere.
        </div>

        {/* Text 2 */}
        <div
          ref={text2Ref}
          style={{
            ...headingBase,
            color: 'var(--v2-frag-heading-text)',
          }}
        >
          Your decisions are waiting.
        </div>

        {/* Text 3 */}
        <div
          ref={text3Ref}
          style={{
            ...headingBase,
            color: 'var(--v2-frag-heading-text)',
          }}
        >
          Your operation outgrows your team. Every time.
        </div>

        {/* Pivot */}
        <div
          ref={pivotRef}
          style={{
            ...headingBase,
            fontSize: '80px',
            maxWidth: undefined,
            width: undefined,
            color: 'var(--v2-frag-heading-text)',
          }}
        >
          Until now.
        </div>

        {/* Circle */}
        <div
          ref={circleRef}
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'var(--v2-frag-reveal-bg)',
            pointerEvents: 'none',
            zIndex: 20,
          }}
        />

        {/* Logo */}
        <div
          ref={logoRef}
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
            pointerEvents: 'none',
            zIndex: 30,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
            <span style={{
              fontSize: '48px',
              fontFamily: "'Saira', sans-serif",
              fontWeight: 400,
              color: 'var(--v2-frag-logo-text)',
              letterSpacing: '-0.03em',
              transition: 'color 0.5s ease',
            }}>
              mark8
            </span>
            <span style={{
              fontSize: '48px',
              fontFamily: "'Saira', sans-serif",
              fontWeight: 500,
              color: '#8E59FF',
              letterSpacing: '-0.03em',
            }}>
              IQ
            </span>
          </div>
        </div>

        {/* Sub copy */}
        <div
          ref={subCopyRef}
          style={{
            position: 'absolute',
            left: '50%',
            top: 'calc(50% + 52px)',
            fontFamily: "'Saira', sans-serif",
            fontSize: '24px',
            fontWeight: 400,
            color: 'var(--v2-frag-sub-text)',
            textAlign: 'center',
            pointerEvents: 'none',
            zIndex: 30,
            whiteSpace: 'nowrap',
            transition: 'color 0.5s ease',
          }}
        >
          This is what control looks like.
        </div>
      </div>
    </div>
  );
}
