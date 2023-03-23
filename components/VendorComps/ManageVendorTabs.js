import styles from '@/components/VendorComps/vendorComps.module.scss';
import { FeatureFlagsAtom } from '@/state/atoms/global.atom';
import {
  getVendorCurrentStateObj,
  VendorCurrentStateAtom,
  VendorStateAtom,
  vendorUserInviteAtom
} from '@/state/atoms/vendor.atoms';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import TabContainer from '../common/TabContainer';
import Button from '../CustomVideoPlayer/Button';
import useHandleVendor from './Logic/useHandleVendor';
import useHandleVendorMaster from './Logic/useHandleVendorMaster';
import useHandleVendorServices from './Logic/useHandleVendorServices';
import { manageVendorTabData } from './Logic/vendorComps.helper';

export default function ManageVendorTabs() {
  const vendorData = useRecoilValue(VendorStateAtom);
  const { isDev } = useRecoilValue(FeatureFlagsAtom);
  const [emailId, setEmailId] = useRecoilState(vendorUserInviteAtom);
  const [vendorCurrentState, setVendorCurrentState] = useRecoilState(VendorCurrentStateAtom);

  const { handleMail } = useHandleVendor();
  const { addUpdateVendor, loading } = useHandleVendorMaster();
  const { addUpdateSme, addUpdateCrt, addUpdateCd } = useHandleVendorServices();

  const {
    getSingleVendorInfo,
    getSmeDetails,
    getCrtDetails,
    getCdDetails,
    getSMESampleFiles,
    getCRTSampleFiles,
    getCDSampleFiles,
    getAllProfileInfo
  } = useHandleVendor();

  const router = useRouter();
  const vendorId = router.query.vendorId || null;
  const isViewPage = router.asPath?.includes('view-vendor');

  // reset to default on load
  // NOTE: on load is saved is false which should ideally be false only if something is changed
  useEffect(() => {
    setVendorCurrentState(getVendorCurrentStateObj());
  }, []);

  useEffect(() => {
    if (!vendorId) return setEmailId([]);
    getSingleVendorInfo();
    getSmeDetails();
    getCrtDetails();
    getCdDetails();
    getSMESampleFiles();
    getCRTSampleFiles();
    getCDSampleFiles();
    getAllProfileInfo();
  }, [vendorId]);

  const tabData = manageVendorTabData;

  tabData[4].isHidden = !isDev;

  const [tab, setTab] = useState(tabData[0].name);

  return (
    <TabContainer
      tabData={tabData}
      tab={tab}
      setTab={setTab}
      footerObj={{
        showFooter: true,
        submitDisplay: vendorData.vendorId ? 'Update' : 'Save',
        handleSubmit: async () => {
          setVendorCurrentState({ ...vendorCurrentState, isUpdating: true });

          await addUpdateVendor(tab === tabData[0].name);
          await handleMail(tab === tabData[0].name);
          await addUpdateSme(tab === tabData[1].name);
          await addUpdateCrt(tab === tabData[1].name);
          await addUpdateCd(tab === tabData[1].name);

          setVendorCurrentState(getVendorCurrentStateObj({ isSaved: true }));
        },
        status: vendorData?.status?.toUpperCase(),
        disableSubmit: isViewPage || loading,
        handleCancel: () => router.push('/admin/vendor/manage-vendor')
      }}
      customStyles={['Courses', 'Orders'].includes(tab) ? { padding: '0px' } : {}}>
      <div className={`${styles.previewButtonContainer}`}>
        <Button clickHandler={async () => {}} text="View Page" />
      </div>
    </TabContainer>
  );
}
