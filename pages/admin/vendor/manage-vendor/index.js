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
<<<<<<< HEAD
import useHandleVendor from '@/components/VendorComps/Logic/useHandleVendor';
import { changeHandler } from '@/helper/common.helper';
import { useRecoilState } from 'recoil';
import { VendorStateAtom } from '@/state/atoms/vendor.atoms';
export default function ManageVendor() {
  const [vendorData, setVendorData] = useRecoilState(VendorStateAtom);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

=======

export default function ManageVendor() {
  const [isOpen, setIsOpen] = useState(false);
  const [vendorType, setVendorType] = useState('company');
  const [vendorLevel, setVendorLevel] = useState('lsp');

  const onPlusHandler = () => {
    setIsOpen(true);
  };

  const router = useRouter();

  const handleClick = () => router.push('/admin/vendor/manage-vendor/add-vendor');

>>>>>>> e88f03eb5d46c3c5c3273d1143d1927fdc6c84cd
  return (
    <>
      <Sidebar sidebarItemsArr={vendorSideBarData} />
      <MainBody>
        <AdminHeader
          title="Vendor List"
          isAddShown={true}
<<<<<<< HEAD
          handleClickForPlus={() => setIsOpen(true)}
=======
          handleClickForPlus={onPlusHandler}
>>>>>>> e88f03eb5d46c3c5c3273d1143d1927fdc6c84cd
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
<<<<<<< HEAD
            submitBtn={{
              name: 'Next',
              handleClick: () => router.push('/admin/vendor/manage-vendor/add-vendor')
            }}
=======
            submitBtn={{ name: 'Next', handleClick: handleClick }}
>>>>>>> e88f03eb5d46c3c5c3273d1143d1927fdc6c84cd
            isFooterVisible={true}>
            <AddVendor
              title="Vendor type ?"
              inputName="vendorType"
              checkboxProps1={{
                label: 'Individual/Freelancer',
                value: 'individual',
<<<<<<< HEAD
                isChecked: vendorData?.vendorType === 'individual',
                changeHandler: (e) => changeHandler(e, vendorData, setVendorData)
=======
                isChecked: vendorType === 'individual',
                changeHandler: (e) => setVendorType(e.target.value)
>>>>>>> e88f03eb5d46c3c5c3273d1143d1927fdc6c84cd
              }}
              checkboxProps2={{
                label: 'Company',
                value: 'company',
<<<<<<< HEAD
                isChecked: vendorData?.vendorType === 'company',
                changeHandler: (e) => changeHandler(e, vendorData, setVendorData)
=======
                isChecked: vendorType === 'company',
                changeHandler: (e) => setVendorType(e.target.value)
>>>>>>> e88f03eb5d46c3c5c3273d1143d1927fdc6c84cd
              }}
            />
            <AddVendor
              title="At what level do you want to add the vendor?"
              checkboxProps1={{
                label: 'Organization',
                value: 'organization',
<<<<<<< HEAD
                isChecked: vendorData?.vendorLevel === 'organization',
                changeHandler: (e) => changeHandler(e, vendorData, setVendorData)
=======
                isChecked: vendorLevel === 'organization',
                changeHandler: (e) => {
                  setVendorLevel(e.target.value);
                }
>>>>>>> e88f03eb5d46c3c5c3273d1143d1927fdc6c84cd
              }}
              checkboxProps2={{
                label: 'Learning space Level',
                value: 'lsp',
<<<<<<< HEAD
                isChecked: vendorData?.vendorLevel === 'lsp',
                changeHandler: (e) => changeHandler(e, vendorData, setVendorData)
=======
                isChecked: vendorLevel === 'lsp',
                changeHandler: (e) => setVendorLevel(e.target.value)
>>>>>>> e88f03eb5d46c3c5c3273d1143d1927fdc6c84cd
              }}
              inputName="vendorLevel"
            />
          </VendorPopUp>
        </MainBodyBox>
      </MainBody>
    </>
  );
}
