import { atom } from 'recoil';

export const VideoAtom = atom({
  key: 'VideoAtom',
  default: { topicContent: [], startPlayer: false }
});
