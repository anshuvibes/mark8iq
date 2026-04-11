import { useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import DeckNav from '../components/deck/DeckNav';
import DeckSection01Hero from '../components/deck/DeckSection01Hero';
import DeckSection02WhatWeDo from '../components/deck/DeckSection02WhatWeDo';
import DeckSection03WhyInfotrix from '../components/deck/DeckSection03WhyInfotrix';
import DeckSection04Results from '../components/deck/DeckSection04Results';
import DeckSection05Approach from '../components/deck/DeckSection05Approach';
import DeckSection06Operations from '../components/deck/DeckSection06Operations';
import DeckSection07Talent from '../components/deck/DeckSection07Talent';
import DeckSection08Tech from '../components/deck/DeckSection08Tech';
import DeckSection09AI from '../components/deck/DeckSection09AI';
import DeckSection10Journey from '../components/deck/DeckSection10Journey';
import DeckSection10Team from '../components/deck/DeckSection10Team';
import DeckSection11Close from '../components/deck/DeckSection11Close';

export default function DeckPage() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div style={{ fontFamily: "var(--font_primary, 'Saira', sans-serif)" }}>
      <DeckNav />
      {/* Scroll progress bar */}
      <motion.div
        style={{
          scaleX,
          transformOrigin: '0%',
          position: 'fixed',
          top: 60,
          left: 0,
          right: 0,
          height: 3,
          background: '#8E59FF',
          zIndex: 100,
        }}
      />
      <DeckSection01Hero />
      <DeckSection02WhatWeDo />
      <DeckSection03WhyInfotrix />
      <DeckSection04Results />
      <DeckSection05Approach />
      <DeckSection06Operations />
      <DeckSection07Talent />
      <DeckSection08Tech />
      <DeckSection09AI />
      <DeckSection10Journey />
      <DeckSection10Team />
      <DeckSection11Close />
    </div>
  );
}
