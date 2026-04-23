import BrandCard from './BrandCard';

type BrandData = {
  name: string;
  category: string;
  challenge: string;
  result: string;
  accent: string;
};

type Props = { brands: BrandData[] };

export default function BrandMarqueeStrip({ brands }: Props) {
  const doubled = [...brands, ...brands];
  const split = Math.floor(brands.length / 2);
  const row1 = doubled;
  const row2 = [
    ...brands.slice(split),
    ...brands.slice(0, split),
    ...brands.slice(split),
    ...brands.slice(0, split),
  ];

  return (
    <div style={{ width: '100%', overflow: 'hidden', padding: '18px 0 96px' }}>
      <div style={{ display: 'flex', marginBottom: '24px' }}>
        <div className="brand-marquee-row--r1" style={{ display: 'flex', gap: '24px', animation: 'brandScrollR1 50s linear infinite' }}>
          {row1.map((brand, index) => (
            <BrandCard key={`r1-${brand.name}-${index}`} {...brand} size="card" />
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', transform: 'translateX(-180px)' }}>
        <div className="brand-marquee-row--r2" style={{ display: 'flex', gap: '24px', animation: 'brandScrollR2 65s linear infinite' }}>
          {row2.map((brand, index) => (
            <BrandCard key={`r2-${brand.name}-${index}`} {...brand} size="card" />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes brandScrollR1 {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
        @keyframes brandScrollR2 {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
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