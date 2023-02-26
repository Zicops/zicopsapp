import { ResourcesAtom } from '@/state/atoms/module.atoms';
import { Fragment, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { ActiveCourseDataAtom, CourseModulesAtomFamily } from '../atoms/learnerCourseComps.atom';
import LineTextWithDescription from '../common/LineTextWithDescription';
import ResourceFile from '../common/ResourceFile';
import TopicDataCard from '../common/TopicDataCard';
import ZicopsCarousel from '../common/ZicopsCarousel';
import { getTwoRowCarousel } from '../common/ZicopsCarousel/Logic/zicopsCarousel.helper';
import styles from '../learnerCourseComps.module.scss';
import ModuleSelection from './ModuleSelection';

export default function ResourcesTab() {
  const activeCourseData = useRecoilValue(ActiveCourseDataAtom);
  const moduleData = useRecoilValue(CourseModulesAtomFamily(activeCourseData?.moduleId));
  const resources = useRecoilValue(ResourcesAtom);

  const [selectedResources, setSelectedResources] = useState(null);

  const currentModuleTopicIds = [];
  moduleData?.chapters?.forEach((chap) => {
    const topicIds = chap?.topicIds?.map((topicId) => topicId);

    return currentModuleTopicIds.push(...topicIds);
  });

  const isResourcesPresent = resources?.some((resource) =>
    currentModuleTopicIds?.includes(resource?.topicId),
  );

  useEffect(() => {
    if (selectedResources?.resources) setSelectedResources(null);
  }, [activeCourseData?.moduleId]);

  let prevType = null;

  return (
    <>
      <ModuleSelection />

      <div className={`${styles.resourceTab}`}>
        {!isResourcesPresent ? (
          <span>No Resources Present</span>
        ) : (
          <ZicopsCarousel
            isNavigation={true}
            isSlidesPerView={3}
            isSlidesPerGroup={1}
            isSpaceBetween={20}
            isLoop={true}
            showAutoPlay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            showPagination={{
              clickable: true,
            }}>
            {getTwoRowCarousel(currentModuleTopicIds, (topicId) => {
              const res = resources?.filter((resource) => resource?.topicId === topicId);

              return (
                <TopicDataCard
                  topicId={topicId}
                  isResources={true}
                  isActive={selectedResources?.topicData?.id === topicId}
                  resourceCount={res?.length}
                  handleClick={(topicData) => setSelectedResources({ topicData, resources: res })}
                />
              );
            })}
          </ZicopsCarousel>
        )}
      </div>

      {!!selectedResources?.resources && (
        <>
          <LineTextWithDescription title={selectedResources?.topicData?.name} />

          <div className={`${styles.resourcesList}`}>
            {selectedResources?.resources?.length === 0 ? (
              <div className={`${styles.resourceType}`}>No Resources Uploaded</div>
            ) : (
              <>
                <div className={`${styles.gridThree}`}>
                  {selectedResources?.resources.map((r, i) => (
                    <Fragment key={r.name + i}>
                      {prevType !== r.type && (
                        <h2 className={`${styles.resourceType}`}>{(prevType = r.type)}</h2>
                      )}

                      <ResourceFile type={r?.type} title={r.name} resourceUrl={r?.url} />
                    </Fragment>
                  ))}
                </div>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
}
