import NoAccess from '@/components/NoAccess';
import ExamsTable from '../../../../components/AdminExamComps/Exams/ExamsTable';
import AdminHeader from '../../../../components/common/AdminHeader';
import MainBody from '../../../../components/common/MainBody';
import MainBodyBox from '../../../../components/common/MainBodyBox';
import Sidebar from '../../../../components/common/Sidebar';
import { examSidebarData } from '../../../../components/common/Sidebar/Logic/sidebar.helper';

const ZicopsExam = () => {
  return (
    <>
      <Sidebar sidebarItemsArr={examSidebarData} />
      <MainBody>
        <AdminHeader
          title="Zicops Exams"
          isAddShown={true}
          pageRoute="/admin/exams/my-exams/add"
          tooltipTitle="Create new Exam"
        />
        {/* <MainBodyBox>
          <ExamsTable />
        </MainBodyBox> */}
        <NoAccess />
      </MainBody>
    </>
  );
};

export default ZicopsExam;
