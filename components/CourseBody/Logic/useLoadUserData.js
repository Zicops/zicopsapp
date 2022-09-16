import {
  GET_COURSE_CHAPTERS,
  GET_COURSE_MODULES,
  GET_COURSE_TOPICS,
  GET_COURSE_TOPICS_CONTENT_BY_COURSE_ID,
  GET_TOPIC_RESOURCES_BY_COURSE_ID,
  queryClient
} from '@/api/Queries';
import { userClient } from '@/api/UserMutations';
import {
  GET_USER_BOOKMARKS,
  GET_USER_COURSE_MAPS_BY_COURSE_ID,
  GET_USER_COURSE_PROGRESS,
  GET_USER_NOTES,
  userQueryClient
} from '@/api/UserQueries';
import { getNoteCardObj } from '@/components/CustomVideoPlayer/Logic/customVideoPlayer.helper';
import { loadQueryDataAsync } from '@/helper/api.helper';
import {
  filterAndSortChapter,
  filterAndSortTopicsBasedOnModuleId,
  filterTopicContent,
  sortArrByKeyInOrder
} from '@/helper/data.helper';
import {
  ChapterAtom,
  isLoadingAtom,
  ModuleAtom,
  ResourcesAtom,
  TopicAtom,
  TopicContentAtom
} from '@/state/atoms/module.atoms';
import { FloatingNotesAtom } from '@/state/atoms/notes.atom';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { UserStateAtom } from '@/state/atoms/users.atom';
import { UserCourseDataAtom } from '@/state/atoms/video.atom';
import { courseContext } from '@/state/contexts/CourseContext';
import { userContext } from '@/state/contexts/UserContext';
import { useLazyQuery } from '@apollo/client';
import { useContext, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

export default function useLoadUserData(isPreview, setSelectedModule, getModuleOptions) {
  const { fullCourse } = useContext(courseContext);
  const { setBookmarkData } = useContext(userContext);

  // recoil states
  const userData = useRecoilValue(UserStateAtom);
  const [userCourseData, setUserCourseData] = useRecoilState(UserCourseDataAtom);
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);

  const [moduleData, updateModuleData] = useRecoilState(ModuleAtom);
  const [chapter, updateChapterData] = useRecoilState(ChapterAtom);
  const [topicData, updateTopicData] = useRecoilState(TopicAtom);
  const [topicContent, updateTopicContent] = useRecoilState(TopicContentAtom);
  const [resources, updateResources] = useRecoilState(ResourcesAtom);
  const [isLoading, setIsLoading] = useRecoilState(isLoadingAtom);
  const [floatingNotes, setFloatingNotes] = useRecoilState(FloatingNotesAtom);

  // module, chapter, topic data query obj
  const [loadModuleData, { error: errorModuleData, loading: loadingModuleData }] = useLazyQuery(
    GET_COURSE_MODULES,
    { client: queryClient }
  );
  const [loadChapterData, { error: errorChapterData, loading: loadingChapterData }] = useLazyQuery(
    GET_COURSE_CHAPTERS,
    { client: queryClient }
  );
  const [loadTopicData, { error: errorTopicData }] = useLazyQuery(GET_COURSE_TOPICS, {
    client: queryClient
  });
  const [loadTopicContentData, { error: errorTopicContentData, loading: loadingTopicData }] =
    useLazyQuery(GET_COURSE_TOPICS_CONTENT_BY_COURSE_ID, {
      client: queryClient
    });
  const [loadResourcesData, { error: errorResourcesData, loading: loadingResourceData }] =
    useLazyQuery(GET_TOPIC_RESOURCES_BY_COURSE_ID, {
      client: queryClient
    });

  const [loadUserCourseMaps, { error: errorCourseMapsLoad, loading: loadingCourseMaps }] =
    useLazyQuery(GET_USER_COURSE_MAPS_BY_COURSE_ID, {
      client: userQueryClient
    });
  const [loadUserCourseProgress, { error: errorProgressLoad, loading: loadingCourseProgress }] =
    useLazyQuery(GET_USER_COURSE_PROGRESS, {
      client: userQueryClient
    });

  // load module, chapter, topic data and set in recoil
  useEffect(async () => {
    if (!fullCourse.id) return;
    if (!userData.id) return;

    setIsLoading(
      loadingModuleData &&
        loadingChapterData &&
        loadingTopicData &&
        loadingResourceData &&
        loadingCourseMaps &&
        loadingCourseProgress
    );

    const moduleRes = await loadModuleData({
      variables: { course_id: fullCourse.id },
      fetchPolicy: 'no-cache'
    }).catch((err) => {
      if (err) alert('Module Load Error');
    });
    const chapterRes = await loadChapterData({
      variables: { course_id: fullCourse.id },
      fetchPolicy: 'no-cache'
    }).catch((err) => {
      if (err) alert('Chapter Load Error');
    });
    const topicRes = await loadTopicData({
      variables: { course_id: fullCourse.id },
      fetchPolicy: 'no-cache'
    }).catch((err) => {
      if (err) alert('Module Load Error');
    });
    const topicContentRes = await loadTopicContentData({
      variables: { course_id: fullCourse.id },
      fetchPolicy: 'no-cache'
    }).catch((err) => {
      if (err) alert('Module Load Error');
    });
    const moduleDataLoaded = structuredClone(moduleRes?.data?.getCourseModules);
    const chapterDataLoaded = structuredClone(chapterRes?.data?.getCourseChapters);
    // const topicDataLoaded = topicRes?.data?.getTopics;
    const topicDataLoaded = structuredClone(topicRes?.data?.getTopics);
    const topicContentDataLoaded = topicContentRes?.data?.getTopicContentByCourseId;

    // new logic
    topicDataLoaded
      ?.sort((m1, m2) => m1?.sequence - m2?.sequence)
      ?.forEach((topic) => {
        const filteredTopicContent = filterTopicContent(topicContentDataLoaded, topic?.id);
        // console.log(filteredTopicContent);
        topic.topicContentData = filteredTopicContent;
        topic.userProgress = {};
      });
    chapterDataLoaded?.sort((m1, m2) => m1?.sequence - m2?.sequence);
    moduleDataLoaded
      ?.sort((m1, m2) => m1?.sequence - m2?.sequence)
      ?.forEach((mod) => {
        const filteredChapterData = filterAndSortChapter(chapterDataLoaded, mod?.id);
        const filteredTopicData = filterAndSortTopicsBasedOnModuleId(topicDataLoaded, mod?.id);

        mod.chapterData = filteredChapterData;
        mod.topicData = filteredTopicData;
      });

    const notesDataRes = await loadQueryDataAsync(
      GET_USER_NOTES,
      {
        user_id: userData?.id,
        user_lsp_id: 'Zicops',
        publish_time: Date.now(),
        pageCursor: '',
        pageSize: 9999999999999
      },
      {},
      userClient
    );
    setFloatingNotes(
      notesDataRes?.getUserNotes?.notes
        ?.filter((notes) => notes?.is_active)
        ?.map((noteObj) => getNoteCardObj(noteObj)) || []
    );

    const bookmarkDataRes = await loadQueryDataAsync(
      GET_USER_BOOKMARKS,
      {
        user_id: userData?.id,
        user_lsp_id: 'Zicops',
        publish_time: Date.now(),
        pageCursor: '',
        pageSize: 9999999999999
      },
      {},
      userClient
    );
    // console.log(bookmarkDataRes?.getUserBookmarks?.bookmarks)
    setBookmarkData(bookmarkDataRes?.getUserBookmarks?.bookmarks || []);

    const data = { userCourseMapping: {}, userCourseProgress: [] };

    if (!isPreview) {
      const mapRes = await loadUserCourseMaps({
        variables: { userId: userData?.id, courseId: fullCourse?.id },
        fetchPolicy: 'no-cache'
      });
      // console.log(mapRes);
      if (mapRes?.error && !mapRes?.error?.message?.includes('no user course found'))
        return setToastMsg({ type: 'danger', message: 'user course maps load error' });

      data.userCourseMapping = mapRes?.data?.getUserCourseMapByCourseID[0] || {};

      if (data?.userCourseMapping?.user_course_id) {
        const progressRes = await loadUserCourseProgress({
          variables: {
            userId: userData?.id,
            userCourseId: data?.userCourseMapping?.user_course_id
          },
          fetchPolicy: 'no-cache'
        });
        const courseProgress = progressRes?.data?.getUserCourseProgressByMapId;
        if (courseProgress?.length) data.userCourseProgress = courseProgress;
      }
    }

    setUserCourseData({
      ...userCourseData,
      allModules: moduleDataLoaded,
      activeModule: { index: 0, id: moduleDataLoaded[0]?.id },
      userCourseMapping: data?.userCourseMapping || {},
      userCourseProgress: data?.userCourseProgress || []
    });

    // previous logic
    const sortedData = sortArrByKeyInOrder([...moduleDataLoaded], 'sequence', 1);
    updateModuleData(sortedData || []);
    setSelectedModule(getModuleOptions(sortedData)[0] || {});

    updateChapterData(chapterDataLoaded || []);
    updateTopicData(topicDataLoaded || []);
    updateTopicContent(topicContentDataLoaded || []);

    // loadModuleData({ variables: { course_id: fullCourse.id }, fetchPolicy: 'no-cache' }).then(
    //   ({ data }) => {
    //     if (errorModuleData) alert('Module Load Error');

    //     const sortedData = sortArrByKeyInOrder([...data.getCourseModules], 'sequence', 1);
    //     updateModuleData(sortedData || []);

    //     setSelectedModule(getModuleOptions(sortedData)[0] || {});
    //   }
    // );

    // loadChapterData({ variables: { course_id: fullCourse.id }, fetchPolicy: 'no-cache' }).then(
    //   ({ data }) => {
    //     if (errorChapterData) alert('Chapter Load Error');

    //     updateChapterData(data.getCourseChapters || []);
    //   }
    // );

    // loadTopicData({ variables: { course_id: fullCourse.id }, fetchPolicy: 'no-cache' }).then(
    //   ({ data }) => {
    //     if (errorTopicData) alert('Topic Load Error');

    //     updateTopicData(data.getTopics || []);
    //   }
    // );

    // loadTopicContentData({ variables: { course_id: fullCourse.id }, fetchPolicy: 'no-cache' }).then(
    //   ({ data }) => {
    //     if (errorTopicContentData) alert('Topic Content Load Error');

    //     updateTopicContent(data.getTopicContentByCourseId || []);
    //   }
    // );

    loadResourcesData({ variables: { course_id: fullCourse.id }, fetchPolicy: 'no-cache' }).then(
      ({ data }) => {
        if (errorResourcesData) alert('Resources Load Error');

        updateResources(data.getResourcesByCourseId || []);
      }
    );
  }, [fullCourse?.id, userData.id]);

  useEffect(() => {
    if (errorModuleData) return setToastMsg({ type: 'danger', message: 'Module Load Error' });
    if (errorChapterData) return setToastMsg({ type: 'danger', message: 'Chapter Load Error' });
    if (errorTopicData) return setToastMsg({ type: 'danger', message: 'Topic Load Error' });
    if (errorTopicContentData)
      return setToastMsg({ type: 'danger', message: 'Topic Content Load Error' });
    if (errorResourcesData) return setToastMsg({ type: 'danger', message: 'Resourses Load Error' });
  }, [
    errorModuleData,
    errorChapterData,
    errorTopicData,
    errorTopicContentData,
    errorResourcesData
  ]);
}
