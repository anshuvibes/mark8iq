import { useState } from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import type { AIResponse } from '@/data/aiPanelMockData';

interface AIResponseBlockProps {
  response: AIResponse;
}

const AIResponseBlock = ({ response }: AIResponseBlockProps) => {
  const [feedback, setFeedback] = useState<'up' | 'down' | null>(null);

  return (
    <div className="ai-panel-response-block" style={{ padding: '16px 0' }}>
      {/* INSIGHTS */}
      <div style={{ marginBottom: 16 }}>
        <div className="m8-p6" style={{ color: 'var(--color_primary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6, fontWeight: 500 }}>
          Insights
        </div>
        <div style={{ height: 1, background: 'rgba(142,89,255,0.15)', marginBottom: 10 }} />
        <div className="m8-p5" style={{ color: 'var(--color_text)' }}>
          {response.insights}
        </div>
      </div>

      {/* ROOT CAUSE */}
      <div style={{ marginBottom: 16 }}>
        <div className="m8-p6" style={{ color: 'var(--color_primary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6, fontWeight: 500 }}>
          Root Cause
        </div>
        <div style={{ height: 1, background: 'rgba(142,89,255,0.15)', marginBottom: 10 }} />
        <div className="m8-p5" style={{ color: 'var(--color_text)' }}>
          {response.rootCause}
        </div>
      </div>

      {/* RECOMMENDATIONS */}
      <div style={{ marginBottom: 12 }}>
        <div className="m8-p6" style={{ color: 'var(--color_primary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6, fontWeight: 500 }}>
          Recommendations
        </div>
        <div style={{ height: 1, background: 'rgba(142,89,255,0.15)', marginBottom: 10 }} />
        <ol style={{ margin: 0, paddingLeft: 18 }}>
          {response.recommendations.map((rec, i) => (
            <li key={i} className="m8-p5" style={{ color: 'var(--color_text)', marginBottom: 6 }}>
              {rec}
            </li>
          ))}
        </ol>
      </div>

      {/* FEEDBACK ROW */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingTop: 8 }}>
        <span className="m8-p6" style={{ color: 'rgba(18,24,43,0.45)' }}>Was this helpful?</span>
        <button
          onClick={() => setFeedback(feedback === 'up' ? null : 'up')}
          style={{
            background: 'none', border: 'none', cursor: 'pointer', padding: 4,
            color: feedback === 'up' ? 'var(--color_primary)' : 'rgba(18,24,43,0.3)',
            transition: 'color 0.15s',
          }}
        >
          <ThumbsUp size={14} fill={feedback === 'up' ? 'currentColor' : 'none'} />
        </button>
        <button
          onClick={() => setFeedback(feedback === 'down' ? null : 'down')}
          style={{
            background: 'none', border: 'none', cursor: 'pointer', padding: 4,
            color: feedback === 'down' ? '#FC7459' : 'rgba(18,24,43,0.3)',
            transition: 'color 0.15s',
          }}
        >
          <ThumbsDown size={14} fill={feedback === 'down' ? 'currentColor' : 'none'} />
        </button>
      </div>
    </div>
  );
};

export default AIResponseBlock;
