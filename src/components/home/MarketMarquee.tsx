const logos = [
  { src: 'https://admin.infytrix.info/uploads/myntra_0ef843ae4c.svg', w: 133, h: 36 },
  { src: 'https://admin.infytrix.info/uploads/amazon_87c06fbfc9.svg', w: 110, h: 34 },
  { src: 'https://admin.infytrix.info/uploads/nykaa_31b44d3a37.svg', w: 82, h: 27 },
  { src: 'https://admin.infytrix.info/uploads/ajio_91cab1aa57.svg', w: 87, h: 26 },
  { src: 'https://admin.infytrix.info/uploads/meesho_67acd12206.svg', w: 110, h: 27 },
  { src: 'https://admin.infytrix.info/uploads/tira_e819ed76f7.svg', w: 64, h: 27 },
];

function LogoSet() {
  return (
    <>
      {logos.map((logo, i) => (
        <div className="rfm-child" style={{ '--transform': 'none' } as React.CSSProperties} key={i}>
          <div className="HomeBuildForMarkets_image_item__qiWBa">
            <img alt="marketplace logo" loading="lazy" width={logo.w} height={logo.h} src={logo.src} style={{ color: 'transparent' }} />
          </div>
        </div>
      ))}
    </>
  );
}

export default function MarketMarquee() {
  return (
    <section className="section_spacing">
      <div className="HomeBuildForMarkets_HomeBuildForMarkets__vmOOZ">
        <div>
          <h4 className="text_center fs_30 fadeInUp color_text" data-scroll="in">Built for all markets</h4>
          <div className="fadeInUp" data-scroll="in">
            <div className="rfm-marquee-container" style={{ '--pause-on-hover': 'running', '--pause-on-click': 'running', '--width': '100%', '--transform': 'none' } as React.CSSProperties}>
              <div className="rfm-overlay" style={{ '--gradient-width': '20px' } as React.CSSProperties}></div>
              <div className="rfm-marquee" style={{ '--play': 'running', '--direction': 'normal', '--duration': '47.72s', '--delay': '0s', '--iteration-count': 'infinite', '--min-width': '100%' } as React.CSSProperties}>
                <div className="rfm-initial-child-container">
                  <LogoSet />
                </div>
              </div>
              <div className="rfm-marquee" style={{ '--play': 'running', '--direction': 'normal', '--duration': '47.72s', '--delay': '0s', '--iteration-count': 'infinite', '--min-width': '100%' } as React.CSSProperties}>
                <LogoSet />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
