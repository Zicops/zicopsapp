import AdminHeader from '../../../../components/common/AdminHeader';
import MainBody from '../../../../components/common/MainBody';
import MainBodyBox from '../../../../components/common/MainBodyBox';
import Sidebar from '../../../../components/common/Sidebar';
import { examSidebarData } from '../../../../components/common/Sidebar/Logic/sidebar.helper';
import QuizOptionInput from '../../../../components/examComps/QuizOptionInput';

const ZicopsQuestionPapers = () => {
  return (
    <>
      <Sidebar sidebarItemsArr={examSidebarData} />
      <MainBody>
        <AdminHeader title="Zicops Question Papers" isAddShown={true} />
        <MainBodyBox>
          <div style={{ padding: '50px' }}>
            <QuizOptionInput />
          </div>
        </MainBodyBox>
      </MainBody>
    </>
  );
};

export default ZicopsQuestionPapers;
