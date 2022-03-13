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

  return (
    <moduleContext.Provider value={{ module, addAndUpdateModule, chapter, addAndUpdateChapter, topic, addAndUpdateTopic }}>
      {props.children}
    </moduleContext.Provider>
  );
}
 
export default ModuleContextProvider;