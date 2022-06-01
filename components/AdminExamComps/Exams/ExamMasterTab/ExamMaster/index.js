import Select from 'react-select';
import { useRecoilState } from 'recoil';
import { changeHandler } from '../../../../../helper/common.helper';
import { ExamTabDataAtom } from '../../../../../state/atoms/exams.atoms';
import LabeledDropdown from '../../../../common/FormComponents/LabeledDropdown';
import LabeledInput from '../../../../common/FormComponents/LabeledInput';
import LabeledRadioCheckbox from '../../../../common/FormComponents/LabeledRadioCheckbox';
import LabeledTextarea from '../../../../common/FormComponents/LabeledTextarea';
import styles from '../examMasterTab.module.scss';

export default function ExamMaster() {
  const [examTabData, setExamTabData] = useRecoilState(ExamTabDataAtom);
  console.log(examTabData);

  const customStyles = {
    container: (provided, state) => ({
      ...provided,
      width: '100%',
      boxShadow: state.isFocused ? '0px 0px 10px 0px var(--primary)' : 'none'
    }),
    control: (provided, state) => ({
      ...provided,
      backgroundColor: 'var(--dark_two)',
      border:
        !state.isFocused && !state.hasValue
          ? '2px solid var(--dark_three)'
          : '2px solid var(--primary)',
      borderRadius: 0,
      boxShadow: 'none',
      fontSize: '14px',
      '&:hover': {
        borderWidth: '2px'
      }
    }),
    input: (provided, state) => ({ ...provided, color: 'var(--white)' }),
    indicatorSeparator: (provided, state) => ({
      ...provided,
      display: 'none !important'
    }),
    menuList: (provided, state) => ({
      ...provided,
      padding: 0,
      borderRadius: 0,
      maxHeight: '200px',
      /* width */
      '&::-webkit-scrollbar': {
        width: '5px',
        borderRadius: '0px',
        cursor: 'pointer'
      },
      /* Track */
      '&::-webkit-scrollbar-track': {
        background: '#2a2e31',
        borderRadius: '7px'
      },
      /* Handle */
      '&::-webkit-scrollbar-thumb': {
        background: '#969a9d',
        borderRadius: '7px',
        /* Handle on hover */
        '&:hover': {
          background: '#555'
        }
      }
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? 'var(--black)' : 'var(--dark_two)',
      color: state.isSelected ? 'var(--white)' : 'var(--dark_three)',
      borderRadius: 0,
      boxShadow: 'none',
      fontSize: '14px',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: 'var(--black)'
      }
    }),
    singleValue: (provided, state) => ({ ...provided, color: 'var(--white)' }),
    multiValue: (provided, state) => ({
      ...provided,
      backgroundColor: 'var(--primary)'
    }),
    multiValueLabel: (provided, state) => ({
      ...provided,
      color: 'var(--dark_one)',
      fontSize: '14px',
      padding: '5px'
    }),
    multiValueRemove: (provided, state) => ({
      ...provided,
      color: 'var(--dark_one)',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: 'var(--primary)'
      }
    }),
    noOptionsMessage: (provided) => ({
      ...provided,
      borderRadius: '0',
      backgroundColor: 'var(--dark_two)',
      color: 'var(--dark_three)',
      fontSize: '14px'
    })
  };

  return (
    <>
      {/* <LabeledInput
        styleClass={`${styles.inputField}`}
        inputOptions={{
          inputName: 'name',
          label: 'Question Paper Name:',
          placeholder: 'Enter name of the paper (Upto 60 characters)',
          value: examTabData.name
        }}
        changeHandler={(e) => changeHandler(e, examTabData, setExamTabData)}
      /> */}

      {/* question paper dropdown (name and id) */}
      <LabeledDropdown
        styleClass={`${styles.inputField}`}
        dropdownOptions={{
          inputName: 'qpId',
          label: 'Question Paper:',
          placeholder: 'Select Question Paper',
          options: [
            { value: 'c9v6evv8u0hndgpg7b00', label: 'React Question paper without section' }
          ],
          value: { value: examTabData.qbId, label: examTabData?.questionPaperName }
        }}
        changeHandler={(e) =>
          setExamTabData({ ...examTabData, qbId: e.value, questionPaperName: e.label })
        }
      />

      {/* exam name */}
      <LabeledInput
        styleClass={`${styles.inputField}`}
        inputOptions={{
          inputName: 'name',
          label: 'Exam Name:',
          placeholder: 'Enter name of the paper (Upto 60 characters)',
          value: examTabData.name
        }}
        changeHandler={(e) => changeHandler(e, examTabData, setExamTabData)}
      />

      {/* description */}
      <LabeledInput
        styleClass={`${styles.inputField}`}
        inputOptions={{
          inputName: 'description',
          label: 'Description:',
          placeholder: 'Enter description (Upto 60 characters)',
          value: examTabData.description
        }}
      />

      <div className={`${styles.instructionsContainer}`}>
        {/* duration */}
        <LabeledInput
          isFiftyFifty={true}
          styleClass={`${styles.inputField}`}
          inputOptions={{
            inputName: 'duration',
            label: 'Exam Duration:',
            placeholder: 'Enter duration of the exam',
            value: examTabData.duration
          }}
          changeHandler={(e) => changeHandler(e, examTabData, setExamTabData)}
        />
        <LabeledInput
          isFiftyFifty={true}
          styleClass={`${styles.inputField}`}
          inputOptions={{
            inputName: 'totalMarks',
            label: 'Total Marks:',
            placeholder: 'Total Marks'
            // value: examTabData?.totalMarks
          }}
        />
      </div>

      <div className={`${styles.passingCriteriaContainer}`}>
        <label htmlFor="passingCriteria" aria-label="passingCriteria" className="w-45">
          Passing Criteria:
        </label>

        <input
          type="text"
          className="w-75"
          name="passingCriteria"
          placeholder="Passing Criteria"
          value={examTabData?.passingCriteria}
          onChange={(e) => changeHandler(e, examTabData, setExamTabData)}
        />

        <Select
          options={[
            { value: 'Marks', label: 'Marks' },
            { value: 'Percentage', label: 'Percentage' }
          ]}
          // value={value?.value ? value : null}
          // name={inputName}
          // placeholder={placeholder}
          onChange={(e) => setExamTabData({ ...examTabData })}
          className="w-60"
          styles={customStyles}
          isSearchable={false}
          isClearable={false}
        />
      </div>

      <div className={`${styles.totalMarksSection}`}></div>

      <div className={`${styles.attemptsContainer}`}>
        <div className={`w-35 ${styles.checkboxContainer}`}>
          <LabeledRadioCheckbox
            type="checkbox"
            label="Set Max. Attempts Limit"
            name="type"
            value="scheduled"
            isChecked={examTabData.type === 'scheduled'}
            changeHandler={(e) => changeHandler(e, examTabData, setExamTabData)}
          />
        </div>

        <div className="w-65">
          <LabeledDropdown
            dropdownOptions={{
              inputName: 'noAttempts',
              label: 'Max Attempts:',
              placeholder: 'Select Max Attempts',
              options: [
                { value: 'MCQ', label: 'MCQ' },
                { value: 'Descriptive', label: 'Descriptive' }
              ]
            }}
            isFiftyFifty={true}
            changeHandler={(e) => changeHandler(e, examTabData, setExamTabData, 'type')}
          />
        </div>
      </div>

      <div className={`${styles.attemptsContainer}`}>
        <div className={`w-35 ${styles.checkboxContainer}`}>
          <LabeledRadioCheckbox
            type="checkbox"
            label="Negative Marking"
            name="type"
            value="scheduled"
            isChecked={examTabData.type === 'scheduled'}
            changeHandler={(e) => changeHandler(e, examTabData, setExamTabData)}
          />
        </div>

        <div className="w-65">
          <LabeledDropdown
            dropdownOptions={{
              inputName: 'noAttempts',
              label: 'Neg. marks per Question:',
              placeholder: 'Select Max Attempts',
              options: [
                { value: 'MCQ', label: 'MCQ' },
                { value: 'Descriptive', label: 'Descriptive' }
              ]
            }}
            isFiftyFifty={true}
            changeHandler={(e) => changeHandler(e, examTabData, setExamTabData, 'type')}
          />
        </div>
      </div>

      {/* exam Instructions/Guidelines */}
      <div>
        <label>
          Enter Instructions/Guidelines:
          <LabeledTextarea
            styleClass={styles.inputLabelGap}
            inputOptions={{
              inputName: 'ins',
              placeholder: 'Enter instructions in less than 300 characters.',
              rows: 4
            }}
          />
        </label>
      </div>
      <div className={`w-50 ${styles.checkboxContainer}`}>
        <LabeledRadioCheckbox
          type="radio"
          label="Scheduled"
          name="type"
          value="scheduled"
          isChecked={examTabData.type === 'scheduled'}
          changeHandler={(e) => changeHandler(e, examTabData, setExamTabData)}
        />
        <LabeledRadioCheckbox
          type="radio"
          label="Take Anytime"
          name="type"
          value="anytime"
          isChecked={examTabData.type === 'anytime'}
          changeHandler={(e) => changeHandler(e, examTabData, setExamTabData)}
        />
      </div>

      {/* exam access */}
      {/* <div className={`w-50 ${styles.checkboxContainer}`}>
        <label>Exam Access:</label>

        <LabeledRadioCheckbox type="radio" label="Open For All" name="examAccess" />
        <LabeledRadioCheckbox
          type="radio"
          label={
            <>
              Only for Cohort
              <span style={{ color: 'var(--primary)' }}> Map</span>
            </>
          }
          name="examAccess"
        />
      </div> */}
    </>
  );
}
