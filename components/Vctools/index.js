import styles from './VctoolMain.module.scss';
import MeetingCard from './MeetingCard';
import { useRef, useState } from 'react';
import Script from 'next/script';
import MainToolbar from './Toolbar';
const VcMaintool = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const GenerateString = (length) => {
    let result = ' ';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };
  const ContainerRef = useRef(null)
  const [toolbar, settoobar] = useState(false);
  const [hidecard, sethidecard] = useState(false)
  const [toggleAudio, settoggleAudio] = useState(false);
  const [toggleVideo, settoggleVideo] = useState(false);
  const [link, setlink] = useState(GenerateString(9).trim().toLocaleLowerCase());
  const [api, setapi] = useState(null);
  const StartMeeting = (givenName) => {
    const domain = 'live.zicops.com';
    const options = {
      roomName: givenName,
      // width: 100+"%",
      // height: 100+"%",
      parentNode: ContainerRef.current,
      userInfo: {
        email: 'email@jitsiexamplemail.com',
        displayName: 'John Doe'   //default name
      },
      configOverwrite: {
        startWithAudioMuted: !toggleAudio,
        startWithVideoMuted: !toggleVideo,
        prejoinPageEnabled: false
      },

      interfaceConfigOverwrite: {
        SHOW_JITSI_WATERMARK: false,
        DISABLE_DOMINANT_SPEAKER_INDICATOR: true,
        TOOLBAR_ALWAYS_VISIBLE: true,
        TOOLBAR_BUTTONS: [
          // 'closedcaptions',
          // 'filmstrip',
          // 'fullscreen',
          // 'select-background',
          // 'settings'
        ]
      },
      onload: function () {
        console.log('onload');
        settoobar(true)

      }
    };
    setapi(new JitsiMeetExternalAPI(domain, options));
  };
  return (
    <div>
      <div id="meet" className={toolbar && `${styles.meet}`} ref={ContainerRef}></div>
      {toolbar && (
        <MainToolbar
          SetAudio={() => {
            settoggleAudio(!toggleAudio);
            api.executeCommand('toggleAudio');
          }}
          SetVideo={() => {
            settoggleVideo(!toggleVideo);
            api.executeCommand('toggleVideo');
          }}
          audiotoggle={toggleAudio}
          videotoggle={toggleVideo}
          EndMeetng={() => {
            api.dispose();
            settoobar(!toolbar);
            sethidecard(!hidecard)
          }}
          ShareScreen={() => {
            api.executeCommand('toggleShareScreen');
      
          }}
          HandRiseFun={() => {
            api.executeCommand('toggleRaiseHand');
          }} />
      )}
      <Script src="https://live.zicops.com/external_api.js"></Script>
      <div className={`${styles.main_div}`}>
        {/* all components ara going to append here */}
        {
          hidecard ? ""
            : <MeetingCard
              StartMeeting={() => {
                StartMeeting(link);
                sethidecard(!hidecard)
              }}
              StartAudioenableFun={() => {
                settoggleAudio(!toggleAudio);
              }}
              StartVideoenableFun={() => {
                settoggleVideo(!toggleVideo);
              }}
              StartmeetingVideoenable={toggleVideo}
              StartmeetingAudioenable={toggleAudio}

            />
        }
      </div>
    </div>
  );
};
export default VcMaintool;
