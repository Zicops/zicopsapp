import { useState } from 'react';
import AdminHeader from '@/components/common/AdminHeader';
import MainBody from '@/components/common/MainBody';
import MainBodyBox from '@/components/common/MainBodyBox';
import Sidebar from '@/components/common/Sidebar';
import { vendorSideBarData } from '@/components/common/Sidebar/Logic/sidebar.helper';
import MyVendor from '@/components/VendorComps/MyVendor';
import VendorPopUp from '@/components/VendorComps/VendorPopUp';
import VendorAdd from '@/components/VendorComps/AddVendor';

export default function ManageVendor() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVendorType, setIsVendorType] = useState("");
  const [isVendorLevel, setIsVendorLevel] = useState("");

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
          <VendorPopUp open={isOpen} title="Create Vendor" popUpState={[isOpen, setIsOpen]} 
            size="small"
            closeBtn = {{name: "Cancel"}}
            submitBtn = {{name: "Submit"}}
          isFooterVisible={true}>
            <VendorAdd title="Vendor type?" label1="Company" lable2="Individual/Freelancer" value1="company" value2="individual" name1="vendorType" changeHandler1={(e) => setIsVendorType(e.target.value)} changeHandler2={(e) => setIsVendorType(e.target.value)} vendor={isVendorType} checked1={isVendorType == "company"} checked2={isVendorType == "individual"} />
           <VendorAdd title ="At what level do you want to add the vendor?" label1="Organization" lable2="Learning space Level" value1="organization" value2="lsp" name1="vendorLevel" changeHandler1 ={(e)=>setIsVendorLevel(e.target.value)}  changeHandler2 ={(e)=>setIsVendorLevel(e.target.value)} vendor={isVendorLevel} checked1={isVendorType == "organization"} checked2={isVendorType == "lsp"} />
          </VendorPopUp>
        </MainBodyBox>
      </MainBody>
    </>
  );
}
