import ExamsTable from '../../../../components/AdminExamComps/Exams/ExamsTable';
import AdminHeader from '../../../../components/common/AdminHeader';
import MainBody from '../../../../components/common/MainBody';
import MainBodyBox from '../../../../components/common/MainBodyBox';
import Sidebar from '../../../../components/common/Sidebar';
import { examSidebarData } from '../../../../components/common/Sidebar/Logic/sidebar.helper';

const MyExams = () => {
  return (
    <>
      <Sidebar sidebarItemsArr={examSidebarData} />
      <MainBody>
        <AdminHeader title="My Exams" isAddShown={true} pageRoute="/admin/exams/my-exams/add" tooltipTitle="Create new Exam"/>
        <MainBodyBox>
          <ExamsTable isEdit={true} />
        </MainBodyBox>
      </MainBody>
    </>
  );
};

export default MyExams;
