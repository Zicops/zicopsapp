import next from "next";
import { useEffect, useState } from "react";
import styles from "../VctoolMain.module.scss"
const MainToolbar = ({ audiotoggle, videotoggle,SetAudio,SetVideo,EndMeetng,ShareScreen,HandRiseFun }) => {
    const[fade1,setfade1]=useState(true)
    const[fade2,setfade2]=useState(true)
    const [hand,sethand]=useState(true)
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
                <button><img src="/images/svg/vctool/folder-open.svg" /></button>
                <button><img src="/images/svg/vctool/library-books.svg" /></button>
                <button><img src="/images/svg/vctool/sticky-note-2.svg" /></button>
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
                            EndMeetng()
                        }} className={`${styles.cansel_btn}`} >
                            <img style={{ "marginRight": "10px" }} src="/images/svg/vctool/logout.svg" />
                            Leave
                        </button>
                    </div>
                    <button onClick={()=>{
                       SetAudio()
                    }} >

                        {
                            audiotoggle ? <img  src="/images/svg/vctool/mic-on.svg" />
                                : <img src="/images/svg/vctool/mic-off.svg" />
                        }

                    </button>
                    <button onClick={()=>
                    {
                            SetVideo()
                    }}>
                        {
                            videotoggle ? <img src="/images/svg/vctool/videocam-on.svg" />
                                : <img src="/images/svg/vctool/videocam-off.svg" />
                        }
                    </button>
                    <button onClick={()=>
                    {
                        ShareScreen()
                    }}><img src="/images/svg/vctool/present-to-all.svg" /></button>

                    <button style={hand ?{backgroundColor:"#202222"} : {backgroundColor :"white"}} onClick={()=>
                    {
                        sethand(!hand)
                        HandRiseFun()
                    }} >
                    {
                        hand ?
                        <img src="/images/svg/vctool/back-hand.svg" />
                        :
                        <img src="/images/svg/vctool/back-hand-on.svg" />
                    }
                    </button>
                </div>
                <div className={`${styles.footer_right}`}>
                    <button><img src="/images/svg/vctool/help.svg" /> </button>
                    <button><img src="/images/svg/vctool/chat-bubble.svg" /> </button>
                    <button><img src="/images/svg/vctool/insert-chart.svg" /> </button>
                    <button><img src="/images/svg/vctool/group.svg" /> </button>
                    <button><img src="/images/svg/vctool/account-tree.svg" /> </button>
                    <button><img src="/images/svg/vctool/settings.svg" /> </button>
                    <button><img src="/images/svg/vctool/fullscreen-exit.svg" /> </button>
                </div>

            </div>
        </div>
    )
};
export default MainToolbar;