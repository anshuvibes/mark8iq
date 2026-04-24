import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  TrendingUp,
  Eye,
  Package,
  RotateCcw,
  BarChart3,
  Search,
  Zap,
  Bot,
  Layers,
  Check,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { z } from 'zod';

type Step = 'select' | 'form' | 'success';

interface ValueTile {
  id: string;
  label: string;
  accent: string;
  Icon: typeof TrendingUp;
}

const TILES: ValueTile[] = [
  { id: 'ads', label: 'Ad Performance', accent: '#dd4062', Icon: TrendingUp },
  { id: 'visibility', label: 'Market Visibility', accent: '#52bfbc', Icon: Eye },
  { id: 'shelf', label: 'Shelf Health', accent: '#6895fc', Icon: Package },
  { id: 'returns', label: 'Returns Control', accent: '#fc7459', Icon: RotateCcw },
  { id: 'reco', label: 'Financial Clarity', accent: '#7cbc71', Icon: BarChart3 },
  { id: 'keyword', label: 'Keyword Strategy', accent: '#dd4062', Icon: Search },
  { id: 'qcomm', label: 'Quick Commerce', accent: '#fcb24f', Icon: Zap },
  { id: 'ai', label: 'AI Automation', accent: '#8E59FF', Icon: Bot },
  { id: 'unified', label: 'Unified Data', accent: '#8E59FF', Icon: Layers },
];

const formSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name').max(80),
  email: z.string().trim().email('Enter a valid work email').max(120),
  phone: z.string().trim().max(20).optional().or(z.literal('')),
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
  const [errors, setErrors] = useState<{ name?: string; email?: string; phone?: string }>({});

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
    const result = formSchema.safeParse({ name, email, phone });
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
    console.log('Demo request', {
      selected: Array.from(selected),
      ...result.data,
    });
    setStep('success');
  };

  return (
    <div
      className="hero-module-card"
      style={{
        position: 'absolute',
        top: '24px',
        right: '-24px',
        width: '340px',
        background: 'var(--v2-bg-card)',
        borderRadius: '18px',
        padding: '26px 22px',
        boxShadow: '0 12px 40px var(--v2-shadow)',
        border: '1px solid var(--v2-border)',
        zIndex: 2,
        overflow: 'hidden',
      }}
    >
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
                const Icon = tile.Icon;
                return (
                  <button
                    key={tile.id}
                    type="button"
                    onClick={() => toggle(tile.id)}
                    data-accent={tile.accent}
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
                      // expose accent for hover via CSS var
                      ['--tile-accent' as string]: tile.accent,
                    }}
                  >
                    {/* Checkbox top-left */}
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

                    <Icon
                      size={18}
                      className="hero-tile-icon"
                      style={{
                        color: isSelected ? tile.accent : 'var(--v2-text-secondary)',
                        strokeWidth: 1.5,
                        transition: 'color 0.18s ease',
                      }}
                    />
                    <span
                      style={{
                        fontFamily: 'Saira, sans-serif',
                        fontSize: '11px',
                        fontWeight: 400,
                        color: 'var(--v2-text)',
                        lineHeight: 1.2,
                        wordBreak: 'break-word',
                      }}
                    >
                      {tile.label}
                    </span>
                  </button>
                );
              })}
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                variant="m8-violet"
                onClick={() => setStep('form')}
              >
                Get Started <ArrowRight size={16} />
              </Button>
            </div>

            <style>{`
              .hero-tile:hover:not([data-selected="true"]) {
                background: color-mix(in srgb, var(--tile-accent) 8%, transparent) !important;
                border-color: color-mix(in srgb, var(--tile-accent) 55%, transparent) !important;
              }
              .hero-tile:hover .hero-tile-icon {
                color: var(--tile-accent) !important;
              }
              .hero-tile:hover .hero-tile-checkbox {
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
              @media (max-width: 1280px) {
                .hero-module-card { width: 320px !important; }
              }
              @media (max-width: 991px) {
                .hero-module-card { width: 100% !important; max-width: 420px; margin: 16px auto 0; }
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
                marginBottom: '12px',
              }}
              className="m8-p6"
            >
              <ArrowLeft size={12} /> Change selection
            </button>

            <p className="m8-p4" style={{ color: 'var(--v2-text)', marginBottom: '6px' }}>
              Book a 20-minute demo
            </p>
            <p className="m8-p6" style={{ color: 'var(--v2-text-secondary)', marginBottom: '18px' }}>
              We'll show you exactly how Mark8 IQ works on your data.
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <input
                  type="text"
                  placeholder="Full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="m8-p6"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: `1px solid ${errors.name ? '#dd4062' : 'var(--v2-border)'}`,
                    background: 'var(--v2-bg-subtle)',
                    color: 'var(--v2-text)',
                    outline: 'none',
                  }}
                />
                {errors.name && (
                  <p className="m8-p6" style={{ color: '#dd4062', marginTop: '4px' }}>{errors.name}</p>
                )}
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Work email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="m8-p6"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: `1px solid ${errors.email ? '#dd4062' : 'var(--v2-border)'}`,
                    background: 'var(--v2-bg-subtle)',
                    color: 'var(--v2-text)',
                    outline: 'none',
                  }}
                />
                {errors.email && (
                  <p className="m8-p6" style={{ color: '#dd4062', marginTop: '4px' }}>{errors.email}</p>
                )}
              </div>
              <div>
                <input
                  type="tel"
                  placeholder="Phone (optional)"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="m8-p6"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: `1px solid ${errors.phone ? '#dd4062' : 'var(--v2-border)'}`,
                    background: 'var(--v2-bg-subtle)',
                    color: 'var(--v2-text)',
                    outline: 'none',
                  }}
                />
              </div>

              <Button type="submit" variant="m8-violet" style={{ width: '100%', marginTop: '4px' }}>
                Get in Touch
              </Button>
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
            style={{ textAlign: 'center', padding: '12px 4px' }}
          >
            <img
              src="/img/product-logos/black/mark8-iq.svg"
              alt="Mark8 IQ"
              style={{ height: '24px', width: 'auto', margin: '0 auto 18px', display: 'block' }}
            />
            <p className="m8-p3" style={{ color: 'var(--v2-text)', marginBottom: '10px' }}>
              You're on the list
            </p>
            <p className="m8-p6" style={{ color: 'var(--v2-text-secondary)', lineHeight: 1.5 }}>
              Someone from our team will reach out within a few hours. Meanwhile, keep exploring.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
