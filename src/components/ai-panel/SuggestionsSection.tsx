import type { Suggestion } from '@/data/aiPanelMockData';

interface SuggestionsSectionProps {
  suggestions: Suggestion[];
  onSelect: (suggestion: Suggestion) => void;
  isStale: boolean;
}

const SuggestionsSection = ({ suggestions, onSelect, isStale }: SuggestionsSectionProps) => {
  return (
    <div style={{ padding: '12px 16px', borderBottom: '1px solid rgba(18,24,43,0.06)' }}>
      <div className="m8-p6" style={{ color: 'var(--color_primary)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 500, marginBottom: 10 }}>
        Suggested for you
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {suggestions.map((s) => (
          <button
            key={s.id}
            onClick={() => onSelect(s)}
            style={{
              display: 'block',
              width: '100%',
              textAlign: 'left',
              padding: '10px 12px',
              borderRadius: 'var(--m8-radius-md)',
              background: 'rgba(142,89,255,0.04)',
              border: '1px solid rgba(142,89,255,0.1)',
              cursor: 'pointer',
              transition: 'background 0.15s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(142,89,255,0.08)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(142,89,255,0.04)'; }}
          >
            <span className="m8-p6" style={{ color: 'var(--color_text)' }}>{s.question}</span>
          </button>
        ))}
      </div>

      {isStale && (
        <div className="m8-p6" style={{ color: 'rgba(18,24,43,0.4)', marginTop: 8, fontStyle: 'italic' }}>
          Filters have changed. Suggestions may not reflect your current view.
        </div>
      )}
    </div>
  );
};

export default SuggestionsSection;
