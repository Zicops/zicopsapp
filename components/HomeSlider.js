import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const HomeSlider = () => {
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

    const CustomDot = ({ onMove, index, onClick, active }) => {
      // onMove means if dragging or swiping in progress.
      // active is provided by this lib for checking if the item is active or not.
      return (
        <li data-index={index}
          className={active ? "react-multi-carousel-dot react-multi-carousel-dot--active" : "react-multi-carousel-dot"}
          onClick={() => onClick()}
        >
            <button ></button> 
        </li>
      );
    };

    return (
      <>
        <div className="carousel">        
        <Carousel
            swipeable={false}
            draggable={false}
            showDots={true}
            responsive={responsive}
            ssr={false} // means to render carousel on server-side.
            infinite={true}
            autoPlay= {true}
            autoPlaySpeed={5000}
            keyBoardControl={true}
            customTransition="all 1s"
            transitionDuration={1000}
            containerClass="header-carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
            deviceType="Laptop"
            dotListClass="custom-dot-list-style"
            customDot={<CustomDot />}
            itemClass="carousel-item-padding-40-px"
        >
        <div className="zicops-slider"><img src="images/homePageBanner/Frame_1.png" alt=""/></div>
        <div className="zicops-slider"><img src="images/homePageBanner/Frame_2.png" alt=""/></div>
        <div className="zicops-slider"><img src="images/homePageBanner/Frame_3.png" alt=""/></div>
        <div className="zicops-slider"><img src="images/homePageBanner/Frame_4.png" alt=""/></div>
        </Carousel>
        </div>
        <div className="dropup" style={{
          background: '#000000',
          background: 'linear-gradient(180deg, #00000000 0%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.9) 100%)',
          height: '21px',
          padding: 0,
          marginTop: '-45px',
          marginBottom: '5px',
          position: "relative",
          zIndex: '2',
          opacity: '0.3'
        }}></div>
        <style jsx>
          {`
          .zicops-slider{
            //height: 300px;
            position: "relative",
            z-index: '1',
          }
          // .zicops-slider:after{
          //   height: 20px;
          //   width: 100%;
          //   color: white;
          //   background-color: blue;
          //   box-shadow: 0px 6px 8px -3px rgba(255, 255, 255, 0.75), 0px -6px 8px -3px rgba(255, 255, 255, 0.75);
          //   position: "relative",
          //   z-index: '2',
          // }
          `}
        </style>
      </>
    )
}

export default HomeSlider