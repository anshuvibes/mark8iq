import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

/**
 * ScrollDownHint — small chevron pill shown at the bottom of the viewport
 * whenever the Ask Mark widget is hidden (primarily the Fragmentation scroll
 * sequence + the Agent Mark / Foundry / Footer zones). Mirrors the same
 * visibility logic as AgentMarkWidget but inverted.
 */
export default function ScrollDownHint() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const fragmentationSection = document.querySelector('[data-section="fragmentation"]');
    const agentMarkSection = document.querySelector('[data-section="agent-mark"]');
    const agentFoundrySection = document.querySelector('[data-section="agent-foundry"]');
    const footerEl = document.querySelector('footer');

    let fragmentationActive = false;
    let insideAgentZone = false;
    let footerActive = false;
    let nearPageEnd = false;

    const update = () => {
      // Only show in the Fragmentation area.
      setShow(fragmentationActive && !footerActive && !nearPageEnd);
    };

    let fragObs: IntersectionObserver | null = null;
    if (fragmentationSection) {
      fragObs = new IntersectionObserver(
        ([entry]) => {
          fragmentationActive = entry.isIntersecting;
          update();
        },
        { threshold: 0.05 }
      );
      fragObs.observe(fragmentationSection);
    }

    let footerObs: IntersectionObserver | null = null;
    if (footerEl) {
      footerObs = new IntersectionObserver(
        ([entry]) => {
          footerActive = entry.isIntersecting;
          update();
        },
        { threshold: 0.01 }
      );
      footerObs.observe(footerEl);
    }

    const onScroll = () => {
      if (agentMarkSection) {
        const markRect = agentMarkSection.getBoundingClientRect();
        const vh = window.innerHeight;
        const entered = markRect.top <= vh * 0.8;
        let exited = false;
        if (agentFoundrySection) {
          exited = agentFoundrySection.getBoundingClientRect().bottom <= vh * 0.2;
        } else {
          exited = markRect.bottom <= vh * 0.2;
        }
        insideAgentZone = entered && !exited;
      } else {
        insideAgentZone = false;
      }
      // Suppress hint when the user is essentially at the bottom of the page
      nearPageEnd =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 80;
      update();
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      fragObs?.disconnect();
      footerObs?.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const handleClick = () => {
    window.scrollBy({ top: window.innerHeight * 0.9, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          key="scroll-hint"
          type="button"
          onClick={handleClick}
          aria-label="Scroll down"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ type: 'spring', stiffness: 260, damping: 28, mass: 0.8 }}
          style={{
            position: 'fixed',
            bottom: '28px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 99998,
            width: '44px',
            height: '64px',
            background: 'transparent',
            border: 'none',
            color: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px',
            cursor: 'pointer',
            padding: 0,
            filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.45))',
          }}
        >
          <svg width="26" height="40" viewBox="0 0 26 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <rect x="1.25" y="1.25" width="23.5" height="37.5" rx="11.75" stroke="currentColor" strokeWidth="1.6" />
            <motion.rect
              x="11"
              y="7"
              width="4"
              height="8"
              rx="2"
              fill="currentColor"
              animate={{ y: [7, 13, 7] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            />
          </svg>
          <motion.svg
            width="18"
            height="10"
            viewBox="0 0 18 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            animate={{ y: [0, 4, 0], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <path d="M1 1L9 8L17 1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </motion.svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
