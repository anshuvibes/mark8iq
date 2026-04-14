import type { Suggestion } from '@/data/aiPanelMockData';

interface SuggestionsSectionProps {
  suggestions: Suggestion[];
  onSelect: (suggestion: Suggestion) => void;
  isStale: boolean;
}

const SuggestionsSection = ({ suggestions, onSelect, isStale }: SuggestionsSectionProps) => {
  return (
    <div style={{ padding: '12px 16px', borderBottom: '1px solid rgba(18,24,43,0.06)' }}>
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
            className="suggestion-chip"
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

      {isStale && (
        <div className="m8-p6" style={{ color: 'rgba(18,24,43,0.4)', marginTop: 8, fontStyle: 'italic', fontSize: 11 }}>
          Filters have changed. Suggestions may not reflect your current view.
        </div>
      )}
    </div>
  );
};

export default SuggestionsSection;
