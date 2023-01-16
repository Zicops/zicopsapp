import Sidebar from '@/components/common/Sidebar';
import { vendorSideBarData } from '@/components/common/Sidebar/Logic/sidebar.helper';

export default function MarketYard() {
  return (
    <>
      <Sidebar sidebarItemsArr={vendorSideBarData} />

      <div>
        <p>Vendor marketyard</p>
      </div>
    </>
  );
}
