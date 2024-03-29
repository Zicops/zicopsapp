import IconButton from '@/components/common/IconButton';
import Spinner from '@/components/common/Spinner';
import { AllCourseModulesDataAtom } from '@/state/atoms/courses.atom';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { useRouter } from 'next/router';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import styles from '../adminCourseComps.module.scss';
import useHandleTopicTab from '../Logic/useHandleTopicTab';
import BoxContainer from './BoxContainer';
import TopicRow from './BoxContainer/TopicRow';
import ChapterPopUp from './ChapterPopUp';
import ModulePopUp from './ModulePopUp';
import TopicPopUp from './TopicPopUp';

export default function Topics() {
  const setToastMessage = useRecoilCallback(({ set }) => (message = '', type = 'danger') => {
    set(ToastMsgAtom, { type, message });
  });
  const allModules = useRecoilValue(AllCourseModulesDataAtom);
  const { displayPopUp, setDisplayPopUp, popUpTypes, isCourseExpertiseAdded } = useHandleTopicTab();
  const router = useRouter();
  const courseId = router?.query?.courseId || null;

  if (allModules == null || !allModules?.every((mod) => mod?.courseId === courseId))
    return <Spinner />;

  return (
    <>
      {allModules?.map((mod) => {
        return (
          <BoxContainer
            key={mod?.id}
            title={`Module ${mod.sequence} : ${mod.name}`}
            editHandler={() => setDisplayPopUp({ data: mod, type: popUpTypes.module })}>
            {mod?.isChapter ? (
              <>
                {/* chapters wise */}
                {mod?.chapters?.map((chapter) => {
                  return (
                    <BoxContainer
                      key={chapter?.id}
                      title={`Chapter ${chapter.sequence} : ${chapter.name}`}
                      isChapter={true}
                      editHandler={() =>
                        setDisplayPopUp({
                          data: { mod, chap: chapter },
                          type: popUpTypes.chapter
                        })
                      }>
                      {/* topic */}
                      {mod?.topics?.map((topic) => {
                        if (chapter?.id !== topic?.chapterId) return;

                        return (
                          <TopicRow
                            key={topic.id}
                            type="small"
                            title={`Topic ${topic?.sequence} : ${topic.name}`}
                            editHandler={() =>
                              setDisplayPopUp({
                                data: { mod, chap: chapter, top: topic },
                                type: popUpTypes.topic
                              })
                            }
                          />
                        );
                      })}
                      <IconButton
                        text="Add Topic"
                        styleClasses={styles.addCourseContentBtn}
                        handleClick={() =>
                          setDisplayPopUp({ data: { mod }, type: popUpTypes.topic })
                        }
                      />
                    </BoxContainer>
                  );
                })}

                <IconButton
                  text="Add Chapter"
                  styleClasses={styles.addCourseContentBtn}
                  handleClick={() =>
                    setDisplayPopUp({ data: { mod, chap: null }, type: popUpTypes.chapter })
                  }
                />
              </>
            ) : (
              <>
                {/* topics */}
                {mod?.topics?.map((topic) => {
                  if (!!topic?.chapterId) return;

                  return (
                    <TopicRow
                      key={topic.id}
                      type="small"
                      title={`Topic ${topic?.sequence} : ${topic.name}`}
                      editHandler={() =>
                        setDisplayPopUp({ data: { mod, top: topic }, type: popUpTypes.topic })
                      }
                    />
                  );
                })}

                <IconButton
                  text="Add Topic"
                  styleClasses={styles.addCourseContentBtn}
                  handleClick={() => setDisplayPopUp({ data: { mod }, type: popUpTypes.topic })}
                />
              </>
            )}
          </BoxContainer>
        );
      })}

      <IconButton
        text="Add Module"
        styleClasses={styles.addCourseContentBtn}
        handleClick={() => {
          if (!isCourseExpertiseAdded)
            return setToastMessage('Please select at least one expertise level');

          setDisplayPopUp({ data: null, type: popUpTypes.module });
        }}
      />

      {/* add edit module */}
      {displayPopUp?.type === popUpTypes.module && (
        <ModulePopUp
          modData={displayPopUp?.data}
          closePopUp={() => setDisplayPopUp({ data: null, type: null })}
          popUpState={[displayPopUp?.type, setDisplayPopUp]}
        />
      )}

      {/* add edit chapter */}
      {displayPopUp?.type === popUpTypes.chapter && (
        <ChapterPopUp
          modData={displayPopUp?.data?.mod}
          chapData={displayPopUp?.data?.chap}
          closePopUp={() => setDisplayPopUp({ data: null, type: null })}
          popUpState={[displayPopUp?.type, setDisplayPopUp]}
        />
      )}

      {/* add edit topic */}
      {displayPopUp?.type === popUpTypes.topic && (
        <TopicPopUp
          topData={displayPopUp?.data?.top}
          chapData={displayPopUp?.data?.chap}
          modData={displayPopUp?.data?.mod}
          closePopUp={() => setDisplayPopUp({ data: null, type: null })}
          popUpState={[displayPopUp?.type, setDisplayPopUp]}
        />
      )}
    </>
  );
}
