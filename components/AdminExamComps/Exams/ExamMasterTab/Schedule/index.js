import { Grid } from '@mui/material';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { changeHandler } from '../../../../../helper/common.helper';
import { ExamTabDataAtom } from '../../../../../state/atoms/exams.atoms';
import InputTimePicker from '../../../../common/FormComponents/InputTimePicker';
import LabeledInput from '../../../../common/FormComponents/LabeledInput';
import LabeledRadioCheckbox from '../../../../common/FormComponents/LabeledRadioCheckbox';
import InputDatePicker from '../../../../common/InputDatePicker';
import styles from '../examMasterTab.module.scss';

export default function Schedule() {
  const [examTabData, setExamTabData] = useRecoilState(ExamTabDataAtom);

  const router = useRouter();
  const isPreview = router.query?.isPreview || false;

  function getMinExamEndTime() {
    const startTime = new Date(examTabData?.exam_start_time);
    const duration = +examTabData?.duration || 0;

    const endTime = startTime.setMinutes(startTime.getMinutes() + duration);

    return endTime;
  }

  return (
    <div className={`${styles.scheduleContainer}`}>
      {/* Exam start date */}
      <section>
        <label htmlFor="examDate">Exam Start Date:</label>
        <InputDatePicker
          selectedDate={examTabData?.exam_start_date}
          changeHandler={(date) => {
            setExamTabData({ ...examTabData, exam_start_date: date });
          }}
          isDisabled={isPreview}
        />
      </section>
      {/* exam start time */}
      <section>
        <Grid container spacing={0} alignItems={'center'}>
          <Grid item xs={6}>
            <label htmlFor="examDate">Exam Start Time:</label>
          </Grid>
          <Grid item xs={6}>
            <InputTimePicker
              selected={examTabData?.exam_start_time}
              changeHandler={(date) => setExamTabData({ ...examTabData, exam_start_time: date })}
              isDisabled={isPreview}
            />
          </Grid>
        </Grid>
      </section>

      {/* Exam Duration */}
      <LabeledInput
        isFiftyFifty={true}
        styleClass={`${styles.inputField}`}
        inputOptions={{
          inputName: 'duration',
          label: 'Exam Duration:',
          placeholder: 'Enter duration of the exam',
          value: examTabData.duration,
          isDisabled: true
        }}
        changeHandler={(e) => changeHandler(e, examTabData, setExamTabData)}
      />

      {/* buffer time */}
      <LabeledInput
        isFiftyFifty={true}
        styleClass={`${styles.inputField}`}
        inputOptions={{
          inputName: 'buffer_time',
          label: 'Buffer Time:',
          placeholder: 'Enter Select buffer time in minutes',
          value: examTabData.buffer_time,
          isNumericOnly: true,
          isDisabled: isPreview || examTabData?.is_stretch
        }}
        changeHandler={(e) => changeHandler(e, examTabData, setExamTabData)}
      />

      <div className={`${styles.stretchDuration}`}>
        <LabeledRadioCheckbox
          type="checkbox"
          label="Stretch Examination Conduct Duration"
          name="is_stretch"
          isChecked={examTabData?.is_stretch}
          isDisabled={isPreview}
          changeHandler={(e) => changeHandler(e, examTabData, setExamTabData)}
        />
      </div>

      {examTabData?.is_stretch && (
        <>
          {/* Exam end Date */}
          <section>
            <label htmlFor="examDate">Exam End Date:</label>
            <InputDatePicker
              selectedDate={examTabData?.exam_end_date}
              minDate={examTabData?.exam_start_date}
              changeHandler={(date) => setExamTabData({ ...examTabData, exam_end_date: date })}
              isDisabled={isPreview}
            />
          </section>

          {/* exam end time */}
          <section>
            <Grid container spacing={0} alignItems={'center'}>
              <Grid item xs={6}>
                <label htmlFor="examDate">Exam End Time:</label>
              </Grid>
              <Grid item xs={6}>
                <InputTimePicker
                  selected={examTabData?.exam_end_time}
                  changeHandler={(date) => setExamTabData({ ...examTabData, exam_end_time: date })}
                  minTime={getMinExamEndTime()}
                  isDisabled={isPreview}
                />
              </Grid>
            </Grid>
          </section>
        </>
      )}
    </div>
  );
}
