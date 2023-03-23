import { UserStateAtom } from '@/state/atoms/users.atom';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import About from '../About';
import BreakoutRoom from '../BreakOutRoom';
import ChatBar from '../Chatbar';
import Participants from '../Participants';
import Poll from '../Polls';
import QAbar from '../QAbar';
import QuizPage from '../Quiz';
import ResourcePage from '../Resource';
import VctoolButton from '../Vctoolbutton';
import styles from '../vctoolMain.module.scss';
import WhiteBoard from '../WhiteBoard';
import AddParticipantpopup from '../BreakOutRoom/AddParticipantpopup';
import { allPartcipantinfo, breakoutRoomselectedparticipant, particiantPopup, pollArray, vcMeetingIconAtom } from '@/state/atoms/vctool.atoms';
import ManageAccount from '../ManageAccount';

const MainToolbar = ({
  audiotoggle,
  videotoggle,
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
  showSettingFunc
}) => {

  const [breakoutRoomparticipant, setbreakoutRoomparticipant] = useRecoilState(breakoutRoomselectedparticipant)
  const [breakoutRoompopup, setbreakoutRoompopup] = useRecoilState(particiantPopup)
  const [fade1, setfade1] = useState(false);
  const [hand, sethand] = useState(true);
  const userData = useRecoilValue(UserStateAtom);
  const [userEmail, setuserEmail] = useState(userData.email);
  const [selectedButton, setSelectedButton] = useState('');
  const participantPopuppanel = useRecoilValue(particiantPopup)
  const breakoutRoomtotalno = useRecoilValue(allPartcipantinfo)
  const [pollInfo, setPollInfo] = useRecoilState(pollArray)
  const [showSetting, setShowSetting] = useState(false)
  const [meetingIconsAtom, setMeetingIconAtom] = useRecoilState(vcMeetingIconAtom)

  useEffect(() => {
    if (meetingIconsAtom?.isStartAdd) {
      startAdvertisement()
    }
    else if (!meetingIconsAtom?.isStartAdd) {
      stopAdvertisement()
    }
  })
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
            CreateBreakoutroomlist()
          }} />
      )
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
        />
      )
    },
    {
      title: 'quiz',
      component: (
        <QuizPage
          hide={() => {
            selectedButton === 'quiz' ? setSelectedButton('') : setSelectedButton('quiz');
          }}
        />
      )
    },
    {
      title: 'whiteBoard',
      component: <WhiteBoard />
    },
    {
      title: 'poll',
      component: (
        <Poll
          hide={() => {
            selectedButton === 'poll' ? setSelectedButton('') : setSelectedButton('poll');
          }}
        />
      )
    },
    {
      title: 'qaBar',
      component: (
        <QAbar
          hide={() => {
            selectedButton === 'qaBar' ? setSelectedButton('') : setSelectedButton('qaBar');
          }}
        />
      )
    },
    {
      title: 'chatBar',
      component: (
        <ChatBar
          hide={() => {
            selectedButton === 'chatBar' ? setSelectedButton('') : setSelectedButton('chatBar');
          }}
        />
      )
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
      )
    },
    {
      title: 'about',
      component: (
        <About
          showHide={() => {
            selectedButton === 'about' ? setSelectedButton('') : setSelectedButton('about');
          }}
        />
      )
    },
    {
      title: 'quizPage',
      component: (
        <QuizPage
          showHide={() => {
            selectedButton === 'quizPage' ? setSelectedButton('') : setSelectedButton('quizPage');
          }}
        />
      )
    },
    {
      title: 'AddParticipantpopup',
      component: (
        <AddParticipantpopup presetRoom={breakoutRoomtotalno.presentRoom} totalRooms={breakoutRoomtotalno.totalRoomno}
          autoAssignRoom={autoAssignRoom} />
      )
    },
    {
      title: 'manageAccount',
      component: (
        <ManageAccount hide={() => {
          selectedButton === 'manageAccount' ? setSelectedButton('') : setSelectedButton('manageAccount')
        }} />
      )
    },
  ];
  const clearTime = () => {
    setTimeout(() => {
      setfade1(false)
    }, 3000);
  }
  return (
    <div className={`${styles.toolBar}`}
      onMouseMove={(e) => {
        mouseMoveFun();
        setfade1(true);
        clearTimeout(clearTime())
      }}
      onMouseOver={() => {
        mouseMoveFun();
      }}>
      <div className={`${styles.toolBarnav}`}
        id={fade1 ? `${styles.fadeout1}` : `${styles.fadein1}`}
        onMouseOver={() => {
          setfade1(true);
        }}>

        {
          meetingIconsAtom.isStartAdd ? "" : (<>
            <button>
              <img src="/images/svg/vctool/folder-open.svg" />
            </button>

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
            />
            <VctoolButton
              onClickfun={() => {

                selectedButton === 'quiz'
                  ? setSelectedButton('')
                  : setSelectedButton('quiz');
              }}
              trueSrc={'/images/svg/vctool/quiz-active.svg'}
              falseSrc={'/images/svg/vctool/quiz.svg'}
              toggle={selectedButton === 'quiz'}
              customId={selectedButton === 'quiz' ? `${styles.changeBackground}` : ''}
            />
            <VctoolButton
              onClickfun={() => {

                selectedButton === 'about'
                  ? setSelectedButton('')
                  : setSelectedButton('about');
              }}
              toggle={selectedButton === 'about'}
              trueSrc={'/images/svg/vctool/info-active.svg'}
              falseSrc={'/images/svg/vctool/info.svg'}
              customId={selectedButton === 'about' ? `${styles.changeBackground}` : ''}
            />

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
            />
          </>)
        }
        {/* */}

      </div>
      <div
        className={`${styles.screen}`}
        onMouseMove={() => {
          setfade1(false);
        }}>

        <>{getClickedComponent(selectedButton)}
          {getClickedComponent(participantPopuppanel.roomId)}</>
      </div>

      <div className={`${styles.toolBarFooter}`}
        id={fade1 ? `${styles.fadeout1}` : `${styles.fadein1}`} onMouseOver={() => {
          setfade1(true);
        }}>
        <div className={`${styles.footerLeft}`}>
          {
            meetingIconsAtom.isJoinedAsModerator ? (
              <>
                <div>
                  <VctoolButton
                    onClickfun={() => {
                      setMeetingIconAtom({
                        ...meetingIconsAtom,
                        isStartAdd: false,
                        isJoinedAsModerator: false
                      })
                    }}
                    trueSrc={'/images/svg/vctool/Union.svg'}
                    falseSrc={'/images/svg/vctool/Union.svg'}
                    customStyle={`${styles.startMeeting}`}
                    btnValue={'Start'}
                  />
                </div>
                <div>
                  <VctoolButton
                    onClickfun={() => {
                      endMeetng();
                      setbreakoutRoomparticipant(null)
                      setbreakoutRoompopup({
                        roomId: "",
                        isRoom: false
                      })

                    }}
                    trueSrc={'/images/svg/vctool/logout.svg'}
                    falseSrc={'/images/svg/vctool/logout.svg'}
                    customStyle={`${styles.canselBtn}`}
                    btnValue={'Leave'}
                  />
                </div>
              </>
            ) : <div>
              <VctoolButton
                onClickfun={() => {
                  endMeetng();
                  setbreakoutRoomparticipant(null)
                  setbreakoutRoompopup({
                    roomId: "",
                    isRoom: false
                  })
                }}
                trueSrc={'/images/svg/vctool/logout.svg'}
                falseSrc={'/images/svg/vctool/logout.svg'}
                customStyle={`${styles.canselBtn}`}
                btnValue={'Leave'}
              />
            </div>
          }

          {/*  */}
          {
            meetingIconsAtom.isStartAdd ? "" : (<>
              <VctoolButton
                onClickfun={() => {
                  setAudio();
                }}
                trueSrc={'/images/svg/vctool/mic-on.svg'}
                falseSrc={'/images/svg/vctool/mic-off.svg'}
                toggle={audiotoggle} customId={!audiotoggle ? `${styles.changeBackground}` : ''}
              />

              <VctoolButton
                onClickfun={() => {
                  setVideo();
                }}
                trueSrc={'/images/svg/vctool/videocam-on.svg'}
                falseSrc={'/images/svg/vctool/videocam-off.svg'}
                toggle={videotoggle}
                customId={!videotoggle ? `${styles.changeBackground}` : ''}
              />

              <VctoolButton
                onClickfun={() => {
                  shareScreen();
                }}
                trueSrc={'/images/svg/vctool/present-to-all.svg'}
                falseSrc={'/images/svg/vctool/present-to-all.svg'}
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
              />
            </>)
          }
        </div>
        <div className={`${styles.footerRight}`}>
          {
            meetingIconsAtom.isStartAdd ? "" : (<>
              <VctoolButton
                onClickfun={() => {

                  selectedButton === 'qaBar'
                    ? setSelectedButton('')
                    : setSelectedButton('qaBar');
                }}
                trueSrc={'/images/svg/vctool/help-active.svg'}
                falseSrc={'/images/svg/vctool/help.svg'}
                customId={selectedButton === 'qaBar' ? `${styles.changeBackground}` : ''}
                toggle={selectedButton === 'qaBar'}
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
              />

              <VctoolButton
                onClickfun={() => {

                  selectedButton === 'poll'
                    ? setSelectedButton('')
                    : setSelectedButton('poll');
                }}
                trueSrc={'/images/svg/vctool/insert-chart-active.svg'}
                falseSrc={'/images/svg/vctool/insert-chart.svg'}
                customId={selectedButton === 'poll' ? `${styles.changeBackground}` : ''}
                toggle={selectedButton === 'poll'}
              />

              <VctoolButton
                onClickfun={() => {
                  selectedButton === 'participants'
                    ? setSelectedButton('')
                    : setSelectedButton('participants');
                }}
                trueSrc={'/images/svg/vctool/group-active.svg'}
                falseSrc={'/images/svg/vctool/group.svg'}
                customId={selectedButton === 'participants' ? `${styles.changeBackground}` : ''}
                toggle={selectedButton === 'participants'}
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
              />
              <VctoolButton
                onClickfun={() => {
                  setShowSetting(!showSetting)
                  showSettingFunc()
                }}
                trueSrc={'/images/svg/vctool/settings.svg'}
                falseSrc={'/images/svg/vctool/settings.svg'}
                customId={showSetting ? `${styles.changeBackground}` : ''}
                toggle={showSetting}
              />

              <VctoolButton
                onClickfun={() => {
                  fullScreenFun();
                }}
                toggle={fullscreen}
                trueSrc={'/images/svg/vctool/fullscreen-exit.svg'}
                falseSrc={'/images/svg/vctool/fullscreen.svg'}

              />
            </>)
          }
          {/* */}
        </div>
      </div>
    </div>
  );
};
export default MainToolbar;
