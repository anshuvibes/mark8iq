import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import AgentMarkInput from './AgentMarkInput';
import AgentMarkOrb from './AgentMarkOrb';

// ─── FINDINGS DATA ────────────────────────────────────────────────────────────

const FINDINGS = [
  {
    query: 'Your Amazon ROAS dropped overnight.',
    insights: 'Amazon ROAS dropped 14% between 11pm and 6am across Home and Kitchen. 3 campaigns affected. Estimated missed revenue overnight: ₹34,000.',
    rootCause: 'A competitor increased bids on your top 3 exact match keywords. Your bids are now 18% below category average during high-traffic slots.',
    recommendations: [
      'Raise bids by 15% on these 3 keywords immediately. Estimated ROAS recovery: 4 to 6 hours.',
    ],
    queryDuration: 2000,
    holdTime: 4000,
    roleIndicator: null as string | null,
  },
  {
    query: 'How is Blinkit performing vs Amazon this week?',
    insights: 'Blinkit GMV up 23% week on week. Amazon GMV flat for the same period. Quick commerce delivering 40% lower ad spend for equivalent revenue.',
    rootCause: "Blinkit visibility score improved after last week's content update. Amazon listing has not been refreshed in 31 days. Algorithm is deprioritising it.",
    recommendations: [
      'Refresh Amazon listing this week.',
      'Reallocate 12% of Amazon ad budget to Blinkit to capitalise on current momentum.',
    ],
    queryDuration: 2500,
    holdTime: 4000,
    roleIndicator: null as string | null,
  },
  {
    query: 'Give me the CXO view of this month.',
    insights: 'Blended ROAS across all marketplaces: 4.2x. GMV on track for monthly target. One financial leakage identified requiring immediate attention.',
    rootCause: 'Returns on Myntra up 34% this month. Concentrated in one SKU. Estimated monthly leakage: ₹8.4 lakh.',
    recommendations: [
      'Flag to ops team for listing review immediately.',
      'If unresolved in 48 hours, consider temporary delisting of that SKU to stop leakage.',
    ],
    queryDuration: 2000,
    holdTime: 5000,
    roleIndicator: 'Responding as: CXO view' as string | null,
  },
  {
    query: 'What did I miss while I was in meetings today?',
    insights: '4 signals flagged while you were offline today. 1 critical. Flagged at 2.14pm. Flipkart search rank dropped for your top keyword. Now position 14. Was position 6 this morning.',
    rootCause: 'A new seller entered the category at 11am with aggressive pricing 12% below yours. Already capturing 31% of impressions on that keyword.',
    recommendations: [
      'Three competitive response options prepared. Review and approve your preferred action.',
      'Time-sensitive: every hour at current rate costs approximately ₹18,000 in lost visibility.',
    ],
    queryDuration: 2500,
    holdTime: 4000,
    roleIndicator: null as string | null,
  },
];

// ─── TIMING CONSTANTS ─────────────────────────────────────────────────────────

const CHAR_SPEED = 50;
const WORD_SPEED = 28;
const SECTION_GAP = 80;
const LOADING_TIME = 700;
const REC_STAGGER = 700;
const FADE_TIME = 500;
const CLOSING_HOLD = 4000;
const ROLE_INDICATOR_HOLD = 3000;

type Phase =
  | 'idle'
  | 'typing-query'
  | 'loading'
  | 'insights'
  | 'rootcause'
  | 'recommendations'
  | 'complete'
  | 'closing';

// ─── COMPONENT ────────────────────────────────────────────────────────────────

export default function AgentMarkV2() {
  const [findingIndex, setFindingIndex] = useState(0);

  const [phase, setPhase] = useState<Phase>('idle');
  const [visibleQueryChars, setVisibleQueryChars] = useState(0);
  const [visibleWords, setVisibleWords] = useState(0);
  const [visibleRcWords, setVisibleRcWords] = useState(0);
  const [visibleBullets, setVisibleBullets] = useState(0);
  const [showRoleIndicator, setShowRoleIndicator] = useState(false);
  const [closingVisible, setClosingVisible] = useState(false);

  // Transition between findings
  const [opacity, setOpacity] = useState(1);
  const [slideY, setSlideY] = useState(0);

  useEffect(() => {
    const ts: ReturnType<typeof setTimeout>[] = [];
    const idx = findingIndex % FINDINGS.length;
    const finding = FINDINGS[idx];
    const isLastFinding = idx === FINDINGS.length - 1;
    const query = finding.query;
    const insightsWords = finding.insights.split(' ');
    const rcWords = finding.rootCause.split(' ');

    // Reset typing state for the new finding
    setVisibleQueryChars(0);
    setVisibleWords(0);
    setVisibleRcWords(0);
    setVisibleBullets(0);
    setShowRoleIndicator(false);
    setClosingVisible(false);
    setPhase('idle');
    setOpacity(1);
    setSlideY(0);

    // Phase: typing query
    ts.push(setTimeout(() => {
      setPhase('typing-query');
      query.split('').forEach((_, i) => {
        ts.push(setTimeout(() => setVisibleQueryChars(i + 1), i * CHAR_SPEED));
      });
    }, 300));

    const queryEnd = 300 + query.length * CHAR_SPEED;

    // Phase: loading
    ts.push(setTimeout(() => setPhase('loading'), queryEnd + 100));

    // Role indicator (Finding 3 only)
    if (finding.roleIndicator) {
      ts.push(setTimeout(() => setShowRoleIndicator(true), queryEnd + 100 + Math.floor(LOADING_TIME * 0.4)));
      ts.push(setTimeout(() => setShowRoleIndicator(false), queryEnd + 100 + Math.floor(LOADING_TIME * 0.4) + ROLE_INDICATOR_HOLD));
    }

    // Phase: insights
    const insightsStart = queryEnd + 100 + LOADING_TIME;
    ts.push(setTimeout(() => {
      setPhase('insights');
      insightsWords.forEach((_, i) => {
        ts.push(setTimeout(() => setVisibleWords(i + 1), i * WORD_SPEED));
      });
    }, insightsStart));

    const insightsDone = insightsStart + insightsWords.length * WORD_SPEED;

    // Phase: rootcause
    const rcStart = insightsDone + SECTION_GAP;
    ts.push(setTimeout(() => {
      setPhase('rootcause');
      rcWords.forEach((_, i) => {
        ts.push(setTimeout(() => setVisibleRcWords(i + 1), i * WORD_SPEED));
      });
    }, rcStart));

    const rcDone = rcStart + rcWords.length * WORD_SPEED;

    // Phase: recommendations
    const recsStart = rcDone + SECTION_GAP;
    ts.push(setTimeout(() => {
      setPhase('recommendations');
      finding.recommendations.forEach((_, i) => {
        ts.push(setTimeout(() => setVisibleBullets(i + 1), i * REC_STAGGER));
      });
    }, recsStart));

    const recsDone = recsStart + finding.recommendations.length * REC_STAGGER;

    // Phase: complete (hold)
    ts.push(setTimeout(() => setPhase('complete'), recsDone + 200));

    const holdEnd = recsDone + 200 + finding.holdTime;

    if (isLastFinding) {
      // Closing line after Finding 4
      ts.push(setTimeout(() => {
        setPhase('closing');
        setClosingVisible(true);
      }, holdEnd));

      // Fade out after closing hold, then loop back to Finding 1
      ts.push(setTimeout(() => {
        setOpacity(0);
        setSlideY(-20);
      }, holdEnd + CLOSING_HOLD));

      ts.push(setTimeout(() => {
        setFindingIndex(0);
      }, holdEnd + CLOSING_HOLD + FADE_TIME + 300));
    } else {
      // Fade out current, advance to next
      ts.push(setTimeout(() => {
        setOpacity(0);
        setSlideY(-20);
      }, holdEnd));

      ts.push(setTimeout(() => {
        setFindingIndex(i => i + 1);
      }, holdEnd + FADE_TIME + 300));
    }

    return () => ts.forEach(clearTimeout);
  }, [findingIndex]);

  const activeFinding = FINDINGS[findingIndex % FINDINGS.length];
  const insightsWordList = activeFinding.insights.split(' ');
  const rcWordList = activeFinding.rootCause.split(' ');
  const showResponse = ['insights', 'rootcause', 'recommendations', 'complete', 'closing'].includes(phase);

  return (
    <section
      data-section="agent-mark"
      style={{
        padding: '100px 0',
        position: 'relative',
        background: 'transparent',
        overflow: 'hidden',
      }}
    >
      <style>{`
        @keyframes dotPulse {
          0%, 60%, 100% { opacity: 0.3; transform: scale(1); }
          30% { opacity: 1; transform: scale(1.3); }
        }
        @keyframes caretBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .agent-mark-scroll::-webkit-scrollbar { display: none; }
      `}</style>

      {/* Eyebrow + headline */}
      <div className="container" style={{ textAlign: 'center', marginBottom: '40px', position: 'relative', zIndex: 1 }}>
        <motion.p
          className="m8-eyebrow"
          style={{ color: '#8E59FF', marginBottom: '12px' }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
        >
          MEET AGENT MARK
        </motion.p>
        <motion.h2
          className="m8-h2"
          style={{ color: 'var(--v2-text)', margin: 0 }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ delay: 0.05 }}
        >
          Agent Mark.<br />Your round-the-clock commerce analyst.
        </motion.h2>
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          border: '1px solid var(--v2-border)',
          borderRadius: '20px',
          overflow: 'hidden',
          background: '#ffffff',
          backgroundImage: 'linear-gradient(118.99deg, #F3EFFD 1.54%, #EBF5FE 25.36%, #D9C8FE 49.17%)',
          padding: '60px 40px',
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0',
          }}>

            {/* Orb */}
            <motion.div
              style={{ marginBottom: '16px', display: 'flex', justifyContent: 'center' }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              <AgentMarkOrb size="180px" />
            </motion.div>

            {/* Intro text */}
            <motion.div
              style={{ textAlign: 'center', marginBottom: '32px' }}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: 0.15 }}
            >
              <p style={{
                fontFamily: "'Saira', sans-serif",
                fontSize: '24px',
                fontWeight: 500,
                lineHeight: '36px',
                background: 'linear-gradient(90deg, #c192cf, #608ff6 50%, #6a26fa)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                margin: '0 0 4px 0',
              }}>
                Hello, I'm Agent Mark.
              </p>
              <p style={{
                fontFamily: "'Saira', sans-serif",
                fontSize: '24px',
                fontWeight: 500,
                lineHeight: '36px',
                color: '#12182b',
                margin: 0,
              }}>
                Ask me anything about your commerce data.
              </p>
            </motion.div>

            {/* Animated chat window */}
            <div style={{ width: '100%', maxWidth: '960px' }}>
              <div style={{
                background: '#ffffff',
                borderRadius: '5px',
                boxShadow: '0 4px 24px rgba(130,130,130,0.08)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
              }}>

                {/* Opening state header */}
                <div style={{
                  padding: '20px 24px 16px',
                  borderBottom: '1px solid #EDF0F7',
                }}>
                  <p className="m8-eyebrow" style={{ color: '#8E59FF', marginBottom: '6px' }}>
                    WHILE YOU WERE AWAY
                  </p>
                  <p style={{
                    fontFamily: "'Saira', sans-serif",
                    fontSize: '14px',
                    fontWeight: 400,
                    lineHeight: '22px',
                    color: '#12182b',
                    margin: 0,
                  }}>
                    4 signals flagged. 1 critical. Reviewed at 3.47am.
                  </p>
                </div>

                {/* Single-finding messages area */}
                <div
                  style={{
                    padding: '24px',
                    minHeight: '420px',
                    maxHeight: '420px',
                    overflow: 'hidden',
                    opacity,
                    transform: `translateY(${slideY}px)`,
                    transition: `opacity ${FADE_TIME}ms ease-out, transform ${FADE_TIME}ms ease-out`,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '24px',
                  }}
                >
                  {/* Active finding */}
                  {phase !== 'idle' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      {/* User query — char by char */}
                      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <div style={{
                          background: '#F5F0FF',
                          border: '1px solid #E2D6FF',
                          borderRadius: '12px 12px 2px 12px',
                          padding: '10px 16px',
                          maxWidth: '70%',
                        }}>
                          <p style={{ fontFamily: "'Saira', sans-serif", fontSize: '14px', fontWeight: 400, color: '#12182b', margin: 0, lineHeight: '20px' }}>
                            {activeFinding.query.slice(0, visibleQueryChars)}
                            {phase === 'typing-query' && (
                              <span style={{ animation: 'caretBlink 0.8s infinite', marginLeft: '1px' }}>|</span>
                            )}
                          </p>
                        </div>
                      </div>

                      {/* Role indicator */}
                      <AnimatePresence>
                        {showRoleIndicator && (
                          <motion.div
                            key="role-indicator"
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            transition={{ duration: 0.3 }}
                            style={{
                              fontFamily: "'Saira', sans-serif",
                              fontSize: '12px',
                              fontWeight: 400,
                              color: '#8E59FF',
                              fontStyle: 'italic',
                              paddingLeft: '36px',
                            }}
                          >
                            {activeFinding.roleIndicator}
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Loading dots */}
                      {phase === 'loading' && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'linear-gradient(135deg, #8E59FF, #608ff6)', flexShrink: 0 }} />
                          <div style={{ display: 'flex', gap: '4px' }}>
                            {[0, 1, 2].map(i => (
                              <span key={i} style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#8E59FF', display: 'inline-block', animation: `dotPulse 1.4s ease-in-out ${i * 0.2}s infinite` }} />
                            ))}
                          </div>
                        </div>
                      )}

                      {/* AI response in progress */}
                      {showResponse && (
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                          <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'linear-gradient(135deg, #8E59FF, #608ff6)', flexShrink: 0, marginTop: '2px' }} />
                          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                            <div>
                              <p className="m8-eyebrow" style={{ color: '#8E59FF', marginBottom: '6px' }}>INSIGHTS</p>
                              <p style={{
                                fontFamily: "'Saira', sans-serif",
                                fontSize: '14px',
                                fontWeight: 400,
                                lineHeight: '22px',
                                color: '#12182b',
                                margin: 0,
                              }}>
                                {insightsWordList.slice(0, visibleWords).join(' ')}
                                {visibleWords < insightsWordList.length && phase === 'insights' && (
                                  <span style={{ animation: 'caretBlink 1s infinite', marginLeft: '2px' }}>|</span>
                                )}
                              </p>
                            </div>

                            {['rootcause', 'recommendations', 'complete', 'closing'].includes(phase) && (
                              <div>
                                <p className="m8-eyebrow" style={{ color: '#8E59FF', marginBottom: '6px' }}>ROOT CAUSE</p>
                                <p style={{
                                  fontFamily: "'Saira', sans-serif",
                                  fontSize: '14px',
                                  fontWeight: 400,
                                  lineHeight: '22px',
                                  color: '#12182b',
                                  margin: 0,
                                }}>
                                  {rcWordList.slice(0, visibleRcWords).join(' ')}
                                  {visibleRcWords < rcWordList.length && phase === 'rootcause' && (
                                    <span style={{ animation: 'caretBlink 1s infinite', marginLeft: '2px' }}>|</span>
                                  )}
                                </p>
                              </div>
                            )}

                            {['recommendations', 'complete', 'closing'].includes(phase) && (
                              <div>
                                <p className="m8-eyebrow" style={{ color: '#8E59FF', marginBottom: '8px' }}>RECOMMENDATIONS</p>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                  {activeFinding.recommendations.slice(0, visibleBullets).map((rec, i) => (
                                    <motion.div
                                      key={i}
                                      initial={{ opacity: 0, y: 6 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{ duration: 0.3 }}
                                      style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}
                                    >
                                      <div style={{
                                        width: '20px',
                                        height: '20px',
                                        borderRadius: '50%',
                                        background: '#8E59FF',
                                        color: '#ffffff',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontFamily: "'Saira', sans-serif",
                                        fontSize: '11px',
                                        fontWeight: 500,
                                        flexShrink: 0,
                                        marginTop: '1px',
                                      }}>
                                        {i + 1}
                                      </div>
                                      <p style={{
                                        fontFamily: "'Saira', sans-serif",
                                        fontSize: '14px',
                                        fontWeight: 400,
                                        lineHeight: '22px',
                                        color: '#12182b',
                                        margin: 0,
                                        flex: 1,
                                      }}>
                                        {rec}
                                      </p>
                                    </motion.div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Closing line */}
                            <AnimatePresence>
                              {closingVisible && (
                                <motion.p
                                  key="closing-line"
                                  initial={{ opacity: 0, y: 6 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0 }}
                                  transition={{ duration: 0.5 }}
                                  style={{
                                    fontFamily: "'Saira', sans-serif",
                                    fontSize: '15px',
                                    fontWeight: 500,
                                    lineHeight: '22px',
                                    color: '#8E59FF',
                                    margin: '8px 0 0 0',
                                  }}
                                >
                                  Ready for today. What do you want to act on first?
                                </motion.p>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                </div>

                {/* Input bar — flush, only top border */}
                <div style={{ padding: '0' }}>
                  <AgentMarkInput />
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
