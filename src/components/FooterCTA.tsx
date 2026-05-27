import { useRef } from 'react';
import { useNavigateLinks } from '../hooks/useNavigateLinks';

export default function FooterCTA() {
  return (
    <div style={{ paddingTop: 10, paddingBottom: 0 }}>
      <div className="Footer_main_footer__xevJU">
        <div className="Footer_main_footer_inner__CLu4C" style={{ background: 'transparent', padding: 0 }}>
          <div className="Footer_footer_content_wrap___c6El">
            <div
              className="Footer_contact_btn_wrap__5hG97 contact_btn_wrap br_30"
              style={{ marginBottom: 15 }}
            >
              <div className="Footer_gradient_wrap__epkzQ Footer_gradient_wrap_small__pPza3">
                <div className="GradientCircle_GradientCircle__mH3g6 bg_primary gradient_circle" style={{ opacity: 1 }} />
              </div>
              <div className="Footer_gradient_wrap__epkzQ Footer_gradient_wrap_large__5xIOl">
                <div className="GradientCircle_GradientCircle__mH3g6 bg_primary gradient_circle" style={{ opacity: 1 }} />
              </div>
              <div className="Footer_text_btn_wrap___0Pzz">
                <div className="Footer_contact_text__EXzSa">
                  <h2 className="fs_50 text_center" style={{ color: '#ffffff' }}>
                    <span>Your operation should run itself.</span>
                  </h2>
                </div>
                <div className="text_center" style={{ marginTop: 24 }}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                    style={{ display: 'inline-block' }}
                  >
                    <Button variant="m8-cta" size="lg" asChild>
                      <a href="/get-in-touch">Book a Demo</a>
                    </Button>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
