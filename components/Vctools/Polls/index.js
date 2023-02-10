import styles from "../VctoolMain.module.scss"
const Poll = ({ShowHide}) => {
    return (
        <div className={`${styles.Pollbar}`}>
            <div className={`${styles.Poll_head}`}>
                <div>Polls</div>
                <button onClick={() => {
                    ShowHide()
                }}>
                    <img src="/images/svg/vctool/close.svg" />
                </button>
            </div>

            <div className={`${styles.Poll_Screen}`}>



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
    )
};
export default Poll;