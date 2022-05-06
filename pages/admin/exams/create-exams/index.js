import MainBody from '../../../../components/common/MainBody';
import MainBodyBox from '../../../../components/common/MainBodyBox';
import Sidebar from '../../../../components/common/Sidebar';
import { examSidebarData } from '../../../../components/common/Sidebar/Logic/sidebar.helper';
import CourseHead from '../../../../components/CourseHead';
import ExamsTabs from '../../../../components/examComps/ExamsTabs';

export default function AddEditExams() {
  return (
    <>
      <Sidebar sidebarItemsArr={examSidebarData} />
      <MainBody>
        <CourseHead title="Exam Components" pageRoute="/admin/create-exams" />
        <MainBodyBox>
          <ExamsTabs />
        </MainBodyBox>
      </MainBody>
    </>
  );
}
