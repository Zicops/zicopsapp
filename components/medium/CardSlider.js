import { useState } from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Card from "../small/SingleCard";
import {CustomLeftArrow, CustomRightArrow} from '../small/SliderArrows'

const CardSlider = ({deviceType, title, type, data}) => {

    const [currentSlide, setCurrentSlide] = useState(0);

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1920 },
            items: 6,
            slidesToSlide: 6
          },
        laptop: {
          breakpoint: { max: 1920, min: 1024 },
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
            slidesToSlide: 3,
        }
    };
    const bigones = {
        all: {
            breakpoint: { max: 3000, min: 500 },
            items: 3,
            slidesToSlide: 3,
        }
    };


    const makeFirstLastHoverDifferent = ( nextSlide, { currentSlide, onMove }) => {        
        // alert(currentSlide)
    //     let container = document.getElementsByClassName('carousel_container');
    //     let item = document.getElementsByClassName('card-ietms')  
        
    //     if (item.dataset.index === currentSlide){
    //         // console.log(container.html);
    //         alert('yes');
    //     }
    }
    
    // console.log(currentSlide);

    return (
        <>
        <div className="cardCarosel" style={{
            marginLeft: '4%',
            marginRight: '4%',
            paddingTop: '10px'
        }}> 
            {(title) && 
            <div className="slider_header">
                <span>{title}</span>
            </div>}
            <Carousel 
                ref={el => {

                    if (el) {

                        var slidesToShow = el.state.slidesToShow
                        var currentSlide = el.state.currentSlide

                        setCurrentSlide(slidesToShow + currentSlide)
                    }
                }}
                beforeChange={makeFirstLastHoverDifferent}
                swipeable={false}
                draggable={false}
                showDots={false}
                responsive={responsive}
                ssr={false} // means to render carousel on server-side.
                // centerMode={true}
                // partialVisibility={true}
                // infinite={true}
                customTransition="all 1s"
                transitionDuration={1000}
                deviceType={deviceType}
                sliderClass="carousel_track"
                containerClass="carousel_container"
                itemClass="card_ietms"
                removeArrowOnDeviceType={["tablet", "mobile"]}
                customLeftArrow={<CustomLeftArrow />}
                customRightArrow={<CustomRightArrow />}
                >
                {
                data.map( (data) => ( 
                    <Card image={data.img} />
                ))
                }
                <div className="last-text">
                    See All
                </div>
            </Carousel>

                <style jsx>{`
                    .last-text{
                        padding: 24% 0;
                        color: var(--primary);
                        background-color: #868686;
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

export default CardSlider