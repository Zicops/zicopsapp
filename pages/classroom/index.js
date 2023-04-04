import ClassRoomBanner from '@/components/ClassRoomBanner';
import { classroomData } from '@/components/ClassRoomBanner/classRoomBanner.helper';
import { COURSE_TYPES } from '@/constants/course.constants';
import { getLatestCoursesByFilters, getUserAssignCourses } from '@/helper/data.helper';
import { useEffect, useState } from 'react';
import {
  bigImages,
  classroomSlider1,
  classroomSlider2,
  classroomSliderImages
} from '../../API/DemoSliderData';
import HeroSliderContainer from '../../components/HeroSliderContainer';
import ZicopsCarousel from '../../components/ZicopsCarousel';
import BigCardSlider from '../../components/medium/BigCardSlider';

const skeletonCardCount = 5;

const Classroom = () => {
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

  const [myCourses, setMyCourses] = useState([...Array(skeletonCardCount)]);
  const [latestCourses, setLatestCourses] = useState([...Array(skeletonCardCount)]);

  useEffect(async () => {
    const filters = { type: COURSE_TYPES.classroom };
    getUserAssignCourses(filters)
      .then((data) => setMyCourses(data))
      .catch(() => setMyCourses([]));

    getLatestCoursesByFilters({ Type: COURSE_TYPES.classroom }, 30)
      .then(({ latestCourses }) => setLatestCourses(latestCourses?.courses))
      .catch(() => setLatestCourses([]));
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
          <ClassRoomBanner data={item} />
        ))}
      </HeroSliderContainer>
      {!!myCourses?.length && <ZicopsCarousel title="My Classroom Courses" data={myCourses} />}
      {!!latestCourses?.length && <ZicopsCarousel title="Classroom Courses" data={latestCourses} />}

      <ZicopsCarousel title="Subscribed Classroom Courses" data={classroomSlider1} />
      <ZicopsCarousel title="Recomended For You" data={classroomSlider2} />

      {/* <div style={{ display: 'flex', padding: '70px 0', backgroundColor: 'var(--black)' }}>
        <div className="w-60 border_right">
          <SimpleTable tableData={tableData} tableHeight="70vh" tableHeading="Mandatory Courses" />
        </div>
        <div className="w-40 calender_box">
          <CommonCalendar />
        </div>
      </div> */}
      {/* <SelfPacedMiddle /> */}

      <ZicopsCarousel title="Trending" data={classroomSliderImages} />
      <BigCardSlider title="Recomended Premier Courses" data={bigImages} slide={realSquare} />
      {/* <ZicopsCarousel title="Live Events" data={sliderImages} />
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

export default Classroom;
