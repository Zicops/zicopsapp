import LabeledRadioCheckbox from "@/components/common/FormComponents/LabeledRadioCheckbox";
import styles from "../vctoolMain.module.scss"
const QuizOptionBox = ({ optionNumber, values, onChange, isChecked,click }) => {
    return (
        <div className={`${styles.quizOptionBoxContainer}`}>
            <div className={`${styles.quizSelectedOption}`}>

                <LabeledRadioCheckbox
                    type="checkbox"
                    // name="lspId"
                    isChecked={isChecked}
                    isDisabled={false}
                changeHandler={()=>
                {
                    click()
                }}
                />
                <p>{`option ${optionNumber}`}</p>
            </div>
            <div className={`${styles.quizOptionInputBox}`}>
                <input type="text " placeholder={`Enter option ${optionNumber}`} value={values} onChange={onChange} />
                <img src="/images/svg/vctool/image.svg" />
            </div>
        </div>
    )
};
export default QuizOptionBox;