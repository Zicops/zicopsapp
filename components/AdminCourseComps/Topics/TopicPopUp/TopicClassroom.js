import styles from '../../adminCourseComps.module.scss';
import ClassroomForm from './ClassroomForm';
import TopicAccordian from './TopicAccordian';

export default function TopicClassroom() {
  const topicAccordians = [
    {
      title: 'Classroom',
      body: <ClassroomForm />
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
      body: '<Classroom />'
    },
    {
      title: 'VC Setting',
      body: 'Quiz'
    }
  ];

  return (
    <>
      <div className={styles.editTopicAccordianContainer}>
        {topicAccordians.map((item) => (
          <TopicAccordian key={item?.title} title={item.title}>
            {item.body}
          </TopicAccordian>
        ))}
      </div>
    </>
  );
}
