import CourseBody from '@/components/CourseBody';
import CourseHero from '@/components/CourseHero';
import CustomVideo from '@/components/CustomVideoPlayer';
import ExamLanding from '@/components/Exams/ExamLanding';
import VCtoolStartPage from '@/components/Vctools/VctoolStartPage';
import ZicopsCarousel from '@/components/ZicopsCarousel';
import { getLatestCoursesByFilters } from '@/helper/data.helper';
import useUserCourseData from '@/helper/hooks.helper';
import {
  ActiveClassroomTopicIdAtom,
  getTopicExamObj,
  TopicExamAtom
} from '@/state/atoms/module.atoms';
import { getVideoObject, VideoAtom } from '@/state/atoms/video.atom';
import { courseContext } from '@/state/contexts/CourseContext';
import ModuleContextProvider from '@/state/contexts/ModuleContext';
import { ApolloProvider } from '@apollo/client';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { mutationClient } from '../../../API/Mutations';

export default function Course() {
  const { fullCourse } = useContext(courseContext);
  const [videoData, setVideoData] = useRecoilState(VideoAtom);
  const [topicExamData, setTopicExamData] = useRecoilState(TopicExamAtom);
  const [activeClassroomTopicId, setActiveClassroomTopicId] = useRecoilState(
    ActiveClassroomTopicIdAtom
  );
  const startPlayer = videoData.startPlayer;

  const [ongoingCourses, setOngoingCourses] = useState([]);
  const [catCourses, setCatCourses] = useState([]);
  const [subCatCourses, setSubCatCourses] = useState([]);

  const router = useRouter();
  const { getUserCourseData } = useUserCourseData();
  const pageSize = 28;

  function setStartPlayer(val) {
    setVideoData({
      ...videoData,
      startPlayer: !!val
    });
  }

  // reset data on load first time
  useEffect(() => {
    setVideoData(getVideoObject());
    setStartPlayer(false);
    setTopicExamData(getTopicExamObj());
    setActiveClassroomTopicId(null);
  }, []);

  useEffect(() => {
    if (!startPlayer && !topicExamData?.id) return;

    setActiveClassroomTopicId(null);
  }, [startPlayer, topicExamData?.id]);

  useEffect(async () => {
    const courseId = fullCourse?.id;
    if (!fullCourse?.sub_category) return;
    if (!fullCourse?.category) return;
    if (!courseId) return;

    const userCourseData = await getUserCourseData(pageSize);

    let ucidArray = [];
    userCourseData?.map((uc) => {
      // console.log(uc);
      ucidArray?.push(uc.id);
    });

    setOngoingCourses(
      userCourseData?.filter(
        (course) => course?.id !== courseId && course?.isCourseStarted && !course?.isCourseCompleted
      )
    );

    const catCourseRes = getLatestCoursesByFilters({ Category: fullCourse?.category }, pageSize);
    const subCatCourseRes = getLatestCoursesByFilters(
      { SubCategory: fullCourse?.sub_category },
      pageSize
    );

    const allCatCourses =
      (await catCourseRes)?.latestCourses?.courses?.filter(
        (c) => c?.is_active && c?.is_display && !ucidArray.includes(c.id)
      ) || [];
    const allSubCatCourses =
      (await subCatCourseRes)?.latestCourses?.courses?.filter(
        (c) => c?.is_active && c?.is_display && !ucidArray.includes(c.id)
      ) || [];

    setCatCourses(allCatCourses);
    setSubCatCourses(allSubCatCourses);
  }, [fullCourse?.id, fullCourse?.category, fullCourse?.sub_category]);

  return (
    <ApolloProvider client={mutationClient}>
      {/* <CourseContextProvider> */}
      <ModuleContextProvider>
        {/* move style to .scss */}
        <div
          style={{
            backgroundColor: 'var(--tile-bg)',
            margin: 0,
            padding: '0 0 20px 0',
            overflowX: 'clip'
          }}>
          {topicExamData?.id && <ExamLanding isDisplayedInCourse={true} />}

          {!!activeClassroomTopicId && <VCtoolStartPage topicId={activeClassroomTopicId} />}

          {startPlayer && <CustomVideo set={setStartPlayer} />}

          {!startPlayer && !topicExamData?.id && !activeClassroomTopicId && (
            <CourseHero set={setStartPlayer} />
          )}

          <CourseBody />
          {/* <CardSlider title="Your Other Subscribed Courses" data={sliderImages} />
            <CardSlider title="Related Courses" data={sliderImages} />
            <CardSlider title="Recomended Courses" data={sliderImages} /> */}

          {!!ongoingCourses?.length && (
            <ZicopsCarousel
              title="Your Other Subscribed Courses"
              data={ongoingCourses}
              handleTitleClick={() =>
                router.push(
                  `/search-page?userCourse=${JSON.stringify({ isOngoing: true })}`,
                  '/search-page'
                )
              }
            />
          )}
          {!!subCatCourses?.length && (
            <ZicopsCarousel
              title={`Courses in ${fullCourse?.sub_category}`}
              data={subCatCourses}
              handleTitleClick={() =>
                router.push(`/search-page?subCat=${fullCourse?.sub_category}`, '/search-page')
              }
            />
          )}
          {!!catCourses?.length && (
            <ZicopsCarousel
              title={`Courses in ${fullCourse?.category}`}
              data={catCourses}
              handleTitleClick={() =>
                router.push(`/search-page?cat=${fullCourse?.category}`, '/search-page')
              }
            />
          )}
        </div>
      </ModuleContextProvider>
      {/* </CourseContextProvider> */}
    </ApolloProvider>
  );
}
