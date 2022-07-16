import { useState } from 'react';
import { Skeleton } from '@mui/material';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import BigCard from '../small/SingleBigCard';
import CardSliderHeader from '../small/CardSliderHeader';
import {CustomLeftArrow, CustomRightArrow} from '../small/SliderArrows'

const BigCardSlider = ({deviceType, title, type, data, slide}) => {

    const [currentSlide, setCurrentSlide] = useState(0);  
    
    const [cardData, setCardData] = useState(new Array(6).fill(null));
    setTimeout(() => {
        setCardData(data);  
    }, 2000);
    return (
        <>
        <div className="cardCarosel" style={{
            marginLeft: '4%',
            marginRight: '4%',
            paddingTop: '10px'
        }}> 
            {cardData.every((d) => !d) ? (
            <Skeleton
                style={{ marginBottom: '10px' }}
                sx={{ bgcolor: 'dimgray' }}
                variant="text"
                width={350}
                height={40}
            />
            ) : (
            <CardSliderHeader title={title}/>
            )}
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
                {cardData.map((data, index) => {
                    if (!data)
                        return (
                            <Skeleton
                            key={index}
                            sx={{ bgcolor: 'dimgray', borderRadius: '5px' }}
                            variant="rectangular"
                            height={396}
                            />
                        );
                    
                return <BigCard key={index} image={data.img} />
                })}
                <div className="last-text-big">
                    See All
                </div>
            </Carousel>

                <style jsx>{`
                    .last-text-big{
                        padding: 48% 0;
                        color: var(--primary);
                        background-color: #003548;
                        border-radius: 8px;
                        text-align: center;
                        cursor: pointer;
                    }
                `}</style>
        </div>
        
        </>
    )
}

export default BigCardSlider