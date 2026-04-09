import SectionTitle from '../shared/SectionTitle';
import GradientCircle from '../shared/GradientCircle';

interface FeatureCardData {
  icon: string;
  title: string;
  description: string;
}

interface ProductInsideBuiltForProps {
  sectionTitle: string;
  cards: FeatureCardData[];
  color?: string;
}

export default function ProductInsideBuiltFor({
  sectionTitle,
  cards,
  color = 'red',
}: ProductInsideBuiltForProps) {
  return (
    <section className="section_spacing">
      <div className="container">
        <div className="ProductInsideBuiltFor_ProductInsideBuiltFor__tovbe">
          <div>
            <SectionTitle title={sectionTitle} isHalf />
          </div>
          <div className="ProductInsideBuiltFor_built_for_wrap__H6kLU">
            {cards.map((card, index) => (
              <div key={index} className="FeatureCard_FeatureCard__eGGd fadeInUp">
                <div className="FeatureCard_initials__lzdx">
                  <img
                    alt={card.title}
                    loading="lazy"
                    width="56"
                    height="56"
                    decoding="async"
                    src={card.icon}
                    style={{ color: 'transparent' }}
                  />
                  <div className="FeatureCard_gradient_wrap__NbOus">
                    <GradientCircle color={color} opacity={0.7} />
                  </div>
                </div>
                <div className="FeatureCard_feature_card_content___VpU">
                  <h4 className="FeatureCard_title fs_20 fw_500 color_text">{card.title}</h4>
                  <p className="FeatureCard_description__IPfGo fs_16 color_primary_dark">
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
