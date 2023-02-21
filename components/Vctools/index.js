import styles from './vctoolMain.module.scss';
import MeetingCard from './MeetingCard';
import { useRef, useState } from 'react';
import Script from 'next/script';
import MainToolbar from './Toolbar';
import { useRecoilState, useRecoilValue } from 'recoil';
import { UserStateAtom } from '@/state/atoms/users.atom';
import { StartMeeting, GenerateString } from "./help/vctool.helper"
const VcMaintool = () => {
  const userData = useRecoilValue(UserStateAtom)
  const [isStarted, setisStarted] = useState(false)
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const containerRef = useRef(null)
  const [toolbar, settoobar] = useState(false);
  const [hidecard, sethidecard] = useState(false)
  const [toggleAudio, settoggleAudio] = useState(false);
  const [toggleVideo, settoggleVideo] = useState(false);
  // const [link, setlink] = useState(GenerateString(9).trim().toLocaleLowerCase());
  const [api, setapi] = useState(null);
  const [Fullscreen, setFullscreen] = useState(false)
  const fullScreenRef = useRef(null)
  const [userinfo, setuserinfo] = useState([])
  const GetFullScreenElement = () => {
    return document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullscreenElement ||
      document.msFullscreenElement
  }
  const startName = userData.first_name + " " + userData.last_name
  return (
    <div ref={fullScreenRef}>
      <div id="meet" className={toolbar ? `${styles.meet}` : ''} ref={containerRef}></div>
      {toolbar && (
        <MainToolbar
          setAudio={() => {
            settoggleAudio(!toggleAudio);
            api.executeCommand('toggleAudio');
          }}
          setVideo={() => {
            settoggleVideo(!toggleVideo);
            api.executeCommand('toggleVideo');
          }}
          audiotoggle={toggleAudio}
          videotoggle={toggleVideo}
          endMeetng={() => {
            api.dispose();
            settoobar(!toolbar);
            sethidecard(!hidecard)
            localStorage.removeItem("canvasimg");

            document.exitFullscreen().then((data => {
           
            })).catch((e) => {
            })
            setFullscreen(false)
            setisStarted(false)
          }}
          shareScreen={() => {
            api.executeCommand('toggleShareScreen');
            setFullscreen(false)
          }}
          handRiseFun={() => {
            api.executeCommand('toggleRaiseHand');
          }}
          fullScreenFun={() => {
            if (GetFullScreenElement()) {
              document.exitFullscreen().then((data => {
              })).catch((e) => {
              })
            }
            else {
              fullScreenRef.current.requestFullscreen().catch((e) => {
        
              })

            }
            setFullscreen(!Fullscreen)
          }}
          mouseMoveFun={() => {
            api.getRoomsInfo().then(rooms => {
              setuserinfo(rooms.rooms[0].participants)
            })

            userinfo.forEach((data) => {
              api.executeCommand('overwriteNames', [{
                id: data?.id,
                name: startName// The new name.
              }]
              );
              if (userData.email.includes("@zicops")) {
                api.executeCommand('grantModerator', data.id);
              }
              else {
                // console.log("not a modarator")
              }
            })

          

          }}


          fullscreen={Fullscreen}
          getUesrId={userinfo}
          isStarted={isStarted}
          startAdvertisement={() => {
            api.executeCommand('startShareVideo', "https://www.youtube.com/watch?v=QNuILonXlRo");
          }}
        
          stopAdvertisement={()=>
          {
            api.executeCommand('stopShareVideo');
          }}
        />
      )}
      <Script src="https://live.zicops.com/external_api.js"></Script>
      <div className={`${styles.main_div}`}>
        {/* all components ara going to append here */}
        {
          !hidecard ? <MeetingCard
            startMeeting={() => {
              StartMeeting("standup", "sandeep", containerRef, userData.email, toggleAudio, settoobar, setapi, toggleVideo);
              setisStarted(true)
              sethidecard(!hidecard) 
            }}
            startAudioenableFun={() => {
              settoggleAudio(!toggleAudio);
            }}
            startVideoenableFun={() => {
              settoggleVideo(!toggleVideo);
            }}
            startmeetingVideoenable={toggleVideo}
            startmeetingAudioenable={toggleAudio}
          /> : ''
        }
      </div>
    </div>
  );
};
export default VcMaintool;
