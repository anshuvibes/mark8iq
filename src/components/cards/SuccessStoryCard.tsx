import { Card, CardContent } from '@/components/ui/card';

interface SuccessStoryCardProps {
  brand: string;
  metric: string;
  excerpt: string;
  date?: string;
}

export function SuccessStoryCard({ brand, metric, excerpt, date }: SuccessStoryCardProps) {
  return (
    <Card className="bg-m8-white border border-m8-dark/10 rounded-m8-lg">
      <CardContent className="p-6 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="m8-p3-medium text-m8-dark">{brand}</span>
          {date && <span className="m8-p6 text-m8-muted">{date}</span>}
        </div>
        <span className="m8-h3-m text-m8-violet">{metric}</span>
        <p className="m8-p5 text-m8-muted">{excerpt}</p>
      </CardContent>
    </Card>
  );
}
