import NoAccess from '@/components/NoAccess';
import QuestionPaperTable from '../../../../components/AdminExamComps/QuestionPapers/QuestionPaperTable';
import AdminHeader from '../../../../components/common/AdminHeader';
import MainBody from '../../../../components/common/MainBody';
import MainBodyBox from '../../../../components/common/MainBodyBox';
import Sidebar from '../../../../components/common/Sidebar';
import { examSidebarData } from '../../../../components/common/Sidebar/Logic/sidebar.helper';

const ZicopsQuestionPapers = () => {
  return (
    <>
      <Sidebar sidebarItemsArr={examSidebarData} />
      <MainBody>
        <AdminHeader
          title="Zicops Question Papers"
          isAddShown={true}
          pageRoute="/admin/exams/my-question-papers/add"
          tooltipTitle="Create new Question Paper"
        />

        {/* <div style={{ padding: '50px' }}>
            <QuizOptionInput />
          </div> */}
        {/* <MainBodyBox>
          <QuestionPaperTable />
        </MainBodyBox> */}
        <NoAccess />
      </MainBody>
    </>
  );
};

export default ZicopsQuestionPapers;
