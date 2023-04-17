import styles from "../vctoolMain.module.scss"
import QuizQuestion from "../QuizQuestion";
import CreateQuiz from "./CreateQuiz";
import QuizQA from "./QuizQA";
import { useState } from "react";
import ShowQuiz from "./ShowQuiz";
import { useRecoilState, useRecoilValue } from "recoil";
import { CurrentParticipantDataAtom, activequizArr, particiapntQuiz, quizArray } from "@/state/atoms/vctool.atoms";
const QuizPage = ({ hide = false }) => {
    const quizArr = useRecoilValue(quizArray)
    const [activeQuiz, setActiveQuiz] = useRecoilState(activequizArr);
    const currentParticipantData = useRecoilValue(CurrentParticipantDataAtom);
    const [participantQuizAtom, setParticiapntQuizAtom] = useRecoilState(particiapntQuiz);
    const [objTitle, setObjTitle] = useState('')
    function showQuiz(title) {
        if (title === '') return <>{(quizArr.length > 1 || activeQuiz.length >=1 ) ? quizComponent[2].component : quizComponent[0].component}</>
        const obj = quizComponent.find(obTitle => obTitle.title === title);
        return obj?.component;
    }
    const quizComponent = [{
        title: "CreateQuiz",
        component: (<CreateQuiz addQuiz={() => {
            setObjTitle('QuizQA')
        }} />)
    },
    {
        title: "QuizQA",
        component: (<QuizQA cancelRoom={() => {
            setObjTitle('CreateQuiz')
            { quizArr.length > 1 ? setObjTitle('showQuiz') : setObjTitle('CreateQuiz') }
        }} showQuiz={() => {
            setObjTitle("showQuiz")
        }} />)
    },
    {
        title: "showQuiz",
        component: (<ShowQuiz addQuiz={() => {
            setObjTitle("QuizQA")
        }} />)
    }
    ]
    return (
        <div className={`${styles.quiz}`}>
            <div className={`${styles.quizHead}`}>
                <div>Quiz</div>
                <button onClick={() => {
                    hide()
                }}>
                    <img src="/images/svg/vctool/close.svg" />
                </button>
            </div>

            <div className={`${styles.quizScreen}`}>
                {
                    !!currentParticipantData.isModerator ? (
                        <>{showQuiz(objTitle)}</>
                    ): participantQuizAtom.unAttemptedQuiz.length <1 && participantQuizAtom.attemtedQuiz.length<1 ?
                    <CreateQuiz/> : <ShowQuiz/>
                }
            </div>
        </div>
    )
};
export default QuizPage;