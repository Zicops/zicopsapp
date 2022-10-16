import ProductTour from '@/components/common/ProductTour';
import { PRODUCT_TOUR_FLOW } from '@/components/common/ProductTour/productTour.flow';
import { PROD_TOUR_ADMIN_EXAMS } from '@/components/common/ProductTour/productTour.helper';
import ProductTourFooter from '@/components/common/ProductTour/ProductTourFooter';
import { ProductTourVisible } from '@/state/atoms/productTour.atom';
import { useRecoilState, useRecoilValue } from 'recoil';
import QuestionBankTable from '../../../../components/AdminExamComps/QuestionBanks/QuestionBankTable';
import AdminHeader from '../../../../components/common/AdminHeader';
import MainBody from '../../../../components/common/MainBody';
import MainBodyBox from '../../../../components/common/MainBodyBox';
import Sidebar from '../../../../components/common/Sidebar';
import { examSidebarData } from '../../../../components/common/Sidebar/Logic/sidebar.helper';
import { PopUpStatesAtomFamily } from '../../../../state/atoms/popUp.atom';

export default function MyQuestionBanks() {
  const [popUpState, udpatePopUpState] = useRecoilState(PopUpStatesAtomFamily('addQuestionBank'));
  const showProductTourComps = useRecoilValue(ProductTourVisible);

  return (
    <>
      <Sidebar
        sidebarItemsArr={examSidebarData}
        isProductTooltip={showProductTourComps}
        proproductTooltipData={PROD_TOUR_ADMIN_EXAMS?.myExamBanks}
      />
      <MainBody>
        <AdminHeader
          title="My Question Banks"
          isAddShown={true}
          handleClickForPlus={() => udpatePopUpState(true)}
          tooltipTitle="Create new Question Bank"
          isProductTooltip={showProductTourComps}
          productTooltipData={PRODUCT_TOUR_FLOW?.[0]}
          tourId={PRODUCT_TOUR_FLOW?.[0]?.id}
        />
        <MainBodyBox>
          <QuestionBankTable isEdit={true} />
        </MainBodyBox>
      </MainBody>
      <ProductTour />
      <ProductTourFooter isVisible={showProductTourComps} />
    </>
  );
}
