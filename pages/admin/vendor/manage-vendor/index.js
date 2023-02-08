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

export default function ManageVendor() {
  const [isOpen, setIsOpen] = useState(false);
  const [vendorType, setVendorType] = useState('company');
  const [vendorLevel, setVendorLevel] = useState('lsp');

  const onPlusHandler = () => {
    setIsOpen(true);
  };

  const router = useRouter();

  const handleClick = () => router.push('/admin/vendor/manage-vendor/add-vendor');

  return (
    <>
      <Sidebar sidebarItemsArr={vendorSideBarData} />
      <MainBody>
        <AdminHeader
          title="Vendor List"
          isAddShown={true}
          handleClickForPlus={onPlusHandler}
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
            submitBtn={{ name: 'Next', handleClick: handleClick }}
            isFooterVisible={true}>
            <AddVendor
              title="Vendor type ?"
              inputName="vendorType"
              checkboxProps1={{
                label: 'Individual/Freelancer',
                value: 'individual',
                isChecked: vendorType === 'individual',
                changeHandler: (e) => setVendorType(e.target.value)
              }}
              checkboxProps2={{
                label: 'Company',
                value: 'company',
                isChecked: vendorType === 'company',
                changeHandler: (e) => setVendorType(e.target.value)
              }}
            />
            <AddVendor
              title="At what level do you want to add the vendor?"
              checkboxProps1={{
                label: 'Organization',
                value: 'organization',
                isChecked: vendorLevel === 'organization',
                changeHandler: (e) => {
                  setVendorLevel(e.target.value);
                }
              }}
              checkboxProps2={{
                label: 'Learning space Level',
                value: 'lsp',
                isChecked: vendorLevel === 'lsp',
                changeHandler: (e) => setVendorLevel(e.target.value)
              }}
              inputName="vendorLevel"
            />
          </VendorPopUp>
        </MainBodyBox>
      </MainBody>
    </>
  );
}
