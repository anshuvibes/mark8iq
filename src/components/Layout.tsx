import { useEffect, useRef } from 'react';
import Navbar from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const gradientRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const gradient = gradientRef.current;
    if (!container || !gradient) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY + window.scrollY;
      gradient.style.transform = `translate(${x - 250}px, ${y - 250}px)`;
    };

    container.addEventListener('mousemove', handleMouseMove);
    return () => container.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div>
      <div className="CustomBg_CustomBg__mpBxm" ref={containerRef}>
        <div className="CustomBg_bg_gradient__9nROB" ref={gradientRef}>
          <div
            className="GradientCircle_GradientCircle__mH3g6 bg_primary gradient_circle"
            style={{ opacity: 1 }}
          />
        </div>
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
