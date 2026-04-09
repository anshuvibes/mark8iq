import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const stories = [
  {
    name: 'Nandita Sinha', role: 'CEO', company: 'Myntra',
    quote: 'Lorem ipsum dolor sit amet consectetur. Accumsan tellus a amet sodales ultrices ipsum. Sed vel consectetur interdum semper vestibulum. Arcu posuere pellentesque nunc egestas viverra viverra tristique platea ante. Sed vel consectetur interdum semper vestibulum.',
    logo: 'https://admin.infytrix.info/uploads/myntra_0ef843ae4c.svg', logoW: 133, logoH: 36,
    img: 'https://infytrix.info/_next/image?url=https%3A%2F%2Fadmin.infytrix.info%2Fuploads%2Fdummy_4610990c7b.webp&w=640&q=75',
  },
  {
    name: 'Kalyan Krishnamurthy', role: 'CEO', company: 'Flipkart',
    quote: 'Lorem ipsum dolor sit amet consectetur. Accumsan tellus a amet sodales ultrices ipsum. Sed vel consectetur interdum semper vestibulum. Arcu posuere pellentesque nunc egestas viverra viverra tristique platea ante. Sed vel consectetur interdum semper vestibulum.',
    logo: 'https://admin.infytrix.info/uploads/flipkart_02bb484171.svg', logoW: 164, logoH: 43,
    img: 'https://infytrix.info/_next/image?url=https%3A%2F%2Fadmin.infytrix.info%2Fuploads%2Fdummy_4610990c7b.webp&w=640&q=75',
  },
];

const ArrowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" fill="none" viewBox="0 0 11 11">
    <path fill="#EDEFF7" d="M.432 9.54 7.959 2.01H1.05V.258h9.9v9.9H9.197v-6.91l-7.528 7.529z"></path>
  </svg>
);

export default function StoriesSection() {
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <section className="section_spacing">
      <div className="HomeStories_HomeStories__V3PkK">
        <div className="container">
          <motion.div
            className="SectionTitle_SectionTitle__fv0YD false half_title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section_title color_text" aria-label="Stories of real outcomes">
              Stories of real outcomes
            </h2>
          </motion.div>

          {/* Brand Logo Slider */}
          <motion.div
            className="HomeStories_brand_slider__rpqsc"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="slick-slider slick-initialized">
              <div className="slick-list">
                <div className="slick-track" style={{ width: `${stories.length * 209}px`, opacity: 1, transform: 'translate3d(0px, 0px, 0px)' }}>
                  {stories.map((story, i) => (
                    <div
                      key={i}
                      data-index={i}
                      className={`slick-slide ${i === activeSlide ? 'slick-active slick-current' : ''}`}
                      tabIndex={-1}
                      style={{ outline: 'none', width: 209, cursor: 'pointer' }}
                      onClick={() => setActiveSlide(i)}
                    >
                      <div>
                        <motion.div
                          className="HomeStories_brand_logo_item__vsM6F"
                          tabIndex={-1}
                          style={{ width: '100%', display: 'inline-block' }}
                          whileHover={{ scale: 1.08 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                        >
                          <img alt={story.company} loading="lazy" width={story.logoW} height={story.logoH} style={{ color: 'transparent' }} src={story.logo} />
                        </motion.div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Story Cards */}
          <div className="undefined m_t_40">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
              >
                {(() => {
                  const story = stories[activeSlide];
                  return (
                    <div className="StoryCard_StoryCard__Jez_H">
                      <div className="StoryCard_story_img__twL_l">
                        <div className="ClipCard_ClipCard__bXUlH clipCard">
                          <div className="ClipCard_ClipCardInner__BFU7k ClipCardInner" style={{ WebkitMaskImage: 'url(/img/clip-shapes/stories-card.svg)', aspectRatio: '0.9612590799031477' }}>
                            <div className="StoryCard_img_wrap__zH3yH bg_text">
                              <img alt={story.name} loading="lazy" width={318} height={354} style={{ color: 'transparent' }} src={story.img} />
                              <div className="StoryCard_gradient_wrap__Khv4n">
                                <div className="col-xs-4 p_lr_0">
                                  <div className="GradientCircle_GradientCircle__mH3g6 bg_primary gradient_circle" style={{ opacity: 0.7 }}></div>
                                </div>
                                <div className="col-xs-8 p_lr_0">
                                  <div className="GradientCircle_GradientCircle__mH3g6 bg_primary gradient_circle" style={{ opacity: 1 }}></div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="ClipCard_clip_image__QFYcd">
                            <img alt="" loading="lazy" width={397} height={413} style={{ color: 'transparent' }} src="https://infytrix.info/img/clip-shapes/stories-card.svg" />
                          </div>
                        </div>
                      </div>
                      <div className="StoryCard_story_content___h_7Y color_primary_dark">
                        <div className="undefined fs_24">
                          <div className="ContentFromCms_contentFromCms__qAvpD">
                            <p>{story.quote}</p>
                          </div>
                        </div>
                        <div className="StoryCard_story_info__tGLAb">
                          <p className="undefined fs_30">{story.name}</p>
                          <div>
                            <p className="undefined fs_20 fw_500">{story.role}, <span className="undefined fs_20 fw_500">{story.company}</span></p>
                          </div>
                          <div className="StoryCard_company_link__LQfVa">
                            <a href="/">
                              <motion.div
                                className="IconButton_IconButton__MhTxv bg_primary IconButton_size_regular__GEIC5 br_5"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <div className="IconButton_iconWrap__cJF8d iconWrap">
                                  <ArrowIcon />
                                </div>
                              </motion.div>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
