import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'motion/react';

const marketplaces = [
  { id: 'amazon', label: 'Amazon', startX: -420, startY: -190 },
  { id: 'flipkart', label: 'Flipkart', startX: 370, startY: -200 },
  { id: 'myntra', label: 'Myntra', startX: -390, startY: 110 },
  { id: 'meesho', label: 'Meesho', startX: 410, startY: 130 },
  { id: 'zepto', label: 'Zepto', startX: -210, startY: 260 },
  { id: 'blinkit', label: 'Blinkit', startX: 220, startY: 270 },
  { id: 'swiggy', label: 'Swiggy Instamart', startX: 0, startY: 310 },
];

const departments = [
  { id: 'ads', label: 'Ads Manager', startX: -510, startY: -90 },
  { id: 'inv', label: 'Inventory Tracker', startX: 510, startY: 70 },
  { id: 'ret', label: 'Returns Dashboard', startX: -490, startY: 170 },
  { id: 'fin', label: 'Finance Suite', startX: 490, startY: -150 },
  { id: 'po', label: 'PO Management', startX: -310, startY: -230 },
  { id: 'mkt', label: 'Market Research Tool', startX: 330, startY: 230 },
  { id: 'rec', label: 'Reconciliation Engine', startX: 10, startY: -310 },
];

const personas = [
  { id: 'analyst', label: 'Analyst needs raw data', startX: -610, startY: -70 },
  { id: 'manager', label: 'Manager needs trends', startX: 600, startY: -50 },
  { id: 'cxo', label: 'CXO needs P&L impact', startX: -580, startY: 210 },
  { id: 'cam', label: 'CAM needs campaign view', startX: 560, startY: 190 },
  { id: 'ops', label: 'Ops Head needs stock levels', startX: 0, startY: -330 },
];

function FloatingPill({
  scrollYProgress,
  label,
  startX,
  startY,
  appearRange,
  floatDelay,
  style,
}: {
  scrollYProgress: MotionValue<number>;
  label: string;
  startX: number;
  startY: number;
  appearRange: [number, number, number, number];
  floatDelay: number;
  style?: React.CSSProperties;
}) {
  const x = useTransform(scrollYProgress, [0, 0.68, 0.82], [startX, startX, 0]);
  const y = useTransform(scrollYProgress, [0, 0.68, 0.82], [startY, startY, 0]);
  const opacity = useTransform(scrollYProgress, appearRange, [0, 1, 1, 0]);

  return (
    <motion.div
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        x,
        y,
        opacity,
        padding: '10px 20px',
        borderRadius: '9999px',
        background: 'rgba(255,255,255,0.08)',
        border: '1px solid rgba(255,255,255,0.15)',
        color: 'rgba(255,255,255,0.85)',
        fontSize: '15px',
        fontFamily: "'Saira', sans-serif",
        whiteSpace: 'nowrap',
        pointerEvents: 'none',
        animation: `fragFloat 3.5s ease-in-out ${floatDelay}s infinite alternate`,
        ...style,
      }}
    >
      {label}
    </motion.div>
  );
}

function FloatingText({
  scrollYProgress,
  label,
  startX,
  startY,
  appearRange,
  floatDelay,
}: {
  scrollYProgress: MotionValue<number>;
  label: string;
  startX: number;
  startY: number;
  appearRange: [number, number, number, number];
  floatDelay: number;
}) {
  const x = useTransform(scrollYProgress, [0.42, 0.68, 0.82], [startX, startX, 0]);
  const y = useTransform(scrollYProgress, [0.42, 0.68, 0.82], [startY, startY, 0]);
  const opacity = useTransform(scrollYProgress, appearRange, [0, 1, 1, 0]);

  return (
    <motion.span
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        x,
        y,
        opacity,
        color: 'rgba(255,255,255,0.48)',
        fontSize: '15px',
        fontFamily: "'Saira', sans-serif",
        whiteSpace: 'nowrap',
        pointerEvents: 'none',
        animation: `fragFloat 4s ease-in-out ${floatDelay}s infinite alternate`,
      }}
    >
      {label}
    </motion.span>
  );
}

export default function FragmentationV2() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const bgColor = useTransform(scrollYProgress, [0, 0.03, 0.06], ['#FFFFFF', '#150e22', '#080D19']);

  const step1TextOpacity = useTransform(scrollYProgress, [0.08, 0.12, 0.22, 0.25], [0, 1, 1, 0]);
  const step2TextOpacity = useTransform(scrollYProgress, [0.28, 0.32, 0.42, 0.45], [0, 1, 1, 0]);
  const step3TextOpacity = useTransform(scrollYProgress, [0.48, 0.52, 0.58, 0.62], [0, 1, 1, 0]);

  const pivotOpacity = useTransform(scrollYProgress, [0.60, 0.64, 0.66, 0.68], [0, 1, 1, 0]);
  const pivotScale = useTransform(scrollYProgress, [0.60, 0.64], [0.88, 1]);

  const circleScale = useTransform(scrollYProgress, [0.82, 0.95], [0, 40]);
  const circleOpacity = useTransform(scrollYProgress, [0.82, 0.86], [0, 1]);
  const logoOpacity = useTransform(scrollYProgress, [0.88, 0.93], [0, 1]);
  const consolidationCopyOpacity = useTransform(scrollYProgress, [0.91, 0.95, 0.98], [0, 1, 0]);

  return (
    <>
      <style>{`
        @keyframes fragFloat {
          0% { transform: translateY(0); }
          100% { transform: translateY(-6px); }
        }
      `}</style>
      <div ref={containerRef} data-section="fragmentation" style={{ height: '400vh', position: 'relative' }}>
        <motion.div
          style={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            width: '100%',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: bgColor,
          }}
        >
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'url(/img/bg-pattern-reverse.svg)',
            backgroundRepeat: 'repeat',
            opacity: 0.06,
            pointerEvents: 'none',
          }} />

          {marketplaces.map((m, i) => (
            <FloatingPill
              key={m.id}
              scrollYProgress={scrollYProgress}
              label={m.label}
              startX={m.startX}
              startY={m.startY}
              appearRange={[0.02, 0.08, 0.80, 0.85]}
              floatDelay={i * 0.4}
            />
          ))}

          {departments.map((d, i) => (
            <FloatingPill
              key={d.id}
              scrollYProgress={scrollYProgress}
              label={d.label}
              startX={d.startX}
              startY={d.startY}
              appearRange={[0.22, 0.28, 0.80, 0.85]}
              floatDelay={i * 0.5}
              style={{
                background: 'rgba(142,89,255,0.10)',
                border: '1px solid rgba(142,89,255,0.22)',
                color: 'rgba(255,255,255,0.8)',
              }}
            />
          ))}

          {personas.map((p, i) => (
            <FloatingText
              key={p.id}
              scrollYProgress={scrollYProgress}
              label={p.label}
              startX={p.startX}
              startY={p.startY}
              appearRange={[0.42, 0.48, 0.80, 0.85]}
              floatDelay={i * 0.6}
            />
          ))}

          <motion.div className="m8-p1" style={{ position: 'absolute', bottom: '30vh', width: '100%', textAlign: 'center', color: '#fff', opacity: step1TextOpacity, pointerEvents: 'none', padding: '0 20px' }}>
            Every marketplace speaks a different language.
          </motion.div>
          <motion.div className="m8-p1" style={{ position: 'absolute', bottom: '30vh', width: '100%', textAlign: 'center', color: '#fff', opacity: step2TextOpacity, pointerEvents: 'none', padding: '0 20px' }}>
            Every department runs on a different tool. None of them talk to each other.
          </motion.div>
          <motion.div className="m8-p1" style={{ position: 'absolute', bottom: '30vh', width: '100%', textAlign: 'center', color: '#fff', opacity: step3TextOpacity, pointerEvents: 'none', padding: '0 20px' }}>
            Same data. Seven interpretations. Zero shared truth.
          </motion.div>

          <motion.div
            className="m8-h1-large"
            style={{
              position: 'absolute',
              color: '#fff',
              opacity: pivotOpacity,
              scale: pivotScale,
              pointerEvents: 'none',
              zIndex: 10,
            }}
          >
            Until now.
          </motion.div>

          <motion.div
            style={{
              position: 'absolute',
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: '#F5F0FF',
              scale: circleScale,
              opacity: circleOpacity,
              zIndex: 20,
            }}
          />

          <motion.div
            style={{
              position: 'absolute',
              opacity: logoOpacity,
              zIndex: 30,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px',
              pointerEvents: 'none',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
              <span style={{ fontSize: '48px', fontFamily: "'Saira', sans-serif", fontWeight: 400, color: '#080D19' }}>mark8 </span>
              <span style={{ fontSize: '48px', fontFamily: "'Saira', sans-serif", fontWeight: 500, color: '#8E59FF' }}>IQ</span>
            </div>
            <motion.p
              className="m8-p2"
              style={{ color: 'rgba(8,13,25,0.6)', opacity: consolidationCopyOpacity, textAlign: 'center' }}
            >
              One platform absorbs it all.
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
