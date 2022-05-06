import Sidebar from '../../../components/common/Sidebar';
import CourseHead from '../../../components/CourseHead';
import MainBody from '../../../components/common/MainBody';
import MainBodyBox from '../../../components/common/MainBodyBox';
// import ZicopsRadioButton from '../../../components/common/ZicopsRadioButton';
// import TimePicker from '../../components/common/TimePicker';
// import RadioButtonLeft from '../../components/common/ZicopsRadioButton';
// import SwitchButton from '../../components/common/SwitchButton';

// import ExamConfigration from '../../components/examComps/ExamConfigration';
// import ExamDatePicker from '../../components/common/ExamDatePicker';

// import ExamMaster from '../../../components/examComps/ExamMaster';
// import ZicopsExam from '../../../components/examComps/ZicopsExam';
// import LabeledInput from '../../../components/common/FormComponents/LabeledInput';
// import LabeledDropdown from '../../../components/common/FormComponents/LabeledDropdown';
// import LabeledCheckbox from '../../../components/common/FormComponents/LabeledRadioCheckbox';
// import AddQuestionMetaData from '../../../components/examComps/AddQuestionMetaData';
import { examSidebarData } from '../../../components/common/Sidebar/Logic/sidebar.helper';
import AdminHeader from '../../../components/common/AdminHeader';
// import ExamSchedule from '../../components/examComps/ExamSchedule';

export default function Exams() {
  return (
    <>
      <Sidebar sidebarItemsArr={examSidebarData} />
      <MainBody>
        <AdminHeader title="My Exam" pageRoute="/admin/exams/create-exams" isAddShown={true} />
        <MainBodyBox></MainBodyBox>
      </MainBody>
    </>
  );
}
