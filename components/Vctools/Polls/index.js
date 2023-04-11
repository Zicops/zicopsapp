import { pollArray, vcMeetingIconAtom } from "@/state/atoms/vctool.atoms";
import { useState } from "react";
import { useRecoilState } from "recoil";
import DeletePoUp from "../DeletePopUp";
import styles from "../vctoolMain.module.scss";
import CreatePOll from "./CreatePoll";
import PollQA from "./PollQA";
import ShowPoll from "./ShowPoll";
import ParticipantPollScreen from "./ParticipantPollScreen";
const Poll = ({ hide = false,deletePollPopUp }) => {
    const [polltitle, setPollTitle] = useState('')
    const [pollInfo, setPollInfo] = useRecoilState(pollArray)
    const [meetingIconsAtom, setMeetingIconAtom] = useRecoilState(vcMeetingIconAtom)
    function showPollPopup(title) {
        if (title === '') return <>{(pollInfo.length > 1) ? pollComponent[2].component : pollComponent[1].component} </>;
        const pollObj = pollComponent.find(obj => obj.title == title)
        return pollObj?.component
    }
    const pollComponent = [
        {
            title: 'pollQA',
            component: (<PollQA ShowPoll={() => {
                setPollTitle("showPoll")
            }} goToCreatePoll={() => {
                if (pollInfo.length > 1) {
                    setPollTitle('showPoll')
                }
                else {
                    setPollTitle("emptyPoll")
                }
            }} />)
        },
        {
            title: "emptyPoll",
            component: (<CreatePOll setPollTitle={() => {
                setPollTitle("pollQA")
            }} />)
        },
        {
            title: "showPoll",
            component: (<ShowPoll setPollTitle={() => {
                setPollTitle("pollQA")
            }} deletePoll={()=>{
                deletePollPopUp()
            }}/>)
        }
    ]
    return (
        <div className={`${styles.pollBar}`}>
            <div className={`${styles.pollHead}`}>
                <div>Polls</div>
                <button onClick={() => {
                    hide()
                }}>
                    <img src="/images/svg/vctool/close.svg" />
                </button>
            </div>

            <div className={`${styles.pollScreen}`}>
                {
                    meetingIconsAtom.isModerator ?<>{showPollPopup(polltitle)}</>
                    :<ParticipantPollScreen/>
                }
            </div>
        </div>
    )
};
export default Poll;