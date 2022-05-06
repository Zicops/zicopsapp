import AdminHeader from '../../../../components/common/AdminHeader';
import MainBody from '../../../../components/common/MainBody';
import MainBodyBox from '../../../../components/common/MainBodyBox';
import Sidebar from '../../../../components/common/Sidebar';
import { examSidebarData } from '../../../../components/common/Sidebar/Logic/sidebar.helper';
import AddQuestionBank from '../../../../components/examComps/AddQuestionBank';
import ExamFooter from '../../../../components/examComps/ExamsTabs/ExamFooter';
import ZicopsQuestionsTable from '../../../../components/examComps/ExamTables/ZicopsQuestions';

const AddEditQuestionBank = () => {
  return (
    <>
      <Sidebar sidebarItemsArr={examSidebarData} />
      <MainBody>
        <AdminHeader title="Add Question Bank" isAddShown={false} />
        <MainBodyBox>
          {/* <ZicopsQuestionsTable /> */}
          <div style={{ padding: '20px 50px' }}>
            <h4 style={{ textAlign: 'center' }}>Add Question Bank</h4>
            <AddQuestionBank />
          </div>
          <ExamFooter />
        </MainBodyBox>
      </MainBody>
    </>
  );
};

export default AddEditQuestionBank;
