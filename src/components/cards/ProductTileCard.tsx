import { ReactNode } from 'react';

interface ProductTileCardProps {
  badge: ReactNode;
  name: string;
  description: string;
  link: string;
}

export function ProductTileCard({ badge, name, description, link }: ProductTileCardProps) {
  return (
    <div className="rounded-[12px] border border-[#EDF0F7] bg-white p-6 flex flex-col gap-3">
      <div>{badge}</div>
      <h3 className="m8-p3-medium" style={{ color: '#080D19' }}>{name}</h3>
      <p className="m8-p5" style={{ color: '#6b7280' }}>{description}</p>
      <a href={link} className="m8-p5 inline-flex items-center gap-1" style={{ color: '#8E59FF', textDecoration: 'none' }}>
        Learn more →
      </a>
    </div>
  );
}
