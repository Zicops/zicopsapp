import styles from '../../adminCourseComps.module.scss';
import TopicAccordian from './TopicAccordian';

export default function TopicContentForm() {
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
        {topicAccordians.map((item) => (
          <TopicAccordian title={item.title}>{item.body}</TopicAccordian>
        ))}
      </div>
    </>
  );
}
