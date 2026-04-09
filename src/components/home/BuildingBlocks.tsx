import { motion } from 'motion/react';

const featureCards = [
  {
    title: 'Ads',
    desc: 'Smart advertising fuels discovery. Without precision, spend climbs while performance flatlines.',
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 28 28"><path fill="#EDEFF7" d="M19.423 13.485 28 16.122l-5.071 2.948 4.194 4.195-3.858 3.858-4.195-4.194L16.122 28l-2.637-8.577-3.489-9.427zM0 11.142C0 5 4.996 0 11.142 0s11.141 4.996 11.141 11.142h-4.007c0-3.935-3.2-7.136-7.134-7.136s-7.136 3.201-7.136 7.136 3.201 7.134 7.136 7.134v4.003C4.996 22.28 0 17.283 0 11.142"></path></svg>,
  },
  {
    title: 'Inventory',
    desc: 'Great operations rely on balance. Stockouts cut revenue. Surplus traps capital. Control creates consistency.',
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="#EDEFF7" d="M16.455 0v10.132L12 7.162l-4.455 2.97V0H0v24h24V0z"></path></svg>,
  },
  {
    title: 'Returns',
    desc: 'Unchecked returns eat into margins and customer trust. Mitigation starts with visibility and swift resolution.',
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="23" height="25" fill="none" viewBox="0 0 23 25"><path fill="#EDEFF7" d="M11.806 2.037V0L8.18 2.094 4.55 4.187 8.18 6.281l3.627 2.094V6.06c3.954 0 7.171 3.216 7.171 7.17s-3.217 7.171-7.17 7.171c-3.954 0-7.171-3.217-7.171-7.17H.609c0 6.172 5.021 11.196 11.197 11.196 6.177 0 11.197-5.02 11.197-11.197S17.98 2.037 11.806 2.037"></path></svg>,
  },
  {
    title: 'Finance',
    desc: 'Clarity in cash flow, revenue, and cost structures separates growth from chaos. Precision here powers every decision.',
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="19" height="24" fill="none" viewBox="0 0 19 24"><path fill="#EDEFF7" d="M9.64 23.277 0 14.476v-3.4h6.97q1.199 0 1.966-.099c.513-.065.91-.19 1.2-.365a1.85 1.85 0 0 0 .664-.681c.153-.278.256-.616.3-1.02H0v-2.5h11.105c-.043-.6-.185-1.057-.414-1.368q-.35-.467-1.199-.665c-.566-.13-1.395-.201-2.485-.201H0V.336h18.107v2.501h-3.4q.498.736.736 1.618c.152.589.245 1.237.267 1.951h2.403v2.501H15.71c-.11 1.466-.436 2.638-.965 3.52-.534.878-1.335 1.504-2.403 1.886q-1.601.565-4.136.566H7.008l9.138 8.403H9.645z"></path></svg>,
  },
  {
    title: 'Research & Visibility',
    desc: 'Top brands see the field clearly. They track competitors, category shifts, and ranking signals before making a move.',
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="23" height="28" fill="none" viewBox="0 0 23 28"><path fill="#EDEFF7" d="m22.13 25.17-4.115-6.501a10.73 10.73 0 0 0 3.488-7.92C21.503 4.822 16.68 0 10.753 0S0 4.822 0 10.753s4.822 10.753 10.753 10.753c1.427 0 2.788-.282 4.03-.787l4.115 6.5 3.232-2.045zM3.824 10.753c0-3.82 3.109-6.929 6.93-6.929s6.928 3.109 6.928 6.93-3.109 6.928-6.929 6.928a6.94 6.94 0 0 1-6.929-6.929"></path></svg>,
  },
];

export default function BuildingBlocks() {
  return (
    <section className="section_spacing">
      <div className="HomeBuildingBlocks_HomeBuildingBlocks__ladc1">
        <div className="container">
          <div className="HomeBuildingBlocks_building_blocks_inner__FGXk9">
            <motion.div
              className="HomeBuildingBlocks_item_left__ZYuRo"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6 }}
            >
              <div className="SectionTitle_SectionTitle__fv0YD false half_title">
                <h2 className="section_title color_text" aria-label="The architecture of e-comm success">
                  The architecture of e-comm success
                </h2>
                <div className="section_desc">
                  Success in e-commerce starts with control over five essential pillars. When each one is managed with precision, growth follows naturally.
                </div>
              </div>
            </motion.div>
            <div className="HomeBuildingBlocks_item_right__EY37I">
              {featureCards.map((card, i) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, x: 60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
                >
                  <motion.div
                    className="FeatureCard_FeatureCard__eGGd4"
                    whileHover={{ x: -8 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    <div className="FeatureCard_initials__lzdx8 bg_primary br_10 fw_500">
                      {card.icon}
                    </div>
                    <div className="ClipCard_ClipCard__bXUlH clipCard">
                      <div className="ClipCard_ClipCardInner__BFU7k ClipCardInner" style={{ WebkitMaskImage: 'url(/img/clip-shapes/product-card.svg)', aspectRatio: '1.479553903345725' }}>
                        <div className="FeatureCard_feature_card_content___VpU1">
                          <p className="undefined fs_20 m_b_10 color_text">{card.title}</p>
                          <p className="FeatureCard_description__IPfGo fs_16 fw_300 color_primary_dark">{card.desc}</p>
                        </div>
                        <div className="FeatureCard_gradient_wrap__NbOus">
                          <div className="col-xs-4 p_lr_0">
                            <div className="GradientCircle_GradientCircle__mH3g6 bg_primary gradient_circle" style={{ opacity: 0.7 }}></div>
                          </div>
                          <div className="col-xs-8 p_lr_0">
                            <div className="GradientCircle_GradientCircle__mH3g6 bg_primary gradient_circle" style={{ opacity: 1 }}></div>
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
      </div>
    </section>
  );
}
