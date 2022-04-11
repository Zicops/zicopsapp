import { useEffect } from 'react';
import { getQueryData } from '../../../helper/api.helper';

export function getNewModuleObject(courseId = '', squenceNumber = 1) {
  return {
    name: '',
    isChapter: false,
    description: '',
    courseId: courseId,
    owner: '',
    duration: 0,
    level: '',
    sequence: squenceNumber,
    setGlobal: false
  };
}

export function getNewChapterObject(courseId = '', moduleId = '', squenceNumber = 1) {
  return {
    name: '',
    description: '',
    moduleId: moduleId,
    courseId: courseId,
    sequence: squenceNumber
  };
}

export function getNewTopicObject(courseId = '', moduleId = '', squenceNumber = 1, chapterId = '') {
  return {
    name: '',
    description: '',
    type: '',
    moduleId: moduleId,
    chapterId: chapterId,
    courseId: courseId,
    sequence: squenceNumber
  };
}

export function getNewTopicContentObject(topicId = '') {
  return {
    language: '',
    topicId: topicId,
    startTime: 0,
    duration: 0,
    skipIntroDuration: 0,
    nextShowTime: 0,
    fromEndTime: 0,
    type: ''
  };
}

export function getNewTopicVideoObject(courseId = '', topicId = '') {
  return {
    courseId: courseId,
    topicId: topicId,
    file: ''
  };
}

export function getNewTopicSubtitleObject(courseId = '', topicId = '') {
  return {
    courseId: courseId,
    topicId: topicId,
    file: ''
  };
}

export function getNewResourceObject(courseId = '', topicId = '') {
  return {
    courseId: courseId,
    name: '',
    type: '',
    topicId: topicId
  };
}

export function getSquenceNumber(arrayOfObj, moduleId) {
  const filteredObjByModule = arrayOfObj.filter((obj) => obj.moduleId === moduleId);

  return filteredObjByModule.length + 1;
}

export function useLoadAndSetDataInContext(QUERY, variables, callbackAfterSuccess = () => {}) {
  const { data, loading, error } = getQueryData(QUERY, variables);

  useEffect(() => {
    if (!data) return;

    callbackAfterSuccess(data, error);
  }, [data]);
}

// export function useLoadAndSetTopicContentInContext(
//   QUERY,
//   topicId,
//   objectKey,
//   updateContext,
//   moduleContextData
// ) {
//   const { module, chapter, topic } = moduleContextData;
//   const { data } = getQueryData(QUERY, {
//     course_id: courseId
//   });

//   useEffect(() => {
//     if (!data) return;
//     if (!data[objectKey]) return;

//     if (objectKey.includes('Module') && module.length) return;
//     if (objectKey.includes('Chapter') && chapter.length) return;
//     if (objectKey.includes('Topic') && topic.length) return;

//     data[objectKey].forEach((d) => {
//       updateContext(d);
//     });
//   }, [data]);
// }
