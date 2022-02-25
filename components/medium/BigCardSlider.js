import { useState } from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import BigCard from '../small/SingleBigCard';
import {CustomLeftArrow, CustomRightArrow} from '../small/SliderArrows'

const BigCardSlider = ({deviceType, title, type, data}) => {

    const [currentSlide, setCurrentSlide] = useState(0);

    const bigones = {
        all: {
            breakpoint: { max: 3000, min: 500 },
            items: 4,
            slidesToSlide: 4,
        }
    };
    
    // console.log(currentSlide);

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
                responsive={bigones}
                ssr={false} // means to render carousel on server-side.
                // centerMode={true}
                // partialVisibility={true}
                // infinite={true}
                customTransition="all 1s"
                transitionDuration={1000}
                deviceType={deviceType}
                sliderClass="carousel_track"
                containerClass="carousel_container_big"
                itemClass="card_ietms_big"
                removeArrowOnDeviceType={["tablet", "mobile"]}
                customLeftArrow={<CustomLeftArrow />}
                customRightArrow={<CustomRightArrow />}
                >
                {
                data.map( (data) => ( 
                    <BigCard image={data.img} />
                ))
                }
                <div className="last-text-big">
                    See All
                </div>
            </Carousel>

                <style jsx>{`
                    .last-text-big{
                        padding: 52% 0;
                        color: var(--primary);
                        background-color: #003548;
                        border-radius: 8px;
                        text-align: center;
                        cursor: pointer;
                    }
                    .slider_header{
                        margin-left: 0;
                        font-size: 20px;
                        padding-bottom: 10px;
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
                        font-weight: 700;
                        cursor: pointer;
                        font-size: 24px;
                    }
                    
                `}</style>
        </div>
        
        </>
    )
}

export default BigCardSlider