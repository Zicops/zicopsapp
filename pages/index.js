import { userClient } from '@/api/UserMutations';
import { GET_USER_COURSE_MAPS, GET_USER_COURSE_PROGRESS } from '@/api/UserQueries';
import { loadQueryDataAsync } from '@/helper/api.helper';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { UserStateAtom } from '@/state/atoms/users.atom';

import useUserCourseData from '@/helper/hooks.helper';
import { getUserData } from '@/helper/loggeduser.helper';

import { useLazyQuery } from '@apollo/client';
import { Skeleton } from '@mui/material';
import moment from 'moment';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { bigImages, circleImages, sliderImages, squareImages } from '../API/DemoSliderData';
import { GET_COURSE, GET_LATEST_COURSES, queryClient } from '../API/Queries';
import HomeSlider from '../components/HomeSlider';
import BigCardSlider from '../components/medium/BigCardSlider';
import CardSlider from '../components/medium/CardSlider';
import OneCardSlider from '../components/medium/OneCardSlider';
import RoundCardSlider from '../components/medium/RoundCardSlider';
import ZicopsCarousel from '../components/ZicopsCarousel';
import SmallCard from '../components/ZicopsCarousel/SmallCard';
import { isLoadingAtom } from '../state/atoms/module.atoms';
import { userContext } from '../state/contexts/UserContext';
import { LANGUAGES } from '@/helper/constants.helper';

export default function Home() {
  const { isAdmin } = useContext(userContext);
  const router = useRouter();
  const { getUserCourseProgress } = useUserCourseData();

  React.useEffect(() => {
    console.log(screen.width);
  }, []);

  //added user courseProgress in index.js
  useEffect(async()=>{
   const {id} = getUserData();
   const userCourseProgress = await getUserCourseProgress(id);
   console.log(userCourseProgress,'at pages/index.js') ;
  },[])

  const realSquare = {
    desktop: {
      breakpoint: { max: 3000, min: 1530 },
      items: 5,
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

  // load data query obj
  const [latestCourseData, setLatestCourseData] = useState(new Array(28).fill(null));
  const [isLoading, setIsLoading] = useRecoilState(isLoadingAtom);
  const [userData, setUserData] = useRecoilState(UserStateAtom);
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);
  const [onGoingCourses, setOnGoingCourses] = useState([]);
  const [addedCourses, setAddedCourses] = useState([]);
  const [assignedCourses, setAssignedCourses] = useState([]);
  // const [loading, setLoading] = useState(true);
  const [loadCourseData, { error, loading, refetch }] = useLazyQuery(GET_LATEST_COURSES, {
    client: queryClient
  });

  useEffect(() => {
    setIsLoading(loading);

    loadCourseData({
      variables: {
        publish_time: Date.now(),
        pageSize: 28,
        pageCursor: ''
      }
    }).then(({ data }) => {
      // console.log(data);
      setLatestCourseData(
        data?.latestCourses?.courses?.filter((c) => c?.is_active && c?.is_display) || []
      );

      if (error) alert('Course Load Error');
    });

    loadAssignedCourseData();
  }, []);

  useEffect(() => {
    console.log(
      'ongoing', onGoingCourses,
      'added', addedCourses,
      'assigned', assignedCourses,
      'user', userData
    );
  }, [onGoingCourses, addedCourses, assignedCourses]);

  // for user courses
  async function loadAssignedCourseData() {
    const currentUserId = userData?.id;
    if (!currentUserId) return;
    const assignedCoursesRes = await loadQueryDataAsync(
      GET_USER_COURSE_MAPS,
      {
        user_id: currentUserId,
        publish_time: Math.floor(Date.now() / 1000),
        pageCursor: '',
        pageSize: 9999999
      },
      {},
      userClient
    );

    console.log('Function called',currentUserId, assignedCoursesRes);
    if (assignedCoursesRes?.error)
      return setToastMsg({ type: 'danger', message: 'Course Maps Load Error' });
    const assignedCoursesToUser = assignedCoursesRes?.getUserCourseMaps?.user_courses;

    const allAssignedCourses = [];
    for (let i = 0; i < assignedCoursesToUser.length; i++) {
      const courseMap = assignedCoursesToUser[i];
      const mapId = courseMap?.user_course_id;
      const course_id = courseMap?.course_id;

      const courseProgressRes = await loadQueryDataAsync(
        GET_USER_COURSE_PROGRESS,
        { userId: currentUserId, userCourseId: mapId },
        {},
        userClient
      );

      if (courseProgressRes?.error) {
        setToastMsg({ type: 'danger', message: 'Course Progress Load Error' });
        continue;
      }
      const userProgressArr = courseProgressRes?.getUserCourseProgressByMapId;

      // if (!userProgressArr?.length) continue;

      let topicsStarted = 0;
      userProgressArr?.map((topic) => {
        if (topic?.status !== 'not-started') ++topicsStarted;
      });
      console.log(topicsStarted);
      const courseProgress = userProgressArr?.length
        ? Math.floor((topicsStarted * 100) / userProgressArr?.length)
        : 0;

      const courseRes = await loadQueryDataAsync(GET_COURSE, { course_id: course_id });
      if (courseRes?.error) {
        setToastMsg({ type: 'danger', message: 'Course Load Error' });
        continue;
      }

      const added_by = JSON.parse(assignedCoursesToUser[i]?.added_by);
      allAssignedCourses.push({
        ...courseRes?.getCourse,
        completedPercentage: userProgressArr?.length ? courseProgress : '0',
        added_by: added_by?.role,
        created_at: moment.unix(assignedCoursesToUser[i]?.created_at).format('DD/MM/YYYY'),
        expected_completion: moment.unix(assignedCoursesToUser[i]?.end_date).format('DD/MM/YYYY')
      });
    }

    const userCourses = allAssignedCourses.filter(
      (v, i, a) => a.findIndex((v2) => v2?.id === v?.id) === i
    );

    if (allAssignedCourses?.length) {
      setCourseState(userCourses, 'completedPercentage', 100, setOnGoingCourses, 'not');
      // setCourseState(userCourses, 'completedPercentage', 100, setCompletedCourses);
      setCourseState(userCourses, 'added_by', 'self', setAddedCourses);
      setCourseState(userCourses, 'added_by', 'self', setAssignedCourses, 'not');
      // const completedCourses = userCourses.filter((item) => item?.completedPercentage === 100);
      // if (completedCourses?.length) setCompletedCourses([...completedCourses], setLoading(false));
      // const assignedToSelf = userCourses.filter((item) => item?.added_by === 'self');
      // if (assignedToSelf?.length) setAddedCourses([...assignedToSelf], setLoading(false));
      // const assignedByAdmin = userCourses.filter((item) => item?.added_by !== 'self');
      // if (assignedByAdmin?.length) setAssignedCourses([...assignedByAdmin], setLoading(false));
    // } else setLoading(false);
    } else setIsLoading(false);
  }

  function setCourseState(arr, filterParam, filterData, setState, notEqual = 'equal') {
    const filteredArr =
      notEqual === 'not'
        ? arr.filter((item) => item[`${filterParam}`] !== filterData)
        : arr.filter((item) => item[`${filterParam}`] === filterData);
    if (filteredArr?.length) return setState([...filteredArr], setIsLoading(false));
    // if (filteredArr?.length) return setState([...filteredArr], setLoading(false));
    // return setLoading(false);
    return setIsLoading(false);
  }

  const baseSubcategory = 'React Development';
  const parentOfBaseSubcategory = 'Development';
  const parentOfSubcategory1 = 'Development';
  const parentOfSubcategory2 = 'Cloud';
  const parentOfSubcategory3 = 'Project Management';
  const parentOfSubcategory4 = 'Technology';
  const parentOfSubcategory5 = 'Development';
  return (
    <div
      style={{
        backgroundColor: 'var(--tile-bg)',
        overflow: 'hidden',
        margin: 0,
        padding: 0
      }}>
      {isLoading ? (
        <Skeleton sx={{ bgcolor: 'dimgray' }} variant="rectangular" animation="wave" height={391} />
      ) : (
        <HomeSlider />
      )}
      {onGoingCourses.length ? (
        <ZicopsCarousel title="Continue with your Courses" data={onGoingCourses} />
      ) : (
        ''
      )}
      {addedCourses.length ? (
        <ZicopsCarousel title="Courses in your Learning Folder" data={addedCourses} />
      ) : (
        ''
      )}
      {latestCourseData.length ? (
        <ZicopsCarousel title="Latest Courses" data={latestCourseData} />
      ) : (
        ''
      )}
      {/* <CardSlider title="Latest Courses" data={latestCourseData} /> */}
      <ZicopsCarousel title="Courses from your learning space" data={latestCourseData} />
      <ZicopsCarousel title={`Courses in ${baseSubcategory}`} data={latestCourseData} />
      <ZicopsCarousel title="Recommended Courses" data={latestCourseData} />

      <BigCardSlider
        title="Courses in Other Languages"
        data={LANGUAGES}
        slide={realSquare}
        bigBox={true}
      />

      <ZicopsCarousel title={`Courses in ${parentOfBaseSubcategory}`} data={latestCourseData} />
      <ZicopsCarousel title="Self-Help Courses" data={latestCourseData} />
      <ZicopsCarousel title="Quick Courses" data={latestCourseData} />
      <ZicopsCarousel title={`Courses in ${parentOfSubcategory1}`} data={latestCourseData} />
      <ZicopsCarousel title={`Courses in ${parentOfSubcategory2}`} data={latestCourseData} />
      <ZicopsCarousel title={`Courses in ${parentOfSubcategory3}`} data={latestCourseData} />
      <ZicopsCarousel title={`Courses in ${parentOfSubcategory4}`} data={latestCourseData} />
      <ZicopsCarousel title={`Courses in ${parentOfSubcategory5}`} data={latestCourseData} />
      <ZicopsCarousel title="Slow and Steady Courses" data={latestCourseData} />
      <ZicopsCarousel title="Explore Other Courses" data={latestCourseData} />
      {/* <ZicopsCarousel title="Most Popular Courses in Zicops" data={sliderImages} />
      <ZicopsCarousel title="Suggested Learning paths" data={sliderImages} />
      <ZicopsCarousel
        title="See through resources"
        data={squareImages}
        type="square"
        slide={realSquare}
      /> */}
      {/* <ZicopsCarousel title="See through courses" data={circleImages} type="circle" /> */}

      {/* <BigCardSlider title="Categories and Subcategories" data={squareImages} slide={smallSquare} /> */}
      {/* <div style={{ marginTop: '-60px' }}>
        <BigCardSlider title="" data={circleImages} slide={smallSquare} />
      </div> */}
      {/* <ZicopsCarousel title="Full Stack Development" data={sliderImages} />
      <ZicopsCarousel title="Full Stack Development" data={sliderImages} />
      <OneCardSlider title="Featured Events" data={sliderImages} slide={one} />
      <ZicopsCarousel title="Full Stack Development" data={sliderImages} />
      <ZicopsCarousel title="Full Stack Development" data={sliderImages} />
      <ZicopsCarousel title="Full Stack Development" data={sliderImages} /> */}

      {/* <RoundCardSlider title="Upcoming Webinars & Podcasts" data={circleImages} />

      <ZicopsCarousel title="Available Webinars" data={sliderImages} />
      <ZicopsCarousel title="Cloud Computing" data={sliderImages} />
      <ZicopsCarousel title="Ettiquettes" data={sliderImages} />

      <BigCardSlider title="Categories" data={bigImages} slide={bigSquare} />

      <ZicopsCarousel title="Distance Learning" data={sliderImages} />
      <ZicopsCarousel title="Cloud Certification Courses" data={sliderImages} />
      <ZicopsCarousel title="Distance Learning" data={sliderImages} />
      <ZicopsCarousel title="Cloud Certification Courses" data={sliderImages} /> */}
      {/* <Link href="/courses">
      <a>Courses</a>
      </Link> */}
      {/* <Link href="/admin">
      <a style={{display:'flex', justifyContent: 'center', color: 'var(--primary)'}}><h2>Go to Admin Module</h2></a>
      </Link> */}
    </div>
  );
}
