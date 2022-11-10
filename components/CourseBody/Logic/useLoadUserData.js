import {
  GET_COURSE_CHAPTERS,
  GET_COURSE_DATA,
  GET_COURSE_MODULES,
  GET_COURSE_TOPICS,
  GET_COURSE_TOPICS_CONTENT_BY_MODULE_ID,
  GET_TOPIC_RESOURCES_BY_COURSE_ID,
  queryClient
} from '@/api/Queries';
import { userClient } from '@/api/UserMutations';
import {
  GET_USER_BOOKMARKS,
  GET_USER_COURSE_MAPS_BY_COURSE_ID,
  GET_USER_COURSE_PROGRESS,
  GET_USER_NOTES,
  GET_USER_QUIZ_ATTEMPTS,
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
import { QuizProgressDataAtom, UserCourseDataAtom } from '@/state/atoms/video.atom';
import { courseContext } from '@/state/contexts/CourseContext';
import { userContext } from '@/state/contexts/UserContext';
import { useLazyQuery } from '@apollo/client';
import { useContext, useEffect, useState } from 'react';
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
  const [quizProgressData, setQuizProgressData] = useRecoilState(QuizProgressDataAtom);

  const [isTopicContentDataLoaded, setIsTopicContentDataLoaded] = useState(false);

  // module, chapter, topic data query obj
  const [loadCourseData, { error: errorCourseData, loading: loadingCourseData }] = useLazyQuery(
    GET_COURSE_DATA,
    { client: queryClient }
  );
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
    useLazyQuery(GET_COURSE_TOPICS_CONTENT_BY_MODULE_ID, {
      client: queryClient
    });
  // const [loadTopicContentData, { error: errorTopicContentData, loading: loadingTopicData }] =
  //   useLazyQuery(GET_COURSE_TOPICS_CONTENT_BY_COURSE_ID, {
  //     client: queryClient
  //   });
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

    updateModuleData([]);
    updateChapterData([]);
    updateTopicData([]);
    updateTopicContent([]);

    // setIsLoading(
    //   loadingModuleData &&
    //     loadingChapterData &&
    //     loadingTopicData &&
    //     // loadingResourceData &&
    //     loadingCourseMaps &&
    //     loadingCourseProgress
    // );

    // const moduleRes = await loadModuleData({
    //   variables: { course_id: fullCourse.id },
    //   fetchPolicy: 'no-cache'
    // }).catch((err) => {
    //   if (err) setToastMsg({ type: 'danger', message: 'Module Load Error' });
    // });
    // const chapterRes = await loadChapterData({
    //   variables: { course_id: fullCourse.id },
    //   fetchPolicy: 'no-cache'
    // }).catch((err) => {
    //   if (err) setToastMsg({ type: 'danger', message: 'Chapter Load Error' });
    // });
    // const topicRes = await loadTopicData({
    //   variables: { course_id: fullCourse.id },
    //   fetchPolicy: 'no-cache'
    // }).catch((err) => {
    //   if (err) setToastMsg({ type: 'danger', message: 'Topic Load Error' });
    // });
    // const topicContentRes = await loadTopicContentData({
    //   variables: { course_id: fullCourse.id },
    //   fetchPolicy: 'no-cache'
    // }).catch((err) => {
    //   if (err) setToastMsg({ type: 'danger', message: 'Topic Content Load Error' });
    // });

    // const topicContentDataLoaded = structuredClone(
    //   topicContentRes?.data?.getTopicContentByCourseId
    // );
    setIsLoading(loadingCourseData);
    const courseDataRes = await loadCourseData({
      variables: { course_id: fullCourse.id },
      fetchPolicy: 'no-cache'
    }).catch((err) => {
      if (err) setToastMsg({ type: 'danger', message: 'Topic Content Load Error' });
    });

    const moduleDataLoaded = structuredClone(courseDataRes?.data?.getCourseModules)?.sort(
      (m1, m2) => {
        const sequenceDiff = m1?.sequence - m2?.sequence;
        if (!sequenceDiff) return m1?.created_at - m2?.created_at;

        return sequenceDiff;
      }
    );
    const chapterDataLoaded = structuredClone(courseDataRes?.data?.getCourseChapters);
    const topicDataLoaded = structuredClone(courseDataRes?.data?.getTopics);
    const topicContentDataLoaded = [];
    // for (let i = 0; i < moduleDataLoaded.length; i++) {
    const mod = moduleDataLoaded?.[0];
    if (mod?.id) {
      const topicContentRes = await loadTopicContentData({
        variables: { module_id: mod?.id },
        fetchPolicy: 'no-cache'
      }).catch((err) => {
        if (err) setToastMsg({ type: 'danger', message: 'Contnent Load Error' });
      });

      if (topicContentRes?.data?.getTopicContentByModuleId?.length) {
        topicContentDataLoaded.push(
          ...structuredClone(topicContentRes?.data?.getTopicContentByModuleId)
        );
      }
    }
    // }

    // new logic
    // chapterDataLoaded
    //   ?.sort((m1, m2) => m1?.sequence - m2?.sequence)
    //   ?.forEach((chapter) => {
    //     const _topics =
    //       _topicDataLoaded
    //         ?.filter((topic) => topic?.chapterId === chapter?.id)
    //         ?.sort((m1, m2) => m1?.sequence - m2?.sequence)
    //         ?.map((topic) => {
    //           const filteredTopicContent = filterTopicContent(topicContentDataLoaded, topic?.id);
    //           // console.log(filteredTopicContent);
    //           topic.topicContentData = filteredTopicContent;
    //           topic.userProgress = {};
    //           return topic;
    //         }) || [];

    //     topicDataLoaded.push(..._topics);
    //   });
    topicDataLoaded
      ?.sort((m1, m2) => m1?.sequence - m2?.sequence)
      ?.forEach((topic) => {
        const filteredTopicContent = filterTopicContent(topicContentDataLoaded, topic?.id);
        // console.log(filteredTopicContent);
        topic.topicContentData = filteredTopicContent;
        topic.userProgress = {};
      });
    chapterDataLoaded?.sort((m1, m2) => m1?.sequence - m2?.sequence);
    moduleDataLoaded?.forEach((mod) => {
      const filteredChapterData = filterAndSortChapter(chapterDataLoaded, mod?.id);
      const filteredTopicData = filterAndSortTopicsBasedOnModuleId(topicDataLoaded, mod?.id);

      mod.chapterData = filteredChapterData;
      mod.topicData = filteredTopicData;
    });
    // if (!isPreview) {
    // const notesDataRes = await loadQueryDataAsync(
    //   GET_USER_NOTES,
    //   {
    //     user_id: userData?.id,
    //     publish_time: Date.now(),
    //     pageCursor: '',
    //     pageSize: 9999999999999,
    //     course_id: fullCourse?.id
    //   },
    //   {},
    //   userClient
    // );
    // setFloatingNotes(
    //   notesDataRes?.getUserNotes?.notes
    //     ?.filter((notes) => notes?.is_active)
    //     ?.map((noteObj) => getNoteCardObj(noteObj)) || []
    // );
    // const bookmarkDataRes = await loadQueryDataAsync(
    //   GET_USER_BOOKMARKS,
    //   {
    //     user_id: userData?.id,
    //     publish_time: Date.now(),
    //     pageCursor: '',
    //     pageSize: 9999999999999,
    //     course_id: fullCourse?.id
    //   },
    //   {},
    //   userClient
    // );
    // // console.log(bookmarkDataRes?.getUserBookmarks?.bookmarks)
    // setBookmarkData(bookmarkDataRes?.getUserBookmarks?.bookmarks || []);
    // const allQuizProgress = [];
    // for (let i = 0; i < topicDataLoaded.length; i++) {
    //   const topic = topicDataLoaded[i];
    //   if (topic?.type !== 'Content') continue;
    //   const quizProgessDataRes = await loadQueryDataAsync(
    //     GET_USER_QUIZ_ATTEMPTS,
    //     { user_id: userData?.id, topic_id: topic?.id },
    //     {},
    //     userClient
    //   );
    //   if (quizProgessDataRes?.getUserQuizAttempts?.length)
    //     allQuizProgress.push(...quizProgessDataRes?.getUserQuizAttempts);
    // }
    // // console.log(bookmarkDataRes?.getUserBookmarks?.bookmarks)
    // // console.log(allQuizProgress);
    // setQuizProgressData(allQuizProgress);
    // const data = { userCourseMapping: {}, userCourseProgress: [] };
    // const mapRes = await loadUserCourseMaps({
    //   variables: { userId: userData?.id, courseId: fullCourse?.id },
    //   fetchPolicy: 'no-cache'
    // }).catch((err) => {
    //   if (err?.message?.includes('no user course found')) return;
    //   if (err) setToastMsg({ type: 'danger', message: 'Course Map Load Error' });
    // });
    // // console.log(mapRes);
    // if (mapRes?.error && !mapRes?.error?.message?.includes('no user course found'))
    //   return setToastMsg({ type: 'danger', message: 'user course maps load error' });
    // data.userCourseMapping = mapRes?.data?.getUserCourseMapByCourseID[0] || {};
    // //in order to not load course progress of self-unassigned course
    // const course_status = parseJson(data?.userCourseMapping);
    // let showCourseProgress = true;
    // if (course_status?.toLowerCase() === 'disabled') {
    //   showCourseProgress = false;
    // }
    // if (data?.userCourseMapping?.user_course_id && showCourseProgress) {
    //   const progressRes = await loadUserCourseProgress({
    //     variables: {
    //       userId: userData?.id,
    //       userCourseId: [data?.userCourseMapping?.user_course_id]
    //     },
    //     fetchPolicy: 'no-cache'
    //   }).catch((err) => {
    //     if (err) setToastMsg({ type: 'danger', message: 'Course Progress Load Error' });
    //   });
    //   const courseProgress = progressRes?.data?.getUserCourseProgressByMapId;
    //   if (courseProgress?.length) data.userCourseProgress = courseProgress;
    // }
    // setUserCourseData({
    //   ...userCourseData,
    //   allModules: moduleDataLoaded,
    //   activeModule: { index: 0, id: moduleDataLoaded[0]?.id },
    //   userCourseMapping: data?.userCourseMapping || {},
    //   userCourseProgress: data?.userCourseProgress || []
    // });
    // }

    // previous logic
    const sortedData = sortArrByKeyInOrder([...moduleDataLoaded], 'sequence', 1);
    updateModuleData(sortedData || []);
    setSelectedModule(getModuleOptions(sortedData)[0] || {});

    updateChapterData(chapterDataLoaded || []);
    updateTopicData(topicDataLoaded || []);
    updateTopicContent(topicContentDataLoaded || []);

    if (!isPreview) {
      // user notes
      const notesDataRes = await loadQueryDataAsync(
        GET_USER_NOTES,
        {
          user_id: userData?.id,
          publish_time: Date.now(),
          pageCursor: '',
          pageSize: 9999999999999,
          course_id: fullCourse?.id
        },
        {},
        userClient
      );
      setFloatingNotes(
        notesDataRes?.getUserNotes?.notes
          ?.filter((notes) => notes?.is_active)
          ?.map((noteObj) => getNoteCardObj(noteObj)) || []
      );

      // user bookmarks
      const bookmarkDataRes = await loadQueryDataAsync(
        GET_USER_BOOKMARKS,
        {
          user_id: userData?.id,
          publish_time: Date.now(),
          pageCursor: '',
          pageSize: 9999999999999,
          course_id: fullCourse?.id
        },
        {},
        userClient
      );
      // console.log(bookmarkDataRes?.getUserBookmarks?.bookmarks)
      setBookmarkData(bookmarkDataRes?.getUserBookmarks?.bookmarks || []);

      // topic quiz
      const allQuizProgress = [];
      for (let i = 0; i < topicDataLoaded.length; i++) {
        const topic = topicDataLoaded[i];
        if (topic?.type !== 'Content') continue;

        const quizProgessDataRes = await loadQueryDataAsync(
          GET_USER_QUIZ_ATTEMPTS,
          { user_id: userData?.id, topic_id: topic?.id },
          {},
          userClient
        );
        if (quizProgessDataRes?.getUserQuizAttempts?.length)
          allQuizProgress.push(...quizProgessDataRes?.getUserQuizAttempts);
      }
      // console.log(bookmarkDataRes?.getUserBookmarks?.bookmarks)
      // console.log(allQuizProgress);
      setQuizProgressData(allQuizProgress);

      // // user course progress
      // const data = { userCourseMapping: {}, userCourseProgress: [] };
      // if (!userCourseData?.userCourseMapping?.user_course_id && userCourseData?.isCourseAssigned) {
      //   const mapRes = await loadUserCourseMaps({
      //     variables: { userId: userData?.id, courseId: fullCourse?.id },
      //     fetchPolicy: 'no-cache'
      //   }).catch((err) => {
      //     if (err?.message?.includes('no user course found')) return;
      //     if (err) setToastMsg({ type: 'danger', message: 'Course Map Load Error' });
      //   });
      //   // console.log(mapRes);
      //   if (mapRes?.error && !mapRes?.error?.message?.includes('no user course found'))
      //     return setToastMsg({ type: 'danger', message: 'user course maps load error' });
      //   data.userCourseMapping = mapRes?.data?.getUserCourseMapByCourseID[0] || {};
      // }

      // //in order to not load course progress of self-unassigned course

      // const course_status = parseJson(data?.userCourseMapping);

      // let showCourseProgress = true;

      // if (course_status?.toLowerCase() === 'disabled') {
      //   showCourseProgress = false;
      // }

      // if (data?.userCourseMapping?.user_course_id && showCourseProgress) {
      //   const progressRes = await loadUserCourseProgress({
      //     variables: {
      //       userId: userData?.id,
      //       userCourseId: [data?.userCourseMapping?.user_course_id]
      //     },
      //     fetchPolicy: 'no-cache'
      //   }).catch((err) => {
      //     if (err) setToastMsg({ type: 'danger', message: 'Course Progress Load Error' });
      //   });
      //   const courseProgress = progressRes?.data?.getUserCourseProgressByMapId;
      //   if (courseProgress?.length) data.userCourseProgress = courseProgress;
      // }

      // console.log(userCourseData?.userCourseMapping);
      // setUserCourseData({
      //   ...userCourseData,
      //   allModules: moduleDataLoaded,
      //   activeModule: { index: 0, id: moduleDataLoaded[0]?.id },
      //   userCourseProgress: data?.userCourseProgress || []
      // });
    }
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
        if (errorResourcesData) setToastMsg({ type: 'danger', message: 'Resources Load Error' });

        updateResources(data.getResourcesByCourseId || []);
      }
    );
  }, [fullCourse?.id, userData?.id]);

  useEffect(async () => {
    if (isPreview) return;
    if (!moduleData?.length) return;
    if (!userCourseData?.userCourseMapping?.user_course_id) return;
    if (!userCourseData?.isCourseAssigned) return;
    if (userCourseData?.userCourseProgress?.length || userCourseData?.allModules?.length) return;

    // user course progress
    //in order to not load course progress of self-unassigned course
    const progressRes = await loadUserCourseProgress({
      variables: {
        userId: userData?.id,
        userCourseId: [userCourseData?.userCourseMapping?.user_course_id]
      },
      fetchPolicy: 'no-cache'
    }).catch((err) => {
      if (err) setToastMsg({ type: 'danger', message: 'Course Progress Load Error' });
    });
    const courseProgress = progressRes?.data?.getUserCourseProgressByMapId;
    const userCourseProgress = courseProgress || [];

    setUserCourseData({
      ...userCourseData,
      allModules: moduleData,
      activeModule: { index: 0, id: moduleData[0]?.id },
      userCourseProgress: userCourseProgress || []
    });
  }, [userCourseData, moduleData]);

  useEffect(async () => {
    if (!moduleData?.length) return;
    if (isTopicContentDataLoaded) return;

    const topicContentDataLoaded = [];
    for (let i = 1; i < moduleData.length; i++) {
      const mod = moduleData?.[1];

      if (mod?.id) {
        const topicContentRes = await loadTopicContentData({
          variables: { module_id: mod?.id },
          fetchPolicy: 'no-cache'
        }).catch((err) => {
          if (err) setToastMsg({ type: 'danger', message: 'Contnent Load Error' });
        });

        if (topicContentRes?.data?.getTopicContentByModuleId?.length) {
          topicContentDataLoaded.push(
            ...structuredClone(topicContentRes?.data?.getTopicContentByModuleId)
          );
        }
      }
    }

    const moduleDataLoaded = structuredClone(moduleData);
    const topicDataLoaded = structuredClone(topicData);

    topicDataLoaded?.forEach((topic) => {
      const filteredTopicContent = filterTopicContent(topicContentDataLoaded, topic?.id);
      // console.log(filteredTopicContent);
      if (filteredTopicContent?.length) topic.topicContentData = filteredTopicContent;
    });

    moduleDataLoaded?.forEach((mod) => {
      const filteredTopicData = filterAndSortTopicsBasedOnModuleId(topicDataLoaded, mod?.id);

      if (filteredTopicData?.length) mod.topicData = filteredTopicData;
    });

    if (moduleDataLoaded?.length) updateModuleData(moduleDataLoaded);
    if (topicDataLoaded?.length) updateTopicData(topicDataLoaded);

    updateTopicContent([...topicContent, ...topicContentDataLoaded]);
    setIsTopicContentDataLoaded(true);
  }, [moduleData]);

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
