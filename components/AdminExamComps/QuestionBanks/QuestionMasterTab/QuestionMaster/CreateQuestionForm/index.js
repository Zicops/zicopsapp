import { useEffect } from 'react';
import { useState } from 'react';
import { changeHandler } from '../../../../../../helper/common.helper';
import Button from '../../../../../common/Button';
import LabeledDropdown from '../../../../../common/FormComponents/LabeledDropdown';
import LabeledTextarea from '../../../../../common/FormComponents/LabeledTextarea';
import RangeSlider from '../../../../../common/FormComponents/RangeSlider';
import InputWithCheckbox from '../../../../../common/InputWithCheckbox';
import TextInputWithFile from '../../../../../common/InputWithCheckbox/TextInputWithFile';
import Accordion from '../../../../../small/Accordion';
import McqCard from '../../../../common/McqCard';
import { acceptedFileTypes } from '../../../Logic/questionBank.helper';
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
    isEditQuestion,
    saveQuestion
  } = data;

  const NUMBER_OF_OPTIONS = 4;
  const difficultyOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((val) => ({
    label: val,
    value: val
  }));

  const [shouldCloseAccordion, setShouldCloseAccordion] = useState(null);
  const [showQuestionForm, setShowQuestionForm] = useState(false);

  useEffect(() => {
    if (questionData?.type === 'MCQ') {
      setShowQuestionForm(true);
      return setShouldCloseAccordion(true);
    }

    setShouldCloseAccordion(null);
    setShowQuestionForm(false);
  }, [questionData, questionsArr]);

  useEffect(() => {
    if (isEdit) setShowQuestionForm(true);
    if (showQuestionForm) setShouldCloseAccordion(true);
  }, [isEdit]);

  return (
    <>
      <div className={styles.accordionContainer}>
        {questionsArr?.map((d, index) => {
          return (
            <div className={styles.container}>
              <Accordion
                title={d.question.description}
                content={
                  <McqCard
                    questionData={d.question}
                    optionData={d.options}
                    handleEdit={() => activateEdit(index)}
                  />
                }
                closeAccordion={shouldCloseAccordion}
                onClose={() => {
                  console.log(shouldCloseAccordion);
                  if (questionData?.type === 'MCQ') return;
                  console.log(1);
                  setShouldCloseAccordion(null);
                }}
              />
            </div>
          );
        })}
      </div>

      {!showQuestionForm ? (
        <div className={`center-element-with-flex`}>
          <Button text="Add Question" clickHandler={() => setShowQuestionForm(true)} />
        </div>
      ) : (
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
              value: questionData?.type
                ? { value: questionData.type, label: questionData.type }
                : null
            }}
            changeHandler={(e) => changeHandler(e, questionData, setQuestionData, 'type')}
          />

          {questionData?.type === 'MCQ' && (
            <>
              <RangeSlider
                options={difficultyOptions}
                inputName="difficulty"
                selected={questionData.difficulty}
                changeHandler={(e, val) => setQuestionData({ ...questionData, difficulty: val })}
              />

              {/* question with file */}
              <div className={styles.marginTop}>
                <label>
                  Enter Question:
                  <TextInputWithFile
                    inputName="description"
                    value={questionData?.description}
                    fileNmae={questionData?.file?.name || questionData?.attachment}
                    accept={acceptedFileTypes.join(', ')}
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
                Enter Options:
                <span className={`${styles.hint}`}>Select the checkbox for the right option.</span>
                {Array(NUMBER_OF_OPTIONS)
                  .fill(null)
                  .map((value, index) => (
                    <InputWithCheckbox
                      key={index}
                      labelCount={index + 1}
                      acceptedTypes={acceptedFileTypes.join(', ')}
                      isCorrectHandler={(e) => optionInputHandler(e, index)}
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
              </div>

              {!isEdit && (
                <div className={`center-element-with-flex`}>
                  <Button
                    text={
                      isEditQuestion
                        ? 'Update Question'
                        : `Add ${questionsArr.length ? 'Next' : 'the'} Question`
                    }
                    clickHandler={saveQuestion}
                  />
                </div>
              )}
            </>
          )}
        </>
      )}
    </>
  );
}
