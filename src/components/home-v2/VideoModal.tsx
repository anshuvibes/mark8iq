import { useEffect } from 'react';

// Replace this with the real video URL when available
const VIDEO_URL = '';

interface VideoModalProps {
  onClose: () => void;
}

export default function VideoModal({ onClose }: VideoModalProps) {
  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  // Prevent body scroll while modal open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
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
          aspectRatio: '16 / 9',
          background: '#080D19',
          borderRadius: '12px',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {VIDEO_URL ? (
          <iframe
            src={VIDEO_URL}
            width="100%"
            height="100%"
            frameBorder="0"
            allow="autoplay; fullscreen"
            allowFullScreen
            style={{ display: 'block' }}
            title="Product video"
          />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              fontFamily: "'Saira', sans-serif",
              color: 'rgba(255,255,255,0.4)',
              fontSize: '16px',
              fontWeight: 300,
            }}
          >
            <span style={{ fontSize: '32px' }}>▶</span>
            <span>Video coming soon</span>
          </div>
        )}
      </div>
    </div>
  );
}
