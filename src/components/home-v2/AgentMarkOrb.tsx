export default function AgentMarkOrb({ size = 180 }: { size?: number }) {
  return (
    <div
      style={{
        position: 'relative',
        width: size,
        height: size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: size * 0.15,
        boxSizing: 'content-box',
      }}
    >
      <style>{`
        @keyframes orbSpin1 {
          0%   { transform: rotate(0deg)   scale(1); }
          50%  { transform: rotate(180deg) scale(1.06); }
          100% { transform: rotate(360deg) scale(1); }
        }
        @keyframes orbSpin2 {
          0%   { transform: rotate(0deg)    scale(0.94); }
          50%  { transform: rotate(-200deg) scale(1.02); }
          100% { transform: rotate(-360deg) scale(0.94); }
        }
        @keyframes orbSpin3 {
          0%   { transform: rotate(0deg)   scale(0.98); }
          33%  { transform: rotate(120deg) scale(1.04); }
          66%  { transform: rotate(240deg) scale(0.96); }
          100% { transform: rotate(360deg) scale(0.98); }
        }
        @keyframes orbPulse {
          0%,  100% { opacity: 0.85; }
          50%       { opacity: 1; }
        }
        @keyframes orbGlow {
          0%,  100% { box-shadow: 0 0 40px 10px rgba(142,89,255,0.25), 0 0 80px 20px rgba(142,89,255,0.12); }
          50%       { box-shadow: 0 0 56px 16px rgba(142,89,255,0.35), 0 0 100px 30px rgba(142,89,255,0.18); }
        }
        @media (prefers-reduced-motion: reduce) {
          .agent-mark-orb-layer { animation-play-state: paused !important; }
        }
      `}</style>

      {/* Outer glow ring (sits outside clipped circle) */}
      <div
        className="agent-mark-orb-layer"
        style={{
          position: 'absolute',
          width: size,
          height: size,
          borderRadius: '50%',
          animation: 'orbGlow 4s ease-in-out infinite',
          pointerEvents: 'none',
        }}
      />

      {/* Clipped circle container */}
      <div
        style={{
          position: 'relative',
          width: size,
          height: size,
          borderRadius: '50%',
          overflow: 'hidden',
          background: '#2a1a5e',
        }}
      >
        {/* Base layer — dark violet */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at 50% 60%, #4a2db5 0%, #1f1147 100%)',
          }}
        />

        {/* Blob layer 1 — primary violet, clockwise slow */}
        <div
          className="agent-mark-orb-layer"
          style={{
            position: 'absolute',
            inset: '-30%',
            background: 'radial-gradient(circle at 30% 30%, #8E59FF 0%, transparent 55%)',
            animation: 'orbSpin1 9s linear infinite',
            mixBlendMode: 'screen',
          }}
        />

        {/* Blob layer 2 — light violet, counter-clockwise faster */}
        <div
          className="agent-mark-orb-layer"
          style={{
            position: 'absolute',
            inset: '-30%',
            background: 'radial-gradient(circle at 70% 40%, #c8a8ff 0%, transparent 50%)',
            animation: 'orbSpin2 7s linear infinite',
            mixBlendMode: 'screen',
          }}
        />

        {/* Blob layer 3 — blue-violet, medium */}
        <div
          className="agent-mark-orb-layer"
          style={{
            position: 'absolute',
            inset: '-30%',
            background: 'radial-gradient(circle at 50% 70%, #608ff6 0%, transparent 50%)',
            animation: 'orbSpin3 11s linear infinite',
            mixBlendMode: 'screen',
          }}
        />

        {/* Blob layer 4 — warm pink-violet highlight */}
        <div
          className="agent-mark-orb-layer"
          style={{
            position: 'absolute',
            inset: '-30%',
            background: 'radial-gradient(circle at 35% 65%, #d98ff0 0%, transparent 45%)',
            animation: 'orbSpin1 13s linear infinite reverse',
            mixBlendMode: 'screen',
            opacity: 0.7,
          }}
        />

        {/* Inner highlight — top-left light source */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at 30% 25%, rgba(255,255,255,0.45) 0%, transparent 35%)',
            pointerEvents: 'none',
          }}
        />

        {/* Pulse overlay */}
        <div
          className="agent-mark-orb-layer"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at 50% 50%, rgba(142,89,255,0.15) 0%, transparent 70%)',
            animation: 'orbPulse 3s ease-in-out infinite',
            pointerEvents: 'none',
          }}
        />
      </div>
    </div>
  );
}
