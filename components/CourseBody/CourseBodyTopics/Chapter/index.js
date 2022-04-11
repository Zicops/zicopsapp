import { Skeleton } from '@mui/material';
import { filterAndSortTopics } from '../../../../helper/data.helper';
import TopicBox from '../TopicBox';
import style from './chapter.module.scss'

export default function Chapter({
  topics,
  topicContent,
  name,
  index,
  description,
  chapterId,
  moduleId
}) {
  const filteredAndSortedData = filterAndSortTopics(topics, moduleId, chapterId);

  return (
    <>
      <div className={`${style.chapter_header}`}>
        <div className={`${style.heading}`}>
          <h2>
            Chapter {' '}
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

      {filteredAndSortedData.map((topic, index) => (
        <TopicBox
          key={topic.name}
          index={index + 1}
          name={topic.name}
          description={topic.description}
          duration={topicContent.duration?.toString()}
        />
      ))}
    </>
  );
}
