import { useState } from "react";
import styles from "../vctoolMain.module.scss"
const QAbar = ({showQAbtn,showBtnFun,showHide}) => {
       return (
        <div className={`${styles.QAbar}`}>
            <div className={`${styles.QAbar_head}`}>
                <div>Q & A</div>
                <button onClick={() => {
                    showHide()
                }}>
                    <img src="/images/svg/vctool/close.svg" />
                </button>
            </div>

            <div className={`${styles.QAbar_Screen}`}>
            </div>


            {
                showQAbtn ? <div className={`${styles.QAbar_input}`}>
                    <input type="text" placeholder="Type message here" />
                    <div className={`${styles.QAsendfile}`}>
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
                            }} className={`${styles.QAbtn}`}>
                            Ask a Question?
                        </button>
                    </div>
            }

        </div>
    )
};
export default QAbar;