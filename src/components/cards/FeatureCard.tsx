import { ReactNode } from 'react';

interface FeatureCardProps {
  icon: ReactNode;
  heading: string;
  body: string;
}

export function FeatureCard({ icon, heading, body }: FeatureCardProps) {
  return (
    <div className="rounded-[12px] border border-[#EDF0F7] bg-white p-6 flex flex-col gap-4">
      <div className="w-10 h-10 rounded-[8px] bg-[#8E59FF]/10 flex items-center justify-center text-[#8E59FF]">
        {icon}
      </div>
      <h3 className="m8-p3-medium" style={{ color: '#080D19' }}>{heading}</h3>
      <p className="m8-p5" style={{ color: '#6b7280' }}>{body}</p>
    </div>
  );
}
