import { useRef, useState, useEffect, useCallback } from 'react';
import type { Suggestion } from '@/data/aiPanelMockData';

interface SuggestionsSectionProps {
  suggestions: Suggestion[];
  onSelect: (suggestion: Suggestion) => void;
  isStale: boolean;
  mode: 'vertical' | 'horizontal';
}

const SuggestionsSection = ({ suggestions, onSelect, isStale, mode }: SuggestionsSectionProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollRight(el.scrollWidth - el.scrollLeft - el.clientWidth > 4);
  }, []);

  useEffect(() => {
    if (mode !== 'horizontal') return;
    checkScroll();
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll);
      return () => el.removeEventListener('scroll', checkScroll);
    }
  }, [mode, checkScroll]);

  if (mode === 'vertical') {
    return (
      <div style={{ padding: '12px 16px', borderTop: '1px solid rgba(18,24,43,0.06)' }}>
        <div className="m8-p6" style={{
          color: 'var(--color_primary)',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          fontWeight: 500,
          marginBottom: 10,
        }}>
          Suggested for you
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {suggestions.map((s) => (
            <button
              key={s.id}
              onClick={() => onSelect(s)}
              style={{
                width: '100%',
                padding: '8px 14px',
                borderRadius: 999,
                background: 'transparent',
                border: isStale ? '1px dashed rgba(18,24,43,0.15)' : '1px solid rgba(18,24,43,0.12)',
                cursor: 'pointer',
                transition: 'border-color 0.15s, background 0.15s',
                textAlign: 'left',
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
            >
              <span className="m8-p6" style={{ color: 'var(--color_text)', fontSize: 12 }}>{s.question}</span>
            </button>
          ))}
        </div>

        {isStale && (
          <div className="m8-p6" style={{ color: 'rgba(18,24,43,0.4)', marginTop: 8, fontStyle: 'italic', fontSize: 11 }}>
            Filters have changed. Suggestions may not reflect your current view.
          </div>
        )}
      </div>
    );
  }

  // Horizontal mode
  return (
    <div style={{ padding: '8px 16px', position: 'relative' }}>
      <div
        ref={scrollRef}
        style={{
          display: 'flex',
          gap: 6,
          overflowX: 'auto',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
        className="hide-scrollbar"
      >
        {suggestions.map((s) => (
          <button
            key={s.id}
            onClick={() => onSelect(s)}
            style={{
              padding: '6px 12px',
              borderRadius: 999,
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              transition: 'background 0.15s',
              whiteSpace: 'nowrap',
              fontFamily: 'var(--font_primary)',
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(142,89,255,0.04)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
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
          right: 16,
          bottom: 0,
          width: 40,
          background: 'linear-gradient(to right, transparent, #FFFFFF)',
          pointerEvents: 'none',
        }} />
      )}
    </div>
  );
};

export default SuggestionsSection;
