import styles from "../vctoolMain.module.scss";
const ChatBar = ({ showHide=false }) => {
    return (
        <div className={`${styles.chatbar}`}>
            <div className={`${styles.chatbarHead}`}>
                <div>Chat</div>
                <button onClick={() => {
                    showHide()
                }}>
                    <img src="/images/svg/vctool/close.svg" />
                </button>
            </div>

            <div className={`${styles.chatbarScreen}`}>



            </div>

            <div className={`${styles.chatbarInput}`}>
                <input type="text" placeholder="Type message here" />
                <div className={`${styles.chatSendFile}`}>
                    <img src="/images/svg/vctool/image.svg" />
                    <img src="/images/svg/vctool/send.svg" />
                </div>
            </div>
        </div>
    )
};
export default ChatBar;