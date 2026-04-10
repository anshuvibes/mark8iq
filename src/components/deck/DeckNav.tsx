export default function DeckNav() {
  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 60,
        background: '#080D19',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 40px',
        zIndex: 101,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <img src="/img/product-logos/white/mark8-iq.svg" alt="mark8 IQ" style={{ height: 28 }} />
        <span className="m8-p4" style={{ color: '#FFFFFF' }}>mark8 IQ</span>
      </div>
      <span className="m8-p6" style={{ color: 'rgba(255,255,255,0.5)' }}>
        Infytrix Ecom Pvt Ltd &nbsp;|&nbsp; Confidential
      </span>
    </nav>
  );
}
