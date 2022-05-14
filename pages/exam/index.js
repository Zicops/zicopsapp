import Sidebar from '../../components/common/Sidebar';
import CourseHead from '../../components/CourseHead';
import MainBody from '../../components/common/MainBody';
import MainBodyBox from '../../components/common/MainBodyBox';
import ZicopsRadioButton from '../../components/common/ZicopsRadioButton';
// import TimePicker from '../../components/common/TimePicker';
// import RadioButtonLeft from '../../components/common/ZicopsRadioButton';
// import SwitchButton from '../../components/common/SwitchButton';

// import ExamConfigration from '../../components/examComps/ExamConfigration';
// import ExamDatePicker from '../../components/common/ExamDatePicker';

import ExamMaster from '../../components/examComps/ExamMaster';
import ZicopsExam from '../../components/examComps/ZicopsExam';
import LabeledInput from '../../components/common/FormComponents/LabeledInput';
import LabeledDropdown from '../../components/common/FormComponents/LabeledDropdown';
import LabeledCheckbox from '../../components/common/FormComponents/LabeledRadioCheckbox';
import QuestionSection from '../../components/LearnerExamComp';
// import ExamSchedule from '../../components/examComps/ExamSchedule';

const Exam = () => {
  const inputOptions = {
    inputName: "Test", 
    label: "Test",
    placeholder: "This is Placeholder", 
    // value: "Value is This", 
    // maxLength: 20, 
    // isRequired: false, 
    // isDisabled: false
  }
  const changeHandler = (e) => {};

  const options = [
    { value: 'self-paced', label: 'Self Paced' },
    { value: 'classroom', label: 'Classroom' },
    { value: 'labs', label: 'Labs' },
    { value: 'test', label: 'Test' },
  ];
  const dropdownOptions = {
    inputName: 'dropdown',
    label: 'Dropdown',
    placeholder: 'Select a category',
    options: options,
    // value: options[2],
    isDisabled: false,
    isSearchEnable: false,
    isMulti: false
  };
  const languages = [
    { value: 'english', label: 'English' },
    { value: 'hindi', label: 'Hindi' },
    { value: 'marathi', label: 'Marathi' },
    { value: 'bengali', label: 'Bengali' },
    { value: 'telegu', label: 'Telegu' },
    { value: 'tamil', label: 'Tamil' },
    { value: 'kannada', label: 'Kannada' },
    { value: 'punjabi', label: 'Punjabi' },
    { value: 'assamese', label: 'Assamese' },
    { value: 'orria', label: 'Orria' },
    { value: 'bhojpuri', label: 'Bhojpuri' },
    { value: 'maithili', label: 'Maithili' }
  ];
  const dropdownOptions1 = {
    inputName: 'language',
    label: 'Language',
    placeholder: 'Select multiple languages',
    options: languages,
    // value: options[2],
    isDisabled: false,
    isSearchEnable: true,
    isMulti: true
  };
  return (
    <>
      {/* <QuestionSection /> */}
      {/* <Sidebar /> */}
      <MainBody>
        <CourseHead title="My Exam" />
        <MainBodyBox>
      {/* <LabeledInput inputOptions={inputOptions} changeHandler={changeHandler} />
          <br />
          <LabeledDropdown dropdownOptions={dropdownOptions} changeHandler={changeHandler} />
          <br />
          <LabeledDropdown dropdownOptions={dropdownOptions1} changeHandler={changeHandler} />
          <br />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <LabeledCheckbox
              type="radio"
              label="Check this out 1"
              name={'check'}
              value={'Check this out 1'}
            />

            <LabeledCheckbox
              type="radio"
              label="Check this out 2"
              name={'check'}
              value={'Check this out 2'}
            />

            <LabeledCheckbox
              type="radio"
              label="Check this out 3"
              name={'check'}
              value={'Check this out 3'}
            />
          </div>
          <br />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <LabeledCheckbox
              type="checkbox"
              label="Check this out 1"
              name={'check'}
              value={'Check this out 1'}
            />
            <LabeledCheckbox
              type="checkbox"
              label="Check this out 2"
              name={'check'}
              value={'Check this out 2'}
            />
            <LabeledCheckbox
              type="checkbox"
              label="Check this out 3"
              name={'check'}
              value={'Check this out 3'}
            />
          </div> */}
      {/* <ExamConfigration />
          <ExamDatePicker text={'Exam Date'} /> */}
      {/* <ExamConfigration /> */}
      {/* <ExamSchedule /> */}
      {/* <ZicopsRadioButton text={'Scheduled'} />
          <ZicopsRadioButton text={'Exam Access:'} /> */}
      {/* <TimePicker /> */}
      {/* <ExamMaster /> */}
      {/* <ZicopsExam /> */}
      {/* <ExamDatePicker text={'Exam Date'} datePicker_label={'Select Exam Date'} /> */}
      {/* <CustomTimePicker /> */}
      {/* <CheckBoxField checkBox_label={'Stretch Examination Conduct Duration'} />
          <InputField label={'Question paper name'} placeholder={'Enter the question paper name'} />
          <Marks label={'Total marks:'} placeholder={'Total Marks'} />
          <DropdownSelect
            inputData={{
              inputName: 'course_sub_category',
              label: 'Max Attempts',
              placeholder: 'Select Max Attempts'
            }}
          /> */}
      </MainBodyBox>
      </MainBody>
      {/* <style>{`
          .ExamConfigration{
              display: grid;
                justify-content: spaec-around;
                justify-items: start;
                grid-template-columns: auto auto;
                align-content: center;
                border:1px solid white;
                height:200px;
                padding-left:50px;
          }`}</style> */}
    </>
  );
};

export default Exam;
