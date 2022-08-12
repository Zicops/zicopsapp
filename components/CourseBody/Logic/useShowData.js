import { GET_USER_COURSE_MAPS, GET_USER_COURSE_PROGRESS, userClient } from '@/api/UserMutations';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { useLazyQuery } from '@apollo/client/react';
import { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import {
  GET_COURSE_CHAPTERS,
  GET_COURSE_MODULES,
  GET_COURSE_TOPICS,
  GET_COURSE_TOPICS_CONTENT_BY_COURSE_ID,
  GET_TOPIC_RESOURCES_BY_COURSE_ID,
  queryClient
} from '../../../API/Queries';
import {
  filterAndSortChapter,
  filterAndSortTopicsBasedOnModuleId,
  filterResources,
  filterTopicContent,
  sortArrByKeyInOrder
} from '../../../helper/data.helper';
import {
  ChapterAtom,
  isLoadingAtom,
  ModuleAtom,
  ResourcesAtom,
  TopicAtom,
  TopicContentAtom
} from '../../../state/atoms/module.atoms';
import { UserCourseDataAtom } from '../../../state/atoms/video.atom';
import { tabs } from './courseBody.helper';

export default function useShowData(courseContextData) {
  const { fullCourse } = courseContextData;

  let myRef = useRef(null);
  const [activeCourseTab, setActiveCourseTab] = useState(tabs[0].name);
  const [selectedModule, setSelectedModule] = useState({});
  const [isResourceShown, setIsResourceShown] = useState(null);
  const [isNotesVisible, setIsNotesVisible] = useState(null);

  useEffect(() => {
    if (activeCourseTab != 'Topics') {
      if (myRef?.current?.getBoundingClientRect()?.top === 70) return;

      window.scrollTo({ behavior: 'smooth', top: myRef.current?.offsetTop - 200 });
    }
  }, [activeCourseTab]);

  // recoil states
  const [userCourseData, setUserCourseData] = useRecoilState(UserCourseDataAtom);
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);

  const [moduleData, updateModuleData] = useRecoilState(ModuleAtom);
  const [chapter, updateChapterData] = useRecoilState(ChapterAtom);
  const [topicData, updateTopicData] = useRecoilState(TopicAtom);
  const [topicContent, updateTopicContent] = useRecoilState(TopicContentAtom);
  const [resources, updateResources] = useRecoilState(ResourcesAtom);
  const [filteredResources, setFilteredResources] = useState([]);
  const [isLoading, setIsLoading] = useRecoilState(isLoadingAtom);

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

  const [loadUserCourseMaps] = useLazyQuery(GET_USER_COURSE_MAPS, { client: userClient });
  const [loadUserCourseProgress] = useLazyQuery(GET_USER_COURSE_PROGRESS, { client: userClient });

  useEffect(() => {
    if (!userCourseData?.activeModule?.id) return;

    if (userCourseData?.activeModule?.id !== selectedModule?.value) {
      setSelectedModule({
        label: `MODULE ${userCourseData?.activeModule?.index + 1}`,
        value: userCourseData?.activeModule?.id
      });
    }
  }, [userCourseData?.activeModule]);

  // load module, chapter, topic data and set in recoil
  useEffect(async () => {
    if (!fullCourse.id) return;
    setIsLoading(
      loadingModuleData && loadingChapterData && loadingTopicData && loadingResourceData
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
    const moduleDataLoaded = moduleRes?.data?.getCourseModules;
    const chapterDataLoaded = chapterRes?.data?.getCourseChapters;
    const topicDataLoaded = topicRes?.data?.getTopics;
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

    const queryVariables = { publish_time: Date.now(), pageSize: 99999999, pageCursor: '' };
    const mapRes = await loadUserCourseMaps({ variables: queryVariables, fetchPolicy: 'no-cache' });
    if (mapRes?.error)
      return setToastMsg({ type: 'danger', message: 'user course maps load error' });

    const currentCourseMap = mapRes?.data?.getUserCourseMaps?.user_courses?.filter(
      (obj) => obj?.course_id === fullCourse?.id
    )[0];

    const data = {};
    if (currentCourseMap?.user_course_id) {
      const progressRes = await loadUserCourseProgress({
        variables: { userCourseId: currentCourseMap?.user_course_id },
        fetchPolicy: 'no-cache'
      });
      const courseProgress = progressRes?.data?.getUserCourseProgressByMapId;
      if (courseProgress?.length) data.userCourseProgress = courseProgress;
    }

    setUserCourseData({
      ...userCourseData,
      allModules: moduleDataLoaded,
      activeModule: { index: 0, id: moduleDataLoaded[0]?.id },
      userCourseMapping: currentCourseMap,
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
  }, [fullCourse]);

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

  // function saveContentInState(data) {
  //   let localData = [...topicContent, ...data];
  //   console.log(localData, topicContent, data);
  //   updateTopicContent(localData);
  // }

  // useEffect(() => {
  //   let localData = [];
  //   topicData.some((t, i) => {
  //     loadTopicContentData({ variables: { topic_id: t.id } }).then(({ data }) => {
  //       localData = [...localData, ...data.getTopicContent];
  //       console.log(i, data, t.id, topicContent, localData);

  //       updateTopicContent(localData);

  //       if (errorTopicContentData) alert('Topic Content Load Error');
  //     });

  //     return false;
  //   });
  // }, [topicData]);

  // useEffect(() => {
  //   console.log('topicContenttopicContent', topicContent);
  // }, [topicContent]);

  // useEffect(() => {
  //   if (activeCourseTab === 'Resources') {
  //     topicData.every((topic) => {
  //       loadResourcesData({ variables: { topic_id: topic.id } }).then(({ data }) => {
  //         console.log(data);
  //         updateResources([...resources, ...data.getTopicResources]);

  //         if (errorResourcesData) alert('Resources Load Error');
  //       });

  //       return false;
  //     });
  //   }
  // }, [activeCourseTab]);

  // load topicContent
  // TODO: call this on activateEditTopic has been called and after currentTopic has id
  //   useLoadAndSetDataInContext(GET_COURSE_TOPICS_CONTENT, { topic_id: currentTopic.id }, (data) => {
  //     if (!data) return;
  //     if (!data.getTopicContent) return;
  //     if (!data.getTopicContent.length) return;

  //     addUpdateTopicContent(data.getTopicContent[0]);
  //     setCourseTopicVideo(data.getTopicContent[0]);
  //     setCourseTopicSubtitle(data.getTopicContent[0]);
  //   });

  function showActiveTab(activeTab) {
    const index = tabs.findIndex((tab) => tab.name === activeTab);
    if (index < 0) return tabs[0].comp;
    return tabs[index].comp;
  }

  function getModuleOptions(data) {
    const options = [];
    if (data) {
      data.forEach((mod) => {
        options.push({
          value: mod.id,
          // label: mod.name
          label: 'MODULE ' + mod.sequence
        });
      });
    } else {
      moduleData?.forEach((mod) => {
        options.push({
          value: mod.id,
          // label: mod.name
          label: 'MODULE ' + mod.sequence
        });
      });
    }

    return options;
  }

  function handleModuleChange(e) {
    setSelectedModule(e);
    setUserCourseData({
      ...userCourseData,
      activeModule: { id: e?.value, index: e?.label?.split(' ')[1] - 1 }
    });
    setIsResourceShown(null);
  }

  function showResources(topic) {
    if (isResourceShown?.includes(topic.id)) {
      setFilteredResources([]);
      setIsResourceShown(null);
      return;
    }

    setFilteredResources(filterResources(resources, topic.id));
    setIsResourceShown(topic.id + '|:|' + topic.name);

    // loadResourcesData({ variables: { topic_id: topic.id } }).then(({ data }) => {
    //   // console.log('data.getTopicResources', data.getTopicResources);
    //   updateResources((prev) => data.getTopicResources);

    //   if (errorResourcesData) alert('Resources Load Error');
    // });
  }

  function toggleNotesVisibility(topic) {
    // update later to filter topic notes from all notes
    if (isNotesVisible?.includes(topic.id)) {
      setIsNotesVisible(null);
      return;
    }

    setIsNotesVisible(topic.id + '|:|' + topic.name);
  }

  return {
    myRef,
    showActiveTab,
    activeCourseTab,
    setActiveCourseTab,
    getModuleOptions,
    handleModuleChange,
    selectedModule,
    setSelectedModule,
    showResources,
    filteredResources,
    isResourceShown,
    isNotesVisible,
    toggleNotesVisibility
  };
}
