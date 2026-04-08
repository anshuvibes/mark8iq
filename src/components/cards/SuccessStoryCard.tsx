interface SuccessStoryCardProps {
  brand: string;
  metric: string;
  excerpt: string;
  date: string;
}

export function SuccessStoryCard({ brand, metric, excerpt, date }: SuccessStoryCardProps) {
  return (
    <div className="rounded-[12px] border border-[#EDF0F7] bg-white p-6 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="m8-p3-medium" style={{ color: '#080D19' }}>{brand}</span>
        <span className="m8-p6" style={{ color: '#6b7280' }}>{date}</span>
      </div>
      <span className="m8-h4" style={{ color: '#8E59FF' }}>{metric}</span>
      <p className="m8-p5" style={{ color: '#6b7280' }}>{excerpt}</p>
    </div>
  );
}
