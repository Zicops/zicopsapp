import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import CustomButtonGroup from './CustomButtonGroup';
import styles from './itemSlider.module.scss';

export default function ItemSlider({
  carouselProps = {},
  children,
  responsiveViews = [3, 3, 1],
  noDataFound = false
}) {
  const { containerClass } = carouselProps;
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: responsiveViews[0],
      slidesToSlide: 1 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: responsiveViews[1],
      slidesToSlide: 1 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: responsiveViews[1],
      slidesToSlide: 1 // optional, default to 1.
    }
  };

  if (noDataFound) return <div className={`${styles.fallBackMsg}`}>No Resources Found</div>;

  return (
    <>
      <Carousel
        swipeable={false}
        draggable={false}
        showDots={false}
        responsive={responsive}
        ssr={false} // means to render carousel on server-side.
        infinite={true}
        // centerMode={true}
        shouldResetAutoplay={false}
        autoPlay={false}
        autoPlaySpeed={5000}
        keyBoardControl={true}
        customTransition="all 1s"
        transitionDuration={1000}
        containerClass={containerClass}
        // removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
        deviceType="Laptop"
        dotListClass=""
        // customDot={<CustomDot />}
        renderButtonGroupOutside={true}
        arrows={false}
        customButtonGroup={<CustomButtonGroup />}
        itemClass="">
        {children}
      </Carousel>

      {/* move to .scss */}
      <style jsx>
        {`
          .busterCards {
          }
          .item {
            // display: flex;
            // background-color: var(--primary);
            padding: 20px;
          }
        `}
      </style>
    </>
  );
}
