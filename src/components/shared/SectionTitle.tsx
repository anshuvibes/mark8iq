interface SectionTitleProps {
  title: string;
  isHalf?: boolean;
  className?: string;
}

export default function SectionTitle({ title, isHalf = true, className = '' }: SectionTitleProps) {
  // Split title into words, render each character in its own span (matching original animation structure)
  const words = title.split(/(\s+)/);

  return (
    <div className={`SectionTitle_SectionTitle__fv0YD false ${isHalf ? 'half_title' : ''} ${className}`}>
      <h2 className="section_title color_text" aria-label={title}>
        {words.map((word, wi) => {
          if (/^\s+$/.test(word)) return ' ';
          return (
            <span key={wi}>
              <div aria-hidden="true" style={{ position: 'relative', display: 'inline-block' }}>
                {word.split('').map((char, ci) => (
                  <div
                    key={ci}
                    aria-hidden="true"
                    style={{
                      position: 'relative',
                      display: 'inline-block',
                      translate: 'none',
                      rotate: 'none',
                      scale: 'none',
                      opacity: 1,
                      transform: 'translate(0px, 0px)',
                    }}
                  >
                    {char}
                  </div>
                ))}
              </div>{' '}
            </span>
          );
        })}
      </h2>
    </div>
  );
}
