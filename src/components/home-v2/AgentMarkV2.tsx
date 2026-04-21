import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { mockHalts, mockResponses } from '@/data/aiPanelMockData';

const ORB_URL = '/img/home-v2/agent-mark-orb.png';

const DEMO_CYCLE = [
  { halt: mockHalts.find(h => h.id === 'h1')!, response: mockResponses.h1 },
  { halt: mockHalts.find(h => h.id === 'h2')!, response: mockResponses.h2 },
  { halt: mockHalts.find(h => h.id === 'h3')!, response: mockResponses.h3 },
  { halt: mockHalts.find(h => h.id === 'h4')!, response: mockResponses.h4 },
  { halt: mockHalts.find(h => h.id === 'h5')!, response: mockResponses.h5 },
];

type DemoPhase =
  | 'idle'
  | 'pill'
  | 'loading'
  | 'insights'
  | 'rootcause'
  | 'recommendations'
  | 'complete'
  | 'fading';

const WORD_SPEED = 25;
const SECTION_GAP = 80;
const HOLD_TIME = 3000;
const FADE_TIME = 600;
const LOADING_TIME = 800;

export default function AgentMarkV2() {
  const [phase, setPhase] = useState<DemoPhase>('idle');
  const [cycleIndex, setCycleIndex] = useState(0);
  const [visibleWords, setVisibleWords] = useState(0);
  const [visibleRcWords, setVisibleRcWords] = useState(0);
  const [visibleBullets, setVisibleBullets] = useState(0);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    const item = DEMO_CYCLE[cycleIndex % DEMO_CYCLE.length];
    const insightsWords = item.response.insights.split(' ');
    const rcWordsArr = item.response.rootCause.split(' ');

    setOpacity(1);
    setVisibleWords(0);
    setVisibleRcWords(0);
    setVisibleBullets(0);
    setPhase('idle');

    timeouts.push(setTimeout(() => setPhase('pill'), 300));
    timeouts.push(setTimeout(() => setPhase('loading'), 900));

    const insightsStart = 900 + LOADING_TIME;
    timeouts.push(setTimeout(() => {
      setPhase('insights');
      insightsWords.forEach((_, i) => {
        timeouts.push(setTimeout(() => setVisibleWords(i + 1), i * WORD_SPEED));
      });
    }, insightsStart));

    const insightsDuration = insightsWords.length * WORD_SPEED;
    const rcStart = insightsStart + insightsDuration + SECTION_GAP;
    timeouts.push(setTimeout(() => {
      setPhase('rootcause');
      rcWordsArr.forEach((_, i) => {
        timeouts.push(setTimeout(() => setVisibleRcWords(i + 1), i * WORD_SPEED));
      });
    }, rcStart));

    const rcDuration = rcWordsArr.length * WORD_SPEED;
    const recsStart = rcStart + rcDuration + SECTION_GAP;
    timeouts.push(setTimeout(() => {
      setPhase('recommendations');
      item.response.recommendations.forEach((_, i) => {
        timeouts.push(setTimeout(() => setVisibleBullets(i + 1), i * 600));
      });
    }, recsStart));

    const totalTyping = recsStart + item.response.recommendations.length * 600;
    timeouts.push(setTimeout(() => setPhase('complete'), totalTyping + 200));

    timeouts.push(setTimeout(() => {
      setPhase('fading');
      setOpacity(0);
    }, totalTyping + 200 + HOLD_TIME));

    timeouts.push(setTimeout(() => {
      setCycleIndex(i => i + 1);
    }, totalTyping + 200 + HOLD_TIME + FADE_TIME));

    return () => timeouts.forEach(clearTimeout);
  }, [cycleIndex]);

  const current = DEMO_CYCLE[cycleIndex % DEMO_CYCLE.length];
  const insightsWordList = current.response.insights.split(' ');
  const rcWordList = current.response.rootCause.split(' ');
  const showResponse = ['insights', 'rootcause', 'recommendations', 'complete'].includes(phase);

  return (
    <section style={{
      padding: '100px 0',
      position: 'relative',
      background: 'transparent',
      overflow: 'hidden',
    }}>
      <style>{`
        @keyframes dotPulse {
          0%, 60%, 100% { opacity: 0.3; transform: scale(1); }
          30% { opacity: 1; transform: scale(1.3); }
        }
        @keyframes caretBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>

      {/* Eyebrow + headline — outside bounding box */}
      <div className="container" style={{ textAlign: 'center', marginBottom: '40px', position: 'relative', zIndex: 1 }}>
        <motion.p
          className="m8-eyebrow"
          style={{ color: '#8E59FF', marginBottom: '12px' }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
        >
          AGENT MARK
        </motion.p>
        <motion.h2
          className="m8-h2"
          style={{ color: 'var(--v2-text)', margin: 0 }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ delay: 0.05 }}
        >
          Your smartest team member never sleeps.
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
              style={{ marginBottom: '24px' }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              <img
                src={ORB_URL}
                alt="Agent Mark"
                style={{
                  width: '180px',
                  height: '180px',
                  objectFit: 'contain',
                  display: 'block',
                }}
              />
            </motion.div>

            {/* Intro text */}
            <motion.div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
                marginBottom: '40px',
                textAlign: 'center',
              }}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: 0.15 }}
            >
              <p style={{
                fontFamily: "'Saira', sans-serif",
                fontSize: '28px',
                fontWeight: 500,
                lineHeight: '42px',
                background: 'linear-gradient(90deg, #c192cf, #608ff6 50%, #6a26fa)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                margin: 0,
              }}>
                Hello, I'm Agent Mark!
              </p>
              <p style={{
                fontFamily: "'Saira', sans-serif",
                fontSize: '28px',
                fontWeight: 500,
                lineHeight: '42px',
                color: '#12182b',
                margin: 0,
                whiteSpace: 'nowrap',
              }}>
                What data should I brew for you today?
              </p>
            </motion.div>

            {/* Animated chat window */}
            <div style={{
              width: '100%',
              maxWidth: '960px',
            }}>
              <div style={{
                background: '#ffffff',
                borderRadius: '16px',
                boxShadow: '0 4px 24px rgba(130,130,130,0.08)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
              }}>
                {/* Messages area */}
                <div style={{
                  padding: '24px',
                  minHeight: '420px',
                  maxHeight: '420px',
                  overflow: 'hidden',
                  opacity,
                  transition: `opacity ${FADE_TIME}ms ease-out`,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                }}>
                  {/* User context pill */}
                  {phase !== 'idle' && (
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <div style={{
                        background: '#F5F0FF',
                        border: '1px solid #E2D6FF',
                        borderRadius: '20px',
                        padding: '8px 16px',
                        maxWidth: '70%',
                      }}>
                        <p style={{
                          fontFamily: "'Saira', sans-serif",
                          fontSize: '14px',
                          fontWeight: 400,
                          color: '#12182b',
                          margin: 0,
                          lineHeight: '20px',
                        }}>
                          {current.halt.statement}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Loading dots */}
                  {phase === 'loading' && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #8E59FF, #608ff6)',
                        flexShrink: 0,
                      }} />
                      <div style={{ display: 'flex', gap: '4px' }}>
                        {[0, 1, 2].map(i => (
                          <span
                            key={i}
                            style={{
                              width: '6px',
                              height: '6px',
                              borderRadius: '50%',
                              background: '#8E59FF',
                              display: 'inline-block',
                              animation: `dotPulse 1.4s ease-in-out ${i * 0.2}s infinite`,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* AI Response */}
                  {showResponse && (
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                      <div style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #8E59FF, #608ff6)',
                        flexShrink: 0,
                        marginTop: '2px',
                      }} />
                      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                        {/* INSIGHTS */}
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

                        {/* ROOT CAUSE */}
                        {['rootcause', 'recommendations', 'complete'].includes(phase) && (
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

                        {/* RECOMMENDATIONS */}
                        {['recommendations', 'complete'].includes(phase) && (
                          <div>
                            <p className="m8-eyebrow" style={{ color: '#8E59FF', marginBottom: '8px' }}>RECOMMENDATIONS</p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                              {current.response.recommendations.slice(0, visibleBullets).map((rec, i) => (
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
                      </div>
                    </div>
                  )}
                </div>

                {/* Static input bar */}
                <div style={{
                  borderTop: '1px solid #EDF0F7',
                  padding: '16px 24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: '#f9f9fb',
                }}>
                  <p style={{
                    fontFamily: "'Saira', sans-serif",
                    fontSize: '14px',
                    fontWeight: 400,
                    color: '#656981',
                    margin: 0,
                  }}>
                    Ask Agent Mark anything...
                  </p>
                  <div style={{
                    height: '32px',
                    padding: '0 14px',
                    borderRadius: '40px',
                    background: '#e2e6ff',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}>
                    <span style={{
                      fontFamily: "'Saira', sans-serif",
                      fontSize: '12px',
                      fontWeight: 500,
                      color: '#8E59FF',
                    }}>
                      ✦ Ask Mark
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
