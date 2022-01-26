import Carousel from "react-multi-carousel";
import Script from 'next/script'
import "react-multi-carousel/lib/styles.css";
import Card from "../small/SingleCard";
import '../../styles/CardSlider.module.css'

const CardSlider = () => {
    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 5,
          slidesToSlide: 5, // optional, default to 1.
          partialVisibilityGutter: 50
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 3,
          slidesToSlide: 3, // optional, default to 1.
          partialVisibilityGutter: 20
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
          slidesToSlide: 1, // optional, default to 1.
          partialVisibilityGutter: 50
        }
      };
    const CustomRightArrow = ({ onClick, ...rest }) => {
        const {
            onMove,
            carouselState: { currentSlide, deviceType }
        } = rest;
        // onMove means if dragging or swiping in progress.
        return (
            <div>
                <div className="just" onClick={() => onClick()}>
                    <a className="chevron chevron-left"></a>
                </div>
                
                <style jsx>
                    {`
                    .just{
                        background: #000000;
                        background: linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.7) 70%, rgba(0,0,0,1) 100%);

                        width: 150px;
                        height: 180px;
                        position: absolute;
                        top:50%;
                        right: 0;
                        transform: translateY(-50%);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        cursor: pointer;
                    }
                    .chevron {
                        display: inline-block;
                        width: 15px;
                        height: 15px;
                        border: 0px solid #transparent;
                        position: relative;
                        margin-left: 50px;
                    }
                    .chevron::after {
                        content: '';
                        border-right: 10px solid var(--primary);
                        border-bottom: 10px solid var(--primary);
                        width: 100%;
                        height: 100%;
                        display: block;
                        position: absolute;
                        left: 0%;
                        top: 0%;
                    }
                    .chevron-left::after {
                        -webkit-transform: translate(-30%, -50%) rotate(-45deg);
                        -ms-transform: translate(-30%, -50%) rotate(-45deg);
                        -o-transform: translate(-30%, -50%) rotate(-45deg);
                        transform: translate(-30%, -50%) rotate(-45deg);
                    }

                    .just:hover .chevron:after{
                        content: '';
                        border-right: 10px solid #fff;
                        border-bottom: 10px solid #fff;
                        width: 100%;
                        height: 100%;
                        display: block;
                        position: absolute;
                        left: 0%;
                        top: 0%;

                        background: var(--transparent);
                        filter: drop-shadow(0 0 10px #FFF);
                        // box-shadow: 0 0 5px #FFF, 0 0 10px #FFF, 0 0 15px #FFF, 0 0 20px #49ff18, 0 0 30px #49FF18, 0 0 40px #49FF18, 0 0 55px #49FF18, 0 0 75px #49ff18;
                    }
                    .just img{
                        width: 25px;
                        height: 25px;
                        cursor: pointer;
                    }
                    .just:hover img{
                        width: 25px;
                        height: 25px;
                        color: #FFFFFF;
                        background: #232323;
                        box-shadow: 0 0 5px #FFF, 0 0 10px #FFF, 0 0 15px #FFF, 0 0 20px #49ff18, 0 0 30px #49FF18, 0 0 40px #49FF18, 0 0 55px #49FF18, 0 0 75px #49ff18;
                    }
                    `}
                </style>
            </div>


        );
    };
    const CustomLeftArrow = ({ onClick, ...rest }) => {
        const {
            onMove,
            carouselState: { currentSlide, deviceType }
        } = rest;
        // onMove means if dragging or swiping in progress.
        return (
            <div>
                <div className="left" onClick={() => onClick()} >
                    <img src="/images/bigarrowleft.png" />

                    {/* <a className="arrow1" onClick={() => onClick()}></a> */}
                </div>
                
                <style jsx>
                    {`
                    .left{

                        background: rgb(0,0,0);
                        background: linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.5) 70%, rgba(0,0,0,0) 100%);

                        width: 150px;
                        height: 180px;
                        position: absolute;
                        top:50%;
                        left: 0;
                        transform: translateY(-50%);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        cursor: pointer;
                    }
                    // .arrow1 {
                    //     background: var(--primary);
                    //     clip-path: polygon(100% 0%, 50% 50%, 100% 100%, 50% 100%, 0% 50%, 50% 0);

                    //     width: 25px;
                    //     height: 25px;
                        
                    // }
                    // .left:hover .arrow1{
                    //     background: var(--white);
                    //     clip-path: polygon(100% 0%, 50% 50%, 100% 100%, 50% 100%, 0% 50%, 50% 0);
                    //     box-shadow: 0 0 5px #FFF, 0 0 10px #FFF, 0 0 15px #FFF, 0 0 20px #49ff18, 0 0 30px #49FF18, 0 0 40px #49FF18, 0 0 55px #49FF18, 0 0 75px #49ff18;
                    // }
                    .left img{
                        width: 25px;
                        height: 25px;
                        cursor: pointer;
                        margin-left: -50px;
                    }
                    .left:hover img{
                        width: 25px;
                        height: 25px;
                        color: #FFFFFF;
                        filter: drop-shadow(0px 0px 10px #ffffff);
                        // background: #232323;
                        // box-shadow: 0 0 5px #FFF, 0 0 10px #FFF, 0 0 15px #FFF, 0 0 20px #49ff18, 0 0 30px #49FF18, 0 0 40px #49FF18, 0 0 55px #49FF18, 0 0 75px #49ff18;
                    }
                    `}
                </style>
            </div>


        );
    };

    <Script id="show-banner" strategy="lazyOnload">
    {`document.getElementsByClassName('carousel_container').style.height='500px'`}
    </Script>
    
    // ReactDOM.findDOMNode(this.refs["blabla"]).style.display='none'
    // let snapCount = React.Children.toArray(this.props.children).filter((item) => item.props.className === 'card_ietms').length;
    // console.log(snapCount);  
    return (
        <>
        <div className="CardCarosel"> 
        <div className="slider_header">
            <h5>Continue with your Courses</h5>
        </div>
        <Carousel
            swipeable={false}
            draggable={false}
            showDots={false}
            responsive={responsive}
            ssr={false} // means to render carousel on server-side.
            infinite={true}
            autoPlay= {false}
            autoPlaySpeed={5000}
            keyBoardControl={true}
            customTransition="all 1s"
            transitionDuration={1000}
            sliderClass="carousel_track"
            containerClass="carousel_container"
            itemClass="card_ietms"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            customLeftArrow={<CustomLeftArrow />}
            customRightArrow={<CustomRightArrow />}
            >
            <Card image="/images/courses/46.png" />
            <Card image="/images/courses/45.png" />
            <Card image="/images/courses/49.png" />
            <Card image="/images/courses/47.png" />
            <Card image="/images/courses/46.png" />

        </Carousel>
        </div>
        <style jsx>{`
            .slider_header{
                color: var(--primary);
                margin-left: 80px;;
            }
            .slider_header h5:hover:after{
                content:'>>';
                font-size: 14px;
                margin-left: 10px;
                transition: all 1s;
                opacity: 0.2;
            }
            .slider_header h5:hover:after{
                content:'>>';
                font-size: 14px;
                margin-left: 10px;
                transition: all 1s;
                opacity: 1;
            }
            .slider_header h5{
                font-weight: 900;
                font-size: 20px;
                cursor: pointer;
            }
            
        `}
        </style>
        </>
    )
}

export default CardSlider