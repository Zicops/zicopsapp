import MyCourseList from '../../../components/adminComps/ZicopsCourses/MyCourseList';
import CourseHead from '../../../components/CourseHead';
import Sidebar from '../../../components/common/Sidebar';
import { courseSidebarData } from '../../../components/common/Sidebar/Logic/sidebar.helper';
import { ADMIN_COURSES } from '@/components/common/ToolTip/tooltip.helper';
import { ProductTourVisible } from '@/state/atoms/productTour.atom';
import { useRecoilValue } from 'recoil';
import { PROD_TOUR_ADMIN_EXAMS } from '@/components/common/ProductTour/productTour.helper';
import ProductTour from '@/components/common/ProductTour';
import ProductTourFooter from '@/components/common/ProductTour/ProductTourFooter';
import { PRODUCT_TOUR_FLOW } from '@/components/common/ProductTour/productTour.flow';

const MyCourses = () => {
  const showProductTourComps = useRecoilValue(ProductTourVisible);

  return (
    <div>
      <Sidebar
        sidebarItemsArr={courseSidebarData}
        isProductTooltip={showProductTourComps}
        setPage="courses"
      />
      <div className={`adminContent`}>
        <CourseHead
          title="My Courses"
          isShowOption={true}
          pageRoute="/admin/courses"
          tooltipTitle={ADMIN_COURSES.myCourses.addBtn}
          isProductTooltip={showProductTourComps}
          productTooltipData={PRODUCT_TOUR_FLOW?.[6]}
          tourId={PRODUCT_TOUR_FLOW?.[6]?.id}
        />
        <MyCourseList />
      </div>
      <ProductTour />
      <ProductTourFooter isVisible={showProductTourComps} />
    </div>
  );
};

export default MyCourses;
