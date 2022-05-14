import ExamMasterTab from '../../../../../components/AdminExamComps/Exams/ExamMasterTab';
import AdminHeader from '../../../../../components/common/AdminHeader';
import MainBody from '../../../../../components/common/MainBody';
import MainBodyBox from '../../../../../components/common/MainBodyBox';
import Sidebar from '../../../../../components/common/Sidebar';
import { examSidebarData } from '../../../../../components/common/Sidebar/Logic/sidebar.helper';

export default function AddExam() {
  return (
    <>
      <Sidebar sidebarItemsArr={examSidebarData} />
      <MainBody>
        <AdminHeader title="Create Exam" />

        <MainBodyBox>
          <ExamMasterTab />
        </MainBodyBox>
      </MainBody>
    </>
  );
}
