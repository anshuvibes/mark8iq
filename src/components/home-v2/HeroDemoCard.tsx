import { useState, useEffect, useRef, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import {
  Check,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import iconAds from '@/assets/explore-icons/ads.svg';
import iconVisibility from '@/assets/explore-icons/visibility.svg';
import iconInventory from '@/assets/explore-icons/inventory.svg';
import iconPurchase from '@/assets/explore-icons/purchase.svg';
import iconReturns from '@/assets/explore-icons/returns.svg';
import iconReco from '@/assets/explore-icons/reco.svg';
import iconResearch from '@/assets/explore-icons/research.svg';
import iconMark from '@/assets/explore-icons/mark.svg';
import iconFoundry from '@/assets/explore-icons/foundry.svg';

type Step = 'select' | 'form' | 'success';

interface ValueTile {
  id: string;
  label: [string, string]; // forced two-line label per Figma
  accent: string;
  icon: string;
}

const TILES: ValueTile[] = [
  { id: 'ads',       label: ['Ads', 'Analytics'],          accent: '#dd4062', icon: iconAds },
  { id: 'visibility',label: ['Market', 'Visibility'],      accent: '#52bfbc', icon: iconVisibility },
  { id: 'inventory', label: ['Inventory', 'Control'],      accent: '#6895fc', icon: iconInventory },
  { id: 'po',        label: ['Purchase', 'Order'],         accent: '#fcb24f', icon: iconPurchase },
  { id: 'returns',   label: ['Return', 'Operations'],      accent: '#fc7459', icon: iconReturns },
  { id: 'reco',      label: ['Payment', 'Reconciliation'], accent: '#7cbc71', icon: iconReco },
  { id: 'research',  label: ['Market', 'Research'],        accent: '#8E59FF', icon: iconResearch },
  { id: 'mark',      label: ['Agent', 'Mark'],             accent: '#ab73c5', icon: iconMark },
  { id: 'foundry',   label: ['Agent', 'Foundry'],          accent: '#6c6acc', icon: iconFoundry },
];

const formSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name').max(80),
  email: z.string().trim().email('Enter a valid email').max(120),
  phone: z.string().trim().max(20).optional().or(z.literal('')),
  notes: z.string().trim().max(500).optional().or(z.literal('')),
});

const stepVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

const stepTransition = { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] };

export default function HeroDemoCard() {
  const [step, setStep] = useState<Step>('select');
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<{ name?: string; email?: string; phone?: string; notes?: string }>({});
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (step !== 'success') return;

    const node = cardRef.current;
    if (node) {
      const rect = node.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;
      confetti({
        particleCount: 80,
        spread: 70,
        startVelocity: 35,
        origin: { x, y },
        colors: ['#8E59FF', '#52bfbc', '#fc7459', '#7cbc71', '#fcb24f', '#dd4062'],
        zIndex: 9999,
        scalar: 0.8,
      });
    }
  }, [step]);

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const result = formSchema.safeParse({ name, email, phone, notes });
    if (!result.success) {
      const fieldErrors: typeof errors = {};
      result.error.issues.forEach((iss) => {
        const key = iss.path[0] as keyof typeof errors;
        if (!fieldErrors[key]) fieldErrors[key] = iss.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    // eslint-disable-next-line no-console
    console.log('Demo request', { selected: Array.from(selected), ...result.data });
    setStep('success');
  };

  const resetAll = () => {
    setStep('select');
    setSelected(new Set());
    setName('');
    setEmail('');
    setPhone('');
    setNotes('');
    setErrors({});
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontFamily: 'Saira, sans-serif',
    fontSize: '12px',
    fontWeight: 400,
    color: 'var(--v2-text)',
    marginBottom: '6px',
  };

  const inputBaseStyle = (hasError: boolean): React.CSSProperties => ({
    width: '100%',
    padding: '10px 12px',
    borderRadius: '8px',
    border: `1px solid ${hasError ? '#dd4062' : 'var(--v2-border)'}`,
    background: 'var(--v2-bg-subtle)',
    color: 'var(--v2-text)',
    fontFamily: 'Saira, sans-serif',
    fontSize: '13px',
    fontWeight: 400,
    outline: 'none',
  });

  return (
    <div
      ref={cardRef}
      className="hero-module-card"
      style={{
        position: 'absolute',
        top: '120px',
        right: '-24px',
        width: '340px',
        minHeight: '500px',
        background: 'var(--v2-bg-card)',
        borderRadius: '18px',
        padding: '26px 22px',
        boxShadow: '0 12px 40px var(--v2-shadow)',
        border: '1px solid var(--v2-border)',
        zIndex: 2,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <style>{`
        @media (max-width: 1280px) {
          .hero-module-card { width: 320px !important; }
        }
        @media (max-width: 991px) {
          .hero-module-card { display: none !important; }
        }
      `}</style>

      <AnimatePresence mode="wait">
        {step === 'select' && (
          <motion.div
            key="select"
            variants={stepVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={stepTransition}
          >
            <p
              className="hero-card-headline"
              style={{
                fontSize: '17px',
                fontWeight: 400,
                marginBottom: '20px',
                textAlign: 'center',
                lineHeight: 1.3,
              }}
            >
              What do you want to explore?
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                gap: '8px',
                marginBottom: '18px',
              }}
            >
              {TILES.map((tile) => {
                const isSelected = selected.has(tile.id);
                const iconSrc = tile.icon;
                return (
                  <button
                    key={tile.id}
                    type="button"
                    onClick={() => toggle(tile.id)}
                    data-accent={tile.accent}
                    data-selected={isSelected}
                    className="hero-tile"
                    style={{
                      position: 'relative',
                      width: '100%',
                      minWidth: 0,
                      minHeight: '104px',
                      padding: '20px 4px 14px',
                      borderRadius: '10px',
                      background: isSelected ? `${tile.accent}10` : 'var(--v2-bg-card)',
                      border: `1.5px solid ${isSelected ? tile.accent : 'var(--v2-border)'}`,
                      cursor: 'pointer',
                      fontFamily: 'Saira, sans-serif',
                      transition: 'background 0.18s ease, border-color 0.18s ease',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      textAlign: 'center',
                      ['--tile-accent' as string]: tile.accent,
                    }}
                  >
                    <span
                      aria-hidden
                      className="hero-tile-checkbox"
                      style={{
                        position: 'absolute',
                        top: '6px',
                        left: '6px',
                        width: '12px',
                        height: '12px',
                        borderRadius: '3px',
                        border: `1.5px solid ${isSelected ? tile.accent : 'var(--v2-border)'}`,
                        background: isSelected ? tile.accent : 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.18s ease',
                      }}
                    >
                      {isSelected && <Check size={8} color="#fff" strokeWidth={3.5} />}
                    </span>

                    <img
                      src={iconSrc}
                      alt=""
                      aria-hidden
                      width={18}
                      height={18}
                      className="hero-tile-icon"
                      style={{
                        display: 'block',
                        width: '18px',
                        height: '18px',
                      }}
                    />
                    <span
                      style={{
                        fontFamily: 'Saira, sans-serif',
                        fontSize: '11px',
                        fontWeight: 400,
                        color: 'var(--v2-text)',
                        lineHeight: 1.25,
                      }}
                    >
                      {tile.label[0]}
                      <br />
                      {tile.label[1]}
                    </span>
                  </button>
                );
              })}
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                variant="m8-dark"
                size="lg"
                onClick={() => setStep('form')}
                style={{ width: '100%', boxShadow: 'none', border: 'none', fontFamily: 'Saira, sans-serif' }}
              >
                Get Started <ArrowRight size={16} />
              </Button>
            </div>

            <style>{`
              .hero-tile:hover[data-selected="false"] {
                background: color-mix(in srgb, var(--tile-accent) 8%, transparent) !important;
                border-color: color-mix(in srgb, var(--tile-accent) 55%, transparent) !important;
              }
              .hero-tile:hover[data-selected="false"] .hero-tile-icon {
                color: var(--tile-accent) !important;
              }
              .hero-tile:hover[data-selected="false"] .hero-tile-checkbox {
                border-color: var(--tile-accent) !important;
              }
              .hero-card-headline {
                color: var(--v2-text);
                background: linear-gradient(
                  90deg,
                  var(--v2-text) 0%,
                  var(--v2-text) 35%,
                  #8E59FF 50%,
                  var(--v2-text) 65%,
                  var(--v2-text) 100%
                );
                background-size: 200% 100%;
                -webkit-background-clip: text;
                background-clip: text;
                -webkit-text-fill-color: transparent;
                animation: heroHeadlineShine 3.5s linear infinite;
              }
              @keyframes heroHeadlineShine {
                0%   { background-position: 100% 0; }
                100% { background-position: -100% 0; }
              }
            `}</style>
          </motion.div>
        )}

        {step === 'form' && (
          <motion.div
            key="form"
            variants={stepVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={stepTransition}
          >
            <button
              type="button"
              onClick={() => setStep('select')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                background: 'transparent',
                border: 'none',
                color: 'var(--v2-text-muted)',
                cursor: 'pointer',
                padding: 0,
                marginBottom: '14px',
                fontFamily: 'Saira, sans-serif',
                fontSize: '12px',
              }}
            >
              <ArrowLeft size={12} /> Back
            </button>

            <p
              style={{
                fontFamily: 'Saira, sans-serif',
                fontSize: '18px',
                fontWeight: 500,
                color: 'var(--v2-text)',
                marginBottom: '8px',
                lineHeight: 1.25,
              }}
            >
              Book a 20-minute demo
            </p>
            <p
              style={{
                fontFamily: 'Saira, sans-serif',
                fontSize: '12px',
                fontWeight: 400,
                color: 'var(--v2-text-secondary)',
                marginBottom: '18px',
                lineHeight: 1.5,
              }}
            >
              Share a few details and our team will reach out to schedule a walkthrough on your data.
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={labelStyle}>
                  Full Name<span style={{ color: '#dd4062' }}>*</span>
                </label>
                <input
                  type="text"
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="hero-card-input"
                  style={inputBaseStyle(!!errors.name)}
                />
                {errors.name && (
                  <p style={{ color: '#dd4062', fontSize: '11px', marginTop: '4px', fontFamily: 'Saira, sans-serif' }}>
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label style={labelStyle}>
                  E-mail Address<span style={{ color: '#dd4062' }}>*</span>
                </label>
                <input
                  type="email"
                  placeholder="Your e-mail Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="hero-card-input"
                  style={inputBaseStyle(!!errors.email)}
                />
                {errors.email && (
                  <p style={{ color: '#dd4062', fontSize: '11px', marginTop: '4px', fontFamily: 'Saira, sans-serif' }}>
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label style={labelStyle}>Phone Number</label>
                <input
                  type="tel"
                  placeholder="Your phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="hero-card-input"
                  style={inputBaseStyle(!!errors.phone)}
                />
              </div>

              <div>
                <label style={labelStyle}>Message</label>
                <textarea
                  placeholder="Tell us how can we help"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  className="hero-card-input"
                  style={{ ...inputBaseStyle(!!errors.notes), resize: 'vertical', minHeight: '72px' }}
                />
              </div>

              <Button
                type="submit"
                variant="m8-violet"
                style={{ width: '100%', marginTop: '4px', boxShadow: 'none', border: 'none', fontFamily: 'Saira, sans-serif' }}
              >
                Get in Touch
              </Button>

              <style>{`
                .hero-card-input::placeholder {
                  color: var(--v2-text-secondary);
                  opacity: 0.7;
                  font-family: 'Saira', sans-serif;
                  font-weight: 400;
                }
              `}</style>
            </form>
          </motion.div>
        )}

        {step === 'success' && (
          <motion.div
            key="success"
            variants={stepVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={stepTransition}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              padding: '24px 8px',
              minHeight: '420px',
            }}
          >
            {/* Purple circle with check + sparkles */}
            <div
              style={{
                position: 'relative',
                width: '120px',
                height: '120px',
                marginBottom: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {/* Outer soft ring */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  background: '#8E59FF14',
                }}
              />
              {/* Solid inner circle */}
              <div
                style={{
                  position: 'relative',
                  width: '72px',
                  height: '72px',
                  borderRadius: '50%',
                  background: '#8E59FF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 24px rgba(142, 89, 255, 0.35)',
                }}
              >
                <Check size={32} color="#fff" strokeWidth={3} />
              </div>
              {/* Decorative dots */}
              <span style={{ position: 'absolute', top: '14px', left: '6px', width: '6px', height: '6px', borderRadius: '50%', border: '1.5px solid #8E59FF' }} />
              <span style={{ position: 'absolute', bottom: '18px', left: '14px', width: '5px', height: '5px', borderRadius: '50%', background: '#8E59FF' }} />
              <span style={{ position: 'absolute', top: '22px', right: '12px', color: '#8E59FF', fontSize: '14px', lineHeight: 1 }}>✦</span>
              <span style={{ position: 'absolute', bottom: '10px', right: '8px', width: '7px', height: '7px', borderRadius: '50%', border: '1.5px solid #8E59FF' }} />
              <span style={{ position: 'absolute', top: '4px', right: '32px', color: '#8E59FF', fontSize: '10px', lineHeight: 1 }}>✦</span>
            </div>

            <p
              style={{
                fontFamily: 'Saira, sans-serif',
                fontSize: '20px',
                fontWeight: 500,
                color: 'var(--v2-text)',
                marginBottom: '12px',
              }}
            >
              Lock It In
            </p>
            <p
              style={{
                fontFamily: 'Saira, sans-serif',
                fontSize: '12px',
                fontWeight: 400,
                color: 'var(--v2-text-secondary)',
                lineHeight: 1.6,
                maxWidth: '260px',
                marginBottom: '22px',
              }}
            >
              Your submission is confirmed. Now pick a time and we'll walk you through the full platform, live.
            </p>

            <Button
              variant="m8-dark"
              onClick={resetAll}
              style={{ boxShadow: 'none', border: 'none', fontFamily: 'Saira, sans-serif' }}
            >
              Choose a time
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
