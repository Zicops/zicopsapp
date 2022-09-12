import NextButton from '@/components/common/NextButton';
import { Grid } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { changeHandler } from '../../../../../helper/common.helper';
import { ExamTabDataAtom } from '../../../../../state/atoms/exams.atoms';
import InputTimePicker from '../../../../common/FormComponents/InputTimePicker';
import LabeledInput from '../../../../common/FormComponents/LabeledInput';
import LabeledRadioCheckbox from '../../../../common/FormComponents/LabeledRadioCheckbox';
import InputDatePicker from '../../../../common/InputDatePicker';
import styles from '../examMasterTab.module.scss';
import useHandleExamTab from '../Logic/useHandleExamTab';
import useValidateScheduleDates from '../Logic/useValidateScheduleDates';

export default function Schedule() {
  const [examTabData, setExamTabData] = useRecoilState(ExamTabDataAtom);

  const router = useRouter();
  const isPreview = router.query?.isPreview || false;
  const { isEndTimeBehind, updateDate, updateTime, getMinExamEndTime, getTimeWithDuration } =
    useValidateScheduleDates();

  // update end date if duration updated
  useEffect(() => {
    const isBehind = isEndTimeBehind(examTabData?.exam_end);

    setExamTabData({
      ...examTabData,
      exam_end: isBehind ? getTimeWithDuration() : examTabData?.exam_end
    });
  }, [examTabData?.duration]);

  const { saveExamData } = useHandleExamTab();

  return (
    <div className={`${styles.scheduleContainer}`}>
      {/* Exam start date */}
      <section>
        <label htmlFor="examDate">Exam Start Date:</label>
        <InputDatePicker
          selectedDate={examTabData?.exam_start}
          minDate={new Date()}
          changeHandler={(date) => {
            const startDate = updateDate(date, examTabData?.exam_start);

            const isNewDateAfterEnd = startDate > examTabData?.exam_end;

            setExamTabData({
              ...examTabData,
              exam_start: startDate,
              exam_end: isNewDateAfterEnd ? getTimeWithDuration(startDate) : examTabData?.exam_end
            });
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
              selected={examTabData?.exam_start}
              changeHandler={(date) => {
                const endTime = updateTime(date, examTabData?.exam_start);

                setExamTabData({
                  ...examTabData,
                  exam_start: endTime,
                  exam_end: getTimeWithDuration(endTime)
                });
              }}
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
          changeHandler={(e) => {
            setExamTabData({
              ...examTabData,
              is_stretch: e.target.checked,
              exam_end: getTimeWithDuration(examTabData?.exam_start)
            });
          }}
        />
      </div>

      {examTabData?.is_stretch && (
        <>
          {/* Exam end Date */}
          <section>
            <label htmlFor="examDate">Exam End Date:</label>
            <InputDatePicker
              selectedDate={examTabData?.exam_end}
              minDate={examTabData?.exam_start}
              changeHandler={(date) => {
                const endDate = updateDate(date, examTabData?.exam_end);

                const isBehind = isEndTimeBehind(endDate);

                setExamTabData({
                  ...examTabData,
                  exam_end: isBehind ? getTimeWithDuration() : endDate
                });
              }}
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
                  selected={examTabData?.exam_end}
                  changeHandler={(date) => {
                    setExamTabData({
                      ...examTabData,
                      exam_end: updateTime(date, examTabData?.exam_end)
                    });
                  }}
                  minTime={getMinExamEndTime()}
                  isDisabled={isPreview}
                />
              </Grid>
            </Grid>
          </section>
        </>
      )}

      <div className={`${styles.nextBtn}`}>
        <NextButton clickHandler={() => saveExamData(2)} />
      </div>
    </div>
  );
}
