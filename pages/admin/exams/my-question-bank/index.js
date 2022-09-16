import { useRecoilState } from 'recoil';
import QuestionBankTable from '../../../../components/AdminExamComps/QuestionBanks/QuestionBankTable';
import AdminHeader from '../../../../components/common/AdminHeader';
import MainBody from '../../../../components/common/MainBody';
import MainBodyBox from '../../../../components/common/MainBodyBox';
import Sidebar from '../../../../components/common/Sidebar';
import { examSidebarData } from '../../../../components/common/Sidebar/Logic/sidebar.helper';
import { PopUpStatesAtomFamily } from '../../../../state/atoms/popUp.atom';

export default function MyQuestionBanks() {
  const [popUpState, udpatePopUpState] = useRecoilState(PopUpStatesAtomFamily('addQuestionBank'));

  return (
    <>
      <Sidebar sidebarItemsArr={examSidebarData} />
      <MainBody>
        <AdminHeader
          title="My Question Banks"
          isAddShown={true}
          handleClickForPlus={() => udpatePopUpState(true)}
          tooltipTitle="Create new Question Bank"
        />
        <MainBodyBox>
          <QuestionBankTable isEdit={true} />
        </MainBodyBox>
      </MainBody>
    </>
  );
}
