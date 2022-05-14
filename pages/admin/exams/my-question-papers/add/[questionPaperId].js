import QuestionPaperTab from '../../../../../components/AdminExamComps/QuestionPapers/QuestionPaperTab';
import AdminHeader from '../../../../../components/common/AdminHeader';
import MainBody from '../../../../../components/common/MainBody';
import MainBodyBox from '../../../../../components/common/MainBodyBox';
import Sidebar from '../../../../../components/common/Sidebar';
import { examSidebarData } from '../../../../../components/common/Sidebar/Logic/sidebar.helper';

export default function AddQuestionPaper() {
  return (
    <>
      <Sidebar sidebarItemsArr={examSidebarData} />
      <MainBody>
        <AdminHeader title="Add Question Papers" />

        <MainBodyBox>
          <QuestionPaperTab />
        </MainBodyBox>
      </MainBody>
    </>
  );
}
