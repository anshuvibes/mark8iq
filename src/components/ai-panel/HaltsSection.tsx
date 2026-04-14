import HaltCard from './HaltCard';
import type { Halt } from '@/data/aiPanelMockData';

interface HaltsSectionProps {
  halts: Halt[];
  hasActiveChat: boolean;
  onAnalyse: (halt: Halt) => void;
  onViewAll: () => void;
}

const HaltsSection = ({ halts, hasActiveChat, onAnalyse, onViewAll }: HaltsSectionProps) => {
  const displayHalts = halts.slice(0, 3);

  return (
    <div style={{ padding: '12px 16px', borderBottom: '1px solid rgba(18,24,43,0.06)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
        <span className="m8-p6" style={{ color: 'var(--color_primary)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 500 }}>
          Highlights
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {displayHalts.map((halt, i) => (
          <HaltCard
            key={halt.id}
            halt={halt}
            index={i}
            onAnalyse={onAnalyse}
            showConflict={false}
            conflictHaltId={null}
            onConflictContinue={() => {}}
            onConflictCancel={() => {}}
          />
        ))}
      </div>

      {halts.length > 3 && (
        <button
          onClick={onViewAll}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            padding: '8px 0 0',
            color: 'var(--color_primary)',
          }}
        >
          <span className="m8-p6">+ View all insights ({halts.length} total)</span>
        </button>
      )}
    </div>
  );
};

export default HaltsSection;
