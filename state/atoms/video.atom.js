import { atom } from 'recoil';

export const VideoAtom = atom({
  key: 'VideoAtom',
  default: getVideoObject()
});

export function getVideoObject(data) {
  return {
    videoSrc: data?.videoSrc || 'videos/zicops-product-demo-learner-panel.mp4',
    type: data?.type || 'mp4',
    startPlayer: data?.startPlayer || false,
    isPreview: data?.isPreview || false,
    currentTopicIndex: data?.currentTopicIndex || 0,

    topicContent: data?.topicContent || [],
    currentTopicContentIndex: data?.currentTopicContentIndex || 0,
    currentSubtitleIndex: data?.currentSubtitleIndex || 0,

    allModuleTopic: data?.allModuleTopic || null,
    currentModuleId: data?.currentModuleId || null,

    allModuleOptions: data?.allModuleOptions || null,
    currentModuleIndex: data?.currentModuleIndex || 0,
    setNewModule: data?.setNewModule || null
  };
}

export const UserCourseDataAtom = atom({
  key: 'UserCourseData',
  default: getUserCourseDataObj()
});

export function getUserCourseDataObj(data) {
  return {
    videoData: data?.videoData || getVideoDataObj(),
    userCourseMapping: data?.userCourseMapping || {},
    userCourseProgress: data?.userCourseProgress || [],
    triggerPlayerToStartAt: data?.triggerPlayerToStartAt || null,
    allModules:
      data?.allModules ||
      [
        // {
        //   chapterData: [],
        //   topicData: [
        //     {
        //       // topic will contain topic content and user progress
        //       topicContentData: [],
        //       userProgress: {}
        //     }
        //   ]
        // }
      ],

    activeModule: data?.activeModule || { id: null, index: null },
    activeTopic: data?.activeTopic || { id: null, index: null },
    activeTopicContent: data?.activeTopicContent || { id: null, index: null },
    activeTopicSubtitle: data?.activeTopicSubtitle || { id: null, index: null }
  };
}

export function getVideoDataObj() {
  return {
    videoSrc: null,
    type: null,
    isPreview: false,
    shouldShowPlayer: false,

    isPlaying: false,
    progress: 0, // o - 100
    speed: 1,
    isMuted: false,
    volume: 0.7
  };
}
