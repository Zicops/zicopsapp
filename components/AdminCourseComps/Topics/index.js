import BlackBox from '@/components/common/BlackBox';
import BlackRow from '@/components/common/BlackRow';
import IconButton from '@/components/common/IconButton';
import Spinner from '@/components/common/Spinner';
import { AllCourseModulesDataAtom } from '@/state/atoms/courses.atom';
import { useRecoilValue } from 'recoil';
import styles from '../adminCourseComps.module.scss';
import useHandleTopicTab from '../Logic/useHandleTopicTab';
import TopicPopUp from './TopicPopUp';

export default function Topics() {
  const allModules = useRecoilValue(AllCourseModulesDataAtom);
  const { displayPopUp, setDisplayPopUp } = useHandleTopicTab();

  if (allModules == null) return <Spinner />;

  return (
    <>
      {allModules?.map((mod, modIndex) => {
        return (
          <BlackBox>
            {/* module */}
            <BlackRow
              title={`Module ${mod.sequence} : ${mod.name}`}
              type="large"
              //   editHandler={() => activateEditModule(mod.id)}
              //   isDisabled={isDisabled}
              //   deleteProps={{
              //     id: mod?.id,
              //     resKey: 'deleteCourseModule',
              //     mutation: DELETE_COURSE_MODULE,
              //     deleteCondition: () => {
              //       if (!!filteredAndSortedData?.length) {
              //         setToastMsg({
              //           type: 'danger',
              //           message: `Delete Module\'s ${isChapterPresent ? 'Chapters' : 'Topics'} First`
              //         });
              //         return false;
              //       }

              //       return true;
              //     },
              //     onDelete: async () => {
              //       const _mod = moduleData?.filter((m) => m?.id !== mod?.id);
              //       await updateSequence(_mod, updateCourseModule);
              //       refetchDataAndUpdateRecoil('module');
              //     }
              //   }}
            />

            {/* chapter */}
            {mod?.chapters?.map((chapter, chapIndex) => {
              return (
                <>
                  {!!chapter?.name && (
                    <BlackRow
                      type="medium"
                      title={`Chapter ${chapter.sequence} : ${chapter.name}`}
                      // editHandler={() => activateEditChapter(chapter.id)}
                      // isDisabled={isDisabled}
                      // deleteProps={{
                      //   id: chapter?.id,
                      //   resKey: 'deleteCourseChapter',
                      //   mutation: DELETE_COURSE_CHAPTER,
                      //   deleteCondition: () => {
                      //     if (!!filteredTopics?.length) {
                      //       setToastMsg({
                      //         type: 'danger',
                      //         message: "Delete Chapter's Topic First"
                      //       });
                      //       return false;
                      //     }
                      //     return true;
                      //   },
                      //   onDelete: async () => {
                      //     const _chap = filteredAndSortedData?.filter((c) => c?.id !== chapter?.id);
                      //     await updateSequence(_chap, updateCourseChapter);
                      //     refetchDataAndUpdateRecoil('chapter');
                      //   }
                      // }}
                    />
                  )}

                  {/* topic */}
                  {chapter?.topics?.map((topic, i) => {
                    return (
                      <>
                        <BlackRow
                          key={topic.id}
                          type="small"
                          title={`Topic ${topic?.sequence} : ${topic.name}`}
                          editHandler={() =>
                            setDisplayPopUp({ isDisplay: true, data: topic, type: 'topic' })
                          }
                          //   isDisabled={isDisabled}
                          //   deleteProps={{
                          //     id: topic?.id,
                          //     resKey: 'deleteCourseTopic',
                          //     mutation: DELETE_COURSE_TOPIC,
                          //     beforeDelete: async () => await deleteTopicContentOnTopicDelete(topic?.id),
                          //     onDelete: async () => {
                          //       const _top = filteredTopics?.filter((t) => t?.id !== topic?.id);
                          //       await updateSequence(_top, updateCourseTopic);
                          //       refetchDataAndUpdateRecoil('topic');
                          //     }
                          //   }}
                        />

                        {chapter?.topics?.length === i + 1 && (
                          <span className={`${styles.buttonGap}`}>
                            <IconButton
                              text="Add Topic"
                              // isDisabled={isDisabled}
                              // handleClick={() =>
                              //   constructTopicData(
                              //     fullCourse.id,
                              //     mod.id,
                              //     getSequenceNumber(topicData, mod.id)
                              //   )
                              // }
                            />
                          </span>
                        )}
                      </>
                    );
                  })}

                  {mod?.chapters?.length === chapIndex + 1 && (
                    <span className={`${styles.buttonGap}`}>
                      <IconButton
                        text="Add Chapter"
                        // isDisabled={isDisabled}
                        // handleClick={() =>
                        //   constructChapterData(
                        //     fullCourse.id,
                        //     mod.id,
                        //     getSequenceNumber(chapterData, mod.id)
                        //   )
                        // }
                        styleClass="btnGrey"
                      />
                    </span>
                  )}
                </>
              );
            })}
          </BlackBox>
        );
      })}

      <div className="center-element-with-flex">
        <IconButton
          text="Add Module"
          styleClass="btnBlack"
          //   isDisabled={isDisabled}
          //   handleClick={handleModuleClick}
        />
      </div>

      {!!(displayPopUp?.isDisplay && displayPopUp?.type === 'topic') && (
        <TopicPopUp topic={displayPopUp?.data} popUpState={[displayPopUp, setDisplayPopUp]} />
      )}
    </>
  );
}
