import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { createPlayer } from '@videojs/react';
import { Video, VideoSkin, videoFeatures } from '@videojs/react/video';
import '@videojs/react/video/skin.css';

const VIDEO_URL = '/demo.mp4';

const Player = createPlayer({ features: videoFeatures });

interface VideoModalProps {
  onClose: () => void;
}

export default function VideoModal({ onClose }: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [buffering, setBuffering] = useState(true);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  // Lock background scroll while modal is open (Lenis + native)
  useEffect(() => {
    const lenis = (window as any).__lenis;
    lenis?.stop?.();

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      lenis?.start?.();
    };
  }, []);

  return createPortal(
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(8, 13, 25, 0.96)',
        zIndex: 999998,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="vjs-mark8iq-wrapper"
        style={{
          width: 'min(96vw, calc(92vh * 16 / 9))',
          maxWidth: '1200px',
          aspectRatio: '16 / 9',
          position: 'relative',
          background: '#080D19',
          borderRadius: '12px',
          overflow: 'hidden',
        }}
      >
        <Player.Provider>
          <VideoSkin>
            <Video
              ref={videoRef}
              src={VIDEO_URL}
              autoPlay
              playsInline
              controls={false}
              onWaiting={() => setBuffering(true)}
              onPlaying={() => setBuffering(false)}
              onCanPlay={() => setBuffering(false)}
            />
          </VideoSkin>
        </Player.Provider>
        {buffering && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none',
              zIndex: 10,
            }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                border: '3px solid rgba(142, 89, 255, 0.2)',
                borderTopColor: '#8E59FF',
                animation: 'spinBuffer 0.8s linear infinite',
              }}
            />
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
