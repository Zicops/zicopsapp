import PopUp from '@/components/common/PopUp';
import { TOPIC_TYPES } from '@/constants/course.constants';
import useHandleTopic from '../../Logic/useHandleTopic';
import TopicRow from '../BoxContainer/TopicRow';
import AddTopicForm from './AddTopicForm';
import TopicContentForm from './TopicContentForm';

export default function TopicPopUp({
  modData = null,
  chapData = null,
  topData = null,
  popUpState = [],
  closePopUp = () => {}
}) {
  const { topicData, setTopicData, isEditTopicFormVisible, toggleEditTopicForm, addUpdateTopic } =
    useHandleTopic(modData, chapData, topData, closePopUp);

  const submitBtnObj = { name: 'Design' };
  const closeBtnObj = { name: 'Cancel' };

  if (topicData?.id) submitBtnObj.name = 'Design';

  return (
    <>
      <PopUp
        title={`Topic ${topicData?.sequence}`}
        submitBtn={submitBtnObj}
        isFooterVisible={!!topicData?.id}
        popUpState={popUpState}
        closeBtn={closeBtnObj}>
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

            {topicData?.type === TOPIC_TYPES.content && <TopicContentForm />}
          </>
        )}
      </PopUp>
    </>
  );
}
