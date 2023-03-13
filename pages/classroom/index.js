import { useEffect, useState } from 'react';
import { bigImages, classroomSlider1, classroomSlider2, sliderImages } from '../../API/DemoSliderData';
import CommonCalendar from '../../components/common/CommonCalendar';
import { useRouter } from 'next/router';
import Options from '../../components/Exams/Options';
import SimpleTable from '../../components/common/SimpleTable';
import HeroSliderContainer from '../../components/HeroSliderContainer';
import FavouriteDndCourses from '../../components/FavouriteDndCourses';
import BigCardSlider from '../../components/medium/BigCardSlider';
import ZicopsCarousel from '../../components/ZicopsCarousel';
import {classroomData} from '@/components/ClassRoomBanner/classRoomBanner.helper';
import ClassRoomBanner from '@/components/ClassRoomBanner';


const Classroom = () => {
  const router = useRouter();
  const buttonObj = {
    style: { margin: '0px 10px', padding: '2px 10px', border: '1px solid var(--primary)' }
  };
  const [showTable, setShowTable] = useState(false);

  const btnOptions = [
    { name: 'Schedule Exams', isActive: false },
    {
      name: 'Take Anytime Exams',
      handleClick: () => setShowTable(!showTable),
      isActive: showTable
    },
    {
      name: 'Open Available Exams',
      handleClick: () => router.push('/exam-screen'),
      isActive: false
    },
    { name: 'Completed Exams', isActive: false }
  ];
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

  const tableData = {
    columnHeader: ['Course Name', 'End Date', 'Sub Category', 'Completion'],
    rowData: [
      ['Basics of Powerpoint', '21-3-2023', 'CDAC', '74%'],
      ['Git and GitHub Bootcamp', '04-4-2023', 'DevOps', '23%'],
      ['CSS Introduction', '13-4-2023', 'HTML', '43%'],
      ['Networking Fundamentals', '22-4-2023', 'Java', '54%'],
      ['Intro to AI', '17-5-2023', 'Python', '67%'],
      ['Artificaial Intelligence', '15-6-2023', 'Python', '11%'],
      ['Machine Learning 101', '15-6-2023', 'Machine Learning', '0%'],
      ['Java For Testers', '30-7-2023', 'Java', '0%'],
      ['AWS Certified Solution Architect', '29-8-2023', 'AWS', '0%'],
      ['Technology of Large Scale Systems', '20-8-2023', 'Java', '4%']
    ]
  };

  const imageLink = [
    'images/pocket-watch-g4b6aee647_1920.jpg',
    'images/universe-gd6be558e6_1920.jpg',
    'images/TopSectioncopy.png',
    'images/bg-new.png'
  ];

  useEffect(() => {
    console.log(screen.width);
  }, []);

  return (
    <div
      style={{
        backgroundColor: 'var(--tile-bg)',
        overflow: 'hidden',
        margin: 0,
        padding: '0 0 0 0'
      }}>
      <HeroSliderContainer>
        {classroomData.map((item) => (
          <ClassRoomBanner data={item}/>
        ))}
        {/* {imageLink.map((item) => (
          <img src={item} alt="" />
        ))} */}
      </HeroSliderContainer>
      <ZicopsCarousel title="Subscribed Classroom Courses" data={classroomSlider1} />
      <ZicopsCarousel title="Recomended For You" data={classroomSlider2} />

      <div style={{ display: 'flex', padding: '70px 0', backgroundColor: 'var(--black)' }}>
        <div className="w-60 border_right">
          <SimpleTable tableData={tableData} tableHeight="70vh" tableHeading="Mandatory Courses" />
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
};

export default Classroom;
