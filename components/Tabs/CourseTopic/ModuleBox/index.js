import {
  DELETE_COURSE_CHAPTER,
  DELETE_COURSE_MODULE,
  DELETE_COURSE_TOPIC,
  UPDATE_COURSE_CHAPTER,
  UPDATE_COURSE_MODULE,
  UPDATE_COURSE_TOPIC
} from '@/api/Mutations';
import { CUSTOM_ERROR_MESSAGE } from '@/helper/constants.helper';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { useMutation } from '@apollo/client';
import { Fragment, useContext } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { filterAndSortChapter, filterAndSortTopics } from '../../../../helper/data.helper';
import { ChapterAtom, ModuleAtom, TopicAtom } from '../../../../state/atoms/module.atoms';
import { courseContext } from '../../../../state/contexts/CourseContext';
import BlackBox from '../../../common/BlackBox';
import BlackRow from '../../../common/BlackRow';
import IconButton from '../../../common/IconButton';
import styles from '../../courseTabs.module.scss';
import { getSequenceNumber } from '../Logic/courseTopic.helper';

export default function ModuleBox({ mod, activateHandlers, refetchDataAndUpdateRecoil }) {
  const [updateCourseModule] = useMutation(UPDATE_COURSE_MODULE);
  const [updateCourseChapter] = useMutation(UPDATE_COURSE_CHAPTER);
  const [updateCourseTopic] = useMutation(UPDATE_COURSE_TOPIC);

  const { fullCourse } = useContext(courseContext);

  const isChapterPresent = mod.isChapter;
  const {
    activateEditModule,
    constructChapterData,
    activateEditChapter,
    constructTopicData,
    activateEditTopic
  } = activateHandlers;

  const moduleData = useRecoilValue(ModuleAtom);
  const chapterData = useRecoilValue(ChapterAtom);
  const topicData = useRecoilValue(TopicAtom);

  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);

  let filteredAndSortedData = [];
  if (isChapterPresent) {
    filteredAndSortedData = filterAndSortChapter(chapterData, mod.id);
  } else {
    filteredAndSortedData = filterAndSortTopics(topicData, mod.id);
  }

  async function updateSequence(arr, callbackMutation) {
    const _arr = structuredClone(arr);
    const _updatedArr = _arr?.map((item, i) => {
      item.sequence = i + 1;

      return item;
    });

    for (let i = 0; i < _updatedArr.length; i++) {
      const item = _updatedArr[i];
      const sendData = {
        id: item?.id,
        name: item?.name?.trim(),
        description: item?.description?.trim(),
        courseId: item?.courseId,
        sequence: item?.sequence
      };

      await callbackMutation({ variables: sendData }).catch((err) => {
        if (err?.message?.includes(CUSTOM_ERROR_MESSAGE?.nothingToUpdate)) return;

        return setToastMsg({ type: 'danger', message: 'Sequnce Update Error' });
      });
    }
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
            deleteCondition: () => {
              if (!!filteredAndSortedData?.length) {
                setToastMsg({
                  type: 'danger',
                  message: `Delete Module\'s ${isChapterPresent ? 'Chapters' : 'Topics'} First`
                });
                return false;
              }

              return true;
            },
            onDelete: async () => {
              const _mod = moduleData?.filter((m) => m?.id !== mod?.id);
              await updateSequence(_mod, updateCourseModule);
              refetchDataAndUpdateRecoil('module');
            }
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
                      deleteProps={{
                        id: chapter?.id,
                        resKey: 'deleteCourseChapter',
                        mutation: DELETE_COURSE_CHAPTER,
                        deleteCondition: () => {
                          if (!!filteredTopics?.length) {
                            setToastMsg({
                              type: 'danger',
                              message: "Delete Chapter's Topic First"
                            });
                            return false;
                          }
                          return true;
                        },
                        onDelete: async () => {
                          const _chap = filteredAndSortedData?.filter((c) => c?.id !== chapter?.id);
                          await updateSequence(_chap, updateCourseChapter);
                          refetchDataAndUpdateRecoil('chapter');
                        }
                      }}
                    />

                    {filteredTopics &&
                      filteredTopics.map((topic) => {
                        return (
                          <BlackRow
                            key={topic.id}
                            type="small"
                            title={`Topic ${++topicIndex} : ${topic.name}`}
                            editHandler={() => activateEditTopic(topic.id)}
                            deleteProps={{
                              id: topic?.id,
                              resKey: 'deleteCourseTopic',
                              mutation: DELETE_COURSE_TOPIC,
                              onDelete: async () => {
                                const _top = filteredTopics?.filter((t) => t?.id !== topic?.id);
                                await updateSequence(_top, updateCourseTopic);
                                refetchDataAndUpdateRecoil('topic');
                              }
                            }}
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
                    deleteProps={{
                      id: topic?.id,
                      resKey: 'deleteCourseTopic',
                      mutation: DELETE_COURSE_TOPIC,
                      onDelete: async () => {
                        const _top = filteredTopics?.filter((t) => t?.id !== topic?.id);
                        await updateSequence(_top, updateCourseTopic);
                        refetchDataAndUpdateRecoil('topic');
                      }
                    }}
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
