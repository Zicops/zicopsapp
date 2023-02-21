import styles from "../vctoolMain.module.scss";
const Poll = ({ showHide=false }) => {
    return (
        <div className={`${styles.pollBar}`}>
            <div className={`${styles.pollHead}`}>
                <div>Polls</div>
                <button onClick={() => {
                    showHide()
                }}>
                    <img src="/images/svg/vctool/close.svg" />
                </button>
            </div>

            <div className={`${styles.pollScreen}`}>



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