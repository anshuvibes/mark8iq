import { useRef } from 'react';
import { useNavigateLinks } from '../hooks/useNavigateLinks';

const ctaHTML = `<div class="Footer_contact_btn_wrap__5hG97 contact_btn_wrap br_30"><div class="Footer_gradient_wrap__epkzQ Footer_gradient_wrap_small__pPza3"><div class="GradientCircle_GradientCircle__mH3g6 bg_primary gradient_circle" style="opacity:1"></div></div><div class="Footer_gradient_wrap__epkzQ Footer_gradient_wrap_large__5xIOl"><div class="GradientCircle_GradientCircle__mH3g6 bg_primary gradient_circle" style="opacity:1"></div></div><div class="Footer_text_btn_wrap___0Pzz"><div class="Footer_contact_text__EXzSa "><h2 class="fs_50  text_center"><span>Your operation should run itself.</span></h2><p class="text_center">Let us show you how.</p></div><div class="undefined text_center color_text"><a href="/get-in-touch"><span class="Button_btn_wrap__DW66V Button_gradientBordered__mLA7E"><button class="fs_18 font_primary fw_400 Button_btn_common_styles__ddJx7 "><span>Book a Demo.</span></button><span class="Button_gradientBorderedBg__t_hMi"></span></span></a></div></div></div>`;

export default function FooterCTA() {
  const ref = useRef<HTMLDivElement>(null);
  useNavigateLinks(ref);
  return <div ref={ref} dangerouslySetInnerHTML={{ __html: ctaHTML }} />;
}
