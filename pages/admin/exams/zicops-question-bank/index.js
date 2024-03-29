import { ADMIN_EXAMS } from '@/components/common/ToolTip/tooltip.helper';
import { useRecoilState } from 'recoil';
import QuestionBankTable from '../../../../components/AdminExamComps/QuestionBanks/QuestionBankTable';
import AdminHeader from '../../../../components/common/AdminHeader';
import MainBody from '../../../../components/common/MainBody';
import MainBodyBox from '../../../../components/common/MainBodyBox';
import Sidebar from '../../../../components/common/Sidebar';
import { examSidebarData } from '../../../../components/common/Sidebar/Logic/sidebar.helper';
import { PopUpStatesAtomFamily } from '../../../../state/atoms/popUp.atom';

export default function ZicopsQuestionBanks() {
  const [popUpState, udpatePopUpState] = useRecoilState(PopUpStatesAtomFamily('addQuestionBank'));

  return (
    <>
      <Sidebar sidebarItemsArr={examSidebarData} />
      <MainBody>
        <AdminHeader
          title="Zicops Question Banks"
          isAddShown={true}
          // pageRoute="/admin/exams/question-bank"
          handleClickForPlus={() => udpatePopUpState(true)}
          tooltipTitle={ADMIN_EXAMS.zicopsQuestionBanks.addBtn}
        />
        <MainBodyBox>
          <QuestionBankTable />
        </MainBodyBox>
        {/* <NoAccess /> */}
      </MainBody>
    </>
  );
}
