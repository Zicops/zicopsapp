import { useLazyQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import { useRecoilState } from 'recoil';
import { GET_LATEST_QUESTION_PAPERS, queryClient } from '../../../../../API/Queries';
import { changeHandler } from '../../../../../helper/common.helper';
import { ExamTabDataAtom } from '../../../../../state/atoms/exams.atoms';
import { ToastMsgAtom } from '../../../../../state/atoms/toast.atom';
import LabeledDropdown from '../../../../common/FormComponents/LabeledDropdown';
import LabeledInput from '../../../../common/FormComponents/LabeledInput';
import LabeledRadioCheckbox from '../../../../common/FormComponents/LabeledRadioCheckbox';
import LabeledTextarea from '../../../../common/FormComponents/LabeledTextarea';
import { customSelectStyles } from '../../../../common/FormComponents/Logic/formComponents.helper';
import styles from '../examMasterTab.module.scss';
import { SCHEDULE_TYPE } from '../Logic/examMasterTab.helper';
import RTE from '../../../../common/FormComponents/RTE';

export default function ExamMaster() {
  const [loadQuestionPaper, { error: errorQuestionPaperData }] = useLazyQuery(
    GET_LATEST_QUESTION_PAPERS,
    { client: queryClient }
  );
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);
  const [examTabData, setExamTabData] = useRecoilState(ExamTabDataAtom);

  const [questionPaperOptions, setQuestionPaperOptions] = useState([]);

  // load question paper data
  useEffect(() => {
    const LARGE_PAGE_SIZE = 999999999999;
    const queryVariables = { publish_time: Date.now(), pageSize: LARGE_PAGE_SIZE, pageCursor: '' };

    loadQuestionPaper({ variables: queryVariables }).then(({ data }) => {
      if (errorQuestionPaperData)
        return setToastMsg({ type: 'danger', message: 'question paper load error' });

      const paperData = data?.getLatestQuestionPapers?.questionPapers;

      const options = [];
      if (paperData)
        paperData.forEach((paper) =>
          options.push({ value: paper.id, label: paper.name, ...paper })
        );

      setQuestionPaperOptions(options);
    });
  }, []);

  const maxAttemptsOptions = [1, 2, 3, 4, 5].map((val) => ({ value: val, label: val }));

  const defaultStyles = customSelectStyles();
  const customStyles = {
    ...defaultStyles,
    container: () => ({
      ...defaultStyles.container,
      margin: '0px',
      padding: '0px'
    })
  };

  return (
    <>
      {/* question paper dropdown (name and id) */}
      <LabeledDropdown
        styleClass={`${styles.inputField}`}
        dropdownOptions={{
          inputName: 'qpId',
          label: 'Question Paper:',
          placeholder: 'Select Question Paper',
          options: questionPaperOptions,
          value: questionPaperOptions?.filter((option) => option?.value === examTabData?.qpId)[0],
          isSearchEnable: true
        }}
        changeHandler={(e) => {
          const selectedQp = questionPaperOptions?.filter((option) => option?.value === e.value)[0];

          setExamTabData({
            ...examTabData,
            category: selectedQp?.Category,
            sub_category: selectedQp?.SubCategory,
            duration: selectedQp?.SuggestedDuration || 0,
            qpId: e.value
          });
        }}
      />

      {/* exam name */}
      <LabeledInput
        styleClass={`${styles.inputField}`}
        inputOptions={{
          inputName: 'name',
          label: 'Exam Name:',
          placeholder: 'Enter name of the paper (Upto 60 characters)',
          value: examTabData?.name,
          maxLength: 60
        }}
        changeHandler={(e) => changeHandler(e, examTabData, setExamTabData)}
      />

      {/* description */}
      <LabeledInput
        styleClass={`${styles.inputField}`}
        inputOptions={{
          inputName: 'description',
          label: 'Description:',
          placeholder: 'Enter description (Upto 160 characters)',
          value: examTabData.description,
          maxLength: 160
        }}
        changeHandler={(e) => changeHandler(e, examTabData, setExamTabData)}
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
            value: examTabData.duration?.toString(),
            isDisabled: true
          }}
          changeHandler={(e) => changeHandler(e, examTabData, setExamTabData)}
        />

        {/* disabled for now */}
        <LabeledInput
          isFiftyFifty={true}
          styleClass={`${styles.inputField}`}
          inputOptions={{
            inputName: 'total_marks',
            label: 'Total Marks:',
            placeholder: 'Total Marks',
            value: examTabData?.total_marks?.toString(),
            isDisabled: true
          }}
        />
      </div>

      <div className={`${styles.passingCriteriaOuterContainer}`}>
        <label htmlFor="passing_criteria" aria-label="passing_criteria">
          Passing Criteria:
        </label>

        <div className={`${styles.passingCriteriaInnerContainer}`}>
          <input
            type="text"
            className="w-75"
            name="passing_criteria"
            placeholder="Passing Criteria"
            onKeyPress={(e) => {
              const regexForNumber = /[0-9]/;
              if (!regexForNumber.test(e.key)) e.preventDefault();
            }}
            value={examTabData?.passing_criteria}
            onChange={(e) => changeHandler(e, examTabData, setExamTabData)}
          />

          {/* <div>
            <Select
              options={[
                { label: 'Marks', value: 'Marks' },
                { label: 'Percentage', value: 'Percentage' }
              ]}
              value={{
                label: examTabData?.passing_criteria_type,
                value: examTabData?.passing_criteria_type
              }}
              name="passing_criteria_type"
              className="w-100"
              styles={customStyles}
              isSearchable={false}
              onChange={(e) => setExamTabData({ ...examTabData, passing_criteria_type: e.value })}
            />
          </div> */}
          <select
            onChange={(e) =>
              setExamTabData({ ...examTabData, passing_criteria_type: e.target.value })
            }
            value={examTabData?.passing_criteria_type}>
            <option value="Marks">Marks</option>
            <option value="Percentage">Percentage</option>
          </select>
        </div>
      </div>

      <div className={`${styles.totalMarksSection}`}></div>

      <div className={`${styles.attemptsContainer}`}>
        <div className={`w-35 ${styles.checkboxContainer}`}>
          <LabeledRadioCheckbox
            type="checkbox"
            label="Set Max. Attempts Limit"
            name="is_attempts_visible"
            isChecked={examTabData?.is_attempts_visible}
            changeHandler={(e) => changeHandler(e, examTabData, setExamTabData)}
          />
        </div>

        {examTabData?.is_attempts_visible && (
          <div className="w-65">
            <LabeledDropdown
              dropdownOptions={{
                inputName: 'no_attempts',
                label: 'Max Attempts:',
                placeholder: 'Select Max Attempts',
                options: maxAttemptsOptions,
                value: { value: examTabData?.no_attempts, label: examTabData?.no_attempts }
              }}
              isFiftyFifty={true}
              changeHandler={(e) => changeHandler(e, examTabData, setExamTabData, 'no_attempts')}
            />
          </div>
        )}
      </div>

      {/* negative marking */}
      {/* <div className={`${styles.attemptsContainer}`}>
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
              inputName: 'no_attempts',
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
      </div> */}

      {/* exam Instructions/Guidelines */}
      <div>
        <label>
          Enter Instructions/Guidelines:
          {/* <LabeledTextarea
            styleClass={styles.inputLabelGap}
            inputOptions={{
              inputName: 'instructions',,
              rows: 4,
              value: examTabData?.instructions
            }}
            changeHandler={(e) => changeHandler(e, examTabData, setExamTabData)}
          /> */}
          <RTE
            changeHandler={(e) => {
              setExamTabData({ ...examTabData, instructions: e.target.innerHTML });
            }}
            placeholder="Enter instructions in less than 300 characters."
            value={examTabData?.instructions}
          />
        </label>
      </div>

      <div className={`w-50 ${styles.checkboxContainer}`}>
        <LabeledRadioCheckbox
          type="radio"
          label="Scheduled"
          name="schedule_type"
          value={SCHEDULE_TYPE[0]}
          isDisabled={!!examTabData?.id}
          isChecked={examTabData.schedule_type === 'scheduled'}
          changeHandler={(e) => changeHandler(e, examTabData, setExamTabData)}
        />
        <LabeledRadioCheckbox
          type="radio"
          label="Take Anytime"
          name="schedule_type"
          value={SCHEDULE_TYPE[1]}
          isDisabled={!!examTabData?.id}
          isChecked={examTabData.schedule_type === 'anytime'}
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
