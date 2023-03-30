import AdminHeader from '@/components/common/AdminHeader';
import MainBody from '@/components/common/MainBody';
import MainBodyBox from '@/components/common/MainBodyBox';
import Sidebar from '@/components/common/Sidebar';
import { vendorSideBarData } from '@/components/common/Sidebar/Logic/sidebar.helper';
import ManageVendorTabs from '@/components/VendorComps/ManageVendorTabs';
import {
  CdServicesAtom,
  CtServicesAtom,
  getCDServicesObject,
  getCTServicesObject,
  getProfileObject,
  getSMEServicesObject,
  getVendorObject,
  SmeServicesAtom,
  VendorProfileAtom,
  VendorStateAtom,
  vendorUserInviteAtom
} from '@/state/atoms/vendor.atoms';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

export default function VendorInfo() {
  const [vendorData, setVendorData] = useRecoilState(VendorStateAtom);
  const [smeData, setSMEData] = useRecoilState(SmeServicesAtom);
  const [ctData, setCTData] = useRecoilState(CtServicesAtom);
  const [cdData, setCDData] = useRecoilState(CdServicesAtom);
  const [profileData, setProfileData] = useRecoilState(VendorProfileAtom);
  const [emailId, setEmailId] = useRecoilState(vendorUserInviteAtom);

  // reset all recoil state
  useEffect(() => {
    setVendorData(getVendorObject({ type: vendorData?.type, lspId: vendorData?.lspId }));
    setSMEData(getSMEServicesObject());
    setCTData(getCTServicesObject());
    setCDData(getCDServicesObject());
    setProfileData(getProfileObject());
    setEmailId([]);
  }, []);
  return (
    <>
      <Sidebar sidebarItemsArr={vendorSideBarData} />
      <MainBody>
        <AdminHeader title="Add Vendor" />

        <MainBodyBox>
          <ManageVendorTabs />
        </MainBodyBox>
      </MainBody>
    </>
  );
}
