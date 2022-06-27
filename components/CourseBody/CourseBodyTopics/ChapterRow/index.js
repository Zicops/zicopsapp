import { Skeleton } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { filterAndSortTopics, filterTopicContent } from '../../../../helper/data.helper';
import { isLoadingAtom, TopicContentAtom } from '../../../../state/atoms/module.atoms';
import TopicBox from '../TopicBox';
import style from './chapter.module.scss';

export default function ChapterRow({
  topics,
  name,
  chapterIndex,
  description,
  chapterId,
  moduleId,
  getModuleOptions,
  currrentModule,
  setSelectedModule
}) {
  const filteredAndSortedData = filterAndSortTopics(topics, moduleId, chapterId);

  const isLoading = useRecoilValue(isLoadingAtom);
  const topicContent = useRecoilValue(TopicContentAtom);
  return (
    <>
      <div className={`${style.chapter_header}`}>
        <div className={`${style.heading}`}>
          <h2>
            Chapter{' '}
            {isLoading ? (
              <Skeleton sx={{ bgcolor: 'dimgray' }} variant="text" height={70} width={80} />
            ) : (
              chapterIndex
            )}
            :{' '}
            <span>
              {isLoading ? (
                <Skeleton sx={{ bgcolor: 'dimgray' }} variant="text" height={70} width={100} />
              ) : name ? (
                name
              ) : (
                'N/A'
              )}
            </span>
          </h2>
        </div>
        <div className={`${style.description}`}>
          <p>
            {isLoading ? (
              <Skeleton sx={{ bgcolor: 'dimgray' }} variant="text" height={30} width={500} />
            ) : description ? (
              description
            ) : (
              'N/A'
            )}
          </p>
        </div>
      </div>

      {filteredAndSortedData.map((topic, index) => {
        const filteredTopicContent = filterTopicContent(topicContent, topic.id);

        return (
          <TopicBox
            key={topic.name}
            topicCount={index + 1}
            topic={topic}
            isFirstChapter={chapterIndex === 1 && index === 0}
            topicContent={filteredTopicContent}
            moduleId={moduleId}
            getModuleOptions={getModuleOptions}
            currrentModule={currrentModule}
            setSelectedModule={setSelectedModule}
          />
        );
      })}
    </>
  );
}
