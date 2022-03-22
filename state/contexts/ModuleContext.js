import { createContext, useState, useReducer, useEffect } from 'react';

export const moduleContext = createContext();

const ModuleContextProvider = (props) => {
 
  const [module, updateModule] = useState([])
  const addAndUpdateModule = (data) => {

    let cur_module = module.filter(obj => obj.id === data.id);

    if (cur_module.length > 0){
      const updatedModule = module.map((obj) => {
        if (obj.id === data.id) {
          return { 
            ...obj, 
            id: data.id,
            name: data.name, 
            isChapter : data.isChapter,
            description : data.description,
            courseId : data.courseId,
            owner : data.owner,
            duration : data.duration,
            level : data.level,
            sequence : data.sequence,
            setGlobal : data.setGlobal
          };
        } else return obj;
      });
      updateModule(updatedModule);
    } else {
      updateModule([
          ...module, 
        {  id: data.id,
          name: data.name, 
          isChapter : data.isChapter,
          description : data.description,
          courseId : data.courseId,
          owner : data.owner,
          duration : data.duration,
          level : data.level,
          sequence : data.sequence,
          setGlobal : data.setGlobal
      }])
    }
  }
 
  const [chapter, updateChapter] = useState([])
  const addAndUpdateChapter = (data) => {

    let cur_chapter = chapter.filter(obj => obj.id === data.id);
   
    if (cur_chapter.length > 0){
      const updatedChapter = chapter.map((obj) => {
        if (obj.id === data.id) {
          return { 
            ...obj, 
            id: data.id,
            name: data.name, 
            description : data.description,
            moduleId : data.moduleId,
            courseId : data.courseId,
            sequence : data.sequence
          };
        } else return obj;
      });
      updateChapter(updatedChapter)
    } else {
      updateChapter([
          ...chapter, 
        {  id: data.id,
          name: data.name, 
          description : data.description,
          moduleId : data.moduleId,
          courseId : data.courseId,
          sequence : data.sequence
      }])
    }
    
  }

  const [topic, updateTopic] = useState([])
  const addAndUpdateTopic = (data) => {

    let cur_topic = topic.filter(obj => obj.id === data.id);
    if (cur_topic.length > 0){
      const updatedTopic = topic.map((obj) => {
        if (obj.id === data.id) {
          return { 
            ...obj, 
            id: data.id,
            name: data.name, 
            description : data.description,
            type: data.type, 
            moduleId : data.moduleId,
            chapterId : data.chapterId,
            courseId : data.courseId,
            sequence : data.sequence
          };
        } else return obj;
      });
      updateTopic(updatedTopic);
    } else {
      updateTopic([
        ...topic, 
        {  id: data.id,
          name: data.name, 
          description : data.description,
          type: data.type, 
          moduleId : data.moduleId,
          chapterId : data.chapterId,
          courseId : data.courseId,
          sequence : data.sequence
      }])
    }

  }

  const [resources, addResources] = useState([{
    type : '',
    topicId : '',
    url : '',
    file : {},
  }])
  const addResourcesToTopic = (data) => {
    addResources([
      ...resources, 
      {
        type : data.type,
        topicId : data.topicId,
        url : data.url,
        file : data.file,
    }])
  }

  const [ topicContent, addTopicContent ] = useState([])

  const addUpdateTopicContent = (data) => {
    addTopicContent([
      ...topicContent, 
      {
        language : data.language,
        topicId : data.topicId,
        startTime : data.startTime,
        duration : data.duration,
        skipIntroDuration : data.skipIntroDuration,
        nextShowTime : data.nextShowTime,
        fromEndTime : data.fromEndTime,
        type : data.type,
      }
    ])
  }

  const [topicVideo, setTopicVideo] = useState([]);
  const setCourseTopicVideo = (data) => {
    setTopicVideo([
      ...topicVideo, 
      {
        courseId: data.courseId,
        topicId: data.id,
        file: data.file
      }
    ])
  }
  const [topicSubtitle, setTopicSubtitle] = useState([]);
  const setCourseTopicSubtitle = (data) => {
    setTopicSubtitle([
      ...topicSubtitle, 
      {
        courseId: data.courseId,
        topicId: data.id,
        file: data.file
      }
    ])
  }


  return (
    <moduleContext.Provider value={{ module, addAndUpdateModule, chapter, addAndUpdateChapter, topic, addAndUpdateTopic, resources, addResourcesToTopic, topicContent, addUpdateTopicContent, topicSubtitle, setCourseTopicSubtitle, topicVideo, setCourseTopicVideo}}>
      {props.children}
    </moduleContext.Provider>
  );
}
 
export default ModuleContextProvider;