import { useState, useRef, useCallback } from 'react';
import VideoModal from './VideoModal';

export default function VideoCTAButton() {
  const [modalOpen, setModalOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = useCallback(() => {
    setHovered(true);
    videoRef.current?.play().catch(() => {});
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHovered(false);
    const v = videoRef.current;
    if (v) {
      v.pause();
      v.currentTime = 0;
    }
  }, []);

  return (
    <>
      <div
        onClick={() => setModalOpen(true)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          position: 'relative',
          width: 'clamp(320px, 48vw, 600px)',
          aspectRatio: '16 / 9',
          borderRadius: '5px',
          overflow: 'hidden',
          cursor: 'pointer',
          background: '#080D19',
          backgroundImage: 'url(/img/home-v2/fragmentation/video-thumbnail.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          border: '1px solid rgba(255,255,255,0.10)',
          boxShadow: '0 8px 40px rgba(0,0,0,0.45)',
          transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
        }}
      >
        {/* Video — plays muted on hover */}
        <video
          ref={videoRef}
          src="/demo.mp4"
          preload="metadata"
          muted
          playsInline
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            pointerEvents: 'none',
          }}
        />
        {/* Dark overlay — lightens on hover to signal interactivity */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: hovered
              ? 'rgba(8,13,25,0.25)'
              : 'rgba(8,13,25,0.50)',
            transition: 'background 0.3s ease',
          }}
        />

        {/* Play button — centered */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: hovered ? '#8E59FF' : 'rgba(255,255,255,0.92)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.25s ease, transform 0.25s ease',
              transform: hovered ? 'scale(1.08)' : 'scale(1)',
              boxShadow: hovered
                ? '0 0 0 8px rgba(142,89,255,0.18)'
                : '0 4px 20px rgba(0,0,0,0.35)',
            }}
          >
            {/* Triangle play icon */}
            <div
              style={{
                width: 0,
                height: 0,
                borderTop: '10px solid transparent',
                borderBottom: '10px solid transparent',
                borderLeft: hovered ? '16px solid #FFFFFF' : '16px solid #080D19',
                marginLeft: '4px',
                transition: 'border-left-color 0.25s ease',
              }}
            />
          </div>
        </div>
      </div>

      {modalOpen && <VideoModal onClose={() => setModalOpen(false)} />}
    </>
  );
}
