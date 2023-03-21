import IconButton from '@/components/common/IconButton';
import Spinner from '@/components/common/Spinner';
import { AllCourseModulesDataAtom, CourseMetaDataAtom } from '@/state/atoms/courses.atom';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { useRouter } from 'next/router';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import styles from '../adminCourseComps.module.scss';
import useHandleTopicTab from '../Logic/useHandleTopicTab';
import BoxContainer from './BoxContainer';
import TopicRow from './BoxContainer/TopicRow';
import ModulePopUp from './ModulePopUp';
import TopicPopUp from './TopicPopUp';

export default function Topics() {
  const setToastMessage = useRecoilCallback(({ set }) => (message = '', type = 'danger') => {
    set(ToastMsgAtom, { type, message });
  });
  const courseMetaData = useRecoilValue(CourseMetaDataAtom);
  const allModules = useRecoilValue(AllCourseModulesDataAtom);
  const { displayPopUp, setDisplayPopUp, popUpTypes } = useHandleTopicTab();
  const router = useRouter();
  const courseId = router?.query?.courseId || null;

  if (courseId && (allModules == null || !allModules?.every((mod) => mod?.courseId === courseId)))
    return <Spinner />;

  return (
    <>
      {allModules?.map((mod) => {
        return (
          <BoxContainer
            title={`Module ${mod.sequence} : ${mod.name}`}
            editHandler={() => setDisplayPopUp({ data: mod, type: popUpTypes.module })}>
            {mod?.isChapter ? (
              <>
                {/* chapters wise */}
                {mod?.chapters?.map((chapter) => {
                  return (
                    <>
                      <BoxContainer
                        title={`Chapter ${chapter.sequence} : ${chapter.name}`}
                        isChapter={true}>
                        {/* topic */}
                        {mod?.topics?.map((topic) => {
                          if (chapter?.id !== topic?.chapterId) return;

                          return (
                            <TopicRow
                              key={topic.id}
                              type="small"
                              title={`Topic ${topic?.sequence} : ${topic.name}`}
                              editHandler={() =>
                                setDisplayPopUp({ data: topic, type: popUpTypes.topic })
                              }
                            />
                          );
                        })}
                        <IconButton
                          text="Add Topic"
                          styleClasses={styles.addCourseContentBtn}
                          handleClick={() =>
                            setDisplayPopUp({ data: null, type: popUpTypes.topic })
                          }
                        />
                      </BoxContainer>
                    </>
                  );
                })}

                <IconButton
                  text="Add Chapter"
                  styleClasses={styles.addCourseContentBtn}
                  handleClick={() => setDisplayPopUp({ data: null, type: popUpTypes.chapter })}
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
                      editHandler={() => setDisplayPopUp({ data: topic, type: popUpTypes.topic })}
                    />
                  );
                })}

                <IconButton
                  text="Add Topic"
                  styleClasses={styles.addCourseContentBtn}
                  handleClick={() => setDisplayPopUp({ data: null, type: popUpTypes.topic })}
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
          if (!courseMetaData?.expertiseLevel)
            return setToastMessage('Please select at least one expertise level');

          setDisplayPopUp({ data: null, type: popUpTypes.module });
        }}
      />

      {displayPopUp?.type === popUpTypes.module && (
        <ModulePopUp
          modData={displayPopUp?.data}
          closePopUp={() => setDisplayPopUp({ data: null, type: null })}
          popUpState={[displayPopUp?.type, setDisplayPopUp]}
        />
      )}
      {displayPopUp?.type === 'topic' && (
        <TopicPopUp topic={displayPopUp?.data} popUpState={[displayPopUp, setDisplayPopUp]} />
      )}
    </>
  );
}
