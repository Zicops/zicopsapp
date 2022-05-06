import AdminHeader from '../../../../components/common/AdminHeader';
import MainBody from '../../../../components/common/MainBody';
import MainBodyBox from '../../../../components/common/MainBodyBox';
import Sidebar from '../../../../components/common/Sidebar';
import { examSidebarData } from '../../../../components/common/Sidebar/Logic/sidebar.helper';
import MyExamsTable from '../../../../components/examComps/ExamTables/MyExamTable';

const ZicopsExam = () => {
  return (
    <>
      <Sidebar sidebarItemsArr={examSidebarData} />
      <MainBody>
        <AdminHeader title="Zicops Exams" isAddShown={true} />
        <MainBodyBox>
          <MyExamsTable />
        </MainBodyBox>
      </MainBody>
    </>
  );
};

export default ZicopsExam;
