import PopUp from '@/components/common/PopUp';
import { TOPIC_TYPES } from '@/constants/course.constants';
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
  const { topicData, setTopicData, isEditTopicFormVisible, toggleEditTopicForm, addUpdateTopic } =
    useHandleTopic(modData, chapData, topData, closePopUp);

  const isAssessment = topicData?.type === TOPIC_TYPES.assessment;
  const isClassroom = topicData?.type === TOPIC_TYPES.classroom;

  const submitBtnObj = { name: 'Design' };
  const closeBtnObj = { name: 'Cancel' };

  if (topicData?.id) submitBtnObj.name = 'Design';

  return (
    <>
      <PopUp
        title={`Topic ${topicData?.sequence}`}
        submitBtn={submitBtnObj}
        isFooterVisible={false}
        popUpState={popUpState}
        closeBtn={closeBtnObj}>
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
      </PopUp>
    </>
  );
}
