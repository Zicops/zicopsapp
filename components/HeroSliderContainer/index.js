import Carousel from 'react-multi-carousel';
import styles from './heroSliderCotainer.module.scss';

const HeroSliderContainer = ({ children }) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
  };
  return (
    <>
      <div className={`${styles.carouselContainer}`}>
        <Carousel
          pauseOnHover={true}
          swipeable={false}
          draggable={false}
          showDots={true}
          responsive={responsive}
          ssr={false} // means to render carousel on server-side.
          infinite={true}
          autoPlay={false}
          autoPlaySpeed={5000}
          keyBoardControl={true}
          customTransition="all 1s"
          transitionDuration={1000}
          containerClass={`${styles.header_carousel_container}`}
          removeArrowOnDeviceType={['tablet', 'mobile', 'desktop']}
          deviceType="Laptop"
          dotListClass="custom-dot-list-style"
          // customDot={<CustomDot />}
          itemClass="carousel-item-padding-40-px">
          {children}
        </Carousel>
      </div>
      <div className={`${styles.dropUp}`}></div>
    </>
  );
};

export default HeroSliderContainer;
