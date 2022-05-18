import { changeHandler } from '../../../../../../helper/common.helper';
import LabeledDropdown from '../../../../../common/FormComponents/LabeledDropdown';
import LabeledTextarea from '../../../../../common/FormComponents/LabeledTextarea';
import TextInputWithFile from '../../../../common/TextInputWithFile';
import useHandleQuestionBankQuestion from '../../../Logic/useHandleQuestionBankQuestion';
import styles from '../../questionMasterTab.module.scss';
import InputWithCheckbox from './InputWithCheckbox';

export default function CreateQuestionForm() {
  const {
    questionData,
    setQuestionData,
    optionData,
    questionFileInputHandler,
    optionInputHandler
  } = useHandleQuestionBankQuestion();

  const NUMBER_OF_OPTIONS = 4;
  const difficultyOptions = [
    { label: '0', value: 1 },
    { label: '1', value: 2 },
    { label: '2', value: 3 },
    { label: '4', value: 4 },
    { label: '5', value: 5 },
    { label: '6', value: 6 },
    { label: '7', value: 7 },
    { label: '8', value: 8 },
    { label: '9', value: 9 },
    { label: '10', value: 10 }
  ];
  return (
    <>
      <LabeledDropdown
        dropdownOptions={{
          inputName: 'type',
          label: 'Select Question Type: ',
          placeholder: 'Select question type',
          options: [
            { label: 'MCQ', value: 'MCQ' },
            { label: 'Descriptive', value: 'Descriptive', disabled: true }
          ],
          value: questionData?.type ? { value: questionData.type, label: questionData.type } : null
        }}
        changeHandler={(e) => changeHandler(e, questionData, setQuestionData, 'type')}
      />

      {questionData.type === 'MCQ' && (
        <>
          <LabeledDropdown
            styleClass={styles.marginTop}
            dropdownOptions={{
              inputName: 'difficulty',
              label: 'Select Question Difficulty: ',
              placeholder: 'Select question difficulty',
              options: difficultyOptions,
              value: questionData?.difficulty
                ? {
                    value: questionData.difficulty,
                    label: difficultyOptions[questionData.difficulty - 1].label
                  }
                : null
            }}
            changeHandler={(e) => changeHandler(e, questionData, setQuestionData, 'difficulty')}
          />

          {/* question with file */}
          <div className={styles.marginTop}>
            <label>
              Enter Question:
              <TextInputWithFile
                inputName="description"
                fileNmae={questionData?.file?.name}
                changeHandler={(e) => changeHandler(e, questionData, setQuestionData)}
                fileInputHandler={questionFileInputHandler}
              />
            </label>
          </div>

          {/* exam hint */}
          <div className={styles.marginTop}>
            <label>
              Enter Hint:
              <LabeledTextarea
                styleClass={styles.inputLabelGap}
                inputOptions={{
                  inputName: 'hint',
                  placeholder: 'Enter hint in less than 300 characters.',
                  rows: 4
                }}
                changeHandler={(e) => changeHandler(e, questionData, setQuestionData)}
              />
            </label>
          </div>

          <div className={styles.marginTop}>
            <label>
              Enter Options:
              <span className={`${styles.hint}`}>Select the checkbox for the right option.</span>
              {Array(NUMBER_OF_OPTIONS)
                .fill(null)
                .map((value, index) => (
                  <InputWithCheckbox
                    labelCount={index + 1}
                    isCorrectHandler={(e) => {
                      optionInputHandler(e, index);
                    }}
                    fileNmae={optionData[index]?.file?.name}
                    inputChangeHandler={(e) => optionInputHandler(e, index)}
                    fileInputHandler={(e) => optionInputHandler(e, index)}
                  />
                ))}
            </label>
          </div>
        </>
      )}
    </>
  );
}
