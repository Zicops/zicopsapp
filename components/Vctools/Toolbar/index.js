import { UserStateAtom } from "@/state/atoms/users.atom";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import BreakoutRoom from "../BreakOutRoom";
import ChatBar from "../Chatbar";
import Participants from "../Participants";
import Poll from "../Polls";
import QAbar from "../QAbar";
import VctoolButton from "../Vctoolbutton";
import styles from "../vctoolMain.module.scss";
import WhiteBoard from "../WhiteBoard";
import ResourcePage from "../Resource";
import About from "../About";
import QuizPage from "../Quiz";
const MainToolbar = ({ audiotoggle, videotoggle, setAudio, setVideo, endMeetng, shareScreen,
    handRiseFun, fullScreenFun, fullscreen, getUesrId, mouseMoveFun, isStarted, startAdvertisement, stopAdvertisement }) => {
    const [fade1, setfade1] = useState(false)
    const [fade2, setfade2] = useState(true)
    const [hand, sethand] = useState(true)
    const [showQA, setshowQA] = useState(false)
    const [showChat, setshowChat] = useState(false)
    const [showQAbtn, setshowQAbtn] = useState(false)
    const [showPoll, setshowPoll] = useState(false)
    const [showWhiteBoard, setshowWhiteBoard] = useState(false);
    const [showParticipants, setshowParticipants] = useState(false)
    const [showbreakoutRoom, setshowbreakoutRoom] = useState(false)
    const [showresourcePage, setresourcePage] = useState(false)
    const [showAbout, setshowAbout] = useState(false)
    const [showQuiz, setshowQuiz] = useState(false)
    // const [IsStarted,setIsStarted]=useState(true)
    const userData = useRecoilValue(UserStateAtom)
    const [userEmali, setuserEmali] = useState(userData.email)

    return (
        <div className={`${styles.toolbar}`} onMouseMove={() => {
            mouseMoveFun()
            setfade1(true)
                setTimeout(() => {
                    setfade1(false)
                }, 4000)
        }}>
            <div className={`${styles.toolbar_nav}`}
                id={fade1 ? `${styles.fadeout1}` : `${styles.fadein1}`}
            >
                <button><img src="/images/svg/vctool/folder-open.svg" /></button>

                <VctoolButton onClickfun={() => {
                    setresourcePage(!showresourcePage)
                    setshowQA(false)
                    setshowChat(false)
                    setshowPoll(false)
                    setshowbreakoutRoom(false)
                    setshowParticipants(false)
                    setshowAbout(false)
                    setshowQuiz(false)
                }} trueSrc={"/images/svg/vctool/library-books.svg"} falseSrc={"/images/svg/vctool/library-books.svg"} toggle={setresourcePage} />

                <VctoolButton onClickfun={() => {
                    setshowWhiteBoard(!showWhiteBoard)
                }} trueSrc={"/images/svg/vctool/sticky-note-2.svg"} falseSrc={"/images/svg/vctool/sticky-note-2.svg"} />
                {/* 
                <button>
                <img src="/images/svg/vctool/quiz.svg" />
                </button> */}
                <VctoolButton onClickfun={() => {
                    setshowQA(false)
                    setshowChat(false)
                    setshowPoll(false)
                    setshowbreakoutRoom(false)
                    setresourcePage(false)
                    setshowParticipants(false)
                    setshowAbout(false)
                    setshowQuiz(!showQuiz)
                }} trueSrc={"/images/svg/vctool/quiz.svg"} falseSrc={"/images/svg/vctool/quiz.svg"} toggle={showQuiz} />

                <button><img src="/images/svg/vctool/dashboard.svg" /></button>
                <VctoolButton onClickfun={() => {
                    setshowAbout(!showAbout)
                    setresourcePage(false)
                    setshowQA(false)
                    setshowChat(false)
                    setshowPoll(false)
                    setshowbreakoutRoom(false)
                    setshowParticipants(false)
                    setshowQuiz(false)
                }} toggle={showAbout} trueSrc={"/images/svg/vctool/info.svg"} falseSrc={"/images/svg/vctool/info.svg"} />

            </div>
            <div className={`${styles.screen}`} onMouseMove={() => {
                setfade1(false)
            }}>
                {/* All screen items will come here */}
                {
                    showChat && <ChatBar showHide={() => {
                        setshowChat(!showChat)
                    }} />
                }

                {
                    showQA && <QAbar showQAbtn={showQAbtn} showBtnFun={() => {
                        setshowQAbtn(true)
                    }} showHide={() => {
                        setshowQA(!showQA)
                    }} />
                }

                {
                    showPoll && <Poll showHide={() => {
                        setshowPoll(!showPoll)
                    }} />
                }

                {
                    showParticipants && <Participants showHide={() => {
                        setshowParticipants(!showParticipants)
                    }} Info={getUesrId} />
                }

                {
                    showWhiteBoard && <WhiteBoard />
                }

                {
                    showbreakoutRoom && <BreakoutRoom showHide={() => {
                        setshowbreakoutRoom(!showbreakoutRoom)
                    }} />
                }
                {
                    // isStarted ? (userEmali.includes("@zicops"))? " " :<AdvertisePopup/>:""
                    // https://www.youtube.com/watch?v=QNuILonXlRo
                    // isStarted ? <AdvertisePopup/> :''
                    // isStarted ? (userEmali.includes("@zicops"))? stopAdvertisement() :startAdvertisement():""
                }
                {
                    showresourcePage && <ResourcePage showHide={() => {
                        setresourcePage(!showresourcePage)
                    }} />
                }
                {
                    showAbout && <About showHide={() => {
                        setshowAbout(!showAbout)
                    }} />
                }
                {
                    showQuiz && <QuizPage showHide={() => {
                        setshowQuiz(!showQuiz)
                    }} />
                }
            </div>

            <div className={`${styles.toolbar_footer}`} id={fade1 ? `${styles.fadeout1}` : `${styles.fadein1}`}>
                <div className={`${styles.footer_left}`}>
                    <div>
                        <VctoolButton onClickfun={() => {
                            endMeetng()
                        }} trueSrc={"/images/svg/vctool/logout.svg"} falseSrc={"/images/svg/vctool/logout.svg"}
                            customStyle={`${styles.cansel_btn}`} btnValue={"Leave"}
                        />
                    </div>

                    <VctoolButton onClickfun={() => {
                        setAudio()
                    }} trueSrc={"/images/svg/vctool/mic-on.svg"} falseSrc={"/images/svg/vctool/mic-off.svg"} toggle={audiotoggle} />

                    <VctoolButton onClickfun={() => {
                        setVideo()
                    }} trueSrc={"/images/svg/vctool/videocam-on.svg"} falseSrc={"/images/svg/vctool/videocam-off.svg"} toggle={videotoggle} />


                    <VctoolButton onClickfun={() => {
                        shareScreen()
                    }} trueSrc={"/images/svg/vctool/present-to-all.svg"} falseSrc={"/images/svg/vctool/present-to-all.svg"} />

                    <VctoolButton onClickfun={() => {
                        sethand(!hand)
                        handRiseFun()
                    }} toggle={hand} trueSrc={"/images/svg/vctool/back-hand.svg"} falseSrc={"/images/svg/vctool/back-hand-on.svg"}
                        customId={hand ? `${styles.footer_left_btn1}` : `${styles.footer_left_btn2}`} />
                </div>
                <div className={`${styles.footer_right}`}>

                    <VctoolButton onClickfun={() => {
                        setshowQA(!showQA)
                        setshowChat(false)
                        setshowPoll(false)
                        setshowbreakoutRoom(false)
                        setresourcePage(false)
                        setshowParticipants(false)
                        setshowAbout(false)
                        setshowQuiz(false)
                    }} trueSrc={"/images/svg/vctool/help.svg"} falseSrc={"/images/svg/vctool/help.svg"} />


                    <VctoolButton onClickfun={() => {
                        setshowChat(!showChat)
                        setresourcePage(false)
                        setshowQA(false)
                        setshowPoll(false)
                        setshowbreakoutRoom(false)
                        setshowParticipants(false)
                        setshowAbout(false)
                        setshowQuiz(false)
                    }} trueSrc={"/images/svg/vctool/chat-bubble.svg"} falseSrc={"/images/svg/vctool/chat-bubble.svg"} />

                    <VctoolButton onClickfun={() => {
                        setshowQA(false)
                        setshowChat(false)
                        setresourcePage(false)
                        setshowParticipants(false)
                        setshowbreakoutRoom(false)
                        setshowPoll(!showPoll)
                        setshowAbout(false)
                        setshowQuiz(false)
                    }} trueSrc={"/images/svg/vctool/insert-chart.svg"} falseSrc={"/images/svg/vctool/insert-chart.svg"} />



                    <VctoolButton onClickfun={() => {
                        setshowQA(false)
                        setresourcePage(false)
                        setshowChat(false)
                        setshowPoll(false)
                        setshowbreakoutRoom(false)
                        setshowParticipants(!showParticipants)
                        setshowAbout(false)
                        setshowQuiz(false)
                    }} trueSrc={"/images/svg/vctool/group.svg"} falseSrc={"/images/svg/vctool/group.svg"} />


                    <VctoolButton onClickfun={() => {
                        setshowQA(false)
                        setshowChat(false)
                        setresourcePage(false)
                        setshowPoll(false)
                        setshowbreakoutRoom(!showbreakoutRoom)
                        setshowParticipants(false)
                        setshowAbout(false)
                        setshowQuiz(false)
                    }} trueSrc={"/images/svg/vctool/account-tree.svg"} falseSrc={"/images/svg/vctool/account-tree.svg"} />

                    <button><img src="/images/svg/vctool/settings.svg" /> </button>


                    <VctoolButton onClickfun={() => {
                        fullScreenFun()
                    }} toggle={fullscreen} trueSrc={"/images/svg/vctool/fullscreen-exit.svg"} falseSrc={"/images/svg/vctool/fullscreen.svg"} />
                </div>

            </div>
        </div>
    )
};
export default MainToolbar;