import { useEffect, useRef, useState } from 'react';
import Navbar from './Navbar';
import GradualBlur from '@/components/GradualBlur.jsx';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const gradientRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [atBottom, setAtBottom] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const gradient = gradientRef.current;
    if (!container || !gradient) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY + window.scrollY;
      gradient.style.transform = `translate(${x - 200}px, ${y - 200}px)`;
    };

    container.addEventListener('mousemove', handleMouseMove);
    return () => container.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewport = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;
      // Hide blur once we're within 120px of the absolute bottom
      setAtBottom(scrollY + viewport >= fullHeight - 120);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <div>
      <div className="CustomBg_CustomBg__mpBxm" ref={containerRef}>
        <div className="CustomBg_bg_image__RIwVy">
          {/* Gradient blob — rendered between bg-color and grid ::after */}
          <div className="CustomBg_bg_gradient__9nROB" ref={gradientRef}>
            <div
              className="GradientCircle_GradientCircle__mH3g6 bg_primary gradient_circle"
              style={{ opacity: 1 }}
            />
          </div>
          <div style={{ position: 'relative', zIndex: 50 }}>
            <Navbar />
          </div>
          {children}
        </div>
      </div>
      <GradualBlur
        target="page"
        position="bottom"
        height="80px"
        strength={0.8}
        divCount={6}
        curve="bezier"
        exponential={false}
        opacity={0.9}
        zIndex={9990}
      />
    </div>
  );
}
