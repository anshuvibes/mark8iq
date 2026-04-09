interface ProductVideoCardProps {
  logoSrc: string;
  videoSrc: string;
  title: string;
}

export default function ProductVideoCard({ logoSrc, videoSrc, title }: ProductVideoCardProps) {
  return (
    <section className="section_spacing">
      <div className="container section_spacing p_b_0">
        <div className="ProductVideoCard_ProductVideoCard__IpW1N">
          <div className="ProductVideoCard_ads_logo__zfoAc">
            <img
              alt=""
              loading="lazy"
              width="169"
              height="26"
              decoding="async"
              src={logoSrc}
              style={{ color: 'transparent' }}
            />
          </div>
          <h3 className="fs_40 color_text">{title}</h3>
          <div className="ProductVideoCard_video_wrap__GZWNI">
            <video controls preload="metadata">
              <source src={videoSrc} type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </section>
  );
}
