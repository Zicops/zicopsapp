import InputWithCheckbox from '@/common/InputWithCheckbox';
import LabeledTextarea from '@/components/common/FormComponents/LabeledTextarea';
import RangeSlider from '@/components/common/FormComponents/RangeSlider';
import { useRecoilValue } from 'recoil';
import { QuizAtom, QuizMetaDataAtom } from '../../../../../state/atoms/module.atoms';
import Bar from '../../../../common/Bar';
import Button from '../../../../common/Button';
import LabeledDropdown from '../../../../common/FormComponents/LabeledDropdown';
import LabeledInput from '../../../../common/FormComponents/LabeledInput';
import LabeledRadioCheckbox from '../../../../common/FormComponents/LabeledRadioCheckbox';
import IconButton from '../../../../common/IconButton';
import TextInputWithFile from '../../../../common/InputWithCheckbox/TextInputWithFile';
import styles from '../../../courseTabs.module.scss';
import useAddQuiz from '../../Logic/useAddQuiz';

export default function QuizForm({ courseId, topicId }) {
  const {
    newQuiz,
    setNewQuiz,
    handleQuizInput,
    addNewQuiz,
    isQuizFormVisible,
    toggleQuizForm,
    isQuizReady
  } = useAddQuiz(courseId, topicId);

  const quizzes = useRecoilValue(QuizAtom);
  const quizMetaData = useRecoilValue(QuizMetaDataAtom);
  const acceptedType = ['image/png', 'image/gif', 'image/jpeg', 'image/svg+xml'];
  const NUMBER_OF_OPTIONS = 4;

  const difficultyOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((val) => ({
    label: val,
    value: val
  }));
  return (
    <>
      {quizzes &&
        quizzes?.map((quiz, index) => (
          <Bar key={quiz.name + index} index={index + 1} text={quiz.name} type={quiz.type} />
        ))}

      {isQuizFormVisible && (
        <>
          <div className={`${styles.popUpFormContainer}`}>
            <div className={`center-element-with-flex`}>
              <LabeledRadioCheckbox
                type="checkbox"
                label="is Mandatory"
                name="isMandatory"
                isChecked={newQuiz?.isMandatory}
                changeHandler={handleQuizInput}
              />
            </div>

            <div className={`${styles.quizInput}`}>
              <LabeledInput
                inputOptions={{
                  label: 'Quiz Name',
                  inputName: 'name',
                  placeholder: 'Enter Quiz name',
                  maxLength: 20,
                  value: newQuiz.name
                }}
                changeHandler={handleQuizInput}
              />

              <div className={`${styles.newline}`}>
                <span className={`${styles.label}`}>Start Time</span>
                <input
                  type="text"
                  name="startTimeMin"
                  className={`${styles.valuae}`}
                  value={newQuiz.startTimeMin}
                  onChange={(e) => {
                    if (isNaN(e.target.value)) return;
                    handleQuizInput(e);
                  }}
                />
                :
                <input
                  type="text"
                  name="startTimeSec"
                  className={`${styles.valuae}`}
                  value={newQuiz.startTimeSec}
                  onChange={(e) => {
                    if (isNaN(e.target.value)) return;
                    handleQuizInput(e);
                  }}
                />
                {/* <span className={`${value">20:00</span> */}
                <span className={`${styles.after}`}>(Mins: Secs)</span>
              </div>
            </div>

            <div className={`center-element-with-flex ${styles.flexCenterWithGap}`}>
              <LabeledRadioCheckbox
                type="radio"
                label="Create Quiz"
                name="formType"
                value={'create'}
                isChecked={newQuiz?.formType === 'create'}
                changeHandler={handleQuizInput}
              />
              <LabeledRadioCheckbox
                type="radio"
                label="Upload Quiz"
                name="formType"
                value={'upload'}
                isChecked={newQuiz?.formType === 'upload'}
                changeHandler={handleQuizInput}
              />
              <LabeledRadioCheckbox
                type="radio"
                label="Select Quiz"
                name="formType"
                value={'select'}
                isChecked={newQuiz?.formType === 'select'}
                changeHandler={handleQuizInput}
              />
            </div>

            {newQuiz?.formType === 'create' && (
              <>
                <div className={`${styles.quizInput} ${styles.quizType}`}>
                  <LabeledDropdown
                    dropdownOptions={{
                      label: 'Quiz Type',
                      inputName: 'type',
                      placeholder: 'Select Type',
                      value: { value: newQuiz?.type, label: newQuiz?.type },
                      options: [
                        { value: 'MCQ', label: 'MCQ' },
                        { value: 'Descriptive', label: 'Descriptive', disabled: true }
                      ]
                    }}
                    changeHandler={handleQuizInput}
                  />
                </div>

                <RangeSlider
                  options={difficultyOptions}
                  inputName="difficulty"
                  selected={newQuiz?.difficulty}
                  changeHandler={(e, val) => setNewQuiz({ ...newQuiz, difficulty: val })}
                />

                {/* question with file */}
                <div className={styles.marginTop}>
                  <label>
                    Enter Question:
                    <TextInputWithFile
                      inputName="question"
                      value={newQuiz?.question}
                      fileNmae={newQuiz?.questionFile?.name}
                      accept={acceptedType.join(', ')}
                      changeHandler={handleQuizInput}
                      fileInputHandler={handleQuizInput}
                    />
                  </label>
                </div>

                {/*  hint */}
                <div className={styles.marginTop}>
                  <label>
                    Enter Hint:
                    <LabeledTextarea
                      styleClass={styles.inputLabelGap}
                      inputOptions={{
                        inputName: 'hint',
                        placeholder: 'Enter hint in less than 300 characters.',
                        rows: 4,
                        value: newQuiz?.hint
                      }}
                      changeHandler={handleQuizInput}
                    />
                  </label>
                </div>

                {/* options */}
                <div className={styles.marginTop}>
                  <label>
                    Enter Options:{' '}
                    <span className={`${styles.hint}`}>
                      Select the checkbox for the right option.
                    </span>
                  </label>
                  {Array(NUMBER_OF_OPTIONS)
                    .fill(null)
                    .map((value, index) => (
                      <InputWithCheckbox
                        key={index}
                        labelCount={index + 1}
                        isCorrectHandler={(e) => handleQuizInput(e, index)}
                        inputChangeHandler={(e) => handleQuizInput(e, index)}
                        fileInputHandler={(e) => handleQuizInput(e, index)}
                        optionData={{
                          fileName: newQuiz?.options[index]?.file?.name,
                          inputValue: newQuiz?.options[index]?.option,
                          inputName: 'option'
                        }}
                      />
                    ))}
                </div>
              </>
            )}

            {newQuiz?.formType === 'select' && (
              <>
                <LabeledDropdown
                  styleClass={styles.inputField}
                  // filterOption={(option, searchQuery) => {
                  //   if (!option?.data?.noOfQuestions) return false;

                  //   if (searchQuery)
                  //     return option.label?.toLowerCase()?.includes(searchQuery?.toLowerCase());
                  //   if (!metaData?.category && !metaData?.sub_category) return true;

                  //   if (!metaData?.category)
                  //     return option?.data?.sub_category === metaData?.sub_category;
                  //   if (!metaData?.sub_category)
                  //     return option?.data?.category === metaData?.category;

                  //   return (
                  //     option?.data?.category === metaData?.category &&
                  //     option?.data?.sub_category === metaData?.sub_category
                  //   );
                  // }}
                  dropdownOptions={{
                    inputName: 'questionId',
                    label: 'Questions:',
                    placeholder: 'Select from the existing question',
                    options: quizMetaData?.questions
                      ?.map((q) => {
                        // if (quizzes?.find((quiz) => quiz?.questionId === q?.id)) return null;

                        return { value: q?.id, label: q?.Description };
                      })
                      ?.filter((q) => q),
                    value: { value: newQuiz?.questionId, label: newQuiz?.question },
                    isSearchEnable: true,
                    menuPlacement: 'top'
                  }}
                  changeHandler={(e) =>
                    setNewQuiz({ ...newQuiz, question: e?.label, questionId: e?.value })
                  }
                />
              </>
            )}
            {/* footer btn */}
            <div className="center-element-with-flex">
              <Button
                text="Cancel"
                clickHandler={toggleQuizForm}
                styleClass={styles.topicContentSmallBtn}
              />
              <Button
                text="Add"
                clickHandler={addNewQuiz}
                styleClass={styles.topicContentSmallBtn}
                isDisabled={!isQuizReady}
              />
            </div>
          </div>
        </>
      )}

      <div className={`${styles.centerAccordinBtn}`}>
        <IconButton styleClass="btnBlack" text="Add Quiz" handleClick={toggleQuizForm} />
      </div>
    </>
  );
}
