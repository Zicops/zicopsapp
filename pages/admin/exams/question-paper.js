import AdminHeader from '../../../components/common/AdminHeader';
import MainBody from '../../../components/common/MainBody';
import MainBodyBox from '../../../components/common/MainBodyBox';
import Sidebar from '../../../components/common/Sidebar';
import { examSidebarData } from '../../../components/common/Sidebar/Logic/sidebar.helper';
import AddQuestionBank from '../../../components/examComps/AddQuestionBank';
import QuestionMaster from '../../../components/examComps/QuestionMasterTab/QuestionMaster';
import ExamsTabs from '../../../components/examComps/ExamsTabs';
import ExamFooter from '../../../components/examComps/ExamsTabs/ExamFooter';
import QuestionPaperMaster from '../../../components/examComps/ExamsTabs/QuestionPaperMaster';
import ZicopsQuestionsTable from '../../../components/examComps/ExamTables/ZicopsQuestions';
import QuizOptionInput from '../../../components/examComps/QuizOptionInput';

const AddEditQuestionPaper = () => {
  return (
    <>
      <Sidebar sidebarItemsArr={examSidebarData} />
      <MainBody>
        <AdminHeader title="Add Question Paper" isAddShown={false} />
        <MainBodyBox>
          <div style={{ padding: '20px 50px' }}>
            {/* <h4 style={{ textAlign: 'center' }}>Add Question Bank</h4> */}

            <QuestionMaster />
          </div>
          {/* <ExamFooter /> */}
        </MainBodyBox>
      </MainBody>
    </>
  );
};

export default AddEditQuestionPaper;
