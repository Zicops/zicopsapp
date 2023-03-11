import Button from '@/common/Button';
import TabContainer from '@/common/TabContainer';
import AdminHeader from '@/components/common/AdminHeader';
import MainBody from '@/components/common/MainBody';
import MainBodyBox from '@/components/common/MainBodyBox';
import Sidebar from '@/components/common/Sidebar';
import { vendorSideBarData } from '@/components/common/Sidebar/Logic/sidebar.helper';
import AddVendorCourses from '@/components/VendorComps/AddVendor/AddVendorCourses';
import AddVendorServices from '@/components/VendorComps/AddVendor/AddVendorServices';
import VendorMaster from '@/components/VendorComps/AddVendor/VendorMaster';
import useHandleVendor from '@/components/VendorComps/Logic/useHandleVendor';
import ProfileManageVendor from '@/components/VendorComps/ProfileMangeVendor';
import styles from '@/components/VendorComps/vendorComps.module.scss';
import VendorOrders from '@/components/VendorComps/VendorOrders';
import VendorUsers from '@/components/VendorComps/VendorUsers';
import { VendorStateAtom } from '@/state/atoms/vendor.atoms';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import useHandleVendorMaster from '@/components/VendorComps/Logic/useHandleVendorMaster';
import useHandleVendorServices from '@/components/VendorComps/Logic/useHandleVendorServices';
import ManageVendorTabs from '@/components/VendorComps/ManageVendorTabs';

export default function EditVendor() {
  const vendorData = useRecoilValue(VendorStateAtom);

  return (
    <>
      <Sidebar sidebarItemsArr={vendorSideBarData} />
      <MainBody>
        <AdminHeader
          title={
            <>
              {vendorData?.name || 'Edit Vendor'}
              <p style={{ color: 'var(--primary)', fontSize: '18px' }}>[ {vendorData?.type} ]</p>
              {/* <p className={`${styles.subHeader}`}>{vendorData?.type}</p> */}
            </>
          }
        />

        <MainBodyBox>
          <ManageVendorTabs />
        </MainBodyBox>
      </MainBody>
    </>
  );
}
