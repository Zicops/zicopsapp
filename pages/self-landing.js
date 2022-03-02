import Link from "next/link";
import React from "react";
import HeroSlider from '../components/HeroSlider'
import CardSlider from '../components/medium/CardSlider'
import BigCardSlider from '../components/medium/BigCardSlider'
import SelfPacedMiddle from '../components/large/SelfPacedMiddle'
import { sliderImages, bigImages, circleImages, squareImages } from '../API/DemoSliderData';

export default function Home() {

    React.useEffect(() => {

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
            <BigCardSlider title="Recomended Premier Courses" data={bigImages} />
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
