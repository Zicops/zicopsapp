import { Fragment, useContext } from 'react';
import { useRecoilValue } from 'recoil';
import { filterAndSortChapter, filterAndSortTopics } from '../../../../helper/data.helper';
import { ChapterAtom, TopicAtom } from '../../../../state/atoms/module.atoms';
import { courseContext } from '../../../../state/contexts/CourseContext';
import IconButton from '../../../common/IconButton';
import styles from '../courseTopic.module.scss';
import { getSequenceNumber } from '../Logic/courseTopic.helper';
import ModuleBlock from '../ModuleBlock';

export default function ModuleBox({ mod, activateHandlers }) {
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

  return (
    <div className="row my_30">
      <div className={`${styles.moduleBox}`}>
        <ModuleBlock
          title={`Module ${mod.sequence} : ${mod.name}`}
          type="module"
          editHandler={() => activateEditModule(mod.id)}
        />

        {isChapterPresent ? (
          <>
            {filteredAndSortedData &&
              filteredAndSortedData.map((chapter) => {
                const filteredTopics = filterAndSortTopics(topicData, mod.id, chapter.id);

                return (
                  <Fragment key={chapter.id}>
                    <ModuleBlock
                      type="chapter"
                      title={`Chapter ${chapter.sequence} : ${chapter.name}`}
                      editHandler={() => activateEditChapter(chapter.id)}
                    />

                    {filteredTopics &&
                      filteredTopics.map((topic) => {
                        return (
                          <ModuleBlock
                            key={topic.id}
                            type="topic"
                            title={`Topic ${topic.sequence} : ${topic.name}`}
                            editHandler={() => activateEditTopic(topic.id)}
                          />
                        );
                      })}

                    <span className="buttongap">
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

            <span className="buttongap">
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
                  <ModuleBlock
                    key={topic.id}
                    type="topic"
                    title={`Topic ${topic.sequence} : ${topic.name}`}
                    editHandler={() => activateEditTopic(topic.id)}
                  />
                );
              })}

            <span className="buttongap">
              <IconButton
                text="Add Topic"
                handleClick={() =>
                  constructTopicData(fullCourse.id, mod.id, getSequenceNumber(topicData, mod.id))
                }
              />
            </span>
          </>
        )}
      </div>
    </div>
  );
}
