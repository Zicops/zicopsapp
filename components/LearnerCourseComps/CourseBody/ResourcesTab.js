import { ResourcesAtom } from '@/state/atoms/module.atoms';
import { Fragment } from 'react';
import { useRecoilValue } from 'recoil';
import LineTextWithDescription from '../common/LineTextWithDescription';
import ResourceFile from '../common/ResourceFile';
import TopicDataCard from '../common/TopicDataCard';
import ZicopsCarousel from '../common/ZicopsCarousel';
import { getTwoRowCarousel } from '../common/ZicopsCarousel/Logic/zicopsCarousel.helper';
import styles from '../learnerCourseComps.module.scss';
import useHandleResourceSelection from '../Logic/useHandleResourceSelection';
import ModuleSelection from './ModuleSelection';

export default function ResourcesTab() {
  const resources = useRecoilValue(ResourcesAtom);

  const {
    isResourcesPresent,
    selectedResources,
    setSelectedResources,
    resourceViewRef,
    currentModuleTopicIds,
  } = useHandleResourceSelection();

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

          <div className={`${styles.resourcesList}`} ref={resourceViewRef}>
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
