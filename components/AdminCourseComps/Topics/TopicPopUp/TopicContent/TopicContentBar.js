import { DELETE_COURSE_TOPIC_CONTENT } from '@/api/Mutations';
import DeleteBtn from '@/components/common/DeleteBtn';
import styles from '../../../adminCourseComps.module.scss';

export default function TopicContentBar({ contentData = {} }) {
  return (
    <>
      <div className={`${styles.topicContentBarContainer}`}>
        <div className={`${styles.topSection}`}>
          <p>
            Content Type: <span>{contentData?.type}</span>
          </p>
          <p>
            Duration: <span>{contentData?.duration} sec</span>
          </p>
        </div>

        <div className={`${styles.contentBar}`}>
          <span>{contentData?.language}</span>
          <span>Content Added {contentData?.isDefault ? '(Default)' : ''}</span>

          {/* <DeleteBtn
            id={contentData?.id}
            resKey="deleteTopicContent"
            mutation={DELETE_COURSE_TOPIC_CONTENT}
            // deleteCondition={() => {
            //   // const isSubsExists = !!subtitles?.length;
            //   // if (isSubsExists) {
            //   //   setToastMsg({ type: 'danger', message: 'Delete All Subtitles First' });
            //   //   return false;
            //   // }

            //   const isQuizExists = !!quizzes?.length;
            //   if (isQuizExists) {
            //     setToastMsg({ type: 'danger', message: 'Delete All Quiz First' });
            //     return false;
            //   }

            //   return true;
            // }}
            onDelete={() => {
              //   const _topicContentArr = structuredClone(topicContentArr);
              //   const currentTopicIndex = _topicContentArr?.findIndex((tc) => tc?.id === content?.id);
              //   if (currentTopicIndex >= 0) {
              //     _topicContentArr?.splice(currentTopicIndex, 1);
              //   }
              //   if (!_topicContentArr?.length) toggleTopicContentForm();
              //   setTopicContentArr(_topicContentArr);
            }}
          /> */}
        </div>
      </div>
    </>
  );
}
