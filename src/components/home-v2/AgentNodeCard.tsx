type AgentNodeCardProps = {
  title?: string;
  kicker?: string;
  products?: string[];
  ariaLabel?: string;
  scale?: number;
  logoVariant?: 'white' | 'black';
  tone?: {
    surface?: string;
    violet?: string;
    text?: string;
    muted?: string;
    green?: string;
    port?: string;
    metal?: string;
  };
};

export default function AgentNodeCard({
  title = 'Price Tracker Agent',
  kicker = 'AGENT FOUNDRY',
  products = ['SIGHT'],
  ariaLabel = 'Price Tracker Agent node',
  scale = 1,
  logoVariant = 'white',
  tone,
}: AgentNodeCardProps) {
  const cssVariables = {
    '--agent-node-scale': String(scale),
    ...(tone?.surface ? { '--agent-node-surface': tone.surface } : {}),
    ...(tone?.violet ? { '--agent-node-violet': tone.violet } : {}),
    ...(tone?.text ? { '--agent-node-honest': tone.text } : {}),
    ...(tone?.muted ? { '--agent-node-muted': tone.muted } : {}),
    ...(tone?.green ? { '--agent-node-green': tone.green } : {}),
    ...(tone?.port ? { '--agent-node-port': tone.port } : {}),
    ...(tone?.metal ? { '--agent-node-metal': tone.metal } : {}),
  } as React.CSSProperties;

  const PRODUCT_LOGO_MAP: Record<string, { white: string; black: string; accent: string }> = {
    'ADS': { white: '/img/product-logos/white/mark8-ads.svg', black: '/img/product-logos/black/mark8-ads.svg', accent: '#fc7459' },
    'SIGHT': { white: '/img/product-logos/white/mark8-sight.svg', black: '/img/product-logos/black/mark8-sight.svg', accent: '#52bfbc' },
    'SHELF': { white: '/img/product-logos/white/mark8-shelf.svg', black: '/img/product-logos/black/mark8-shelf.svg', accent: '#6895fc' },
    'RETURNS': { white: '/img/product-logos/white/mark8-returns.svg', black: '/img/product-logos/black/mark8-returns.svg', accent: '#52bfbc' },
    'RECO': { white: '/img/product-logos/white/mark8-reco.svg', black: '/img/product-logos/black/mark8-reco.svg', accent: '#7cbc71' },
    'INVENTORY': { white: '/img/product-logos/white/mark8-po.svg', black: '/img/product-logos/black/mark8-po.svg', accent: '#fcb24f' },
    'ONE': { white: '/img/product-logos/white/market-one.svg', black: '/img/product-logos/black/market-one.svg', accent: '#8e59ff' },
  };

  return (
    <div className="agent-node-card agent-node-card--hoverable" style={cssVariables} aria-label={ariaLabel}>
      <div className="agent-node-robot-tile" aria-hidden="true">
        <svg className="agent-node-robot-svg" xmlns="http://www.w3.org/2000/svg" width="106" height="106" viewBox="0 0 106 106" fill="none">
          <rect width="106" height="106" rx="13.3978" fill="hsl(var(--agent-node-port))" fillOpacity="0.12" />
          <rect x="15.9385" y="36.3279" width="74.3974" height="53.6755" rx="9.80431" fill="hsl(var(--agent-node-violet))" />
          <rect x="25.436" y="46.6946" width="55.4023" height="29.0682" rx="9.80431" fill="hsl(var(--agent-node-surface))" />
          <rect x="51.6191" y="29.3418" width="2.81254" height="4.58888" rx="1.40627" fill="hsl(var(--agent-node-violet))" />
          <rect x="47.7705" y="16.4629" width="10.51" height="10.8061" rx="5.255" fill="hsl(var(--agent-node-violet))" />
          <path d="M13.0306 63.6067C13.1325 66.5072 13.0306 63.6067 13.2151 68.8585C11.738 68.9104 10.4579 66.6012 10.356 63.7007C10.254 60.8003 11.3689 58.4069 12.846 58.355C13.0306 63.6067 12.9286 60.7063 13.0306 63.6067Z" fill="hsl(var(--agent-node-metal))" />
          <path d="M92.9558 63.459C92.8538 66.3595 92.9558 63.459 92.7712 68.7108C94.2483 68.7627 95.5284 66.4535 95.6304 63.553C95.7323 60.6526 94.6175 58.2592 93.1403 58.2073C92.9558 63.459 93.0577 60.5586 92.9558 63.459Z" fill="hsl(var(--agent-node-metal))" />
          <ellipse cx="40.0841" cy="61.5721" rx="2.7335" ry="5.17927" fill="hsl(var(--agent-node-metal))" />
          <ellipse cx="65.9835" cy="61.6356" rx="2.7335" ry="5.17927" fill="hsl(var(--agent-node-metal))" />
        </svg>
      </div>
      <div className="agent-node-copy">
        <h3 className="agent-node-title">{title}</h3>
        <p className="agent-node-kicker">{kicker}</p>
        <div className="agent-node-badges" aria-label="Connected products">
          {products.map((product) => {
            const productKey = product.toUpperCase();
            const logoData = PRODUCT_LOGO_MAP[productKey];
            const logoSrc = logoData ? (logoVariant === 'black' ? logoData.black : logoData.white) : null;
            const accentColor = logoData?.accent ?? '#8e59ff';

            return (
              <span
                key={product}
                className="agent-node-badge"
                style={{
                  borderColor: `${accentColor}40`,
                  background: `${accentColor}10`,
                }}
              >
                {logoSrc ? (
                  <img
                    src={logoSrc}
                    alt={`Mark8 ${product}`}
                    style={{
                      height: '14px',
                      width: 'auto',
                      display: 'block',
                      objectFit: 'contain',
                    }}
                  />
                ) : (
                  <span style={{ color: accentColor, fontSize: '11px', fontWeight: 500 }}>
                    {product}
                  </span>
                )}
              </span>
            );
          })}
        </div>
      </div>
      <div className="agent-node-left-port" aria-hidden="true" />
      <div className="agent-node-right-port" aria-hidden="true" />
      <div className="agent-node-bottom-port agent-node-bottom-port-1" aria-hidden="true" />
      <div className="agent-node-bottom-port agent-node-bottom-port-2" aria-hidden="true" />
      <div className="agent-node-bottom-port agent-node-bottom-port-3" aria-hidden="true" />
      <div className="agent-node-bottom-port agent-node-bottom-port-4" aria-hidden="true" />
    </div>
  );
}