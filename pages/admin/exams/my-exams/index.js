import Sidebar from '../../../../components/common/Sidebar';
import MainBody from '../../../../components/common/MainBody';
import MainBodyBox from '../../../../components/common/MainBodyBox';
import { examSidebarData } from '../../../../components/common/Sidebar/Logic/sidebar.helper';
import ZicopsExamsTable from '../../../../components/examComps/ExamTables/ZicopsExams';
import AdminHeader from '../../../../components/common/AdminHeader';
import ExamsTable from '../../../../components/AdminExamComps/Exams/ExamsTable';

const MyExams = () => {
  return (
    <>
      <Sidebar sidebarItemsArr={examSidebarData} />
      <MainBody>
        <AdminHeader title="My Exams" isAddShown={true} pageRoute="/admin/exams/my-exams/add" />
        <MainBodyBox>
          <ExamsTable isEdit={true} />
        </MainBodyBox>
      </MainBody>
    </>
  );
};

export default MyExams;
