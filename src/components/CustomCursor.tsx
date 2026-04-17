import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const isInsideWindow = useRef(false);

  useEffect(() => {
    const el = cursorRef.current;
    if (!el) return;

    const show = () => { el.style.opacity = '1'; };
    const hide = () => { el.style.opacity = '0'; };

    const onMove = (e: MouseEvent) => {
      el.style.left = `${e.clientX - 7}px`;
      el.style.top = `${e.clientY - 6}px`;
      if (!isInsideWindow.current) {
        isInsideWindow.current = true;
        show();
      }
    };

    const onLeave = () => {
      isInsideWindow.current = false;
      hide();
    };

    const onEnter = () => {
      // Do not show here. Wait for mousemove to confirm position first.
    };

    const onVisibility = () => {
      if (document.hidden) {
        hide();
        isInsideWindow.current = false;
      }
    };

    document.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      document.removeEventListener('visibilitychange', onVisibility);
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
