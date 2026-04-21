import { useEffect, useRef, useState } from 'react';
import { mockHalts, mockResponses } from '@/data/aiPanelMockData';

export const DEMO_CYCLE = [
  { halt: mockHalts.find(h => h.id === 'h1')!, response: mockResponses.h1 },
  { halt: mockHalts.find(h => h.id === 'h2')!, response: mockResponses.h2 },
  { halt: mockHalts.find(h => h.id === 'h3')!, response: mockResponses.h3 },
  { halt: mockHalts.find(h => h.id === 'h4')!, response: mockResponses.h4 },
  { halt: mockHalts.find(h => h.id === 'h5')!, response: mockResponses.h5 },
];

export type DemoPhase =
  | 'idle'
  | 'pill'
  | 'loading'
  | 'insights'
  | 'rootcause'
  | 'recommendations'
  | 'complete'
  | 'fading';

interface UseAgentMarkDemoOptions {
  /** When false, demo timers are not scheduled. */
  enabled: boolean;
}

interface UseAgentMarkDemoReturn {
  phase: DemoPhase;
  cycleIndex: number;
  current: (typeof DEMO_CYCLE)[number];
  visibleWords: number;
  visibleRcWords: number;
  visibleBullets: number;
  opacity: number;
  reset: () => void;
}

const SECTION_GAP = 80;
const HOLD_TIME = 3000;
const FADE_TIME = 600;
const LOADING_TIME = 800;

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
}

export function useAgentMarkDemo({ enabled }: UseAgentMarkDemoOptions): UseAgentMarkDemoReturn {
  const [phase, setPhase] = useState<DemoPhase>('idle');
  const [cycleIndex, setCycleIndex] = useState(0);
  const [visibleWords, setVisibleWords] = useState(0);
  const [visibleRcWords, setVisibleRcWords] = useState(0);
  const [visibleBullets, setVisibleBullets] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const pausedRef = useRef(false);

  // Pause on tab background (E11)
  useEffect(() => {
    const onVis = () => {
      pausedRef.current = document.hidden;
    };
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  useEffect(() => {
    if (!enabled) {
      setPhase('idle');
      setVisibleWords(0);
      setVisibleRcWords(0);
      setVisibleBullets(0);
      setOpacity(1);
      return;
    }

    const reduced = prefersReducedMotion();
    const WORD_SPEED = reduced ? 12 : 25;

    const timeouts: ReturnType<typeof setTimeout>[] = [];
    const item = DEMO_CYCLE[cycleIndex % DEMO_CYCLE.length];
    const insightsWords = item.response.insights.split(' ');
    const rcWordsArr = item.response.rootCause.split(' ');

    const safeTimeout = (fn: () => void, ms: number) => {
      const t = setTimeout(() => {
        if (pausedRef.current) {
          // Re-schedule in 250ms loop while hidden
          const retry = setInterval(() => {
            if (!pausedRef.current) {
              clearInterval(retry);
              fn();
            }
          }, 250);
          timeouts.push(retry as unknown as ReturnType<typeof setTimeout>);
          return;
        }
        fn();
      }, ms);
      timeouts.push(t);
    };

    setOpacity(1);
    setVisibleWords(0);
    setVisibleRcWords(0);
    setVisibleBullets(0);
    setPhase('idle');

    safeTimeout(() => setPhase('pill'), 300);
    safeTimeout(() => setPhase('loading'), 900);

    const insightsStart = 900 + LOADING_TIME;
    safeTimeout(() => {
      setPhase('insights');
      insightsWords.forEach((_, i) => {
        safeTimeout(() => setVisibleWords(i + 1), i * WORD_SPEED);
      });
    }, insightsStart);

    const insightsDuration = insightsWords.length * WORD_SPEED;
    const rcStart = insightsStart + insightsDuration + SECTION_GAP;
    safeTimeout(() => {
      setPhase('rootcause');
      rcWordsArr.forEach((_, i) => {
        safeTimeout(() => setVisibleRcWords(i + 1), i * WORD_SPEED);
      });
    }, rcStart);

    const rcDuration = rcWordsArr.length * WORD_SPEED;
    const recsStart = rcStart + rcDuration + SECTION_GAP;
    safeTimeout(() => {
      setPhase('recommendations');
      item.response.recommendations.forEach((_, i) => {
        safeTimeout(() => setVisibleBullets(i + 1), i * 600);
      });
    }, recsStart);

    const totalTyping = recsStart + item.response.recommendations.length * 600;
    safeTimeout(() => setPhase('complete'), totalTyping + 200);

    safeTimeout(() => {
      setPhase('fading');
      setOpacity(0);
    }, totalTyping + 200 + HOLD_TIME);

    safeTimeout(() => {
      setCycleIndex(i => i + 1);
    }, totalTyping + 200 + HOLD_TIME + FADE_TIME);

    return () => {
      timeouts.forEach(t => {
        clearTimeout(t);
        clearInterval(t as unknown as ReturnType<typeof setInterval>);
      });
    };
  }, [cycleIndex, enabled]);

  const reset = () => {
    setCycleIndex(0);
    setPhase('idle');
    setVisibleWords(0);
    setVisibleRcWords(0);
    setVisibleBullets(0);
    setOpacity(1);
  };

  const current = DEMO_CYCLE[cycleIndex % DEMO_CYCLE.length];

  return {
    phase,
    cycleIndex,
    current,
    visibleWords,
    visibleRcWords,
    visibleBullets,
    opacity,
    reset,
  };
}
