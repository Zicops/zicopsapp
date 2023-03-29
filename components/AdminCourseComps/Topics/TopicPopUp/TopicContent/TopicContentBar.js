import { DELETE_COURSE_TOPIC_CONTENT } from '@/api/Mutations';
import DeleteBtn from '@/components/common/DeleteBtn';
import { TopicContentListAtom } from '@/state/atoms/courses.atom';
import { useRecoilState } from 'recoil';
import styles from '../../../adminCourseComps.module.scss';

export default function TopicContentBar({ contentData = {}, index = null, isDisabled = false }) {
  const [topicContentList, setTopicContentList] = useRecoilState(TopicContentListAtom);

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

          <div>
            {!isDisabled && (
              <DeleteBtn
                id={contentData?.id}
                resKey="deleteTopicContent"
                mutation={DELETE_COURSE_TOPIC_CONTENT}
                onDelete={() => {
                  const _list = structuredClone(topicContentList);
                  const currentTopicIndex = !contentData?.id
                    ? index
                    : _list?.findIndex((tc) => tc?.id === contentData?.id);
                  _list?.splice(currentTopicIndex, 1);

                  setTopicContentList(_list);
                }}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
