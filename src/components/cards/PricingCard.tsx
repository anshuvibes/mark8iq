import { ReactNode } from 'react';

interface PricingCardProps {
  plan: string;
  price: string;
  features: string[];
  cta: ReactNode;
}

export function PricingCard({ plan, price, features, cta }: PricingCardProps) {
  return (
    <div className="rounded-[12px] border border-[#EDF0F7] bg-white p-6 flex flex-col gap-4">
      <span className="m8-p3-medium" style={{ color: '#080D19' }}>{plan}</span>
      <span className="m8-h3-xl" style={{ color: '#8E59FF' }}>{price}</span>
      <ul className="flex flex-col gap-2">
        {features.map((f, i) => (
          <li key={i} className="m8-p5 flex items-center gap-2" style={{ color: '#6b7280' }}>
            <span style={{ color: '#7CBC71' }}>✓</span> {f}
          </li>
        ))}
      </ul>
      <div className="mt-auto pt-4">{cta}</div>
    </div>
  );
}
