import { useRef } from 'react';
import { motion } from 'motion/react';

const productCards = [
  { initials: 'AD', bg: 'bg_red', logo: 'https://admin.infytrix.info/uploads/Logo_1_2e952af0b7.svg', logoW: 169, logoH: 26, desc: 'Turbocharge ROI with ad insights that click.', link: '/products/ads' },
  { initials: 'SI', bg: 'bg_teal', logo: 'https://admin.infytrix.info/uploads/sight_2bc4263cb2.svg', logoW: 251, logoH: 27, desc: 'Boost marketplace visibility, ranking, and SOV.', link: '/products/sight' },
  { initials: 'SH', bg: 'bg_blue', logo: 'https://admin.infytrix.info/uploads/shelf_e80e25f1be.svg', logoW: 250, logoH: 26, desc: 'Stay visible, stay ahead, stay victorious.', link: '/products/shelf' },
  { initials: 'RC', bg: 'bg_green', logo: 'https://admin.infytrix.info/uploads/reco_b099b49a62.svg', logoW: 250, logoH: 27, desc: 'Keep every penny accounted for effortlessly.', link: '/products/reco' },
  { initials: 'RE', bg: 'bg_orange', logo: 'https://admin.infytrix.info/uploads/returns_a4ec08fef0.svg', logoW: 250, logoH: 27, desc: 'Streamline claims and tackle returns head-on.', link: '/products/returns' },
  { initials: 'PO', bg: 'bg_yellow', logo: 'https://admin.infytrix.info/uploads/po_d53326717e.svg', logoW: 250, logoH: 27, desc: 'Procurement precision made simple.', link: null },
];

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, ease: 'easeOut' },
};

export default function ProductsSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) v.play();
    else v.pause();
  };

  return (
    <section className="section_spacing">
      <div className="HomeProducts_HomeProducts__hEHu_">
        <div className="container">
          {/* Video Card */}
          <motion.div className="HomeProducts_main_product__Rj4qT" {...fadeInUp}>
            <div className="ProductVideoCard_ProductVideoCard__IpW1N">
              <div className="ProductVideoCard_ads_logo__zfoAc">
                <img alt="Mark8 IQ" loading="lazy" width={300} height={70} style={{ color: 'transparent' }} src="https://admin.infytrix.info/uploads/logo_black_5303b9309c.svg" />
              </div>
              <div className="ClipCard_ClipCard__bXUlH clipCard">
                <div className="ClipCard_ClipCardInner__BFU7k ClipCardInner" style={{ WebkitMaskImage: 'url(/img/clip-shapes/product-card-big.svg)', aspectRatio: '2.059001512859304' }}>
                  <div className="ProductVideoCard_video_wrap__Ihutq bg_neutral_dark">
                    <div className="ProductVideoCard_video_media__f_erU">
                      <video ref={videoRef} width="100%" height="100%" playsInline muted loop>
                        <source src="https://admin.infytrix.info/uploads/dummy_f053c3cb6f.mp4" type="video/mp4" />
                      </video>
                    </div>
                    <div className="ProductVideoCard_video_content__gEx2v">
                      <div className="ProductVideoCard_content_left__UKLKO">
                        <div className="fs_20">
                          <p>Powered by Mark8 Intelligence, Mark8 IQ unifies marketplace operations on a single platform, transforming raw signals into actionable performance.</p>
                        </div>
                      </div>
                      <div className="ProductVideoCard_content_right__U8jp1">
                        <motion.div
                          className="ProductVideoCard_play_button__LqNJl br_5 bg_neutral_light"
                          role="button"
                          tabIndex={0}
                          onClick={handlePlay}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <p className="fs_16">Play</p>
                          <div className="IconButton_IconButton__MhTxv bg_primary IconButton_size_regular__GEIC5 br_5">
                            <div className="IconButton_iconWrap__cJF8d iconWrap">
                              <svg xmlns="http://www.w3.org/2000/svg" width="8" height="10" fill="none" viewBox="0 0 8 10"><path fill="#EDEFF7" d="M6.643 4.152a1 1 0 0 1 0 1.696L1.53 9.044A1 1 0 0 1 0 8.196V1.804A1 1 0 0 1 1.53.956z"></path></svg>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="ClipCard_clip_image__QFYcd">
                  <img alt="" loading="lazy" width={1361} height={661} style={{ color: 'transparent' }} src="https://infytrix.info/img/clip-shapes/product-card-big.svg" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Section Title */}
          <motion.div className="HomeProducts_product_item__iLvMm m_b_40" {...fadeInUp}>
            <div className="SectionTitle_SectionTitle__fv0YD false half_title">
              <h2 className="section_title color_text" aria-label="Smarter tools, Bigger wins, Zero friction">
                Smarter tools, Bigger wins, Zero friction
              </h2>
            </div>
          </motion.div>

          {/* Product Cards Grid */}
          <div className="HomeProducts_product_wrap__swy9W">
            {productCards.map((card, i) => (
              <motion.div
                className="HomeProducts_product_item__iLvMm"
                key={card.initials}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
              >
                <motion.div
                  className="ProductCard_ProductCard__eThFZ"
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <div className={`ProductCard_initials__pGYfP ${card.bg} br_10 fw_500`}>{card.initials}</div>
                  <div className="ClipCard_ClipCard__bXUlH clipCard">
                    <div className="ClipCard_ClipCardInner__BFU7k ClipCardInner" style={{ WebkitMaskImage: 'url(/img/clip-shapes/product-card.svg)', aspectRatio: '1.479553903345725' }}>
                      <div className="ProductCard_product_card_content__3oLRI">
                        <div className="ProductCard_product_logo__How9x">
                          <img alt="" loading="lazy" width={card.logoW} height={card.logoH} style={{ color: 'transparent' }} src={card.logo} />
                        </div>
                        <p className="ProductCard_description__wNkG0">{card.desc}</p>
                        <p className="ProductCard_button__RDUWs">
                          {card.link ? (
                            <a href={card.link}>
                              <span className="Button_btn_wrap__DW66V false">
                                <button className="fs_18 font_primary fw_400 Button_btn_common_styles__ddJx7 Button_btn_underline__A14x_">
                                  <span>Learn more</span>
                                </button>
                              </span>
                            </a>
                          ) : (
                            <span className="ProductCard_coming_soon__bCuFS fs_16">Coming Soon</span>
                          )}
                        </p>
                      </div>
                      <div className="ProductCard_gradient_wrap__rP5VP">
                        <div className="col-xs-4 p_lr_0">
                          <div className={`GradientCircle_GradientCircle__mH3g6 ${card.bg} gradient_circle`} style={{ opacity: 0.7 }}></div>
                        </div>
                        <div className="col-xs-8 p_lr_0">
                          <div className={`GradientCircle_GradientCircle__mH3g6 ${card.bg} gradient_circle`} style={{ opacity: 1 }}></div>
                        </div>
                      </div>
                    </div>
                    <div className="ClipCard_clip_image__QFYcd">
                      <img alt="" loading="lazy" width={398} height={269} style={{ color: 'transparent' }} src="https://infytrix.info/img/clip-shapes/product-card.svg" />
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
