import { GET_COURSE_CHAPTERS, GET_COURSE_MODULES, GET_COURSE_TOPICS } from '@/api/Queries';
import { loadQueryDataAsync } from '@/helper/api.helper';
import { sortArrByKeyInOrder } from '@/helper/data.helper';
import {
  AllCourseModulesDataAtom,
  CourseCurrentStateAtom,
  CourseMetaDataAtom
} from '@/state/atoms/courses.atom';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

export default function useHandleTopicTab() {
  const courseMetaData = useRecoilValue(CourseMetaDataAtom);
  const courseCurrentState = useRecoilValue(CourseCurrentStateAtom);
  const [allModules, setAllModules] = useRecoilState(AllCourseModulesDataAtom);
  const [displayPopUp, setDisplayPopUp] = useState({ data: null, type: null });
  const [isCourseExpertiseAdded, setIsCourseExpertiseAdded] = useState(null);

  const popUpTypes = { module: 'module', chapter: 'chapter', topic: 'topic' };

  const router = useRouter();
  const courseId = router?.query?.courseId || null;

  // load module topic chapter data
  useEffect(() => {
    if (!courseId) return;

    getModuleChapterTopic();
  }, [courseId]);

  // update course expertise added check
  useEffect(() => {
    setIsCourseExpertiseAdded(!!courseMetaData?.expertiseLevel?.length);
  }, [courseCurrentState?.isSaved]);

  async function getModuleChapterTopic() {
    if (!courseId) return;

    const moduleRes = loadQueryDataAsync(GET_COURSE_MODULES, { course_id: courseId });
    const chapterRes = loadQueryDataAsync(GET_COURSE_CHAPTERS, { course_id: courseId });
    const topicRes = loadQueryDataAsync(GET_COURSE_TOPICS, { course_id: courseId });

    const sortedModuleDataArr = sortArrByKeyInOrder((await moduleRes)?.getCourseModules);
    const sortedChapterDataArr = sortArrByKeyInOrder((await chapterRes)?.getCourseChapters);
    const sortedTopicDataArr = sortArrByKeyInOrder((await topicRes)?.getTopics);

    let allChapters = [...sortedChapterDataArr];
    let allTopics = [...sortedTopicDataArr];
    const _allModules = [];

    sortedModuleDataArr?.forEach((mod) => {
      mod.chapters = [];
      mod.topics = [];

      allChapters?.forEach((chap) => chap?.moduleId === mod?.id && mod?.chapters?.push(chap));
      allTopics?.forEach((topic) => topic?.moduleId === mod?.id && mod?.topics?.push(topic));

      _allModules.push(mod);
    });

    setAllModules(_allModules);
  }

  return { displayPopUp, setDisplayPopUp, popUpTypes, isCourseExpertiseAdded };
}
