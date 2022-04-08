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
  };

  const [resources, addResources] = useState([]);
  const addResourcesToTopic = (data) => {
    console.log('from mod context', data);
    addResources([
      ...resources,
      {
        name: data.name,
        type: data.type,
        topicId: data.topicId,
        url: data.url,
        file: data.file || null
      }
    ]);
  };

  const [topicContent, addTopicContent] = useState({
    language: '',
    topicId: '',
    startTime: 0,
    duration: 0,
    skipIntroDuration: 0,
    nextShowTime: 0,
    fromEndTime: 0,
    type: ''
  });

  const addUpdateTopicContent = (data) => {
    addTopicContent({
      ...topicContent,
      language: data.language,
      topicId: data.topicId,
      startTime: data.startTime,
      duration: data.duration,
      skipIntroDuration: data.skipIntroDuration,
      nextShowTime: data.nextShowTime,
      fromEndTime: data.fromEndTime,
      type: data.type
    });
  };

  const [topicVideo, setTopicVideo] = useState({});
  const setCourseTopicVideo = (data) => {
    setTopicVideo({
      ...topicVideo,
      courseId: data.courseId,
      topicId: data.topicId,
      file: data.file
    });
  };
  const [topicSubtitle, setTopicSubtitle] = useState({});
  const setCourseTopicSubtitle = (data) => {
    setTopicSubtitle({
      ...topicSubtitle,
      courseId: data.courseId,
      topicId: data.topicId,
      file: data.file
    });
  };
  // const setCourseTopicSubtitle = (data) => {
  //   setTopicSubtitle([
  //     ...topicSubtitle,
  //     {
  //       courseId: data.courseId,
  //       topicId: data.id,
  //       file: data.file
  //     }
  //   ])
  // }
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
