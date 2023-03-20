import Carousel from 'react-multi-carousel';
import { CustomLeftArrow, CustomRightArrow } from '../small/SliderArrows';
import styles from './heroSliderCotainer.module.scss';

const HeroSliderContainer = ({ children }) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
      partialVisibilityGutter: 20
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 1,
      partialVisibilityGutter: 20 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
      partialVisibilityGutter: 20 // optional, default to 1.
    },
    laptop: {
      breakpoint: { max: 1530, min: 1024 },
      items: 1,
      slidesToSlide: 1,
      partialVisibilityGutter: 20
    }
  };
  return (
    <>
      <div className={`${styles.heroContainer}`}>
        <Carousel
          swipeable={false}
          draggable={false}
          showDots={true}
          responsive={responsive}
          ssr={false} // means to render carousel on server-side.
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={5000}
          keyBoardControl={true}
          customTransition="all 1s"
          transitionDuration={1000}
          containerClass={`${styles.header_carousel_container}`}
          sliderClass={`${styles.carousel_track}`}
          //removeArrowOnDeviceType={['tablet', 'mobile', 'desktop']}
          deviceType="Laptop"
          dotListClass="custom-dot-list-style"
          // customDot={<CustomDot />}
          // partialVisbile={true}
          customLeftArrow={<CustomLeftArrow customClass={styles.customLeftArrow} />}
          customRightArrow={<CustomRightArrow customClass={styles.customRightArrow} />}
          itemClass={`${styles.itemContainer}`}>
          {children}
        </Carousel>
      </div>
      {/* <div className={`${styles.dropUp}`}></div> */}
    </>
  );
};

export default HeroSliderContainer;
