import useLoadTopicData from '@/components/LearnerCourseComps/Logic/useLoadTopicData';
import ClassroomTopicSection from '@/components/Vctools/ClassroomTopicSection';
import { COURSE_TOPIC_TYPES } from '@/helper/constants.helper';
import PropTypes from 'prop-types';
import { useRecoilState, useRecoilValue } from 'recoil';
import { getTopicCardImages } from '../../../Logic/learnerCourseComps.helper';
import {
  ActiveCourseDataAtom,
  ActiveCourseHeroAtom,
  CourseTopicContentAtomFamily,
  CourseTopicsAtomFamily,
} from '../../../atoms/learnerCourseComps.atom';
import styles from '../../../learnerCourseComps.module.scss';
import TopicContentDetails from './TopicContentDetails';

export default function TopicCard({ topicId }) {
  const topicData = useRecoilValue(CourseTopicsAtomFamily(topicId));
  const topicContent = useRecoilValue(CourseTopicContentAtomFamily(topicId));
  const [activeHero, setActiveHero] = useRecoilState(ActiveCourseHeroAtom);
  const [activeCourseData, setActiveCourseData] = useRecoilState(ActiveCourseDataAtom);

  const { isLoading } = useLoadTopicData(topicId, topicData?.type);

  // default topic content is the first because we sort based on is_default (check loadTopicContent() in useLoadTopicData)
  const defaultTopicContent = topicContent?.[0] || null;

  return (
    <>
      <div
        className={`${styles.topicCard} ${
          activeCourseData?.topicId === topicData?.id ? styles.activeTopic : ''
        }`}
        onClick={() => {
          setActiveHero(topicData?.type?.toLowerCase());
          setActiveCourseData({
            ...activeCourseData,
            moduleId: topicData?.moduleId,
            chapterId: topicData?.chapterId,
            topicId,
            topicContentId: defaultTopicContent?.id,
            language: defaultTopicContent?.language || null,
            subTitle: defaultTopicContent?.subtitleUrl?.[0] || null,
          });
        }}>
        <div className={`${styles.resourcesLink}`}>
          <div
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}>
            <img src="/images/resourcesicon.png" />
            <p>Resources</p>
          </div>
        </div>

        <div className={`${styles.topicImg}`}>
          <img src={`${getTopicCardImages(topicData?.type)}`} alt="" />
        </div>

        <div className={`${styles.topicDetails}`}>
          <p className={`${styles.topicName}`}>
            <span>{topicData?.sequence}. </span>
            {topicData?.name}
          </p>

          <p className={styles.description}>{topicData?.description}</p>
        </div>

        {topicData?.type === COURSE_TOPIC_TYPES.content && (
          <TopicContentDetails
            topicId={topicData?.id}
            topicContent={defaultTopicContent}
            isLoading={isLoading}
          />
        )}
        {topicData?.type === COURSE_TOPIC_TYPES.classroom && (
          <ClassroomTopicSection topicId={topicData?.id} />
        )}

        {topicData?.type === COURSE_TOPIC_TYPES.assessment && 'Assessment'}
        {topicData?.type === COURSE_TOPIC_TYPES.lab && 'Labs'}
      </div>
    </>
  );
}

TopicCard.defaultProps = {
  topicId: null,
};

TopicCard.propTypes = {
  topicId: PropTypes.string,
};
