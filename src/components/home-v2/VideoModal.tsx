import { useEffect } from 'react';
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
  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  // Lock scroll (native + Lenis)
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    const lenis = (window as any).__lenis;
    if (lenis) lenis.stop();

    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      if (lenis) lenis.start();
    };
  }, []);

  return createPortal(
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.88)',
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
          width: '90vw',
          maxWidth: '1100px',
          aspectRatio: '16 / 9',
          position: 'relative',
          background: '#080D19',
          borderRadius: '12px',
          overflow: 'hidden',
        }}
      >
        <Player.Provider>
          <Player.Container>
            <VideoSkin style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
              <Video src={VIDEO_URL} autoPlay playsInline controls={false} />
            </VideoSkin>
          </Player.Container>
        </Player.Provider>
      </div>
    </div>,
    document.body
  );
}
