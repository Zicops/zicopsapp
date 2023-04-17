import useLoadTopicData from '@/components/LearnerCourseComps/Logic/useLoadTopicData';
import ClassroomTopicSection from '@/components/Vctools/ClassroomTopicSection';
import ConfirmPopUp from '@/components/common/ConfirmPopUp';
import { TOPIC_TYPES } from '@/constants/course.constants';
import { COURSE_MAP_STATUS, COURSE_TOPIC_TYPES } from '@/helper/constants.helper';
import { TopicClassroomAtomFamily } from '@/state/atoms/courses.atom';
import { PopUpStatesAtomFamily } from '@/state/atoms/popUp.atom';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { getTopicCardImages } from '../../../Logic/learnerCourseComps.helper';
import {
  ActiveCourseDataAtom,
  CourseTopicAssessmentAtomFamily,
  CourseTopicContentAtomFamily,
  CourseTopicsAtomFamily,
  UserCourseMapDataAtom,
} from '../../../atoms/learnerCourseComps.atom';
import styles from '../../../learnerCourseComps.module.scss';
import TopicAssessment from './TopicAssessment';
import TopicContentDetails from './TopicContentDetails';

export default function TopicCard({ topicId }) {
  const [isAssignPopUpOpen, setIsAssignPopUpOpen] = useRecoilState(
    PopUpStatesAtomFamily('CourseAssignPopUp'),
  );
  const [activeCourseData, setActiveCourseData] = useRecoilState(ActiveCourseDataAtom);
  const topicData = useRecoilValue(CourseTopicsAtomFamily(topicId));
  const topicContent = useRecoilValue(CourseTopicContentAtomFamily(topicId));
  const classroomData = useRecoilValue(TopicClassroomAtomFamily(topicId));
  const topicExamData = useRecoilValue(CourseTopicAssessmentAtomFamily(topicId));
  const userCourseMapData = useRecoilValue(UserCourseMapDataAtom);

  const { isLoading } = useLoadTopicData(topicId, topicData?.type);
  const [notAssignedAlert, setNotAssignedAlert] = useState(null);

  // default topic content is the first because we sort based on is_default (check loadTopicContent() in useLoadTopicData)
  const defaultTopicContent = topicContent?.[0] || null;

  let isTopicDisabled = false;
  if (topicData?.type === TOPIC_TYPES.content && !defaultTopicContent?.id) isTopicDisabled = true;
  if (topicData?.type === TOPIC_TYPES.classroom && !classroomData?.id) isTopicDisabled = true;
  if (topicData?.type === TOPIC_TYPES.assessment && !topicExamData?.examId) isTopicDisabled = true;

  const isCourseAssigned =
    userCourseMapData?.userCourseId &&
    userCourseMapData?.courseStatus !== COURSE_MAP_STATUS.disable;

  return (
    <>
      <div
        className={`${styles.topicCard} ${
          activeCourseData?.topicId === topicData?.id ? styles.activeTopic : ''
        } ${isTopicDisabled ? 'disabled' : ''}`}
        onClick={() => {
          if (isTopicDisabled) return;
          if (!isCourseAssigned) return setNotAssignedAlert(true);

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

        {topicData?.type === COURSE_TOPIC_TYPES.assessment && (
          <TopicAssessment topicId={topicData?.id} />
        )}

        {topicData?.type === COURSE_TOPIC_TYPES.lab && 'Labs'}
      </div>

      {!!notAssignedAlert && (
        <ConfirmPopUp
          title="Course Not Assigned!!"
          message="Please assign course to access the course contents"
          btnObj={{
            textLeft: 'Assign',
            textRight: 'Close',
            handleClickLeft: () => {
              setNotAssignedAlert(null);
              setIsAssignPopUpOpen(true);
            },
            handleClickRight: () => setNotAssignedAlert(null),
          }}
        />
      )}
    </>
  );
}

TopicCard.defaultProps = {
  topicId: null,
};

TopicCard.propTypes = {
  topicId: PropTypes.string,
};
