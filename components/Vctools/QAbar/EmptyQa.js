import styles from "../vctoolMain.module.scss"
const EmptyQa = () => {
    return (
        <div className={`${styles.moderatorQA}`}>
            <div className={`${styles.qaAddQuestion}`}>
                <div className={styles.qaRoomIcon}><img src='/images/svg/vctool/help.svg' /></div>
                <div className={`${styles.qaQuetionAvailableAvailableHead}`}>No questions !</div>
                <p>click bellow to ask question</p>
            </div>
            {/* <button className={`${styles.addBreakoutroombtn}`} onClick={() => {
                // addRoom()
            }}>Add Room</button> */}
        </div>
    )
};
export default EmptyQa;