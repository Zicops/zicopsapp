import QuestionBankData from '@/components/AdminExamComps/QuestionBanks/QuestionBankData';
import { useRecoilState } from 'recoil';
import AddQuestionBank from '../../../../components/AdminExamComps/QuestionBanks/AddQuestionBank';
import QuestionsTable from '../../../../components/AdminExamComps/QuestionBanks/QuestionsTable';
import AdminHeader from '../../../../components/common/AdminHeader';
import MainBody from '../../../../components/common/MainBody';
import MainBodyBox from '../../../../components/common/MainBodyBox';
import PopUp from '../../../../components/common/PopUp';
import Sidebar from '../../../../components/common/Sidebar';
import { examSidebarData } from '../../../../components/common/Sidebar/Logic/sidebar.helper';
import { PopUpStatesAtomFamily } from '../../../../state/atoms/popUp.atom';

export default function MyQuestionBanks() {
  const [popUpState, udpatePopUpState] = useRecoilState(PopUpStatesAtomFamily('addQuestionBank'));

  const closeBtn = {
    handleClick: () => udpatePopUpState(false)
  };

  return (
    <>
      <Sidebar sidebarItemsArr={examSidebarData} />
      <MainBody>
        <AdminHeader
          title="Design Basics"
          // isAddShown={true}
          // pageRoute="/admin/exams/question-bank"
          // handleClickForPlus={() => udpatePopUpState(true)}
          tooltipTitle="Add Questions"
        />
        <MainBodyBox>
          {/* <QuestionsTable /> */}
          <QuestionBankData isEdit={false} />
        </MainBodyBox>
      </MainBody>

      {/* add question bank pop up */}
      <PopUp
        title="Add Question Bank"
        popUpState={[popUpState, udpatePopUpState]}
        closeBtn={closeBtn}
        isFooterVisible={false}>
        <AddQuestionBank closePopUp={() => udpatePopUpState(false)} />
      </PopUp>
    </>
  );
}
