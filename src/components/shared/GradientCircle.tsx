interface GradientCircleProps {
  color?: string;
  opacity?: number;
}

export default function GradientCircle({ color = 'red', opacity = 0.7 }: GradientCircleProps) {
  return (
    <div
      className={`GradientCircle_GradientCircle__mH3g6 bg_${color} gradient_circle`}
      style={{ opacity }}
    />
  );
}
