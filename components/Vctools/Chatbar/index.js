import styles from "../vctoolMain.module.scss";
const ChatBar = ({ showHide }) => {
    return (
        <div className={`${styles.chatbar}`}>
            <div className={`${styles.chatbar_head}`}>
                <div>Chat</div>
                <button onClick={() => {
                    showHide()
                }}>
                    <img src="/images/svg/vctool/close.svg" />
                </button>
            </div>

            <div className={`${styles.chatbar_Screen}`}>



            </div>

            <div className={`${styles.chatbar_input}`}>
                <input type="text" placeholder="Type message here" />
                <div className={`${styles.chatsendfile}`}>
                    <img src="/images/svg/vctool/image.svg" />
                    <img src="/images/svg/vctool/send.svg" />
                </div>
            </div>
        </div>
    )
};
export default ChatBar;