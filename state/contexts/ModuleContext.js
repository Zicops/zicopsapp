import { createContext, useState, useReducer, useEffect } from 'react';

export const moduleContext = createContext();

const ModuleContextProvider = (props) => {
  const [module, updateModule] = useState([]);
  let moduleData = [];

  const addAndUpdateModule = (data) => {
    moduleData = [...module, ...moduleData];
    let cur_module = moduleData.filter((obj) => obj.id === data.id);

    if (cur_module.length > 0) {
      moduleData = moduleData.map((obj) => {
        if (obj.id === data.id) {
          return {
            ...obj,
            id: data.id,
            name: data.name,
            isChapter: data.isChapter,
            description: data.description,
            courseId: data.courseId,
            owner: data.owner,
            duration: data.duration,
            level: data.level,
            sequence: data.sequence,
            setGlobal: data.setGlobal
          };
        } else return obj;
      });
    } else {
      moduleData.push({
        id: data.id,
        name: data.name,
        isChapter: data.isChapter,
        description: data.description,
        courseId: data.courseId,
        owner: data.owner,
        duration: data.duration,
        level: data.level,
        sequence: data.sequence,
        setGlobal: data.setGlobal
      });
    }

    updateModule(moduleData);
  };

  const [chapter, updateChapter] = useState([]);
  let chapterData = [];

  const addAndUpdateChapter = (data) => {
    chapterData = [...chapter, ...chapterData];
    let cur_chapter = chapterData.filter((obj) => obj.id === data.id);

    if (cur_chapter.length > 0) {
      chapterData = chapterData.map((obj) => {
        if (obj.id === data.id) {
          return {
            ...obj,
            id: data.id,
            name: data.name,
            description: data.description,
            moduleId: data.moduleId,
            courseId: data.courseId,
            sequence: data.sequence
          };
        } else return obj;
      });
    } else {
      chapterData.push({
        id: data.id,
        name: data.name,
        description: data.description,
        moduleId: data.moduleId,
        courseId: data.courseId,
        sequence: data.sequence
      });
    }

    updateChapter(chapterData);
  };

  const [topic, updateTopic] = useState([]);
  let topicData = [];

  const addAndUpdateTopic = (data) => {
    topicData = [...topic, ...topicData];
    let cur_topic = topicData.filter((obj) => obj.id === data.id);

    if (cur_topic.length > 0) {
      topicData = topicData.map((obj) => {
        if (obj.id === data.id) {
          return {
            ...obj,
            id: data.id,
            name: data.name,
            description: data.description,
            type: data.type,
            moduleId: data.moduleId,
            chapterId: data.chapterId,
            courseId: data.courseId,
            sequence: data.sequence
          };
        } else return obj;
      });
    } else {
      topicData.push({
        id: data.id,
        name: data.name,
        description: data.description,
        type: data.type,
        moduleId: data.moduleId,
        chapterId: data.chapterId,
        courseId: data.courseId,
        sequence: data.sequence
      });
    }
    updateTopic(topicData);
    // const dataUpdated = await new Promise((res, rej) => {

    // })
  };

  const [resources, addResources] = useState([]);
  let resourcesData = [];
  const addResourcesToTopic = (data) => {
    if (data === 'clear') {
      resourcesData = [];
      addResources([]);
      return;
    }

    resourcesData = [...resources, ...resourcesData];
    resourcesData.push({
      name: data.name,
      type: data.type,
      topicId: data.topicId,
      courseId: data.courseId,
      url: data.url,
      file: data.file || null
    });

    addResources(resourcesData);
  };

  const [topicContent, addTopicContent] = useState([]);
  let topicContentData = [];

  const addUpdateTopicContent = (data) => {
    if (data === 'clear') {
      topicContentData = [];
      addTopicContent([]);
      return;
    }

    topicContentData = [...topicContent, ...topicContentData];
    let currentTopicContent = topicContentData.filter((obj) => obj.language === data.language);

    if (!data.language && !data.type) return;

    console.log('before', topicContentData);
    if (currentTopicContent.length > 0) {
      console.log('if');
      topicContentData = topicContentData.map((obj) => {
        console.log(obj, data, obj.language, data.language, obj.language === data.language);
        if (obj.language === data.language) {
          return {
            id: data.id || obj.id || '',
            language: data.language || obj.language,
            topicId: data.topicId || obj.topicId,
            startTime: data.startTime || obj.startTime,
            duration: data.duration || obj.duration,
            skipIntroDuration: data.skipIntroDuration || obj.skipIntroDuration,
            nextShowTime: data.nextShowTime || obj.nextShowTime,
            fromEndTime: data.fromEndTime || obj.fromEndTime,
            type: data.type || obj.type,
            isUpdated: data.isUpdated || false
          };
        } else {
          return obj;
        }
      });
    } else {
      console.log('else');
      topicContentData.push({
        id: data.id || '',
        language: data.language,
        topicId: data.topicId,
        startTime: data.startTime,
        duration: data.duration,
        skipIntroDuration: data.skipIntroDuration,
        nextShowTime: data.nextShowTime,
        fromEndTime: data.fromEndTime,
        type: data.type,
        isUpdated: data.isUpdated || false
      });
    }
    console.log('oout if');
    console.log('after', topicContentData);
    addTopicContent(topicContentData);
  };

  const [topicVideo, setTopicVideo] = useState([]);
  let topicVideoData = [];

  const setCourseTopicVideo = (data) => {
    if (data === 'clear') {
      topicVideoData = [];
      setTopicVideo([]);
      return;
    }

    topicVideoData = [...topicVideo, ...topicVideoData];
    topicVideoData.push({
      courseId: data.courseId,
      contentId: data.contentId,
      contentIndex: data.contentIndex,
      file: data.file,
      contentUrl: data.contentUrl
    });

    setTopicVideo(topicVideoData);
  };

  const [topicSubtitle, setTopicSubtitle] = useState([]);
  let topicSubtitleData = [];

  const setCourseTopicSubtitle = (data) => {
    if (data === 'clear') {
      topicSubtitleData = [];
      setTopicSubtitle([]);
      return;
    }

    topicSubtitleData = [...topicSubtitle, ...topicSubtitleData];
    topicSubtitleData.push({
      courseId: data.courseId,
      contentId: data.contentId,
      contentIndex: data.contentIndex,
      file: data.file,
      subtitleUrl: data.subtitleUrl
    });

    setTopicSubtitle(topicSubtitleData);
  };

  const [contentUploaded, setContentUploaded] = useState(0);

  return (
    <moduleContext.Provider
      value={{
        module,
        addAndUpdateModule,
        chapter,
        addAndUpdateChapter,
        topic,
        addAndUpdateTopic,
        resources,
        addResourcesToTopic,
        topicContent,
        addUpdateTopicContent,
        topicSubtitle,
        setCourseTopicSubtitle,
        topicVideo,
        setCourseTopicVideo,
        contentUploaded,
        setContentUploaded
      }}>
      {props.children}
    </moduleContext.Provider>
  );
};

export default ModuleContextProvider;
