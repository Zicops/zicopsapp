import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { ActiveCourseDataAtom, CourseMetaDataAtom } from '../../atoms/learnerCourseComps.atom';
import VideoPlayer from '../../common/VideoPlayer';
import styles from '../../learnerCourseComps.module.scss';
import useHandleTopicProgress from '../../Logic/useHandleTopicProgress';
import CourseHeroTopBar from '../CourseHeroTopBar';
import TopBarCenterTitle from '../CourseHeroTopBar/TopBarCenterTitle';
import IconButtonWithBox from './IconButtonWithBox';
import SubtitleBox from './SubtitleBox';

export default function TopicContentPreview() {
  const [activeCourseData, setActiveCourseData] = useRecoilState(ActiveCourseDataAtom);
  const courseMeta = useRecoilValue(CourseMetaDataAtom);
  const [activeBox, setActiveBox] = useState(null);
  const { containerRef, selectedTopicContent, videoStartTime } = useHandleTopicProgress();

  function toggleActiveBox(id) {
    setActiveBox((prev) => (prev === id ? null : id));
  }

  const toolbarItems = [
    {
      id: 0,
      btnImg: '/images/svg/spatial_audio_off.svg',
      handleClick: () => toggleActiveBox(0),
      boxComponent: <SubtitleBox />,
    },
    {
      id: 1,
      btnImg: '/images/svg/hub.svg',
      handleClick: () => toggleActiveBox(1),
      boxComponent: <>Resoucrs</>,
    },
    {
      id: 2,
      btnImg: '/images/svg/forum.svg',
      handleClick: () => toggleActiveBox(2),
    },
    {
      id: 3,
      btnImg: '/images/svg/bookmark-line.svg',
      handleClick: () => toggleActiveBox(3),
      boxComponent: <>Subtitle</>,
    },
    {
      id: 4,
      btnImg: '/images/svg/app_registration.svg',
      handleClick: () => toggleActiveBox(4),
      boxComponent: <>Resoucrs</>,
    },
    {
      id: 5,
      btnImg: '/images/svg/quiz.svg',
      handleClick: () => toggleActiveBox(5),
    },
  ];

  return (
    <>
      <div ref={containerRef} className={styles.courseHeroContainer}>
        <CourseHeroTopBar
          handleBackBtnClick={() =>
            setActiveCourseData((prev) => ({ ...prev, topicId: null, topicContentId: null }))
          }
          leftSideComps={
            <>
              {toolbarItems.slice(0, 3).map((item) => {
                if (item?.isHidden) return null;

                return (
                  <IconButtonWithBox
                    key={item.id}
                    btnImg={item.btnImg}
                    btnComp={item.btnComp}
                    handleClick={item.handleClick}
                    isBoxActive={activeBox === item.id}
                    boxComponent={item.boxComponent}
                  />
                );
              })}
            </>
          }
          rightComps={<>rightSideComps</>}
          centerComps={<TopBarCenterTitle title={courseMeta?.name} subtitle="Preview Video" />}
        />

        <VideoPlayer
          containerRef={containerRef}
          videoData={{
            src: selectedTopicContent?.contentUrl || '',
            isAutoPlay: true,
            startFrom: videoStartTime,
            isSubtitleShown: activeCourseData?.subTitle != null,
            subtitleUrl: activeCourseData?.subTitle,
          }}
        />
      </div>
    </>
  );
}
