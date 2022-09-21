import { UserCourseDataAtom } from '@/state/atoms/video.atom';
import { useRecoilState } from 'recoil';
import styles from './bookmarkCard.module.scss';

export default function BookmarkCard({ data = {}, styleClass, bookmarkData = null }) {
  const gotoPage = () => {
    alert('go go go!');
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
