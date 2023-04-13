import { AllCourseModulesDataAtom } from '@/state/atoms/courses.atom';
import { useRecoilValue } from 'recoil';
import {
  ActiveCourseDataAtom,
  CourseModulesAtomFamily,
  CourseTopicsAtomFamily,
} from '../atoms/learnerCourseComps.atom';

export default function useHandleTopicSwitch() {
  const activeCourseData = useRecoilValue(ActiveCourseDataAtom);
  const allModules = useRecoilValue(AllCourseModulesDataAtom);
  const topicData = useRecoilValue(CourseTopicsAtomFamily(activeCourseData?.topicId));
  const moduleData = useRecoilValue(CourseModulesAtomFamily(topicData?.moduleId));

  // returns a object of module id and topic id
  function getNextTopicId() {
    if (!activeCourseData?.topicId) return;

    const topicId = activeCourseData?.topicId;
    const moduleId = topicData?.moduleId;

    const nextTopicData = { moduleId: null, topicId: null };
    const currentTopicIndex = moduleData?.topics?.findIndex((top) => top?.id === topicId);
    const currentModuleIndex = allModules?.findIndex((mod) => mod?.id === moduleId);

    // next module first topic if current topic is last topic of current module
    if (currentTopicIndex === moduleData?.topics?.length) {
      // loop until you get next module with topic
      allModules?.forEach((mod, i) => {
        if (i < currentModuleIndex + 1) return;
        if (!!nextTopicData.topicId) return;
        if (!mod?.topics?.length) return;

        nextTopicData.moduleId = mod?.id;
        nextTopicData.topicId = mod?.topics?.[0]?.id;
      });

      return nextTopicData;
    }

    const _nextTopicData = moduleData?.topics?.[currentTopicIndex + 1];
    nextTopicData.moduleId = _nextTopicData?.moduleId;
    nextTopicData.topicId = _nextTopicData?.id;

    return nextTopicData;
  }

  return { getNextTopicId };
}
