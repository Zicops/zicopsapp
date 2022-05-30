import { Fragment } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useRecoilValue } from 'recoil';
import { ResourcesAtom } from '../../../state/atoms/module.atoms';
import { getResourceCount } from '../Logic/courseBody.helper';
import TopicFiles from './TopicFiles';
import CustomButtonGroup from './CustomButtonGroup';

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
  const resources = useRecoilValue(ResourcesAtom);

  return (
    <div style={{ position: 'relative' }}>
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
        // removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
        deviceType="Laptop"
        dotListClass=""
        // customDot={<CustomDot />}
        renderButtonGroupOutside={true}
        arrows={false}
        customButtonGroup={<CustomButtonGroup />}
        itemClass="">
        {itemsArr.map((item, i) => {
          if (i + 1 == itemsArr.length) {
            return (
              <>
                {prevItem && (
                  <div style={{ padding: '5px' }}>
                    <TopicFiles
                      fileCount={getResourceCount(resources, prevItem?.id)}
                      topic={prevItem}
                      handleClick={showResources}
                      isResourceShown={isResourceShown}
                    />
                  </div>
                )}
                <div style={{ padding: '5px' }}>
                  <TopicFiles
                    fileCount={getResourceCount(resources, item?.id)}
                    topic={item}
                    handleClick={showResources}
                    isResourceShown={isResourceShown}
                  />
                </div>
              </>
            );
          }
          if (i % 2 == 0) {
            prevItem = item;
            return null;
          }

          // console.log(i, prevItem, item);

          return (
            <Fragment key={item.id + i + prevItem?.id}>
              <div style={{ padding: '5px' }}>
                <TopicFiles
                  fileCount={getResourceCount(resources, prevItem.id)}
                  topic={prevItem}
                  handleClick={showResources}
                  isResourceShown={isResourceShown}
                />
              </div>
              <div style={{ padding: '5px' }}>
                <TopicFiles
                  fileCount={getResourceCount(resources, item.id)}
                  topic={item}
                  handleClick={showResources}
                  isResourceShown={isResourceShown}
                />
              </div>
              {/* reset prevItem */}
              {(prevItem = null)}
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
    </div>
  );
}
