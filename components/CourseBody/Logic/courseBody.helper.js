import { USER_LSP_ROLE } from '@/helper/constants.helper';
import { atom } from 'recoil';
import { filterAndSortTopicsBasedOnModuleId } from '../../../helper/data.helper';
import Certificates from '../Certificates';
import CourseBodyAbout from '../CourseBodyAbout';
import CourseBodyDiscussion from '../CourseBodyDiscussion';
import CourseBodyNotes from '../CourseBodyNotes';
import CourseBodyResources from '../CourseBodyResources';
import CourseBodyTopics from '../CourseBodyTopics';

export const tabs = [
  {
    name: 'Topics',
    comp: <CourseBodyTopics />,
    roleAccess: [USER_LSP_ROLE.admin, USER_LSP_ROLE.vendor]
  },
  {
    name: 'Resources',
    comp: <CourseBodyResources />,
    roleAccess: [USER_LSP_ROLE.admin, USER_LSP_ROLE.vendor]
  },
  {
    name: 'Notes',
    comp: <CourseBodyNotes />,
    roleAccess: [USER_LSP_ROLE.admin, USER_LSP_ROLE.vendor]
  },
  {
    name: 'Discussion',
    comp: <CourseBodyDiscussion />,
    roleAccess: [USER_LSP_ROLE.admin, USER_LSP_ROLE.vendor]
  },
  // { name: 'Mentor', comp: ' XYZ ' },
  {
    name: 'About',
    comp: <CourseBodyAbout />,
    roleAccess: [USER_LSP_ROLE.admin, USER_LSP_ROLE.vendor]
  },
  {
    name: 'Certificates',
    comp: <Certificates />,
    isHidden: true,
    roleAccess: [USER_LSP_ROLE.admin, USER_LSP_ROLE.vendor]
  }
];

export function getResourceCount(resources, topicId) {
  const filteredResources = resources.filter((r, i) => {
    return r.topicId === topicId;
  });

  return filteredResources.length;
}

export function getNotesCount(notes, topicId) {
  const filteredNotes = notes.filter((n, i) => {
    return n.topic_id === topicId;
  });

  return filteredNotes.length;
}

export function updateVideoData(
  videoData,
  setVideoData,
  idObject,
  topic,
  topicContent,
  allModuleOptions,
  currrentModule,
  setSelectedModule,
  userCourseData,
  setUserCourseData
) {
  const { moduleId, topicId } = idObject;
  const filteredTopicData = filterAndSortTopicsBasedOnModuleId(topic, moduleId);
  const currentTopicIndex = filteredTopicData.findIndex((t) => t.id === topicId);

  const currentModuleIndex = allModuleOptions.findIndex((m) => m.value === currrentModule.value);

  if (!topicContent.length) return;

  setUserCourseData({
    ...userCourseData,
    activeModule: { id: moduleId, index: currentModuleIndex },
    activeTopic: { id: topicId, index: currentTopicIndex }
  });

  setVideoData({
    ...videoData,
    videoSrc: topicContent[0]?.contentUrl || null,
    type: topicContent[0]?.type || null,
    startPlayer: true,
    isPreview: false,
    currentTopicIndex: currentTopicIndex,

    topicContent: topicContent,
    currentTopicContentIndex: 0,
    currentSubtitleIndex: 0,

    allModuleTopic: filteredTopicData,
    currentModuleId: moduleId,

    allModuleOptions: allModuleOptions,
    currentModuleIndex: currentModuleIndex,
    setNewModule: setSelectedModule
  });
}

export const ActiveCourseTabAtom = atom({
  key: 'ActiveCourseTab',
  default: tabs[0].name
});

export const ActiveResourcesAtom = atom({
  key: 'ActiveResources',
  default: null
});

export const SelectedModuleDataAtom = atom({
  key: 'SelectedModuleData',
  default: {}
});
