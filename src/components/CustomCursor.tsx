import { useEffect, useRef, useState } from 'react';

type CursorState = 'default' | 'pointer' | 'text';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const current = useRef({ x: -100, y: -100 });
  const rafRef = useRef<number>();
  const [cursorState, setCursorState] = useState<CursorState>('default');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target || !target.tagName) return;
      const tag = target.tagName.toLowerCase();
      const role = target.getAttribute('role');
      const cursor = window.getComputedStyle(target).cursor;

      if (
        tag === 'button' ||
        tag === 'a' ||
        role === 'button' ||
        cursor === 'pointer' ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('[role="button"]')
      ) {
        setCursorState('pointer');
      } else if (tag === 'input' || tag === 'textarea' || cursor === 'text') {
        setCursorState('text');
      } else {
        setCursorState('default');
      }
    };

    document.addEventListener('mouseover', onOver);

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const loop = () => {
      current.current.x = lerp(current.current.x, pos.current.x, 0.12);
      current.current.y = lerp(current.current.y, pos.current.y, 0.12);

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${current.current.x}px, ${current.current.y}px)`;
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      document.removeEventListener('mouseover', onOver);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [visible]);

  const scale = cursorState === 'pointer' ? 1.25 : cursorState === 'text' ? 0.75 : 1;
  const opacity = visible ? 1 : 0;

  return (
    <div
      ref={cursorRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 999999,
        willChange: 'transform',
        marginLeft: '-7px',
        marginTop: '-6px',
        opacity,
        transition: 'opacity 0.2s ease',
      }}
    >
      <img
        src="/img/cursor.svg"
        alt=""
        aria-hidden="true"
        style={{
          width: '28px',
          height: '29px',
          display: 'block',
          transform: `scale(${scale})`,
          transformOrigin: '7px 6px',
          transition: 'transform 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      />
    </div>
  );
}
