import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

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

export default function FragmentationV2() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

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

  // IntersectionObserver — toggles body theme class for Canopy-style transition
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            document.body.classList.add('frag-theme-dark');
          } else {
            // Only remove when scrolling back up (section exits bottom of viewport)
            if (entry.boundingClientRect.top > 0) {
              document.body.classList.remove('frag-theme-dark');
            }
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
      document.body.classList.remove('frag-theme-dark');
    };
  }, []);

  // GSAP scroll-driven timeline
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    if (!container) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',
        end: 'bottom bottom',
        scrub: 1.5,
      },
    });

    // PHASE 0 (t=0–8): Grid fades in (body CSS transition handles bg color)
    tl.to(gridRef.current, {
      opacity: 0.06,
      duration: 8,
      ease: 'none',
    }, 0);

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
      }, 8 + i * 0.8);
    });

    // PHASE 2 (t=25–32): Text 1 blooms in
    gsap.set(text1Ref.current, { opacity: 0, scale: 0.5, xPercent: -50, yPercent: -50 });
    tl.to(text1Ref.current, {
      opacity: 1,
      scale: 1,
      duration: 5,
      ease: 'power2.out',
    }, 25);

    // PHASE 3 (t=32–38): Text 1 blooms out
    tl.to(text1Ref.current, {
      opacity: 0,
      scale: 1.15,
      duration: 5,
      ease: 'power2.in',
    }, 32);

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
      }, 38 + i * 0.8);
    });

    mktRefs.current.forEach((el, i) => {
      if (!el) return;
      tl.to(el, {
        x: marketplacePills[i].x * 0.7,
        y: marketplacePills[i].y * 0.7,
        duration: 8,
        ease: 'power1.inOut',
      }, 38);
    });

    // PHASE 5 (t=52–58): Text 2 blooms in
    gsap.set(text2Ref.current, { opacity: 0, scale: 0.5, xPercent: -50, yPercent: -50 });
    tl.to(text2Ref.current, {
      opacity: 1,
      scale: 1,
      duration: 5,
      ease: 'power2.out',
    }, 52);

    // PHASE 6 (t=58–64): Text 2 blooms out
    tl.to(text2Ref.current, {
      opacity: 0,
      scale: 1.15,
      duration: 5,
      ease: 'power2.in',
    }, 58);

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
      }, 64 + i * 1.2);
    });

    // PHASE 8 (t=76–82): Text 3 blooms in
    gsap.set(text3Ref.current, { opacity: 0, scale: 0.5, xPercent: -50, yPercent: -50 });
    tl.to(text3Ref.current, {
      opacity: 1,
      scale: 1,
      duration: 5,
      ease: 'power2.out',
    }, 76);

    // PHASE 9 (t=82–87): Text 3 blooms out
    tl.to(text3Ref.current, {
      opacity: 0,
      scale: 1.15,
      duration: 4,
      ease: 'power2.in',
    }, 82);

    // PHASE 10 (t=87–92): "Until now." blooms in
    gsap.set(pivotRef.current, { opacity: 0, scale: 0.5, xPercent: -50, yPercent: -50 });
    tl.to(pivotRef.current, {
      opacity: 1,
      scale: 1,
      duration: 4,
      ease: 'power2.out',
    }, 87);

    // PHASE 11 (t=92–96): Everything converges to center
    tl.to(pivotRef.current, {
      opacity: 0,
      scale: 0.8,
      duration: 3,
      ease: 'power2.in',
    }, 92);

    mktRefs.current.forEach((el) => {
      if (!el) return;
      tl.to(el, { x: 0, y: 0, scale: 0.3, opacity: 0, duration: 4, ease: 'power3.in' }, 92);
    });

    deptRefs.current.forEach((el) => {
      if (!el) return;
      tl.to(el, { x: 0, y: 0, scale: 0.3, opacity: 0, duration: 4, ease: 'power3.in' }, 92);
    });

    personaRefs.current.forEach((el) => {
      if (!el) return;
      tl.to(el, { x: 0, y: 0, opacity: 0, duration: 4, ease: 'power3.in' }, 92);
    });

    // PHASE 12 (t=96–100): Circle expands, logo reveals
    gsap.set(circleRef.current, { scale: 0, opacity: 0, xPercent: -50, yPercent: -50 });
    tl.to(circleRef.current, {
      scale: 40,
      opacity: 1,
      duration: 4,
      ease: 'power3.inOut',
    }, 96);

    // Background transitions to violet tint for circle reveal
    tl.to(bgRef.current, {
      backgroundColor: '#F5F0FF',
      duration: 4,
      ease: 'none',
    }, 96);

    // Also remove the dark theme class when circle expands
    tl.call(() => {
      document.body.classList.remove('frag-theme-dark');
    }, [], 96);

    gsap.set(logoRef.current, { opacity: 0, xPercent: -50, yPercent: -50 });
    tl.to(logoRef.current, {
      opacity: 1,
      duration: 2,
      ease: 'power2.out',
    }, 98);

    gsap.set(subCopyRef.current, { opacity: 0, xPercent: -50 });
    tl.to(subCopyRef.current, {
      opacity: 1,
      duration: 2,
      ease: 'power2.out',
    }, 99);

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <div ref={containerRef} style={{ height: '700vh', position: 'relative' }}>
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

        {/* Grid overlay */}
        <div
          ref={gridRef}
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'url(/img/bg-pattern-reverse.svg)',
            backgroundRepeat: 'repeat',
            opacity: 0,
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />

        {/* Marketplace pills */}
        {marketplacePills.map((pill, i) => (
          <div
            key={pill.label}
            ref={(el) => { mktRefs.current[i] = el; }}
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              padding: '10px 20px',
              borderRadius: '9999px',
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: 'rgba(255,255,255,0.85)',
              fontSize: '15px',
              fontFamily: "'Saira', sans-serif",
              fontWeight: 300,
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
              zIndex: 2,
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
              position: 'absolute',
              left: '50%',
              top: '50%',
              padding: '10px 20px',
              borderRadius: '9999px',
              background: 'rgba(142,89,255,0.10)',
              border: '1px solid rgba(142,89,255,0.22)',
              color: 'rgba(255,255,255,0.8)',
              fontSize: '15px',
              fontFamily: "'Saira', sans-serif",
              fontWeight: 300,
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
              zIndex: 2,
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
              color: 'rgba(255,255,255,0.48)',
              fontSize: '15px',
              fontFamily: "'Saira', sans-serif",
              fontWeight: 300,
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
              zIndex: 2,
            }}
          >
            {persona.label}
          </span>
        ))}

        {/* Text 1 */}
        <div
          ref={text1Ref}
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            fontFamily: "'Saira', sans-serif",
            fontSize: '60px',
            fontWeight: 400,
            lineHeight: '110%',
            letterSpacing: '-0.03em',
            color: '#ffffff',
            textAlign: 'center',
            pointerEvents: 'none',
            zIndex: 10,
            maxWidth: '820px',
            width: '90vw',
          }}
        >
          Every marketplace speaks a different language.
        </div>

        {/* Text 2 */}
        <div
          ref={text2Ref}
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            fontFamily: "'Saira', sans-serif",
            fontSize: '60px',
            fontWeight: 400,
            lineHeight: '110%',
            letterSpacing: '-0.03em',
            color: '#ffffff',
            textAlign: 'center',
            pointerEvents: 'none',
            zIndex: 10,
            maxWidth: '820px',
            width: '90vw',
          }}
        >
          Every department runs on a different tool. None of them talk to each other.
        </div>

        {/* Text 3 */}
        <div
          ref={text3Ref}
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            fontFamily: "'Saira', sans-serif",
            fontSize: '60px',
            fontWeight: 400,
            lineHeight: '110%',
            letterSpacing: '-0.03em',
            color: '#ffffff',
            textAlign: 'center',
            pointerEvents: 'none',
            zIndex: 10,
            maxWidth: '820px',
            width: '90vw',
          }}
        >
          Same data. Seven interpretations. Zero shared truth.
        </div>

        {/* Pivot */}
        <div
          ref={pivotRef}
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            fontFamily: "'Saira', sans-serif",
            fontSize: '80px',
            fontWeight: 400,
            lineHeight: '110%',
            letterSpacing: '-0.03em',
            color: '#ffffff',
            textAlign: 'center',
            pointerEvents: 'none',
            zIndex: 10,
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
            background: '#F5F0FF',
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
              color: '#080D19',
              letterSpacing: '-0.03em',
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
            color: 'rgba(8,13,25,0.6)',
            textAlign: 'center',
            pointerEvents: 'none',
            zIndex: 30,
            whiteSpace: 'nowrap',
          }}
        >
          One platform absorbs it all.
        </div>
      </div>
    </div>
  );
}
