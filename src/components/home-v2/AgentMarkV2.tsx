import { motion } from 'motion/react';

const ORB_URL = '/img/home-v2/agent-mark-orb.png';

const suggestions = [
  'Analyze overall business performance for the selected date range',
  'Analyze product positioning based on sales and growth',
  'Identify products frequently going out of stock',
];

export default function AgentMarkV2() {
  return (
    <section style={{
      padding: '100px 0',
      position: 'relative',
      background: 'linear-gradient(118.99deg, #F3EFFD 1.54%, #EBF5FE 25.36%, #D9C8FE 49.17%)',
      overflow: 'hidden',
    }}>

      {/* Background glow blobs */}
      <div style={{
        position: 'absolute',
        right: '-180px',
        top: '-40px',
        width: '560px',
        height: '560px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(162,128,255,0.25) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        left: '-140px',
        bottom: '60px',
        width: '480px',
        height: '480px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(96,143,246,0.2) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container" style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0',
        position: 'relative',
        zIndex: 1,
      }}>

        {/* Eyebrow */}
        <motion.p
          className="m8-mono"
          style={{
            color: '#8E59FF',
            marginBottom: '12px',
            textAlign: 'center',
          }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
        >
          Agent Mark
        </motion.p>

        {/* Headline */}
        <motion.h2
          style={{
            fontFamily: "'Saira', sans-serif",
            fontSize: '40px',
            fontWeight: 400,
            letterSpacing: '-0.03em',
            lineHeight: '110%',
            color: '#12182b',
            textAlign: 'center',
            marginBottom: '48px',
          }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ delay: 0.05 }}
        >
          Your smartest team member never sleeps.
        </motion.h2>

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
            fontFamily: "'Inter', sans-serif",
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
            fontFamily: "'Inter', sans-serif",
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

        {/* Suggestions */}
        <motion.div
          style={{
            width: '100%',
            maxWidth: '960px',
            marginBottom: '16px',
          }}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ delay: 0.2 }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '12px',
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
              <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" fill="#8E59FF" opacity="0.8"/>
            </svg>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '16px',
              fontWeight: 500,
              color: '#12182b',
              margin: 0,
            }}>
              Suggestions
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '16px',
          }}>
            {suggestions.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ delay: 0.25 + i * 0.05 }}
                style={{
                  background: '#f9f9fb',
                  borderRadius: '8px',
                  padding: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 16px 6px rgba(130,130,130,0.05)',
                  cursor: 'pointer',
                }}
              >
                <p style={{
                  flex: 1,
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '14px',
                  fontWeight: 400,
                  lineHeight: '22px',
                  color: '#12182b',
                  margin: 0,
                }}>
                  {s}
                </p>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: '#8E59FF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 12L12 2M12 2H5M12 2V9" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Chat input bar */}
        <motion.div
          style={{
            width: '100%',
            maxWidth: '960px',
          }}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ delay: 0.3 }}
        >
          <div style={{
            background: '#f9f9fb',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0 4px 16px 6px rgba(130,130,130,0.05)',
          }}>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '14px',
              fontWeight: 400,
              color: '#656981',
              marginBottom: '16px',
              height: '54px',
            }}>
              Ask Anything...
            </p>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                {['Attach', 'Select Platform', 'Select Date', 'More Options'].map((opt) => (
                  <button key={opt} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '10px',
                    fontWeight: 500,
                    color: '#656981',
                    padding: 0,
                  }}>
                    {opt}
                  </button>
                ))}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: '#edeff7',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 2v8M8 2C8 2 6 4 5 5M8 2C8 2 10 4 11 5M3 12h10" stroke="#656981" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div style={{
                  height: '32px',
                  padding: '0 12px',
                  borderRadius: '40px',
                  background: '#e2e6ff',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                }}>
                  <span style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '12px',
                    fontWeight: 500,
                    color: '#adb1cc',
                  }}>
                    ✦ Ask Mark
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
