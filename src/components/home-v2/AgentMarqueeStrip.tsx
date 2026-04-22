import { useRef } from 'react';
import AgentNodeCard from './AgentNodeCard';

const AGENTS = [
  { title: 'Keyword Harvesting Agent', products: ['SIGHT', 'ADS'], ariaLabel: 'Keyword Harvesting Agent' },
  { title: 'Visibility Booster Agent', products: ['SIGHT', 'ADS'], ariaLabel: 'Visibility Booster Agent' },
  { title: 'Price Tracker Agent', products: ['SIGHT'], ariaLabel: 'Price Tracker Agent' },
  { title: 'Low Stock AdFlow Agent', products: ['SHELF', 'ADS'], ariaLabel: 'Low Stock AdFlow Agent' },
  { title: 'ROAS Optimiser Agent', products: ['ADS'], ariaLabel: 'ROAS Optimiser Agent' },
  { title: 'Stock Alert Agent', products: ['SHELF'], ariaLabel: 'Stock Alert Agent' },
  { title: 'Return Reconciler Agent', products: ['RETURNS'], ariaLabel: 'Return Reconciler Agent' },
  { title: 'Competitive Intel Agent', products: ['SIGHT'], ariaLabel: 'Competitive Intel Agent' },
  { title: 'Budget Pacing Agent', products: ['ADS'], ariaLabel: 'Budget Pacing Agent' },
  { title: 'Reconciliation Agent', products: ['RETURNS', 'INVENTORY'], ariaLabel: 'Reconciliation Agent' },
];

const LOOP = [...AGENTS, ...AGENTS];

export default function AgentMarqueeStrip() {
  const stackRef = useRef<HTMLDivElement | null>(null);

  const setMarqueeSpeed = (playbackRate: number) => {
    stackRef.current
      ?.querySelectorAll<HTMLElement>('.agent-marquee-track')
      .forEach((track) => {
        track.getAnimations().forEach((animation) => {
          animation.updatePlaybackRate(playbackRate);
        });
      });
  };

  return (
    <div
      ref={stackRef}
      className="agent-marquee-stack"
      aria-label="Agent Foundry examples"
      onMouseEnter={() => setMarqueeSpeed(0.2)}
      onMouseLeave={() => setMarqueeSpeed(1)}
    >
      <div className="agent-marquee-outer">
        <div className="agent-marquee-track">
          {LOOP.map((agent, i) => (
            <div className="agent-marquee-item" key={`${agent.title}-${i}`}>
              <AgentNodeCard title={agent.title} products={agent.products} ariaLabel={agent.ariaLabel} />
            </div>
          ))}
        </div>
      </div>
      <div className="agent-marquee-outer">
        <div className="agent-marquee-track agent-marquee-track--reverse">
          {LOOP.map((agent, i) => (
            <div className="agent-marquee-item" key={`${agent.title}-reverse-${i}`}>
              <AgentNodeCard title={agent.title} products={agent.products} ariaLabel={agent.ariaLabel} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}