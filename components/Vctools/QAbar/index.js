import { DiscussionAtom } from "@/state/atoms/discussion.atoms";
import { UserStateAtom } from "@/state/atoms/users.atom";
import { AQChatAtom } from "@/state/atoms/vctool.atoms";
import { formLabelClasses } from "@mui/material";
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styles from "../vctoolMain.module.scss";
import EmptyQa from "./EmptyQa";
import VcQaMessageBlock from "./VcQaMessageBlock";
const QAbar = ({ showHide = false }) => {
    const [showQAbtn, setshowQAbtn] = useState(false)
    const [message, setMessage] = useState('');
    const [messageArr, setMessageArr] = useRecoilState(AQChatAtom);
    const [sendMessage, setSendMessage] = useState(false);
    const userDetails = useRecoilValue(UserStateAtom);
    const sendMessageHandler = () => {
        setSendMessage(true);
        setMessageArr([
            ...messageArr,
            {
                id: Math.floor(Date.now() / 1000 + 1),
                content: message,
                time: Math.floor(Date.now() / 1000),
                user: {
                    id: userDetails?.id
                }
            }
        ]);
        setMessage('');
    };
    const onMessageHandler = (e) => {
        setMessage(e.target.value);
    };
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            if (message !== '') {
                sendMessageHandler();
            }

        }
    };

    function getReplies(data) {
        const replies = {};
        for (let i = 0; i < data?.length; i++) {
            const message = data[i];
            if (message?.reply_id) {
                const parent = data?.find((m) => m.id === message?.reply_id);
                if (parent) {
                    if (!replies[parent?.id]) {
                        replies[parent?.id] = {
                            parent: parent,
                            replies: []
                        };
                    }
                    replies[parent?.id]?.replies?.push(message);
                }
            } else {
                if (!replies[message?.id]) {
                    replies[message?.id] = {
                        parent: message,
                        replies: []
                    };
                }
            }
        }
        return Object.values(replies).map((r) => ({
            parent: r?.parent,
            replies: r?.replies?.sort((a, b) => a.time - b.time)
        }));
    }

    const replies = getReplies(messageArr);
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
                {
                    messageArr.length==0 ? <EmptyQa/>:
                    replies?.map((data) => {
                    let isRight = data?.parent?.user?.id === userDetails?.id;
                    return (
                        <>
                            <VcQaMessageBlock message={data?.parent} isLeft={!isRight} />
                        </>
                    );
                })
                }
            </div>


            {
                showQAbtn ? <div className={`${styles.qaBarInput}`}>
                    <input type="text" placeholder="Type message here"
                        value={message}
                        onChange={onMessageHandler}
                        onKeyDown={handleKeyPress} 
                        />
                    <div className={`${styles.qaSendFile}`}>
                        <img src="/images/svg/vctool/image.svg" />
                        <img src="/images/svg/vctool/send.svg" 
                        onClick={sendMessageHandler}
                        />
                    </div>
                </div> :
                    <div className={`${styles.qabarBtnContainer}`} >
                        <button
                            onClick={() => {
                                setshowQAbtn(!showQAbtn)

                            }} className={`${styles.qaBtn}`}>
                            Ask a Question?
                        </button>
                    </div>
            }

        </div>
    )
};
export default QAbar;