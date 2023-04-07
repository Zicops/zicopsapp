import Script from 'next/script';
import propTypes from 'prop-types';
import { useRecoilState } from 'recoil';
import BeforeJoiningCard from './BeforeJoiningCard';
import useHandleVcTool from './Logic/useHandleVcTool';
import BottomIcons from './Toolbar/BottomIcons';
import TopIcons from './Toolbar/TopIcons';
import { JitsiUserDataAtom, MeetCurrentStatusAtom } from './zicopsVcTool.atom';
import styles from './zicopsVcTool.module.scss';

export default function ZicopsVcTool({ meetConfig = {}, jitsiSettings = {}, userData = {} }) {
  const [jitsiUserData, setJitsiUserData] = useRecoilState(JitsiUserDataAtom);
  const [meetCurrentStatus, setMeetCurrentStatus] = useRecoilState(MeetCurrentStatusAtom);

  const { domain, uniqueRoomName } = meetConfig;
  const { configOverwrite, interfaceConfigOverwrite, userInfo } = jitsiSettings;
  const { containerRef, startMeeting, jitsiApi } = useHandleVcTool(
    meetConfig,
    jitsiSettings,
    userData
  );

  return (
    <>
      {!jitsiUserData?.isUserJoined && !jitsiUserData?.isUserLeftMeet && (
        <BeforeJoiningCard startMeeting={startMeeting} />
      )}

      {jitsiUserData?.isUserLeftMeet && <div>User Left Meet</div>}

      <div ref={containerRef} className={`${styles.meetContainer}`}>
        <TopIcons jitsiApi={jitsiApi} />
        <BottomIcons jitsiApi={jitsiApi} />
      </div>

      <Script src={`https://${domain}/external_api.js`} />

      {/* <BottomIcons /> */}
    </>
  );
}

ZicopsVcTool.propTypes = {
  meetConfig: propTypes.shape({
    domain: propTypes.string,
    roomName: propTypes.string,
    moderators: propTypes?.arrayOf(propTypes.string),
    trainers: propTypes?.arrayOf(propTypes.string)
  }),
  jitsiSettings: propTypes.shape({
    configOverwrite: propTypes.object,
    interfaceConfigOverwrite: propTypes.object,
    userInfo: propTypes.object
  })
};
