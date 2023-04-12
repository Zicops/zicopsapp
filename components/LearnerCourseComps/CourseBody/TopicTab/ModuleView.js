import { useRecoilValue } from 'recoil';
import { ActiveCourseDataAtom, CourseModulesAtomFamily } from '../../atoms/learnerCourseComps.atom';
import LineTextWithDescription from '../../common/LineTextWithDescription';
import TopicCard from './TopicCard';

export default function ModuleView() {
  const activeCourseData = useRecoilValue(ActiveCourseDataAtom);
  const moduleData = useRecoilValue(CourseModulesAtomFamily(activeCourseData?.moduleId));

  return (
    <>
      {moduleData?.isChapter ? (
        <>
          {/* chapters wise */}
          {moduleData?.chapters?.map((chapterData) => {
            return (
              <>
                {!!chapterData?.name && (
                  <LineTextWithDescription
                    title={`Chapter ${chapterData?.sequence}: ${chapterData?.name}`}
                    description={chapterData?.description}
                  />
                )}

                {/* topic */}
                {moduleData?.topics?.map((topic) => {
                  if (chapterData?.id !== topic?.chapterId) return;

                  return (
                    <section>
                      <TopicCard key={topic.id} topicId={topic.id} />
                    </section>
                  );
                })}
              </>
            );
          })}
        </>
      ) : (
        <>
          {/* topics */}
          {moduleData?.topics?.map((topic) => {
            if (!!topic?.chapterId) return;

            return (
              <section>
                <TopicCard key={topic.id} topicId={topic.id} />
              </section>
            );
          })}
        </>
      )}
    </>
  );
}

ModuleView.defaultProps = {};

ModuleView.propTypes = {};
