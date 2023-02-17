import styles from "../VctoolMain.module.scss"
const BreakoutRoom=({showHide})=>
{
    return(
        <>
         <div className={`${styles.BreakoutRoomBar}`}>
            <div className={`${styles.breakout_head}`}>
                <div>Breakout Rooms</div>
                <button onClick={() => {
                    showHide()
                }}>
                    <img src="/images/svg/vctool/close.svg" />
                </button>
            </div>

            <div style={{
                width:"296px",
                height:"45%",
                overflow:"scroll"
            }} className={`${styles.BreakoutRoom_Screen}`}>

           {/* list of breakout rooms */}

            </div>

            <div style={{
              width:"296px",
              height:"45%",
              overflow:"scroll"
            }} className={`${styles.BreakoutRoom_participants}`}>

            </div>
            <div>

            </div>
{/* 
            <div className={`${styles.Poll_input}`}>
                <input type="text" placeholder="Type message here" />
                <div className={`${styles.chatsendfile}`}>
                    <img src="/images/svg/vctool/image.svg" />
                    <img src="/images/svg/vctool/send.svg" />
                </div>
            </div> */}
        </div>
        </>
    )
};
export default BreakoutRoom;