import BrandCard from './BrandCard';

type BrandData = {
  name: string;
  body: string;
  stat: string;
  statLabel: string;
  primaryColor: string;
  secondaryColor: string;
  logo?: string;
};

type Props = {
  brandsRow1: BrandData[];
  brandsRow2: BrandData[];
};

export default function BrandMarqueeStrip({ brandsRow1, brandsRow2 }: Props) {
  const row1 = [...brandsRow1, ...brandsRow1, ...brandsRow1];
  const row2 = [...brandsRow2, ...brandsRow2, ...brandsRow2];

  return (
    <div style={{ width: '100%', overflow: 'hidden', padding: '18px 0 96px' }}>
      <div style={{ display: 'flex', marginBottom: '24px' }}>
        <div className="brand-marquee-row--r1" style={{ display: 'flex', gap: '24px', animation: 'brandScrollR1 40s linear infinite' }}>
          {row1.map((brand, index) => (
            <BrandCard key={`r1-${brand.name}-${index}`} {...brand} />
          ))}
        </div>
      </div>

      <div style={{ display: 'flex' }}>
        <div className="brand-marquee-row--r2" style={{ display: 'flex', gap: '24px', animation: 'brandScrollR2 52s linear infinite' }}>
          {row2.map((brand, index) => (
            <BrandCard key={`r2-${brand.name}-${index}`} {...brand} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes brandScrollR1 {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-33.333%); }
        }
        @keyframes brandScrollR2 {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-33.333%); }
        }
        .brand-marquee-row--r1:hover,
        .brand-marquee-row--r2:hover {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .brand-marquee-row--r1,
          .brand-marquee-row--r2 { animation: none !important; }
        }
      `}</style>
    </div>
  );
}