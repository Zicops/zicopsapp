import useHandleTopicContent from '@/components/AdminCourseComps/Logic/useHandleTopicContent';
import styles from '../../../adminCourseComps.module.scss';
import TopicAccordian from '../TopicAccordian';
import Binge from './Bing';
import Quiz from './Quiz';
import Resource from './Resources';
import TopicContentForm from './TopicContentForm';

export default function TopicContent({ topData = null, closePopUp = () => {} }) {
  const {
    topicContentList,
    isEditTopicFormVisible,
    toggleForm,
    topicContentFormData,
    handleChange,
    handleMp4FileInput,
    handleSubmit
  } = useHandleTopicContent(topData, closePopUp);

  const topicAccordians = [
    {
      title: 'Subtitles',
      body: '<Classroom />'
    },
    {
      title: 'Binge It',
      body: <Binge />
    },
    {
      title: 'Quiz',
      body: <Quiz />
    },
    {
      title: 'Resources',
      body: <Resource />
    }
  ];

  const isDisabled = false;

  return (
    <>
      <div className={styles.editTopicAccordianContainer}>
        <TopicContentForm
          topicContentList={topicContentList}
          topicContentState={topicContentFormData}
          isFormVisible={isEditTopicFormVisible}
          toggleForm={toggleForm}
          handleChange={handleChange}
          handleMp4FileInput={handleMp4FileInput}
          handleSubmit={handleSubmit}
          isDisabled={isDisabled}
        />

        {topicAccordians.map((item) => (
          <TopicAccordian key={item?.title} title={item.title}>
            {item.body}
          </TopicAccordian>
        ))}
      </div>
    </>
  );
}
