import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { changeHandler } from '../../../../../helper/common.helper';
import { ExamMasterAtom } from '../../../../../state/atoms/exams.atoms';
import LabeledInput from '../../../../common/FormComponents/LabeledInput';
import LabeledRadioCheckbox from '../../../../common/FormComponents/LabeledRadioCheckbox';
import LabeledTextarea from '../../../../common/FormComponents/LabeledTextarea';
import styles from '../examMasterTab.module.scss';
import { IsScheduledExam } from '../Logic/examMasterTab.helper';

export default function ExamMaster() {
  const [examMaster, setExamMaster] = useRecoilState(ExamMasterAtom);

  // useEffect(() => {
  //   if (examMaster.type === 'scheduled') return;
  // }, [examMaster]);

  return (
    <>
      <LabeledInput
        styleClass={`${styles.inputField}`}
        inputOptions={{
          inputName: 'paperName',
          label: 'Question Paper Name:',
          placeholder: 'Enter name of the paper (Upto 60 characters)'
        }}
      />
      <LabeledInput
        styleClass={`${styles.inputField}`}
        inputOptions={{
          inputName: 'examName',
          label: 'Exam Name:',
          placeholder: 'Enter name of the exam (Upto 60 characters)'
        }}
      />
      <LabeledInput
        styleClass={`${styles.inputField}`}
        inputOptions={{
          inputName: 'description',
          label: 'Description:',
          placeholder: 'Enter description (Upto 60 characters)'
        }}
      />
      Add total mark section
      <br />
      <br />
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
          isChecked={examMaster.type === 'scheduled'}
          changeHandler={(e) => changeHandler(e, examMaster, setExamMaster)}
        />
        <LabeledRadioCheckbox
          type="radio"
          label="Take Anytime"
          name="type"
          value="anytime"
          isChecked={examMaster.type === 'anytime'}
          changeHandler={(e) => changeHandler(e, examMaster, setExamMaster)}
        />
      </div>
      <div className={`w-50 ${styles.checkboxContainer}`}>
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
      </div>
    </>
  );
}
