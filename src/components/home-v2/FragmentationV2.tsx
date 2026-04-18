import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useV2Theme } from './ThemeContext';
import VideoCTAButton from './VideoCTAButton';


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
  const videoCTAWrapperRef = useRef<HTMLDivElement>(null);
  const endStateZoneRef = useRef<HTMLDivElement>(null);
  const logoMarkColorRef = useRef<string>('#FFFFFF');
  const logoMarkGroupRef = useRef<SVGGElement>(null);

  // Store setTheme in a ref so GSAP callbacks can access it without stale closures
  const setThemeRef = useRef(setTheme);
  setThemeRef.current = setTheme;

  const setLogoMarkColor = (color: string) => {
    logoMarkColorRef.current = color;
    logoMarkGroupRef.current?.setAttribute('fill', color);
  };

  // ScrollTrigger-based theme toggle — uses global V2 theme context
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const container = containerRef.current;
    if (!container) return;

    const themeTrigger = ScrollTrigger.create({
      trigger: container,
      start: 'top 80%',
      end: 'bottom bottom',
      onEnter: () => {
        setThemeRef.current('dark');
        setLogoMarkColor('#FFFFFF');
        document.dispatchEvent(new CustomEvent('cursor-hide'));
      },
      onLeave: () => {
        setThemeRef.current('light');
        setLogoMarkColor('#12182B');
        document.dispatchEvent(new CustomEvent('cursor-show'));
      },
      onLeaveBack: () => {
        setThemeRef.current('light');
        setLogoMarkColor('#12182B');
        document.dispatchEvent(new CustomEvent('cursor-show'));
      },
      onEnterBack: () => {
        setThemeRef.current('dark');
        setLogoMarkColor('#FFFFFF');
        document.dispatchEvent(new CustomEvent('cursor-hide'));
      },
    });

    return () => {
      themeTrigger.kill();
      document.dispatchEvent(new CustomEvent('cursor-show'));
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
        scrub: 2.5,
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

    // PHASE 2: Text 1 blooms in (synced with marketplace entry)
    gsap.set(text1Ref.current, { opacity: 0, scale: 0.5, xPercent: -50, yPercent: -50 });
    tl.to(text1Ref.current, {
      opacity: 1,
      scale: 1,
      duration: 5,
      ease: 'power2.out',
    }, 2);

    // PHASE 3: Text 1 blooms out (just before dept tags arrive)
    tl.to(text1Ref.current, {
      opacity: 0,
      scale: 1.15,
      duration: 4,
      ease: 'power2.in',
    }, 14);

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

    // PHASE 5: Text 2 blooms in (synced with dept tag entry)
    gsap.set(text2Ref.current, { opacity: 0, scale: 0.5, xPercent: -50, yPercent: -50 });
    tl.to(text2Ref.current, {
      opacity: 1,
      scale: 1,
      duration: 5,
      ease: 'power2.out',
    }, 18);

    // PHASE 6: Text 2 blooms out (before personas arrive)
    tl.to(text2Ref.current, {
      opacity: 0,
      scale: 1.15,
      duration: 4,
      ease: 'power2.in',
    }, 28);

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

    // PHASE 8: Text 3 blooms in (synced with persona entry)
    gsap.set(text3Ref.current, { opacity: 0, scale: 0.5, xPercent: -50, yPercent: -50 });
    tl.to(text3Ref.current, {
      opacity: 1,
      scale: 1,
      duration: 5,
      ease: 'power2.out',
    }, 32);

    // PHASE 9: Text 3 blooms out
    tl.to(text3Ref.current, {
      opacity: 0,
      scale: 1.15,
      duration: 4,
      ease: 'power2.in',
    }, 42);

    // PHASE 10: "Until now." blooms in
    gsap.set(pivotRef.current, { opacity: 0, scale: 0.5, xPercent: -50, yPercent: -50 });
    tl.to(pivotRef.current, {
      opacity: 1,
      scale: 1,
      duration: 4,
      ease: 'power2.out',
    }, 44);

    // PHASE 11: Pivot exits and elements collapse INTO the circle
    tl.to(pivotRef.current, {
      opacity: 0,
      scale: 0.8,
      duration: 3,
      ease: 'power2.in',
    }, 46);

    mktRefs.current.forEach((el) => {
      if (!el) return;
      tl.to(el, {
        x: 0,
        y: 0,
        z: -200,
        scale: 0,
        opacity: 0,
        duration: 3,
        ease: 'power2.in',
      }, 46);
    });

    deptRefs.current.forEach((el) => {
      if (!el) return;
      tl.to(el, {
        x: 0,
        y: 0,
        z: -200,
        scale: 0,
        opacity: 0,
        duration: 3,
        ease: 'power2.in',
      }, 46);
    });

    personaRefs.current.forEach((el) => {
      if (!el) return;
      tl.to(el, {
        x: 0,
        y: 0,
        z: -200,
        scale: 0,
        opacity: 0,
        duration: 3,
        ease: 'power2.in',
      }, 46);
    });

    // PHASE 12: Circle appears at pivot moment, then explodes
    gsap.set(circleRef.current, { scale: 0, opacity: 1, xPercent: -50, yPercent: -50 });
    tl.to(circleRef.current, {
      scale: 0.15,
      duration: 2,
      ease: 'power2.out',
    }, 44);

    tl.to(circleRef.current, {
      scale: 60,
      duration: 4,
      ease: 'power3.inOut',
    }, 48);

    gsap.set(logoRef.current, { opacity: 0, xPercent: -50, yPercent: -50 });
    tl.to(logoRef.current, {
      opacity: 1,
      duration: 2,
      ease: 'power2.out',
    }, 51);

    gsap.set(subCopyRef.current, { opacity: 0, xPercent: -50 });
    tl.to(subCopyRef.current, {
      opacity: 1,
      duration: 2,
      ease: 'power2.out',
    }, 52);

    // After circle reveal completes, clear sticky container background
    // so the global grid/gradient layer shows through.
    tl.to(stickyRef.current, {
      backgroundColor: 'transparent',
      duration: 0.5,
      ease: 'none',
    }, 52);

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <div ref={containerRef} data-section="fragmentation" style={{ height: '250vh', position: 'relative' }}>
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

        {/* End-state zone wrapper — cursor-visible region containing logo, sub copy, and video CTA.
            pointer-events toggled to 'auto' after GSAP reveal completes (see onComplete on videoCTARef tween). */}
        <div
          ref={endStateZoneRef}
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 30,
          }}
        >
        {/* Logo — centered in sticky viewport */}
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
          <svg
            width="160"
            height="33"
            viewBox="0 0 241 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* mark8 wordmark — color controlled via ref */}
            <g ref={logoMarkGroupRef} fill="#FFFFFF">
              <path d="M37.2151 20.4008V43.8706H32.2648V20.4008C32.2648 18.6022 30.6618 17.1391 28.6865 17.1391H21.3887V12.6289H28.6865C33.3995 12.6289 37.2151 16.1083 37.2151 20.4008Z"/>
              <path d="M56.508 43.8706H51.5578V20.3978C51.5578 18.5961 49.9547 17.1391 47.9794 17.1391H40.6816V12.6289H47.9794C52.6895 12.6289 56.511 16.1083 56.511 20.3978V43.8706H56.508Z"/>
              <path d="M17.919 20.9258H12.9688V43.8696H17.919V20.9258Z"/>
              <path d="M12.9688 8.95987V0H17.919V8.95987H12.9688Z"/>
              <path d="M9.50367 12.6289H0.833984V17.13H9.50367V12.6289Z"/>
              <path d="M183.217 26.6027C184.012 25.448 184.012 24.1693 184.012 23.0689V18.9759C184.012 14.765 181.674 12.6309 177.051 12.6309H161.963C157.34 12.6309 154.998 14.765 154.998 18.9759V23.0689C154.998 24.1693 154.998 25.451 155.791 26.6027C156.277 27.3101 157.496 27.8633 158.333 28.2169C157.37 28.5585 156.508 29.148 155.935 29.9853C155.319 30.8952 155.001 31.9774 155.001 33.1866V37.5365C155.001 41.7474 157.346 43.8786 161.963 43.8786H177.06C181.677 43.8786 184.015 41.7505 184.015 37.5365V33.1866C184.015 31.9774 183.7 30.8952 183.081 29.9853C182.514 29.148 181.653 28.5585 180.683 28.2169C181.523 27.8663 182.736 27.3101 183.22 26.6027H183.217ZM159.576 20.8108C159.576 18.3472 160.894 17.141 163.611 17.141L167.753 17.1289H168.465L175.456 17.141C178.173 17.141 179.491 18.3472 179.491 20.8108V21.7691C179.491 24.2448 178.173 25.448 175.456 25.448H163.611C160.894 25.448 159.576 24.2479 159.576 21.7691V20.8108ZM179.506 35.6714C179.506 38.1532 178.188 39.3442 175.471 39.3442H163.602C160.885 39.3442 159.567 37.9356 159.567 35.4538V33.7005C159.567 31.2066 160.885 29.9974 163.602 29.9974H175.471C178.188 29.9974 179.506 31.2066 179.506 33.7005V35.6684V35.6714Z"/>
              <path d="M93.3903 20.3999V43.8667H88.4371V30.1185H73.1811C71.2028 30.1185 69.5997 31.5756 69.5997 33.3772V36.1008C69.5997 37.8964 71.2028 39.3595 73.1811 39.3595H84.9998V43.8667H73.1811C68.468 43.8667 64.6465 40.3903 64.6465 36.1008V33.3772C64.6465 29.0847 68.468 25.6053 73.1811 25.6053H88.4371V20.3969C88.4371 18.5952 86.834 17.1321 84.8617 17.1321H66.0514V12.625H84.8617C89.5688 12.625 93.3903 16.1013 93.3903 20.3969V20.3999Z"/>
              <path d="M101.48 43.8706H106.43V20.3978C106.43 18.5961 108.033 17.1391 110.008 17.1391H119.407V12.6289H110.008C105.298 12.6289 101.477 16.1083 101.477 20.3978V43.8706H101.48Z"/>
              <path d="M128.836 12.647V43.8706H123.883V12.6289L128.836 12.647Z"/>
              <path d="M136.207 30.8842L150.398 43.8706H143.442L132.713 34.0522C130.008 31.5734 130.008 27.299 132.707 24.8172L146.027 12.6289H152.982L136.21 27.9701C135.358 28.75 135.358 30.1013 136.21 30.8812L136.207 30.8842Z"/>
            </g>
            {/* IQ mark — always violet, never changes */}
            <path d="M205.046 13.0332H200.129V44.5288H205.046V13.0332Z" fill="#8E59FF"/>
            <path d="M236.73 43.1647C236.787 43.1254 236.838 43.0892 236.892 43.0499C237.88 42.3395 238.6 41.3329 239.051 40.0633C239.474 38.8571 239.75 37.3064 239.87 35.4533C239.984 33.6335 240.047 31.3936 240.047 28.7818C240.047 26.17 239.984 23.924 239.87 22.1042C239.75 20.2572 239.474 18.7004 239.051 17.4943C238.603 16.2277 237.88 15.2241 236.892 14.5077C235.935 13.8154 234.632 13.3227 233.014 13.0627C231.459 12.8088 229.474 12.6758 227.121 12.6758C224.947 12.6758 218.511 12.7967 216.881 13.0627C215.269 13.3227 213.96 13.8124 213.003 14.5077C212.021 15.2241 211.294 16.2277 210.85 17.4943C210.427 18.7004 210.145 20.2542 210.031 22.1042C209.911 23.9059 209.854 26.1549 209.854 28.7818C209.854 31.4087 209.911 33.6517 210.031 35.4533C210.145 37.3064 210.427 38.8571 210.85 40.0633C211.291 41.3329 212.021 42.3395 213.003 43.0499C213.96 43.7482 215.269 44.2349 216.881 44.5009C218.511 44.7608 224.947 44.8818 227.121 44.8818C229.042 44.8818 230.717 44.7941 232.113 44.6278L235.676 49.6005H240.834V48.739L236.733 43.1647H236.73ZM227.121 40.4623C225.446 40.4623 219.847 40.4048 218.871 40.3111C217.926 40.2114 217.163 39.9998 216.611 39.6582C216.095 39.3468 215.722 38.8329 215.458 38.0863C215.17 37.2761 214.981 36.1214 214.897 34.6553C214.81 33.1469 214.765 31.1729 214.765 28.7818C214.765 26.3907 214.81 24.4077 214.897 22.9023C214.984 21.4422 215.173 20.2844 215.458 19.4713C215.722 18.7246 216.101 18.2107 216.617 17.8994C217.163 17.5638 217.926 17.3462 218.871 17.2525C219.853 17.1557 225.446 17.0953 227.121 17.0953C228.7 17.0953 230.024 17.1466 231.05 17.2525C232.008 17.3462 232.765 17.5578 233.299 17.8933C233.797 18.2047 234.187 18.7367 234.464 19.4773C234.761 20.2874 234.95 21.4361 235.019 22.8962C235.094 24.4228 235.127 26.4028 235.127 28.7818C235.127 31.1608 235.094 33.1378 235.019 34.6613C234.95 36.1214 234.761 37.2731 234.464 38.0802C234.299 38.5367 234.079 38.9115 233.827 39.2078L229.817 33.7605H224.332L229.111 40.426C228.502 40.4502 227.838 40.4593 227.121 40.4593V40.4623Z" fill="#8E59FF"/>
          </svg>
        </div>

        {/* Sub copy — centered, 52px below logo */}
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

        {/* Video CTA — hidden; replaced by ScrollVideoV2 reveal section below */}
        <div
          ref={videoCTAWrapperRef}
          style={{
            display: 'none',
            position: 'absolute',
            left: '50%',
            top: 'calc(50% + 110px)',
            transform: 'translateX(-50%)',
            zIndex: 30,
            pointerEvents: 'auto',
            opacity: 0,
          }}
        >
          <VideoCTAButton />
        </div>
        </div>
        {/* /End-state zone */}

        <style>{`
          @keyframes fragPulse {
            0% {
              transform: scale(1);
              opacity: 0.8;
            }
            70% {
              transform: scale(1.6);
              opacity: 0;
            }
            100% {
              transform: scale(1.6);
              opacity: 0;
            }
          }
        `}</style>
      </div>
    </div>
  );
}
