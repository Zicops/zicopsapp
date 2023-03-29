import { DELETE_TOPIC_QUIZ } from '@/api/Mutations';
import InputWithCheckbox from '@/common/InputWithCheckbox';
import DeleteBtn from '@/components/common/DeleteBtn';
import LabeledTextarea from '@/components/common/FormComponents/LabeledTextarea';
import RangeSlider from '@/components/common/FormComponents/RangeSlider';
import UploadForm from '@/components/common/FormComponents/UploadForm';
import { getFileNameFromUrl } from '@/helper/utils.helper';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { getQuizObject, QuizAtom, QuizMetaDataAtom } from '../../../../../state/atoms/module.atoms';
import Bar from '../../../../common/Bar';
import Button from '../../../../common/Button';
import LabeledDropdown from '../../../../common/FormComponents/LabeledDropdown';
import LabeledInput from '../../../../common/FormComponents/LabeledInput';
import LabeledRadioCheckbox from '../../../../common/FormComponents/LabeledRadioCheckbox';
import IconButton from '../../../../common/IconButton';
import TextInputWithFile from '../../../../common/InputWithCheckbox/TextInputWithFile';
import styles from '../../../courseTabs.module.scss';
import useAddQuiz from '../../Logic/useAddQuiz';

export default function QuizForm({ courseId, topicId, isScrom = false, isFormOpen = () => {} }) {
  const {
    newQuiz,
    setNewQuiz,
    handleQuizInput,
    addNewQuiz,
    isQuizFormVisible,
    toggleQuizForm,
    isQuizReady,
    handleEditQuiz
  } = useAddQuiz(courseId, topicId, isScrom);

  useEffect(() => {
    isFormOpen(isQuizFormVisible);
  }, [isQuizFormVisible]);

  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);
  const [quizzes, setQuizzes] = useRecoilState(QuizAtom);
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
          <Bar
            key={quiz?.name + index}
            index={index + 1}
            text={quiz?.name}
            type={
              <div className={styles.editQuizContainer}>
                <span>{quiz?.type}</span>
                <span
                  className={styles.editQuiz}
                  onClick={() => {
                    if (isQuizFormVisible)
                      return setToastMsg({
                        type: 'danger',
                        message: 'Please add or cancel the current quiz form'
                      });
                    handleEditQuiz(quiz, index);
                  }}>
                  <img src="/images/svg/edit-box-line.svg" alt="" />
                </span>

                <DeleteBtn
                  id={quiz?.id}
                  resKey="deleteQuiz"
                  mutation={DELETE_TOPIC_QUIZ}
                  onDelete={() => {
                    const _quiz = structuredClone(quizzes);
                    const index = !quiz?.id ? index : _quiz?.findIndex((q) => q?.id === quiz?.id);
                    if (index >= 0) _quiz.splice(index, 1);

                    setQuizzes(_quiz);
                  }}
                />
              </div>
            }
          />
        ))}

      {isQuizFormVisible && (
        <>
          <div className={`${styles.popUpFormContainer}`}>
            {/* <div className={`center-element-with-flex`}>
              <LabeledRadioCheckbox
                type="checkbox"
                label="is Mandatory"
                name="isMandatory"
                isChecked={newQuiz?.isMandatory}
                changeHandler={handleQuizInput}
              />
            </div> */}

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
                {!isScrom && (
                  <>
                    <span className={`${styles.label}`}>Start Time</span>
                    <input
                      type="text"
                      name="startTimeMin"
                      className={`${styles.valuae}`}
                      value={newQuiz.startTimeMin?.toString()?.replace(/^0+/, '') || 0}
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
                      value={newQuiz.startTimeSec?.toString()?.replace(/^0+/, '') || 0}
                      onChange={(e) => {
                        if (isNaN(e.target.value)) return;
                        handleQuizInput(e);
                      }}
                    />
                    {/* <span className={`${value">20:00</span> */}
                    <span className={`${styles.after}`}>(Mins: Secs)</span>
                  </>
                )}
              </div>
            </div>

            <div className={`center-element-with-flex ${styles.flexCenterWithGap}`}>
              <LabeledRadioCheckbox
                type="radio"
                label="Create Quiz"
                name="formType"
                value={'create'}
                isDisabled={
                  !(
                    newQuiz?.name &&
                    (isScrom ? true : !!+newQuiz?.startTimeMin || !!+newQuiz?.startTimeSec)
                  )
                }
                isChecked={newQuiz?.formType === 'create'}
                changeHandler={handleQuizInput}
              />
              {/* <LabeledRadioCheckbox
                type="radio"
                label="Upload Quiz"
                name="formType"
                value={'upload'}
                isChecked={newQuiz?.formType === 'upload'}
                isDisabled={
                  !(
                    newQuiz?.name &&
                    (isScrom ? true : !!+newQuiz?.startTimeMin || !!+newQuiz?.startTimeSec)
                  )
                }
                changeHandler={handleQuizInput}
              /> */}
              <LabeledRadioCheckbox
                type="radio"
                label="Select Quiz"
                name="formType"
                value={'select'}
                isChecked={newQuiz?.formType === 'select'}
                isDisabled={
                  !(
                    newQuiz?.name &&
                    (isScrom ? true : !!+newQuiz?.startTimeMin || !!+newQuiz?.startTimeSec)
                  )
                }
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
                <label>
                  Difficulty Score:
                  {/* <CustomTooltip
                    info={
                      ADMIN_EXAMS.myQuestionBanks.viewQuestionsDetails.viewQuestions.difficultyLevel
                    }
                  /> */}
                </label>
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
                      fileNmae={
                        newQuiz?.questionFile?.name || getFileNameFromUrl(newQuiz?.attachment)
                      }
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
                          fileName:
                            newQuiz?.options[index]?.file?.name ||
                            getFileNameFromUrl(newQuiz?.options[index]?.attachment),
                          inputValue: newQuiz?.options[index]?.option,
                          isCorrect: newQuiz?.options[index]?.isCorrect,
                          inputName: 'option'
                        }}
                      />
                    ))}
                </div>
              </>
            )}

            {newQuiz?.formType === 'upload' && (
              <UploadForm
                leftGapClass="w-16"
                filePath={'/templates/question-bank-template.xlsx'}
                customStyles={{ gap: '25px', margin: '30px 0px' }}
              />
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
                        if (quizzes?.find((quiz) => quiz?.questionId === q?.id)) return null;

                        return { value: q?.id, label: q?.Description };
                      })
                      ?.filter((q) => q),
                    value: { value: newQuiz?.questionId, label: newQuiz?.question },
                    isSearchEnable: true,
                    menuPlacement: 'top',
                    noOptionsMessage: 'No Quiz Questions Available'
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
                clickHandler={() => toggleQuizForm(newQuiz?.questionId)}
                styleClass={styles.topicContentSmallBtn}
              />
              <Button
                text={newQuiz?.id ? 'Update' : 'Add'}
                clickHandler={addNewQuiz}
                styleClass={`${styles.topicContentSmallBtn} ${
                  isQuizReady ? styles.formFilled : ''
                }`}
                isDisabled={!isQuizReady}
              />
            </div>
          </div>
        </>
      )}

      <div className={`${styles.centerAccordinBtn}`}>
        <IconButton
          styleClass="btnBlack"
          text="Add Quiz"
          isDisabled={isQuizFormVisible}
          handleClick={() => {
            setNewQuiz(getQuizObject({ courseId, topicId }));
            toggleQuizForm();
          }}
        />
      </div>
    </>
  );
}
