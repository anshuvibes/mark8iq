import { useEffect, useRef } from 'react';
import Navbar from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      container.style.setProperty('--m8-mouse-x', `${x}px`);
      container.style.setProperty('--m8-mouse-y', `${y}px`);
    };

    container.addEventListener('mousemove', handleMouseMove);
    return () => container.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div>
      <div className="CustomBg_CustomBg__mpBxm" ref={containerRef}>
        <div className="CustomBg_bg_image__RIwVy">
          <div>
            <Navbar />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

