import styles from '@/components/VendorComps/vendorComps.module.scss';
import { VENDOR_MASTER_TYPE } from '@/helper/constants.helper';
import { FeatureFlagsAtom } from '@/state/atoms/global.atom';
import {
  CdServicesAtom,
  CtServicesAtom,
  getProfileObject,
  getVendorCurrentStateObj,
  SmeServicesAtom,
  VendorCurrentStateAtom,
  VendorProfileAtom,
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
  const smeData = useRecoilValue(SmeServicesAtom);
  const ctData = useRecoilValue(CtServicesAtom);
  const cdData = useRecoilValue(CdServicesAtom);
  const [profileData, setProfileData] = useRecoilState(VendorProfileAtom);

  const { handleMail } = useHandleVendor();
  const { addUpdateVendor, loading, syncIndividualVendorProfile } = useHandleVendorMaster();
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
    if (!router.isReady) return;
    if (shallowRoute) return;
    if (vendorId) return;

    setVendorCurrentState(getVendorCurrentStateObj());
  }, [router.isReady]);

  useEffect(() => {
    if (shallowRoute) return;
    if (!vendorId) return setEmailId([]);

    loadVendorDetails();

    async function loadVendorDetails() {
      await getSingleVendorInfo();
      const smeData = await getSmeDetails();
      const crtData = await getCrtDetails();
      const cdData = await getCdDetails();

      const enabledServices = [];
      if (smeData?.isApplicable) enabledServices.push('sme');
      if (crtData?.isApplicable) enabledServices.push('crt');
      if (cdData?.isApplicable) enabledServices.push('cd');
      setVendorCurrentState(getVendorCurrentStateObj({ enabledServices }));

      getSMESampleFiles();
      getCRTSampleFiles();
      getCDSampleFiles();
      getAllProfileInfo();
    }
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

  // sync profile details for individual vendor
  useEffect(async () => {
    if (vendorData?.type !== VENDOR_MASTER_TYPE.individual) return;

    const allServiceLanguages = [
      ...new Set([...smeData?.languages, ...ctData?.languages, ...cdData?.languages])
    ];

    const vendorName = vendorData?.name?.split(' ');
    setProfileData(
      getProfileObject({
        ...profileData,
        firstName: vendorName?.[0] || '',
        lastName: vendorName?.[1] || '',
        email: vendorData?.users?.[0] || '',
        description: vendorData?.description,
        photoUrl: vendorData?.photoUrl,
        profileImage: vendorData?.vendorProfileImage,
        languages: allServiceLanguages,
        sme_expertises: smeData?.isApplicable ? smeData?.expertises : [],
        crt_expertises: ctData?.isApplicable ? ctData?.expertises : [],
        content_development: cdData?.isApplicable ? cdData?.expertises : []
      })
    );
  }, [vendorData, smeData, cdData, ctData]);

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
          addUpdateVendor(tab === tabData[0].name).then((id) => {
            if (!id) return;

            syncIndividualVendorProfile(id);
            handleMail();
          });
          const smeData = await addUpdateSme(tab === tabData[1].name);
          const crtData = await addUpdateCrt(tab === tabData[1].name);
          const cdData = await addUpdateCd(tab === tabData[1].name);

          const enabledServices = [];

          if (smeData?.is_applicable) enabledServices.push('sme');
          if (crtData?.is_applicable) enabledServices.push('crt');
          if (cdData?.is_applicable) enabledServices.push('cd');

          setVendorCurrentState(getVendorCurrentStateObj({ isSaved: true, enabledServices }));
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
