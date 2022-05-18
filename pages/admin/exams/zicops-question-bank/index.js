import { useRecoilState } from 'recoil';
import AddQuestionBank from '../../../../components/AdminExamComps/QuestionBanks/AddQuestionBank';
import QuestionBankTable from '../../../../components/AdminExamComps/QuestionBanks/QuestionBankTable';
import AdminHeader from '../../../../components/common/AdminHeader';
import MainBody from '../../../../components/common/MainBody';
import MainBodyBox from '../../../../components/common/MainBodyBox';
import PopUp from '../../../../components/common/PopUp';
import Sidebar from '../../../../components/common/Sidebar';
import { examSidebarData } from '../../../../components/common/Sidebar/Logic/sidebar.helper';
import { PopUpStatesAtomFamily } from '../../../../state/atoms/popUp.atom';

const ZicopsQuestionBanks = () => {
  const [popUpState, udpatePopUpState] = useRecoilState(PopUpStatesAtomFamily('addQuestionBank'));

  const closeBtn = {
    handleClick: () => udpatePopUpState(false)
  };

  return (
    <>
      <Sidebar sidebarItemsArr={examSidebarData} />
      <MainBody>
        <AdminHeader
          title="Zicops Question Banks"
          isAddShown={true}
          // pageRoute="/admin/exams/question-bank"
          handleClickForPlus={() => udpatePopUpState(true)}
        />
        <MainBodyBox>
          <QuestionBankTable />
        </MainBodyBox>
      </MainBody>

      {/* add question bank pop up */}
      <PopUp
        title="Add Question Bank"
        isPopUpOpen={popUpState}
        closeBtn={closeBtn}
        isFooterVisible={false}>
        <AddQuestionBank closePopUp={() => udpatePopUpState(false)} />
      </PopUp>
    </>
  );
};

export default ZicopsQuestionBanks;
