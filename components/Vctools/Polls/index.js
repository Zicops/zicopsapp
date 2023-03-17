import { useState } from "react";
import styles from "../vctoolMain.module.scss";
import CreatePOll from "./CreatePoll";
import PollQA from "./PollQA";
import ShowPoll from "./ShowPoll";
const Poll = ({ showHide = false }) => {
    const [polltitle, setPollTitle] = useState('')
    function showPollPopup(title) {
        if (title === '') return pollComponent[1].component;
        const pollObj = pollComponent.find(obj => obj.title == title)
        return pollObj?.component
    }
    const pollComponent = [
        {
            title: 'pollQA',
            component: (<PollQA ShowPoll={()=>
            {
                setPollTitle("showPoll")
            }} />)
        },
        {
            title: "emptyPoll",
            component: (<CreatePOll setPollTitle={() => {
                setPollTitle("pollQA")
            }} />)
        },
        {
            title :"showPoll",
            component:(<ShowPoll setPollTitle={()=>
            {
                setPollTitle("pollQA")
            }}/>)
        }
    ]
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
                {showPollPopup(polltitle)}

                {/* <CreatePOll /> */}
                {/* <PollQA/> */}
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