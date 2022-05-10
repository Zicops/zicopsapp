import AdminHeader from '../../../../components/common/AdminHeader';
import MainBody from '../../../../components/common/MainBody';
import MainBodyBox from '../../../../components/common/MainBodyBox';
import Sidebar from '../../../../components/common/Sidebar';
import { examSidebarData } from '../../../../components/common/Sidebar/Logic/sidebar.helper';
import ZicopsQuestionsTable from '../../../../components/examComps/ExamTables/ZicopsQuestions';

const MyQuestionPapers = () => {
  return (
    <>
      <Sidebar sidebarItemsArr={examSidebarData} />
      <MainBody>
        <AdminHeader
          title="My Question Papers"
          isAddShown={true}
          pageRoute="/admin/exams/question-paper"
        />
        <MainBodyBox>
          <ZicopsQuestionsTable />
        </MainBodyBox>
      </MainBody>
    </>
  );
};

export default MyQuestionPapers;
