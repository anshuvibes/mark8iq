import { motion } from 'motion/react';

export default function IqInsight() {
  return (
    <section className="section_spacing">
      <div className="HomeIqBehind_HomeIqBehind__Yh_Kl">
        <div className="container">
          <div className="HomeIqBehind_home_iq_behind_inner__qKfTo bg_neutral_light br_30">
            <div className="HomeIqBehind_item_left__P0Jnl">
              <motion.h2
                className="section_title"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6 }}
              >
                Insight-Powered By Mark8 Intelligence
              </motion.h2>
              <div className="HomeIqBehind_iq_img_mobile__0RSRw">
                <img alt="Mark8 IQ Dashboard" loading="lazy" width={380} height={370} style={{ color: 'transparent' }} src="https://infytrix.info/img/home/iq.svg" />
              </div>
              <motion.div
                className="m_b_10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <p>We provide Mark8 Intelligence that provides you with supply-level monitoring, continuously analysing sell-through patterns and category trends using agentic AI, so you can forecast how your brand will perform across marketplaces. Try the dashboard to see the product in action.</p>
                <p>&nbsp;</p>
              </motion.div>
              <motion.div
                className="undefined m_t_40"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.35 }}
              >
                <a target="_blank" href="/" rel="noreferrer">
                  <span className="Button_btn_wrap__DW66V false">
                    <motion.button
                      className="fs_18 font_primary fw_400 Button_btn_common_styles__ddJx7 bg_primary"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <span>Experience Now</span>
                    </motion.button>
                  </span>
                </a>
              </motion.div>
            </div>
            <motion.div
              className="HomeIqBehind_item_right__6pYGD"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <img alt="Mark8 IQ" loading="lazy" width={402} height={407} style={{ color: 'transparent' }} src="https://admin.infytrix.info/uploads/iq_d2b23eec8b.svg" />
            </motion.div>
            <div className="HomeIqBehind_gradient_wrap__as2Kg">
              <div className="col-xs-4 p_lr_0">
                <div className="GradientCircle_GradientCircle__mH3g6 bg_primary gradient_circle" style={{ opacity: 0.5 }}></div>
              </div>
              <div className="col-xs-8 p_lr_0">
                <div className="GradientCircle_GradientCircle__mH3g6 bg_primary gradient_circle" style={{ opacity: 0.7 }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
