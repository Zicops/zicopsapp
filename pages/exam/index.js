import Sidebar from '../../components/common/Sidebar';
import CourseHead from '../../components/CourseHead';
import MainBody from '../../components/common/MainBody';
import MainBodyBox from '../../components/common/MainBodyBox';
import ZicopsRadioButton from '../../components/common/ZicopsRadioButton';
import UploadQuestions from '../../components/examComps/UploadQuestions';
import QuizOptionInput from '../../components/examComps/QuizOptionInput';
import QuestionBankCard from '../../components/examComps/QuestionBankCard';
import McqCard from '../../components/examComps/McqCard';
import CreateNewQuestionPaper from '../../components/examComps/CreateNewQuestionPaper';
// import TimePicker from '../../components/common/TimePicker';
// import RadioButtonLeft from '../../components/common/ZicopsRadioButton';
// import SwitchButton from '../../components/common/SwitchButton';

// import ExamConfigration from '../../components/examComps/ExamConfigration';
// import ExamDatePicker from '../../components/common/ExamDatePicker';

import ExamMaster from '../../components/examComps/ExamMaster';

import AddQuestionMetaData from '../../components/examComps/AddQuestionMetaData';

import QuestionMasterReadioButton from '../../components/examComps/QuestionMasterRadioButton';

// import ExamSchedule from '../../components/examComps/ExamSchedule';

const Exam = () => {
  return (
    <>
      <Sidebar />
      <MainBody>
        <CourseHead title="My Exam" />
        <MainBodyBox>
          {/* <ExamConfigration />
          <ExamDatePicker text={'Exam Date'} /> */}
          {/* <ExamConfigration /> */}
          {/* <ExamSchedule /> */}
          {/* <ZicopsRadioButton text={'Scheduled'} />
          <ZicopsRadioButton text={'Exam Access:'} /> */}
          {/* <TimePicker /> */}
          {/* <ExamMaster /> */}
          <QuestionMasterReadioButton />
          {/* <UploadQuestions /> */}
          {/* <QuizOptionInput /> */}
          <QuestionBankCard title={'Add'} />
          {/* <McqCard /> */}
          {/* <CreateNewQuestionPaper /> */}
          {/* <AddQuestionMetaData /> */}
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
