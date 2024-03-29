import { ActiveClassroomTopicIdAtom } from '@/state/atoms/module.atoms';
import { UserStateAtom } from '@/state/atoms/users.atom';
import {
  ClassRoomFlagsInput,
  CurrentParticipantDataAtom,
  allPartcipantinfo,
  breakoutList,
  breakoutRoomselectedparticipant,
  particiantPopup,
  pollArray,
  publishBreakoutRoom,
  vcMeetingIconAtom,
  vcToolNavbarState,
  vctoolAlluserinfo,
} from '@/state/atoms/vctool.atoms';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import About from '../About';
import BreakoutRoom from '../BreakOutRoom';
import AddParticipantpopup from '../BreakOutRoom/AddParticipantpopup';
import ChatBar from '../Chatbar';
import CloseSessionPopup from '../CloseSessionPopup';
import DeletePopUp from '../DeletePopUp';
import ManageAccount from '../ManageAccount';
import NotesContainer from '../NotesContainer';
import Participants from '../Participants';
import Poll from '../Polls';
import QAbar from '../QAbar';
import QuizPage from '../Quiz';
import ResourcePage from '../Resource';
import SettingPopup from '../SettingPopup';
import StartSessionPopUp from '../StartSessionPopUP';
import VctoolButton from '../Vctoolbutton';
import styles from '../vctoolMain.module.scss';

const MainToolbar = ({
  api = null,
  audiotoggle,
  videotoggle,
  shareToggle,
  setAudio,
  setVideo,
  endMeetng,
  shareScreen,
  handRiseFun,
  fullScreenFun,
  fullscreen,
  CreateBreakoutroomlist,
  getUesrId,
  mouseMoveFun,
  isStarted,
  startAdvertisement,
  stopAdvertisement,
  autoAssignRoom,
  showSettingFunc,
  startMeetingByMod,
  frameIcons,
}) => {
  const activeClassroomTopicId = useRecoilValue(ActiveClassroomTopicIdAtom);
  const currentParticipantData = useRecoilValue(CurrentParticipantDataAtom);
  const [allInfo, setallInfo] = useRecoilState(vctoolAlluserinfo);
  const [breakoutRoomparticipant, setbreakoutRoomparticipant] = useRecoilState(
    breakoutRoomselectedparticipant,
  );
  const [breakoutRoompopup, setbreakoutRoompopup] = useRecoilState(particiantPopup);
  const [fade1, setfade1] = useState(true);
  const [hand, sethand] = useState(true);
  const userData = useRecoilValue(UserStateAtom);
  const [userEmail, setuserEmail] = useState(userData.email);
  const [selectedButton, setSelectedButton] = useState('');
  const [deletedPoupTitel, setDeletedPouptitle] = useState('');
  const [publishRoom, setPublishRoom] = useState('');
  const participantPopuppanel = useRecoilValue(particiantPopup);
  const breakoutRoomtotalno = useRecoilValue(allPartcipantinfo);
  const [pollInfo, setPollInfo] = useRecoilState(pollArray);
  const [showSetting, setShowSetting] = useState(false);
  const [meetingIconsAtom, setMeetingIconAtom] = useRecoilState(vcMeetingIconAtom);
  const [hideToolBar, setHideToolbar] = useRecoilState(vcToolNavbarState);
  const [pollDeleteIndex, setPollDeleteIndex] = useState();
  const [screenShareParticipants, setScreenShareParticipants] = useState([]);
  const [publishRoomAtom, setPublishRoomAtom] = useRecoilState(publishBreakoutRoom);
  const [breakoutLists, setBreakoutLists] = useRecoilState(breakoutList);
  const timer = null;

  const [controls, setControls] = useRecoilState(ClassRoomFlagsInput);

  useEffect(() => {
    if (!api) return;
    api.addListener('contentSharingParticipantsChanged', (share) => {
      setScreenShareParticipants(share.data);
    });

    console.info('Flags - ', controls);
  }, [api]);

  useEffect(() => {
    clearTimeout(timer);
    if (hideToolBar === false) return;
    if (selectedButton) return setHideToolbar(false);

    timer = setTimeout(() => setHideToolbar(true), 3000);

    return () => clearTimeout(timer);
  }, [hideToolBar]);

  function getClickedComponent(title) {
    if (title === '') return <></>;
    const compObj = toolBarData?.find((obj) => obj.title === title);
    return compObj.component;
  }

  const toolBarData = [
    {
      title: 'breakOutRoom',
      component: (
        <BreakoutRoom
          hide={() => {
            selectedButton === 'breakOutRoom'
              ? setSelectedButton('')
              : setSelectedButton('breakOutRoom');
          }}
          createRooms={() => {
            CreateBreakoutroomlist();
          }}
          publishRoom={() => {
            setPublishRoom('publishRoom');
          }}
        />
      ),
    },
    {
      title: 'publishRoom', // publish Breakout Room Popup
      component: (
        <DeletePopUp
          poUpOptions={{
            popUpName: 'rooms',
            popUpNotice:
              'Once published all the the rooms will be open and participants will be prompted to join. Any open rooms cannot be deleted. Are you sure you want to publish now?',
            poupBtnInfo1: 'Cancel',
            poupBtnInfo2: 'Publish',
          }}
          styleBtns={{
            cancelPopupClass: `${styles.canceldeletPoll}`,
            deletePopupclass: `${styles.publishRoomBnt}`,
          }}
          cancelFunc={() => setPublishRoom('')}
          deletePollFunc={() => {
            setPublishRoomAtom({
              ...publishRoomAtom,
              isRoomPublished: true,
              publishedRoomArr: [...breakoutLists],
            });
            setPublishRoom('');
          }}
        />
      ),
    },
    {
      title: 'participants',
      component: (
        <Participants
          hide={() => {
            selectedButton === 'participants'
              ? setSelectedButton('')
              : setSelectedButton('participants');
          }}
          Info={getUesrId}
          api={api}
        />
      ),
    },
    {
      title: 'quiz',
      component: (
        <QuizPage
          hide={() => {
            selectedButton === 'quiz' ? setSelectedButton('') : setSelectedButton('quiz');
          }}
        />
      ),
    },
    {
      title: 'whiteBoard',
      component: (
        <NotesContainer
          hide={() => {
            selectedButton === 'whiteBoard'
              ? setSelectedButton('')
              : setSelectedButton('whiteBoard');
          }}
        />
      ),
    },
    {
      title: 'poll',
      component: (
        <Poll
          hide={() => {
            selectedButton === 'poll' ? setSelectedButton('') : setSelectedButton('poll');
          }}
          deletePollPopUp={(index) => {
            setDeletedPouptitle('deletePopUp');
            setPollDeleteIndex(index);
            setPollDeleteIndex(index);
          }}
        />
      ),
    },
    {
      title: 'qaBar',
      component: (
        <QAbar
          hide={() => {
            selectedButton === 'qaBar' ? setSelectedButton('') : setSelectedButton('qaBar');
          }}
        />
      ),
    },
    {
      title: 'chatBar',
      component: (
        <ChatBar
          hide={() => {
            selectedButton === 'chatBar' ? setSelectedButton('') : setSelectedButton('chatBar');
          }}
        />
      ),
    },
    {
      title: 'resourceBar',
      component: (
        <ResourcePage
          hide={() => {
            selectedButton === 'resourceBar'
              ? setSelectedButton('')
              : setSelectedButton('resourceBar');
          }}
        />
      ),
    },
    {
      title: 'about',
      component: (
        <About
          showHide={() => {
            selectedButton === 'about' ? setSelectedButton('') : setSelectedButton('about');
          }}
        />
      ),
    },
    {
      title: 'quizPage',
      component: (
        <QuizPage
          showHide={() => {
            selectedButton === 'quizPage' ? setSelectedButton('') : setSelectedButton('quizPage');
          }}
        />
      ),
    },
    {
      title: 'AddParticipantpopup',
      component: (
        <AddParticipantpopup
          presetRoom={breakoutRoomtotalno.presentRoom}
          totalRooms={breakoutRoomtotalno.totalRoomno}
          autoAssignRoom={autoAssignRoom}
        />
      ),
    },
    {
      title: 'manageAccount',
      component: (
        <ManageAccount
          hide={() => {
            selectedButton === 'manageAccount'
              ? setSelectedButton('')
              : setSelectedButton('manageAccount');
          }}
        />
      ),
    },

    {
      title: 'SettingPopup',
      component: (
        <SettingPopup
          hide={() => {
            selectedButton === 'SettingPopup'
              ? setSelectedButton('')
              : setSelectedButton('SettingPopup');
          }}
          api={api}
        />
      ),
    },
    {
      title: 'manageAccount',
      component: (
        <ManageAccount
          hide={() => {
            selectedButton === 'manageAccount'
              ? setSelectedButton('')
              : setSelectedButton('manageAccount');
          }}
        />
      ),
    },
    {
      title: 'startSessionPopup',
      component: (
        <StartSessionPopUp
          concelMeetingFunc={() => {
            setSelectedButton('');
          }}
          startMeetingFunc={() => {
            startMeetingByMod();
            setMeetingIconAtom({
              ...meetingIconsAtom,
              isStartAdd: false,
              isJoinedAsModerator: false,
            });
            setSelectedButton('');
          }}
        />
      ),
    },
    {
      title: 'closeSessionPopup',
      component: (
        <CloseSessionPopup
          leaveSession={() => {
            endMeetng();
          }}
          endSession={() => {
            endMeetng(true);
          }}
        />
      ),
    },
    {
      title: 'deletePopUp',
      component: (
        <DeletePopUp
          poUpOptions={{
            popUpName: 'Poll',
            popUpNotice:
              'Once published all the the rooms will be open and participants will be prompted to join. Any open rooms cannot be deleted. Are you sure you want to publish now?',
            poupBtnInfo1: 'Cancel',
            poupBtnInfo2: 'Delete',
          }}
          styleBtns={{
            cancelPopupClass: `${styles.canceldeletPoll}`,
            deletePopupclass: `${styles.deletePoll}`,
          }}
          cancelFunc={() => setDeletedPouptitle('')}
          deletePollFunc={() => {
            setPollInfo(
              pollInfo.filter((data, dataIndex) => {
                return dataIndex !== pollDeleteIndex;
              }),
            );
            setDeletedPouptitle('');
          }}
        />
      ),
    },
    {
      title: 'SettingPopup',
      component: (
        <SettingPopup
          hide={() => {
            selectedButton === 'SettingPopup'
              ? setSelectedButton('')
              : setSelectedButton('SettingPopup');
          }}
        />
      ),
    },
  ];

  return (
    <div
      className={`${styles.toolBar}`}
      onMouseMove={(e) => {
        mouseMoveFun();
        if (hideToolBar === false) return;
        setHideToolbar(null);
      }}
      onMouseOver={() => {
        mouseMoveFun();
      }}>
      <div
        className={`${styles.toolBarnav} ${!!hideToolBar ? styles.slideUp : ''}`}
        id={fade1 ? `${styles.fadeout1}` : `${styles.fadein1}`}
        onMouseEnter={() => setHideToolbar(false)}
        onMouseLeave={() => setHideToolbar(null)}>
        {meetingIconsAtom.isStartAdd ? (
          ''
        ) : (
          <>
            {/* <button>
              <img src="/images/svg/vctool/folder-open.svg" />
            </button> */}

            <VctoolButton
              onClickfun={() => {
                selectedButton === 'resourceBar'
                  ? setSelectedButton('')
                  : setSelectedButton('resourceBar');
              }}
              trueSrc={'/images/svg/vctool/library-books-active.svg'}
              falseSrc={'/images/svg/vctool/library-books.svg'}
              toggle={selectedButton === 'resourceBar'}
              customId={selectedButton === 'resourceBar' ? `${styles.changeBackground}` : ''}
              toolTipClass={`${styles.topToolTips}`}
              toolTipName={'Resources'}
            />

            <VctoolButton
              onClickfun={() => {
                selectedButton === 'whiteBoard'
                  ? setSelectedButton('')
                  : setSelectedButton('whiteBoard');
              }}
              trueSrc={'/images/svg/vctool/sticky-note-2.svg'}
              falseSrc={'/images/svg/vctool/sticky-note-2.svg'}
              customId={selectedButton === 'whiteBoard' ? `${styles.changeBackground}` : ''}
              toolTipClass={`${styles.topToolTips}`}
              toolTipName={'Notes'}
            />
            <VctoolButton
              onClickfun={() => {
                selectedButton === 'quiz' ? setSelectedButton('') : setSelectedButton('quiz');
              }}
              trueSrc={'/images/svg/vctool/quiz-active.svg'}
              falseSrc={'/images/svg/vctool/quiz.svg'}
              toggle={selectedButton === 'quiz'}
              customId={selectedButton === 'quiz' ? `${styles.changeBackground}` : ''}
              toolTipClass={`${styles.topToolTips}`}
              toolTipName={'Quizzes'}
            />
            <VctoolButton
              onClickfun={() => {
                selectedButton === 'about' ? setSelectedButton('') : setSelectedButton('about');

                setallInfo(structuredClone(api?.getParticipantsInfo()));
              }}
              toggle={selectedButton === 'about'}
              trueSrc={'/images/svg/vctool/info-active.svg'}
              falseSrc={'/images/svg/vctool/info.svg'}
              customId={selectedButton === 'about' ? `${styles.changeBackground}` : ''}
              toolTipClass={`${styles.topToolTips}`}
              toolTipName={'Session Info'}
            />

            {!!currentParticipantData?.isModerator && (
              <VctoolButton
                onClickfun={() => {
                  selectedButton === 'manageAccount'
                    ? setSelectedButton('')
                    : setSelectedButton('manageAccount');
                }}
                toggle={selectedButton === 'manageAccount'}
                trueSrc={'/images/svg/vctool/manage-accounts-active.svg'}
                falseSrc={'/images/svg/vctool/manage-accounts.svg'}
                customId={selectedButton === 'manageAccount' ? `${styles.changeBackground}` : ''}
                toolTipClass={`${styles.topToolTips}`}
                toolTipName={'Host controls'}
              />
            )}
          </>
        )}
        {/* */}
      </div>
      <div
        className={`${styles.screen}`}
        onMouseMove={() => {
          // setfade1(true);
          // setfade1(true);
          // clearTimeout(clearTime())
        }}>
        <>
          {getClickedComponent(selectedButton)}
          {getClickedComponent(participantPopuppanel.roomId)}
          {getClickedComponent(deletedPoupTitel)}
          {getClickedComponent(publishRoom)}
        </>
      </div>

      <div
        className={`${styles.toolBarFooter} ${!!hideToolBar ? styles.slideDown : ''}`}
        id={fade1 ? `${styles.fadeout1}` : `${styles.fadein1}`}
        onMouseEnter={() => setHideToolbar(false)}
        onMouseLeave={() => setHideToolbar(null)}>
        <div className={`${styles.footerLeft}`}>
          {meetingIconsAtom.isJoinedAsModerator ? (
            <>
              <div>
                <VctoolButton
                  onClickfun={() => {
                    setSelectedButton('startSessionPopup');
                  }}
                  trueSrc={'/images/svg/vctool/Union.svg'}
                  falseSrc={'/images/svg/vctool/Union.svg'}
                  customStyle={`${styles.startMeeting}`}
                  btnValue={'Start'}
                  toolTipClass={`${styles.tooltipLefttNav}`}
                  toolTipName={'Start the session'}
                />
              </div>
              <div>
                <VctoolButton
                  onClickfun={() => {
                    endMeetng();
                    setbreakoutRoomparticipant(null);
                    setbreakoutRoompopup({
                      roomId: '',
                      isRoom: false,
                    });
                  }}
                  trueSrc={'/images/svg/vctool/logout.svg'}
                  falseSrc={'/images/svg/vctool/logout.svg'}
                  customStyle={`${styles.canselBtn}`}
                  btnValue={'Leave'}
                  toolTipClass={`${styles.tooltipLefttNav}`}
                  toolTipName={'Leave the session'}
                />
              </div>
            </>
          ) : (
            <div>
              <VctoolButton
                onClickfun={() => {
                  if (meetingIconsAtom.isModerator) {
                    // console.info(meetingIconsAtom);
                    setSelectedButton('closeSessionPopup');
                  } else {
                    endMeetng();
                    setbreakoutRoomparticipant(null);
                    setbreakoutRoompopup({
                      roomId: '',
                      isRoom: false,
                    });
                  }
                }}
                trueSrc={'/images/svg/vctool/logout.svg'}
                falseSrc={'/images/svg/vctool/logout.svg'}
                customStyle={`${styles.canselBtn}`}
                btnValue={'Leave'}
                toolTipClass={`${styles.tooltipLefttNav}`}
                toolTipName={'Leave the session'}
              />
            </div>
          )}

          {/*  */}
          {meetingIconsAtom.isStartAdd ? (
            ''
          ) : (
            <>
              <VctoolButton
                onClickfun={() => {
                  setAudio();
                }}
                trueSrc={'/images/svg/vctool/mic-on.svg'}
                falseSrc={'/images/svg/vctool/mic-off.svg'}
                toggle={audiotoggle}
                customId={!audiotoggle ? `${styles.changeBackground}` : ''}
                toolTipClass={`${styles.tooltipLefttNav}`}
                toolTipName={!audiotoggle ? 'Turn on microphone' : 'Turn off microphone'}
              />

              <VctoolButton
                onClickfun={() => {
                  setVideo();
                }}
                trueSrc={'/images/svg/vctool/videocam-on.svg'}
                falseSrc={'/images/svg/vctool/videocam-off.svg'}
                toggle={videotoggle}
                customId={!videotoggle ? `${styles.changeBackground}` : ''}
                toolTipClass={`${styles.tooltipLefttNav}`}
                toolTipName={!videotoggle ? 'Turn on camera' : 'Turn off camera'}
              />

              <VctoolButton
                onClickfun={() => {
                  if (screenShareParticipants.length > 0) return;
                  shareScreen();
                }}
                toggle={!shareToggle}
                trueSrc={'/images/svg/vctool/screen_share.svg'}
                falseSrc={'/images/svg/vctool/stop_screen_share.svg'}
                customId={shareToggle ? `${styles.changeBackground}` : ''}
                toolTipClass={`${styles.tooltipLefttNav}`}
                toolTipName={
                  !shareToggle
                    ? screenShareParticipants.length > 0
                      ? 'Someone is sharing screen'
                      : 'Share screen'
                    : 'Stop Sharing'
                }
                disabled={true}
              />

              <VctoolButton
                onClickfun={() => {
                  sethand(!hand);
                  handRiseFun();
                }}
                toggle={hand}
                trueSrc={'/images/svg/vctool/back-hand.svg'}
                falseSrc={'/images/svg/vctool/back-hand-on.svg'}
                customId={hand ? `${styles.footerLeftbtn1}` : `${styles.footerLeftbtn2}`}
                toolTipClass={`${styles.tooltipLefttNav}`}
                toolTipName={'Raise hand'}
              />
              {/* <VctoolButton
                onClickfun={() => {
                  console.info(api.getMyUserId());
                  
                }}
                // toggle={hand}
                trueSrc={'/images/svg/vctool/sensors-on.svg'}
                falseSrc={'/images/svg/vctool/sensors-off.svg'}
                // customId={hand ? `${styles.footerLeftbtn1}` : `${styles.footerLeftbtn2}`}
                toolTipClass={`${styles.tooltipLefttNav}`}
                toolTipName={'Test button'}
              /> */}
            </>
          )}
        </div>
        <div className={`${styles.footerRight}`}>
          {meetingIconsAtom.isStartAdd ? (
            ''
          ) : (
            <>
              <VctoolButton
                onClickfun={() => {
                  selectedButton === 'qaBar' ? setSelectedButton('') : setSelectedButton('qaBar');
                }}
                trueSrc={'/images/svg/vctool/help-active.svg'}
                falseSrc={'/images/svg/vctool/help.svg'}
                customId={selectedButton === 'qaBar' ? `${styles.changeBackground}` : ''}
                toggle={selectedButton === 'qaBar'}
                toolTipClass={`${styles.tooltipRightNav}`}
                toolTipName={'Q & A'}
              />
              <VctoolButton
                onClickfun={() => {
                  selectedButton === 'chatBar'
                    ? setSelectedButton('')
                    : setSelectedButton('chatBar');
                }}
                trueSrc={'/images/svg/vctool/chat-bubble-active.svg'}
                falseSrc={'/images/svg/vctool/chat-bubble.svg'}
                customId={selectedButton === 'chatBar' ? `${styles.changeBackground}` : ''}
                toggle={selectedButton === 'chatBar'}
                toolTipClass={`${styles.tooltipRightNav}`}
                toolTipName={'Chat'}
              />
              <VctoolButton
                onClickfun={() => {
                  selectedButton === 'poll' ? setSelectedButton('') : setSelectedButton('poll');
                }}
                trueSrc={'/images/svg/vctool/insert-chart-active.svg'}
                falseSrc={'/images/svg/vctool/insert-chart.svg'}
                customId={selectedButton === 'poll' ? `${styles.changeBackground}` : ''}
                toggle={selectedButton === 'poll'}
                toolTipClass={`${styles.tooltipRightNav}`}
                toolTipName={'Polls'}
              />
              <VctoolButton
                onClickfun={() => {
                  selectedButton === 'participants'
                    ? setSelectedButton('')
                    : setSelectedButton('participants');

                  setallInfo(structuredClone(api?.getParticipantsInfo()));
                }}
                trueSrc={'/images/svg/vctool/group-active.svg'}
                falseSrc={'/images/svg/vctool/group.svg'}
                customId={selectedButton === 'participants' ? `${styles.changeBackground}` : ''}
                toggle={selectedButton === 'participants'}
                toolTipClass={`${styles.tooltipRightNav}`}
                toolTipName={'Participants'}
              />
              <VctoolButton
                onClickfun={() => {
                  selectedButton === 'breakOutRoom'
                    ? setSelectedButton('')
                    : setSelectedButton('breakOutRoom');
                }}
                trueSrc={'/images/svg/vctool/account-tree-active.svg'}
                falseSrc={'/images/svg/vctool/account-tree.svg'}
                customId={selectedButton === 'breakOutRoom' ? `${styles.changeBackground}` : ''}
                toggle={selectedButton === 'breakOutRoom'}
                toolTipClass={`${styles.tooltipRightNav}`}
                toolTipName={'Breakout rooms'}
              />

              <VctoolButton
                onClickfun={() => {
                  setShowSetting(!showSetting);
                  selectedButton === 'SettingPopup'
                    ? setSelectedButton('')
                    : setSelectedButton('SettingPopup');
                  // SettingPopup
                }}
                trueSrc={'/images/svg/vctool/settings.svg'}
                falseSrc={'/images/svg/vctool/settings.svg'}
                customId={selectedButton === 'SettingPopup' ? `${styles.changeBackground}` : ''}
                toggle={selectedButton === 'SettingPopup'}
                toolTipClass={`${styles.tooltipRightNav}`}
                toolTipName={'Settings'}
              />

              <VctoolButton
                onClickfun={() => {
                  fullScreenFun();
                }}
                toggle={fullscreen}
                trueSrc={'/images/svg/vctool/fullscreen-exit.svg'}
                falseSrc={'/images/svg/vctool/fullscreen.svg'}
                toolTipClass={`${styles.tooltipRightNavFullscreen}`}
                toolTipName={!fullscreen ? 'Enter full screen' : 'Exit full screen'}
              />
            </>
          )}
          {/* */}
        </div>
      </div>
    </div>
  );
};
export default MainToolbar;
