import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useV2Theme } from './ThemeContext';

const roles = [
  {
    label: 'Analyst',
    tagline: 'Stop building reports. Start finding answers.',
    body: 'Raw data exports. ASIN-level breakdowns. Campaign performance tables. Reconciliation reports.',
    gradient: 'linear-gradient(135deg, #8e59ff 0%, #4a2d99 50%, #12182b 100%)',
    accentColor: '#8e59ff',
  },
  {
    label: 'E-Commerce Manager',
    tagline: 'See what is moving, what is stuck, and why. Before your morning meeting.',
    body: 'Trend lines. Week-on-week movement. Marketplace comparison. Inventory alerts.',
    gradient: 'linear-gradient(135deg, #52bfbc 0%, #2a6b69 50%, #12182b 100%)',
    accentColor: '#52bfbc',
  },
  {
    label: 'CEO / Founder',
    tagline: 'The full picture. In the time it takes to pour your first coffee.',
    body: 'P&L impact. Blended ROAS. GMV trajectory. Financial leakage alerts.',
    gradient: 'linear-gradient(135deg, #fcb24f 0%, #8e59ff 60%, #12182b 100%)',
    accentColor: '#fcb24f',
  },
];

export default function RoleBasedValueV2() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const { setTheme } = useV2Theme();
  const setThemeRef = useRef(setTheme);
  setThemeRef.current = setTheme;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const totalSlides = roles.length;
    const slideWidth = window.innerWidth;
    const totalTravel = slideWidth * (totalSlides - 1);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.2,
        pin: stickyRef.current,
        pinSpacing: false,
      },
    });

    tl.to(track, {
      x: -totalTravel,
      ease: 'none',
    });

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: 'top 80%',
      end: 'bottom bottom',
      onEnter: () => {
        setThemeRef.current('dark');
        document.dispatchEvent(new CustomEvent('cursor-hide'));
      },
      onLeave: () => {
        setThemeRef.current('light');
        document.dispatchEvent(new CustomEvent('cursor-show'));
      },
      onLeaveBack: () => {
        setThemeRef.current('light');
        document.dispatchEvent(new CustomEvent('cursor-show'));
      },
      onEnterBack: () => {
        setThemeRef.current('dark');
        document.dispatchEvent(new CustomEvent('cursor-hide'));
      },
    });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
      trigger.kill();
      setThemeRef.current('light');
      document.dispatchEvent(new CustomEvent('cursor-show'));
    };
  }, []);

  return (
    <div ref={containerRef} style={{ height: '300vh', position: 'relative' }}>
      <div
        ref={stickyRef}
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
          background: 'transparent',
        }}
      >
        {/* Fixed heading block */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            padding: 'clamp(96px, 14vh, 140px) clamp(24px, 6vw, 120px) 0',
            zIndex: 10,
            pointerEvents: 'none',
          }}
        >
          <p
            style={{
              fontFamily: "'Saira', sans-serif",
              fontSize: '11px',
              fontWeight: 400,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--v2-text-secondary)',
              margin: '0 0 10px 0',
            }}
          >
            Built for every role
          </p>
          <h2
            style={{
              fontFamily: "'Saira', sans-serif",
              fontSize: '36px',
              fontWeight: 400,
              letterSpacing: '-0.03em',
              lineHeight: '110%',
              color: 'var(--v2-text)',
              margin: 0,
            }}
          >
            Everyone on your team gets exactly what they need.
          </h2>
        </div>

        <div
          ref={trackRef}
          style={{
            display: 'flex',
            width: `${roles.length * 100}vw`,
            height: '100%',
            willChange: 'transform',
          }}
        >
          {roles.map((role, i) => (
            <div
              key={role.label}
              style={{
                width: '100vw',
                height: '100%',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                alignItems: 'center',
                padding: 'clamp(200px, 28vh, 260px) clamp(24px, 6vw, 120px) 0',
                gap: '60px',
                flexShrink: 0,
              }}
            >
              {/* Left: gradient placeholder card */}
              <div
                style={{
                  background: role.gradient,
                  borderRadius: '24px',
                  height: '60vh',
                  maxHeight: '520px',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: '0 40px 80px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.06)',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'radial-gradient(ellipse at 30% 30%, rgba(255,255,255,0.08) 0%, transparent 60%)',
                    borderRadius: '24px',
                  }}
                />
                <span
                  className="m8-p6"
                  style={{
                    position: 'absolute',
                    bottom: '24px',
                    left: '24px',
                    color: 'rgba(255,255,255,0.3)',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}
                >
                  {role.label} view — screenshot coming
                </span>
              </div>

              {/* Right: copy */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <span
                  className="m8-p6"
                  style={{
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: role.accentColor,
                  }}
                >
                  {role.label}
                </span>

                <h2 className="m8-h3-xl" style={{ color: 'var(--v2-text)', margin: 0, lineHeight: '110%' }}>
                  {role.tagline}
                </h2>

                <p
                  className="m8-p4"
                  style={{
                    color: 'var(--v2-text-secondary)',
                    margin: 0,
                    maxWidth: '420px',
                    lineHeight: '160%',
                  }}
                >
                  {role.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
