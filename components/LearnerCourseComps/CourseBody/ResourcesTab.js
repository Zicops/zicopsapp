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
import { TopicResourcesAtom } from '@/state/atoms/courses.atom';
import { sortArrByKeyInOrder } from '@/utils/array.utils';

export default function ResourcesTab() {
  const resources = useRecoilValue(TopicResourcesAtom);

  const {
    isResourcesPresent,
    selectedTopic,
    setSelectedTopic,
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
              const res = sortArrByKeyInOrder(
                resources?.filter((resource) => resource?.topicId === topicId),
                'type',
              );

              return (
                <TopicDataCard
                  topicId={topicId}
                  isResources={true}
                  isActive={selectedTopic?.topicData?.id === topicId}
                  resourceCount={res?.length}
                  handleClick={(topicData) => {
                    if (selectedTopic?.topicData?.name === topicData?.name)
                      return setSelectedTopic(null);

                    setSelectedTopic({ topicData, resources: res });
                  }}
                />
              );
            })}
          </ZicopsCarousel>
        )}
      </div>

      {!!selectedTopic?.resources && (
        <>
          <LineTextWithDescription title={selectedTopic?.topicData?.name} />

          <div className={`${styles.resourcesList}`} ref={resourceViewRef}>
            {selectedTopic?.resources?.length === 0 ? (
              <div className={`${styles.resourceType}`}>No Resources Uploaded</div>
            ) : (
              <>
                <div className={`${styles.gridThree}`}>
                  {selectedTopic?.resources.map((r, i) => (
                    <Fragment key={r.name + i}>
                      {prevType !== r.type && (
                        <h2 className={`${styles.resourceType}`}>{(prevType = r.type)}</h2>
                      )}

                      <ResourceFile type={r?.type} name={r.name} resourceUrl={r?.url} />
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
