import CustomTooltip from '@/components/common/CustomTooltip';
import RTE from '@/components/common/FormComponents/RTE';
import Loader from '@/components/common/Loader';
import NextButton from '@/components/common/NextButton';
import ToolTip from '@/components/common/ToolTip';
import { ADMIN_EXAMS } from '@/components/common/ToolTip/tooltip.helper';
import { loadQueryDataAsync } from '@/helper/api.helper';
import { COMMON_LSPS, MAX_ATTEMPT_COUNT } from '@/helper/constants.helper';
import { useLazyQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import { useRecoilState } from 'recoil';
import { GET_LATEST_QUESTION_PAPERS, queryClient } from '../../../../../API/Queries';
import { changeHandler } from '../../../../../helper/common.helper';
import { ExamTabDataAtom, getExamTabDataObject } from '../../../../../state/atoms/exams.atoms';
import { ToastMsgAtom } from '../../../../../state/atoms/toast.atom';
import LabeledDropdown from '../../../../common/FormComponents/LabeledDropdown';
import LabeledInput from '../../../../common/FormComponents/LabeledInput';
import LabeledRadioCheckbox from '../../../../common/FormComponents/LabeledRadioCheckbox';
import { customSelectStyles } from '../../../../common/FormComponents/Logic/formComponents.helper';
import styles from '../examMasterTab.module.scss';
import { SCHEDULE_TYPE } from '../Logic/examMasterTab.helper';
import useHandleExamTab from '../Logic/useHandleExamTab';

export default function ExamMaster() {
  const [loadQuestionPaper, { error: errorQuestionPaperData }] = useLazyQuery(
    GET_LATEST_QUESTION_PAPERS,
    { client: queryClient }
  );
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);
  const [examTabData, setExamTabData] = useRecoilState(ExamTabDataAtom);

  const [questionPaperOptions, setQuestionPaperOptions] = useState([]);

  const router = useRouter();
  const examId = router?.query?.examId;
  const qpId = router.query?.qpId;
  const isPreview = router.query?.isPreview || router.asPath?.includes('view') || false;

  const { getTotalMarks, saveExamData } = useHandleExamTab();

  // load question paper data
  useEffect(async () => {
    const LARGE_PAGE_SIZE = 9999;
    const queryVariables = { publish_time: Date.now(), pageSize: LARGE_PAGE_SIZE, pageCursor: '' };

    const currentQpRes = await loadQueryDataAsync(GET_LATEST_QUESTION_PAPERS, queryVariables);
    const zicopsQpRes = await loadQueryDataAsync(GET_LATEST_QUESTION_PAPERS, queryVariables, {
      context: { headers: { tenant: COMMON_LSPS?.zicops } }
    });

    if (currentQpRes?.error || zicopsQpRes?.error) {
      return setToastMsg({ type: 'danger', message: 'question paper load error' });
    }

    const currentPaperData = currentQpRes?.getLatestQuestionPapers?.questionPapers;
    const zicopsPaperData = zicopsQpRes?.getLatestQuestionPapers?.questionPapers;

    const options = [];

    currentPaperData?.forEach((paper) =>
      options.push({
        value: paper.id,
        label: paper.name,
        ...paper,
        SuggestedDuration: +paper?.SuggestedDuration / 60
      })
    );
    zicopsPaperData?.forEach((paper) =>
      options.push({
        value: paper.id,
        label: paper.name,
        ...paper,
        SuggestedDuration: +paper?.SuggestedDuration / 60
      })
    );

    setQuestionPaperOptions(options);

    // loadQuestionPaper({
    //   variables: queryVariables,
    //   context: { headers: { tenant: COMMON_LSPS?.zicops } }
    // }).then(({ data }) => {
    //   if (errorQuestionPaperData)
    //     return setToastMsg({ type: 'danger', message: 'question paper load error' });

    //   const paperData = data?.getLatestQuestionPapers?.questionPapers;

    //   const options = [];
    //   if (paperData)
    //     paperData.forEach((paper) =>
    //       options.push({
    //         value: paper.id,
    //         label: paper.name,
    //         ...paper,
    //         SuggestedDuration: +paper?.SuggestedDuration / 60
    //       })
    //     );

    //   setQuestionPaperOptions(options);
    // });
  }, []);

  useEffect(async () => {
    if (!questionPaperOptions?.length) return;
    if (!examTabData?.qpId || qpId !== examTabData?.qpId) return;

    const selectedQp = questionPaperOptions?.filter(
      (option) => option?.value === examTabData?.qpId
    )[0];

    let _examTabData = {
      qpId: qpId,
      category: selectedQp?.Category,
      sub_category: selectedQp?.SubCategory,
      duration: selectedQp?.SuggestedDuration || 0,
      total_marks: await getTotalMarks(qpId)
    };

    if (examId) _examTabData = { ...examTabData, _examTabData };
    setExamTabData(getExamTabDataObject(_examTabData));
  }, [questionPaperOptions, qpId, examId, examTabData?.qpId]);

  const maxAttemptsOptions = Array(MAX_ATTEMPT_COUNT)
    .fill(null)
    .map((val, i) => ({
      value: i + 1,
      label: i + 1
    }));

  const defaultStyles = customSelectStyles();
  const customStyles = {
    ...defaultStyles,
    container: () => ({
      ...defaultStyles.container(),
      width: '100%',
      margin: 'auto',
      height: '25px',
      position: 'relative'
    }),
    control: () => ({
      ...defaultStyles.control(),
      display: 'flex',
      border: '1px solid transparent',
      background: 'transparent',
      borderLeft: '2px solid var(--dark_three)',
      margin: 'auto',
      height: '25px',
      width: '100%',
      height: '100%',
      textAlign: 'left'
    }),
    option: () => ({
      ...defaultStyles.option(),
      height: '100%',
      width: '100%',
      padding: '5px',
      paddingLeft: '10px',
      borderBottom: '1px solid var(--dark_three)'
    })
  };

  const passingOptions = [
    { value: 'None', label: 'None' },
    { value: 'Marks', label: 'Marks' },
    { value: 'Percentage', label: 'Percentage' }
  ];
  let passingCriteriaText = 'No passing criteria would be applicable for this exam.';
  if (examTabData?.passing_criteria_type === 'Marks') {
    passingCriteriaText = 'Enter passing marks for this exam';
  } else if (examTabData?.passing_criteria_type === 'Percentage') {
    passingCriteriaText = 'Enter passing percentage for this exam';
  }

  if (examId && examTabData?.id !== examId)
    return <Loader customStyles={{ height: '100%', background: 'transparent' }} />;

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
          isSearchEnable: true,
          isDisabled: isPreview
        }}
        changeHandler={async (e) => {
          const selectedQp = questionPaperOptions?.filter((option) => option?.value === e.value)[0];

          setExamTabData({
            ...examTabData,
            category: selectedQp?.Category,
            sub_category: selectedQp?.SubCategory,
            duration: selectedQp?.SuggestedDuration || 0,
            qpId: e.value,
            total_marks: await getTotalMarks(e.value)
          });
        }}
      />

      {/* exam name */}
      <LabeledInput
        styleClass={`${styles.inputField}`}
        inputOptions={{
          inputName: 'name',
          label: 'Exam Name:',
          placeholder: 'Enter name of the exam (Upto 60 characters)',
          value: examTabData?.name,
          maxLength: 60,
          isDisabled: isPreview
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
          maxLength: 160,
          isDisabled: isPreview
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
            isNumericOnly: true,
            isDisabled: isPreview
          }}
          changeHandler={(e) => changeHandler(e, examTabData, setExamTabData)}
        />

        {/* total marks */}
        <LabeledInput
          isFiftyFifty={true}
          styleClass={`${styles.inputField}`}
          inputOptions={{
            inputName: 'total_marks',
            label: 'Total Marks:',
            placeholder: 'Total Marks',
            value: examTabData?.total_marks?.toString() || 0,
            isDisabled: true
          }}
        />
      </div>

      <div className={`${styles.passingCriteriaOuterContainer}`}>
        <label htmlFor="passing_criteria" aria-label="passing_criteria">
          Passing Criteria:
          {/* <ToolTip title={passingCriteriaText} placement="bottom">
            <img src={TOOLTIP_IMG_SRC} style={TOOLTIP_STYLE} />
          </ToolTip> */}
          <CustomTooltip info={ADMIN_EXAMS.myExams.myExamsPassingCriteria} />
        </label>

        <div
          className={`${styles.passingCriteriaInnerContainer} ${
            examTabData?.passing_criteria ? styles.hasValue : ''
          } ${isPreview ? styles.disabled : ''}`}
          onFocus={(e) => e.currentTarget.classList.add(styles.focus)}
          onBlur={(e) => e.currentTarget.classList.remove(styles.focus)}>
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
            disabled={isPreview}
            onChange={(e) => {
              let value = +e.target.value;
              let type = examTabData?.passing_criteria_type;
              let totalMarks = examTabData?.total_marks || 0;

              if (value === 0) {
                type = 'None';
              } else if (type === 'None') {
                type = 'Marks';
              }

              const isMarks = type === 'Marks';
              if (isMarks && value > totalMarks) value = totalMarks;

              if (!isMarks) {
                if (value > 100) value = 100;
                if (value < 0) value = 0;
              }

              setExamTabData({
                ...examTabData,
                passing_criteria: value,
                passing_criteria_type: type
              });
            }}
          />

          <div style={{ position: 'relative', flex: '1' }}>
            <Select
              options={passingOptions}
              value={{
                label: examTabData?.passing_criteria_type,
                value: examTabData?.passing_criteria_type
              }}
              name="passing_criteria_type"
              className="w-100"
              isDisabled={isPreview}
              styles={customStyles}
              isSearchable={false}
              // onChange={(e) => setExamTabData({ ...examTabData, passing_criteria_type: e.value })}
              onChange={(e) => {
                let marks = examTabData?.passing_criteria;
                const isMarks = e?.value === 'Marks';

                if (isMarks && marks > examTabData?.total_marks) {
                  marks = examTabData?.total_marks;
                }
                if (!isMarks) {
                  if (marks > 100) marks = 100;
                  if (marks < 0) marks = 0;
                }
                if (e?.value === 'None') {
                  marks = 0;
                }

                setExamTabData({
                  ...examTabData,
                  passing_criteria_type: e?.value,
                  passing_criteria: marks
                });
              }}
            />
          </div>
          {/* <select
            disabled={isPreview}
            onChange={(e) => {
              let marks = examTabData?.passing_criteria;
              const isMarks = e.target.value === 'Marks';

              if (isMarks && marks > examTabData?.total_marks) {
                marks = examTabData?.total_marks;
              }
              if (!isMarks) {
                if (marks > 100) marks = 100;
                if (marks < 0) marks = 0;
              }
              if (e.target.value === 'None') {
                marks = 0;
              }

              setExamTabData({
                ...examTabData,
                passing_criteria_type: e.target.value,
                passing_criteria: marks
              });
            }}
            value={
              +examTabData?.passing_criteria === 0 ? 'None' : examTabData?.passing_criteria_type
            }>
            <option value="None">None</option>
            <option value="Marks">Marks</option>
            <option value="Percentage">Percentage</option>
          </select> */}
        </div>
      </div>

      <div className={`${styles.totalMarksSection}`}></div>

      <div className={`${styles.attemptsContainer}`}>
        <div className={`w-35 ${styles.checkboxContainer}`}>
          <LabeledRadioCheckbox
            type="checkbox"
            label={
              <ToolTip
                title={`${
                  examTabData?.is_attempts_visible
                    ? 'Define the number of attempts allowed for this exam'
                    : 'Exams could be taken multiple times'
                }`}
                placement="right">
                <span>Set Max. Attempts Limit</span>
              </ToolTip>
            }
            name="is_attempts_visible"
            isChecked={examTabData?.is_attempts_visible}
            isDisabled={isPreview || examTabData?.schedule_type === SCHEDULE_TYPE[0]}
            changeHandler={(e) => {
              const isChecked = e.target.checked;
              setExamTabData({
                ...examTabData,
                is_attempts_visible: isChecked,
                no_attempts: isChecked ? 1 : -1
              });
            }}
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
                value: { value: examTabData?.no_attempts, label: examTabData?.no_attempts },
                isDisabled: isPreview || examTabData?.schedule_type === SCHEDULE_TYPE[0]
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
        <label>Enter Instructions/Guidelines:</label>
        {/* <MUIRichTextEditor label="Start typing..." /> */}
        {/* <LabeledTextarea
            styleClass={styles.inputLabelGap}
            inputOptions={{
              inputName: 'instructions',
              placeholder: 'Enter exam instructions (Upto 300 characters)',
              rows: 4,
              value: examTabData?.instructions,
              isDisabled: isPreview,
              maxLength: 300
            }}
            changeHandler={(e) => changeHandler(e, examTabData, setExamTabData)}
          /> */}
        <RTE
          changeHandler={(e) => {
            if (examId && examTabData?.id !== examId) return;
            if (!examId && examTabData?.id) return;
            setExamTabData({ ...examTabData, instructions: e });
          }}
          isReadOnly={isPreview}
          placeholder="Enter instructions in less than 300 characters."
          value={examTabData?.instructions}
        />
      </div>

      <div className={`w-100 ${styles.examMasterLastRow}`}>
        <div className={`w-50 ${styles.checkboxContainer}`}>
          <LabeledRadioCheckbox
            type="radio"
            label="Scheduled"
            name="schedule_type"
            value={SCHEDULE_TYPE[0]}
            isDisabled={!!examTabData?.id}
            isChecked={examTabData.schedule_type === 'scheduled'}
            changeHandler={(e) => {
              // changeHandler(e, examTabData, setExamTabData);
              setExamTabData({
                ...examTabData,
                schedule_type: SCHEDULE_TYPE[0],
                is_attempts_visible: true,
                no_attempts: 1
              });
            }}
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
        <ToolTip title="Save master details and go to next tab" placement="left">
          <span>
            <NextButton clickHandler={() => saveExamData(1)} />
          </span>
        </ToolTip>
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
