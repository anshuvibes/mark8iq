import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';

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
      // Show whenever the AgentMarkWidget is hidden, but not at the very
      // bottom of the page where there's nothing left to scroll to.
      setShow((fragmentationActive || insideAgentZone) && !footerActive && !nearPageEnd);
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
            width: '40px',
            height: '40px',
            borderRadius: '999px',
            border: '1px solid rgba(255,255,255,0.18)',
            background: 'rgba(8,13,25,0.55)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 4px 18px rgba(0,0,0,0.35)',
            padding: 0,
          }}
        >
          <motion.span
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            style={{ display: 'inline-flex' }}
          >
            <ChevronDown size={20} strokeWidth={2} />
          </motion.span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
