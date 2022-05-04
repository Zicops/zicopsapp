import { atom } from 'recoil';

export const VideoAtom = atom({
  key: 'VideoAtom',
  default: getVideoObject()
});

export function getVideoObject() {
  return {
    videoSrc: 'videos/zicops-product-demo-learner-panel.mp4',
    type: 'mp4',
    startPlayer: false,
    isPreview: false,

    topicContent: [],
    currentTopicIndex: 0,

    allModuleTopic: null,
    currentModuleId: null,

    allModuleOptions: null,
    currentModuleIndex: 0,
    setNewModule: null
  };
}
