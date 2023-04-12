import Spinner from '@/components/common/Spinner';
import { truncateToN } from '@/helper/common.helper';
import { useMemo } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import useHandleTopicProgress from '../../Logic/useHandleTopicProgress';
import useHandleTopicView from '../../Logic/useHandleTopicView';
import useLoadTopicData from '../../Logic/useLoadTopicData';
import {
  ActiveCourseDataAtom,
  CourseActiveTabAtom,
  CourseModulesAtomFamily,
  CourseTopicsAtomFamily,
  TopicQuizAtom,
  TopicQuizAttemptsAtom,
  activeCourseTabNames,
} from '../../atoms/learnerCourseComps.atom';
import VideoPlayer from '../../common/VideoPlayer';
import ZicopsButton from '../../common/ZicopsButton';
import styles from '../../learnerCourseComps.module.scss';
import CourseHeroTopBar from '../CourseHeroTopBar';
import TopBarCenterTitle from '../CourseHeroTopBar/TopBarCenterTitle';
import IconButtonWithBox from './IconButtonWithBox';
import ResourcesList from './ResourcesList';
import SubtitleBox from './SubtitleBox';
import { CourseMetaDataAtom } from '@/state/atoms/courses.atom';

export default function TopicContentPreview() {
  const [courseActiveTab, setCourseActiveTab] = useRecoilState(CourseActiveTabAtom);
  const [activeCourseData, setActiveCourseData] = useRecoilState(ActiveCourseDataAtom);
  const courseMeta = useRecoilValue(CourseMetaDataAtom);
  const topicData = useRecoilValue(CourseTopicsAtomFamily(activeCourseData?.topicId));
  const quizData = useRecoilValue(TopicQuizAtom);
  const quizAttempts = useRecoilValue(TopicQuizAttemptsAtom);
  const moduleData = useRecoilValue(CourseModulesAtomFamily(topicData?.moduleId));

  const { containerRef, selectedTopicContent, videoStartTime } = useHandleTopicProgress();
  const { activeBox, videoState, getVideoData, toggleActiveBox } = useHandleTopicView();
  const { isLoading } = useLoadTopicData(activeCourseData?.topicId, topicData?.type);

  const toolbarItems = useMemo(
    () => [
      {
        id: 0,
        btnImg: '/images/svg/spatial_audio_off.svg',
        handleClick: () => toggleActiveBox(0),
        boxComponent: <SubtitleBox closeBox={() => toggleActiveBox(null)} />,
      },
      {
        id: 1,
        btnImg: '/images/svg/hub.svg',
        handleClick: () => toggleActiveBox(1),
        boxComponent: <ResourcesList />,
      },
      {
        id: 2,
        btnImg: '/images/svg/forum.svg',
        handleClick: () => setCourseActiveTab(activeCourseTabNames.discussion),
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
        boxComponent: (
          <>
            <div className={`${styles.boxContainer} ${styles.quizBox}`}>
              {quizData
                ?.filter((quiz) => quiz?.topicId === activeCourseData?.topicId)
                ?.map((quiz) => {
                  // const isAttempted = quizAttempts?.filter((qa) => qa?.quizId === quiz?.id);
                  // console.info(isAttempted, quizAttempts, quiz);
                  return (
                    <>
                      <ZicopsButton paddingY="0.5em" display={truncateToN(quiz?.name, 16)} />
                    </>
                  );
                })}
            </div>
          </>
        ),
      },
    ],
    [activeCourseData?.topicId],
  );

  if (isLoading) return <Spinner />;

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
          rightComps={
            <>
              {toolbarItems.slice(3, 6).map((item) => {
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
          centerComps={
            <TopBarCenterTitle
              title={courseMeta?.name}
              subtitle={`M${moduleData?.sequence || '1'}T${topicData?.sequence || '1'} ${
                topicData?.name || ''
              }`}
            />
          }
        />

        <VideoPlayer
          containerRef={containerRef}
          videoData={{
            src: selectedTopicContent?.contentUrl || '',
            isAutoPlay: true,
            pauseVideo: videoState?.shouldPlay,
            startFrom: videoStartTime,
            isSubtitleShown: activeCourseData?.subTitle != null,
            subtitleUrl: activeCourseData?.subTitle,
          }}
          getVideoData={getVideoData}
        />
      </div>
    </>
  );
}
