import { useRef } from 'react';
import { useNavigateLinks } from '../hooks/useNavigateLinks';

const ctaHTML = `<div class="Footer_main_footer__xevJU"><div class="Footer_main_footer_inner__CLu4C" style="background:transparent;padding:0;"><div class="Footer_footer_content_wrap___c6El"><div class="Footer_contact_btn_wrap__5hG97 contact_btn_wrap br_30" style="margin-bottom:15px;"><div class="Footer_gradient_wrap__epkzQ Footer_gradient_wrap_small__pPza3"><div class="GradientCircle_GradientCircle__mH3g6 bg_primary gradient_circle" style="opacity:1"></div></div><div class="Footer_gradient_wrap__epkzQ Footer_gradient_wrap_large__5xIOl"><div class="GradientCircle_GradientCircle__mH3g6 bg_primary gradient_circle" style="opacity:1"></div></div><div class="Footer_text_btn_wrap___0Pzz"><div class="Footer_contact_text__EXzSa"><h2 class="fs_50 text_center" style="color:#ffffff;"><span>Your operation should run itself.</span></h2></div><div class="text_center color_text footer-cta-button" style="margin-top:24px;"><a href="/get-in-touch"><span class="Button_btn_wrap__DW66V Button_gradientBordered__mLA7E"><button class="fs_18 font_primary fw_400 Button_btn_common_styles__ddJx7"><span>Book a Demo.</span></button></span></a></div></div></div></div></div></div>`;

const scopedCSS = `
.footer-cta-button .Button_gradientBordered__mLA7E {
  position: relative;
  padding: 2px;
  border-radius: 8px;
  overflow: hidden;
  isolation: isolate;
  background: #0a0a14;
}
.footer-cta-button .Button_gradientBordered__mLA7E::before,
.footer-cta-button .Button_gradientBordered__mLA7E::after {
  content: "";
  position: absolute;
  inset: -150%;
  z-index: 0;
  pointer-events: none;
  background: conic-gradient(from 0deg, transparent 0deg, rgba(255,255,255,0.95) 18deg, transparent 50deg, transparent 360deg);
  animation: footerCtaSpin 3.2s linear infinite;
}
.footer-cta-button .Button_gradientBordered__mLA7E::after {
  background: conic-gradient(from 180deg, transparent 0deg, rgba(142,89,255,0.95) 18deg, transparent 50deg, transparent 360deg);
  animation-direction: reverse;
  animation-duration: 3.2s;
}
.footer-cta-button .Button_gradientBordered__mLA7E > .Button_btn_common_styles__ddJx7 {
  position: relative;
  z-index: 1;
  background: #0a0a14;
  color: #fff;
  border-radius: 6px;
}
@keyframes footerCtaSpin {
  to { transform: rotate(360deg); }
}
`;

export default function FooterCTA() {
  const ref = useRef<HTMLDivElement>(null);
  useNavigateLinks(ref);
  return (
    <>
      <style>{scopedCSS}</style>
      <div ref={ref} style={{ paddingTop: 10 }} dangerouslySetInnerHTML={{ __html: ctaHTML }} />
    </>
  );
}
