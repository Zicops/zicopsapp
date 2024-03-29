import { useEffect, useState } from 'react';
import { bigImages, eventSlider1, eventSlider2, eventSliderImages, sliderImages } from '../../API/DemoSliderData';
import CommonCalendar from '../../components/common/CommonCalendar';
import { useRouter } from 'next/router';
import Options from '../../components/Exams/Options';
import SimpleTable from '../../components/common/SimpleTable';
import HeroSliderContainer from '../../components/HeroSliderContainer';
import FavouriteDndCourses from '../../components/FavouriteDndCourses';
import BigCardSlider from '../../components/medium/BigCardSlider';
import ZicopsCarousel from '../../components/ZicopsCarousel';
import EventGrid from '@/components/EventGrid';
import { eventData } from '@/components/ClassRoomBanner/eventBanner.helper';
import ClassRoomBanner from '@/components/ClassRoomBanner';

const Events = () => {
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
        overflow: 'clip',
        margin: 0,
        padding: '0 0 20px 0'
      }}>
      {/* <EventGrid /> */}
      <HeroSliderContainer>
        {eventData.map((item) => (
          <ClassRoomBanner data={item} />
        ))}
      </HeroSliderContainer>
      <ZicopsCarousel title="Currently Live Events" data={eventSlider1} />
      <ZicopsCarousel title="Your Registered Events" data={eventSlider2} />

      {/* <div style={{ display: 'flex', padding: '70px 0', backgroundColor: 'var(--black)' }}>
        <div className="w-60 border_right">
          <SimpleTable tableData={tableData} tableHeight="70vh" tableHeading="Mandatory Courses" />
        </div>
        <div className="w-40 calender_box">
          <CommonCalendar />
        </div>
      </div> */}
      {/* <SelfPacedMiddle /> */}

      <ZicopsCarousel title="Events From Your Organization" data={eventSliderImages} />
      {/* <BigCardSlider title="Recomended Premier Courses" data={bigImages} slide={realSquare} />
      <ZicopsCarousel title="Live Events" data={sliderImages} />
      <ZicopsCarousel title="Your Attended Events" data={sliderImages} />
      <ZicopsCarousel title="Upcoming Events" data={sliderImages} />
      <ZicopsCarousel title="Live Events" data={sliderImages} /> */}

      {/* <Link href="/courses">
      <a>Courses</a>
      </Link> */}
      {/* <Link href="/admin">
      <a style={{display:'flex', justifyContent: 'center', color: 'var(--primary)'}}><h2>Go to Admin Module</h2></a>
      </Link> */}
    </div>
  );
};

export default Events;
