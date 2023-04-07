import { useRecoilState } from 'recoil';
import IconButton from '../IconButton';
import { JitsiUserDataAtom, getJitsiUserDataObj } from '../zicopsVcTool.atom';
import styles from './toolbar.module.scss';

export default function BottomIcons({ jitsiApi = null }) {
  const [jitsiUserData, setJitsiUserData] = useRecoilState(JitsiUserDataAtom);
  const { isMicOn, isCameraOn, isHandRaised, isScreenSharing } = jitsiUserData;

  return (
    <div className={`${styles.toolbarBottom}`}>
      <section>
        {/* leave btn */}
        <button
          className={`${styles.leaveBtn}`}
          onClick={() => {
            jitsiApi?.executeCommand('endConference');
            jitsiApi?.dispose();
            setJitsiUserData(
              getJitsiUserDataObj({ ...jitsiUserData, isUserJoined: false, isUserLeftMeet: true })
            );
          }}>
          <img src="/images/svg/vctool/logout.svg" alt="" />
          Leave
        </button>

        {/* mic toggle */}
        <IconButton
          handleClick={() => {
            setJitsiUserData(getJitsiUserDataObj({ ...jitsiUserData, isMicOn: !isMicOn }));
            jitsiApi?.executeCommand('toggleAudio');
          }}
          iconImg={`/images/svg/vctool/mic-${isMicOn ? 'on' : 'off'}.svg`}
          styleClass={`${!isMicOn ? styles.inactiveBtn : styles.activeIcon}`}
        />

        {/* camera toggle */}
        <IconButton
          handleClick={() => {
            setJitsiUserData(getJitsiUserDataObj({ ...jitsiUserData, isCameraOn: !isCameraOn }));
            jitsiApi?.executeCommand('toggleVideo');
          }}
          iconImg={`/images/svg/vctool/videocam-${isCameraOn ? 'on' : 'off'}.svg`}
          styleClass={`${!isCameraOn ? styles.inactiveBtn : styles.activeIcon}`}
        />

        {/* screen share */}
        <IconButton
          handleClick={() => {
            setJitsiUserData(
              getJitsiUserDataObj({ ...jitsiUserData, isScreenSharing: !isScreenSharing })
            );
            jitsiApi?.executeCommand('toggleShareScreen');
          }}
          iconImg={`/images/svg/vctool/present-to-all.svg`}
        />

        {/* raise hand */}
        <IconButton
          handleClick={() => {
            setJitsiUserData(
              getJitsiUserDataObj({ ...jitsiUserData, isHandRaised: !isHandRaised })
            );
            jitsiApi?.executeCommand('toggleRaiseHand');
          }}
          iconImg={`/images/svg/vctool/back-hand${isHandRaised ? '-on' : ''}.svg`}
          styleClass={`${!isHandRaised ? '' : styles.handRaised}`}
        />
      </section>
    </div>
  );
}
