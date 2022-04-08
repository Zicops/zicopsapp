import Link from 'next/link';
import React, { useContext } from 'react';
import HomeSlider from '../components/HomeSlider';
import CardSlider from '../components/medium/CardSlider';
import BigCardSlider from '../components/medium/BigCardSlider';
import OneCardSlider from '../components/medium/OneCardSlider';
import RoundCardSlider from '../components/medium/RoundCardSlider';
import { sliderImages, bigImages, circleImages, squareImages } from '../API/DemoSliderData';
import { userContext } from '../state/contexts/UserContext';
import { useRouter } from 'next/router';

export default function Home() {
  const { isAdmin } = useContext(userContext);
  const router = useRouter();

  React.useEffect(() => {
    console.log(screen.width);
    router.push(isAdmin ? '/admin' : '/');
  }, []);

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
    }
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
  return (
    <div
      style={{
        backgroundColor: 'var(--tile-bg)',
        overflow: 'hidden',
        margin: 0,
        padding: 0
      }}>
      <HomeSlider />

      <CardSlider title="Continue with your Courses" data={sliderImages} />
      <CardSlider title="Recommended Courses" data={sliderImages} />

      <BigCardSlider title="Courses mandatory for you" data={squareImages} slide={realSquare} />

      <CardSlider title="New Launched Courses" data={sliderImages} />
      <CardSlider title="Most Popular Courses in Zicops" data={sliderImages} />
      <CardSlider title="Suggested Learning paths" data={sliderImages} />

      <BigCardSlider title="Categories and Subcategories" data={squareImages} slide={smallSquare} />
      <div style={{ marginTop: '-60px' }}>
        <BigCardSlider title="" data={circleImages} slide={smallSquare} />
      </div>
      <CardSlider title="Full Stack Development" data={sliderImages} />
      <CardSlider title="Full Stack Development" data={sliderImages} />
      <OneCardSlider title="Featured Events" data={sliderImages} slide={one} />
      <CardSlider title="Full Stack Development" data={sliderImages} />
      <CardSlider title="Full Stack Development" data={sliderImages} />
      <CardSlider title="Full Stack Development" data={sliderImages} />

      <RoundCardSlider title="Upcoming Webinars & Podcasts" data={circleImages} />

      <CardSlider title="Available Webinars" data={sliderImages} />
      <CardSlider title="Cloud Computing" data={sliderImages} />
      <CardSlider title="Ettiquettes" data={sliderImages} />

      <BigCardSlider title="Categories" data={bigImages} slide={bigSquare} />

      <CardSlider title="Distance Learning" data={sliderImages} />
      <CardSlider title="Cloud Certification Courses" data={sliderImages} />
      <CardSlider title="Distance Learning" data={sliderImages} />
      <CardSlider title="Cloud Certification Courses" data={sliderImages} />
      {/* <Link href="/courses">
      <a>Courses</a>
      </Link> */}
      {/* <Link href="/admin">
      <a style={{display:'flex', justifyContent: 'center', color: 'var(--primary)'}}><h2>Go to Admin Module</h2></a>
      </Link> */}
    </div>
  );
}
