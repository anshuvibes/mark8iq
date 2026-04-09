export default function GridOverlay({ opacity = 0.045 }: { opacity?: number }) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'url(/img/bg-pattern.svg)',
        backgroundRepeat: 'repeat',
        opacity,
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}
