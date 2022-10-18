import CustomTooltip from '@/components/common/CustomTooltip';
import QuestionOptionView from '@/components/common/QuestionOptionView';
import ToolTip from '@/components/common/ToolTip';
import { ADMIN_EXAMS } from '@/components/common/ToolTip/tooltip.helper';
import { OPTION_LABEL } from '@/helper/constants.helper';
import { useEffect, useState } from 'react';
import Button from '../../../../../common/Button';
import LabeledDropdown from '../../../../../common/FormComponents/LabeledDropdown';
import LabeledTextarea from '../../../../../common/FormComponents/LabeledTextarea';
import RangeSlider from '../../../../../common/FormComponents/RangeSlider';
import InputWithCheckbox from '../../../../../common/InputWithCheckbox';
import TextInputWithFile from '../../../../../common/InputWithCheckbox/TextInputWithFile';
import Accordion from '../../../../../small/Accordion';
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
                  <div className={`${styles.questionPreview}`}>
                    <QuestionOptionView
                      questionData={d.question}
                      optionData={d.options}
                      style={{ backgroundColor: 'transparent' }}
                    />

                    <div style={{ textAlign: 'right', marginRight: '10px' }}>
                      <Button text={'Edit'} clickHandler={() => activateEdit(index)} />
                    </div>
                  </div>
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
        <ToolTip title="Add new question" placement="bottom">
          <div className={`center-element-with-flex`}>
            <Button
              text="Add Question"
              clickHandler={() => {
                setShouldCloseAccordion(true);
                setShowQuestionForm(true);
              }}
            />
          </div>
        </ToolTip>
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
            changeHandler={(e) =>
              setQuestionData({ ...questionData, isUpdated: true, type: e.value })
            }
          />

          {questionData?.type === 'MCQ' && (
            <>
              <div className={styles.marginTop}>
                <label>
                  Difficulty Score:
                  <CustomTooltip
                    info={
                      ADMIN_EXAMS.myQuestionBanks.viewQuestionsDetails.viewQuestions.difficultyLevel
                    }
                  />
                  <RangeSlider
                    options={difficultyOptions}
                    inputName="difficulty"
                    selected={questionData.difficulty}
                    changeHandler={(e, val) =>
                      setQuestionData({ ...questionData, difficulty: val, isUpdated: true })
                    }
                  />
                </label>
              </div>

              {/* question with file */}
              <div className={styles.marginTop}>
                <label>
                  Enter Question:
                  <TextInputWithFile
                    inputName="description"
                    value={questionData?.description}
                    fileNmae={questionData?.file?.name || questionData?.attachment}
                    accept={acceptedFileTypes.join(', ')}
                    changeHandler={(e) =>
                      setQuestionData({
                        ...questionData,
                        isUpdated: true,
                        description: e.target.value
                      })
                    }
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
                    changeHandler={(e) =>
                      setQuestionData({ ...questionData, isUpdated: true, hint: e.target.value })
                    }
                  />
                </label>
              </div>

              {/* options */}
              <div className={styles.marginTop}>
                Enter Options:
                <span className={`${styles.hint}`}>
                  Select the checkbox for the right option.
                  <CustomTooltip
                    info={
                      ADMIN_EXAMS.myQuestionBanks.viewQuestionsDetails.viewQuestions.selectCheckbox
                    }
                  />
                </span>
                {Array(NUMBER_OF_OPTIONS)
                  .fill(null)
                  .map((value, index) => (
                    <InputWithCheckbox
                      key={index}
                      labelCount={OPTION_LABEL[index]}
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
