interface SectionTitleProps {
  title: string;
  isHalf?: boolean;
  className?: string;
}

export default function SectionTitle({ title, isHalf = true, className = '' }: SectionTitleProps) {
  return (
    <div className={`SectionTitle_SectionTitle__fv0YD false ${isHalf ? 'half_title' : ''} ${className}`}>
      <h2 className="section_title color_text" aria-label={title}>
        {title}
      </h2>
    </div>
  );
}
