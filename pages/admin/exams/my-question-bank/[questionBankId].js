import { useState } from 'react';
import { useRecoilState } from 'recoil';
import AddQuestionBank from '../../../../components/AdminExamComps/QuestionBanks/AddQuestionBank';
import QuestionMasterTab from '../../../../components/AdminExamComps/QuestionBanks/QuestionMasterTab';
import QuestionsTable from '../../../../components/AdminExamComps/QuestionBanks/QuestionsTable';
import AdminHeader from '../../../../components/common/AdminHeader';
import MainBody from '../../../../components/common/MainBody';
import MainBodyBox from '../../../../components/common/MainBodyBox';
import PopUp from '../../../../components/common/PopUp';
import Sidebar from '../../../../components/common/Sidebar';
import { examSidebarData } from '../../../../components/common/Sidebar/Logic/sidebar.helper';
import { PopUpStatesAtomFamily } from '../../../../state/atoms/popUp.atom';

const MyQuestionBanks = () => {
  const [popUpState, udpatePopUpState] = useRecoilState(PopUpStatesAtomFamily('editQuestions'));
  const [showAddQuestionForm, setShowAddQuestionForm] = useState(false);

  const closeBtn = {
    handleClick: () => udpatePopUpState(false)
  };

  return (
    <>
      <Sidebar sidebarItemsArr={examSidebarData} />
      <MainBody>
        <AdminHeader
          title="Design Basics"
          isAddShown={!showAddQuestionForm}
          // pageRoute="/admin/exams/question-bank"
          handleClickForPlus={() => setShowAddQuestionForm(true)}
        />
        <MainBodyBox>
          {showAddQuestionForm ? (
            <QuestionMasterTab closeQuestionMasterTab={() => setShowAddQuestionForm(false)} />
          ) : (
            <QuestionsTable
              isEdit={true}
              openEditQuestionMasterTab={() => setShowAddQuestionForm(true)}
            />
          )}
        </MainBodyBox>
      </MainBody>

      {/* add questions pop up */}
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

export default MyQuestionBanks;
