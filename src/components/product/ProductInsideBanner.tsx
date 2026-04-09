import SectionTitle from '../shared/SectionTitle';
import ClipCard from '../shared/ClipCard';
import IconButton from '../shared/IconButton';

interface ProductInsideBannerProps {
  title: string;
  description: string;
  bannerImage: string;
  clipShape?: string;
  color?: string;
}

export default function ProductInsideBanner({
  title,
  description,
  bannerImage,
  clipShape = '/img/clip-shapes/product-card-big.svg',
  color = 'red',
}: ProductInsideBannerProps) {
  return (
    <section className="section_spacing">
      <div className="container">
        <div className="ProductInsideBanner_ProductInsideBanner__64rmh">
          <div>
            <SectionTitle title={title} isHalf />
            <p className="ProductInsideBanner_desc__pDPwM fs_18 color_primary_dark">
              {description}
            </p>
            <IconButton label="Get In Touch" href="/get-in-touch" color="neutral_dark" />
          </div>
          <div className="ProductInsideBanner_banner_img__tQpCY">
            <ClipCard imageSrc={bannerImage} clipShape={clipShape} size="big" />
          </div>
        </div>
      </div>
    </section>
  );
}
