import { Card, CardContent } from '@/components/ui/card';

interface StatCardProps {
  number: string;
  label: string;
  trend?: string;
}

export function StatCard({ number, label, trend }: StatCardProps) {
  return (
    <Card className="bg-m8-white border border-m8-dark/10 rounded-m8-lg">
      <CardContent className="p-6 flex flex-col gap-2 items-center text-center">
        <span className="m8-h1-large text-m8-dark">{number}</span>
        <span className="m8-p4 text-m8-muted">{label}</span>
        {trend && <span className="m8-p6 text-m8-reco">{trend}</span>}
      </CardContent>
    </Card>
  );
}
