import { db } from '@/helper/firebaseUtil/firestore.helper';
import { useTimeInterval } from '@/helper/hooks.helper';
import { CourseMetaDataAtom, TopicClassroomAtomFamily } from '@/state/atoms/courses.atom';
import { ActiveClassroomTopicIdAtom } from '@/state/atoms/module.atoms';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { UserStateAtom } from '@/state/atoms/users.atom';
import {
  ClassRoomFlagsInput,
  CurrentParticipantDataAtom,
  breakoutList,
  getCurrentParticipantDataObj,
  joinMeeting,
  totalRoomno,
  vcMeetingIconAtom,
  vctoolMetaData,
} from '@/state/atoms/vctool.atoms';
import { courseContext } from '@/state/contexts/CourseContext';
import { collection, doc, onSnapshot } from 'firebase/firestore';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { useContext, useEffect, useRef, useState } from 'react';
import { useRecoilCallback, useRecoilState, useRecoilValue } from 'recoil';
import { addUserWatchTime } from 'services/dashboard.services';
import useLoadClassroomData from './Logic/useLoadClassroomData';
import MeetingCard from './MeetingCard';
import MainToolbar from './Toolbar';
import { StartMeeting } from './help/vctool.helper';
import styles from './vctoolMain.module.scss';

const VcMaintool = ({ vcData = {} }) => {
  const activeClassroomTopicId = useRecoilValue(ActiveClassroomTopicIdAtom);
  const classroomData = useRecoilValue(TopicClassroomAtomFamily(activeClassroomTopicId));
  const { fullCourse } = useContext(courseContext);
  const courseMetaData = useRecoilValue(CourseMetaDataAtom);

  const setToastMessage = useRecoilCallback(({ set }) => (message = '', type = 'danger') => {
    set(ToastMsgAtom, { type, message });
  });

  const Route = useRouter();
  const [api, setapi] = useState(null);
  const [vctoolInfo, setVctoolInfo] = useRecoilState(vctoolMetaData);
  const [currentParticipantData, setCurrentParticipantData] = useRecoilState(
    CurrentParticipantDataAtom,
  );
  const [meetingIconsAtom, setMeetingIconAtom] = useRecoilState(vcMeetingIconAtom);
  const [isMeetingStarted, setIsMeetingStarted] = useRecoilState(joinMeeting);
  const [controls, setControls] = useRecoilState(ClassRoomFlagsInput);
  const totalBreakoutrooms = useRecoilValue(totalRoomno);
  const [breakoutListarr, setbreakoutListarr] = useRecoilState(breakoutList);
  const userData = useRecoilValue(UserStateAtom);
  const [isStarted, setisStarted] = useState(isStarted);
  // const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const containerRef = useRef(null);
  const [toolbar, settoobar] = useState(false);
  const [hidecard, sethidecard] = useState(false);
  const [toggleAudio, settoggleAudio] = useState(false);
  const [toggleVideo, settoggleVideo] = useState(false);
  const [shareToggle, setShareToggle] = useState(false);
  // const [link, setlink] = useState(GenerateString(9).trim().toLocaleLowerCase());
  const [Fullscreen, setFullscreen] = useState(false);
  const fullScreenRef = useRef(null);
  const [userinfo, setuserinfo] = useState([]);
  const [lobby, setLobby] = useState(null);

  const GetFullScreenElement = () => {
    return (
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullscreenElement ||
      document.msFullscreenElement
    );
  };
  useEffect(() => {
    if (!fullScreenRef?.current) return;

    fullScreenRef?.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center',
    });
  }, [fullScreenRef]);

  // useEffect(() => {
  //   if (isMeetingStarted) {
  //     if (controlls.onVideo) {
  //       api.executeCommand('muteEveryone', 'video');
  //     }
  //     if (controlls.onMic) {
  //       api.executeCommand('muteEveryone', 'audio');
  //     }
  //   }
  // }, [controlls]);

  // useEffect(() => {
  //   if (isMeetingStarted) {
  //     if (meetingIconsAtom?.isStartAdd) {
  //       api?.executeCommand('startShareVideo', 'https://www.youtube.com/watch?v=QNuILonXlRo');
  //     } else if (!meetingIconsAtom?.isStartAdd) {
  //       api?.executeCommand('stopShareVideo');
  //     }
  //   }
  // }, [meetingIconsAtom?.isStartAdd]);

  useEffect(() => {
    if (!isMeetingStarted) return;
    if (!api) return;

    const modIdList = [...classroomData?.moderators, ...classroomData?.trainers];

    api.executeCommand('displayName', `${userData?.first_name} ${userData.last_name}`);
    api.executeCommand('email', userData?.email);
    api.executeCommand('avatarUrl', userData?.photo_url);
    api.executeCommand('toggleFilmStrip');
    api.executeCommand('toggleTileView');
    setLobby(false);

    const allPartcipants = structuredClone(api?.getParticipantsInfo());
    const _currentUser = allPartcipants?.find(
      (user) => decodeURIComponent(user?.avatarURL)?.split('/')?.[5] === userData?.id,
    );
    const isModerator = modIdList?.includes(userData?.id);
    if (isModerator) api.executeCommand('grantModerator', userData?.id);

    api.executeCommand('join');

    setCurrentParticipantData(getCurrentParticipantDataObj({ ..._currentUser, isModerator }));

    api.addListener('screenSharingStatusChanged', (share) => {
      setShareToggle(share.on);
    });
  }, [isMeetingStarted, api]);

  useEffect(() => {
    if (!controls?.is_break) return;
    if (!lobby) return;

    StartMeeting(classroomData?.topicId, containerRef, toggleAudio, settoobar, setapi, toggleVideo);
    setIsMeetingStarted(true);
  }, [controls?.is_break]);

  useEffect(() => {
    if (!controls?.is_break) return;
    if (!lobby) return;

    StartMeeting(classroomData?.topicId, containerRef, toggleAudio, settoobar, setapi, toggleVideo);
    setIsMeetingStarted(true);
  }, [controls?.is_break]);

  const { addUpdateClassRoomFlags } = useLoadClassroomData();

  // firebase listener
  useEffect(async () => {
    const classroomFlagsRef = collection(db, 'ClassroomFlags');
    const docRef = doc(classroomFlagsRef, activeClassroomTopicId);

    const unsub = onSnapshot(docRef, (querySnapshot) => {
      if (!querySnapshot.exists()) return;

      setControls({ id: querySnapshot.id, ...querySnapshot.data() });
    });

    return () => unsub();
  }, []);

  async function updateClassroomFlags(_obj = {}) {
    if (controls?.is_break === false) return;

    const obj = { ...controls, id: activeClassroomTopicId, ..._obj };
    await addUpdateClassRoomFlags(obj);
  }

  useEffect(() => {
    if (!controls.id) return;
    if (!api) return;
    if (!controls.is_classroom_started) return;

    if (!controls.is_video_sharing_enabled) api.executeCommand('muteEveryone', 'video');
    if (!controls.is_microphone_enabled) api.executeCommand('muteEveryone', 'audio');
  }, [controls]);

  // enter jitsi meet if moderator started the meet
  useEffect(() => {
    if (!hidecard) return;
    if (!controls.is_classroom_started) return;

    startClassroom();
  }, [hidecard, controls.is_classroom_started]);

  // api call for dashboard data
  useTimeInterval(
    () => {
      addUserWatchTime({
        courseId: fullCourse?.id || courseMetaData?.id,
        topicId: activeClassroomTopicId,
        userId: userData?.id,
        category: fullCourse?.category || courseMetaData?.category,
        subCategories: [
          fullCourse?.sub_category || courseMetaData?.subCategory,
          ...(fullCourse?.sub_categories || courseMetaData?.subCategories || [])?.map(
            (subCat) => subCat?.name,
          ),
        ],
        time: 15,
      });
    },
    15 * 1000,
    [controls.is_classroom_started],
    false,
  );

  function startClassroom() {
    if (isMeetingStarted) return;

    // update flag
    updateClassroomFlags({ is_classroom_started: true, ad_video_url: '' });

    // join jitsi meet
    StartMeeting(classroomData?.topicId, containerRef, toggleAudio, settoobar, setapi, toggleVideo);

    // hide ad toolbar
    setMeetingIconAtom({ ...meetingIconsAtom, isJoinedAsModerator: null, isStartAdd: false });

    // https://www.youtube.com/watch?v=QNuILonXlRo&t=40s
    // other states updated
    setLobby(false);
    setIsMeetingStarted(true);
    setisStarted(true);
    sethidecard(true);
    settoobar(true);
  }

  return (
    <div ref={fullScreenRef} className={styles.mainContainer}>
      <div id="meet" className={toolbar ? `${styles.meet}` : ''} ref={containerRef}>
        {!!lobby && (
          <video
            src={controls?.ad_video_url}
            controls={false}
            autoPlay={true}
            ref={(elem) => elem?.play()}></video>
        )}

        {toolbar && (
          <MainToolbar
            startMeetingByMod={startClassroom}
            api={api}
            setAudio={() => {
              if (meetingIconsAtom.isModerator) {
                api.isAudioAvailable().then((available) => {
                  if (available) {
                    settoggleAudio(!toggleAudio);
                    api.executeCommand('toggleAudio');
                  }
                });
              } else {
                if (controls.is_microphone_enabled) {
                  api.isAudioAvailable().then((available) => {
                    if (available) {
                      settoggleAudio(!toggleAudio);
                      api.executeCommand('toggleAudio');
                    }
                  });
                }
              }
            }}
            setVideo={() => {
              if (meetingIconsAtom.isModerator) {
                api.isVideoAvailable().then((available) => {
                  if (available) {
                    settoggleVideo(!toggleVideo);
                    api.executeCommand('toggleVideo');
                  }
                });
              } else {
                if (controls.is_video_sharing_enabled) {
                  api.isVideoAvailable().then((available) => {
                    if (available) {
                      settoggleVideo(!toggleVideo);
                      api.executeCommand('toggleVideo');
                    }
                  });
                }
              }
            }}
            audiotoggle={toggleAudio}
            videotoggle={toggleVideo}
            shareToggle={shareToggle}
            endMeetng={(endConference = false) => {
              if (endConference) {
                updateClassroomFlags({ is_classroom_started: false });
                api.executeCommand('endConference');
              }
              api?.dispose();
              settoobar(false);
              sethidecard(false);
              localStorage.removeItem('canvasimg');

              document
                .exitFullscreen()
                .then((data) => {})
                .catch((e) => {});
              setFullscreen(false);
              // setisStarted(false)
              setIsMeetingStarted(false);

              setLobby(false);
            }}
            shareScreen={() => {
              if (meetingIconsAtom.isModerator) {
                setShareToggle(!shareToggle);
                api.executeCommand('toggleShareScreen');
                setFullscreen(false);
              } else {
                if (controls.is_video_sharing_enabled) {
                  setShareToggle(!shareToggle);
                  api.executeCommand('toggleShareScreen');
                  setFullscreen(false);
                }
              }
            }}
            handRiseFun={() => {
              api.executeCommand('toggleRaiseHand');
            }}
            fullScreenFun={() => {
              if (GetFullScreenElement()) {
                document
                  .exitFullscreen()
                  .then((data) => {})
                  .catch((e) => {});
              } else {
                fullScreenRef.current.requestFullscreen().catch((e) => {});
              }
              setFullscreen(!Fullscreen);
            }}
            mouseMoveFun={() => {
              if (!api) return;

              // console.log(userData)
              // api?.getRoomsInfo().then((rooms) => {
              //   // setuserinfo(rooms.rooms[0].participants);
              //   // setbreakoutListarr(rooms?.rooms);
              //   setVctoolInfo({
              //     ...vctoolInfo,
              //     allRoomInfo: rooms?.rooms[0].participants,
              //   });
              // });
            }}
            fullscreen={Fullscreen}
            // getUesrId={userinfo}
            isStarted={isStarted}
            startAdvertisement={() => {}}
            stopAdvertisement={() => {
              //
            }}
            CreateBreakoutroomlist={() => {
              for (let i = 0; i < totalBreakoutrooms; i++) {
                api.executeCommand('addBreakoutRoom');
              }
            }}
            autoAssignRoom={() => {
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
        {!hidecard ? (
          <MeetingCard
            vcData={classroomData}
            startMeeting={() => {
              if (Route.asPath?.includes('preview'))
                return setToastMessage('Cannot Join Classroom in preview mode');
              // Route.push('/admin/vctool')
              if (controls?.is_classroom_started === true) return startClassroom();

              const modIdList = [...classroomData?.moderators, ...classroomData?.trainers];
              const isModerator = modIdList?.includes(userData?.id);

              setLobby(true);
              updateClassroomFlags({
                is_moderator_joined: classroomData?.moderators?.includes(userData?.id),
                is_trainer_joined: classroomData?.trainers?.includes(userData?.id),
                ad_video_url:
                  'https://demo.zicops.com/videos/zicops-product-demo-learner-panel.mp4',
              });
              setMeetingIconAtom({
                ...meetingIconsAtom,
                isJoinedAsModerator: isModerator,
                isStartAdd: true,
              });

              // https://www.youtube.com/watch?v=QNuILonXlRo&t=40s
              setisStarted(true);
              sethidecard(!hidecard);
              settoobar(true);
            }}
            startAudioenableFun={() => {
              settoggleAudio(!toggleAudio);
            }}
            startVideoenableFun={() => {
              settoggleVideo(!toggleVideo);
            }}
            startmeetingVideoenable={toggleVideo}
            startmeetingAudioenable={toggleAudio}
          />
        ) : (
          ''
        )}
      </div>
    </div>
  );
};
export default VcMaintool;
