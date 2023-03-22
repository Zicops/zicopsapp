import styles from '@/components/VendorComps/vendorComps.module.scss';
import { FeatureFlagsAtom } from '@/state/atoms/global.atom';
import { VendorStateAtom, vendorUserInviteAtom } from '@/state/atoms/vendor.atoms';
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
        handleSubmit: () => {
          addUpdateVendor(tab === tabData[0].name).then((id) => {
            if (!id) return;

            handleMail();
          });
          addUpdateSme(tab === tabData[1].name);
          addUpdateCrt(tab === tabData[1].name);
          addUpdateCd(tab === tabData[1].name);
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
