import { COURSE_TOPIC_TYPES } from '@/helper/constants.helper';
import PropTypes from 'prop-types';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  ActiveCourseDataAtom,
  CourseTopicsAtomFamily,
} from '../../../atoms/learnerCourseComps.atom';
import styles from '../../../learnerCourseComps.module.scss';
import { getTopicCardImages } from '../../../Logic/learnerCourseComps.helper';
import TopicContentDetails from './TopicContentDetails';

export default function TopicCard({ topicId }) {
  const topicData = useRecoilValue(CourseTopicsAtomFamily(topicId));
  const [activeCourseData, setActiveCourseData] = useRecoilState(ActiveCourseDataAtom);

  return (
    <>
      <div
        className={`${styles.topicCard} ${
          activeCourseData?.topicId === topicData?.id ? styles.activeTopic : ''
        }`}
        onClick={() => setActiveCourseData({ ...activeCourseData, topicId })}>
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
            Topic Name {topicData?.name}
          </p>

          <p className={styles.description}>{topicData?.description}</p>
        </div>

        {topicData?.type === COURSE_TOPIC_TYPES.content && (
          <TopicContentDetails topicId={topicData?.id} />
        )}
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
