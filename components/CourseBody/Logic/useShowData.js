import { useEffect, useRef, useState } from 'react';
import {
  GET_COURSE_CHAPTERS,
  GET_COURSE_MODULES,
  GET_COURSE_TOPICS,
  GET_COURSE_TOPICS_CONTENT
} from '../../../API/Queries';
import { useLoadAndSetDataInContext } from '../../CourseTopics/Logic/courseTopics.helper';
import { tabs } from './courseBody.helper';

export default function useShowData(courseContextData, moduleContextData) {
  const { fullCourse } = courseContextData;
  const {
    module: moduleData,
    chapter: chapterData,
    topic: topicData,
    addAndUpdateModule,
    addAndUpdateChapter,
    addAndUpdateTopic
  } = moduleContextData;

  let myRef = useRef(null);
  const [activeCourseTab, setActiveCourseTab] = useState(tabs[0].name);
  const [selectedModule, setSelectedModule] = useState({});

  useEffect(() => {
    window.scrollTo({ behavior: 'smooth', top: myRef.current?.offsetTop - 200 });
  }, [activeCourseTab]);

  // load module
  useLoadAndSetDataInContext(GET_COURSE_MODULES, { course_id: fullCourse.id }, (data) => {
    if (moduleData.length) return;

    data.getCourseModules.forEach((d) => {
      addAndUpdateModule(d);
    });
  });

  // load chapters
  useLoadAndSetDataInContext(GET_COURSE_CHAPTERS, { course_id: fullCourse.id }, (data) => {
    if (chapterData.length) return;

    data.getCourseChapters.forEach((d) => {
      addAndUpdateChapter(d);
    });
  });

  // load topics
  useLoadAndSetDataInContext(GET_COURSE_TOPICS, { course_id: fullCourse.id }, (data) => {
    if (topicData.length) return;

    data.getTopics.forEach((d) => {
      addAndUpdateTopic(d);
    });
  });

  useEffect(() => {
    setTimeout(() => {
      setSelectedModule(getModuleOptions()[0]);
    }, 1000);
  }, []);
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

  function getModuleOptions() {
    // if (!moduleData.length) return [{ value: '', label: '' }];

    const options = [];
    moduleData.forEach((mod) => {
      options.push({
        value: mod.id,
        label: mod.name
      });
    });

    return options;
  }

  function handleModuleChange(e) {
    const t = this;
    console.log(e, t);
    setSelectedModule(e);
  }

  return {
    myRef,
    showActiveTab,
    activeCourseTab,
    setActiveCourseTab,
    getModuleOptions,
    moduleData,
    handleModuleChange,
    selectedModule
  };
}
