import useHandleTopicContent from '@/components/AdminCourseComps/Logic/useHandleTopicContent';
import styles from '../../../adminCourseComps.module.scss';
import TopicAccordian from '../TopicAccordian';
import Binge from './Bing';
import Quiz from './Quiz';
import Resource from './Resources';
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
      body: <Binge/>
    },
    {
      title: 'Quiz',
      body: <Quiz/>
    },
    {
      title: 'Resources',
      body: <Resource/>
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
