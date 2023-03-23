import useHandleTopicContent from '@/components/AdminCourseComps/Logic/useHandleTopicContent';
import styles from '../../../adminCourseComps.module.scss';
import TopicAccordian from '../TopicAccordian';
import TopicContentForm from './TopicContentForm';

export default function TopicContent({ topData = null, closePopUp = () => {} }) {
  const { topicContentList } = useHandleTopicContent(topData, closePopUp);

  const topicAccordians = [
    {
      title: 'Subtitles',
      body: '<Classroom />'
    },
    {
      title: 'Binge It',
      body: 'Quiz'
    },
    {
      title: 'Quiz',
      body: 'Quiz'
    },
    {
      title: 'Resources',
      body: 'Quiz'
    }
  ];

  return (
    <>
      <div className={styles.editTopicAccordianContainer}>
        <TopicContentForm topicContentList={topicContentList} />

        {topicAccordians.map((item) => (
          <TopicAccordian key={item?.title} title={item.title}>
            {item.body}
          </TopicAccordian>
        ))}
      </div>
    </>
  );
}
