import { Skeleton } from '@mui/material';
import { useEffect, useRef } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import CardSliderHeader from '../small/CardSliderHeader';
import { CustomLeftArrow, CustomRightArrow } from '../small/SliderArrows';
import SmallCard from './SmallCard';
import SquareCard from './SquareCard';
import CircleCard from './CircleCard';
import styles from './zicopsCarousel.module.scss';

const CardSlider = ({ deviceType, title, type = 'small', data }) => {
  const carouselRef = useRef(0);
  // type=sqaure cardShape changes /circle/ . Have to override hover from global scss
  let variableClass = 'card_ietms';
  let itemCount = {
    desktop: 0,
    laptop: 0,
    shape: null,
    shapeStyle: undefined
  };

  const { square, circle, card_ietms } = styles;
  switch (type) {
    case 'small':
      itemCount.desktop = 6;
      itemCount.laptop = 5;
      itemCount.shapeStyle = card_ietms;
      break;
    case 'square':
      itemCount.desktop = 4;
      itemCount.laptop = 4;
      itemCount.shape = square;
      variableClass = 'sqaure';
      break;
    case 'circle':
      itemCount.desktop = 3;
      itemCount.laptop = 3;
      itemCount.shape = circle;
      variableClass = 'circle';
      break;
  }
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1530 },
      items: itemCount.desktop,
      slidesToSlide: itemCount.desktop
    },
    laptop: {
      breakpoint: { max: 1530, min: 1024 },
      items: itemCount.laptop,
      slidesToSlide: itemCount.laptop
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
      slidesToSlide: 3
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1
    }
  };

  // set the data after 2 min to view the skeleton loader
  // setTimeout(() => {
  //   setCardData(data);
  // }, 2000);

  // useEffect(() => {
  //   console.log(data);
  // }, [data]);
  return (
    <>
      <div
        className="cardCarosel"
        style={{
          marginLeft: '4%',
          marginRight: '4%',
          paddingTop: '25px'
        }}>
        {data?.every((d) => !d) ? (
          <Skeleton
            style={{ marginBottom: '10px' }}
            sx={{ bgcolor: 'dimgray' }}
            variant="text"
            width={350}
            height={40}
          />
        ) : (
          <CardSliderHeader title={title} />
        )}

        <Carousel
          ref={carouselRef}
          // ref={ (el) => console.log(el)}
          // beforeChange={makeFirstLastHoverDifferent}
          swipeable={false}
          draggable={false}
          showDots={false}
          responsive={responsive}
          ssr={false} // means to render carousel on server-side.
          // centerMode={true}
          // partialVisibility={true}
          // infinite={true}
          customTransition="all 1s"
          autoPlay={false}
          shouldResetAutoplay={false}
          transitionDuration={1000}
          deviceType={deviceType}
          sliderClass="carousel_track"
          containerClass="carousel_container"
          itemClass={data?.every((d) => !d) ? '' : `${variableClass}`}
          // removeArrowOnDeviceType={["tablet", "mobile"]}
          customLeftArrow={<CustomLeftArrow />}
          customRightArrow={<CustomRightArrow />}>
          {data?.map((d, index) => {
            if (!d)
              return (
                <Skeleton
                  key={index}
                  sx={{ bgcolor: 'dimgray', borderRadius: '5px' }}
                  variant="rectangular"
                  width={220}
                  height={120}
                />
              );
            if (type === 'small')
              return (
                <SmallCard
                  key={index}
                  styleClass={index === 0 ? 'card_ietms_start' : ''}
                  carouselRefData={carouselRef.current}
                  image={d.img}
                  courseData={d}
                  isShowProgress={title === 'Continue with your Courses'}
                />
              );
            if (type === 'square') return <SquareCard key={index} image={d.img} />;
            if (type === 'circle') return <CircleCard key={index} image={d.img} />;
          })}
          {data?.every((d) => d) ? (
            <div className={`${styles.last_text} ${itemCount.shape}`}>See All</div>
          ) : (
            <></>
          )}
        </Carousel>

        {/* move to .scss */}
        <style jsx>{`
          .last-text {
            height: 140px;
            color: var(--primary);
            background-color: var(--dark_three);
            border-radius: 8px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
          }
          .last-text:hover {
            border-radius: 4px;
            transition-delay: 0.6s;
          }
          .card_ietms[data-index='0']:hover {
            margin-left: 60px !important;
            margin-right: -60px !important;
          }
        `}</style>
      </div>
    </>
  );
};

export default CardSlider;
