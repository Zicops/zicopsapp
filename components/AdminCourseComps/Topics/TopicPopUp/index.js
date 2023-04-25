import ConfirmPopUp from '@/components/common/ConfirmPopUp';
import PopUp from '@/components/common/PopUp';
import ZicopsButton from '@/components/common/ZicopsButton';
import { TOPIC_TYPES } from '@/constants/course.constants';
import { TopicContentListAtom } from '@/state/atoms/courses.atom';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import useHandleTopic from '../../Logic/useHandleTopic';
import styles from '../../adminCourseComps.module.scss';
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
  closePopUp = () => {},
}) {
  const topicContentList = useRecoilValue(TopicContentListAtom);
  const [confimClose, setConfirmClose] = useState(null);
  const {
    topicData,
    setTopicData,
    isSubmitDisabled,
    isEditTopicFormVisible,
    toggleEditTopicForm,
    addUpdateTopic,
    handleSubmit,
    handleClose,
  } = useHandleTopic(modData, chapData, topData);

  const isAssessment = topicData?.type === TOPIC_TYPES.assessment;
  const isClassroom = topicData?.type === TOPIC_TYPES.classroom;
  const isContent = topicData?.type === TOPIC_TYPES.content;

  return (
    <>
      <PopUp
        title={`Topic ${topicData?.sequence}`}
        closeBtn={{ disabled: isSubmitDisabled }}
        isFooterVisible={false}
        popUpState={popUpState}>
        <div className={`${styles.popUpFormContainer}`}>
          {/* add new topic */}
          {!topicData?.id ? (
            <AddTopicForm
              topicData={topicData}
              setTopicData={setTopicData}
              handleCancel={() => setConfirmClose(true)}
              handleSubmit={addUpdateTopic}
            />
          ) : (
            <>
              {/* edit topic  */}
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

              {isContent && <TopicContent topData={topicData} />}

              {isAssessment && (
                <TopicAssessmentForm
                  topData={topicData}
                  closePopUp={(isDirectClose = false) => {
                    if (isDirectClose === true) return closePopUp();
                    setConfirmClose(true);
                  }}
                />
              )}
              {isClassroom && (
                <TopicClassroom
                  topData={topicData}
                  closePopUp={(isDirectClose = false) => {
                    if (isDirectClose === true) return closePopUp();
                    setConfirmClose(true);
                  }}
                />
              )}
            </>
          )}
        </div>

        {!!(isContent && topicData?.id) && (
          <div className="center-element-with-flex">
            <ZicopsButton
              customClass={styles.addTopicFormBtn}
              handleClick={() => setConfirmClose(true)}
              isDisabled={isSubmitDisabled}
              display="Cancel"
            />
            <ZicopsButton
              customClass={`${styles.addTopicFormBtn} ${styles.addBtn}`}
              isDisabled={!topicContentList?.length || isSubmitDisabled}
              handleClick={() => {
                handleSubmit()
                  .finally((err) => console.log(err))
                  .finally(() => closePopUp());
              }}
              display={'Design'}
            />
          </div>
        )}
      </PopUp>

      {!!confimClose && (
        <ConfirmPopUp
          title={'Are you sure you want to close the pop up?'}
          btnObj={{
            handleClickLeft: () => {
              handleClose();
              closePopUp();
            },
            handleClickRight: () => setConfirmClose(false),
          }}
        />
      )}
    </>
  );
}
