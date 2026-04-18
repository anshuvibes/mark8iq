import { useEffect, useRef } from 'react';
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

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  // On scroll: enter native Picture-in-Picture, THEN close the modal.
  // We wait for the `enterpictureinpicture` event so the browser has fully
  // detached the video into its PiP window before React unmounts the <video>.
  useEffect(() => {
    const handleScroll = () => {
      const videoEl = videoRef.current;
      if (!videoEl) {
        onClose();
        return;
      }

      if (document.pictureInPictureEnabled && !document.pictureInPictureElement) {
        videoEl
          .requestPictureInPicture()
          .then(() => {
            // Defer close until after PiP detachment is committed
            requestAnimationFrame(() => onClose());
          })
          .catch(() => {
            onClose();
          });
      } else {
        onClose();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [onClose]);

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
            <Video ref={videoRef} src={VIDEO_URL} autoPlay playsInline controls={false} />
          </VideoSkin>
        </Player.Provider>
      </div>
    </div>,
    document.body
  );
}
