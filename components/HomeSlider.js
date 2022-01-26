import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styles from '../styles/HomeSlider.module.css'



const HomeSlider = () => {
    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 1,
          slidesToSlide: 1 // optional, default to 1.
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2,
          slidesToSlide: 2 // optional, default to 1.
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
          slidesToSlide: 1 // optional, default to 1.
        }
      };


    var carouselItems = ['<div><img src="images/IMG-20220113-WA0020.jpg" alt=""/></div>', '<div><img src="images/IMG-20220113-WA0018.jpg" alt=""/></div>'];


    return (
        <div className={styles.carousel}>
             {/* <img src="images/IMG-20220113-WA0020.jpg" alt=""/>
             <img src="images/IMG-20220113-WA0018.jpg" alt=""/> */}
        
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
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
            deviceType="Laptop"
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
        >
        <div><img src="images/IMG-20220113-WA0020.jpg" alt=""/></div>
        <div><img src="images/IMG-20220113-WA0018.jpg" alt=""/></div>
        </Carousel>
        </div>
    )
}

export default HomeSlider