import { formLabelClasses } from "@mui/material";
import styles from "../vctoolMain.module.scss";
const QAbar = ({showQAbtn,showBtnFun,showHide=false}) => {
       return (
        <div className={`${styles.qaBar}`}>
            <div className={`${styles.qaBarhead}`}>
                <div>Q & A</div>
                <button onClick={() => {
                    showHide()
                }}>
                    <img src="/images/svg/vctool/close.svg" />
                </button>
            </div>

            <div className={`${styles.qaBarscreen}`}>
            </div>


            {
                showQAbtn ? <div className={`${styles.qaBarinput}`}>
                    <input type="text" placeholder="Type message here" />
                    <div className={`${styles.qaSendfile}`}>
                        <img src="/images/svg/vctool/image.svg" />
                        <img src="/images/svg/vctool/send.svg" />
                    </div>
                </div> :
                    <div style={{
                        height: "86px",
                        width: "300px",
                        display: "flex",
                        justifyContent: "right",
                        marginTop: "55px"
                    }}>
                        <button
                            onClick={() => {
                                showBtnFun()
                            }} className={`${styles.qaBtn}`}>
                            Ask a Question?
                        </button>
                    </div>
            }

        </div>
    )
};
export default QAbar;