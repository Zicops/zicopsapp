import { quizArray } from "@/state/atoms/vctool.atoms";
import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import styles from "../vctoolMain.module.scss";
import QuizOptionBox from "./QuizOptionBox";
const QuizQA = ({cancelRoom,showQuiz}) => {
    const difficultyLevels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const difficultyLevelsRf = useRef(null)
    const [quizName, setQuizName] = useState('');
    const [quizQuestion, setQuizQuestion] = useState('');
    const [difficultyLevel, setDifficultyLevel] = useState(1);
    const [hint, setHint] = useState('')
    const [options, setOptions] = useState({
        option1: '',
        option2: '',
        option3: '',
        option4: ''
    })
    const [answer, setAnswer] = useState('')

    const [quizAtom, setQuizAtom] = useRecoilState(quizArray)
    const [isChecked, setIsChecked] = useState(false)
    return (
        <div className={`${styles.quizQAcontainer}`}>
            <div className={`${styles.quizeQALabel}`}>Create Quiz</div>
            <div className={`${styles.quizQuestionBox}`}>
                <div className={`${styles.quizName}`}>
                    <div>Quiz name:</div>
                    <input type="text" placeholder="Enter quiz name" value={quizName}
                        onChange={(e) => {
                            setQuizName(e.target.value)
                        }} />
                </div>
                <div className={`${styles.quizQuestion}`}>
                    <div className={`${styles.quizQA}`}>Question :</div>
                    <div className={`${styles.quizQuestionBoxs}`}>
                        <input type="text" placeholder="Enter question here" value={quizQuestion}
                            onChange={(e) => {
                                setQuizQuestion(e.target.value)
                            }} />
                        <img src="/images/svg/vctool/image.svg" />
                    </div>
                </div>
            </div>
            <div className={`${styles.quizDifficultyLevel}`}> Difficulty Level:</div>
            <div className={`${styles.quizeLevels}`} ref={difficultyLevelsRf}>
                {
                    difficultyLevels.map((data) => {
                        return <input value={data < 10 ? `0${data}` : data} type="button" onClick={() => {
                            setDifficultyLevel(data)
                        }} />
                    })
                }
            </div>
            <div className={`${styles.quizHint}`}>
                <p>Hint :</p>
                <input type="text" placeholder="Enter hint here" value={hint} onChange={(e) => {
                    setHint(e.target.value)
                }} />
            </div>
            <div className={`${styles.quizOptionsLabel}`}>Options</div>

            <p className={`${styles.quizOptionNotice}`}>*please select the correct option</p>

            <QuizOptionBox isChecked={isChecked} click={() => {
                setIsChecked(!isChecked)
            }} optionNumber={1} values={options?.option1} onChange={(e) => {
                setOptions(
                    {
                        ...options,
                        option1: e.target.value
                    }
                )
            }} />
            <QuizOptionBox click={() => {
                setIsChecked(!isChecked)
            }} optionNumber={2} values={options?.option2} onChange={(e) => {
                setOptions(
                    {
                        ...options,
                        option2: e.target.value
                    }
                )
            }} />
            <QuizOptionBox click={() => {
                setIsChecked(!isChecked)
            }} optionNumber={3} values={options?.option3} onChange={(e) => {
                setOptions(
                    {
                        ...options,
                        option3: e.target.value
                    }
                )
            }} />
            <QuizOptionBox click={() => {
                setIsChecked(!isChecked)
            }} optionNumber={4} values={options?.option4} onChange={(e) => {
                setOptions(
                    {
                        ...options,
                        option4: e.target.value
                    }
                )
            }} />
            <div className={`${styles.quizQABtns}`}>
                <button className={`${styles.quizeOptioncancelBtn}`} onClick={()=>
                {
                    cancelRoom()
                }}>cancel</button>
                <button className={`${styles.quizeOptionSaveBtn}`} onClick={() => {
                  if(quizName!=='' && quizQuestion!=='' && hint!=='')
                  {
                    if(options?.option1!==''&& options?.option2!==''&& options?.option3!=='' && options?.option4!=='')
                    {
                        setQuizAtom([
                            ...quizAtom,
                            {
                                quizName: quizName,
                                quizQuestion: quizQuestion,
                                difficultyLevel: difficultyLevel,
                                hint: hint,
                                options: options,
                                answer: ''
                            }
                        ])
                    }
                  }

                    setQuizName("")
                    setQuizQuestion("")
                    setDifficultyLevel(1)
                    setHint('')
                    setOptions({
                        option1: '',
                        option2: '',
                        option3: '',
                        option4: ''
                    })
                    // setQuizInfo([])
                    showQuiz();
                }}>Save</button>
            </div>
        </div>
    )
};
export default QuizQA;