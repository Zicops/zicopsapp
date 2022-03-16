import Link from "next/link";
import { useEffect } from "react";
import HeroSlider from '../components/HeroSlider'
import CardSlider from '../components/medium/CardSlider'
import BigCardSlider from '../components/medium/BigCardSlider'
import SelfPacedMiddle from '../components/large/SelfPacedMiddle'
import { sliderImages, bigImages, circleImages, squareImages } from '../API/DemoSliderData';

export default function Self() {

    const realSquare = {
        desktop: {
          breakpoint: { max: 3000, min: 1530 },
          items: 4,
          slidesToSlide: 1
        },
        laptop: {
          breakpoint: { max: 1530, min: 1024 },
          items: 4,
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
      const smallSquare = {
        desktop: {
          breakpoint: { max: 3000, min: 1530 },
          items: 10,
          slidesToSlide: 1
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
      const one = {
        all: {
          breakpoint: { max: 3000, min: 1530 },
          items: 1,
          slidesToSlide: 1
        },
      };
      const bigSquare = {
        desktop: {
          breakpoint: { max: 3000, min: 1530 },
          items: 4,
          slidesToSlide: 1
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

    useEffect(() => {

        console.log(screen.width)

    }, []);

    return (
        <div style={{
            backgroundColor: 'var(--tile-bg)',
            overflow: 'hidden',
            margin: 0,
            padding: 0
        }}>
            <HeroSlider />
            <CardSlider title="Subscribed Classroom Courses" data={sliderImages} />
            <CardSlider title="Recomended For You" data={sliderImages} />

            <SelfPacedMiddle />

            <CardSlider title="Trending" data={sliderImages} />
            <BigCardSlider title="Recomended Premier Courses" data={bigImages} slide={realSquare}/>
            <CardSlider title="Live Events" data={sliderImages} />
            <CardSlider title="Your Attended Events" data={sliderImages} />
            <CardSlider title="Upcoming Events" data={sliderImages} />
            <CardSlider title="Live Events" data={sliderImages} />

            {/* <Link href="/courses">
      <a>Courses</a>
      </Link> */}
            {/* <Link href="/admin">
      <a style={{display:'flex', justifyContent: 'center', color: 'var(--primary)'}}><h2>Go to Admin Module</h2></a>
      </Link> */}
        </div>
    )
}
