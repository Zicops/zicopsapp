import { useState, useEffect, useRef } from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CardSliderHeader from '../small/CardSliderHeader';
import Card from "../small/SingleCard";
import {CustomLeftArrow, CustomRightArrow} from '../small/SliderArrows'

const CardSlider = ({deviceType, title, type, data}) => {
    const [selectedCard, setSelectedCard] = useState(0);
    const [cardToDisplay, setCardToDisplay] = useState(0);

    const carouselRef = useRef(0)

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1530 },
            items: 6,
            slidesToSlide: 6
        },
        laptop: {
            breakpoint: { max: 1530, min: 1024 },
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
    
    
    useEffect(()=>{
        setCardToDisplay(carouselRef.current.state.slidesToShow);
        setSelectedCard(carouselRef.current.state.currentSlides)
        setTimeout( ()=>{
            // if ( document.getElementsByClassName('card-ietms').dataset.index  == cardToDisplay ){
            //     console.log('foundit')
            // }
            // console.log(cardToDisplay);
            // console.log(selectedCard);
        }, 50)
    }, [selectedCard])

    // const makeFirstLastHoverDifferent = ( nextSlide, { currentSlide, onMove }) => {        
        // alert(currentSlide)
        // document.querySelectorAll(".card-ietms").forEach
    //     let container = document.getElementsByClassName('carousel_container');
    //     let item = document.getElementsByClassName('card-ietms')  
        
    //     if (item.dataset.index === currentSlide){
    //         // console.log(container.html);
    //         alert('yes');
    //     }
    // }
    
    // console.log(currentSlide);
    // function Timer() {
    //     const [count, setCount] = useState(0);

    //     useEffect(() => {
    //         setTimeout(() => {
    //             setCount((count) => count + 1);
    //         }, 1000);
    //     });

    //     return <h4>I've rendered {count} times!</h4>;
    // }

    return (
        <>
        <div className="cardCarosel" style={{
            marginLeft: '4%',
            marginRight: '4%',
            paddingTop: '10px'
        }}> 
            <CardSliderHeader title={title}/>
            <Carousel 
                ref={carouselRef}
                // ref={ (el) => console.log(el)}
                // beforeChange={makeFirstLastHoverDifferent}
                swipeable={false}
                draggable={false}
                showDots={false}
                responsive={responsive}
                ssr={false} // means to render carousel on server-side.
                // centerMode={true}
                // partialVisibility={true}
                // infinite={true}
                customTransition="all 1s"
                autoPlay= {false}
                transitionDuration={1000}
                deviceType={deviceType}
                sliderClass="carousel_track"
                containerClass="carousel_container"
                itemClass="card_ietms"
                // removeArrowOnDeviceType={["tablet", "mobile"]}
                customLeftArrow={<CustomLeftArrow />}
                customRightArrow={<CustomRightArrow />}
                >
                {
                data.map( (data, index) => ( 
                    <Card key={index} image={data.img} />
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
                    .card_ietms[data-index='0']:hover {
                        margin-left: 60px!important;
                        margin-right: -60px!important;
                    }
                `}</style>
        </div>
        
        </>
    )
}

export default CardSlider