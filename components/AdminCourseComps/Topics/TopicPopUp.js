import BlackRow from '@/components/common/BlackRow';
import Button from '@/components/common/Button';
import PopUp from '@/components/common/PopUp';
import styles from '../adminCourseComps.module.scss';
import useHandleTopic from '../Logic/useHandleTopic';
import AddTopicForm from './AddTopicForm';
import TopicAccordian from './TopicAccordian';

export default function TopicPopUp({ topic = null, popUpState = [] }) {
  const { topicData, editTopic, setEditTopic } = useHandleTopic(topic);

  const submitBtnObj = { name: 'Save' };
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

  // edit topic
  return (
    <>
      <PopUp
        title={`Topic ${topicData?.sequence}`}
        submitBtn={submitBtnObj}
        popUpState={popUpState}
        closeBtn={closeBtnObj}>
        <BlackRow
          key={topicData.id}
          type="large"
          title={`Topic ${topicData?.sequence} : ${topicData.name}`}
          editHandler={() => setEditTopic(topicData)}
        />
        {!!editTopic?.id && (
          <>
            <AddTopicForm topicData={editTopic} setTopicData={setEditTopic} />

            <div className={styles.addTopicFormBtns}>
              <Button text={'Cancel'} />
              <Button text={'Update'} />
            </div>
          </>
        )}

        <div className={styles.editTopicAccordianContainer}>
          {topicAccordians.map((item) => {
            return <TopicAccordian title={item.title}>{item.body}</TopicAccordian>;
          })}
        </div>
      </PopUp>
    </>
  );
}
