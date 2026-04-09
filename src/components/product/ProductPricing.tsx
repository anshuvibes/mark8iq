import { useState } from 'react';
import SectionTitle from '../shared/SectionTitle';
import GradientCircle from '../shared/GradientCircle';

interface MarketplaceItem {
  logo: string;
  name: string;
}

interface ProductPricingProps {
  sectionTitle: string;
  slabValues: string[];
  marketplaces: MarketplaceItem[];
  color?: string;
  bookingUrl?: string;
}

export default function ProductPricing({
  sectionTitle,
  slabValues,
  marketplaces,
  color = 'red',
  bookingUrl = 'https://outlook.office.com/book/Mark8IQ@infytrix.com/?ismsaljsauthenabled',
}: ProductPricingProps) {
  const [sliderValue, setSliderValue] = useState(0);
  const maxSlider = slabValues.length - 1;
  const percentage = maxSlider > 0 ? (sliderValue / maxSlider) * 100 : 0;

  return (
    <section className="section_spacing">
      <div className="container">
        <div className="ProductPricing_ProductPricing__ZDY_B">
          <div className="undefined m_b_20">
            <SectionTitle title={sectionTitle} isHalf />
          </div>
          <div className="ProductPricing_pricing_wrap__ntQ12">
            <div className="MarketPricing_MarketPricing__ULJdW">
              <p className="font_primary color_text fw_400 fs_30 text_center">
                Marketplaces you choose
              </p>
              <div className="InputRange_pricing_box__iHSHi">
                <p className="font_primary color_text fw_500 fs_20 text_center">
                  How much would you like to spend per month/yearly?
                </p>
                <div className="InputRange_pricing_range_wrap__2B1PH">
                  <input
                    className="InputRange_input_range__5PZgH input_range"
                    min="0"
                    max={maxSlider.toString()}
                    step="1"
                    type="range"
                    value={sliderValue}
                    onChange={(e) => setSliderValue(Number(e.target.value))}
                    style={{
                      '--thumb-color': `var(--color_${color})`,
                      background: `linear-gradient(
                        to right,
                        var(--color_${color}) ${percentage}%,
                        rgba(221, 64, 98, 0.5) ${percentage}%,
                        var(--color_gray) ${percentage}%,
                        var(--color_gray) 100%
                      )`,
                    } as React.CSSProperties}
                  />
                  <div className="InputRange_market_slab_values_box__nr6rm">
                    {slabValues.map((val, i) => (
                      <span key={i} className="InputRange_market_value__09nYT font_primary fw_400 fs_18">
                        {val}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="MarketPricing_market_places__wQAj3">
                <p className="font_primary color_text fw_500 fs_20">
                  Which marketplaces would you like to include?
                </p>
                <div className="MarketPricing_select_spends__Qc7Vr">
                  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="none" viewBox="0 0 13 13">
                    <rect width="12.271" height="11.781" x="0.043" y="0.328" fill="#FFC2CF" opacity="0.2" rx="3" />
                  </svg>
                  <span className="font_primary fw_300 fs_14 color_text">Select your highest ad spends</span>
                </div>
                <div className="MarketPricing_market_places_wrap__TMtPs">
                  {marketplaces.map((mp, i) => (
                    <div key={i} className="MarketPlaceItem_MarketPlaceItem__bB_20">
                      <div className="MarketPlaceItem_market_logo__VeIAV">
                        <img
                          alt={mp.name}
                          loading="lazy"
                          width="51"
                          height="51"
                          decoding="async"
                          src={mp.logo}
                          style={{ color: 'transparent' }}
                        />
                        <div className="MarketPlaceItem_gradient__q2ybh">
                          <GradientCircle color={color} opacity={0.7} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="MarketPricing_gradient_wrap__vy35k">
                <div className="col-xs-4 p_lr_0">
                  <GradientCircle color={color} opacity={0.7} />
                </div>
                <div className="col-xs-8 p_lr_0">
                  <GradientCircle color={color} opacity={1} />
                </div>
              </div>
            </div>
            <div className="MarketDiscount_MarketDiscount__hIQ_s">
              <div className="MarketDiscount_logo__Q9Ydz text_center">
                <img
                  alt="Logo"
                  loading="lazy"
                  width="169"
                  height="26"
                  decoding="async"
                  src="https://admin.infytrix.info/uploads/Logo_1_2e952af0b7.svg"
                  style={{ color: 'transparent' }}
                />
              </div>
              <p>Flexible pricing engineered to fit your strategy and scale with your ambitions.</p>
              <div className="MarketDiscount_market_cost_box__Q9gN9">
                <p className="font_primary color_text fw_500 fs_20">
                  0 apps in one
                </p>
                <p className="MarketDiscount_month_cost__fSQu0 font_primary color_text fw_600 fs_30">
                  ₹0 / month
                </p>
                <p className="MarketDiscount_desp__MJJ7s font_primary color_text fw_400 fs_18">
                  Lorem ipsum dolor sit amet consectetur. Diam congue orci aliquam
                </p>
              </div>
              <div className="MarketDiscount_market_cost_box__Q9gN9">
                <p className="font_primary color_text fw_500 fs_20">
                  Save ₹0 yearly
                </p>
                <p className="MarketDiscount_month_cost__fSQu0 font_primary color_text fw_600 fs_30">
                  ₹0 / year
                </p>
                <p className="MarketDiscount_desp__MJJ7s font_primary color_text fw_400 fs_18">
                  Lorem ipsum dolor sit amet consectetur. Diam congue orci aliquam
                </p>
              </div>
              <span className="Button_btn_wrap__DW66V false">
                <button className={`fs_18 font_primary fw_400 Button_btn_common_styles__ddJx7 bg_${color}`}>
                  <span>
                    <a target="_blank" rel="noopener noreferrer" href={bookingUrl}>
                      Book Now
                    </a>
                  </span>
                </button>
              </span>
              <div className="MarketDiscount_gradient_wrap__tdwE7">
                <div className="col-xs-4 p_lr_0">
                  <GradientCircle color={color} opacity={0.7} />
                </div>
                <div className="col-xs-8 p_lr_0">
                  <GradientCircle color={color} opacity={1} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
