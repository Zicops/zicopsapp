import { ActiveCourseTabAtom, tabs } from '@/components/CourseBody/Logic/courseBody.helper';
import { BookmarkStartTimeAtom } from '@/components/CustomVideoPlayer/Logic/customVideoPlayer.helper';
import { UserCourseDataAtom, VideoAtom } from '@/state/atoms/video.atom';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import styles from './bookmarkCard.module.scss';

export default function BookmarkCard({ data = {}, styleClass, bookmarkData = null }) {
  const router = useRouter();
  const [videoData, setVideoData] = useRecoilState(VideoAtom);
  const [bookmarkStartTime, setBookmarkStartTime] = useRecoilState(BookmarkStartTimeAtom);
  const [activeCourseTab, setActiveCourseTab] = useRecoilState(ActiveCourseTabAtom);

  useEffect(() => {
    setBookmarkStartTime({ ...bookmarkStartTime, topicId: null, time: null });
  }, []);

  const gotoPage = () => {
    // alert('go go go!');
    const timeArr = data?.timestamp?.split(':');
    const time =
      timeArr.length === 2
        ? +timeArr[0] * 60 + +timeArr[1]
        : +timeArr[0] * 60 * 60 + +timeArr[1] * 60 + +timeArr[2];

    if (router.pathname !== '/course/[courseId]') {
      router.push(`/course/${data?.course_id}`);
    }
    if (!videoData?.startPlayer && tabs[0].name !== activeCourseTab)
      setActiveCourseTab(tabs[0].name);
    setBookmarkStartTime({
      ...bookmarkStartTime,
      time,
      topicId: !!videoData?.startPlayer ? null : bookmarkData?.topic_id || data?.topic_id
    });
    // console.log({
    //   ...videoData,
    //   videoSrc: topicContent[0]?.contentUrl || null,
    //   type: topicContent[0]?.type || null,
    //   startPlayer: true,
    //   isPreview: false,
    //   currentTopicIndex: currentTopicIndex,

    //   topicContent: topicContent,
    //   currentTopicContentIndex: 0,
    //   currentSubtitleIndex: 0,

    //   allModuleTopic: filteredTopicData,
    //   currentModuleId: moduleId,

    //   allModuleOptions: allModuleOptions,
    //   currentModuleIndex: currentModuleIndex,
    //   setNewModule: setSelectedModule
    // });
    // setVideoData({
    //   ...videoData,
    //   videoSrc: topicContent[0]?.contentUrl || null,
    //   type: topicContent[0]?.type || null,
    //   startPlayer: true,
    //   isPreview: false,
    //   currentTopicIndex: currentTopicIndex,

    //   topicContent: topicContent,
    //   currentTopicContentIndex: 0,
    //   currentSubtitleIndex: 0,

    //   allModuleTopic: filteredTopicData,
    //   currentModuleId: moduleId,

    //   allModuleOptions: allModuleOptions,
    //   currentModuleIndex: currentModuleIndex,
    //   setNewModule: setSelectedModule
    // });
  };

  const [userCourseData, setUserCourseData] = useRecoilState(UserCourseDataAtom);

  // function activateVideoPlayer() {
  //   if (!bookmarkData) return;

  //   // if (courseAssignData?.isCourseAssigned) alert('Start the course');
  //   let courseVideoData = {
  //     activeModule: { id: null, index: null },
  //     activeTopic: { id: null, index: null },
  //     activeTopicContent: { id: null, index: null },
  //     triggerPlayerToStartAt: null
  //   };

  //   let isTopicFound = false;
  //   userCourseData?.allModules?.some((mod, modIndex) => {
  //     mod?.topicData?.some((topic, topicIndex) => {
  //       if (topic?.type !== 'Content') return false;
  //       if (isTopicFound) return true;
  //       if (topic?.id !== bookmarkData?.topic_id) return false;

  //       const timeStamp = bookmarkData?.time_stamp?.split(':');
  //       const timeStampInSeconds = +timeStamp?.[0] * 60 + +timeStamp?.[1];

  //       courseVideoData.activeModule = { index: modIndex, id: mod?.id };
  //       courseVideoData.activeTopic = { index: topicIndex, id: topic?.id };
  //       courseVideoData.activeTopicContent = { index: 0, id: topic?.topicContentData[0]?.id };
  //       courseVideoData.triggerPlayerToStartAt = timeStampInSeconds || 0;
  //       isTopicFound = true;
  //     });

  //     return isTopicFound;
  //   });
  //   console.log(courseVideoData, bookmarkData, userCourseData, {
  //     ...userCourseData,
  //     ...courseVideoData,
  //     switchModule: true
  //   });
  //   // return;
  //   setUserCourseData({ ...userCourseData, ...courseVideoData, switchModule: true });
  // }
  // console.log(bookmarkData);

  return (
    <>
      <div className={`${styles.bookmarksCard} ${styleClass}`} onClick={gotoPage}>
        <div className={`${styles.bookmarkOverlay}`}>
          <div className={`${styles.banner}`}>Bookmarks</div>
          <div className={`${styles.imageTimeText}`}>
            <div className={`${styles.bookmarkImage}`}>
              <img src={data?.img || '/images/dnd1.jpg'} alt="" />
            </div>
            <div className={`${styles.bookmarkText}`}>
              <div className={`${styles.bookmarkTime}`}>
                {data?.timestamp || '00:00'} <span>{data?.courseName || 'Course Name'} </span>
              </div>
              <p>{data?.title || 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'}</p>
            </div>
          </div>
        </div>
        {/* <img src="/images/dnd1.jpg" alt="" /> */}
      </div>
    </>
  );
}
