import { useState } from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Card from '../small/SingleCard'
import {CustomLeftArrow, CustomRightArrow} from '../small/SliderArrows'

const RoundCardSlider = ({deviceType, title, type, data}) => {

    const [currentSlide, setCurrentSlide] = useState(0);

    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
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
    const circles = {
        all: {
            breakpoint: { max: 3000, min: 500 },
            items: 3,
            slidesToSlide: 1,
        }
    };




    return (
        <>
        <div className="cardCarosel" style={{
            marginLeft: '4%',
            marginRight: '4%',
            paddingTop: '10px'
        }}> 
            <div className="slider_header">
                <span>{title}</span>
            </div>
            <Carousel 
                swipeable={false}
                draggable={false}
                showDots={false}
                responsive={circles}
                ssr={false} // means to render carousel on server-side.
                customTransition="all 1s"
                transitionDuration={1000}
                deviceType={deviceType}
                sliderClass="carousel_track"
                containerClass="carousel_container_round"
                itemClass="card_ietms_round"
                removeArrowOnDeviceType={["tablet", "mobile"]}
                customLeftArrow={<CustomLeftArrow />}
                customRightArrow={<CustomRightArrow />}
                >
                {
                data.map( (data) => ( 
                    <Card image={data.img} />
                ))
                }
                <div className="last-round">
                    View All
                </div>
            </Carousel>

                <style jsx>{`
                    .last-round{
                        padding: 48% 0;
                        border-radius: 50%!important;
                        color: var(--primary);
                        background-color: #355577;
                        border-radius: 8px;
                        text-align: center;
                        cursor: pointer;
                    }
                    .slider_header{
                        margin-left: 0;
                        font-size: 20px;
                        // text-transform: uppercase;
                    }
                    .slider_header span:after{
                        content:'  View all >>';
                        margin-left: -10px;
                        transition: all 0.3s;
                        opacity: 0;
                        font-size: 10px;
                        color: var(--primary);
                    }
                    .slider_header span:hover:after{
                        margin-left: 10px;
                        opacity: 1;
                    }
                    .slider_header span{
                        color: var(--white);
                        font-weight: 900;
                        cursor: pointer;
                    }
                    
                `}</style>
        </div>
        
        </>
    )
}

export default RoundCardSlider