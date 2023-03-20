import { pollArray } from "@/state/atoms/vctool.atoms";
import { useRecoilState } from "recoil";
import styles from "../vctoolMain.module.scss"
import PollBox from "./PollBox";
const ShowPoll = ({ setPollTitle }) => {
    const [pollInfo, setPollInfo] = useRecoilState(pollArray)
    return (
        <div>
            <div className={`${styles.pollScreenContainer}`}>
                {
                    pollInfo.map((data, index) => {
                        return (data.pollName !== '' && data.pollOptions !== '') && <PollBox pollNumber={`Poll ${index}`} pollQuestion={data.pollQuestion} 
                        Options={pollInfo[index].pollOptions} />
                    })
                }
            </div>
            <button className={`${styles.addPollBtn}`} onClick={() => {
                setPollTitle()
            }}><div>+</div>Create New Poll</button>
        </div>
    )
};
export default ShowPoll;