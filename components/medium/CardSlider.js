import { Skeleton } from '@mui/material';
import { useRef } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import CardSliderHeader from '../small/CardSliderHeader';
import Card from '../small/SingleCard';
import { CustomLeftArrow, CustomRightArrow } from '../small/SliderArrows';

const CardSlider = ({ deviceType, title, type, data }) => {
  const carouselRef = useRef(0);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1530 },
      items: 6,
      slidesToSlide: 6
    },
    laptop: {
      breakpoint: { max: 1530, min: 1024 },
      items: 5,
      slidesToSlide: 5
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

  return (
    <>
      <div
        className="cardCarosel"
        style={{
          marginLeft: '4%',
          marginRight: '4%',
          paddingTop: '10px'
        }}>
        {data.every((d) => !d) ? (
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
          itemClass={data.every((d) => !d) ? '' : `card_ietms`}
          // removeArrowOnDeviceType={["tablet", "mobile"]}
          customLeftArrow={<CustomLeftArrow />}
          customRightArrow={<CustomRightArrow />}>
          {data.map((d, index) => {
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

            return (
              <Card
                key={index}
                styleClass={index === 0 ? 'card_ietms_start' : ''}
                carouselRefData={carouselRef.current}
                image={d.img}
                courseData={d}
              />
            );
          })}
          {data.every((d) => d) ? <div className="last-text">See All</div> : <></>}
        </Carousel>

        {/* move to .scss */}
        <style jsx>{`
          .last-text {
            padding: 24% 0;
            color: var(--primary);
            background-color: #868686;
            border-radius: 8px;
            text-align: center;
            cursor: pointer;
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
