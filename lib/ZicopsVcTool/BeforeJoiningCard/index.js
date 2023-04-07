import { useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import IconButton from '../IconButton';
import Spinner from '../common/Spinner';
import { JitsiUserDataAtom, getJitsiUserDataObj } from '../zicopsVcTool.atom';
import styles from './beforeJoiningCard.module.scss';

export default function BeforeJoiningCard({ startMeeting = () => {} }) {
  const videoRef = useRef(null);
  const [jitsiUserData, setJitsiUserData] = useRecoilState(JitsiUserDataAtom);
  const [isLoading, setIsLoading] = useState(null);

  const { isMicOn, isCameraOn } = jitsiUserData;

  useEffect(() => {
    toggleCameraPreview();
  }, [isCameraOn]);

  function toggleCameraPreview() {
    setIsLoading(true);
    const video = videoRef.current;

    if (!isCameraOn) {
      // turn off the camera and video preivew
      try {
        let stream = video.srcObject;
        let tracks = stream?.getTracks();
        for (let i = 0; i < tracks.length; i++) {
          let track = tracks[i];
          track.stop();
        }

        video.pause();
        video.src = '';
        video.srcObject = null;
        video.style.display = 'none';
      } catch (e) {
        console.log(`Error while pausing: `, e);
      }

      setIsLoading(false);
      return;
    }

    // request camera access and display the video preview
    navigator?.mediaDevices
      .getUserMedia({
        video: { width: 545, height: 250 }
      })
      .then((stream) => {
        video.srcObject = stream;
        video.style.display = 'block';
        video.play();
      })
      .catch((err) => console.log(`Error At Camera: `, err))
      .finally(() => setIsLoading(false));
  }

  function getJoinBtnText() {
    if (!!jitsiUserData?.isModerator) return 'Join as Moderator';
    if (!!jitsiUserData?.isTrainer) return 'Join as Trainer';

    return 'Join';
  }

  return (
    <div className={`${styles.lobbyPageContainer}`}>
      <div className={`${styles.preview}`}>
        {!!isLoading && <Spinner />}

        <video id="video" ref={videoRef} autoPlay="true" style={{ display: 'none' }} />

        {!isCameraOn && <img src={jitsiUserData?.profileImage} />}
      </div>

      <div className={`${styles.actionBtns}`}>
        <div>
          {/* mic toggle */}
          <IconButton
            handleClick={() =>
              setJitsiUserData(getJitsiUserDataObj({ ...jitsiUserData, isMicOn: !isMicOn }))
            }
            iconImg={`/images/svg/vctool/mic-${isMicOn ? 'on' : 'off'}.svg`}
            styleClass={`${!isMicOn ? styles.offIcon : styles.activeIcon}`}
          />

          {/* camera toggle */}
          <IconButton
            handleClick={() =>
              setJitsiUserData(getJitsiUserDataObj({ ...jitsiUserData, isCameraOn: !isCameraOn }))
            }
            isDisabled={isLoading}
            iconImg={`/images/svg/vctool/videocam-${isCameraOn ? 'on' : 'off'}.svg`}
            styleClass={`${!isCameraOn ? styles.offIcon : styles.activeIcon}`}
          />

          {/* settings */}
          <IconButton
            iconImg="/images/svg/vctool/settings.svg"
            styleClass={`${styles.activeIcon}`}
          />

          {/* background filter */}
          <IconButton
            iconImg="/images/svg/vctool/temp-preferences-custom.svg"
            styleClass={`${styles.activeIcon}`}
          />
        </div>

        <button className={styles.joinBtn} onClick={startMeeting}>
          {getJoinBtnText()}
        </button>
      </div>
    </div>
  );
}
