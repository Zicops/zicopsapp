import useHandleTopicContent from '@/components/AdminCourseComps/Logic/useHandleTopicContent';
import { TopicContentListAtom } from '@/state/atoms/courses.atom';
import { useRecoilValue } from 'recoil';
import styles from '../../../adminCourseComps.module.scss';
import TopicAccordian from '../TopicAccordian';
import BingeForm from './BingeForm';
import Quiz from './Quiz';
import ResourceForm from './ResourceForm';
import TopicContentForm from './TopicContentForm';

export default function TopicContent({ topData = null, closePopUp = () => {} }) {
  const topicContentList = useRecoilValue(TopicContentListAtom);

  const {
    isFormVisible,
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
      body: <BingeForm />
    },
    {
      title: 'Quiz',
      body: <Quiz />
    },
    {
      title: 'Resources',
      body: <ResourceForm topData={topData} />
    }
  ];

  const isDisabled = false;

  return (
    <>
      <div className={styles.editTopicAccordianContainer}>
        <TopicContentForm
          topicContentState={topicContentFormData}
          isFormVisible={isFormVisible}
          toggleForm={toggleForm}
          handleChange={handleChange}
          handleMp4FileInput={handleMp4FileInput}
          handleSubmit={handleSubmit}
          isDisabled={isDisabled}
        />

        {topicAccordians.map((item) => (
          <TopicAccordian
            key={item?.title}
            title={item.title}
            isDisabled={!topicContentList?.length}>
            {item.body}
          </TopicAccordian>
        ))}
      </div>
    </>
  );
}
