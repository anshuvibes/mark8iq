import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

const VIDEO_SRC = '/demo.mp4';

export default function ScrollVideoV2() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const videoWrap = videoWrapRef.current;
    if (!container || !videoWrap) return;

    // Initial state: small centered card
    gsap.set(videoWrap, {
      width: '62vw',
      borderRadius: '16px',
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.5,
      },
    });

    // Expand width from 62vw to 100vw
    tl.to(videoWrap, {
      width: '100vw',
      borderRadius: '0px',
      duration: 10,
      ease: 'none',
    }, 0);

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      data-section="scroll-video"
      style={{ height: '200vh', position: 'relative', backgroundColor: 'transparent' }}
    >
      <div
        ref={stickyRef}
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        <div
          ref={videoWrapRef}
          style={{
            position: 'relative',
            aspectRatio: '16 / 9',
            overflow: 'hidden',
            boxShadow: '0 24px 80px -20px rgba(8, 13, 25, 0.35)',
            backgroundColor: '#080D19',
            willChange: 'width',
          }}
        >
          <video
            ref={videoRef}
            src={VIDEO_SRC}
            autoPlay
            muted
            loop
            playsInline
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        </div>
      </div>
    </section>
  );
}
