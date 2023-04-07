import { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import {
  JitsiUserDataAtom,
  MeetCurrentStatusAtom,
  getJitsiUserDataObj,
  getMeetCurrentStatusObj
} from '../zicopsVcTool.atom';
import { startJitsiMeet } from './zicopsVcTool.helper';

export default function useHandleVcTool(meetConfig = {}, jitsiSettings = {}, userData = {}) {
  const [jitsiUserData, setJitsiUserData] = useRecoilState(JitsiUserDataAtom);
  const [meetCurrentStatus, setMeetCurrentStatus] = useRecoilState(MeetCurrentStatusAtom);

  const [jitsiApi, setJitsiApi] = useState(null);

  const containerRef = useRef(null);

  const { configOverwrite, interfaceConfigOverwrite, userInfo } = jitsiSettings;

  // reset data
  useEffect(() => {
    setJitsiApi(null);
    setMeetCurrentStatus(getMeetCurrentStatusObj());
    setJitsiUserData(getJitsiUserDataObj());
  }, []);

  // set current user data
  useEffect(() => {
    const isModerator = meetConfig?.moderators?.find((userId) => userId === userData?.id);
    const isTrainer = meetConfig?.trainers?.find((userId) => userId === userData?.id);

    setJitsiUserData(getJitsiUserDataObj({ ...userData, isModerator, isTrainer }));
  }, [userData?.id]);

  // set meet current status
  useEffect(() => {
    setMeetCurrentStatus(
      getMeetCurrentStatusObj({
        ...meetCurrentStatus,
        roomName: meetConfig?.uniqueRoomName
      })
    );
  }, [meetConfig]);

  // hide meet container on leave
  useEffect(() => {
    if (!jitsiUserData?.isUserLeftMeet) return;
    if (!containerRef.current) return;

    containerRef.current.style.display = 'none';
  }, [jitsiUserData?.isUserLeftMeet]);

  function startMeeting() {
    const api = startJitsiMeet({
      domain: meetConfig?.domain,
      uniqueRoomName: meetConfig?.uniqueRoomName,
      parentNode: containerRef?.current,
      isMicOn: jitsiUserData?.isMicOn,
      isCameraOn: jitsiUserData?.isCameraOn,
      onLoad: () => {}
    });

    containerRef.current.style.display = 'block';

    api.executeCommand('displayName', jitsiUserData?.name);
    api.executeCommand('email', jitsiUserData?.email);
    api.executeCommand('avatarUrl', jitsiUserData?.profileImage);
    api.executeCommand('toggleFilmStrip');

    if (jitsiUserData?.isModerator) api.executeCommand('grantModerator', jitsiUserData?.id);

    setJitsiApi(api);
    setJitsiUserData(getJitsiUserDataObj({ ...jitsiUserData, isUserJoined: true }));
  }

  return { containerRef, startMeeting, jitsiApi };
}
