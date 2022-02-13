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


    return (
      <>
        <div className="carousel">        
        <Carousel
            swipeable={false}
            draggable={false}
            showDots={false}
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
            itemClass="carousel-item-padding-40-px"
        >
        <div><img src="images/IMG-20220113-WA0020.jpg" alt=""/></div>
        <div><img src="images/IMG-20220113-WA0018.jpg" alt=""/></div>
        </Carousel>
        </div>
        <div className="dropup" style={{
          background: '#000000',
          background: 'linear-gradient(180deg, #00000000 0%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.9) 100%)',
          height: '20px',
          padding: 0,
          marginTop: '-45px',
          marginBottom: '40px',
          position: "relative",
          zIndex: '2',
          opacity: '0.3'
        }}></div>
      </>
    )
}

export default HomeSlider