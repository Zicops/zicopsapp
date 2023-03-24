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
  const shallowRoute = router.query?.shallowRoute || null;
  const isViewPage = router.asPath?.includes('view-vendor');

  // reset to default on load
  // NOTE: on load is saved is false which should ideally be false only if something is changed
  useEffect(() => {
    if (shallowRoute) return;

    setVendorCurrentState(getVendorCurrentStateObj());
  }, []);

  useEffect(() => {
    if (shallowRoute) return;
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

  useEffect(() => {
    if (vendorCurrentState?.isSaved || isViewPage) {
      window.removeEventListener('beforeunload', beforeUnloadHandler);
      router.events.off('routeChangeStart', beforeRouteHandler);
      return;
    }

    const confirmationMessage = 'Changes you made may not be saved. Do you still wish to exit?';
    function beforeUnloadHandler(e) {
      (e || window.event).returnValue = confirmationMessage;

      // setShowConfirmBox(1);
      return confirmationMessage; // Gecko + Webkit, Safari, Chrome etc.
    }

    function beforeRouteHandler(url) {
      // console.log(url);
      // return false;
      if (router.pathname !== url && !confirm(confirmationMessage)) {
        // setShowConfirmBox(1);
        router.push(`${router.asPath}?shallowRoute=true`, router.asPath, { shallow: true });
        router.events.emit('routeChangeError');

        // if (showConfirmBox !== 2)
        throw `Route change to "${url}" was aborted (this error can be safely ignored). See https://github.com/zeit/next.js/issues/2476.`;
      }
    }

    window.addEventListener('beforeunload', beforeUnloadHandler);
    router.events.on('routeChangeStart', beforeRouteHandler);

    return () => {
      window.removeEventListener('beforeunload', beforeUnloadHandler);
      router.events.off('routeChangeStart', beforeRouteHandler);
    };
  }, [vendorCurrentState?.isSaved]);

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
          setVendorCurrentState({ ...vendorCurrentState, isUpdating: true });
          addUpdateVendor(tab === tabData[0].name).then((id) => {
            if (!id) return;

            handleMail();
          });
          addUpdateSme(tab === tabData[1].name);
          addUpdateCrt(tab === tabData[1].name);
          addUpdateCd(tab === tabData[1].name);
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
