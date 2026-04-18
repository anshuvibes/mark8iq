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

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
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
          width: '100%',
          maxWidth: '960px',
          aspectRatio: '16 / 9',
          position: 'relative',
        }}
      >
        <Player.Provider>
          <Player.Container>
            <VideoSkin>
              <Video src={VIDEO_URL} autoPlay controls={false} />
            </VideoSkin>
          </Player.Container>
        </Player.Provider>
      </div>
    </div>,
    document.body
  );
}
