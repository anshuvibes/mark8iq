interface BlogCardProps {
  date: string;
  title: string;
  excerpt: string;
  link: string;
}

export function BlogCard({ date, title, excerpt, link }: BlogCardProps) {
  return (
    <div className="rounded-[12px] border border-[#EDF0F7] bg-white p-6 flex flex-col gap-3">
      <span className="m8-p6" style={{ color: '#6b7280' }}>{date}</span>
      <h3 className="m8-p3-medium" style={{ color: '#080D19' }}>{title}</h3>
      <p className="m8-p5" style={{ color: '#6b7280' }}>{excerpt}</p>
      <a href={link} className="m8-p5 inline-flex items-center gap-1" style={{ color: '#8E59FF', textDecoration: 'none' }}>
        Read more →
      </a>
    </div>
  );
}
