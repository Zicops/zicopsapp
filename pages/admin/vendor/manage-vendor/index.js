import { useState } from 'react';
import AdminHeader from '@/components/common/AdminHeader';
import MainBody from '@/components/common/MainBody';
import MainBodyBox from '@/components/common/MainBodyBox';
import Sidebar from '@/components/common/Sidebar';
import { vendorSideBarData } from '@/components/common/Sidebar/Logic/sidebar.helper';
import MyVendor from '@/components/VendorComps/MyVendor';
import VendorPopUp from '@/components/VendorComps/common/VendorPopUp';
import AddVendor from '@/components/VendorComps/AddVendor';
import { useRouter } from 'next/router';
import useHandleVendor from '@/components/VendorComps/Logic/useHandleVendor';
import { changeHandler } from '@/helper/common.helper';
import { useRecoilState } from 'recoil';
import { VendorStateAtom } from '@/state/atoms/vendor.atoms';
export default function ManageVendor() {
  const [vendorData, setVendorData] = useRecoilState(VendorStateAtom);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      <Sidebar sidebarItemsArr={vendorSideBarData} />
      <MainBody>
        <AdminHeader
          title="Vendor List"
          isAddShown={true}
          handleClickForPlus={() => setIsOpen(true)}
          isProductTooltip={false}
        />
        <MainBodyBox>
          <MyVendor />
          <VendorPopUp
            open={isOpen}
            title="Create Vendor"
            popUpState={[isOpen, setIsOpen]}
            size="small"
            closeBtn={{ name: 'Cancel' }}
            submitBtn={{
              name: 'Next',
              handleClick: () => router.push('/admin/vendor/manage-vendor/add-vendor')
            }}
            isFooterVisible={true}>
            <AddVendor
              title="Vendor type ?"
              inputName="vendorType"
              checkboxProps1={{
                label: 'Individual/Freelancer',
                value: 'individual',
                isChecked: vendorData?.vendorType === 'individual',
                changeHandler: (e) => changeHandler(e, vendorData, setVendorData)
              }}
              checkboxProps2={{
                label: 'Company',
                value: 'company',
                isChecked: vendorData?.vendorType === 'company',
                changeHandler: (e) => changeHandler(e, vendorData, setVendorData)
              }}
            />
            <AddVendor
              title="At what level do you want to add the vendor?"
              checkboxProps1={{
                label: 'Organization',
                value: 'organization',
                isChecked: vendorData?.vendorLevel === 'organization',
                changeHandler: (e) => changeHandler(e, vendorData, setVendorData)
              }}
              checkboxProps2={{
                label: 'Learning space Level',
                value: 'lsp',
                isChecked: vendorData?.vendorLevel === 'lsp',
                changeHandler: (e) => changeHandler(e, vendorData, setVendorData)
              }}
              inputName="vendorLevel"
            />
          </VendorPopUp>
        </MainBodyBox>
      </MainBody>
    </>
  );
}
