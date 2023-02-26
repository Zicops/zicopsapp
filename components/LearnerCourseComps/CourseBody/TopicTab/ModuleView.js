import PropTypes from 'prop-types';
import { Fragment } from 'react';
import { useRecoilValue } from 'recoil';
import { CourseModulesAtomFamily } from '../../atoms/learnerCourseComps.atom';
import LineTextWithDescription from '../../common/LineTextWithDescription';
import TopicCard from './TopicCard';

export default function ModuleView({ moduleId }) {
  const moduleData = useRecoilValue(CourseModulesAtomFamily(moduleId));

  return (
    <>
      {moduleData?.chapters?.map((chapterData, i) => {
        return (
          <Fragment key={chapterData?.id}>
            {!!chapterData?.name && (
              <LineTextWithDescription
                title={`Chapter ${chapterData?.sequence}: ${chapterData?.name}`}
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
