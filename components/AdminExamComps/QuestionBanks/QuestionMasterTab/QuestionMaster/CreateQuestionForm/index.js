import { changeHandler } from '../../../../../../helper/common.helper';
import LabeledDropdown from '../../../../../common/FormComponents/LabeledDropdown';
import LabeledTextarea from '../../../../../common/FormComponents/LabeledTextarea';
import InputWithCheckbox from '../../../../../common/InputWithCheckbox';
import TextInputWithFile from '../../../../../common/InputWithCheckbox/TextInputWithFile';
import Accordion from '../../../../../small/Accordion';
import McqCard from '../../../../common/McqCard';
import { imageTypes } from '../../../Logic/questionBank.helper';
import styles from '../../questionMasterTab.module.scss';

export default function CreateQuestionForm({ data, isEdit }) {
  const {
    questionsArr,
    questionData,
    setQuestionData,
    optionData,
    questionFileInputHandler,
    optionInputHandler,
    activateEdit,
    saveQuestion
  } = data;

  const NUMBER_OF_OPTIONS = 4;
  const difficultyOptions = [
    { label: 1, value: 1 },
    { label: 2, value: 2 },
    { label: 3, value: 3 },
    { label: 4, value: 4 },
    { label: 5, value: 5 }
  ];

  return (
    <>
      {questionsArr?.map((d, index) => {
        return (
          <Accordion
            title={d.question.description}
            content={
              <McqCard
                questionData={d.question}
                optionData={d.options}
                handleEdit={() => activateEdit(index)}
              />
            }
          />
        );
      })}

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

      {questionData?.type === 'MCQ' && (
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
                value={questionData?.description}
                fileNmae={questionData?.file?.name || questionData?.attachment}
                accept={imageTypes.join(', ')}
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
                  rows: 4,
                  value: questionData?.hint
                }}
                changeHandler={(e) => changeHandler(e, questionData, setQuestionData)}
              />
            </label>
          </div>

          {/* options */}
          <div className={styles.marginTop}>
            <label>
              Enter Options:
              <span className={`${styles.hint}`}>Select the checkbox for the right option.</span>
              {Array(NUMBER_OF_OPTIONS)
                .fill(null)
                .map((value, index) => (
                  <InputWithCheckbox
                    key={index}
                    labelCount={index + 1}
                    isCorrectHandler={(e) => {
                      optionInputHandler(e, index);
                    }}
                    optionData={{
                      fileName: optionData[index]?.file?.name || optionData[index]?.attachment,
                      inputValue: optionData[index]?.description,
                      inputName: 'description',
                      isCorrect: optionData[index]?.isCorrect
                    }}
                    inputChangeHandler={(e) => optionInputHandler(e, index)}
                    fileInputHandler={(e) => optionInputHandler(e, index)}
                  />
                ))}
            </label>
          </div>

          {!isEdit && (
            <div className={`center-element-with-flex`}>
              <button onClick={saveQuestion}>Add the Question</button>
            </div>
          )}
        </>
      )}
    </>
  );
}
