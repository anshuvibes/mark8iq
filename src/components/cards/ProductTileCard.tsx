import { ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface ProductTileCardProps {
  badge: ReactNode;
  name: string;
  description: string;
  link: string;
}

export function ProductTileCard({ badge, name, description, link }: ProductTileCardProps) {
  return (
    <Card className="bg-m8-white border border-m8-dark/10 rounded-m8-lg hover:-translate-y-1 hover:shadow-lg transition-all duration-150">
      <CardContent className="p-6 flex flex-col gap-3">
        <div>{badge}</div>
        <h3 className="m8-p3-medium text-m8-dark">{name}</h3>
        <p className="m8-p5 text-m8-muted">{description}</p>
        <a href={link} className="m8-p5 text-m8-violet hover:underline">Learn more →</a>
      </CardContent>
    </Card>
  );
}
