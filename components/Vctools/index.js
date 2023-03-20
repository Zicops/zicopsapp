import styles from './vctoolMain.module.scss';
import MeetingCard from './MeetingCard';
import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';
import MainToolbar from './Toolbar';
import { useRecoilState, useRecoilValue } from 'recoil';
import { UserStateAtom } from '@/state/atoms/users.atom';
import { StartMeeting, GenerateString } from "./help/vctool.helper"
import { breakoutList, getVctoolMetaData, participantRole, pollArray, totalRoomno, vctoolAlluserinfo, vctoolMetaData } from '@/state/atoms/vctool.atoms';
const VcMaintool = () => {
  const [vctoolInfo, setVctoolInfo] = useRecoilState(vctoolMetaData)
  const [allInfo, setallInfo] = useRecoilState(vctoolAlluserinfo)
  const [pollInfo, setPollInfo] = useRecoilState(pollArray)
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
  const startName = userData.first_name + " " + userData.last_name
  return (
    <div ref={fullScreenRef}>
      <div id="meet" className={toolbar ? `${styles.meet}` : ''} ref={containerRef}></div>
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
              setbreakoutListarr(rooms.rooms)
              setallInfo(rooms.rooms[0].participants)
              setVctoolInfo(
                {
                  ...vctoolInfo,
                  allRoomInfo: rooms.rooms[0].participants
                })
              // console.info(rooms.rooms[0].participants)
            })
            //  allUserinfo
            // userinfo
            userinfo.forEach((data) => {
              // api.executeCommand('grantModerator', data?.id);
              // if ([api.getEmail(data?.id)].toString().includes("1000")) {
              //   api.executeCommand('grantModerator', data?.id);
              // }
            })
          }}


          fullscreen={Fullscreen}
          // getUesrId={userinfo}
          isStarted={isStarted}
          startAdvertisement={() => {
            api.executeCommand('startShareVideo', "https://www.youtube.com/watch?v=QNuILonXlRo");
          }}

          stopAdvertisement={() => {
            // 
            api.executeCommand('stopShareVideo');

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
          showSettingFunc={() => {
            api.executeCommand('toggleVirtualBackgroundDialog');

          }} />
      )}
      <Script src="https://live.zicops.com/external_api.js"></Script>
      <div className={`${styles.mainCard}`}>
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
