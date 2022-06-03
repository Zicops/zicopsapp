import { useRecoilState } from 'recoil';
import { changeHandler } from '../../../../../helper/common.helper';
import { ExamTabDataAtom } from '../../../../../state/atoms/exams.atoms';
import LabeledDropdown from '../../../../common/FormComponents/LabeledDropdown';
import LabeledInput from '../../../../common/FormComponents/LabeledInput';
import LabeledRadioCheckbox from '../../../../common/FormComponents/LabeledRadioCheckbox';
import TimePicker from '../../../../common/FormComponents/TimePicker';
import InputDatePicker from '../../../../common/InputDatePicker';
import styles from '../examMasterTab.module.scss';

export default function Schedule() {
  const [examTabData, setExamTabData] = useRecoilState(ExamTabDataAtom);

  return (
    <div className={`${styles.scheduleContainer}`}>
      {/* Exam start date */}
      <section>
        <label htmlFor="examDate">Exam Start Date:</label>
        <InputDatePicker
          selectedDate={examTabData?.examStartDate}
          changeHandler={(date) => {
            console.log(date);
            setExamTabData({ ...examTabData, examStartDate: date });
          }}
        />
      </section>

      {/* exam start time */}
      <section>
        <label htmlFor="examDate">Exam Start Time:</label>
        <TimePicker
          selected={examTabData?.examStartTime}
          changeHandler={(date) => setExamTabData({ ...examTabData, examStartTime: date })}
        />
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
          value: { value: examTabData?.bufferTime, label: examTabData?.bufferTime }
        }}
        isFiftyFifty={true}
        changeHandler={(e) => changeHandler(e, examTabData, setExamTabData, 'bufferTime')}
      />

      <div className={`${styles.stretchDuration}`}>
        <LabeledRadioCheckbox
          type="checkbox"
          label="Stretch Examination Conduct Duration"
          name="isStretch"
          value={examTabData?.isStretch}
          changeHandler={(e) => changeHandler(e, examTabData, setExamTabData)}
        />
      </div>

      {examTabData?.isStretch && (
        <>
          {/* Exam end Date */}
          <section>
            <label htmlFor="examDate">Exam End Date:</label>
            <InputDatePicker
              selectedDate={examTabData?.examEndDate}
              changeHandler={(date) => setExamTabData({ ...examTabData, examEndDate: date })}
            />
          </section>

          {/* exam end time */}
          <section>
            <label htmlFor="examDate">Exam End Time:</label>
            <TimePicker
              selected={examTabData?.examEndTime}
              changeHandler={(date) => setExamTabData({ ...examTabData, examEndTime: date })}
            />
          </section>
        </>
      )}
    </div>
  );
}
