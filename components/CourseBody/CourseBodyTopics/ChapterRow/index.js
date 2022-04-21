import { Skeleton } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { filterAndSortTopics, filterTopicContent } from '../../../../helper/data.helper';
import { TopicContentAtom } from '../../../../state/atoms/module.atoms';
import TopicBox from '../TopicBox';
import style from './chapter.module.scss';

export default function ChapterRow({ topics, name, index, description, chapterId, moduleId }) {
  const filteredAndSortedData = filterAndSortTopics(topics, moduleId, chapterId);

  const topicContent = useRecoilValue(TopicContentAtom);
  return (
    <>
      <div className={`${style.chapter_header}`}>
        <div className={`${style.heading}`}>
          <h2>
            Chapter{' '}
            {index || (
              <Skeleton sx={{ bgcolor: 'dimgray' }} variant="text" height={70} width={80} />
            )}
            :{' '}
            <span>
              {name || (
                <Skeleton sx={{ bgcolor: 'dimgray' }} variant="text" height={70} width={100} />
              )}
            </span>
          </h2>
        </div>
        <div className={`${style.description}`}>
          <p>
            {description || (
              <Skeleton sx={{ bgcolor: 'dimgray' }} variant="text" height={30} width={500} />
            )}
          </p>
        </div>
      </div>

      {filteredAndSortedData.map((topic, index) => {
        const filteredTopicContent = filterTopicContent(topicContent, topic.id);

        return (
          <TopicBox
            key={topic.name}
            index={index + 1}
            topic={topic}
            topicContent={filteredTopicContent}
          />
        );
      })}
    </>
  );
}
