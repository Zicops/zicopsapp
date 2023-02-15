import styles from './VctoolMain.module.scss';
import MeetingCard from './MeetingCard';
import { useRef, useState } from 'react';
import Script from 'next/script';
import MainToolbar from './Toolbar';
import { useRecoilState, useRecoilValue } from 'recoil';
import { UserStateAtom } from '@/state/atoms/users.atom';
const VcMaintool = () => {
const userData=useRecoilValue(UserStateAtom)
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
  const [Fullscreen, setFullscreen] = useState(false)
  const FullScreenRef = useRef(null)
  const [Userinfo, setUserinfo] = useState([])
  const [Iframe,setIframe]=useState([])
  const GetFullScreenElement = () => {
    return document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullscreenElement ||
      document.msFullscreenElement
  }
  const start_Name=userData.first_name +" "+userData.last_name
  const StartMeeting = (givenName) => {
    const domain = 'live.zicops.com';
    const options = {
      roomName: givenName,
      parentNode: ContainerRef.current,
      userInfo: {
        email: userData.email,
        displayName: start_Name //default name
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
        TOOLBAR_BUTTONS: []
      },
      onload: function () {
        console.log('onload');
        settoobar(true)
      }
    };
    setapi(new JitsiMeetExternalAPI(domain, options));
  };
  return (
    <div ref={FullScreenRef}>
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
            localStorage.removeItem("canvasimg");

            document.exitFullscreen().then((data => {
              console.log(data)
            })).catch((e) => {
              console.log(e)
            })
            setFullscreen(false)
          }}
          ShareScreen={() => {
            api.executeCommand('toggleShareScreen');
            setFullscreen(false)
          }}
          HandRiseFun={() => {
            api.executeCommand('toggleRaiseHand');
          }}
          FullScreenFun={() => {
            console.log(GetFullScreenElement())
            if (GetFullScreenElement()) {
              document.exitFullscreen().then((data => {
                console.log(data)
              })).catch((e) => {
                console.log(e)
              })
            }
            else {
              FullScreenRef.current.requestFullscreen().catch((e) => {
                console.log(e)
              })

            }
            setFullscreen(!Fullscreen)
          }}
          MouseMoveFun={() => {
            api.getRoomsInfo().then(rooms => {
              // console.log(rooms.rooms[0].participants)

              setUserinfo(rooms.rooms[0].participants)
            })

            // console.log(userData)
            Userinfo.forEach((data)=>
            {
              // console.log(api.getEmail(data.id))
              //  setuserEmailId(getEmail(data.id))
              if(userData.email.includes("@zicops"))
              {
                api.executeCommand('grantModerator',data.id);
              }
              else
              {
                console.log("not a modarator")
                // api.executeCommand('rejectParticipant',data.id);
              }
            })

          }}
          Fullscreen={Fullscreen}
           GetUesrId={Userinfo}
           />
      )}
      <Script src="https://live.zicops.com/external_api.js"></Script>
      <div className={`${styles.main_div}`}>
        {/* all components ara going to append here */}
        {
          hidecard ? ""
            : <MeetingCard
              StartMeeting={() => {
                StartMeeting("standup");
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
