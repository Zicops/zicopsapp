import { pollArray } from "@/state/atoms/vctool.atoms";
import { useEffect, useState } from "react"
import { useRecoilState, useRecoilValue } from "recoil";
import styles from "../vctoolMain.module.scss"
const ParticipantPollBox = ({ pollNumber, publish, pollQuestion, options,deletePoll }) => {
    const [expand, setexpand] = useState(true)
    return (
        <div className={`${styles.quizQuestion}`}>
            <div className={`${styles.pollQuestionhead}`} >
                <div className={`${styles.pollLable}`}>
                    <img src="/images/svg/vctool/insert-chart.svg" />
                    <div style={{
                        color: "white",
                        fontSize: "14px"
                    }}>{pollNumber}</div>
                </div>
                <div className={`${styles.quizeExpand}`}>
                    <div className={`${styles.publishPollHead}`}>{publish}publish</div>
                    <button onClick={() => {
                        setexpand(!expand)
                    }}>
                        {
                            <img src={expand ? "/images/svg/vctool/expand-more.svg" : "/images/svg/vctool/expand-less.svg"} />
                        }
                    </button>
                </div>
            </div>

            <div>
                {
                    !expand ? <div className={`${styles.pollQuestionScreen}`} >
                        <div className={`${styles.pollSavedLabel}`}>Saved</div>
                        <div className={`${styles.pollQuestions}`}>{pollQuestion}</div>
                        <div className={`${styles.ParticipantPollBoxOptions}`}>
                            {
                                options.map((data ,index) => {
                                    return (
                                        <div><input type="radio" value={index}/>{data.value}</div>
                                    )
                                })
                            }
                        </div>
                        <div className={`${styles.pollBoxBtns}`}>
                            {/* <button className={`${styles.pollBoxDeleteBnt}`} onClick={()=>
                            {
                                deletePoll();
                            }}>Delete</button>
                            <button className={`${styles.pollBoxEditBnt}`}>Edit</button> */}
                        </div>
                        {/* <button className={`${styles.publishPoll}`}>Publish</button> */}
                    </div> : ""
                }
            </div>
        </div>
    )
};
export default ParticipantPollBox;