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
import { loadAndCacheDataAsync, loadQueryDataAsync } from '@/helper/api.helper';
import { COURSE_MAP_STATUS } from '@/helper/constants.helper';
import { AllCourseModulesDataAtom } from '@/state/atoms/courses.atom';
import { UserStateAtom } from '@/state/atoms/users.atom';
import { sortArrByKeyInOrder } from '@/utils/array.utils';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilCallback, useRecoilState, useRecoilValue } from 'recoil';
import {
  ActiveCourseDataAtom,
  ActiveCourseHeroAtom,
  CourseMetaDataAtom,
  CourseModulesAtomFamily,
  CourseTopicsAtomFamily,
  TopicQuizAtom,
  TopicResourcesAtom,
  UserCourseMapDataAtom,
  UserTopicProgressDataAtom,
  courseHeroObj,
  getCourseMetaDataObj,
  getUserCourseMapDataObj,
  getUserTopicProgressDataObj,
} from '../atoms/learnerCourseComps.atom';

export default function useLoadCourseData() {
  const [activeHero, setActiveHero] = useRecoilState(ActiveCourseHeroAtom);
  const [activeCourseData, setActiveCourseData] = useRecoilState(ActiveCourseDataAtom);
  const [courseMeta, setCourseMeta] = useRecoilState(CourseMetaDataAtom);
  const [userCourseMapData, setUserCourseMapData] = useRecoilState(UserCourseMapDataAtom);
  const [topicProgressData, setTopicProgressData] = useRecoilState(UserTopicProgressDataAtom);
  const [resources, setResources] = useRecoilState(TopicResourcesAtom);
  const [allModules, setAllModules] = useRecoilState(AllCourseModulesDataAtom);
  const [topicQuiz, setTopicQuiz] = useRecoilState(TopicQuizAtom);
  const { id: userId } = useRecoilValue(UserStateAtom);

  const topicData = useRecoilValue(CourseTopicsAtomFamily(activeCourseData?.topicId));

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

    loadCourseMetaData();
    loadUserCourseMap();
    loadModuleAndChapterData();
    loadUserTopicProgress();

    loadAllTopicResources();
  }, [router.isReady]);

  // set topic id in active state if present if url
  useEffect(() => {
    if (!router.isReady) return;
    if (!topicId) return;
    if (activeCourseData?.topicId === topicId) return;

    setActiveCourseData({ ...activeCourseData, topicId });
  }, [router.isReady]);

  // set course hero type based on topic id
  useEffect(() => {
    if (!activeCourseData?.topicId) return setActiveHero(courseHeroObj.courseMetaPreview);

    setActiveHero(topicData?.type?.toLowerCase());
  }, [activeCourseData?.topicId]);

  // remove active topic id if active topic preivew is closed
  useEffect(() => {
    if (![courseHeroObj.courseMetaPreview, courseHeroObj?.coursePreviewVideo]?.includes(activeHero))
      return;
    if (activeCourseData?.topicId == null) return;

    setActiveCourseData((prev) => ({ ...prev, topicId: null }));
  }, [activeHero]);

  // set and remove user course progress on course assign and unassign
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

  // set first module as default when the modules are loaded
  useEffect(() => {
    if (!allModules?.length) return;
    if (activeCourseData?.moduleId) return;
    if (topicId) return;

    setActiveCourseData({ ...activeCourseData, moduleId: allModules?.[0]?.id });
  }, [allModules?.length]);

  // load topic quiz
  useEffect(() => {
    if (!allModules?.length) return;
    if (topicQuiz?.length) return;

    const topicIds = [];
    allModules?.forEach((mod) => mod?.topics?.forEach((top) => topicIds.push(top?.id)));
    loadAllTopicQuiz(topicIds);
  }, [allModules?.length]);

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

    const moduleRes = loadQueryDataAsync(GET_COURSE_MODULES, { course_id: courseId });
    const chapterRes = loadQueryDataAsync(GET_COURSE_CHAPTERS, { course_id: courseId });
    const topicRes = loadQueryDataAsync(GET_COURSE_TOPICS, { course_id: courseId });

    const sortedModuleDataArr = sortArrByKeyInOrder((await moduleRes)?.getCourseModules);
    const sortedChapterDataArr = sortArrByKeyInOrder((await chapterRes)?.getCourseChapters);
    const sortedTopicDataArr = sortArrByKeyInOrder((await topicRes)?.getTopics);

    let allChapters = [...sortedChapterDataArr];
    let allTopics = [...sortedTopicDataArr];
    const _allModules = [];

    allTopics?.forEach((top) => addTopicToRecoil(top, top?.id));

    sortedModuleDataArr?.forEach((mod) => {
      mod.chapters = [];
      mod.topics = [];

      allChapters?.forEach((chap) => chap?.moduleId === mod?.id && mod?.chapters?.push(chap));
      allTopics?.forEach((topic) => topic?.moduleId === mod?.id && mod?.topics?.push(topic));

      addModuleToRecoil(mod, mod?.id);
      _allModules.push(mod);
    });

    setAllModules(_allModules);
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
}
