import AdminHeader from '@/components/common/AdminHeader';
import MainBody from '@/components/common/MainBody';
import MainBodyBox from '@/components/common/MainBodyBox';
import Sidebar from '@/components/common/Sidebar';
import { vendorSideBarData } from '@/components/common/Sidebar/Logic/sidebar.helper';
import ManageVendorTabs from '@/components/VendorComps/ManageVendorTabs';
import { VendorStateAtom, vendorUserInviteAtom } from '@/state/atoms/vendor.atoms';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

export default function EditVendor() {
  const vendorData = useRecoilValue(VendorStateAtom);
  const [emailId, setEmailId] = useRecoilState(vendorUserInviteAtom);

  useEffect(() => {
    setEmailId([]);
  }, []);

  return (
    <>
      <Sidebar sidebarItemsArr={vendorSideBarData} />
      <MainBody>
        <AdminHeader
          title={
            <>
              {vendorData?.name || 'Edit Vendor'}
              <p style={{ color: 'var(--primary)', fontSize: '18px', textTransform: 'capitalize' }}>
                [ {vendorData?.type} ]
              </p>
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
