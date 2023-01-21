import { useState } from 'react';
import AdminHeader from '@/components/common/AdminHeader';
import MainBody from '@/components/common/MainBody';
import MainBodyBox from '@/components/common/MainBodyBox';
import PopUp from '@/components/common/PopUp';
import Sidebar from '@/components/common/Sidebar';
import { vendorSideBarData } from '@/components/common/Sidebar/Logic/sidebar.helper';
import MyVendor from '@/components/VendorComps/MyVendor';

export default function ManageVendor() {
  const [isOpen, setIsOpen] = useState(false)
  const onPlusHandler = () => {
    console.log("hello");
    setIsOpen(true);
  }
  return (
    <>
      <Sidebar sidebarItemsArr={vendorSideBarData} />
      <MainBody>
        <AdminHeader title="Vendor List"
          isAddShown={true}
          handleClickForPlus={onPlusHandler}
          isProductTooltip={false}
          />
        <MainBodyBox>
          <MyVendor />
          {isOpen && <PopUp title="Create Vendor" >
            <div>Hello</div>
          </PopUp>}
        </MainBodyBox>
      </MainBody>
    </>
  );
}
