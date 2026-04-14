import { useState, useEffect, useRef } from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import type { AIResponse } from '@/data/aiPanelMockData';

interface AIResponseBlockProps {
  response: AIResponse;
}

/**
 * Builds an ordered list of "reveal steps" from the response,
 * then reveals them one-by-one with a fast typing cadence.
 */
const AIResponseBlock = ({ response }: AIResponseBlockProps) => {
  const [feedback, setFeedback] = useState<'up' | 'down' | null>(null);

  // Each step index corresponds to a piece of content that becomes visible
  // 0  = "Insights" heading
  // 1  = insights divider
  // 2  = insights body
  // 3  = "Root Cause" heading
  // 4  = root cause divider
  // 5  = root cause body
  // 6  = "Recommendations" heading
  // 7  = recommendations divider
  // 8..8+N-1 = each recommendation
  // last = feedback row
  const totalSteps =
    3 + // insights heading + divider + body
    3 + // root cause heading + divider + body
    2 + // recommendations heading + divider
    response.recommendations.length +
    1;  // feedback row

  const [visibleStep, setVisibleStep] = useState(-1);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    let step = -1;
    const tick = () => {
      step++;
      setVisibleStep(step);
      if (step < totalSteps - 1) {
        timerRef.current = window.setTimeout(tick, 60);
      }
    };
    timerRef.current = window.setTimeout(tick, 80);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [totalSteps]);

  const itemStyle = (stepIndex: number): React.CSSProperties => ({
    opacity: visibleStep >= stepIndex ? 1 : 0,
    transform: visibleStep >= stepIndex ? 'translateY(0)' : 'translateY(4px)',
    transition: 'opacity 0.15s ease-out, transform 0.15s ease-out',
  });

  const dividerStyle = (stepIndex: number): React.CSSProperties => ({
    height: 1,
    background: 'rgba(142,89,255,0.15)',
    marginBottom: 10,
    transform: visibleStep >= stepIndex ? 'scaleX(1)' : 'scaleX(0)',
    transformOrigin: 'left',
    transition: 'transform 0.2s ease-out',
  });

  let recStartIndex = 8;

  return (
    <div className="ai-panel-response-block" style={{ padding: '16px 0' }}>
      {/* INSIGHTS */}
      <div style={{ marginBottom: 16 }}>
        <div className="m8-p6" style={{ color: 'var(--color_primary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6, fontWeight: 500, ...itemStyle(0) }}>
          Insights
        </div>
        <div style={dividerStyle(1)} />
        <div className="m8-p5" style={{ color: 'var(--color_text)', ...itemStyle(2) }}>
          {response.insights}
        </div>
      </div>

      {/* ROOT CAUSE */}
      <div style={{ marginBottom: 16 }}>
        <div className="m8-p6" style={{ color: 'var(--color_primary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6, fontWeight: 500, ...itemStyle(3) }}>
          Root Cause
        </div>
        <div style={dividerStyle(4)} />
        <div className="m8-p5" style={{ color: 'var(--color_text)', ...itemStyle(5) }}>
          {response.rootCause}
        </div>
      </div>

      {/* RECOMMENDATIONS */}
      <div style={{ marginBottom: 12 }}>
        <div className="m8-p6" style={{ color: 'var(--color_primary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6, fontWeight: 500, ...itemStyle(6) }}>
          Recommendations
        </div>
        <div style={dividerStyle(7)} />
        <ol style={{ margin: 0, paddingLeft: 18 }}>
          {response.recommendations.map((rec, i) => (
            <li key={i} className="m8-p5" style={{ color: 'var(--color_text)', marginBottom: 6, ...itemStyle(recStartIndex + i) }}>
              {rec}
            </li>
          ))}
        </ol>
      </div>

      {/* FEEDBACK ROW */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingTop: 8, ...itemStyle(totalSteps - 1) }}>
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
