import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import HaltCard from './HaltCard';
import type { Halt } from '@/data/aiPanelMockData';

interface HaltsSectionProps {
  halts: Halt[];
  collapsed: boolean;
  hasActiveChat: boolean;
  onAnalyse: (halt: Halt) => void;
  onViewAll: () => void;
  onToggleCollapse: () => void;
}

const HaltsSection = ({ halts, collapsed, hasActiveChat, onAnalyse, onViewAll, onToggleCollapse }: HaltsSectionProps) => {
  const [conflictHaltId, setConflictHaltId] = useState<string | null>(null);
  const displayHalts = halts.slice(0, 4);

  const handleAnalyse = (halt: Halt) => {
    if (hasActiveChat) {
      setConflictHaltId(halt.id);
    } else {
      onAnalyse(halt);
    }
  };

  if (collapsed) {
    return (
      <button
        onClick={onToggleCollapse}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          width: '100%',
          padding: '10px 16px',
          background: 'rgba(237,240,247,0.5)',
          border: 'none',
          borderBottom: '1px solid rgba(18,24,43,0.06)',
          cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        <span className="m8-p6" style={{ color: 'var(--color_primary)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 500 }}>
          Highlights
        </span>
        <span className="m8-p6" style={{ color: 'rgba(18,24,43,0.45)' }}>({halts.length})</span>
        <ChevronRight size={14} style={{ color: 'rgba(18,24,43,0.35)', marginLeft: 'auto' }} />
      </button>
    );
  }

  return (
    <div style={{ padding: '12px 16px', borderBottom: '1px solid rgba(18,24,43,0.06)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
        <span className="m8-p6" style={{ color: 'var(--color_primary)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 500 }}>
          Highlights
        </span>
        <span className="m8-p6" style={{ color: 'rgba(18,24,43,0.3)' }}>
          Generated at 9:14 AM
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {displayHalts.map((halt, i) => (
          <HaltCard
            key={halt.id}
            halt={halt}
            index={i}
            onAnalyse={handleAnalyse}
            showConflict={conflictHaltId !== null}
            conflictHaltId={conflictHaltId}
            onConflictContinue={() => {
              setConflictHaltId(null);
              const h = halts.find(x => x.id === conflictHaltId);
              if (h) onAnalyse(h);
            }}
            onConflictCancel={() => setConflictHaltId(null)}
          />
        ))}
      </div>

      {halts.length > 4 && (
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
