import { useState, useEffect, useRef, useCallback } from 'react';
import { BarChart2, Eye, ShoppingCart, RotateCcw, Sparkles, Package, Search, TrendingUp, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { toast } from 'sonner';
import { FeatureCard } from '@/components/cards/FeatureCard';
import { StatCard } from '@/components/cards/StatCard';
import { SuccessStoryCard } from '@/components/cards/SuccessStoryCard';
import { ProductTileCard } from '@/components/cards/ProductTileCard';
import { PricingCard } from '@/components/cards/PricingCard';
import { BlogCard } from '@/components/cards/BlogCard';
import Navbar from '@/components/Navbar';

const SECTIONS = [
  { id: 'colors', num: '01', label: 'Colors' },
  { id: 'typography', num: '02', label: 'Typography' },
  { id: 'spacing', num: '03', label: 'Spacing' },
  { id: 'buttons', num: '04', label: 'Buttons' },
  { id: 'badges', num: '05', label: 'Badges' },
  { id: 'cards', num: '06', label: 'Cards' },
  { id: 'forms', num: '07', label: 'Forms' },
  { id: 'navigation', num: '08', label: 'Navigation' },
  { id: 'tabs', num: '09', label: 'Tabs' },
  { id: 'accordion', num: '10', label: 'Accordion' },
  { id: 'dialog', num: '11', label: 'Dialog' },
  { id: 'carousel', num: '12', label: 'Carousel' },
  { id: 'slider', num: '13', label: 'Slider' },
  { id: 'toast', num: '14', label: 'Toast' },
  { id: 'skeleton', num: '15', label: 'Skeleton' },
  { id: 'icons', num: '16', label: 'Icons' },
  { id: 'motion', num: '17', label: 'Motion' },
];

function SectionHeader({ id, num, title, description }: { id: string; num: string; title: string; description: string }) {
  return (
    <div id={id} className="scroll-mt-8">
      <h2 className="m8-h4 text-m8-dark">{num} — {title}</h2>
      <p className="m8-p5 text-m8-muted mt-1">{description}</p>
    </div>
  );
}

function CodeBlock({ children }: { children: string }) {
  return (
    <code className="block mt-4 px-4 py-2 rounded-m8-md text-sm" style={{ backgroundColor: 'var(--m8-dark)', color: 'var(--m8-violet)' }}>
      {children}
    </code>
  );
}

function ColorSwatch({ name, hex, usage }: { name: string; hex: string; usage: string }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="w-20 h-[60px] rounded-m8-md border border-m8-dark/10" style={{ backgroundColor: hex }} />
      <span className="m8-p6 text-m8-dark">{name}</span>
      <span className="m8-p6 text-m8-muted">{hex}</span>
      <span className="m8-p6 text-m8-muted italic">{usage}</span>
    </div>
  );
}

export default function DesignSystemPage() {
  const [activeSection, setActiveSection] = useState('colors');
  const [sliderValue, setSliderValue] = useState([25]);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const setupObserver = useCallback(() => {
    if (observerRef.current) observerRef.current.disconnect();
    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: '-30% 0px -60% 0px' }
    );
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observerRef.current!.observe(el);
    });
    return () => observerRef.current?.disconnect();
  }, []);

  useEffect(() => {
    const cleanup = setupObserver();
    return cleanup;
  }, [setupObserver]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex min-h-screen font-saira">
      {/* Sidebar */}
      <aside className="w-[220px] shrink-0 sticky top-0 h-screen overflow-y-auto flex flex-col py-8 px-5" style={{ backgroundColor: 'var(--m8-dark)' }}>
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--m8-violet)' }} />
            <span className="m8-p4 text-white">mark8 IQ</span>
          </div>
          <span className="m8-p6 text-white/60">Design System</span>
        </div>
        <nav className="flex flex-col gap-1">
          {SECTIONS.map(({ id, num, label }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={`text-left px-3 py-1.5 m8-p6 transition-all duration-100 border-l-2 ${
                activeSection === id
                  ? 'border-l-2 text-white'
                  : 'border-transparent text-white/60 hover:text-white/80'
              }`}
              style={activeSection === id ? { borderColor: 'var(--m8-violet)', color: 'var(--m8-violet)' } : {}}
            >
              {num}&nbsp;&nbsp;{label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 px-12 py-16" style={{ backgroundColor: 'var(--m8-light)' }}>
        {/* Page header */}
        <div className="mb-12">
          <h1 className="m8-h2 text-m8-dark">Mark8 IQ Design System</h1>
          <p className="m8-p4 text-m8-muted mt-2">Version 1.0, April 2026</p>
          <p className="m8-p5 text-m8-muted mt-4">
            Single source of truth for all UI components, tokens, and patterns.<br />
            Editing a component in src/components/ui/ updates it across the entire site.
          </p>
          <Separator className="mt-6" />
        </div>

        <div className="flex flex-col gap-16">

          {/* 01 Colors */}
          <section>
            <SectionHeader id="colors" num="01" title="Colors" description="Brand and product color palette used across all pages." />
            <div className="mt-6">
              <p className="m8-p5 text-m8-dark mb-3" style={{ fontWeight: 500 }}>Brand Core</p>
              <div className="flex flex-wrap gap-4">
                <ColorSwatch name="--m8-violet" hex="#8E59FF" usage="Primary brand, CTA background" />
                <ColorSwatch name="--m8-light" hex="#EDF0F7" usage="Page backgrounds, sections" />
                <ColorSwatch name="--m8-dark" hex="#080D19" usage="Text, dark sections" />
              </div>
            </div>
            <div className="mt-6">
              <p className="m8-p5 text-m8-dark mb-3" style={{ fontWeight: 500 }}>Product Accents</p>
              <div className="flex flex-wrap gap-4">
                <ColorSwatch name="--m8-ads" hex="#FC7459" usage="Mark8 Ads" />
                <ColorSwatch name="--m8-sight" hex="#6895FC" usage="Mark8 Sight" />
                <ColorSwatch name="--m8-shelf" hex="#6895FC" usage="Mark8 Shelf" />
                <ColorSwatch name="--m8-returns" hex="#52BFBC" usage="Mark8 Returns" />
                <ColorSwatch name="--m8-reco" hex="#7CBC71" usage="Mark8 Reco" />
                <ColorSwatch name="--m8-inventory" hex="#FCB24F" usage="Mark8 Inventory" />
                <ColorSwatch name="--m8-pink" hex="#DD4062" usage="Accent, alerts" />
              </div>
            </div>
            <div className="mt-6">
              <p className="m8-p5 text-m8-dark mb-3" style={{ fontWeight: 500 }}>Utility</p>
              <div className="flex flex-wrap gap-4">
                <ColorSwatch name="--m8-white" hex="#ffffff" usage="Backgrounds, cards" />
                <ColorSwatch name="--m8-text" hex="#080D19" usage="Primary text" />
                <ColorSwatch name="--m8-muted" hex="#6b7280" usage="Secondary text" />
              </div>
            </div>
            <CodeBlock>{'@apply bg-m8-violet text-m8-dark'}</CodeBlock>
            <Separator className="mt-8" />
          </section>

          {/* 02 Typography */}
          <section>
            <SectionHeader id="typography" num="02" title="Typography" description="All type styles using Saira at weights 300, 400, and 500." />
            <div className="mt-6">
              <p className="m8-p5 text-m8-dark mb-3" style={{ fontWeight: 500 }}>Titles</p>
              {[
                { cls: 'm8-h1-display', name: 'Headline 1 Display', spec: '80px / 400 / 110% / -0.03em' },
                { cls: 'm8-h1-large', name: 'Headline 1 Large', spec: '60px / 400 / 110% / -0.03em' },
                { cls: 'm8-h2', name: 'Headline 2', spec: '50px / 400 / 60px / -0.03em' },
                { cls: 'm8-h3-xl', name: 'Headline 3 XL', spec: '40px / 400 / 30px / -0.03em' },
                { cls: 'm8-h3-l', name: 'Headline 3 L', spec: '35px / 400 / 45px / -0.03em' },
                { cls: 'm8-h3-m', name: 'Headline 3 M', spec: '30px / 400 / 30px / -0.03em' },
                { cls: 'm8-h4', name: 'Headline 4', spec: '28px / 400 / 110% / -0.03em' },
              ].map((t) => (
                <div key={t.cls} className="flex border-b py-3" style={{ borderColor: '#d1d5db' }}>
                  <div className="w-[200px] shrink-0">
                    <span className="m8-p5 text-m8-dark">{t.name}</span>
                    <br />
                    <span className="m8-p6 text-m8-muted">{t.spec}</span>
                  </div>
                  <div className="flex-1">
                    <span className={`${t.cls} text-m8-dark`}>Mark8 IQ</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <p className="m8-p5 text-m8-dark mb-3" style={{ fontWeight: 500 }}>Paragraphs</p>
              {[
                { cls: 'm8-p1', name: 'Paragraph 1', spec: '25px / 400 / 150% / -0.03em' },
                { cls: 'm8-p2', name: 'Paragraph 2', spec: '24px / 400 / 35px / 0' },
                { cls: 'm8-p3', name: 'Paragraph 3', spec: '20px / 400 / normal / 0' },
                { cls: 'm8-p3-medium', name: 'Paragraph 3 Medium', spec: '20px / 500 / normal / 0' },
                { cls: 'm8-p4', name: 'Paragraph 4', spec: '18px / 400 / normal / 0' },
                { cls: 'm8-p5', name: 'Paragraph 5', spec: '16px / 300 / 24px / 0' },
                { cls: 'm8-p6', name: 'Paragraph 6', spec: '14px / 300 / normal / 0' },
              ].map((t) => (
                <div key={t.cls} className="flex border-b py-3" style={{ borderColor: '#d1d5db' }}>
                  <div className="w-[200px] shrink-0">
                    <span className="m8-p5 text-m8-dark">{t.name}</span>
                    <br />
                    <span className="m8-p6 text-m8-muted">{t.spec}</span>
                  </div>
                  <div className="flex-1">
                    <span className={`${t.cls} text-m8-dark`}>Unify all your eCommerce data on one platform</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 rounded-m8-md" style={{ backgroundColor: '#FFFBEB', border: '1px solid #FDE68A' }}>
              <p className="m8-p5 text-m8-dark" style={{ fontWeight: 500 }}>Typography rules</p>
              <ul className="m8-p6 text-m8-dark mt-2 flex flex-col gap-1 list-disc pl-4">
                <li>font-weight 400 (Regular) on all headlines. No 600. No 700.</li>
                <li>font-weight 500 (Medium) only on .m8-p3-medium</li>
                <li>font-weight 300 (Light) only on .m8-p5 and .m8-p6</li>
                <li>letter-spacing: -0.03em on all titles and .m8-p1</li>
                <li>letter-spacing: 0 on all other paragraphs</li>
                <li>Sentence case on all text. No all-caps.</li>
              </ul>
            </div>
            <CodeBlock>{'<h1 className="m8-h2 text-m8-dark">Title</h1>'}</CodeBlock>
            <Separator className="mt-8" />
          </section>

          {/* 03 Spacing */}
          <section>
            <SectionHeader id="spacing" num="03" title="Spacing" description="Consistent spacing scale used for padding, margin, and gaps." />
            <div className="mt-6 flex flex-col gap-3">
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
              ].map((s) => (
                <div key={s.token} className="flex items-center gap-4">
                  <div className="h-6 rounded-sm bg-m8-violet" style={{ width: `${s.px}px` }} />
                  <span className="m8-p5 text-m8-dark w-12">{s.token}</span>
                  <span className="m8-p5 text-m8-muted w-12">{s.px}px</span>
                  <code className="m8-p6 text-m8-violet">{s.tw}</code>
                </div>
              ))}
            </div>
            <Separator className="mt-8" />
          </section>

          {/* 04 Buttons */}
          <section>
            <SectionHeader id="buttons" num="04" title="Buttons" description="All button variants, states, and sizes used across the site." />
            <div className="mt-6">
              <p className="m8-p5 text-m8-dark mb-4" style={{ fontWeight: 500 }}>Brand Patterns</p>
              <div className="grid grid-cols-4 gap-6">
                <div className="flex flex-col items-start gap-2">
                  <Button variant="m8-dark">Get in Touch</Button>
                  <span className="m8-p6 text-m8-muted">Dark section backgrounds, hero CTAs</span>
                </div>
                <div className="flex flex-col items-start gap-2">
                  <Button variant="m8-violet">Get in Touch</Button>
                  <span className="m8-p6 text-m8-muted">Light section backgrounds, primary actions</span>
                </div>
                <div className="flex flex-col items-start gap-2">
                  <Button variant="m8-outline-dark">Contact Our Team</Button>
                  <span className="m8-p6 text-m8-muted">Secondary actions on dark sections</span>
                </div>
                <div className="flex flex-col items-start gap-2">
                  <Button variant="m8-outline-violet">Contact Our Team</Button>
                  <span className="m8-p6 text-m8-muted">Secondary actions on light sections</span>
                </div>
              </div>
              <div className="mt-4 flex flex-col items-start gap-2">
                <Button variant="m8-ghost">Learn more</Button>
                <span className="m8-p6 text-m8-muted">"Learn more" links, tertiary actions, nav</span>
              </div>
            </div>
            <div className="mt-8">
              <p className="m8-p5 text-m8-dark mb-4" style={{ fontWeight: 500 }}>States</p>
              <div className="flex gap-6 items-center">
                <div className="flex flex-col items-center gap-2">
                  <Button variant="m8-violet">Normal</Button>
                  <span className="m8-p6 text-m8-muted">Normal</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Button variant="m8-violet" className="hover:bg-m8-violet/90">Hover</Button>
                  <span className="m8-p6 text-m8-muted">Hover</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Button variant="m8-violet" disabled>Disabled</Button>
                  <span className="m8-p6 text-m8-muted">Disabled</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Button variant="m8-violet" disabled><Loader2 className="animate-spin" />Loading</Button>
                  <span className="m8-p6 text-m8-muted">Loading</span>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <p className="m8-p5 text-m8-dark mb-4" style={{ fontWeight: 500 }}>Sizes</p>
              <div className="flex gap-6 items-center">
                <Button variant="m8-violet" size="sm">Small</Button>
                <Button variant="m8-violet" size="default">Default</Button>
                <Button variant="m8-violet" size="lg">Large</Button>
              </div>
            </div>
            <CodeBlock>{"import { Button } from '@/components/ui/button'"}</CodeBlock>
            <Separator className="mt-8" />
          </section>

          {/* 05 Badges */}
          <section>
            <SectionHeader id="badges" num="05" title="Badges" description="Product and utility badges for categorization and labeling." />
            <div className="mt-6">
              <p className="m8-p5 text-m8-dark mb-4" style={{ fontWeight: 500 }}>Product Variants</p>
              <div className="flex flex-wrap gap-3">
                <Badge variant="m8-ads">Mark8 Ads</Badge>
                <Badge variant="m8-sight">Mark8 Sight</Badge>
                <Badge variant="m8-shelf">Mark8 Shelf</Badge>
                <Badge variant="m8-returns">Mark8 Returns</Badge>
                <Badge variant="m8-reco">Mark8 Reco</Badge>
                <Badge variant="m8-inventory">Mark8 Inventory</Badge>
              </div>
            </div>
            <div className="mt-6">
              <p className="m8-p5 text-m8-dark mb-4" style={{ fontWeight: 500 }}>Shadcn Defaults</p>
              <div className="flex flex-wrap gap-3">
                <Badge variant="default">Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="destructive">Destructive</Badge>
              </div>
            </div>
            <CodeBlock>{"import { Badge } from '@/components/ui/badge'"}</CodeBlock>
            <Separator className="mt-8" />
          </section>

          {/* 06 Cards */}
          <section>
            <SectionHeader id="cards" num="06" title="Cards" description="Composite card patterns built from shadcn Card + brand tokens." />
            <div className="mt-6 grid grid-cols-3 gap-6">
              <FeatureCard
                icon={BarChart2}
                heading="Drill-through visibility"
                body="Move from marketplace overview to SKU detail to pinpoint what is working."
              />
              <StatCard number="1000+" label="Crore GMV managed" trend="+3x YoY" />
              <SuccessStoryCard
                brand="Urban Gabru"
                metric="3.2x ROAS"
                excerpt="From fragmented reports to measurable growth across Amazon and Flipkart."
                date="Feb 2026"
              />
              <ProductTileCard
                badge={<Badge variant="m8-ads">AD</Badge>}
                name="Mark8 Ads"
                description="Turbocharge ROI with ad insights that click."
                link="/products/ads"
              />
              <PricingCard
                plan="Mark8 Ads"
                price="Custom"
                features={['Amazon', 'Flipkart', '64 metrics', '3 AI agents']}
                cta={<Button variant="m8-violet">Book Now</Button>}
              />
              <BlogCard
                date="April 2026"
                title="Features of Mark8 IQ that power smarter decisions"
                excerpt="From PRISM to Agent Mark, here is how the stack works end to end."
                link="/blogs/features"
              />
            </div>
            <CodeBlock>{"import { FeatureCard } from '@/components/cards/FeatureCard'"}</CodeBlock>
            <Separator className="mt-8" />
          </section>

          {/* 07 Forms */}
          <section>
            <SectionHeader id="forms" num="07" title="Forms" description="All form elements with default, focus, error, and disabled states." />
            <div className="mt-6 space-y-8">
              {/* Input */}
              <div>
                <p className="m8-p5 text-m8-dark mb-3" style={{ fontWeight: 500 }}>Input</p>
                <div className="grid grid-cols-2 gap-4 max-w-2xl">
                  <div><Label className="m8-p6 mb-1">Default</Label><Input placeholder="Brand name" className="font-saira" /></div>
                  <div><Label className="m8-p6 mb-1">Disabled</Label><Input placeholder="Brand name" disabled className="font-saira" /></div>
                  <div>
                    <Label className="m8-p6 mb-1">Error</Label>
                    <Input placeholder="Brand name" className="font-saira border-red-500" />
                    <span className="m8-p6 text-red-500">This field is required</span>
                  </div>
                  <div><Label className="m8-p6 mb-1">Focus</Label><Input placeholder="Brand name" autoFocus={false} className="font-saira ring-2 ring-m8-violet" /></div>
                </div>
              </div>
              {/* Textarea */}
              <div>
                <p className="m8-p5 text-m8-dark mb-3" style={{ fontWeight: 500 }}>Textarea</p>
                <div className="grid grid-cols-2 gap-4 max-w-2xl">
                  <div><Label className="m8-p6 mb-1">Default</Label><Textarea placeholder="Describe your challenge" className="font-saira" /></div>
                  <div><Label className="m8-p6 mb-1">Disabled</Label><Textarea placeholder="Describe your challenge" disabled className="font-saira" /></div>
                </div>
              </div>
              {/* Select */}
              <div>
                <p className="m8-p5 text-m8-dark mb-3" style={{ fontWeight: 500 }}>Select</p>
                <div className="max-w-xs">
                  <Select>
                    <SelectTrigger className="font-saira"><SelectValue placeholder="Select marketplace" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="amazon">Amazon</SelectItem>
                      <SelectItem value="flipkart">Flipkart</SelectItem>
                      <SelectItem value="myntra">Myntra</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              {/* Checkbox */}
              <div>
                <p className="m8-p5 text-m8-dark mb-3" style={{ fontWeight: 500 }}>Checkbox</p>
                <div className="flex items-center gap-2">
                  <Checkbox id="agree" />
                  <Label htmlFor="agree" className="m8-p5">I agree to be contacted</Label>
                </div>
              </div>
              {/* Radio */}
              <div>
                <p className="m8-p5 text-m8-dark mb-3" style={{ fontWeight: 500 }}>Radio Group</p>
                <RadioGroup defaultValue="general">
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="general" id="general" />
                    <Label htmlFor="general" className="m8-p5">General Enquiry</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="demo" id="demo" />
                    <Label htmlFor="demo" className="m8-p5">Schedule a Demo</Label>
                  </div>
                </RadioGroup>
              </div>
              {/* Switch */}
              <div>
                <p className="m8-p5 text-m8-dark mb-3" style={{ fontWeight: 500 }}>Switch</p>
                <div className="flex items-center gap-2">
                  <Switch id="email-notif" />
                  <Label htmlFor="email-notif" className="m8-p5">Email notifications</Label>
                </div>
              </div>
            </div>
            <CodeBlock>{"import { Input } from '@/components/ui/input'"}</CodeBlock>
            <Separator className="mt-8" />
          </section>

          {/* 08 Navigation */}
          <section>
            <SectionHeader id="navigation" num="08" title="Navigation" description="Site navigation component in desktop and mobile states." />
            <div className="mt-6">
              <p className="m8-p5 text-m8-dark mb-3" style={{ fontWeight: 500 }}>Desktop nav (full width)</p>
              <div className="border rounded-m8-lg overflow-hidden" style={{ borderColor: '#d1d5db' }}>
                <Navbar />
              </div>
            </div>
            <CodeBlock>{"import Navbar from '@/components/Navbar'"}</CodeBlock>
            <Separator className="mt-8" />
          </section>

          {/* 09 Tabs */}
          <section>
            <SectionHeader id="tabs" num="09" title="Tabs" description="Tab groups for switching between product views." />
            <div className="mt-6">
              <Tabs defaultValue="ads" className="font-saira">
                <TabsList>
                  <TabsTrigger value="ads">Mark8 Ads</TabsTrigger>
                  <TabsTrigger value="sight">Mark8 Sight</TabsTrigger>
                  <TabsTrigger value="shelf">Mark8 Shelf</TabsTrigger>
                  <TabsTrigger value="reco">Mark8 Reco</TabsTrigger>
                  <TabsTrigger value="returns">Mark8 Returns</TabsTrigger>
                </TabsList>
                <TabsContent value="ads" className="m8-p5 text-m8-dark mt-4">Turbocharge ROI with ad insights that click — across Amazon, Flipkart, and more.</TabsContent>
                <TabsContent value="sight" className="m8-p5 text-m8-dark mt-4">Complete marketplace visibility from search rank to content quality scores.</TabsContent>
                <TabsContent value="shelf" className="m8-p5 text-m8-dark mt-4">Monitor buy box, pricing, stock, and content health across every SKU.</TabsContent>
                <TabsContent value="reco" className="m8-p5 text-m8-dark mt-4">AI-powered recommendations to optimise listing performance and ad spend.</TabsContent>
                <TabsContent value="returns" className="m8-p5 text-m8-dark mt-4">Track return rates, reasons, and trends to reduce losses and improve quality.</TabsContent>
              </Tabs>
            </div>
            <CodeBlock>{"import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'"}</CodeBlock>
            <Separator className="mt-8" />
          </section>

          {/* 10 Accordion */}
          <section>
            <SectionHeader id="accordion" num="10" title="Accordion" description="Collapsible FAQ-style content sections." />
            <div className="mt-6 max-w-2xl">
              <Accordion type="single" collapsible className="font-saira">
                <AccordionItem value="q1">
                  <AccordionTrigger className="m8-p4">Which marketplaces does Mark8 IQ support?</AccordionTrigger>
                  <AccordionContent className="m8-p5 text-m8-muted">Amazon, Flipkart, Myntra, Nykaa, Zepto, Blinkit, and 9+ more. New marketplaces are added based on client demand.</AccordionContent>
                </AccordionItem>
                <AccordionItem value="q2">
                  <AccordionTrigger className="m8-p4">How does PRISM pull data without API access?</AccordionTrigger>
                  <AccordionContent className="m8-p5 text-m8-muted">PRISM is a hybrid RPA and API engine. It standardises data from multiple sources including direct marketplace APIs, RPA-based report extraction, and login-based data downloads.</AccordionContent>
                </AccordionItem>
                <AccordionItem value="q3">
                  <AccordionTrigger className="m8-p4">Is Mark8 IQ suitable for a brand with 5 SKUs?</AccordionTrigger>
                  <AccordionContent className="m8-p5 text-m8-muted">Mark8 IQ is built for D2C brands managing multi-marketplace operations. It scales from 5 SKUs to 50,000 SKUs.</AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            <CodeBlock>{"import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'"}</CodeBlock>
            <Separator className="mt-8" />
          </section>

          {/* 11 Dialog */}
          <section>
            <SectionHeader id="dialog" num="11" title="Dialog" description="Modal dialogs for forms, confirmations, and focused interactions." />
            <div className="mt-6">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="m8-violet">Open Demo Dialog</Button>
                </DialogTrigger>
                <DialogContent className="font-saira">
                  <DialogHeader>
                    <DialogTitle className="m8-h4">Book a demo</DialogTitle>
                    <DialogDescription className="m8-p5 text-m8-muted">See Mark8 IQ in action. A 30-minute walkthrough, no sales pitch.</DialogDescription>
                  </DialogHeader>
                  <div className="flex flex-col gap-4 mt-4">
                    <Input placeholder="Name" className="font-saira" />
                    <Input placeholder="Email" className="font-saira" />
                    <Input placeholder="Company" className="font-saira" />
                  </div>
                  <div className="flex justify-end gap-3 mt-4">
                    <Button variant="m8-outline-violet">Cancel</Button>
                    <Button variant="m8-violet">Book Now</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <CodeBlock>{"import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'"}</CodeBlock>
            <Separator className="mt-8" />
          </section>

          {/* 12 Carousel */}
          <section>
            <SectionHeader id="carousel" num="12" title="Carousel" description="Sliding card carousel for success stories and testimonials." />
            <div className="mt-6 px-12">
              <Carousel>
                <CarouselContent>
                  <CarouselItem className="basis-1/3">
                    <SuccessStoryCard brand="Urban Gabru" metric="3.2x ROAS" excerpt="From fragmented reports to measurable growth across Amazon and Flipkart." date="Feb 2026" />
                  </CarouselItem>
                  <CarouselItem className="basis-1/3">
                    <SuccessStoryCard brand="Sugar Cosmetics" metric="42% lower ACoS" excerpt="Unified ad management across 4 marketplaces with real-time budget reallocation." date="Jan 2026" />
                  </CarouselItem>
                  <CarouselItem className="basis-1/3">
                    <SuccessStoryCard brand="NGT Habit" metric="2.8x growth" excerpt="Scaled from 200 to 2,000 SKUs while maintaining content and pricing consistency." date="Mar 2026" />
                  </CarouselItem>
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
            <CodeBlock>{"import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'"}</CodeBlock>
            <Separator className="mt-8" />
          </section>

          {/* 13 Slider */}
          <section>
            <SectionHeader id="slider" num="13" title="Slider" description="Range slider for budget and metric selection." />
            <div className="mt-6 max-w-md">
              <div className="flex items-center justify-between mb-3">
                <Label className="m8-p5">Monthly ad spend</Label>
                <span className="m8-p4 text-m8-violet">{sliderValue[0]}L</span>
              </div>
              <Slider
                value={sliderValue}
                onValueChange={setSliderValue}
                min={10}
                max={80}
                step={5}
                className="[&_[role=slider]]:bg-m8-violet"
              />
              <div className="flex justify-between mt-2">
                <span className="m8-p6 text-m8-muted">10L</span>
                <span className="m8-p6 text-m8-muted">80L</span>
              </div>
            </div>
            <CodeBlock>{"import { Slider } from '@/components/ui/slider'"}</CodeBlock>
            <Separator className="mt-8" />
          </section>

          {/* 14 Toast */}
          <section>
            <SectionHeader id="toast" num="14" title="Toast" description="Notification toasts for success, error, info, and warning states." />
            <div className="mt-6 flex gap-4">
              <Button variant="m8-violet" onClick={() => toast.success('Dashboard synced. Data refreshed from all marketplaces.')}>Success toast</Button>
              <Button variant="m8-dark" onClick={() => toast.error('Sync failed. Check your marketplace credentials and try again.')}>Error toast</Button>
              <Button variant="m8-outline-violet" onClick={() => toast('PRISM refresh in progress. Data will update within 60 minutes.')}>Info toast</Button>
              <Button variant="m8-outline-dark" onClick={() => toast.warning('Ad spend approaching 80L threshold. Review budget allocation.')}>Warning toast</Button>
            </div>
            <CodeBlock>{"import { toast } from 'sonner'"}</CodeBlock>
            <Separator className="mt-8" />
          </section>

          {/* 15 Skeleton */}
          <section>
            <SectionHeader id="skeleton" num="15" title="Skeleton" description="Loading placeholders matching card component shapes." />
            <div className="mt-6 grid grid-cols-3 gap-6">
              {/* FeatureCard skeleton */}
              <div className="p-6 bg-m8-white rounded-m8-lg border border-m8-dark/10 flex flex-col gap-4">
                <Skeleton className="w-10 h-10 rounded-full" />
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-1/2" />
              </div>
              {/* StatCard skeleton */}
              <div className="p-6 bg-m8-white rounded-m8-lg border border-m8-dark/10 flex flex-col gap-2 items-center">
                <Skeleton className="h-20 w-32" />
                <Skeleton className="h-4 w-24" />
              </div>
              {/* BlogCard skeleton */}
              <div className="p-6 bg-m8-white rounded-m8-lg border border-m8-dark/10 flex flex-col gap-3">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </div>
            <CodeBlock>{"import { Skeleton } from '@/components/ui/skeleton'"}</CodeBlock>
            <Separator className="mt-8" />
          </section>

          {/* 16 Icons */}
          <section>
            <SectionHeader id="icons" num="16" title="Icons" description="Lucide icons used across the project." />
            <div className="mt-6 grid grid-cols-8 gap-4">
              {[
                { Icon: BarChart2, name: 'BarChart2' },
                { Icon: Eye, name: 'Eye' },
                { Icon: ShoppingCart, name: 'ShoppingCart' },
                { Icon: RotateCcw, name: 'RotateCcw' },
                { Icon: Sparkles, name: 'Sparkles' },
                { Icon: Package, name: 'Package' },
                { Icon: Search, name: 'Search' },
                { Icon: TrendingUp, name: 'TrendingUp' },
                { Icon: Loader2, name: 'Loader2' },
              ].map(({ Icon, name }) => (
                <div key={name} className="flex flex-col items-center gap-2">
                  <Icon className="w-6 h-6 text-m8-dark" />
                  <span className="m8-p6 text-m8-muted">{name}</span>
                </div>
              ))}
            </div>
            <CodeBlock>{"import { IconName } from 'lucide-react'"}</CodeBlock>
            <Separator className="mt-8" />
          </section>

          {/* 17 Motion */}
          <section>
            <SectionHeader id="motion" num="17" title="Motion" description="Animation specs and live demos for interactive elements." />
            <div className="mt-6 overflow-x-auto">
              <table className="w-full font-saira text-left">
                <thead>
                  <tr className="border-b" style={{ borderColor: '#d1d5db' }}>
                    <th className="m8-p5 text-m8-dark py-2 pr-4" style={{ fontWeight: 500 }}>Element</th>
                    <th className="m8-p5 text-m8-dark py-2 pr-4" style={{ fontWeight: 500 }}>Property</th>
                    <th className="m8-p5 text-m8-dark py-2 pr-4" style={{ fontWeight: 500 }}>Value</th>
                    <th className="m8-p5 text-m8-dark py-2" style={{ fontWeight: 500 }}>Easing</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Page load', 'opacity 0 → 1', '200ms', 'ease-in'],
                    ['Card hover', 'translateY -4px + shadow', '150ms', 'ease'],
                    ['Button hover', 'background-color shift', '100ms', 'ease'],
                    ['Accordion open', 'height 0 → auto', '200ms', 'ease-out'],
                    ['Toast appear', 'translateY 8px → 0 + opacity', '300ms', 'ease'],
                    ['Sidebar active', 'border-left + color', '100ms', 'ease'],
                  ].map(([el, prop, val, ease]) => (
                    <tr key={el} className="border-b" style={{ borderColor: '#d1d5db' }}>
                      <td className="m8-p5 text-m8-dark py-2 pr-4">{el}</td>
                      <td className="m8-p6 text-m8-muted py-2 pr-4">{prop}</td>
                      <td className="m8-p6 text-m8-muted py-2 pr-4">{val}</td>
                      <td className="m8-p6 text-m8-muted py-2">{ease}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-8">
              <p className="m8-p5 text-m8-dark mb-4" style={{ fontWeight: 500 }}>Live demos</p>
              <div className="flex gap-8 items-start">
                <div className="w-64">
                  <p className="m8-p6 text-m8-muted mb-2">Card hover</p>
                  <FeatureCard icon={BarChart2} heading="Hover me" body="This card lifts on hover with a shadow transition." />
                </div>
                <div>
                  <p className="m8-p6 text-m8-muted mb-2">Button hover</p>
                  <Button variant="m8-violet">Hover me</Button>
                </div>
                <div className="w-64">
                  <p className="m8-p6 text-m8-muted mb-2">Accordion</p>
                  <Accordion type="single" collapsible className="font-saira">
                    <AccordionItem value="demo">
                      <AccordionTrigger className="m8-p5">Click to expand</AccordionTrigger>
                      <AccordionContent className="m8-p6 text-m8-muted">This demonstrates the 200ms ease-out height animation.</AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
            </div>
            <Separator className="mt-8" />
          </section>

        </div>
      </main>
    </div>
  );
}
