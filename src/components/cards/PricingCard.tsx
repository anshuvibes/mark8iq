import { ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface PricingCardProps {
  plan: string;
  price: string;
  features: string[];
  cta: ReactNode;
}

export function PricingCard({ plan, price, features, cta }: PricingCardProps) {
  return (
    <Card className="bg-m8-white border border-m8-dark/10 rounded-m8-lg">
      <CardContent className="p-6 flex flex-col gap-4">
        <h3 className="m8-p3-medium text-m8-dark">{plan}</h3>
        <span className="m8-h3-m text-m8-violet">{price}</span>
        <ul className="flex flex-col gap-2">
          {features.map((f, i) => (
            <li key={i} className="m8-p5 text-m8-muted flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-m8-violet" />
              {f}
            </li>
          ))}
        </ul>
        <div className="mt-2">{cta}</div>
      </CardContent>
    </Card>
  );
}
