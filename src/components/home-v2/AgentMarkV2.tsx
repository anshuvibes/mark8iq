import { motion } from 'motion/react';
import { useAgentMarkDock } from './AgentMarkDockContext';

const ORB_URL = '/img/home-v2/agent-mark-orb.png';

// Dock dimensions — must match the floating chat panel target morph size
const DOCK_WIDTH_DESKTOP = 960;
const DOCK_HEIGHT_DESKTOP = 520;

export default function AgentMarkV2() {
  const ctx = useAgentMarkDock();
  const dockRef = ctx?.dockRef;

  return (
    <section style={{
      padding: '100px 0',
      position: 'relative',
      background: 'transparent',
      overflow: 'hidden',
    }}>
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

            {/* Dock placeholder — widget docks here */}
            <div
              ref={dockRef}
              data-agent-mark-dock
              style={{
                width: '100%',
                maxWidth: `${DOCK_WIDTH_DESKTOP}px`,
                height: `${DOCK_HEIGHT_DESKTOP}px`,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
