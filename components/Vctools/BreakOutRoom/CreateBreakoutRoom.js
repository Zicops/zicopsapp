import styles from "../vctoolMain.module.scss"
const CreateBreakoutRoom=({addRoom})=>
{
    return(
        <div className={`${styles.moderatorBreakoutroom}`}>
        <div className={`${styles.moderatorAddroom}`}>
            <div className={styles.breakouRoomIcon}><img src='/images/svg/vctool/videocam-on.svg' /></div>
            <div className={`${styles.breakoutRoomAvailableHead}`}>No rooms available !</div>
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