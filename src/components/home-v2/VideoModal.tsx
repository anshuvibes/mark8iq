import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import type Player from 'video.js/dist/types/player';

const VIDEO_URL = '/demo.mp4';

interface VideoModalProps {
  onClose: () => void;
}

export default function VideoModal({ onClose }: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<Player | null>(null);

  useEffect(() => {
    if (!videoRef.current) return;

    playerRef.current = videojs(videoRef.current, {
      autoplay: true,
      muted: false,
      controls: true,
      responsive: true,
      fluid: true,
      sources: [{ src: VIDEO_URL, type: 'video/mp4' }],
    });

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

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
        style={{
          width: '100%',
          maxWidth: '900px',
          background: '#080D19',
          borderRadius: '12px',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <div data-vjs-player>
          <video
            ref={videoRef}
            className="video-js vjs-mark8iq"
            playsInline
          />
        </div>
      </div>
    </div>,
    document.body
  );
}
