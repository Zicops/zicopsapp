import Spinner from '@/components/common/Spinner';
import styles from '../../../adminCourseComps.module.scss';
import TopicContentBar from './TopicContentBar';

export default function TopicContentForm({ topicContentList = null }) {
  return (
    <div className={`${styles.popUpFormContainer}`}>
      {topicContentList == null && <Spinner />}

      {topicContentList?.map((content) => (
        <TopicContentBar contentData={content} />
      ))}
    </div>
  );
}
