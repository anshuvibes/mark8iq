import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useV2Theme } from './ThemeContext';
import analystImg from '@/assets/role-analyst.jpg';
import kamImg from '@/assets/role-kam.jpg';
import cxoImg from '@/assets/role-cxo.jpg';

const roles = [
  {
    label: 'Analyst',
    taglineLine1: 'Stop building reports.',
    taglineLine2: 'Start finding answers.',
    body: 'Raw data exports. ASIN-level breakdowns. Campaign performance tables. Reconciliation reports.',
    gradient: 'linear-gradient(135deg, #8e59ff 0%, #4a2d99 50%, #12182b 100%)',
    accentColor: '#8e59ff',
    image: analystImg,
  },
  {
    label: 'KAM · Account Growth',
    taglineLine1: 'See what is moving, what is stuck, and why before your morning meeting.',
    taglineLine2: '',
    body: 'Trend lines. Week-on-week movement. Marketplace comparison. Inventory alerts.',
    gradient: 'linear-gradient(135deg, #52bfbc 0%, #2a6b69 50%, #12182b 100%)',
    accentColor: '#52bfbc',
    image: kamImg,
  },
  {
    label: 'CXO · Business Overview',
    taglineLine1: 'The full picture. In the time it takes',
    taglineLine2: 'to pour your first coffee.',
    body: 'P&L impact. Blended ROAS. GMV trajectory. Financial leakage alerts.',
    gradient: 'linear-gradient(135deg, #fcb24f 0%, #8e59ff 60%, #12182b 100%)',
    accentColor: '#fcb24f',
    image: cxoImg,
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

    // Layout math (in vw):
    //   leftMargin = 6vw  (existing visual margin)
    //   cardW      = 76vw
    //   peek       = 10% of cardW visible on right edge of slide 1 = 7.6vw
    //   → card2 left edge sits at (100 - peek) = 92.4vw
    //   → gap between card1 and card2 = 92.4 - (leftMargin + cardW) = 10.4vw
    //   gap2↔3 mirrors gap1↔2.
    const vw = window.innerWidth / 100;
    const leftMargin = 6 * vw;
    const cardW = 76 * vw;
    const peek = cardW * 0.1;
    const gap = (100 * vw) - peek - leftMargin - cardW;
    const slideTravel = cardW + gap; // distance to advance one card

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.6,
        pin: stickyRef.current,
        pinSpacing: false,
      },
    });

    tl.to(track, {
      x: -(slideTravel * (roles.length - 1)),
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
    <div ref={containerRef} data-section="role-based" style={{ height: '400vh', position: 'relative' }}>
      <div
        ref={stickyRef}
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
          background: 'transparent',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Heading block — at top */}
        <div
          style={{
            padding: 'clamp(112px, 13vh, 152px) clamp(24px, 6vw, 120px) 0',
            zIndex: 10,
            pointerEvents: 'none',
            textAlign: 'center',
            flexShrink: 0,
            marginBottom: '64px',
          }}
        >
          <p
            className="m8-eyebrow"
            style={{
              color: 'var(--v2-text-secondary)',
              margin: '0 0 10px 0',
            }}
          >
            BUILT FOR EVERY ROLE
          </p>
          <h2
            className="m8-h1-large"
            style={{
              color: 'var(--v2-text)',
              margin: 0,
            }}
          >
            Everyone on your team gets <br />exactly what they need.
          </h2>
        </div>

        <div
          ref={trackRef}
          style={{
            display: 'flex',
            paddingLeft: '6vw',
            gap: '10.4vw',
            flex: 1,
            minHeight: 0,
            willChange: 'transform',
          }}
        >
          {roles.map((role, i) => (
            <div
              key={role.label}
              style={{
                width: '76vw',
                height: '100%',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                alignItems: 'start',
                paddingBottom: 'clamp(40px, 7vh, 70px)',
                gap: '48px',
                flexShrink: 0,
              }}
            >
              {/* Left: gradient placeholder card — 4:3 ratio */}
              <div
                style={{
                  background: role.gradient,
                  borderRadius: '20px',
                  width: '100%',
                  aspectRatio: '4 / 3',
                  maxHeight: '100%',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: '0 0 0 1px rgba(255,255,255,0.06)',
                  justifySelf: 'end',
                  maxWidth: '460px',
                }}
              >
                <img
                  src={role.image}
                  alt={`${role.label} view`}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
              </div>

              {/* Right: copy grouped & bottom-aligned to image card height */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  width: '100%',
                  aspectRatio: '4 / 3',
                  maxWidth: '460px',
                }}
              >
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

                  <h3
                    className="m8-h3-m"
                    style={{
                      color: 'var(--v2-text)',
                      margin: 0,
                      lineHeight: '115%',
                    }}
                  >
                    {role.taglineLine1}{role.taglineLine2 && <><br />{role.taglineLine2}</>}
                  </h3>

                  <p
                    className="m8-p4"
                    style={{
                      color: 'var(--v2-text-secondary)',
                      margin: 0,
                      maxWidth: '460px',
                      lineHeight: '160%',
                    }}
                  >
                    {role.body}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
