interface ClipCardProps {
  imageSrc: string;
  clipShape?: string;
  alt?: string;
  size?: 'default' | 'big';
  className?: string;
}

export default function ClipCard({
  imageSrc,
  clipShape = '/img/clip-shapes/product-card.svg',
  alt = '',
  size = 'default',
  className = '',
}: ClipCardProps) {
  const sizeClass = size === 'big' ? 'ClipCard_big__VWjTE' : '';

  return (
    <div className={`ClipCard_ClipCard__0KpSI ${sizeClass} ${className}`}>
      <div className="ClipCard_clip_image__2YQpL">
        <img
          alt={alt}
          loading="lazy"
          decoding="async"
          src={imageSrc}
          style={{ color: 'transparent' }}
        />
      </div>
      <div className="ClipCard_clip_shape__ziqG_">
        <img
          alt=""
          loading="lazy"
          decoding="async"
          src={clipShape}
          style={{ color: 'transparent' }}
        />
      </div>
    </div>
  );
}
