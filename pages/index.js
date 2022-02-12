import Link from "next/link";
import HomeSlider from '../components/HomeSlider'
import CardSlider from '../components/medium/CardSlider'
import BigCardSlider from '../components/medium/BigCardSlider'
import RoundCardSlider from '../components/medium/RoundCardSlider'
import {sliderImages, bigImages, circleImages, squareImages} from '../API/DemoSliderData';

export default function Home() {
    return (
      <div style={{
        backgroundColor: 'var(--tile-bg)',
        overflow: 'hidden',
        margin: 0,
        padding: 0
        }}>
      <HomeSlider />
      <CardSlider title="Continue with your Courses" data={sliderImages}/>
      <CardSlider title="Recomended Courses" data={sliderImages}/>

      <BigCardSlider title="Courses Mapped to you" data={squareImages}/>

      <CardSlider title="New Launched Courses" data={sliderImages}/>
      <CardSlider title="Most Popular Courses in Zicops" data={sliderImages}/>
      <CardSlider title="Suggested Learning paths" data={sliderImages}/>
      <CardSlider title="Full Stack Development" data={sliderImages}/>

      <RoundCardSlider title="Upcoming Webinars & Podcasts" data={circleImages}/>

      <CardSlider title="Available Webinars" data={sliderImages}/>
      <CardSlider title="Cloud Computing" data={sliderImages}/>
      <CardSlider title="Ettiquettes" data={sliderImages}/>

      <BigCardSlider title="Categories" data={bigImages}/>

      <CardSlider title="Distance Learning" data={sliderImages}/>
      <CardSlider title="Cloud Certification Courses" data={sliderImages}/>
      {/* <Link href="/courses">
      <a>Courses</a>
      </Link> */}
      {/* <Link href="/admin">
      <a style={{display:'flex', justifyContent: 'center', color: 'var(--primary)'}}><h2>Go to Admin Module</h2></a>
      </Link> */}
    </div>
  )
}
