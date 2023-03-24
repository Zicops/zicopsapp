import { pollArray, vcMeetingIconAtom } from "@/state/atoms/vctool.atoms";
import { useRecoilState } from "recoil";
import styles from "../vctoolMain.module.scss"
import PollBox from "./PollBox";
const ShowPoll = ({ setPollTitle, deletePoll }) => {
    const [pollInfo, setPollInfo] = useRecoilState(pollArray)
    return (
        <div>
            <div className={`${styles.pollScreenContainer}`}>
                {
                    pollInfo.map((data, index) => {
                        return (data.pollName !== '' && data.pollQuestion !== '') && <PollBox pollNumber={`Poll ${index}`} pollQuestion={data.pollQuestion}
                            options={pollInfo[index].pollOptions} deletePoll={() => {
                                deletePoll()
                            }} />
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