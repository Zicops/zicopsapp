import {
  GET_COURSE,
  GET_COURSE_CHAPTERS,
  GET_COURSE_MODULES,
  GET_COURSE_TOPICS,
  GET_TOPIC_QUIZ,
  GET_TOPIC_RESOURCES_BY_COURSE_ID,
} from '@/api/Queries';
import {
  GET_USER_COURSE_MAPS_BY_COURSE_ID,
  GET_USER_COURSE_PROGRESS,
  userQueryClient,
} from '@/api/UserQueries';
import { loadAndCacheDataAsync } from '@/helper/api.helper';
import { COURSE_MAP_STATUS } from '@/helper/constants.helper';
import { ResourcesAtom } from '@/state/atoms/module.atoms';
import { UserStateAtom } from '@/state/atoms/users.atom';
import { sortArrByKeyInOrder } from '@/utils/array.utils';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilCallback, useRecoilState, useRecoilValue } from 'recoil';
import {
  ActiveCourseDataAtom,
  ActiveCourseHeroAtom,
  AllCourseModulesDataAtom,
  courseHeroObj,
  CourseMetaDataAtom,
  CourseModuleIdsAtom,
  CourseModulesAtomFamily,
  CourseTopcIdsAtom,
  CourseTopicsAtomFamily,
  getCourseMetaDataObj,
  getUserCourseMapDataObj,
  getUserTopicProgressDataObj,
  TopicQuizAtom,
  UserCourseMapDataAtom,
  UserTopicProgressDataAtom,
} from '../atoms/learnerCourseComps.atom';

export default function useLoadCourseData() {
  const [activeHero, setActiveHero] = useRecoilState(ActiveCourseHeroAtom);
  const [activeCourseData, setActiveCourseData] = useRecoilState(ActiveCourseDataAtom);
  const [courseMeta, setCourseMeta] = useRecoilState(CourseMetaDataAtom);
  const [userCourseMapData, setUserCourseMapData] = useRecoilState(UserCourseMapDataAtom);
  const [topicProgressData, setTopicProgressData] = useRecoilState(UserTopicProgressDataAtom);
  const [moduleIds, setModuleIds] = useRecoilState(CourseModuleIdsAtom);
  const [topicIds, setTopicIds] = useRecoilState(CourseTopcIdsAtom);
  const [resources, setResources] = useRecoilState(ResourcesAtom);
  const [allModules, setAllModules] = useRecoilState(AllCourseModulesDataAtom);
  const [topicQuiz, setTopicQuiz] = useRecoilState(TopicQuizAtom);
  const { id: userId } = useRecoilValue(UserStateAtom);

  // callback for atom family
  const addModuleToRecoil = useRecoilCallback(({ set }) => (moduleData, id) => {
    set(CourseModulesAtomFamily(id), moduleData);
  });
  const addTopicToRecoil = useRecoilCallback(({ set }) => (topicData, id) => {
    set(CourseTopicsAtomFamily(id), topicData);
  });

  const router = useRouter();
  const courseId = router.query.courseId || null;
  const topicId = router.query.topicId || null;

  useEffect(() => {
    if (!router?.isReady) return;

    if (topicId && activeCourseData?.topicId !== topicId) {
      setActiveCourseData({ ...activeCourseData, topicId });
      setActiveHero(courseHeroObj.topicPreview);
    }

    loadCourseMetaData();
    loadUserCourseMap();
    loadModuleAndChapterData();
    loadUserTopicProgress();

    loadAllTopicResources();
  }, [router.isReady]);

  useEffect(() => {
    if (!userCourseMapData?.userCourseId) return clearUserProgress();
    if (userCourseMapData?.courseStatus === COURSE_MAP_STATUS.disable) return clearUserProgress();
    if (userCourseMapData?.userCourseId && topicProgressData !== null) return;

    loadUserCourseMap();
    loadUserTopicProgress();

    function clearUserProgress() {
      setTopicProgressData(null);
    }
  }, [userCourseMapData?.userCourseId, userCourseMapData?.courseStatus]);

  useEffect(() => {
    if (!moduleIds?.length) return;
    if (activeCourseData?.moduleId) return;
    if (topicId) return;

    setActiveCourseData({ ...activeCourseData, moduleId: moduleIds[0] });
  }, [moduleIds?.length]);

  useEffect(() => {
    if (!topicIds?.length) return;

    loadAllTopicQuiz(topicIds);
  }, [topicIds?.length]);

  async function loadCourseMetaData() {
    if (!courseId) return;
    if (courseId === courseMeta?.id) return;

    loadAndCacheDataAsync(GET_COURSE, { course_id: [courseId] })
      .then((courseMetaRes) => {
        const _courseMetaData = structuredClone(courseMetaRes?.getCourse?.[0] || {});
        setCourseMeta(
          getCourseMetaDataObj({
            ..._courseMetaData,
            id: _courseMetaData?.id || courseId,
            subCategory: _courseMetaData?.sub_category,
            subCategories: _courseMetaData?.sub_categories,
            expertiseLevel: _courseMetaData?.expertise_level,
            expectedCompletion: _courseMetaData?.expected_completion,
            relatedSkills: _courseMetaData?.related_skills,
            publishDate: _courseMetaData?.publish_date,
            expiryDate: _courseMetaData?.expiry_date,

            createdAt: _courseMetaData?.created_at,
            updatedAt: _courseMetaData?.updated_at,
            createdBy: _courseMetaData?.created_by,
            updatedBy: _courseMetaData?.updated_by,
          }),
        );
      })
      .catch((err) => console.error('Course Load Err:', err));
  }

  async function loadUserCourseMap() {
    if (!courseId) return;
    if (!userId) return;
    if (userCourseMapData?.courseId === courseId && !!userCourseMapData?.userCourseId) return;

    loadAndCacheDataAsync(
      GET_USER_COURSE_MAPS_BY_COURSE_ID,
      { userId, courseId },
      {},
      userQueryClient,
    )
      .then((courseMapRes) => {
        const _courseMapData = structuredClone(courseMapRes?.getUserCourseMapByCourseID?.[0] || {});

        setUserCourseMapData(
          getUserCourseMapDataObj({
            ..._courseMapData,
            userCourseId: _courseMapData?.user_course_id,
            userId: _courseMapData?.user_id,
            userLspId: _courseMapData?.user_lsp_id,
            courseId: _courseMapData?.course_id || courseId,
            courseType: _courseMapData?.course_type,
            addedBy: _courseMapData?.added_by,
            isMandatory: _courseMapData?.is_mandatory,
            endDate: _courseMapData?.end_date,
            courseStatus: _courseMapData?.course_status,

            createdAt: _courseMapData?.created_at,
            updatedAt: _courseMapData?.updated_at,
            createdBy: _courseMapData?.created_by,
            updatedBy: _courseMapData?.updated_by,
          }),
        );
      })
      .catch((err) => console.error('Course Map Load Err:', err));
  }

  async function loadUserTopicProgress() {
    if (!userId) return;
    if (!userCourseMapData?.userCourseId) return;
    if (userCourseMapData?.courseStatus === COURSE_MAP_STATUS.disable) return;
    if (topicProgressData?.length != null) return;

    loadAndCacheDataAsync(
      GET_USER_COURSE_PROGRESS,
      { userId, userCourseId: userCourseMapData?.userCourseId },
      {},
      userQueryClient,
    )
      .then((topicProgressRes) => {
        const _topicProgressData = structuredClone(
          topicProgressRes?.getUserCourseProgressByMapId || [],
        );

        setTopicProgressData(
          _topicProgressData?.map((progress) =>
            getUserTopicProgressDataObj({
              ...progress,
              userCpId: progress?.user_cp_id,
              userId: progress?.user_id,
              userCourseId: progress?.user_course_id,
              topicId: progress?.topic_id,
              topicType: progress?.topic_type,
              status: progress?.status,
              videoProgress: +progress?.video_progress || 0,
              timestamp: progress?.time_stamp,

              createdAt: progress?.created_at,
              updatedAt: progress?.updated_at,
              createdBy: progress?.created_by,
              updatedBy: progress?.updated_by,
            }),
          ),
        );
      })
      .catch((err) => console.error('Course Map Load Err:', err));
  }

  async function loadModuleAndChapterData() {
    if (!courseId) return;
    if (moduleIds?.length != null) return;

    const moduleRes = loadAndCacheDataAsync(GET_COURSE_MODULES, { course_id: courseId });
    const chapterRes = loadAndCacheDataAsync(GET_COURSE_CHAPTERS, { course_id: courseId });
    const topicRes = loadAndCacheDataAsync(GET_COURSE_TOPICS, { course_id: courseId });

    saveCourseModulesChaptersTopicInRecoil(
      (await moduleRes)?.getCourseModules,
      (await chapterRes)?.getCourseChapters,
      (await topicRes)?.getTopics,
    );
  }

  async function loadAllTopicResources() {
    if (!courseId) return;
    if (userCourseMapData?.courseId === courseId && !!userCourseMapData?.userCourseId) return;

    loadAndCacheDataAsync(GET_TOPIC_RESOURCES_BY_COURSE_ID, { course_id: courseId }, {})
      .then((resourcesRes) => {
        const resourcesData = structuredClone(resourcesRes?.getResourcesByCourseId || []);

        setResources(resourcesData);
      })
      .catch((err) => console.error('Topic Resources Load Err:', err));
  }

  async function loadAllTopicQuiz(allTopicIds = []) {
    if (!allTopicIds?.length) return;

    const _allTopicQuiz = allTopicIds?.map((topicId) => {
      return loadAndCacheDataAsync(GET_TOPIC_QUIZ, { topic_id: topicId }).then(
        (res) => res?.getTopicQuizes || [],
      );
    });

    Promise.allSettled(_allTopicQuiz).then((res) => {
      const allQuiz = [];
      res?.map((obj) => allQuiz.push(...obj.value));
      setTopicQuiz(allQuiz);
    });
  }

  // helper functions
  function saveCourseModulesChaptersTopicInRecoil(moduleDataArr, chapterDataArr, topicDataArr) {
    const sortedModuleDataArr = sortArrByKeyInOrder(moduleDataArr);
    const sortedChapterDataArr = sortArrByKeyInOrder(chapterDataArr);
    const sortedTopicDataArr = sortArrByKeyInOrder(topicDataArr);

    let allChapters = [...sortedChapterDataArr];
    let allTopics = [...sortedTopicDataArr];
    const _allModules = [];
    const _moduleIds = [];
    const _topicIds = [];

    sortedModuleDataArr?.forEach((mod) => {
      if (!mod?.chapters) mod.chapters = [];

      // if no chapters are present, filter topics by module id
      if (!allChapters?.length) {
        const chapterData = { generatedId: Math.random(), topicIds: [], topics: [] };

        allTopics = getFilteredTopicData(allTopics, mod?.id, null, chapterData);

        mod?.chapters?.push(chapterData);
      }

      allChapters = allChapters?.filter((chap) => {
        const isChapterMatched = chap?.moduleId === mod?.id;
        const chapterData = { ...chap, topicIds: [], topics: [] };

        allTopics = isChapterMatched
          ? getFilteredTopicData(allTopics, mod?.id, chap?.id, chapterData)
          : allTopics;

        _topicIds.push(...chapterData?.topicIds);
        mod?.chapters?.push(chapterData);

        return !isChapterMatched;
      });

      _allModules.push(mod);
      _moduleIds.push(mod?.id);
      addModuleToRecoil(mod, mod?.id);
    });

    setTopicIds(_topicIds);
    setAllModules(_allModules);
    setModuleIds(_moduleIds);
  }

  function getFilteredTopicData(topicArr, moduleId, chapterId, chapterData) {
    const _topicArr = structuredClone(topicArr);

    return _topicArr?.filter((topic) => {
      const isTopicMatched = !!chapterId
        ? topic?.chapterId === chapterId
        : topic?.moduleId === moduleId;

      if (isTopicMatched) {
        chapterData?.topicIds?.push(topic?.id);
        chapterData?.topics?.push(topic);
      }

      addTopicToRecoil(topic, topic?.id);

      return !isTopicMatched;
    });
  }
}
