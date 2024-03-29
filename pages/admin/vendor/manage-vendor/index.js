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
import { changeHandler } from '@/helper/common.helper';
import { useRecoilState, useRecoilValue } from 'recoil';
import { getVendorObject, VendorStateAtom } from '@/state/atoms/vendor.atoms';
import { USER_LSP_ROLE, VENDOR_MASTER_TYPE } from '@/helper/constants.helper';
import { UsersOrganizationAtom } from '@/state/atoms/users.atom';
export default function ManageVendor() {
  const [vendorData, setVendorData] = useRecoilState(VendorStateAtom);
  const userOrgData = useRecoilValue(UsersOrganizationAtom);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const isVendor = userOrgData.user_lsp_role?.toLowerCase()?.includes(USER_LSP_ROLE.vendor);

  return (
    <>
      <Sidebar sidebarItemsArr={vendorSideBarData} />
      <MainBody>
        <AdminHeader
          title="Vendor List"
          isAddShown={!isVendor}
          handleClickForPlus={() => {
            setIsOpen(true);
            const currentLsp = sessionStorage?.getItem('lsp_id');

            setVendorData(getVendorObject({ lspId: currentLsp }));
          }}
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
              handleClick: () => {
                router.push('/admin/vendor/manage-vendor/add-vendor');
              }
            }}
            isFooterVisible={true}>
            <AddVendor
              title="Vendor type ?"
              inputName="type"
              checkboxProps1={{
                label: 'Individual/Freelancer',
                value: 'individual',
                isChecked:
                  vendorData?.type?.toLowerCase() === VENDOR_MASTER_TYPE?.individual?.toLowerCase(),
                changeHandler: (e) => changeHandler(e, vendorData, setVendorData)
              }}
              checkboxProps2={{
                label: 'Company',
                value: 'company',
                isChecked:
                  vendorData?.type?.toLowerCase() === VENDOR_MASTER_TYPE?.company?.toLowerCase(),
                changeHandler: (e) => changeHandler(e, vendorData, setVendorData)
              }}
            />
            <AddVendor
              title="At what level do you want to add the vendor?"
              checkboxProps1={{
                label: 'Organization',
                value: 'organization',
                isChecked: vendorData?.level === 'organization',
                changeHandler: (e) => changeHandler(e, vendorData, setVendorData),
                isDisabled: true
              }}
              checkboxProps2={{
                label: 'Learning space Level',
                value: 'lsp',
                isChecked: vendorData?.level === 'lsp',
                changeHandler: (e) => changeHandler(e, vendorData, setVendorData),
                isDisabled: true
              }}
              inputName="level"
            />
          </VendorPopUp>
        </MainBodyBox>
      </MainBody>
    </>
  );
}
