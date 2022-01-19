import Head from 'next/head'
import Image from 'next/image'
import Link from "next/link";
import HomeSlider from '../components/HomeSlider'
// import EmblaCarousel from '../components/EmblaCarousel';
import styles from '../styles/Home.module.css'

export default function Home() {
  
// const SLIDE_COUNT = 7;
// const slides = Array.from(Array(SLIDE_COUNT).keys());
// const slides = ['images/courses/47.png', 'images/courses/46.png', 'images/courses/27.png', 'images/courses/30.png', 'images/courses/45.png'];
  return (
    <div>
      <HomeSlider/>
      {/* <EmblaCarousel slides={slides} /> */}
      {/* <h2>Learning NextJS</h2> */}
      {/* <Link href="/courses">
      <a>Courses</a>
      </Link> */}
      <Link href="/admin">
      <a style={{display:'flex', justifyContent: 'center'}}><h2>Go to Admin Module</h2></a>
      </Link>
    </div>
  )
}
