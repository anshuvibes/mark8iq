import { Link } from 'react-router-dom';
import GradientCircle from '../shared/GradientCircle';
import ClipCard from '../shared/ClipCard';

interface OtherProduct {
  href: string;
  icon: string;
  title: string;
  description: string;
  comingSoon?: boolean;
}

interface ProductInsideOtherProductsProps {
  products: OtherProduct[];
  color?: string;
}

export default function ProductInsideOtherProducts({
  products,
  color = 'red',
}: ProductInsideOtherProductsProps) {
  return (
    <section className="section_spacing">
      <div className="container">
        <div className="ProductInsideOtherProducts_ProductInsideOtherProducts__QtaJM">
          {products.map((product, index) => (
            <div
              key={index}
              className="ProductInsideOtherProducts_product_item__A4lrc fadeInUp m_b_20"
            >
              <div className="ProductCard_ProductCard__vJkHd">
                {product.comingSoon ? (
                  <div className="ProductCard_card_content__2vPQx">
                    <div className="ProductCard_icon_wrap__sTfie">
                      <img
                        alt={product.title}
                        loading="lazy"
                        width="40"
                        height="40"
                        decoding="async"
                        src={product.icon}
                        style={{ color: 'transparent' }}
                      />
                    </div>
                    <h4 className="ProductCard_title fs_20 fw_500 color_text">{product.title}</h4>
                    <p className="ProductCard_desc fs_16 color_primary_dark">{product.description}</p>
                    <span className="fs_16 fw_500 color_text">Coming Soon</span>
                  </div>
                ) : (
                  <Link to={product.href}>
                    <div className="ProductCard_card_content__2vPQx">
                      <div className="ProductCard_icon_wrap__sTfie">
                        <img
                          alt={product.title}
                          loading="lazy"
                          width="40"
                          height="40"
                          decoding="async"
                          src={product.icon}
                          style={{ color: 'transparent' }}
                        />
                      </div>
                      <h4 className="ProductCard_title fs_20 fw_500 color_text">{product.title}</h4>
                      <p className="ProductCard_desc fs_16 color_primary_dark">
                        {product.description}
                      </p>
                      <span className="fs_16 fw_500 color_text">Learn more</span>
                    </div>
                  </Link>
                )}
                <div className="ProductCard_gradient__q2ybh">
                  <GradientCircle color={color} opacity={0.7} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
