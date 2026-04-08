import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Slider } from '@/components/ui/slider';
import { Skeleton } from '@/components/ui/skeleton';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';
import { Loader2, BarChart2 } from 'lucide-react';
import { FeatureCard } from '@/components/cards/FeatureCard';
import { StatCard } from '@/components/cards/StatCard';
import { SuccessStoryCard } from '@/components/cards/SuccessStoryCard';
import { ProductTileCard } from '@/components/cards/ProductTileCard';
import { PricingCard } from '@/components/cards/PricingCard';
import { BlogCard } from '@/components/cards/BlogCard';

const navItems = [
  { id: 'colors', label: 'Colors', num: '01' },
  { id: 'legacy-colors', label: 'Legacy Tokens', num: '01b' },
  { id: 'typography', label: 'Typography', num: '02' },
  { id: 'legacy-type', label: 'Legacy Type', num: '02b' },
  { id: 'spacing', label: 'Spacing', num: '03' },
  { id: 'buttons', label: 'Buttons', num: '04' },
  { id: 'legacy-buttons', label: 'Legacy Buttons', num: '04b' },
  { id: 'badges', label: 'Badges', num: '05' },
  { id: 'cards', label: 'Cards', num: '06' },
  { id: 'forms', label: 'Forms', num: '07' },
  { id: 'tabs', label: 'Tabs', num: '09' },
  { id: 'accordion', label: 'Accordion', num: '10' },
  { id: 'dialog', label: 'Dialog', num: '11' },
  { id: 'carousel', label: 'Carousel', num: '12' },
  { id: 'slider', label: 'Slider', num: '13' },
  { id: 'toast', label: 'Toast', num: '14' },
  { id: 'skeleton', label: 'Skeleton', num: '15' },
  { id: 'propagation', label: 'Propagation', num: '16' },
];

function SectionWrapper({ id, num, title, description, source, children }: {
  id: string; num: string; title: string; description: string; source: string; children: React.ReactNode;
}) {
  return (
    <section id={id} style={{ paddingBottom: 64, borderBottom: '1px solid #EDF0F7' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
        <span style={{ fontFamily: 'var(--font_primary)', fontSize: 14, fontWeight: 300, color: '#8E59FF' }}>{num}</span>
        <h2 className="m8-h3-m" style={{ color: '#080D19' }}>{title}</h2>
      </div>
      <p className="m8-p5" style={{ color: '#6b7280', marginBottom: 32 }}>{description}</p>
      {children}
      <p className="m8-p6" style={{ color: '#aeb3c8', marginTop: 24 }}>Source: {source}</p>
    </section>
  );
}

function ColorSwatch({ hex, token, usage }: { hex: string; token: string; usage: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ width: '100%', height: 80, borderRadius: 8, backgroundColor: hex, border: '1px solid #EDF0F7' }} />
      <span className="m8-p6" style={{ color: '#080D19', fontWeight: 500 }}>{token}</span>
      <span className="m8-p6" style={{ color: '#6b7280' }}>{hex}</span>
      <span className="m8-p6" style={{ color: '#aeb3c8' }}>{usage}</span>
    </div>
  );
}

export default function DesignSystem() {
  const [activeSection, setActiveSection] = useState('colors');
  const [spend, setSpend] = useState([25]);

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-25% 0px -65% 0px' }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'var(--font_primary)' }}>
      <Toaster />

      {/* SIDEBAR */}
      <aside style={{
        position: 'fixed', top: 0, left: 0, width: 240, height: '100vh',
        backgroundColor: '#080D19', display: 'flex', flexDirection: 'column',
        zIndex: 50, overflowY: 'auto',
      }}>
        <div style={{ padding: '24px 20px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <div style={{ width: 24, height: 24, borderRadius: 6, background: '#8E59FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: 'white', fontSize: 12, fontWeight: 500 }}>M</span>
            </div>
            <span style={{ color: 'white', fontSize: 16, fontWeight: 500 }}>mark8 IQ</span>
          </div>
          <p style={{ color: '#aeb3c8', fontSize: 13 }}>Design System v1.0</p>
          <p style={{ color: '#6b7280', fontSize: 11, marginTop: 4 }}>Internal tool — not in site nav</p>
        </div>

        <nav style={{ padding: '12px 8px', display: 'flex', flexDirection: 'column', gap: 2 }}>
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '8px 12px', borderRadius: 6, textDecoration: 'none',
                fontSize: 13, transition: 'background 0.15s',
                backgroundColor: activeSection === item.id ? 'rgba(142,89,255,0.15)' : 'transparent',
                color: activeSection === item.id ? '#8E59FF' : '#aeb3c8',
              }}
            >
              <span style={{ fontSize: 11, opacity: 0.5, width: 24 }}>{item.num}</span>
              <span>{item.label}</span>
            </a>
          ))}
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main style={{ marginLeft: 240, flex: 1, padding: '48px 64px', maxWidth: 960 }}>
        {/* PAGE HEADER */}
        <div style={{ marginBottom: 64 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: '#8E59FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: 'white', fontSize: 16, fontWeight: 500 }}>M</span>
            </div>
            <Badge variant="outline" style={{ fontSize: 11, borderColor: '#8E59FF', color: '#8E59FF' }}>Internal Tool</Badge>
          </div>
          <h1 className="m8-h1-large" style={{ color: '#080D19', marginBottom: 8 }}>Mark8 IQ Design System</h1>
          <p className="m8-p4" style={{ color: '#6b7280', marginBottom: 16 }}>Version 1.0, April 2026</p>
          <p className="m8-p5" style={{ color: '#6b7280', maxWidth: 640 }}>
            Source of truth for all UI tokens, components, and patterns.
            CSS variable changes on this page propagate to the entire site via the{' '}
            <code style={{ background: '#EDF0F7', padding: '2px 6px', borderRadius: 4, fontSize: 13 }}>:root</code>{' '}
            bridge in src/index.css.
          </p>
        </div>

        {/* SECTION 01: Colors */}
        <SectionWrapper id="colors" num="01" title="Colors" description="New design token colors. Defined as CSS variables in src/index.css." source="src/index.css :root">
          <h3 className="m8-p3-medium" style={{ color: '#080D19', marginBottom: 16 }}>Brand Core</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 40 }}>
            <ColorSwatch hex="#8E59FF" token="--m8-violet" usage="Primary brand, CTA background" />
            <ColorSwatch hex="#EDF0F7" token="--m8-light" usage="Page backgrounds, light sections" />
            <ColorSwatch hex="#080D19" token="--m8-dark" usage="Dark hero, nav, dark cards" />
          </div>
          <h3 className="m8-p3-medium" style={{ color: '#080D19', marginBottom: 16 }}>Product Accents</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 40 }}>
            <ColorSwatch hex="#FC7459" token="--m8-ads" usage="Mark8 Ads" />
            <ColorSwatch hex="#6895FC" token="--m8-sight" usage="Mark8 Sight" />
            <ColorSwatch hex="#52BFBC" token="--m8-returns" usage="Mark8 Returns" />
            <ColorSwatch hex="#7CBC71" token="--m8-reco" usage="Mark8 Reco" />
            <ColorSwatch hex="#FCB24F" token="--m8-inventory" usage="Mark8 Inventory" />
            <ColorSwatch hex="#DD4062" token="--m8-pink" usage="Alerts, destructive" />
          </div>
          <h3 className="m8-p3-medium" style={{ color: '#080D19', marginBottom: 16 }}>Utility</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            <ColorSwatch hex="#ffffff" token="--m8-white" usage="Backgrounds, cards" />
            <ColorSwatch hex="#6b7280" token="--m8-muted" usage="Secondary text" />
          </div>
        </SectionWrapper>

        {/* SECTION 01b: Legacy Colors */}
        <SectionWrapper id="legacy-colors" num="01b" title="Legacy Color Tokens" description="CSS variables consumed by mark8iq.css across all existing pages." source="mark8iq.css :root (read-only values)">
          <div style={{ background: '#FFF7ED', border: '1px solid #FCB24F', borderRadius: 8, padding: 16, marginBottom: 24 }}>
            <p className="m8-p5" style={{ color: '#080D19', fontWeight: 500, marginBottom: 4 }}>Propagation bridge</p>
            <p className="m8-p6" style={{ color: '#6b7280' }}>
              These variables are consumed by mark8iq.css across all existing pages.
              Editing their values in src/index.css updates the entire site instantly.
              The --m8-* tokens above are aliases that point to these variables.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            {[
              { hex: '#8e59ff', token: '--color_primary' },
              { hex: '#c1b0ff', token: '--color_primary_light' },
              { hex: '#aeb3c8', token: '--color_primary_muted' },
              { hex: '#40445a', token: '--color_primary_dark' },
              { hex: '#edeff7', token: '--color_primary_contrast' },
              { hex: '#080d19', token: '--color_neutral_dark' },
              { hex: '#edf0f7', token: '--color_neutral_light' },
              { hex: '#12182b', token: '--color_text' },
              { hex: '#ffffff', token: '--color_white' },
              { hex: '#000000', token: '--color_black' },
              { hex: '#6895fc', token: '--color_blue' },
              { hex: '#52bfbc', token: '--color_teal' },
              { hex: '#7cbc71', token: '--color_green' },
              { hex: '#fcb24f', token: '--color_yellow' },
              { hex: '#fc7459', token: '--color_orange' },
              { hex: '#dd4062', token: '--color_red' },
            ].map(({ hex, token }) => (
              <ColorSwatch key={token} hex={hex} token={token} usage="Used in mark8iq.css" />
            ))}
          </div>
        </SectionWrapper>

        {/* SECTION 02: Typography */}
        <SectionWrapper id="typography" num="02" title="Typography" description="New typographic scale. All titles use Saira 400 with -0.03em tracking." source="src/index.css .m8-* classes">
          <h3 className="m8-p3-medium" style={{ color: '#080D19', marginBottom: 16 }}>Titles</h3>
          {[
            { cls: 'm8-h1-display', label: 'Headline 1 Display', specs: '80px / Regular 400 / LH 110% / LS -0.03em' },
            { cls: 'm8-h1-large', label: 'Headline 1 Large', specs: '60px / Regular 400 / LH 110% / LS -0.03em' },
            { cls: 'm8-h2', label: 'Headline 2', specs: '50px / Regular 400 / LH 60px / LS -0.03em' },
            { cls: 'm8-h3-xl', label: 'Headline 3 XL', specs: '40px / Regular 400 / LH 30px / LS -0.03em' },
            { cls: 'm8-h3-l', label: 'Headline 3 L', specs: '35px / Regular 400 / LH 45px / LS -0.03em' },
            { cls: 'm8-h3-m', label: 'Headline 3 M', specs: '30px / Regular 400 / LH 30px / LS -0.03em' },
            { cls: 'm8-h4', label: 'Headline 4', specs: '28px / Regular 400 / LH 110% / LS -0.03em' },
          ].map(({ cls, label, specs }) => (
            <div key={cls} style={{ display: 'flex', alignItems: 'baseline', gap: 24, padding: '16px 0', borderBottom: '1px solid #EDF0F7' }}>
              <div style={{ width: 200, flexShrink: 0 }}>
                <p className="m8-p6" style={{ color: '#080D19', fontWeight: 500 }}>{label}</p>
                <p className="m8-p6" style={{ color: '#aeb3c8', whiteSpace: 'pre-line' }}>{specs}{'\n'}Class: .{cls}</p>
              </div>
              <div className={cls} style={{ color: '#080D19' }}>Mark8 IQ</div>
            </div>
          ))}

          <h3 className="m8-p3-medium" style={{ color: '#080D19', marginTop: 32, marginBottom: 16 }}>Paragraphs</h3>
          {[
            { cls: 'm8-p1', label: 'Paragraph 1', specs: '25px / Regular 400 / LH 150% / LS -0.03em' },
            { cls: 'm8-p2', label: 'Paragraph 2', specs: '24px / Regular 400 / LH 35px / LS 0' },
            { cls: 'm8-p3', label: 'Paragraph 3', specs: '20px / Regular 400 / LH normal / LS 0' },
            { cls: 'm8-p3-medium', label: 'Paragraph 3 Medium', specs: '20px / Medium 500 / LH normal / LS 0' },
            { cls: 'm8-p4', label: 'Paragraph 4', specs: '18px / Regular 400 / LH normal / LS 0' },
            { cls: 'm8-p5', label: 'Paragraph 5', specs: '16px / Light 300 / LH 24px / LS 0' },
            { cls: 'm8-p6', label: 'Paragraph 6', specs: '14px / Light 300 / LH normal / LS 0' },
          ].map(({ cls, label, specs }) => (
            <div key={cls} style={{ display: 'flex', alignItems: 'baseline', gap: 24, padding: '16px 0', borderBottom: '1px solid #EDF0F7' }}>
              <div style={{ width: 200, flexShrink: 0 }}>
                <p className="m8-p6" style={{ color: '#080D19', fontWeight: 500 }}>{label}</p>
                <p className="m8-p6" style={{ color: '#aeb3c8', whiteSpace: 'pre-line' }}>{specs}{'\n'}Class: .{cls}</p>
              </div>
              <div className={cls} style={{ color: '#080D19' }}>Unify all your eCommerce data on one platform</div>
            </div>
          ))}

          <div style={{ background: '#EDF0F7', borderRadius: 8, padding: 16, marginTop: 32 }}>
            <p className="m8-p5" style={{ color: '#080D19', fontWeight: 500, marginBottom: 8 }}>Typography rules</p>
            <ul style={{ listStyle: 'disc', paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 4 }}>
              <li className="m8-p6" style={{ color: '#6b7280' }}>font-weight 400 on ALL headlines. Never 600. Never 700.</li>
              <li className="m8-p6" style={{ color: '#6b7280' }}>font-weight 500 only on .m8-p3-medium</li>
              <li className="m8-p6" style={{ color: '#6b7280' }}>font-weight 300 only on .m8-p5 and .m8-p6</li>
              <li className="m8-p6" style={{ color: '#6b7280' }}>letter-spacing -0.03em on all titles and .m8-p1. Zero on all paragraphs.</li>
              <li className="m8-p6" style={{ color: '#6b7280' }}>Sentence case on all text. No all-caps.</li>
              <li className="m8-p6" style={{ color: '#6b7280' }}>Never write letter-spacing: -3%. That is invalid CSS. Use -0.03em.</li>
            </ul>
          </div>
        </SectionWrapper>

        {/* SECTION 02b: Legacy Typography */}
        <SectionWrapper id="legacy-type" num="02b" title="Legacy Typography" description="Existing utility classes from mark8iq.css used by current pages." source="mark8iq.css (read-only)">
          <div style={{ background: '#FEF2F2', border: '1px solid #DD4062', borderRadius: 8, padding: 16, marginBottom: 24 }}>
            <p className="m8-p5" style={{ color: '#080D19', fontWeight: 500, marginBottom: 4 }}>Read-only</p>
            <p className="m8-p6" style={{ color: '#6b7280' }}>These classes exist in mark8iq.css and are used by existing pages. They cannot be modified. Use the new .m8-* classes for all new components.</p>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #EDF0F7' }}>
                {['Class', 'Desktop', 'Mobile', 'Usage'].map(h => (
                  <th key={h} className="m8-p6" style={{ textAlign: 'left', padding: '8px 12px', color: '#6b7280', fontWeight: 500 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['fs_80', '80px / LH 1.125', '40px', 'Hero headlines'],
                ['fs_50 / section_title', '50px / LH 1.1 / LS -3px', '30px', 'Section titles'],
                ['fs_40', '40px / LH 1.25', '26px', 'Sub-section titles'],
                ['fs_30', '30px / LH 1.33', '20px', 'Card headings'],
                ['fs_18 / section_desc', '18px / LH 1.5', '16px', 'Body copy'],
                ['fs_16', '16px / LH 1.5', '14px', 'Secondary text'],
                ['fs_14', '14px / LH 1.57', '—', 'Captions'],
                ['fs_12', '12px / LH 1.57', '—', 'Labels'],
              ].map(([cls, desktop, mobile, usage]) => (
                <tr key={cls} style={{ borderBottom: '1px solid #EDF0F7' }}>
                  <td className="m8-p6" style={{ padding: '8px 12px', color: '#8E59FF' }}><code>{cls}</code></td>
                  <td className="m8-p6" style={{ padding: '8px 12px', color: '#080D19' }}>{desktop}</td>
                  <td className="m8-p6" style={{ padding: '8px 12px', color: '#080D19' }}>{mobile}</td>
                  <td className="m8-p6" style={{ padding: '8px 12px', color: '#6b7280' }}>{usage}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="m8-p6" style={{ color: '#6b7280', marginTop: 16 }}>Weight classes (reference): fw_300, fw_400, fw_500, fw_600, fw_700, fw_800</p>
        </SectionWrapper>

        {/* SECTION 03: Spacing */}
        <SectionWrapper id="spacing" num="03" title="Spacing" description="Spacing scale used across the design system." source="Tailwind spacing utilities">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { token: '4xs', px: 4, tw: 'p-1' },
              { token: '3xs', px: 8, tw: 'p-2' },
              { token: '2xs', px: 12, tw: 'p-3' },
              { token: 'xs', px: 16, tw: 'p-4' },
              { token: 'sm', px: 24, tw: 'p-6' },
              { token: 'md', px: 32, tw: 'p-8' },
              { token: 'lg', px: 40, tw: 'p-10' },
              { token: 'xl', px: 64, tw: 'p-16' },
              { token: '2xl', px: 96, tw: 'p-24' },
            ].map(({ token, px, tw }) => (
              <div key={token} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ width: px, height: 20, backgroundColor: '#8E59FF', borderRadius: 2, flexShrink: 0 }} />
                <span className="m8-p6" style={{ width: 40, color: '#080D19', fontWeight: 500 }}>{token}</span>
                <span className="m8-p6" style={{ width: 50, color: '#6b7280' }}>{px}px</span>
                <code className="m8-p6" style={{ color: '#aeb3c8' }}>{tw}</code>
              </div>
            ))}
          </div>
        </SectionWrapper>

        {/* SECTION 04: Buttons */}
        <SectionWrapper id="buttons" num="04" title="Buttons" description="New shadcn button variants styled for the Mark8 IQ brand." source="src/components/ui/button.tsx">
          <h3 className="m8-p3-medium" style={{ color: '#080D19', marginBottom: 16 }}>Brand Patterns</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 32 }}>
            {[
              { cls: 'btn-m8-dark', copy: 'Get in Touch', note: 'Dark section backgrounds, hero CTAs' },
              { cls: 'btn-m8-violet', copy: 'Get in Touch', note: 'Light section backgrounds, primary actions' },
              { cls: 'btn-m8-outline-dark', copy: 'Contact Our Team', note: 'Secondary actions on dark sections' },
              { cls: 'btn-m8-outline-violet', copy: 'Contact Our Team', note: 'Secondary actions on light sections' },
            ].map(({ cls, copy, note }) => (
              <div key={cls} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <button className={cls}>{copy}</button>
                <code className="m8-p6" style={{ color: '#aeb3c8' }}>.{cls}</code>
                <p className="m8-p6" style={{ color: '#6b7280', textAlign: 'center' }}>{note}</p>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32, padding: '16px 0', borderTop: '1px solid #EDF0F7' }}>
            <button className="btn-m8-ghost">Learn more</button>
            <span className="m8-p6" style={{ color: '#aeb3c8' }}>.btn-m8-ghost — tertiary actions, "Learn more" links</span>
          </div>

          <h3 className="m8-p3-medium" style={{ color: '#080D19', marginBottom: 16 }}>States</h3>
          <div style={{ display: 'flex', gap: 24, marginBottom: 32 }}>
            {[
              { label: 'Normal', el: <button className="btn-m8-violet">Normal</button> },
              { label: 'Hover', el: <button className="btn-m8-violet" style={{ backgroundColor: 'rgba(142,89,255,0.85)' }}>Hover</button> },
              { label: 'Disabled', el: <button className="btn-m8-violet" disabled>Disabled</button> },
              { label: 'Loading', el: <button className="btn-m8-violet" disabled><Loader2 style={{ width: 16, height: 16 }} className="animate-spin" />Loading</button> },
            ].map(({ label, el }) => (
              <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                {el}
                <p className="m8-p6" style={{ color: '#6b7280' }}>{label}</p>
              </div>
            ))}
          </div>

          <h3 className="m8-p3-medium" style={{ color: '#080D19', marginBottom: 16 }}>Sizes</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <button className="btn-m8-violet btn-size-sm">Small</button>
            <button className="btn-m8-violet">Default</button>
            <button className="btn-m8-violet btn-size-lg">Large</button>
          </div>
        </SectionWrapper>

        {/* SECTION 04b: Legacy Buttons */}
        <SectionWrapper id="legacy-buttons" num="04b" title="Legacy Buttons" description="HTML structures used in existing pages via dangerouslySetInnerHTML." source="mark8iq.css (read-only)">
          <div style={{ background: '#FEF2F2', border: '1px solid #DD4062', borderRadius: 8, padding: 16, marginBottom: 24 }}>
            <p className="m8-p5" style={{ color: '#080D19', fontWeight: 500, marginBottom: 4 }}>Legacy — Read-only pattern</p>
            <p className="m8-p6" style={{ color: '#6b7280' }}>These are the HTML structures used in existing pages via dangerouslySetInnerHTML. Do not use them for new components. Use shadcn Button variants above.</p>
          </div>
          <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <p className="m8-p6" style={{ color: '#080D19', fontWeight: 500 }}>Solid (dark)</p>
              <div dangerouslySetInnerHTML={{ __html: `<span class="Button_btn_wrap__DW66V false"><button class="fs_18 font_primary fw_400 Button_btn_common_styles__ddJx7 bg_neutral_dark"><span>Get in Touch</span></button></span>` }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <p className="m8-p6" style={{ color: '#080D19', fontWeight: 500 }}>Gradient-bordered</p>
              <div dangerouslySetInnerHTML={{ __html: `<span class="Button_btn_wrap__DW66V Button_gradientBordered__mLA7E"><button class="fs_18 font_primary fw_400 Button_btn_common_styles__ddJx7"><span>Contact Our Team</span></button><span class="Button_gradientBorderedBg__t_hMi"></span></span>` }} />
            </div>
          </div>
        </SectionWrapper>

        {/* SECTION 05: Badges */}
        <SectionWrapper id="badges" num="05" title="Badges" description="Product-specific badge variants for tagging and labelling." source="src/components/ui/badge.tsx">
          <h3 className="m8-p3-medium" style={{ color: '#080D19', marginBottom: 16 }}>Product Variants</h3>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
            <span className="badge-m8-ads">Mark8 Ads</span>
            <span className="badge-m8-sight">Mark8 Sight</span>
            <span className="badge-m8-shelf">Mark8 Shelf</span>
            <span className="badge-m8-returns">Mark8 Returns</span>
            <span className="badge-m8-reco">Mark8 Reco</span>
            <span className="badge-m8-inventory">Mark8 Inventory</span>
          </div>
          <h3 className="m8-p3-medium" style={{ color: '#080D19', marginBottom: 16 }}>shadcn Defaults</h3>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
          </div>
        </SectionWrapper>

        {/* SECTION 06: Cards */}
        <SectionWrapper id="cards" num="06" title="Cards" description="Composite card components for use across the site." source="src/components/cards/">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            <FeatureCard
              icon={<BarChart2 size={20} />}
              heading="Drill-through visibility"
              body="Move from marketplace overview to SKU detail to pinpoint what is working."
            />
            <ProductTileCard
              badge={<Badge variant="m8-ads">AD</Badge>}
              name="Mark8 Ads"
              description="Turbocharge ROI with ad insights that click."
              link="/products/ads"
            />
            <PricingCard
              plan="Growth"
              price="₹49,999/mo"
              features={['Up to 500 SKUs', 'All 5 products', 'Dedicated CSM']}
              cta={<Button variant="m8-violet" style={{ width: '100%' }}>Book Now</Button>}
            />
            <StatCard number="3.2x" label="Average ROAS" trend="↑ 24% vs last quarter" />
            <SuccessStoryCard
              brand="Urban Gabru"
              metric="3.2x ROAS"
              excerpt="From fragmented reports to growth across Amazon and Flipkart."
              date="Feb 2026"
            />
            <BlogCard
              date="March 2026"
              title="How PRISM unifies marketplace data"
              excerpt="A deep dive into the hybrid RPA and API engine behind Mark8 IQ."
              link="/blogs/prism"
            />
          </div>
        </SectionWrapper>

        {/* SECTION 07: Forms */}
        <SectionWrapper id="forms" num="07" title="Forms" description="Form elements with default, error, and disabled states." source="src/components/ui/">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label className="shadcn-label">Brand name</label>
              <input className="shadcn-input" placeholder="Brand name" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label className="shadcn-label">Brand name (error)</label>
              <input className="shadcn-input error" placeholder="Brand name" />
              <span className="shadcn-error">This field is required</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label className="shadcn-label">Brand name (disabled)</label>
              <input className="shadcn-input" placeholder="Brand name" disabled />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label className="shadcn-label">Describe your challenge</label>
              <textarea className="shadcn-textarea" placeholder="Describe your challenge" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label className="shadcn-label">Marketplace</label>
              <Select>
                <SelectTrigger className="shadcn-select-trigger"><SelectValue placeholder="Select marketplace" /></SelectTrigger>
                <SelectContent className="shadcn-select-content">
                  <SelectItem className="shadcn-select-item" value="amazon">Amazon</SelectItem>
                  <SelectItem className="shadcn-select-item" value="flipkart">Flipkart</SelectItem>
                  <SelectItem className="shadcn-select-item" value="myntra">Myntra</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Checkbox id="agree" className="shadcn-checkbox" />
                <label className="shadcn-label" htmlFor="agree" style={{ marginBottom: 0 }}>I agree to be contacted</label>
              </div>
              <RadioGroup defaultValue="general">
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <RadioGroupItem value="general" id="general" className="shadcn-radio" />
                  <label className="shadcn-label" htmlFor="general" style={{ marginBottom: 0 }}>General Enquiry</label>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <RadioGroupItem value="demo" id="demo" className="shadcn-radio" />
                  <label className="shadcn-label" htmlFor="demo" style={{ marginBottom: 0 }}>Schedule a Demo</label>
                </div>
              </RadioGroup>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Switch id="email-notif" className="shadcn-switch" />
                <label className="shadcn-label" htmlFor="email-notif" style={{ marginBottom: 0 }}>Email notifications</label>
              </div>
            </div>
          </div>
        </SectionWrapper>

        {/* SECTION 09: Tabs */}
        <SectionWrapper id="tabs" num="09" title="Tabs" description="Tabbed content for switching between product views." source="src/components/ui/tabs.tsx">
          <Tabs defaultValue="ads">
            <TabsList className="shadcn-tabs-list">
              <TabsTrigger className="shadcn-tabs-trigger" value="ads">Mark8 Ads</TabsTrigger>
              <TabsTrigger className="shadcn-tabs-trigger" value="sight">Mark8 Sight</TabsTrigger>
              <TabsTrigger className="shadcn-tabs-trigger" value="shelf">Mark8 Shelf</TabsTrigger>
              <TabsTrigger className="shadcn-tabs-trigger" value="reco">Mark8 Reco</TabsTrigger>
              <TabsTrigger className="shadcn-tabs-trigger" value="returns">Mark8 Returns</TabsTrigger>
            </TabsList>
            <TabsContent className="shadcn-tabs-content" value="ads"><p>Turbocharge ROI with ad insights that connect every spend decision to real marketplace performance.</p></TabsContent>
            <TabsContent className="shadcn-tabs-content" value="sight"><p>Benchmark share of voice, track keyword rankings, and monitor Buy Box ownership across all competitors.</p></TabsContent>
            <TabsContent className="shadcn-tabs-content" value="shelf"><p>Detect stockouts before they happen with DOSH calculations and unified inventory ageing across all warehouses.</p></TabsContent>
            <TabsContent className="shadcn-tabs-content" value="reco"><p>Match every marketplace transaction across sales, returns, fees, and settlements into one reconciled view.</p></TabsContent>
            <TabsContent className="shadcn-tabs-content" value="returns"><p>Track every return from initiation to final resolution with mobile-first execution and granular loss attribution.</p></TabsContent>
          </Tabs>
        </SectionWrapper>

        {/* SECTION 10: Accordion */}
        <SectionWrapper id="accordion" num="10" title="Accordion" description="Collapsible FAQ sections." source="src/components/ui/accordion.tsx">
          <Accordion type="single" collapsible>
            <AccordionItem value="q1">
              <AccordionTrigger>Which marketplaces does Mark8 IQ support?</AccordionTrigger>
              <AccordionContent>Amazon, Flipkart, Myntra, Nykaa, Zepto, Blinkit, and 9 more. New marketplaces are added based on client demand.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="q2">
              <AccordionTrigger>How does PRISM pull data without full API access?</AccordionTrigger>
              <AccordionContent>PRISM is a hybrid RPA and API engine. It standardises data from direct marketplace APIs, RPA-based report extraction, and login-based data downloads.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="q3">
              <AccordionTrigger>Is Mark8 IQ suitable for a brand with 5 SKUs?</AccordionTrigger>
              <AccordionContent>Mark8 IQ is built for D2C brands managing multi-marketplace operations. It scales from 5 SKUs to 50,000 SKUs.</AccordionContent>
            </AccordionItem>
          </Accordion>
        </SectionWrapper>

        {/* SECTION 11: Dialog */}
        <SectionWrapper id="dialog" num="11" title="Dialog" description="Modal dialog for forms and confirmations." source="src/components/ui/dialog.tsx">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="m8-violet">Open Demo Dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Book a demo</DialogTitle>
                <DialogDescription>See Mark8 IQ in action. 30 minutes, no sales pitch.</DialogDescription>
              </DialogHeader>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingTop: 16 }}>
                <Input placeholder="Full name" />
                <Input placeholder="Work email" />
                <Input placeholder="Company" />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, paddingTop: 16 }}>
                <Button variant="outline">Cancel</Button>
                <Button variant="m8-violet">Book Now</Button>
              </div>
            </DialogContent>
          </Dialog>
        </SectionWrapper>

        {/* SECTION 12: Carousel */}
        <SectionWrapper id="carousel" num="12" title="Carousel" description="Success story carousel with navigation." source="src/components/ui/carousel.tsx">
          <Carousel className="w-full">
            <CarouselContent>
              {[
                { brand: 'Urban Gabru', metric: '3.2x ROAS', excerpt: 'From fragmented reports to growth across Amazon and Flipkart.', date: 'Feb 2026' },
                { brand: 'Sugar Cosmetics', metric: '27% less wasted spend', excerpt: 'Ad budgets aligned to real attribution across 6 marketplaces.', date: 'Jan 2026' },
                { brand: 'NGT Habit', metric: '35% ROAS improvement', excerpt: 'Unified data across Blinkit and Amazon for the first time.', date: 'Mar 2026' },
              ].map((props) => (
                <CarouselItem key={props.brand} className="md:basis-1/2">
                  <SuccessStoryCard {...props} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </SectionWrapper>

        {/* SECTION 13: Slider */}
        <SectionWrapper id="slider" num="13" title="Slider" description="Range slider for budget and filter inputs." source="src/components/ui/slider.tsx">
          <div style={{ maxWidth: 400 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <Label>Monthly ad spend</Label>
              <span className="m8-p5" style={{ color: '#8E59FF', fontWeight: 500 }}>{spend[0]}L</span>
            </div>
            <Slider value={spend} onValueChange={setSpend} min={10} max={80} step={1} />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
              <span className="m8-p6" style={{ color: '#6b7280' }}>10L</span>
              <span className="m8-p6" style={{ color: '#6b7280' }}>80L</span>
            </div>
          </div>
        </SectionWrapper>

        {/* SECTION 14: Toast */}
        <SectionWrapper id="toast" num="14" title="Toast" description="Notification toasts for feedback and alerts." source="sonner">
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Button variant="m8-violet" onClick={() => toast.success('Dashboard synced. Data refreshed from all marketplaces.')}>Success</Button>
            <Button variant="m8-dark" onClick={() => toast.error('Sync failed. Check your marketplace credentials.')}>Error</Button>
            <Button variant="m8-outline-violet" onClick={() => toast('PRISM refresh in progress. Data updates within 60 minutes.')}>Info</Button>
            <Button variant="m8-outline-dark" onClick={() => toast.warning('Ad spend approaching 80L threshold. Review budget.')}>Warning</Button>
          </div>
        </SectionWrapper>

        {/* SECTION 15: Skeleton */}
        <SectionWrapper id="skeleton" num="15" title="Skeleton" description="Loading placeholders for cards and content." source="src/components/ui/skeleton.tsx">
          <div style={{ display: 'flex', gap: 16 }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12, padding: 24, border: '1px solid #EDF0F7', borderRadius: 12 }}>
              <Skeleton className="h-10 w-10 rounded-lg" />
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12, padding: 24, border: '1px solid #EDF0F7', borderRadius: 12 }}>
              <Skeleton className="h-8 w-1/2" />
              <Skeleton className="h-5 w-2/3" />
              <Skeleton className="h-4 w-1/3" />
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12, padding: 24, border: '1px solid #EDF0F7', borderRadius: 12 }}>
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-1/3" />
            </div>
          </div>
        </SectionWrapper>

        {/* SECTION 16: Propagation */}
        <SectionWrapper id="propagation" num="16" title="Propagation Reference" description="How design system changes propagate across the site." source="Architecture documentation">
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #EDF0F7' }}>
                <th className="m8-p6" style={{ textAlign: 'left', padding: '8px 12px', color: '#6b7280', fontWeight: 500 }}>What</th>
                <th className="m8-p6" style={{ textAlign: 'left', padding: '8px 12px', color: '#6b7280', fontWeight: 500 }}>How it propagates</th>
                <th className="m8-p6" style={{ textAlign: 'left', padding: '8px 12px', color: '#6b7280', fontWeight: 500 }}>Scope</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Colors (legacy)', 'Edit --color_* variables in src/index.css :root', 'Entire site (mark8iq.css reads these)'],
                ['Colors (new)', 'Edit --m8-* variables in src/index.css :root', 'New components only'],
                ['New components', 'Edit component file in src/components/ui/', 'Every page that imports it'],
                ['Composite cards', 'Edit component file in src/components/cards/', 'Every page that uses it'],
                ['Typography (new)', 'Edit .m8-* classes in src/index.css', 'New components only'],
                ['Typography (legacy)', 'Edit fs_* classes — NOT POSSIBLE (mark8iq.css is read-only)', 'Cannot be changed'],
                ['Legacy buttons', 'Cannot be changed — hardcoded HTML strings in page components', 'Must refactor page to use shadcn Button'],
              ].map(([what, how, scope]) => (
                <tr key={what} style={{ borderBottom: '1px solid #EDF0F7' }}>
                  <td className="m8-p6" style={{ padding: '8px 12px', color: '#080D19', fontWeight: 500 }}>{what}</td>
                  <td className="m8-p6" style={{ padding: '8px 12px', color: '#6b7280' }}>{how}</td>
                  <td className="m8-p6" style={{ padding: '8px 12px', color: '#6b7280' }}>{scope}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </SectionWrapper>

      </main>
    </div>
  );
}
