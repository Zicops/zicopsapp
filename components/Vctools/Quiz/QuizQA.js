import useHandleQuiz from '@/components/AdminCourseComps/Logic/useHandleQuiz';
import LabeledInput from '@/components/common/FormComponents/LabeledInput';
import LabeledRadioCheckbox from '@/components/common/FormComponents/LabeledRadioCheckbox';
import { getFileNameFromUrl } from '@/helper/utils.helper';
import { ActiveClassroomTopicIdAtom } from '@/state/atoms/module.atoms';
import { quizArray } from '@/state/atoms/vctool.atoms';
import { useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styles from '../vctoolMain.module.scss';
import InputWithFile from './InputWithFile';

const QuizQA = ({ cancelRoom, showQuiz }) => {
  const difficultyLevels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const difficultyLevelsRf = useRef(null);
  const [quizName, setQuizName] = useState('');
  const [quizQuestion, setQuizQuestion] = useState('');
  const [difficultyLevel, setDifficultyLevel] = useState(1);
  const [hint, setHint] = useState('');
  const [options, setOptions] = useState({
    option1: '',
    option2: '',
    option3: '',
    option4: '',
  });
  const arr = useRecoilValue(quizArray);
  const [selectedOption, setSelectedOption] = useState({
    selectedOption1: false,
    selectedOption2: false,
    selectedOption3: false,
    selectedOption4: false,
  });
  const [answer, setAnswer] = useState('');

  const [quizAtom, setQuizAtom] = useRecoilState(quizArray);
  const activeClassroomTopicId = useRecoilValue(ActiveClassroomTopicIdAtom);

  const {
    quizFormData,
    setQuizFormData,
    handleSubmit,
    isFormVisible,
    toggleForm,
    handleQuizInput,
    isQuizReady,
    handleEditQuiz,
    addSingleQuiz,
  } = useHandleQuiz(activeClassroomTopicId);
  const difficultyOptions = [...Array(10)].map((val, i) => ({ label: i + 1, value: i + 1 }));

  const acceptedFileTypes = [
    'image/png',
    'image/gif',
    'image/jpeg',
    'image/svg+xml',
    'audio/mpeg',
    'audio/mp3',
    'video/mp4',
  ];

  return (
    <div className={`${styles.quizQAcontainer}`}>
      <div className={`${styles.quizeQALabel}`}>Create Quiz</div>
      <div className={`${styles.quizQuestionBox}`}>
        <div className={`${styles.quizName}`}>
          <LabeledInput
            inputOptions={{
              label: 'Quiz Name',
              inputName: 'name',
              placeholder: 'Enter Quiz name',
              maxLength: 20,
              value: quizFormData.name,
            }}
            isColumnWise={true}
            changeHandler={handleQuizInput}
          />
        </div>

        <div className={`${styles.quizQuestion}`}>
          <div className={`${styles.quizQA}`}>Question :</div>

          <InputWithFile
            inputName="question"
            value={quizFormData?.question}
            placeholder="Enter Question"
            fileName={
              quizFormData?.questionFile?.name || getFileNameFromUrl(quizFormData?.attachment)
            }
            accept={acceptedFileTypes.join(', ')}
            changeHandler={handleQuizInput}
          />
        </div>
      </div>

      <div className={`${styles.quizDifficultyLevel}`}> Difficulty Level:</div>
      <div className={`${styles.quizeLevels}`} ref={difficultyLevelsRf}>
        {difficultyLevels.map((data) => {
          return (
            <input
              value={+data}
              type="button"
              name="difficulty"
              style={
                quizFormData?.difficulty === data
                  ? { backgroundColor: styles.primary, color: styles.white }
                  : {}
              }
              onClick={() => setQuizFormData({ ...quizFormData, difficulty: +data })}
            />
          );
        })}
      </div>

      <div className={`${styles.quizName}`}>
        <LabeledInput
          inputOptions={{
            label: 'Hint :',
            inputName: 'hint',
            placeholder: 'Enter hint here',
            value: quizFormData?.hint,
          }}
          isColumnWise={true}
          changeHandler={handleQuizInput}
        />
      </div>

      <div className={`${styles.quizOptionsLabel}`}>Options</div>

      <p className={`${styles.quizOptionNotice}`}>*please select the correct option</p>

      {Array(4)
        .fill(null)
        .map((val, index) => (
          <div className={`${styles.quizOptionBoxContainer}`}>
            <div className={`${styles.quizSelectedOption}`}>
              <LabeledRadioCheckbox
                type="checkbox"
                isChecked={quizFormData?.options[index]?.isCorrect}
                isDisabled={false}
                changeHandler={(e) => handleQuizInput(e, index)}
              />

              <p>{`Option ${index + 1}`}</p>
            </div>

            <InputWithFile
              inputName="option"
              value={quizFormData?.options[index]?.option}
              fileName={
                quizFormData?.options[index]?.file?.name ||
                getFileNameFromUrl(quizFormData?.options[index]?.attachment)
              }
              placeholder="Enter Option"
              accept={acceptedFileTypes.join(', ')}
              changeHandler={(e) => handleQuizInput(e, index)}
            />
          </div>
        ))}
      {/* <InputWithCheckbox
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
              inputName: 'option',
            }}
          /> */}

      <div className={`${styles.quizQABtns}`}>
        <button
          className={`${styles.quizeOptioncancelBtn}`}
          onClick={() => {
            cancelRoom();
          }}>
          Cancel
        </button>
        <button
          className={`${styles.quizeOptionSaveBtn} ${!isQuizReady ? 'disabled' : ''}`}
          disabled={!isQuizReady}
          onClick={async () => {
            const isSuccess = await addSingleQuiz();
            if (isSuccess) cancelRoom();
          }}>
          Save
        </button>
      </div>
    </div>
  );
};
export default QuizQA;
