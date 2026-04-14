import { useRef, useState, useEffect } from 'react';
import type { Suggestion } from '@/data/aiPanelMockData';

interface SuggestionsSectionProps {
  suggestions: Suggestion[];
  onSelect: (suggestion: Suggestion) => void;
  isStale: boolean;
}

const SuggestionsSection = ({ suggestions, onSelect, isStale }: SuggestionsSectionProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollRight(el.scrollWidth - el.scrollLeft - el.clientWidth > 4);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (el) el.addEventListener('scroll', checkScroll, { passive: true });
    return () => el?.removeEventListener('scroll', checkScroll);
  }, [suggestions]);

  return (
    <div style={{ padding: '12px 0 12px', borderBottom: '1px solid rgba(18,24,43,0.06)' }}>
      <div className="m8-p6" style={{
        color: 'var(--color_primary)',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        fontWeight: 500,
        marginBottom: 10,
        padding: '0 16px',
      }}>
        Suggested for you
      </div>

      <div style={{ position: 'relative' }}>
        {/* Scrollable row */}
        <div
          ref={scrollRef}
          style={{
            display: 'flex',
            gap: 8,
            overflowX: 'auto',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            padding: '0 16px',
            WebkitOverflowScrolling: 'touch',
          }}
          className="hide-scrollbar"
        >
          {suggestions.map((s) => (
            <button
              key={s.id}
              onClick={() => onSelect(s)}
              className="suggestion-chip"
              style={{
                flexShrink: 0,
                padding: '8px 14px',
                borderRadius: 999,
                background: 'transparent',
                border: isStale ? '1px dashed rgba(18,24,43,0.15)' : '1px solid rgba(18,24,43,0.12)',
                cursor: 'pointer',
                transition: 'border-color 0.15s, background 0.15s',
                whiteSpace: 'nowrap',
                fontFamily: 'var(--font_primary)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(142,89,255,0.5)';
                e.currentTarget.style.background = 'rgba(142,89,255,0.04)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = isStale ? 'rgba(18,24,43,0.15)' : 'rgba(18,24,43,0.12)';
                e.currentTarget.style.background = 'transparent';
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.background = 'rgba(142,89,255,0.08)';
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.background = 'rgba(142,89,255,0.04)';
              }}
            >
              <span className="m8-p6" style={{ color: 'var(--color_text)', fontSize: 12 }}>{s.question}</span>
            </button>
          ))}
        </div>

        {/* Right fade gradient */}
        {canScrollRight && (
          <div style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            width: 40,
            background: 'linear-gradient(to right, transparent, #FFFFFF)',
            pointerEvents: 'none',
          }} />
        )}
      </div>

      {isStale && (
        <div className="m8-p6" style={{ color: 'rgba(18,24,43,0.4)', marginTop: 8, fontStyle: 'italic', padding: '0 16px', fontSize: 11 }}>
          Filters have changed. Suggestions may not reflect your current view.
        </div>
      )}

      {/* Hide scrollbar CSS */}
      <style>{`.hide-scrollbar::-webkit-scrollbar { display: none; }`}</style>
    </div>
  );
};

export default SuggestionsSection;
