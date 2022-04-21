import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import TopicFiles from './TopicFiles';
import Image from 'next/image';
import { useRecoilValue } from 'recoil';
import { Resources } from '../../../state/atoms/module.atoms';
import { getResourceCount } from '../Logic/courseBody.helper';
import { Fragment } from 'react';

export default function ItemSlider({ itemsArr, showResources, isResourceShown }) {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 1 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
      slidesToSlide: 1 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
  };
  let prevItem = null;

  const CustomLeftArrow = ({ onClick, styleClass }) => (
    <>
      <div className={`left_arrow ${styleClass} `}>
        <Image
          onClick={() => onClick()}
          src="/images/bigarrowleft.png"
          alt=""
          height={20}
          width={20}
        />
      </div>

      <style jsx>
        {`
          .left_arrow {
            position: absolute !important;
            left: 5%;
            margin-top: -165px;
            opacity: 0.8;
            cursor: pointer;
          }
          .left_arrow:hover {
            opacity: 1;
          }
          .disable{
            display: none;
          }
        `}
      </style>
    </>
  );
  const CustomRightArrow = ({ onClick }) => (
    <>
      <div className="right_arrow">
        <Image
          onClick={() => onClick()}
          src="/images/bigarrowright.png"
          alt=""
          height={20}
          width={20}
        />
      </div>

      <style jsx>
        {`
          .right_arrow {
            position: absolute !important;
            right: 5%;
            margin-top: -165px;
            opacity: 0.8;
            cursor: pointer;
          }
          .right_arrow:hover {
            opacity: 1;
          }
        `}
      </style>
    </>
  );

  const ButtonGroup = ({ next, previous, goToSlide, ...rest }) => {
    const {
      carouselState: { currentSlide }
    } = rest;
    return (
      <div className="carousel-button-group">
        <CustomLeftArrow
          styleClass={currentSlide === 0 ? 'disable' : ''}
          onClick={() => previous()}
        />
        <CustomRightArrow onClick={() => next()} />
        {/* <ButtonThree onClick={() => goToSlide(currentSlide + 1)}> Go to any slide </ButtonThree> */}
      </div>
    );
  };
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
        containerClass="itsItemContainer"
        arrows={false}
        renderButtonGroupOutside={true}
        customButtonGroup={<ButtonGroup />}
        // customRightArrow={<CustomRightArrow />}
        // customLeftArrow={<CustomLeftArrow />}
        // removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
        deviceType="Laptop"
        dotListClass=""
        // customDot={<CustomDot />}
        itemClass="">
        {itemsArr.map((item, i) => {
          if (i + 1 == itemsArr.length) {
            return (
              <div style={{ padding: '5px' }}>
                <TopicFiles
                  fileCount={getResourceCount(item.id)}
                  topic={item}
                  handleClick={showResources}
                  isResourceShown={isResourceShown}
                />
              </div>
            );
          }
          if (i % 2 == 0) {
            prevItem = item;
            return null;
          }

          // console.log(isResourceShown, prevItem.id, item.id);

          return (
            <Fragment key={item.id}>
              <div style={{ padding: '5px' }}>
                <TopicFiles
                  fileCount={getResourceCount(prevItem.id)}
                  topic={prevItem}
                  handleClick={showResources}
                  isResourceShown={isResourceShown}
                />
              </div>
              <div style={{ padding: '5px' }}>
                <TopicFiles
                  fileCount={getResourceCount(item.id)}
                  topic={item}
                  handleClick={showResources}
                  isResourceShown={isResourceShown}
                />
              </div>
            </Fragment>
          );
        })}
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
