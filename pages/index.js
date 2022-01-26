import Head from 'next/head'
import Image from 'next/image'
import Link from "next/link";
import HomeSlider from '../components/HomeSlider'
import CardSlider from '../components/medium/CardSlider';
import SlickSlider from '../components/medium/SlickSlider';
import styles from '../styles/Home.module.css'

export default function Home() {
    return (
    <div style={{backgroundColor: 'var(--black)'}}>
      <HomeSlider />
      <CardSlider />
      {/* <SlickSlider /> */}
      {/* <EmblaCarousel slides={slides} /> */}
      {/* <h2>Learning NextJS</h2> */}
      {/* <Link href="/courses">
      <a>Courses</a>
      </Link> */}
      <Link href="/admin">
      <a style={{display:'flex', justifyContent: 'center', color: 'var(--primary)'}}><h2>Go to Admin Module</h2></a>
      </Link>
    </div>
  )
}
