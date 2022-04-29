import { atom } from 'recoil';

export const ModuleAtom = atom({
  key: 'Module',
  default: []
});

export const ChapterAtom = atom({
  key: 'Chapter',
  default: []
});

export const TopicAtom = atom({
  key: 'Topic',
  default: []
});

export const TopicContentAtom = atom({
  key: 'TopicContent',
  default: []
});

export const TopicVideoAtom = atom({
  key: 'TopicVideo',
  default: []
});

export const TopicSubtitleAtom = atom({
  key: 'TopicSubtitle',
  default: []
});

export const BingeAtom = atom({
  key: 'Binge',
  default: getBingeObject()
});

export const ResourcesAtom = atom({
  key: 'Resources',
  default: []
});

export const isLoadingAtom = atom({
  key: 'isLoading',
  default: false
});

// object structures which can be used  for reset or immutable new object
export function getModuleObject(data) {
  return {
    courseId: data.courseId,
    sequence: data.sequence || 1,
    id: data.id || '',
    name: data.name || '',
    isChapter: data.isChapter || false,
    description: data.description || '',
    owner: data.owner || '',
    duration: data.duration || 0,
    level: data.level || '',
    setGlobal: data.setGlobal || false
  };
}

export function getChapterObject(data) {
  return {
    courseId: data.courseId,
    moduleId: data.moduleId,
    sequence: data.sequence || 1,
    id: data.id || '',
    name: data.name || '',
    description: data.description || ''
  };
}

export function getTopicObject(data) {
  return {
    courseId: data.courseId,
    moduleId: data.moduleId,
    chapterId: data.chapterId,
    sequence: data.sequence || 1,
    id: data.id || '',
    name: data.name || '',
    description: data.description || '',
    type: data.type || ''
  };
}

export function getTopicContentObject(data) {
  return {
    topicId: data.topicId,
    id: data.id || '',
    language: data.language || '',
    type: data.type || '',
    duration: data.duration || 0
  };
}

export function getTopicVideoObject(data) {
  return {
    courseId: data.courseId,
    contentId: data.contentId,
    file: data.file || null,
    contentUrl: data.contentUrl || null
  };
}
export function getTopicSubtitleObject(data) {
  return {
    courseId: data.courseId,
    contentId: data.contentId,
    file: data.file || null,
    subtitleUrl: data.subtitleUrl || null
  };
}

export function getBingeObject() {
  return {
    startTimeMin: 0,
    startTimeSec: 0,
    skipIntroDuration: 0,
    showTimeMin: 0,
    showTimeSec: 0,
    isFromEnd: false
  };
}

export function getResourcesObject(data) {
  return {
    courseId: data.courseId,
    topicId: data.topicId,
    name: data.name || '',
    type: data.type || '',
    url: data.url || null,
    file: data.file || null
  };
}
