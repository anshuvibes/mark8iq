import { Button } from '@/components/ui/button';
import type { Halt } from '@/data/aiPanelMockData';

interface HaltCardProps {
  halt: Halt;
  index: number;
  onAnalyse: (halt: Halt) => void;
  showConflict: boolean;
  onConflictContinue: () => void;
  onConflictCancel: () => void;
  conflictHaltId: string | null;
}

const HaltCard = ({ halt, index, onAnalyse, showConflict, onConflictContinue, onConflictCancel, conflictHaltId }: HaltCardProps) => {
  const isConflictTarget = conflictHaltId === halt.id;

  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '10px 12px',
          borderRadius: 'var(--m8-radius-md)',
          background: 'rgba(237,240,247,0.5)',
          border: '1px solid rgba(18,24,43,0.06)',
          transition: 'background 0.15s',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(237,240,247,0.8)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(237,240,247,0.5)'; }}
      >
        <span className="m8-p6" style={{ color: 'rgba(18,24,43,0.35)', minWidth: 16, textAlign: 'center' }}>
          {index + 1}
        </span>
        <span className="m8-p6" style={{ color: 'var(--color_text)', flex: 1 }}>
          {halt.statement}
        </span>
        <Button
          variant="m8-outline-violet"
          size="sm"
          onClick={() => onAnalyse(halt)}
          style={{ padding: '4px 12px', fontSize: 12, height: 'auto', minWidth: 'auto' }}
        >
          Analyse
        </Button>
      </div>

      {/* Inline conflict confirmation */}
      {showConflict && isConflictTarget && (
        <div style={{
          padding: '10px 12px',
          marginTop: 4,
          borderRadius: 'var(--m8-radius-md)',
          background: 'rgba(142,89,255,0.06)',
          border: '1px solid rgba(142,89,255,0.15)',
        }}>
          <div className="m8-p6" style={{ color: 'var(--color_text)', marginBottom: 8 }}>
            This will start a new conversation. Current chat will be saved.
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <Button variant="m8-violet" size="sm" onClick={onConflictContinue} style={{ padding: '4px 12px', fontSize: 12, height: 'auto' }}>
              Continue
            </Button>
            <Button variant="m8-ghost" size="sm" onClick={onConflictCancel} style={{ fontSize: 12 }}>
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HaltCard;
