import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX - 7}px`;
        cursorRef.current.style.top = `${e.clientY - 6}px`;
      }
    };
    document.addEventListener('mousemove', onMove, { passive: true });
    return () => document.removeEventListener('mousemove', onMove);
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
