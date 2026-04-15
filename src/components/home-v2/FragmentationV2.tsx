import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useV2Theme } from './ThemeContext';


const marketplacePills = [
  { label: 'Amazon',           x: -420, y: -190 },
  { label: 'Flipkart',         x:  370, y: -200 },
  { label: 'Myntra',           x: -390, y:  110 },
  { label: 'Meesho',           x:  410, y:  130 },
  { label: 'Zepto',            x: -210, y:  260 },
  { label: 'Blinkit',          x:  220, y:  270 },
  { label: 'Swiggy Instamart', x:    0, y:  310 },
];

const departmentTags = [
  { label: 'Ads Manager',           x: -510, y:  -90 },
  { label: 'Inventory Tracker',     x:  510, y:   70 },
  { label: 'Returns Dashboard',     x: -490, y:  170 },
  { label: 'Finance Suite',         x:  490, y: -150 },
  { label: 'PO Management',         x: -310, y: -230 },
  { label: 'Market Research Tool',  x:  330, y:  230 },
  { label: 'Reconciliation Engine', x:   10, y: -310 },
];

const personaLabels = [
  { label: 'Analyst needs raw data',      x: -610, y:  -70 },
  { label: 'Manager needs trends',        x:  600, y:  -50 },
  { label: 'CXO needs P&L impact',        x: -580, y:  210 },
  { label: 'CAM needs campaign view',     x:  560, y:  190 },
  { label: 'Ops Head needs stock levels', x:    0, y: -330 },
];

/* Shared inline style fragments */
const pillBase: React.CSSProperties = {
  position: 'absolute',
  left: '50%',
  top: '50%',
  padding: '10px 20px',
  borderRadius: '9999px',
  fontSize: '15px',
  fontFamily: "'Saira', sans-serif",
  fontWeight: 300,
  whiteSpace: 'nowrap',
  pointerEvents: 'none',
  zIndex: 2,
  transition: 'background 0.5s ease, border-color 0.5s ease, color 0.5s ease',
};

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
  

  const mktRefs = useRef<(HTMLDivElement | null)[]>([]);
  const deptRefs = useRef<(HTMLDivElement | null)[]>([]);
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
    const sticky = stickyRef.current;
    if (!container) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top 70%',
        end: 'bottom bottom',
        scrub: 1.5,
      },
    });


    // PHASE 1 (t=8–25): Marketplace pills bloom in
    mktRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, {
        opacity: 0,
        x: marketplacePills[i].x,
        y: marketplacePills[i].y,
        scale: 0.6,
        xPercent: -50,
        yPercent: -50,
      });
      tl.to(el, {
        opacity: 1,
        scale: 1,
        duration: 6,
        ease: 'power2.out',
      }, 0 + i * 0.8);
    });

    // PHASE 2 (t=25–32): Text 1 blooms in
    gsap.set(text1Ref.current, { opacity: 0, scale: 0.5, xPercent: -50, yPercent: -50 });
    tl.to(text1Ref.current, {
      opacity: 1,
      scale: 1,
      duration: 5,
      ease: 'power2.out',
    }, 8);

    // PHASE 3 (t=32–38): Text 1 blooms out
    tl.to(text1Ref.current, {
      opacity: 0,
      scale: 1.15,
      duration: 5,
      ease: 'power2.in',
    }, 14);

    // PHASE 4 (t=38–52): Department tags appear, marketplace pills compress
    deptRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, {
        opacity: 0,
        x: departmentTags[i].x,
        y: departmentTags[i].y,
        scale: 0.6,
        xPercent: -50,
        yPercent: -50,
      });
      tl.to(el, {
        opacity: 1,
        scale: 1,
        duration: 6,
        ease: 'power2.out',
      }, 18 + i * 0.8);
    });

    mktRefs.current.forEach((el, i) => {
      if (!el) return;
      tl.to(el, {
        x: marketplacePills[i].x * 0.7,
        y: marketplacePills[i].y * 0.7,
        duration: 8,
        ease: 'power1.inOut',
      }, 18);
    });

    // PHASE 5 (t=52–58): Text 2 blooms in
    gsap.set(text2Ref.current, { opacity: 0, scale: 0.5, xPercent: -50, yPercent: -50 });
    tl.to(text2Ref.current, {
      opacity: 1,
      scale: 1,
      duration: 5,
      ease: 'power2.out',
    }, 30);

    // PHASE 6 (t=58–64): Text 2 blooms out
    tl.to(text2Ref.current, {
      opacity: 0,
      scale: 1.15,
      duration: 5,
      ease: 'power2.in',
    }, 36);

    // PHASE 7 (t=64–76): Persona labels appear
    personaRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, {
        opacity: 0,
        x: personaLabels[i].x,
        y: personaLabels[i].y,
        xPercent: -50,
        yPercent: -50,
      });
      tl.to(el, {
        opacity: 1,
        duration: 5,
        ease: 'power2.out',
      }, 40 + i * 1.2);
    });

    // PHASE 8 (t=76–82): Text 3 blooms in
    gsap.set(text3Ref.current, { opacity: 0, scale: 0.5, xPercent: -50, yPercent: -50 });
    tl.to(text3Ref.current, {
      opacity: 1,
      scale: 1,
      duration: 5,
      ease: 'power2.out',
    }, 52);

    // PHASE 9 (t=82–87): Text 3 blooms out
    tl.to(text3Ref.current, {
      opacity: 0,
      scale: 1.15,
      duration: 4,
      ease: 'power2.in',
    }, 58);

    // PHASE 10 (t=87–92): "Until now." blooms in
    gsap.set(pivotRef.current, { opacity: 0, scale: 0.5, xPercent: -50, yPercent: -50 });
    tl.to(pivotRef.current, {
      opacity: 1,
      scale: 1,
      duration: 4,
      ease: 'power2.out',
    }, 63);

    // PHASE 11 (t=92–96): Everything converges to center
    tl.to(pivotRef.current, {
      opacity: 0,
      scale: 0.8,
      duration: 3,
      ease: 'power2.in',
    }, 68);

    mktRefs.current.forEach((el) => {
      if (!el) return;
      tl.to(el, { x: 0, y: 0, scale: 0.3, opacity: 0, duration: 4, ease: 'power3.in' }, 68);
    });

    deptRefs.current.forEach((el) => {
      if (!el) return;
      tl.to(el, { x: 0, y: 0, scale: 0.3, opacity: 0, duration: 4, ease: 'power3.in' }, 68);
    });

    personaRefs.current.forEach((el) => {
      if (!el) return;
      tl.to(el, { x: 0, y: 0, opacity: 0, duration: 4, ease: 'power3.in' }, 68);
    });

    // PHASE 12 (t=96–100): Circle expands, logo reveals
    gsap.set(circleRef.current, { scale: 0, opacity: 0, xPercent: -50, yPercent: -50 });
    tl.to(circleRef.current, {
      scale: 40,
      opacity: 1,
      duration: 4,
      ease: 'power3.inOut',
    }, 74);

    gsap.set(logoRef.current, { opacity: 0, xPercent: -50, yPercent: -50 });
    tl.to(logoRef.current, {
      opacity: 1,
      duration: 2,
      ease: 'power2.out',
    }, 77);

    gsap.set(subCopyRef.current, { opacity: 0, xPercent: -50 });
    tl.to(subCopyRef.current, {
      opacity: 1,
      duration: 2,
      ease: 'power2.out',
    }, 79);

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


        {/* Marketplace pills */}
        {marketplacePills.map((pill, i) => (
          <div
            key={pill.label}
            ref={(el) => { mktRefs.current[i] = el; }}
            style={{
              ...pillBase,
              background: 'var(--v2-frag-pill-bg)',
              border: '1px solid var(--v2-frag-pill-border)',
              color: 'var(--v2-frag-pill-text)',
            }}
          >
            {pill.label}
          </div>
        ))}

        {/* Department tags */}
        {departmentTags.map((tag, i) => (
          <div
            key={tag.label}
            ref={(el) => { deptRefs.current[i] = el; }}
            style={{
              ...pillBase,
              background: 'var(--v2-frag-dept-bg)',
              border: '1px solid var(--v2-frag-dept-border)',
              color: 'var(--v2-frag-dept-text)',
            }}
          >
            {tag.label}
          </div>
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
              color: 'var(--v2-frag-persona-text)',
              fontSize: '15px',
              fontFamily: "'Saira', sans-serif",
              fontWeight: 300,
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
              zIndex: 2,
              transition: 'color 0.5s ease',
            }}
          >
            {persona.label}
          </span>
        ))}

        {/* Text 1 */}
        <div
          ref={text1Ref}
          style={{
            ...headingBase,
            color: 'var(--v2-frag-heading-text)',
          }}
        >
          Every marketplace speaks a different language.
        </div>

        {/* Text 2 */}
        <div
          ref={text2Ref}
          style={{
            ...headingBase,
            color: 'var(--v2-frag-heading-text)',
          }}
        >
          Every department runs on a different tool. None of them talk to each other.
        </div>

        {/* Text 3 */}
        <div
          ref={text3Ref}
          style={{
            ...headingBase,
            color: 'var(--v2-frag-heading-text)',
          }}
        >
          Same data. Seven interpretations. Zero shared truth.
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
          One platform absorbs it all.
        </div>
      </div>
    </div>
  );
}
