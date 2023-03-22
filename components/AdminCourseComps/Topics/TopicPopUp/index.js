import PopUp from '@/components/common/PopUp';
// import styles from '../../adminCourseComps.module.scss';
import useHandleTopic from '../../Logic/useHandleTopic';
import TopicRow from '../BoxContainer/TopicRow';
import AddTopicForm from './AddTopicForm';

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

  const topicAccordians = [
    {
      title: 'Classroom',
      body: '<Classroom />'
    },
    {
      title: 'Quizzes',
      body: 'Quiz'
    },
    {
      title: 'Resources',
      body: 'Quiz'
    },
    {
      title: 'Assignments',
      body: 'Quiz'
    },
    {
      title: 'VC Settings',
      body: '<VcSetting />'
    }
  ];

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
          </>
        )}
        {/* edit topic */}
        {/* <BlackRow
          key={topicData.id}
          type="large"
          title={`Topic ${topicData?.sequence} : ${topicData.name}`}
          editHandler={() => setEditTopic(topicData)}
        />
        <AddTopicForm topicData={editTopic} setTopicData={setEditTopic} />

        <div className={styles.editTopicAccordianContainer}>
          {topicAccordians.map((item) => {
            return <TopicAccordian title={item.title}>{item.body}</TopicAccordian>;
          })}
        </div> */}
      </PopUp>
    </>
  );
}
