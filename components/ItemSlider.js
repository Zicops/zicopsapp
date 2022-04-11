import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import TopicFiles from './slComponents/TopicFiles';

const ItemSlider = ({items}) => {
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
    let n = 9;
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
          itemClass="">
          {/* {items.map( (e,i)=><div className="item">{e.label}</div>)} */}
          {[...Array(n)].map((e, i) => (
            <div className="item" key={i}>
              <TopicFiles prop={i + 1} />
              <TopicFiles prop={i + 1} />
            </div>
          ))}
        </Carousel>
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

export default ItemSlider