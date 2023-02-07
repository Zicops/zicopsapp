import next from "next";
import { useEffect, useState } from "react";
import styles from "../VctoolMain.module.scss"
const MainToolbar = ({ audiotoggle, videotoggle,setaudio,setvideo,endMeetng,shareScreen }) => {
    const[fade1,setfade1]=useState(true)
    const[fade2,setfade2]=useState(true)
    return (
        <div className={`${styles.toolbar}`} >
            <div className={`${styles.toolbar_nav }`}
            id={fade1 ? `${styles.fadeout1}` : `${styles.fadein1}`}
            onMouseLeave={()=>
            {
                setfade1(false)
            }} onMouseOver={()=>
            {
                setfade1(true)
            }}>
                <button><img src="/images/svg/vctool/folder_open.svg" /></button>
                <button><img src="/images/svg/vctool/library_books.svg" /></button>
                <button><img src="/images/svg/vctool/sticky_note_2.svg" /></button>
                <button><img src="/images/svg/vctool/quiz.svg" /></button>
                <button><img src="/images/svg/vctool/dashboard.svg" /></button>
                <button><img src="/images/svg/vctool/info.svg" /></button>
            </div>
            <div className={`${styles.screen}`} onMouseOverCapture={()=>
            {
                setfade1(false)
                setfade2(false)
            }}>

            </div>
            <div className={`${styles.toolbar_footer}`} 
            id={fade2 ? `${styles.fadeout2}` : `${styles.fadein2}`}
             onMouseLeave={()=>
            {
                setfade2(false)
            }} onMouseOver={()=>
            {
                setfade2(true)
            }}>
                <div className={`${styles.footer_left}`}>
                    <div>
                        <button onClick={()=>
                        {
                            endMeetng()
                        }} className={`${styles.cansel_btn}`} >
                            <img style={{ "marginRight": "10px" }} src="/images/svg/vctool/logout.svg" />
                            Leave
                        </button>
                    </div>
                    <button onClick={()=>{
                       setaudio()
                    }} >

                        {
                            audiotoggle ? <img  src="/images/svg/vctool/mic_on.svg" />
                                : <img src="/images/svg/vctool/mic_off.svg" />
                        }

                    </button>
                    <button onClick={()=>
                    {
                            setvideo()
                    }}>
                        {
                            videotoggle ? <img src="/images/svg/vctool/videocam_on.svg" />
                                : <img src="/images/svg/vctool/videocam_off.svg" />
                        }
                    </button>
                    <button onClick={()=>
                    {
                        shareScreen()
                    }}><img src="/images/svg/vctool/present_to_all.svg" /></button>
                    <button><img src="/images/svg/vctool/back_hand.svg" /></button>
                </div>
                <div className={`${styles.footer_right}`}>
                    <button><img src="/images/svg/vctool/help.svg" /> </button>
                    <button><img src="/images/svg/vctool/chat_bubble.svg" /> </button>
                    <button><img src="/images/svg/vctool/insert_chart.svg" /> </button>
                    <button><img src="/images/svg/vctool/group.svg" /> </button>
                    <button><img src="/images/svg/vctool/account_tree.svg" /> </button>
                    <button><img src="/images/svg/vctool/settings.svg" /> </button>
                    <button><img src="/images/svg/vctool/fullscreen_exit.svg" /> </button>
                </div>

            </div>
        </div>
    )
};
export default MainToolbar;