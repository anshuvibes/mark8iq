import { useRef, useEffect } from 'react';
import { useNavigateLinks } from '../hooks/useNavigateLinks';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function DesignSystemPage() {
  const ref = useRef<HTMLDivElement>(null);
  useNavigateLinks(ref);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div ref={ref}>
      <h1 style={{ padding: '40px', textAlign: 'center', fontSize: '40px', fontWeight: 700 }}>Design System</h1>
      
      <section style={{ padding: '40px', borderBottom: '1px solid #eee' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 600, marginBottom: '24px' }}>Navigation</h2>
        <div style={{ border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }}>
          <Navbar />
        </div>
      </section>

      <section style={{ padding: '40px', borderBottom: '1px solid #eee' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 600, marginBottom: '24px' }}>Typography</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h1 className="fs_80">Heading fs_80</h1>
          <h2 className="fs_50">Heading fs_50</h2>
          <h3 className="fs_40">Heading fs_40</h3>
          <h4 className="fs_30">Heading fs_30</h4>
          <p className="fs_18">Body text fs_18</p>
          <p className="fs_16">Body text fs_16</p>
          <p className="fs_14">Small text fs_14</p>
        </div>
      </section>

      <section style={{ padding: '40px', borderBottom: '1px solid #eee' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 600, marginBottom: '24px' }}>Buttons</h2>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
          <span className="Button_btn_wrap__DW66V false">
            <button className="fs_18 font_primary fw_400 Button_btn_common_styles__ddJx7 bg_neutral_dark">
              <span>Get in Touch</span>
            </button>
          </span>
          <span className="Button_btn_wrap__DW66V Button_gradientBordered__mLA7E">
            <button className="fs_18 font_primary fw_400 Button_btn_common_styles__ddJx7">
              <span>Contact Our Team</span>
            </button>
            <span className="Button_gradientBorderedBg__t_hMi"></span>
          </span>
        </div>
      </section>

      <section style={{ padding: '40px', borderBottom: '1px solid #eee' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 600, marginBottom: '24px' }}>Cards</h2>
        <p className="fs_16" style={{ color: '#888' }}>Cards are rendered inline within each page's content.</p>
      </section>

      <section style={{ padding: '40px', borderBottom: '1px solid #eee' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 600, marginBottom: '24px' }}>Forms</h2>
        <div className="Footer_input_box_wrap__g5fXV" style={{ maxWidth: '400px' }}>
          <input className="fs_18 fw_300" type="email" placeholder="Yoursemail@gmail.com" />
          <div className="Footer_input_arrow_wrap__UapCx">
            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" fill="none" viewBox="0 0 11 11">
              <path fill="#EDEFF7" d="M.432 9.54 7.959 2.01H1.05V.258h9.9v9.9H9.197v-6.91l-7.528 7.529z"></path>
            </svg>
          </div>
        </div>
      </section>

      <section style={{ padding: '40px', borderBottom: '1px solid #eee' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 600, marginBottom: '24px' }}>Pre-footer CTA</h2>
        <div className="Footer_contact_btn_wrap__5hG97 contact_btn_wrap br_30">
          <div className="Footer_gradient_wrap__epkzQ Footer_gradient_wrap_small__pPza3">
            <div className="GradientCircle_GradientCircle__mH3g6 bg_primary gradient_circle" style={{opacity:1}}></div>
          </div>
          <div className="Footer_gradient_wrap__epkzQ Footer_gradient_wrap_large__5xIOl">
            <div className="GradientCircle_GradientCircle__mH3g6 bg_primary gradient_circle" style={{opacity:1}}></div>
          </div>
          <div className="Footer_text_btn_wrap___0Pzz">
            <div className="Footer_contact_text__EXzSa">
              <h2 className="fs_50 text_center"><span>Keep every detail on track </span></h2>
              <p className="text_center">Need a demo? Have a challenge? We're here to help you win.</p>
            </div>
            <div className="text_center color_text">
              <a href="/get-in-touch">
                <span className="Button_btn_wrap__DW66V Button_gradientBordered__mLA7E">
                  <button className="fs_18 font_primary fw_400 Button_btn_common_styles__ddJx7">
                    <span>Contact Our Team</span>
                  </button>
                  <span className="Button_gradientBorderedBg__t_hMi"></span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '40px' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 600, marginBottom: '24px' }}>Footer</h2>
        <div style={{ border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }}>
          <Footer />
        </div>
      </section>
    </div>
  );
}
