import { useRecoilState } from 'recoil';
import { changeHandler } from '../../../../../helper/common.helper';
import { ExamTabDataAtom } from '../../../../../state/atoms/exams.atoms';
import InputTimePicker from '../../../../common/FormComponents/InputTimePicker';
import LabeledDropdown from '../../../../common/FormComponents/LabeledDropdown';
import LabeledInput from '../../../../common/FormComponents/LabeledInput';
import LabeledRadioCheckbox from '../../../../common/FormComponents/LabeledRadioCheckbox';
import InputDatePicker from '../../../../common/InputDatePicker';
import styles from '../examMasterTab.module.scss';
import {Box, Grid} from "@mui/material";

export default function Schedule() {
  const [examTabData, setExamTabData] = useRecoilState(ExamTabDataAtom);

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
        />
      </section>
      {/* exam start time */}
      <section>
          <Grid container spacing={0} alignItems={'center'}>
              <Grid item xs={8}>
                  <label htmlFor="examDate">Exam Start Time:</label>
              </Grid>
              <Grid item xs={4}>
                    <InputTimePicker
                        selected={examTabData?.exam_start_time}
                        changeHandler={(date) => setExamTabData({ ...examTabData, exam_start_time: date })}
                    />
              </Grid>
          </Grid>
      </section>
      {/* <LabeledDropdown
        dropdownOptions={{
          inputName: 'type',
          label: 'Exam Date:',
          placeholder: 'Select question Bank',
          options: [
            { value: 'MCQ', label: 'MCQ' },
            { value: 'Descriptive', label: 'Descriptive' }
          ]
        }}
        isFiftyFifty={true}
        changeHandler={(e) => changeHandler(e, newCustomSection, setNewCustomSection, 'type')}
      /> */}
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
      <LabeledDropdown
        dropdownOptions={{
          label: 'Buffer Time:',
          placeholder: 'Select buffer time in hours',
          options: [
            { value: 1, label: '1' },
            { value: 2, label: '2' },
            { value: 3, label: '3' },
            { value: 4, label: '4' },
            { value: 5, label: '5' }
          ],
          value: { value: examTabData?.buffer_time, label: examTabData?.buffer_time }
        }}
        isFiftyFifty={true}
        changeHandler={(e) => changeHandler(e, examTabData, setExamTabData, 'buffer_time')}
      />
      <div className={`${styles.stretchDuration}`}>
        <LabeledRadioCheckbox
          type="checkbox"
          label="Stretch Examination Conduct Duration"
          name="is_stretch"
          isChecked={examTabData?.is_stretch}
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
              changeHandler={(date) => setExamTabData({ ...examTabData, exam_end_date: date })}
            />
          </section>

          {/* exam end time */}
            <section>
                <Grid container spacing={0} alignItems={'center'}>
                    <Grid item xs={8}>
                        <label htmlFor="examDate">Exam Start Time:</label>
                    </Grid>
                    <Grid item xs={4}>
                        <InputTimePicker
                            selected={examTabData?.exam_start_time}
                            changeHandler={(date) => setExamTabData({ ...examTabData, exam_start_time: date })}
                        />
                    </Grid>
                </Grid>
            </section>
        </>
      )}
    </div>
  );
}
