import { ResourcesAtom } from '@/state/atoms/module.atoms';
import { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { ActiveCourseDataAtom, CourseModulesAtomFamily } from '../atoms/learnerCourseComps.atom';

export default function useHandleResourceSelection() {
  const activeCourseData = useRecoilValue(ActiveCourseDataAtom);
  const moduleData = useRecoilValue(CourseModulesAtomFamily(activeCourseData?.moduleId));
  const resources = useRecoilValue(ResourcesAtom);

  const [selectedResources, setSelectedResources] = useState(null);

  const resourceViewRef = useRef();

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

  useEffect(() => {
    if (!resourceViewRef?.current) return;
    resourceViewRef?.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
      inline: 'nearest',
    });
  }, [selectedResources?.resources]);

  return {
    resourceViewRef,
    isResourcesPresent,
    currentModuleTopicIds,
    selectedResources,
    setSelectedResources,
  };
}
