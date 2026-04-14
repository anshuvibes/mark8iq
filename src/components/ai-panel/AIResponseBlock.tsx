import { useState, useEffect, useRef } from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import type { AIResponse } from '@/data/aiPanelMockData';

interface AIResponseBlockProps {
  response: AIResponse;
  onTypingComplete?: () => void;
}

/** Splits text into words and reveals them one by one */
const TypedText = ({ text, startDelay, speed = 30, onDone, onStart }: { text: string; startDelay: number; speed?: number; onDone?: () => void; onStart?: () => void }) => {
  const words = text.split(' ');
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const startTimer = setTimeout(() => {
      started.current = true;
      onStart?.();
      let i = 0;
      const tick = () => {
        i++;
        setCount(i);
        if (i < words.length) {
          setTimeout(tick, speed);
        } else {
          onDone?.();
        }
      };
      tick();
    }, startDelay);
    return () => clearTimeout(startTimer);
  }, []);

  if (count === 0) return null;
  return <>{words.slice(0, count).join(' ')}</>;
};

/** Reveals element after a delay with a subtle fade */
const DelayedReveal = ({ delay, children, onDone }: { delay: number; children: React.ReactNode; onDone?: () => void }) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => { setVisible(true); onDone?.(); }, delay);
    return () => clearTimeout(t);
  }, []);
  return (
    <div style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(3px)',
      transition: 'opacity 0.12s ease-out, transform 0.12s ease-out',
    }}>
      {children}
    </div>
  );
};

/** A list item hidden until typing starts */
const RecItem = ({ text, startDelay, speed }: { text: string; startDelay: number; speed: number }) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), startDelay);
    return () => clearTimeout(t);
  }, [startDelay]);

  if (!visible) return null;

  return (
    <li style={{ color: 'var(--color_text)', marginBottom: 6, fontSize: 13, fontWeight: 400, lineHeight: '1.5', fontFamily: 'var(--font_primary)' }}>
      <TypedText text={text} startDelay={0} speed={speed} />
    </li>
  );
};

/** Draws a divider line from left to right */
const AnimatedDivider = ({ delay }: { delay: number }) => {
  const [drawn, setDrawn] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setDrawn(true), delay);
    return () => clearTimeout(t);
  }, []);
  return (
    <div style={{
      height: 1,
      background: 'rgba(142,89,255,0.15)',
      marginBottom: 10,
      transform: drawn ? 'scaleX(1)' : 'scaleX(0)',
      transformOrigin: 'left',
      transition: 'transform 0.2s ease-out',
    }} />
  );
};

const WORD_SPEED = 25; // ms per word
const SECTION_GAP = 80; // ms pause between sections

const AIResponseBlock = ({ response, onTypingComplete }: AIResponseBlockProps) => {
  const [feedback, setFeedback] = useState<'up' | 'down' | null>(null);
  const [phase, setPhase] = useState(0);
  // Phases:
  // 0 = start
  // 1 = insights heading visible
  // 2 = insights divider drawn
  // 3 = insights body typing
  // 4 = insights body done
  // 5 = root cause heading
  // 6 = root cause divider
  // 7 = root cause body typing
  // 8 = root cause body done
  // 9 = recommendations heading
  // 10 = recommendations divider
  // 11..11+N-1 = each recommendation typing
  // 11+N = feedback row

  const insightsWords = response.insights.split(' ').length;
  const rootCauseWords = response.rootCause.split(' ').length;
  const recCount = response.recommendations.length;

  // Calculate timing offsets
  let t = 0;

  // Insights heading
  const insightsHeadingAt = t; t += 60;
  // Insights divider
  const insightsDividerAt = t; t += 200;
  // Insights body
  const insightsBodyAt = t; t += insightsWords * WORD_SPEED + SECTION_GAP;
  // Root cause heading
  const rootCauseHeadingAt = t; t += 60;
  // Root cause divider
  const rootCauseDividerAt = t; t += 200;
  // Root cause body
  const rootCauseBodyAt = t; t += rootCauseWords * WORD_SPEED + SECTION_GAP;
  // Recommendations heading
  const recsHeadingAt = t; t += 60;
  // Recommendations divider
  const recsDividerAt = t; t += 200;
  // Each recommendation
  const recTimings: number[] = [];
  for (let i = 0; i < recCount; i++) {
    recTimings.push(t);
    const words = response.recommendations[i].split(' ').length;
    t += words * WORD_SPEED + 40;
  }
  // Feedback row
  const feedbackAt = t + 100;

  return (
    <div className="ai-panel-response-block" style={{ padding: '16px 0' }}>
      {/* INSIGHTS */}
      <div style={{ marginBottom: 16 }}>
        <DelayedReveal delay={insightsHeadingAt}>
          <div style={{ color: 'var(--color_primary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6, fontWeight: 500, fontSize: 10, fontFamily: 'var(--font_primary)' }}>
            Insights
          </div>
        </DelayedReveal>
        <AnimatedDivider delay={insightsDividerAt} />
        <div style={{ color: 'var(--color_text)', minHeight: 20, fontSize: 13, fontWeight: 400, lineHeight: '1.6', fontFamily: 'var(--font_primary)' }}>
          <TypedText text={response.insights} startDelay={insightsBodyAt} speed={WORD_SPEED} />
        </div>
      </div>

      {/* ROOT CAUSE */}
      <div style={{ marginBottom: 16 }}>
        <DelayedReveal delay={rootCauseHeadingAt}>
          <div style={{ color: 'var(--color_primary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6, fontWeight: 500, fontSize: 10, fontFamily: 'var(--font_primary)' }}>
            Root Cause
          </div>
        </DelayedReveal>
        <AnimatedDivider delay={rootCauseDividerAt} />
        <div style={{ color: 'var(--color_text)', minHeight: 20, fontSize: 13, fontWeight: 400, lineHeight: '1.6', fontFamily: 'var(--font_primary)' }}>
          <TypedText text={response.rootCause} startDelay={rootCauseBodyAt} speed={WORD_SPEED} />
        </div>
      </div>

      {/* RECOMMENDATIONS */}
      <div style={{ marginBottom: 12 }}>
        <DelayedReveal delay={recsHeadingAt}>
          <div style={{ color: 'var(--color_primary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6, fontWeight: 500, fontSize: 10, fontFamily: 'var(--font_primary)' }}>
            Recommendations
          </div>
        </DelayedReveal>
        <AnimatedDivider delay={recsDividerAt} />
        <ol style={{ margin: 0, paddingLeft: 18 }}>
          {response.recommendations.map((rec, i) => (
            <RecItem key={i} text={rec} startDelay={recTimings[i]} speed={WORD_SPEED} />
          ))}
        </ol>
      </div>

      {/* FEEDBACK ROW */}
      <DelayedReveal delay={feedbackAt} onDone={onTypingComplete}>
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
      </DelayedReveal>
    </div>
  );
};

export default AIResponseBlock;
