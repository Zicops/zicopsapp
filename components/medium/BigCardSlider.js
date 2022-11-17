import { useEffect, useState } from 'react';
import { Skeleton } from '@mui/material';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import BigCard from '../small/SingleBigCard';
import CardSliderHeader from '../small/CardSliderHeader';
import { CustomLeftArrow, CustomRightArrow } from '../small/SliderArrows';
import { useRouter } from 'next/router';

const BigCardSlider = ({
  deviceType,
  title,
  type,
  data,
  slide,
  bigBox = false,
  handleTitleClick = () => {}
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter();

  const [cardData, setCardData] = useState(new Array(6).fill(null));
  // setTimeout(() => {
  //   setCardData(data);
  // }, 2000);
  useEffect(() => {
    setCardData(data);
  }, [data]);

  return (
    <>
      <div
        className="cardCarosel"
        style={{
          marginLeft: '4%',
          marginRight: '4%',
          paddingTop: '10px'
        }}>
        {cardData?.every((d) => !d) ? (
          <Skeleton
            style={{ marginBottom: '10px' }}
            sx={{ bgcolor: 'dimgray' }}
            variant="text"
            width={350}
            height={40}
          />
        ) : (
          <CardSliderHeader title={title} handleTitleClick={handleTitleClick} />
        )}
        <Carousel
          swipeable={false}
          draggable={false}
          showDots={false}
          responsive={slide}
          ssr={false}
          customTransition="all 1s"
          transitionDuration={1000}
          deviceType={deviceType}
          sliderClass="carousel_track"
          containerClass="carousel_container_big"
          itemClass="card_ietms_big"
          removeArrowOnDeviceType={['tablet', 'mobile']}
          customLeftArrow={<CustomLeftArrow />}
          customRightArrow={<CustomRightArrow />}>
          {cardData?.map((data, index) => {
            if (!data)
              return (
                <Skeleton
                  key={index}
                  sx={{ bgcolor: 'dimgray', borderRadius: '5px' }}
                  variant="rectangular"
                  height={396}
                />
              );

            let imgSrc = `/images/${data}.png`;
            return bigBox ? (
              <div
                className="bigBox"
                key={index}
                onClick={() => router.push('/search-page/?lang=' + data, '/search-page')}>
                <img src={imgSrc} alt="" />
                <span>{data}</span>
              </div>
            ) : (
              <BigCard key={data?.id} data={data} />
            );
          })}
          {/* {bigBox ? (<div className="last-text-big">See All</div>) : ''}; */}
        </Carousel>

        <style jsx>{`
          .bigBox {
            background-color: var(--tile-bg);
            color: var(--white);
            aspect-ratio: 1 / 1;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            // border: 2px solid transparent;
            border-radius: 20px;
            font-size: 2rem;
            font-weight: bolder;
            word-break: break-word;
            // box-shadow: 5px -5px 10px 0 #86868640, -5px 5px 10px 0 #00000080;
            transition: scale 0.3s;
          }
          .bigBox img {
            position: absolute;
            width: 100%;
            height: 100%;
          }
          .bigBox span {
            z-index: 2;
          }
          .bigBox:hover {
            // border: 2px solid var(--dark_three);
            scale: 1.05;
            transition: scale 0.3s;
          }
          .last-text-big {
            // padding: 48% 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 600px;
            color: var(--primary);
            background-color: #003548;
            border-radius: 8px;
            text-align: center;
            cursor: pointer;
          }
        `}</style>
      </div>
    </>
  );
};

export default BigCardSlider;
