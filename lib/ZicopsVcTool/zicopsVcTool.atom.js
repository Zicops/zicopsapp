import { atom } from 'recoil';

export const JitsiUserDataAtom = atom({
  key: 'JitsiUserData',
  default: getJitsiUserDataObj()
});

export function getJitsiUserDataObj(data = {}) {
  return {
    id: data?.id || null,
    name: data?.name || '',
    email: data?.email || '',
    profileImage: data?.profileImage || '',
    isModerator: data?.isModerator || false,
    isTrainer: data?.isTrainer || false,

    isCameraOn: data?.isCameraOn || false,
    isMicOn: data?.isMicOn || false,
    isScreenSharing: data?.isScreenSharing || false,
    isHandRaised: data?.isHandRaised || false,

    isUserJoined: data?.isUserJoined || false,
    isUserLeftMeet: data?.isUserLeftMeet || false
  };
}

export const MeetCurrentStatusAtom = atom({
  key: 'MeetCurrentStatus',
  default: getMeetCurrentStatusObj()
});

export function getMeetCurrentStatusObj(data = {}) {
  return {
    isMeetActive: data?.isMeetActive || false,

    moderators: data?.moderators || [],
    trainers: data?.trainers || [],

    roomName: data?.roomName || '',
    domain: data?.domain || ''
  };
}
