import styles from "../vctoolMain.module.scss"
const CreateBreakoutRoom=({addRoom})=>
{
    return(
        <div className={`${styles.moderatorBreakoutroom}`}>
        <div className={`${styles.moderatorAddroom}`}>
            <div className={styles.breakouRoomicon} style={{
                width: "40px",
                height: "40px",
                border: "solid #292F2F 1px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "6px"
            }}><img src='/images/svg/vctool/videocam-on.svg' /></div>
            <div>No rooms available !</div>
            <p>Click below to add breakout room</p>
        </div>
        <button className={`${styles.addBreakoutroombtn}`} onClick={()=>
        {
            addRoom()
        }}>Add Room</button>
    </div>
    )
};
export default CreateBreakoutRoom