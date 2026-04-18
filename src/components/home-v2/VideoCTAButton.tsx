import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useSpring } from 'motion/react';
import VideoModal from './VideoModal';

type ButtonState = 'idle' | 'magnetic' | 'charging';

export default function VideoCTAButton() {
  const buttonRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const [state, setState] = useState<ButtonState>('idle');
  const [progress, setProgress] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  // Spring values for magnetic drift
  const rawX = useSpring(0, { stiffness: 150, damping: 15 });
  const rawY = useSpring(0, { stiffness: 150, damping: 15 });

  // Pill charge ring geometry — measured dynamically
  const [pillSize, setPillSize] = useState({ w: 220, h: 48 });
  const PILL_RX = pillSize.h / 2;
  const PILL_PERIMETER =
    2 * (pillSize.w - 2 * PILL_RX) +
    2 * (pillSize.h - 2 * PILL_RX) +
    2 * Math.PI * PILL_RX;

  // Measure pill on mount and on resize
  useEffect(() => {
    const el = buttonRef.current;
    if (!el) return;

    const measure = () => {
      const rect = el.getBoundingClientRect();
      if (rect.width > 0) {
        setPillSize({ w: rect.width, h: rect.height });
      }
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Mousemove handler for magnetic effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const el = buttonRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const MAGNETIC_RADIUS = 120;

      if (distance < MAGNETIC_RADIUS && state !== 'charging') {
        const pull = (1 - distance / MAGNETIC_RADIUS);
        rawX.set(dx * pull * 0.12);
        rawY.set(dy * pull * 0.12);
        if (state === 'idle') setState('magnetic');
      } else if (state === 'magnetic') {
        rawX.set(0);
        rawY.set(0);
        setState('idle');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [state, rawX, rawY]);

  // Charge RAF loop
  const startCharge = useCallback(() => {
    setState('charging');
    startTimeRef.current = null;

    const tick = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const p = Math.min(elapsed / 1500, 1);
      setProgress(p);

      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        // Complete — open modal, reset
        setModalOpen(true);
        resetCharge();
      }
    };

    rafRef.current = requestAnimationFrame(tick);
  }, []);

  const resetCharge = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    startTimeRef.current = null;
    setProgress(0);
    setState('idle');
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const strokeDashoffset = PILL_PERIMETER * (1 - progress);
  const isCharging = state === 'charging';

  return (
    <>
      <motion.div
        ref={buttonRef}
        style={{ x: rawX, y: rawY, display: 'inline-flex' }}
      >
        <div
          onMouseEnter={startCharge}
          onMouseLeave={resetCharge}
          onClick={() => setModalOpen(true)}
          style={{
            position: 'relative',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            padding: '8px 20px 8px 8px',
            background: 'var(--v2-frag-pill-bg)',
            border: '1px solid var(--v2-frag-pill-border)',
            borderRadius: '999px',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            cursor: 'pointer',
            fontFamily: "'Saira', sans-serif",
            transition: 'background 0.3s ease, border-color 0.3s ease',
            userSelect: 'none',
          }}
        >
          {/* Pill charge ring SVG — overlays entire pill on hover */}
          {isCharging && (
            <svg
              width={pillSize.w}
              height={pillSize.h}
              viewBox={`0 0 ${pillSize.w} ${pillSize.h}`}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                pointerEvents: 'none',
                zIndex: 10,
                overflow: 'visible',
              }}
            >
              {/* Track rect */}
              <rect
                x="1.25"
                y="1.25"
                width={pillSize.w - 2.5}
                height={pillSize.h - 2.5}
                rx={PILL_RX}
                ry={PILL_RX}
                fill="none"
                stroke="rgba(142, 89, 255, 0.2)"
                strokeWidth="2.5"
              />
              {/* Charge rect — animates dashoffset */}
              <rect
                x="1.25"
                y="1.25"
                width={pillSize.w - 2.5}
                height={pillSize.h - 2.5}
                rx={PILL_RX}
                ry={PILL_RX}
                fill="none"
                stroke="#8E59FF"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray={PILL_PERIMETER}
                strokeDashoffset={strokeDashoffset}
              />
            </svg>
          )}

          {/* Play icon */}
          <span
            style={{
              position: 'relative',
              width: '32px',
              height: '32px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            {/* Pulse ring — hidden while charging */}
            {!isCharging && (
              <span
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  background: '#8E59FF',
                  animation: 'fragPulse 1.8s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                }}
              />
            )}

            {/* Play circle */}
            <span
              style={{
                position: 'relative',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: '#8E59FF',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  width: 0,
                  height: 0,
                  borderTop: '6px solid transparent',
                  borderBottom: '6px solid transparent',
                  borderLeft: '9px solid #FFFFFF',
                  marginLeft: '2px',
                }}
              />
            </span>
          </span>

          {/* Label */}
          <span
            style={{
              fontSize: '16px',
              fontWeight: 400,
              color: 'var(--v2-frag-sub-text)',
              letterSpacing: '-0.01em',
              transition: 'color 0.5s ease, opacity 0.2s ease',
              whiteSpace: 'nowrap',
            }}
          >
            {isCharging ? 'Watch this.' : 'See it in action'}
          </span>
        </div>
      </motion.div>

      {modalOpen && (
        <VideoModal onClose={() => setModalOpen(false)} />
      )}
    </>
  );
}
