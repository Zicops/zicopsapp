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
  VendorStateAtom
} from '@/state/atoms/vendor.atoms';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

export default function VendorInfo() {
  const [vendorData, setVendorData] = useRecoilState(VendorStateAtom);
  const [smeData, setSMEData] = useRecoilState(SmeServicesAtom);
  const [ctData, setCTData] = useRecoilState(CtServicesAtom);
  const [cdData, setCDData] = useRecoilState(CdServicesAtom);
  const [profileData, setProfileData] = useRecoilState(VendorProfileAtom);

  // reset all recoil state
  useEffect(() => {
    setVendorData(getVendorObject({ type: vendorData?.type }));
    setSMEData(getSMEServicesObject());
    setCTData(getCTServicesObject());
    setCDData(getCDServicesObject());
    setProfileData(getProfileObject());
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
