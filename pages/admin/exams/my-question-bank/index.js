import AdminHeader from '../../../../components/common/AdminHeader';
import MainBody from '../../../../components/common/MainBody';
import MainBodyBox from '../../../../components/common/MainBodyBox';
import Sidebar from '../../../../components/common/Sidebar';
import { examSidebarData } from '../../../../components/common/Sidebar/Logic/sidebar.helper';
import ZicopsQuestionBank from '../../../../components/examComps/ExamTables/ZicopsQuestionBank';

const MyQuestionBanks = () => {
  return (
    <>
      <Sidebar sidebarItemsArr={examSidebarData} />
      <MainBody>
        <AdminHeader title="My Question Banks" isAddShown={true} pageRoute="/admin/exams/question-bank"/>
        <MainBodyBox>
          <ZicopsQuestionBank />
        </MainBodyBox>
      </MainBody>
    </>
  );
};

export default MyQuestionBanks;
