import { DELETE_COURSE_MODULE } from '@/api/Mutations';
import { Fragment, useContext } from 'react';
import { useRecoilValue } from 'recoil';
import { filterAndSortChapter, filterAndSortTopics } from '../../../../helper/data.helper';
import { ChapterAtom, TopicAtom } from '../../../../state/atoms/module.atoms';
import { courseContext } from '../../../../state/contexts/CourseContext';
import BlackBox from '../../../common/BlackBox';
import BlackRow from '../../../common/BlackRow';
import IconButton from '../../../common/IconButton';
import styles from '../../courseTabs.module.scss';
import { getSequenceNumber } from '../Logic/courseTopic.helper';

export default function ModuleBox({ mod, activateHandlers, refetchDataAndUpdateRecoil }) {
  const { fullCourse } = useContext(courseContext);

  const isChapterPresent = mod.isChapter;
  const {
    activateEditModule,
    constructChapterData,
    activateEditChapter,
    constructTopicData,
    activateEditTopic
  } = activateHandlers;

  const chapterData = useRecoilValue(ChapterAtom);
  const topicData = useRecoilValue(TopicAtom);

  let filteredAndSortedData = [];
  if (isChapterPresent) {
    filteredAndSortedData = filterAndSortChapter(chapterData, mod.id);
  } else {
    filteredAndSortedData = filterAndSortTopics(topicData, mod.id);
  }

  let topicIndex = 0;
  return (
    <div className={`w-100`}>
      <BlackBox>
        <BlackRow
          title={`Module ${mod.sequence} : ${mod.name}`}
          type="large"
          editHandler={() => activateEditModule(mod.id)}
          deleteProps={{
            id: mod?.id,
            resKey: 'deleteCourseModule',
            mutation: DELETE_COURSE_MODULE,
            onDelete: () => refetchDataAndUpdateRecoil('module')
          }}
        />

        {isChapterPresent ? (
          <>
            {filteredAndSortedData &&
              filteredAndSortedData.map((chapter) => {
                const filteredTopics = filterAndSortTopics(topicData, mod.id, chapter.id);

                return (
                  <Fragment key={chapter.id}>
                    <BlackRow
                      type="medium"
                      title={`Chapter ${chapter.sequence} : ${chapter.name}`}
                      editHandler={() => activateEditChapter(chapter.id)}
                    />

                    {filteredTopics &&
                      filteredTopics.map((topic) => {
                        return (
                          <BlackRow
                            key={topic.id}
                            type="small"
                            title={`Topic ${++topicIndex} : ${topic.name}`}
                            editHandler={() => activateEditTopic(topic.id)}
                          />
                        );
                      })}

                    <span className={`${styles.buttonGap}`}>
                      <IconButton
                        text="Add Topic"
                        handleClick={() =>
                          constructTopicData(
                            fullCourse.id,
                            mod.id,
                            getSequenceNumber(topicData, mod.id),
                            chapter.id
                          )
                        }
                      />
                    </span>
                  </Fragment>
                );
              })}

            <span className={`${styles.buttonGap}`}>
              <IconButton
                text="Add Chapter"
                handleClick={() =>
                  constructChapterData(
                    fullCourse.id,
                    mod.id,
                    getSequenceNumber(chapterData, mod.id)
                  )
                }
                styleClass="btnGrey"
              />
            </span>
          </>
        ) : (
          <>
            {filteredAndSortedData &&
              filteredAndSortedData.map((topic) => {
                return (
                  <BlackRow
                    key={topic.id}
                    type="small"
                    title={`Topic ${++topicIndex} : ${topic.name}`}
                    editHandler={() => activateEditTopic(topic.id)}
                  />
                );
              })}

            <span className={`${styles.buttonGap}`}>
              <IconButton
                text="Add Topic"
                handleClick={() =>
                  constructTopicData(fullCourse.id, mod.id, getSequenceNumber(topicData, mod.id))
                }
              />
            </span>
          </>
        )}
      </BlackBox>
    </div>
  );
}
