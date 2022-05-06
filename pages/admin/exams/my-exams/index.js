import Sidebar from '../../../../components/common/Sidebar';
import MainBody from '../../../../components/common/MainBody';
import MainBodyBox from '../../../../components/common/MainBodyBox';
import { examSidebarData } from '../../../../components/common/Sidebar/Logic/sidebar.helper';
import ZicopsExamsTable from '../../../../components/examComps/ExamTables/ZicopsExams';
import AdminHeader from '../../../../components/common/AdminHeader';


const MyExams = () => {
  return (
    <>
      <Sidebar sidebarItemsArr={examSidebarData} />
      <MainBody>
        <AdminHeader title="My Exams" isAddShown={true} />
        <MainBodyBox>
          <ZicopsExamsTable />
        </MainBodyBox>
      </MainBody>
    </>
  );
};

export default MyExams;
