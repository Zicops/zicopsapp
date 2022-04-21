import { useLazyQuery } from '@apollo/client/react';
import { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import {
  GET_COURSE_CHAPTERS,
  GET_COURSE_MODULES,
  GET_COURSE_TOPICS,
  GET_COURSE_TOPICS_CONTENT,
  GET_TOPIC_RESOURCES,
  queryClient
} from '../../../API/Queries';
import {
  ChapterAtom,
  ModuleAtom,
  ResourcesAtom,
  TopicAtom,
  TopicContentAtom
} from '../../../state/atoms/module.atoms';
import { tabs } from './courseBody.helper';

export default function useShowData(courseContextData) {
  const { fullCourse } = courseContextData;

  let myRef = useRef(null);
  const [activeCourseTab, setActiveCourseTab] = useState(tabs[0].name);
  const [selectedModule, setSelectedModule] = useState({});
  const [isResourceShown, setIsResourceShown] = useState(null);

  useEffect(() => {
    if (activeCourseTab != 'Topics') {
      window.scrollTo({ behavior: 'smooth', top: myRef.current?.offsetTop - 200 });
    }
  }, [activeCourseTab]);

  // recoil states
  const [moduleData, updateModuleData] = useRecoilState(ModuleAtom);
  const [chapter, updateChapterData] = useRecoilState(ChapterAtom);
  const [topicData, updateTopicData] = useRecoilState(TopicAtom);
  const [topicContent, updateTopicContent] = useRecoilState(TopicContentAtom);
  const [resources, updateResources] = useRecoilState(ResourcesAtom);

  // module, chapter, topic data query obj
  const [loadModuleData, { error: errorModuleData, refetch: refetchModule }] = useLazyQuery(
    GET_COURSE_MODULES,
    {
      client: queryClient
    }
  );
  const [loadChapterData, { error: errorChapterData, refetch: refetchChapter }] = useLazyQuery(
    GET_COURSE_CHAPTERS,
    { client: queryClient }
  );
  const [loadTopicData, { error: errorTopicData, refetch: refetchTopic }] = useLazyQuery(
    GET_COURSE_TOPICS,
    {
      client: queryClient
    }
  );
  const [loadTopicContentData, { error: errorTopicContentData, refetch: refetchTopicContent }] =
    useLazyQuery(GET_COURSE_TOPICS_CONTENT, {
      client: queryClient
    });
  const [loadResourcesData, { error: errorResourcesData, refetch: refetchResources }] =
    useLazyQuery(GET_TOPIC_RESOURCES, {
      client: queryClient
    });

  // load module, chapter, topic data and set in recoil
  useEffect(() => {
    if (!fullCourse.id) return;

    loadModuleData({ variables: { course_id: fullCourse.id } }).then(({ data }) => {
      updateModuleData(data.getCourseModules);

      setSelectedModule(getModuleOptions(data.getCourseModules)[0]);
      if (errorModuleData) alert('Module Load Error');
    });

    loadChapterData({ variables: { course_id: fullCourse.id } }).then(({ data }) => {
      updateChapterData(data.getCourseChapters);

      if (errorChapterData) alert('Chapter Load Error');
    });

    loadTopicData({ variables: { course_id: fullCourse.id } }).then(({ data }) => {
      updateTopicData(data.getTopics);

      if (errorTopicData) alert('Topic Load Error');
    });

    // loadResourcesData({ variables: { topic_id: null } }).then(() => {
    //   if (errorResourcesData) alert('Resources Load Error');
    // });
  }, [fullCourse]);

  // function saveContentInState(data) {
  //   let localData = [...topicContent, ...data];
  //   console.log(localData, topicContent, data);
  //   updateTopicContent(localData);
  // }

  useEffect(() => {
    let localData = [];
    topicData.some((t, i) => {
      loadTopicContentData({ variables: { topic_id: t.id } }).then(({ data }) => {
        localData = [...localData, ...data.getTopicContent];
        console.log(i, data, t.id, topicContent, localData);

        updateTopicContent(localData);

        if (errorTopicContentData) alert('Topic Content Load Error');
      });

      return false;
    });
  }, [topicData]);

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
          label: mod.name
        });
      });
    } else {
      moduleData?.forEach((mod) => {
        options.push({
          value: mod.id,
          label: mod.name
        });
      });
    }

    return options;
  }

  function handleModuleChange(e) {
    setSelectedModule(e);

    updateResources([]);
    setIsResourceShown(null);
  }

  function showResources(topic) {
    // console.log('showres', topic);
    updateResources([]);
    if (isResourceShown?.includes(topic.id)) return;

    loadResourcesData({ variables: { topic_id: topic.id } }).then(({ data }) => {
      // console.log('data.getTopicResources', data.getTopicResources);
      updateResources((prev) => data.getTopicResources);

      setIsResourceShown(topic.id + '|:|' + topic.name);
      if (errorResourcesData) alert('Resources Load Error');
    });
  }

  return {
    myRef,
    showActiveTab,
    activeCourseTab,
    setActiveCourseTab,
    getModuleOptions,
    moduleData,
    handleModuleChange,
    selectedModule,
    showResources,
    isResourceShown
  };
}
