import SectionTitle from '../shared/SectionTitle';
import ClipCard from '../shared/ClipCard';

interface InsightCard {
  image: string;
  title: string;
  description: string;
}

interface ProductInsideInsightsProps {
  sectionTitle: string;
  cards: InsightCard[];
}

export default function ProductInsideInsights({
  sectionTitle,
  cards,
}: ProductInsideInsightsProps) {
  return (
    <section className="section_spacing">
      <div className="container">
        <div className="ProductInsideInsights_ProductInsideInsights__DGqyt">
          <div className="ProductInsideInsights_title__uCPKr m_b_20">
            <SectionTitle title={sectionTitle} isHalf />
          </div>
          <div className="ProductInsideInsights_insights_wrap__iqbXQ">
            {cards.map((card, index) => (
              <div key={index} className="InsightsCard_InsightsCard__OO3F fadeInUp">
                <div className="InsightsCard_image_wrap__LDfZG">
                  <ClipCard
                    imageSrc={card.image}
                    clipShape="/img/clip-shapes/blog-image.svg"
                  />
                </div>
                <div className="InsightsCard_content__sTCDU">
                  <h4 className="InsightsCard_title fs_18 fw_500 color_text">{card.title}</h4>
                  <p className="InsightsCard_desc fs_14 color_primary_dark">{card.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
