import { useState } from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import BigCard, { OneCard } from '../small/SingleBigCard';
import CardSliderHeader from '../small/CardSliderHeader';
import {CustomLeftArrow, CustomRightArrow} from '../small/SliderArrows'
import { getHeight } from 'react-slick/lib/utils/innerSliderUtils';
import { NonceProvider } from 'react-select';

const OneCardSlider = ({deviceType, title, type, data, slide}) => {

    const [currentSlide, setCurrentSlide] = useState(0);  
    
    // console.log(currentSlide);

    return (
        <>
        <div className="cardCarosel" style={{
            marginLeft: '4%',
            marginRight: '4%',
            paddingTop: '10px',
        }}> 
            <CardSliderHeader title={title}/>
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
                removeArrowOnDeviceType={["tablet", "mobile"]}
                customLeftArrow={<CustomLeftArrow />}
                customRightArrow={<CustomRightArrow />}
                >
                {
                data.map( (data, index) => ( 
                    <OneCard key={index} image={data.img} />
                ))
                }
                <div className="last-text-big">
                    See All
                </div>
            </Carousel>

                <style jsx>{`
                    .last-text-big{
                        padding: 5.75% 0;
                        color: var(--primary);
                        background-color: #003548;
                        border-radius: 8px;
                        text-align: center;
                        cursor: pointer;
                        font-size: 22px;
                    }
                `}</style>
        </div>
        
        </>
    )
}

export default OneCardSlider