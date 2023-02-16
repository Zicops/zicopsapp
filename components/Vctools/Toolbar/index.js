import next from "next";
import { useEffect, useState } from "react";
import styles from "../vctoolMain.module.scss";
import ChatBar from "../Chatbar";
import QAbar from "../QAbar";
import Poll from "../Polls";
import Participants from "../Participants";
import WhiteBoard from "../WhiteBoard";
import BreakoutRoom from "../BreakOutRoom";
import VctoolButton from "../Vctoolbutton";
const MainToolbar = ({ audiotoggle, videotoggle, setAudio, setVideo, endMeetng, shareScreen,
    handRiseFun, fullScreenFun, fullscreen, getUesrId, mouseMoveFun }) => {
    const [fade1, setfade1] = useState(true)
    const [fade2, setfade2] = useState(true)
    const [hand, sethand] = useState(true)
    const [showQA, setshowQA] = useState(false)
    const [showChat, setshowChat] = useState(false)
    const [showQAbtn, setshowQAbtn] = useState(false)
    const [showPoll, setshowPoll] = useState(false)
    const [showWhiteBoard, setshowWhiteBoard] = useState(false);
    const [showParticipants, setshowParticipants] = useState(false)
    const [showbreakoutRoom, setshowbreakoutRoom] = useState(false)
    return (
        <div className={`${styles.toolbar}`} onMouseMove={() => {
            mouseMoveFun()
        }}>
            <div className={`${styles.toolbar_nav}`}
                id={fade1 ? `${styles.fadeout1}` : `${styles.fadein1}`}
                onMouseLeave={() => {
                    setfade1(false)
                }} onMouseOver={() => {
                    setfade1(true)
                }}>
                <button><img src="/images/svg/vctool/folder-open.svg" /></button>
                <button><img src="/images/svg/vctool/library-books.svg" /></button>
                <VctoolButton onClickfun={() => {
                    setshowWhiteBoard(!showWhiteBoard)
                }} trueSrc={"/images/svg/vctool/sticky-note-2.svg"} falseSrc={"/images/svg/vctool/sticky-note-2.svg"} />

                <button><img src="/images/svg/vctool/quiz.svg" /></button>
                <button><img src="/images/svg/vctool/dashboard.svg" /></button>
                <button><img src="/images/svg/vctool/info.svg" /></button>
            </div>
            <div className={`${styles.screen}`} onMouseOverCapture={() => {
                setfade1(false)
                setfade2(false)
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

            </div>

            <div className={`${styles.toolbar_footer}`} id={fade1 ? `${styles.fadeout1}` : `${styles.fadein1}`}
                onMouseLeave={() => {
                    setfade1(false)
                }} onMouseOver={() => {
                    setfade1(true)
                }}>
                <div className={`${styles.footer_left}`}>
                    <div>
                        <VctoolButton onClickfun={() => {
                            endMeetng()
                        }} trueSrc={"/images/svg/vctool/logout.svg"} falseSrc={"/images/svg/vctool/logout.svg"}
                            custamStyle={`${styles.cansel_btn}`} btnValue={"Leave"}
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
                        custamId={hand ? `${styles.footer_left_btn1}` : `${styles.footer_left_btn2}`} />
                </div>
                <div className={`${styles.footer_right}`}>

                    <VctoolButton onClickfun={() => {
                        setshowQA(!showQA)
                        setshowChat(false)
                        setshowPoll(false)
                        setshowbreakoutRoom(false)
                        setshowParticipants(false)
                    }} trueSrc={"/images/svg/vctool/help.svg"} falseSrc={"/images/svg/vctool/help.svg"} />


                    <VctoolButton onClickfun={() => {
                        setshowChat(!showChat)
                        setshowQA(false)
                        setshowPoll(false)
                        setshowbreakoutRoom(false)
                        setshowParticipants(false)
                    }} trueSrc={"/images/svg/vctool/chat-bubble.svg"} falseSrc={"/images/svg/vctool/chat-bubble.svg"} />

                    <VctoolButton onClickfun={() => {
                        setshowQA(false)
                        setshowChat(false)
                        setshowParticipants(false)
                        setshowbreakoutRoom(false)
                        setshowPoll(!showPoll)
                    }} trueSrc={"/images/svg/vctool/insert-chart.svg"} falseSrc={"/images/svg/vctool/insert-chart.svg"} />



                    <VctoolButton onClickfun={() => {
                        setshowQA(false)
                        setshowChat(false)
                        setshowPoll(false)
                        setshowbreakoutRoom(false)
                        setshowParticipants(!showParticipants)
                    }} trueSrc={"/images/svg/vctool/group.svg"} falseSrc={"/images/svg/vctool/group.svg"} />


                    <VctoolButton onClickfun={() => {
                        setshowQA(false)
                        setshowChat(false)
                        setshowPoll(false)
                        setshowbreakoutRoom(!showbreakoutRoom)
                        setshowParticipants(false)
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