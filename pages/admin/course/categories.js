import Sidebar from '../../../components/common/Sidebar';
import ZicopsCatsList from '../../../components/adminComps/ZicopsCourses/ZicopsCatsList';
import { courseSidebarData } from '../../../components/common/Sidebar/Logic/sidebar.helper';
import { useRecoilValue } from 'recoil';
import { ProductTourVisible } from '@/state/atoms/productTour.atom';
import ProductTour from '@/components/common/ProductTour';
import ProductTourFooter from '@/components/common/ProductTour/ProductTourFooter';

const Admin = () => {
  const showProductTourComps = useRecoilValue(ProductTourVisible);
  return (
    <div>
      <Sidebar sidebarItemsArr={courseSidebarData} isProductTooltip={showProductTourComps} />
      <ZicopsCatsList />
      <ProductTour />
      <ProductTourFooter isVisible={showProductTourComps} />
    </div>
  );
};

export default Admin;
