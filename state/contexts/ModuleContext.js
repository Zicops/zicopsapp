import { createContext, useState, useReducer, useEffect } from 'react';

export const moduleContext = createContext();

const ModuleContextProvider = (props) => {
 
  const [module, updateModule] = useState({
    id : '',
    name : '',
    isChapter : false,
    description : '',
    courseId : '',
    owner : '',
    duration : 0,
    level : '',
    sequence : 1,
    setGlobal : false
  })
  const addAndUpdateModule = (data) => {
    updateModule({
        ...module, 
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
    })
  }
 
  const [chapter, updateChapter] = useState({
    id : '',
    name : '',
    description : '',
    moduleId : '',
    courseId : '',
    sequence : 1,
  })
  const addAndUpdateChapter = (data) => {
    updateChapter({
        ...chapter, 
        id: data.id,
        name: data.name, 
        description : data.description,
        moduleId : data.moduleId,
        courseId : data.courseId,
        sequence : data.sequence
    })
  }

  const [topic, updateTopic] = useState({
    id : '',
    name : '',
    description : '',
    type : '',
    moduleId : '',
    chapterId : '',
    courseId : '',
    sequence : 1,
  })
  const addAndUpdateTopic = (data) => {
    updateTopic({
        ...topic, 
        id: data.id,
        name: data.name, 
        description : data.description,
        type: data.type, 
        moduleId : data.moduleId,
        chapterId : data.chapterId,
        courseId : data.courseId,
        sequence : data.sequence
    })
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

  const [ topicContent, addTopicContent ] = useState([{
    language : '',
    topicId : '',
    startTime : 0,
    duration : 0,
    skipIntroDuration : 0,
    nextShowTime : 0,
    fromEndTime : 0,
    type : ''
  }])

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

  return (
    <moduleContext.Provider value={{ module, addAndUpdateModule, chapter, addAndUpdateChapter, topic, addAndUpdateTopic, resources, addResourcesToTopic, topicContent, addUpdateTopicContent}}>
      {props.children}
    </moduleContext.Provider>
  );
}
 
export default ModuleContextProvider;