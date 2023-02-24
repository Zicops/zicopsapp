import PropTypes from 'prop-types';
import { Fragment } from 'react';
import { useRecoilValue } from 'recoil';
import { CourseModulesAtomFamily } from '../../atoms/learnerCourseComps.atom';
import ZicopsSkeleton from '../../common/ZicopsSkeleton';
import styles from '../../learnerCourseComps.module.scss';
import ChapterBlock from './ChapterBlock';
import TopicCard from './TopicCard';

export default function ModuleView({ moduleId }) {
  const moduleData = useRecoilValue(CourseModulesAtomFamily(moduleId));

  const isLoading = !moduleId || moduleData?.length === 0;

  return (
    <>
      <div>
        <p className={styles.moduleName}>
          {isLoading ? (
            <ZicopsSkeleton variant="rounded" height={30} width={200} />
          ) : (
            moduleData?.name
          )}
        </p>

        <p className={styles.moduleDescription}>
          {isLoading ? (
            <>
              <ZicopsSkeleton variant="text" height={30} width={700} />
              <ZicopsSkeleton variant="text" height={30} width={400} />
              <ZicopsSkeleton variant="text" height={30} width={100} />
            </>
          ) : (
            <>
              {moduleData?.description}

              <span>Expertise Level: {moduleData?.level}</span>
            </>
          )}
        </p>
      </div>

      {moduleData?.chapters?.map((chapterData, i) => {
        return (
          <Fragment key={chapterData?.id}>
            {!!chapterData?.name && (
              <ChapterBlock
                name={`Chapter ${chapterData?.sequence}: ${chapterData?.name}`}
                description={chapterData?.description}
              />
            )}

            <section>
              {chapterData?.topicIds?.map((topicId) => (
                <TopicCard key={topicId} topicId={topicId} />
              ))}
            </section>
          </Fragment>
        );
      })}
    </>
  );
}

ModuleView.defaultProps = {
  moduleId: null,
};

ModuleView.propTypes = {
  moduleId: PropTypes.string,
};
