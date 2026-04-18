import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const isInsideWindow = useRef(false);
  const lastKnown = useRef<{ x: number; y: number } | null>(null);
  const pendingReveal = useRef(false);

  useEffect(() => {
    const el = cursorRef.current;
    if (!el) return;

    const show = () => { el.style.opacity = '1'; };
    const hide = () => { el.style.opacity = '0'; };

    const setPosition = (x: number, y: number) => {
      el.style.left = `${x - 7}px`;
      el.style.top = `${y - 6}px`;
    };

    const enableGlide = () => {
      el.style.transition = 'left 0.45s cubic-bezier(0.22, 1, 0.36, 1), top 0.45s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.2s ease';
    };

    const disableGlide = () => {
      el.style.transition = 'opacity 0.2s ease';
    };

    const onMove = (e: MouseEvent) => {
      lastKnown.current = { x: e.clientX, y: e.clientY };
      isInsideWindow.current = true;

      if (pendingReveal.current) {
        // First move after reveal — glide to real position then snap
        pendingReveal.current = false;
        enableGlide();
        setPosition(e.clientX, e.clientY);
        show();
        setTimeout(disableGlide, 500);
      } else {
        setPosition(e.clientX, e.clientY);
        show();
      }
    };

    const onLeave = () => {
      isInsideWindow.current = false;
      hide();
    };

    const onEnter = () => {
      // No-op. Wait for mousemove to confirm position.
    };

    const onVisibility = () => {
      if (document.hidden) {
        hide();
        isInsideWindow.current = false;
      }
    };

    const onCursorHide = () => {
      pendingReveal.current = false;
      disableGlide();
      hide();
    };

    const onCursorShow = () => {
      if (lastKnown.current) {
        // Last known position available — paint there instantly, no jerk
        disableGlide();
        setPosition(lastKnown.current.x, lastKnown.current.y);
        if (isInsideWindow.current) show();
      } else {
        // No prior movement — paint at center with glide fallback
        disableGlide();
        setPosition(window.innerWidth / 2, window.innerHeight / 2 + 110);
        pendingReveal.current = true;
        if (isInsideWindow.current) show();
      }
    };

    // Initial transition state
    disableGlide();

    document.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);
    document.addEventListener('visibilitychange', onVisibility);
    document.addEventListener('cursor-hide', onCursorHide);
    document.addEventListener('cursor-show', onCursorShow);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      document.removeEventListener('visibilitychange', onVisibility);
      document.removeEventListener('cursor-hide', onCursorHide);
      document.removeEventListener('cursor-show', onCursorShow);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      style={{
        position: 'fixed',
        pointerEvents: 'none',
        zIndex: 999999,
        willChange: 'left, top',
        left: '-100px',
        top: '-100px',
        opacity: 0,
      }}
    >
      <img
        src="/img/cursor.svg"
        alt=""
        aria-hidden="true"
        style={{ width: '28px', height: '29px', display: 'block' }}
      />
    </div>
  );
}
