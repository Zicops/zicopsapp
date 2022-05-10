import { useEffect } from "react";
import { bigImages, sliderImages } from '../API/DemoSliderData';
import CommonCalendar from '../components/common/CommonCalendar';
import SimpleTable from '../components/common/SimpleTable';
import FavouriteDndCourses from "../components/FavouriteDndCourses";
import BigCardSlider from '../components/medium/BigCardSlider';
import ZicopsCarousel from '../components/ZicopsCarousel';


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

    const tableData = {
      columnHeader: ['Course Name', 'End Date', 'Sub Category', 'Completion'],
      rowData: [
        ['Leom Ipsum Dolor', '21-3-2022', 'Java', '54%'],
        ['Leom Ipsum Dolor', '21-3-2022', 'Java', '54%'],
        ['Leom Ipsum Dolor', '21-3-2022', 'Java', '54%'],
        ['Leom Ipsum Dolor', '21-3-2022', 'Java', '54%'],
        ['Leom Ipsum Dolor', '21-3-2022', 'Java', '54%'],
        ['Leom Ipsum Dolor', '21-3-2022', 'Java', '54%'],
        ['Leom Ipsum Dolor', '21-3-2022', 'Java', '54%'],
        ['Leom Ipsum Dolor', '21-3-2022', 'Java', '54%'],
        ['Leom Ipsum Dolor', '21-3-2022', 'Java', '54%'],
        ['Leom Ipsum Dolor', '21-3-2022', 'Java', '54%']
      ]
  };
  
    useEffect(() => {

        console.log(screen.width)

    }, []);


    return (
      <div
        style={{
          backgroundColor: 'var(--tile-bg)',
          overflow: 'hidden',
          margin: 0,
          padding: 0
        }}>
        {/*<HeroSlider />*/}
        <FavouriteDndCourses />
        <ZicopsCarousel title="Subscribed Classroom Courses" data={sliderImages} />
        <ZicopsCarousel title="Recomended For You" data={sliderImages} />

        <div style={{ display: 'flex', padding: '70px 0', backgroundColor: 'var(--black)' }}>
          <div className="w-60 border_right">
            <SimpleTable
              tableData={tableData}
              tableHeight="70vh"
              tableHeading="Mandatory Courses"
            />
          </div>
          <div className="w-40 calender_box">
            <CommonCalendar />
          </div>
        </div>
        {/* <SelfPacedMiddle /> */}
        
        <ZicopsCarousel title="Trending" data={sliderImages} />
        <BigCardSlider title="Recomended Premier Courses" data={bigImages} slide={realSquare} />
        <ZicopsCarousel title="Live Events" data={sliderImages} />
        <ZicopsCarousel title="Your Attended Events" data={sliderImages} />
        <ZicopsCarousel title="Upcoming Events" data={sliderImages} />
        <ZicopsCarousel title="Live Events" data={sliderImages} />

        {/* <Link href="/courses">
      <a>Courses</a>
      </Link> */}
        {/* <Link href="/admin">
      <a style={{display:'flex', justifyContent: 'center', color: 'var(--primary)'}}><h2>Go to Admin Module</h2></a>
      </Link> */}
      </div>
    );
}
