import { UserStateAtom } from '@/state/atoms/users.atom';
import { breakoutList, joinMeeting, pollArray, totalRoomno, vcMeetingIconAtom, vcModeratorControlls, vctoolAlluserinfo, vctoolMetaData } from '@/state/atoms/vctool.atoms';
import { Router, useRouter } from 'next/router';
import Script from 'next/script';
import { useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { StartMeeting } from "./help/vctool.helper";
import MeetingCard from './MeetingCard';
import MainToolbar from './Toolbar';
import styles from './vctoolMain.module.scss';
const VcMaintool = (vcData={}) => {
  const Route=useRouter()
  const [vctoolInfo, setVctoolInfo] = useRecoilState(vctoolMetaData)
  const [meetingIconsAtom, setMeetingIconAtom] = useRecoilState(vcMeetingIconAtom)
  const [isMeetingStarted,setIsMeetingStarted]=useRecoilState(joinMeeting)
  const [controlls,setControlls]=useRecoilState(vcModeratorControlls)
  const [allInfo, setallInfo] = useRecoilState(vctoolAlluserinfo)
  const totalBreakoutrooms = useRecoilValue(totalRoomno)
  const [breakoutListarr, setbreakoutListarr] = useRecoilState(breakoutList)
  const allUserinfo = useRecoilValue(vctoolAlluserinfo)
  const userData = useRecoilValue(UserStateAtom)
  const [isStarted, setisStarted] = useState(false)
  // const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
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
  useEffect(()=>
  {
    if(isMeetingStarted)
    {
      if(controlls.onVideo)
      {
        api.executeCommand('muteEveryone', 'video');
      }
      if(controlls.onMic)
      {
        api.executeCommand('muteEveryone', 'audio');
      }
    }
     
  },[controlls])


  useEffect(() => {
    if(isMeetingStarted){
      if (meetingIconsAtom?.isStartAdd) {
        api?.executeCommand('startShareVideo', "https://www.youtube.com/watch?v=QNuILonXlRo");
      }
      else if (!meetingIconsAtom?.isStartAdd) {
        api?.executeCommand('stopShareVideo');
      }
    }
  },[meetingIconsAtom?.isStartAdd])
  const startName = userData?.first_name + " " + userData?.last_name
  return (
    <div ref={fullScreenRef}>
      <div id="meet" className={toolbar ? `${styles.meet}` : ''} ref={containerRef}>
      {toolbar && (
        <MainToolbar
          setAudio={() => {
            api.isAudioAvailable().then(available => {
              if (available) {
                settoggleAudio(!toggleAudio);
                api.executeCommand('toggleAudio');
              }
            });
          }}
          setVideo={() => {
            api.isVideoAvailable().then(available => {
              if (available) {
                settoggleVideo(!toggleVideo);
                api.executeCommand('toggleVideo');
              }
            });
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
            // setisStarted(false)
            setIsMeetingStarted(false)
            
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
            // console.log(userData)
          api.getRoomsInfo().then(rooms => {
            setuserinfo(rooms.rooms[0].participants)
            setbreakoutListarr(rooms.rooms)
            setallInfo(rooms.rooms[0].participants)
            setVctoolInfo(
              {
                ...vctoolInfo,
                allRoomInfo: rooms.rooms[0].participants
              })
          
          })
          //  allUserinfo
          // userinfo
          userinfo.forEach((data) => {
            api.executeCommand('grantModerator', data?.id);
            if ([api.getEmail(data?.id)].toString().includes("@ziocps")) {
              api.executeCommand('grantModerator', data?.id);
            }
          })
          }}


          fullscreen={Fullscreen}
          // getUesrId={userinfo}
          isStarted={isStarted}
          startAdvertisement={() => {
         
          }}

          stopAdvertisement={() => {
            // 
      

          }}
          CreateBreakoutroomlist={() => {
            for (let i = 0; i < totalBreakoutrooms; i++) {

              api.executeCommand('addBreakoutRoom');
            }


          }} autoAssignRoom={() => {

            //         participantId: "bd6f680b",
            // roomId: "fe5980f3-7f94-4042-bb67-b856cc95012f"
            //         }  );
          }}
           />
      )}
      </div>
      <Script src="https://live.zicops.com/external_api.js"></Script>
      <div className={`${styles.mainCard}`}>
        {/* all components ara going to append here */}
        {
          !hidecard ? <MeetingCard vcData={vcData}
            startMeeting={() => {
               // Route.push('/admin/vctool')   
              
              StartMeeting("sk", userData.first_name, containerRef, userData.email, toggleAudio, settoobar, setapi, toggleVideo);
              // https://www.youtube.com/watch?v=QNuILonXlRo&t=40s
              setisStarted(true)
              setIsMeetingStarted(true)
              sethidecard(!hidecard)
              
              // Route.push('/admin/vctool')       
      
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
