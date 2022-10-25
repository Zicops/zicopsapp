import { ADMIN_EXAMS } from '@/components/common/ToolTip/tooltip.helper';
import ProductTour from '@/components/common/ProductTour';
import { PRODUCT_TOUR_FLOW } from '@/components/common/ProductTour/productTour.flow';
import { PROD_TOUR_ADMIN_EXAMS } from '@/components/common/ProductTour/productTour.helper';
import ProductTourFooter from '@/components/common/ProductTour/ProductTourFooter';
import { ProductTourVisible } from '@/state/atoms/productTour.atom';
import { useRecoilValue } from 'recoil';
import QuestionPaperTable from '../../../../components/AdminExamComps/QuestionPapers/QuestionPaperTable';
import AdminHeader from '../../../../components/common/AdminHeader';
import MainBody from '../../../../components/common/MainBody';
import MainBodyBox from '../../../../components/common/MainBodyBox';
import Sidebar from '../../../../components/common/Sidebar';
import { examSidebarData } from '../../../../components/common/Sidebar/Logic/sidebar.helper';

export default function MyQuestionPapers() {
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
          title="My Question Papers"
          isAddShown={true}
          pageRoute="/admin/exams/my-question-papers/add"
          tooltipTitle={ADMIN_EXAMS.myQuestionPapers.addBtn}
          isProductTooltip={showProductTourComps}
          productTooltipData={PRODUCT_TOUR_FLOW?.[2]}
          tourId={PRODUCT_TOUR_FLOW?.[2]?.id}
        />

        <MainBodyBox>
          <QuestionPaperTable isEdit={true} />
        </MainBodyBox>
      </MainBody>
      <ProductTour />
      <ProductTourFooter isVisible={showProductTourComps} />
    </>
  );
}
