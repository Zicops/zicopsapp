import { UserStateAtom } from '@/state/atoms/users.atom';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
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
  getUesrId,
  mouseMoveFun,
  isStarted,
  startAdvertisement,
  stopAdvertisement
}) => {
  const [fade1, setfade1] = useState(false);
  const [hand, sethand] = useState(true);
  const [showQAbtn, setshowQAbtn] = useState(false);

  const [showWhiteBoard, setshowWhiteBoard] = useState(true);

  const [showresourcePage, setresourcePage] = useState(false);
  const [showAbout, setshowAbout] = useState(false);
  const [showQuiz, setshowQuiz] = useState(false);
  // const [IsStarted,setIsStarted]=useState(true)
  const userData = useRecoilValue(UserStateAtom);
  const [userEmail, setuserEmail] = useState(userData.email);
  const [selectedButton, setSelectedButton] = useState('');

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
          showHide={() => {
            selectedButton === 'breakOutRoom'
              ? setSelectedButton('')
              : setSelectedButton('breakOutRoom');
          }}
        />
      )
    },
    {
      title: 'participants',
      component: (
        <Participants
          showHide={() => {
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
          showHide={() => {
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
          showHide={() => {
            selectedButton === 'poll' ? setSelectedButton('') : setSelectedButton('poll');
          }}
        />
      )
    },
    {
      title: 'qaBar',
      component: (
        <QAbar
          showQAbtn={showQAbtn}
          showBtnFun={() => {
            setshowQAbtn(true);
          }}
          showHide={() => {
            selectedButton === 'qaBar' ? setSelectedButton('') : setSelectedButton('qaBar');
          }}
        />
      )
    },
    {
      title: 'chatBar',
      component: (
        <ChatBar
          showHide={() => {
            selectedButton === 'chatBar' ? setSelectedButton('') : setSelectedButton('chatBar');
          }}
        />
      )
    },
    {
      title: 'resourceBar',
      component: (
        <ResourcePage
          showHide={() => {
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
    }
  ];
  return (
    <div
      className={`${styles.toolBar}`}
      onMouseMove={() => {
        mouseMoveFun();
        setfade1(true);
        setTimeout(() => {
          setfade1(false);
        }, 5000);
      }}>
      <div className={`${styles.toolBarnav}`}
        id={fade1 ? `${styles.fadeout1}` : `${styles.fadein1}`} onClick={() => {
          setfade1(true);
          setTimeout(() => {
            setfade1(false);
          }, 5000);
        }}>
        <button>
          <img src="/images/svg/vctool/folder-open.svg" />
        </button>

        <VctoolButton
          onClickfun={() => {

            selectedButton === 'resourceBar'
              ? setSelectedButton('')
              : setSelectedButton('resourceBar');
          }}
          trueSrc={'/images/svg/vctool/library-books.svg'}
          falseSrc={'/images/svg/vctool/library-books.svg'}
          toggle={setresourcePage}
        />

        <VctoolButton
          onClickfun={() => {

            selectedButton === 'whiteBoard'
              ? setSelectedButton('')
              : setSelectedButton('whiteBoard');
          }}
          trueSrc={'/images/svg/vctool/sticky-note-2.svg'}
          falseSrc={'/images/svg/vctool/sticky-note-2.svg'}
        />
        <VctoolButton
          onClickfun={() => {

            selectedButton === 'quiz'
              ? setSelectedButton('')
              : setSelectedButton('quiz');
          }}
          trueSrc={'/images/svg/vctool/quiz.svg'}
          falseSrc={'/images/svg/vctool/quiz.svg'}
          toggle={showQuiz}
        />

        <button>
          <img src="/images/svg/vctool/dashboard.svg" />
        </button>
        <VctoolButton
          onClickfun={() => {

            selectedButton === 'about'
              ? setSelectedButton('')
              : setSelectedButton('about');
          }}
          toggle={showAbout}
          trueSrc={'/images/svg/vctool/info.svg'}
          falseSrc={'/images/svg/vctool/info.svg'}
        />
      </div>
      <div
        className={`${styles.screen}`}
        onMouseMove={() => {
          setfade1(false);
        }}>

        <>{getClickedComponent(selectedButton)}</>
      </div>

      <div className={`${styles.toolBarfooter}`}
        id={fade1 ? `${styles.fadeout1}` : `${styles.fadein1}`} onClick={() => {
          setfade1(true);
          setTimeout(() => {
            setfade1(false);
          }, 5000);
        }}>
        <div className={`${styles.footerLeft}`}>
          <div>
            <VctoolButton
              onClickfun={() => {
                endMeetng();
              }}
              trueSrc={'/images/svg/vctool/logout.svg'}
              falseSrc={'/images/svg/vctool/logout.svg'}
              customStyle={`${styles.canselBtn}`}
              btnValue={'Leave'}
            />
          </div>

          <VctoolButton
            onClickfun={() => {
              setAudio();
            }}
            trueSrc={'/images/svg/vctool/mic-on.svg'}
            falseSrc={'/images/svg/vctool/mic-off.svg'}
            toggle={audiotoggle}
          />

          <VctoolButton
            onClickfun={() => {
              setVideo();
            }}
            trueSrc={'/images/svg/vctool/videocam-on.svg'}
            falseSrc={'/images/svg/vctool/videocam-off.svg'}
            toggle={videotoggle}
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
        </div>
        <div className={`${styles.footerRight}`}>
          <VctoolButton
            onClickfun={() => {

              selectedButton === 'qaBar'
                ? setSelectedButton('')
                : setSelectedButton('qaBar');
            }}
            trueSrc={'/images/svg/vctool/help.svg'}
            falseSrc={'/images/svg/vctool/help.svg'}
          />

          <VctoolButton
            onClickfun={() => {

              selectedButton === 'chatBar'
                ? setSelectedButton('')
                : setSelectedButton('chatBar');
            }}
            trueSrc={'/images/svg/vctool/chat-bubble.svg'}
            falseSrc={'/images/svg/vctool/chat-bubble.svg'}
          />

          <VctoolButton
            onClickfun={() => {

              selectedButton === 'poll'
                ? setSelectedButton('')
                : setSelectedButton('poll');
            }}
            trueSrc={'/images/svg/vctool/insert-chart.svg'}
            falseSrc={'/images/svg/vctool/insert-chart.svg'}
          />

          <VctoolButton
            onClickfun={() => {
              selectedButton === 'participants'
                ? setSelectedButton('')
                : setSelectedButton('participants');
            }}
            trueSrc={'/images/svg/vctool/group.svg'}
            falseSrc={'/images/svg/vctool/group.svg'}
          />

          <VctoolButton
            onClickfun={() => {
              selectedButton === 'breakOutRoom'
                ? setSelectedButton('')
                : setSelectedButton('breakOutRoom');
            }}
            trueSrc={'/images/svg/vctool/account-tree.svg'}
            falseSrc={'/images/svg/vctool/account-tree.svg'}
          />

          <button>
            <img src="/images/svg/vctool/settings.svg" />{' '}
          </button>

          <VctoolButton
            onClickfun={() => {
              fullScreenFun();
            }}
            toggle={fullscreen}
            trueSrc={'/images/svg/vctool/fullscreen-exit.svg'}
            falseSrc={'/images/svg/vctool/fullscreen.svg'}
          />
        </div>
      </div>
    </div>
  );
};
export default MainToolbar;
