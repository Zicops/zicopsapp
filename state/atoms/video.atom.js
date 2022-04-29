import { atom } from 'recoil';

export const VideoAtom = atom({
  key: 'VideoAtom',
  default: {
    videoSrc: 'videos/zicops-product-demo-learner-panel.mp4',
    type: 'mp4',
    topicContent: [],
    startPlayer: false,
    currentTopicIndex: 0,
    allModuleTopic: null,
    currentModuleId: null
  }
});
