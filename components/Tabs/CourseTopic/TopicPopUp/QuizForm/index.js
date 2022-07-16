import { useRecoilValue } from 'recoil';
import { QuizAtom } from '../../../../../state/atoms/module.atoms';
import Bar from '../../../../common/Bar';
import Button from '../../../../common/Button';
import LabeledDropdown from '../../../../common/FormComponents/LabeledDropdown';
import LabeledInput from '../../../../common/FormComponents/LabeledInput';
import LabeledRadioCheckbox from '../../../../common/FormComponents/LabeledRadioCheckbox';
import IconButton from '../../../../common/IconButton';
import InputWithCheckbox from '@/common/InputWithCheckbox';
import TextInputWithFile from '../../../../common/InputWithCheckbox/TextInputWithFile';
import styles from '../../../courseTabs.module.scss';
import useAddQuiz from '../../Logic/useAddQuiz';

export default function QuizForm({ courseId, topicId }) {
  const { newQuiz, handleQuizInput, addNewQuiz, isQuizFormVisible, toggleQuizForm, isQuizReady } =
    useAddQuiz(courseId, topicId);

  const quiz = useRecoilValue(QuizAtom);
  const acceptedType = ['image/png', 'image/gif', 'image/jpeg', 'image/svg+xml'];
  const NUMBER_OF_OPTIONS = 4;

  return (
    <>
      {quiz &&
        quiz.map((quiz, index) => (
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
            </div>

            {newQuiz?.formType === 'create' ? (
              <>
                <div className={`${styles.quizInput}`}>
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

                {/* options */}
                <div className={styles.marginTop}>
                  <label>
                    Enter Options:{' '}
                    <span className={`${styles.hint}`}>
                      Select the checkbox for the right option.
                    </span>
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
                  </label>
                </div>
              </>
            ) : (
              <></>
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
