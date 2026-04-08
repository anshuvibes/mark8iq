import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface FeatureCardProps {
  icon: LucideIcon;
  heading: string;
  body: string;
}

export function FeatureCard({ icon: Icon, heading, body }: FeatureCardProps) {
  return (
    <Card className="bg-m8-white border border-m8-dark/10 rounded-m8-lg hover:-translate-y-1 hover:shadow-lg transition-all duration-150">
      <CardContent className="p-6 flex flex-col gap-4">
        <div className="w-10 h-10 rounded-m8-md bg-m8-violet/10 flex items-center justify-center">
          <Icon className="w-5 h-5 text-m8-violet" />
        </div>
        <h3 className="m8-p3-medium text-m8-dark">{heading}</h3>
        <p className="m8-p5 text-m8-muted">{body}</p>
      </CardContent>
    </Card>
  );
}
