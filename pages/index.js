
import { userClient } from '@/api/UserMutations';
import { GET_USER_COURSE_MAPS, GET_USER_COURSE_PROGRESS } from '@/api/UserQueries';
import { loadQueryDataAsync } from '@/helper/api.helper';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { UsersOrganizationAtom, UserStateAtom } from '@/state/atoms/users.atom';

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

export default function Home() {
  const { isAdmin } = useContext(userContext);
  const router = useRouter();
  const [userOrgData , setUserOrgData] = useRecoilState(UsersOrganizationAtom);
  const { getUserCourseData, getUserPreferences } = useUserCourseData();

  React.useEffect(() => {
    console.log(screen.width);
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

  useEffect(async() => {
    setIsLoading(loading);

    // const userPreferencesData = await getUserPreferences();


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

    await loadAssignedCourseData();
  }, []);

  // useEffect(() => {
  //   console.log(
  //     'ongoing', onGoingCourses,
  //     'added', addedCourses,
  //     'assigned', assignedCourses,
  //     'user', userData
  //   );
  // }, [onGoingCourses, addedCourses, assignedCourses]);

  // for user courses
  async function loadAssignedCourseData() {
    const {id} = getUserData();
    const userCourses = await getUserCourseData(id);

    console.log(userOrgData,'userorg data');

    if (userCourses?.length) {
      setCourseState(userCourses, 'completedPercentage', 100, setOnGoingCourses, 'not');
      // setCourseState(userCourses, 'completedPercentage', 100, setCompletedCourses);
      setCourseState(userCourses, 'added_by', 'self', setAddedCourses);
      setCourseState(userCourses, 'added_by', 'self', setAssignedCourses, 'not');
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
      {onGoingCourses.length ? <ZicopsCarousel title="Continue with your Courses" data={onGoingCourses} /> : ''}
      {addedCourses.length ? <ZicopsCarousel title="Courses in your Learning Folder" data={addedCourses} /> : ''}
      {latestCourseData.length ? <ZicopsCarousel title="Latest Courses" data={latestCourseData} /> : ''}
      {/* <CardSlider title="Latest Courses" data={latestCourseData} /> */}
      <ZicopsCarousel title="Courses from your learning space" data={latestCourseData} />
      <ZicopsCarousel title={`Courses in ${baseSubcategory}`} data={latestCourseData} />
      {/* <ZicopsCarousel title={`Courses in ${baseSubcategory}`} data={latestCourseData} /> */}

      <BigCardSlider title="Courses mandatory for you" data={squareImages} slide={realSquare} />

      <ZicopsCarousel title="New Launched Courses" data={sliderImages} />
      <ZicopsCarousel title="Most Popular Courses in Zicops" data={sliderImages} />
      <ZicopsCarousel title="Suggested Learning paths" data={sliderImages} />
      <ZicopsCarousel
        title="See through resources"
        data={squareImages}
        type="square"
        slide={realSquare}
      />
      <ZicopsCarousel title="See through courses" data={circleImages} type="circle" />

      <BigCardSlider title="Categories and Subcategories" data={squareImages} slide={smallSquare} />
      <div style={{ marginTop: '-60px' }}>
        <BigCardSlider title="" data={circleImages} slide={smallSquare} />
      </div>
      <ZicopsCarousel title="Full Stack Development" data={sliderImages} />
      <ZicopsCarousel title="Full Stack Development" data={sliderImages} />
      <OneCardSlider title="Featured Events" data={sliderImages} slide={one} />
      <ZicopsCarousel title="Full Stack Development" data={sliderImages} />
      <ZicopsCarousel title="Full Stack Development" data={sliderImages} />
      <ZicopsCarousel title="Full Stack Development" data={sliderImages} />

      <RoundCardSlider title="Upcoming Webinars & Podcasts" data={circleImages} />

      <ZicopsCarousel title="Available Webinars" data={sliderImages} />
      <ZicopsCarousel title="Cloud Computing" data={sliderImages} />
      <ZicopsCarousel title="Ettiquettes" data={sliderImages} />

      <BigCardSlider title="Categories" data={bigImages} slide={bigSquare} />

      <ZicopsCarousel title="Distance Learning" data={sliderImages} />
      <ZicopsCarousel title="Cloud Certification Courses" data={sliderImages} />
      <ZicopsCarousel title="Distance Learning" data={sliderImages} />
      <ZicopsCarousel title="Cloud Certification Courses" data={sliderImages} />
      {/* <Link href="/courses">
      <a>Courses</a>
      </Link> */}
      {/* <Link href="/admin">
      <a style={{display:'flex', justifyContent: 'center', color: 'var(--primary)'}}><h2>Go to Admin Module</h2></a>
      </Link> */}
    </div>
  );
}
