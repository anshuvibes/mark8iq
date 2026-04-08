import { Card, CardContent } from '@/components/ui/card';

interface BlogCardProps {
  date: string;
  title: string;
  excerpt: string;
  link: string;
}

export function BlogCard({ date, title, excerpt, link }: BlogCardProps) {
  return (
    <Card className="bg-m8-white border border-m8-dark/10 rounded-m8-lg hover:-translate-y-1 hover:shadow-lg transition-all duration-150">
      <CardContent className="p-6 flex flex-col gap-3">
        <span className="m8-p6 text-m8-muted">{date}</span>
        <h3 className="m8-p3-medium text-m8-dark">{title}</h3>
        <p className="m8-p5 text-m8-muted">{excerpt}</p>
        <a href={link} className="m8-p5 text-m8-violet hover:underline">Read more →</a>
      </CardContent>
    </Card>
  );
}
