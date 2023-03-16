import { GET_COURSE_CHAPTERS, GET_COURSE_MODULES, GET_COURSE_TOPICS } from '@/api/Queries';
import { loadAndCacheDataAsync } from '@/helper/api.helper';
import { sortArrByKeyInOrder } from '@/helper/data.helper';
import { AllCourseModulesDataAtom } from '@/state/atoms/courses.atom';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

export default function useHandleTopicTab() {
  const [allModules, setAllModules] = useRecoilState(AllCourseModulesDataAtom);
  const [displayPopUp, setDisplayPopUp] = useState({ isDisplay: null, data: null, type: null });

  const router = useRouter();
  const courseId = router?.query?.courseId || null;

  useEffect(() => {
    if (!courseId) return;
    getModuleChapterTopic();
  }, [courseId]);

  async function getModuleChapterTopic() {
    if (!courseId) return;

    const moduleRes = loadAndCacheDataAsync(GET_COURSE_MODULES, { course_id: courseId });
    const chapterRes = loadAndCacheDataAsync(GET_COURSE_CHAPTERS, { course_id: courseId });
    const topicRes = loadAndCacheDataAsync(GET_COURSE_TOPICS, { course_id: courseId });

    const sortedModuleDataArr = sortArrByKeyInOrder((await moduleRes)?.getCourseModules);
    const sortedChapterDataArr = sortArrByKeyInOrder((await chapterRes)?.getCourseChapters);
    const sortedTopicDataArr = sortArrByKeyInOrder((await topicRes)?.getTopics);

    let allChapters = [...sortedChapterDataArr];
    let allTopics = [...sortedTopicDataArr];
    const _allModules = [];

    sortedModuleDataArr?.forEach((mod) => {
      if (!mod?.chapters) mod.chapters = [];

      // if no chapters are present in whole course, filter topics by module id
      if (!allChapters?.length) {
        const chapterData = { generatedId: Math.random(), topicIds: [], topics: [] };

        allTopics = getFilteredTopicData(allTopics, mod?.id, null, chapterData);

        mod?.chapters?.push(chapterData);
      }

      allChapters = allChapters?.filter((chap) => {
        const isChapterMatched = chap?.moduleId === mod?.id;
        let chapterData = {};

        // chapter wise
        if (isChapterMatched) {
          chapterData = { ...chap, topicIds: [], topics: [] };
          allTopics = getFilteredTopicData(allTopics, mod?.id, chap?.id, chapterData);
        }

        // non chapter wise
        if (!isChapterMatched) {
          chapterData = { generatedId: Math.random(), topicIds: [], topics: [] };

          allTopics = getFilteredTopicData(allTopics, mod?.id, null, chapterData);
        }

        mod?.chapters?.push(chapterData);

        return !isChapterMatched;
      });

      _allModules.push(mod);
    });

    setAllModules(_allModules);
  }

  function getFilteredTopicData(topicArr, moduleId, chapterId, chapterData) {
    const _topicArr = structuredClone(topicArr);

    return _topicArr?.filter((topic) => {
      const isTopicMatched = !!chapterId
        ? topic?.chapterId === chapterId
        : topic?.moduleId === moduleId;

      if (isTopicMatched) chapterData?.topics?.push(topic);

      return !isTopicMatched;
    });
  }

  return { displayPopUp, setDisplayPopUp };
}
