import { formLabelClasses } from "@mui/material";
import styles from "../vctoolMain.module.scss";
const QAbar = ({showQAbtn,showBtnFun,showHide=false}) => {
       return (
        <div className={`${styles.qaBar}`}>
            <div className={`${styles.qaBarHead}`}>
                <div>Q & A</div>
                <button onClick={() => {
                    showHide()
                }}>
                    <img src="/images/svg/vctool/close.svg" />
                </button>
            </div>

            <div className={`${styles.qaBarScreen}`}>
            </div>


            {
                showQAbtn ? <div className={`${styles.qaBarInput}`}>
                    <input type="text" placeholder="Type message here" />
                    <div className={`${styles.qaSendFile}`}>
                        <img src="/images/svg/vctool/image.svg" />
                        <img src="/images/svg/vctool/send.svg" />
                    </div>
                </div> :
                    <div className={`${styles.qabarBtnContainer}`} >
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