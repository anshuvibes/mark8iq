interface AIPanelHeaderProps {
  chatTitle?: string;
}

const AIPanelHeader = ({ chatTitle }: AIPanelHeaderProps) => {
  return (
    <div style={{ flexShrink: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', padding: '8px 12px' }}>
        <div className="m8-p6" style={{
          color: 'var(--color_text)',
          fontWeight: 500,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          minWidth: 0,
          flex: 1,
          opacity: chatTitle ? 1 : 0,
          transition: 'opacity 0.2s',
        }}>
          {chatTitle || ''}
        </div>
      </div>
    </div>
  );
};

export default AIPanelHeader;
