import RoundedBtn from '@/components/AdminCourseComps/common/RoundedBtn';
import LabeledDropdown from '@/components/common/FormComponents/LabeledDropdown';
import LabeledInput from '@/components/common/FormComponents/LabeledInput';
import LabeledRadioCheckbox from '@/components/common/FormComponents/LabeledRadioCheckbox';
import LabeledTextarea from '@/components/common/FormComponents/LabeledTextarea';
import RangeSlider from '@/components/common/FormComponents/RangeSlider';
import UploadForm from '@/components/common/FormComponents/UploadForm';
import InputWithCheckbox from '@/components/common/InputWithCheckbox';
import TextInputWithFile from '@/components/common/InputWithCheckbox/TextInputWithFile';
import ToolTip from '@/components/common/ToolTip';
import { ADMIN_COURSES } from '@/components/common/ToolTip/tooltip.helper';
import { TOPIC_CONTENT_TYPES } from '@/constants/course.constants';
import { getFileNameFromUrl } from '@/helper/utils.helper';
import {
  QuestionBankDataAtom,
  TopicContentListAtom,
  TopicQuizAtom
} from '@/state/atoms/courses.atom';
import { useRecoilValue } from 'recoil';
import styles from '../../../adminCourseComps.module.scss';

export default function QuizForm({
  quizFormData = {},
  setQuizFormData,
  isQuizReady = null,
  handleQuizInput = () => {},
  handleCancel = () => {},
  handleSubmit = () => {}
}) {
  const topicQuiz = useRecoilValue(TopicQuizAtom);
  const questionBankData = useRecoilValue(QuestionBankDataAtom);
  const topicContentList = useRecoilValue(TopicContentListAtom);

  const NUMBER_OF_OPTIONS = 4;
  const shouldDisplayTime = topicContentList?.[0]?.type === TOPIC_CONTENT_TYPES.mp4;
  const difficultyOptions = [...Array(10)].map((val, i) => ({ label: i + 1, value: i + 1 }));

  const acceptedFileTypes = [
    'image/png',
    'image/gif',
    'image/jpeg',
    'image/svg+xml',
    'audio/mpeg',
    'audio/mp3',
    'video/mp4'
  ];

  return (
    <>
      <div className={`${styles.quizFormContainer}`}>
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
              value: quizFormData.name
            }}
            changeHandler={handleQuizInput}
          />

          <div className={`${styles.newline}`}>
            {shouldDisplayTime && (
              <>
                <span className={`${styles.label}`}>Start Time</span>
                <input
                  type="text"
                  name="startTimeMin"
                  className={`${styles.valuae}`}
                  value={quizFormData.startTimeMin?.toString()?.replace(/^0+/, '') || 0}
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
                  value={quizFormData.startTimeSec?.toString()?.replace(/^0+/, '') || 0}
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

        <div className={`center-element-with-flex ${styles.quizFormSelect}`}>
          <LabeledRadioCheckbox
            type="radio"
            label="Create Quiz"
            name="formType"
            value={'create'}
            isDisabled={
              !(
                quizFormData?.name &&
                (!shouldDisplayTime
                  ? true
                  : !!+quizFormData?.startTimeMin || !!+quizFormData?.startTimeSec)
              )
            }
            isChecked={quizFormData?.formType === 'create'}
            changeHandler={handleQuizInput}
          />

          <LabeledRadioCheckbox
            type="radio"
            label="Select Quiz"
            name="formType"
            value={'select'}
            isChecked={quizFormData?.formType === 'select'}
            isDisabled={
              !(
                quizFormData?.name &&
                (!shouldDisplayTime
                  ? true
                  : !!+quizFormData?.startTimeMin || !!+quizFormData?.startTimeSec)
              )
            }
            changeHandler={handleQuizInput}
          />
        </div>

        {quizFormData?.formType === 'create' && (
          <>
            <div className={`${styles.quizInput} ${styles.quizType}`}>
              <LabeledDropdown
                dropdownOptions={{
                  label: 'Quiz Type',
                  inputName: 'type',
                  placeholder: 'Select Type',
                  value: { value: quizFormData?.type, label: quizFormData?.type },
                  options: [
                    { value: 'MCQ', label: 'MCQ' },
                    { value: 'Descriptive', label: 'Descriptive', disabled: true }
                  ]
                }}
                changeHandler={handleQuizInput}
              />
            </div>

            <label>Difficulty Score:</label>
            <RangeSlider
              options={difficultyOptions}
              inputName="difficulty"
              selected={quizFormData?.difficulty}
              changeHandler={(e, val) => setQuizFormData({ ...quizFormData, difficulty: val })}
            />

            {/* question with file */}
            <div className={styles.marginBetweenInputs}>
              <label>
                Enter Question:
                <TextInputWithFile
                  inputName="question"
                  value={quizFormData?.question}
                  fileNmae={
                    quizFormData?.questionFile?.name || getFileNameFromUrl(quizFormData?.attachment)
                  }
                  accept={acceptedFileTypes.join(', ')}
                  changeHandler={handleQuizInput}
                  fileInputHandler={handleQuizInput}
                />
              </label>
            </div>

            {/*  hint */}
            <div className={styles.marginBetweenInputs}>
              <label>
                Enter Hint:
                <LabeledTextarea
                  styleClass={styles.inputLabelGap}
                  inputOptions={{
                    inputName: 'hint',
                    placeholder: 'Enter hint in less than 300 characters.',
                    rows: 4,
                    value: quizFormData?.hint
                  }}
                  changeHandler={handleQuizInput}
                />
              </label>
            </div>

            {/* options */}
            <div className={styles.marginBetweenInputs}>
              <label>
                Enter Options:{' '}
                <small className={`${styles.hint}`}>
                  Select the checkbox for the right option.
                </small>
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
                    acceptedTypes={acceptedFileTypes}
                    optionData={{
                      fileName:
                        quizFormData?.options[index]?.file?.name ||
                        getFileNameFromUrl(quizFormData?.options[index]?.attachment),
                      inputValue: quizFormData?.options[index]?.option,
                      isCorrect: quizFormData?.options[index]?.isCorrect,
                      inputName: 'option'
                    }}
                  />
                ))}
            </div>
          </>
        )}

        {quizFormData?.formType === 'upload' && (
          <UploadForm
            leftGapClass="w-16"
            filePath={'/templates/question-bank-template.xlsx'}
            customStyles={{ gap: '25px', margin: '30px 0px' }}
          />
        )}

        {quizFormData?.formType === 'select' && (
          <>
            <LabeledDropdown
              styleClass={styles.inputField}
              dropdownOptions={{
                inputName: 'questionId',
                label: 'Questions:',
                placeholder: 'Select from the existing question',
                options: questionBankData?.questions
                  ?.map((q) => {
                    if (topicQuiz?.find((quiz) => quiz?.questionId === q?.id)) return null;

                    return { value: q?.id, label: q?.Description };
                  })
                  ?.filter((q) => q),
                value: { value: quizFormData?.questionId, label: quizFormData?.question },
                isSearchEnable: true,
                menuPlacement: 'top',
                noOptionsMessage: 'No Quiz Questions Available'
              }}
              changeHandler={(e) =>
                setQuizFormData({ ...quizFormData, question: e?.label, questionId: e?.value })
              }
            />
          </>
        )}
        {/* footer btn */}
        <div className={`center-element-with-flex ${styles.marginBetweenInputs}`}>
          <RoundedBtn display="Cancel" handleClick={handleCancel} />

          <ToolTip title={ADMIN_COURSES.myCourses.subtitles}>
            <RoundedBtn
              display={quizFormData?.id || !!quizFormData?.editIndex ? 'Update' : 'Add'}
              isDisabled={!isQuizReady}
              isActive={isQuizReady}
              handleClick={handleSubmit}
            />
          </ToolTip>
        </div>
      </div>
    </>
  );
}
