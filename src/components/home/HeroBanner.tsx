import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';

export default function HeroBanner() {
  return (
    <section className="section_spacing">
      <div className="HomeBanner_HomeBanner__L79e6">
        <div className="HomeBanner_banner_inner__e3AX5">
          <div className="HomeBanner_banner_item_wrap__EoAwC">
            <div className="container">
              <div className="HomeBanner_banner_item__utsH1">
                <div className="HomeBanner_banner_item_left__Fzf9j">
                  <motion.div
                    className="fs_50 m_b_10 color_text"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                  >
                    <p>Scale every<br />mark8 confidently.</p>
                  </motion.div>
                  <motion.div
                    className="fs_20 m_b_30 color_primary_dark"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
                  >
                    <p>One-platform solution for your fragmented data</p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4, ease: 'easeOut' }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                      style={{ display: 'inline-block' }}
                    >
                      <Button variant="m8-dark" size="lg" asChild>
                        <a href="/get-in-touch">Find Out How</a>
                      </Button>
                    </motion.div>
                  </motion.div>
                  <motion.div
                    className="HomeBanner_logo_wrap__BXJMn"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    <div className="HomeBanner_logo_item__APlQy">
                      <img alt="Amazon Verified" loading="lazy" width={106} height={68} src="https://infytrix.info/_next/image?url=https%3A%2F%2Fadmin.infytrix.info%2Fuploads%2Famazon_verified_af8a44e026.png&w=256&q=75" />
                    </div>
                    <div className="HomeBanner_logo_item__APlQy">
                      <img alt="AWS" loading="lazy" width={76} height={76} src="https://infytrix.info/_next/image?url=https%3A%2F%2Fadmin.infytrix.info%2Fuploads%2Faws_2fd4c75a82.png&w=256&q=75" />
                    </div>
                  </motion.div>
                </div>
                <motion.div
                  className="HomeBanner_banner_item_right__FsqQl"
                  initial={{ opacity: 0, x: 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
                >
                  <img alt="Mark8 IQ Dashboard" loading="lazy" width={826} height={517} style={{ color: 'transparent' }} src="https://admin.infytrix.info/uploads/banner1_4e8854471b.svg" />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
