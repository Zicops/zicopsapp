import PopUp from '@/components/common/PopUp';
import ZicopsButton from '@/components/common/ZicopsButton';
import { TOPIC_TYPES } from '@/constants/course.constants';
import { TopicContentListAtom } from '@/state/atoms/courses.atom';
import { useRecoilValue } from 'recoil';
import styles from '../../adminCourseComps.module.scss';
import useHandleTopic from '../../Logic/useHandleTopic';
import TopicRow from '../BoxContainer/TopicRow';
import AddTopicForm from './AddTopicForm';
import TopicAssessmentForm from './TopicAssessmentForm';
import TopicClassroom from './TopicClassroom';
import TopicContent from './TopicContent';

export default function TopicPopUp({
  modData = null,
  chapData = null,
  topData = null,
  popUpState = [],
  closePopUp = () => {}
}) {
  const topicContentList = useRecoilValue(TopicContentListAtom);
  const {
    topicData,
    setTopicData,
    isEditTopicFormVisible,
    toggleEditTopicForm,
    addUpdateTopic,
    handleSubmit
  } = useHandleTopic(modData, chapData, topData, closePopUp);

  const isAssessment = topicData?.type === TOPIC_TYPES.assessment;
  const isClassroom = topicData?.type === TOPIC_TYPES.classroom;

  return (
    <>
      <PopUp title={`Topic ${topicData?.sequence}`} isFooterVisible={false} popUpState={popUpState}>
        <div className={`${styles.popUpFormContainer}`}>
          {!topicData?.id ? (
            <AddTopicForm
              topicData={topicData}
              setTopicData={setTopicData}
              handleCancel={closePopUp}
              handleSubmit={addUpdateTopic}
            />
          ) : (
            <>
              <TopicRow
                key={topicData.id}
                type="small"
                title={`Topic ${topicData?.sequence} : ${topicData.name}`}
                editHandler={toggleEditTopicForm}
              />
              {!!isEditTopicFormVisible && (
                <AddTopicForm
                  topicData={topicData}
                  setTopicData={setTopicData}
                  handleCancel={toggleEditTopicForm}
                  handleSubmit={addUpdateTopic}
                />
              )}

              {topicData?.type === TOPIC_TYPES.content && (
                <TopicContent topData={topicData} closePopUp={closePopUp} />
              )}

              {isAssessment && <TopicAssessmentForm topData={topicData} closePopUp={closePopUp} />}
              {isClassroom && <TopicClassroom topData={topicData} closePopUp={closePopUp} />}
            </>
          )}
        </div>

        <div className="center-element-with-flex">
          <ZicopsButton
            customClass={styles.addTopicFormBtn}
            handleClick={closePopUp}
            display="Cancel"
          />
          <ZicopsButton
            customClass={`${styles.addTopicFormBtn} ${styles.addBtn}`}
            isDisabled={!topicContentList?.length}
            handleClick={handleSubmit}
            display={'Design'}
          />
        </div>
      </PopUp>
    </>
  );
}
