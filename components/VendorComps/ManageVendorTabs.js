import styles from '@/components/VendorComps/vendorComps.module.scss';
import { USER_MAP_STATUS, VENDOR_MASTER_TYPE } from '@/helper/constants.helper';
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
import { vendorTabData } from './Logic/vendorComps.helper';

export default function ManageVendorTabs() {
  const vendorData = useRecoilValue(VendorStateAtom);
  const { isDev } = useRecoilValue(FeatureFlagsAtom);
  const [emailId, setEmailId] = useRecoilState(vendorUserInviteAtom);
  const [vendorCurrentState, setVendorCurrentState] = useRecoilState(VendorCurrentStateAtom);
  const smeData = useRecoilValue(SmeServicesAtom);
  const ctData = useRecoilValue(CtServicesAtom);
  const cdData = useRecoilValue(CdServicesAtom);
  const [profileData, setProfileData] = useRecoilState(VendorProfileAtom);

  const { addUpdateVendor, loading } = useHandleVendorMaster();
  const { addUpdateSme, addUpdateCrt, addUpdateCd } = useHandleVendorServices();

  const {
    vendorAdminUsers,
    getSingleVendorInfo,
    getSmeDetails,
    getCrtDetails,
    getCdDetails,
    getSMESampleFiles,
    getCRTSampleFiles,
    getCDSampleFiles,
    getAllProfileInfo,
    getSingleProfileInfo,
    getVendorAdmins,
    syncIndividualVendorProfile,
    handleMail
  } = useHandleVendor();

  const router = useRouter();
  const vendorId = router.query.vendorId || null;
  const shallowRoute = router.query?.shallowRoute || null;
  const isViewPage = router.asPath?.includes('view-vendor');

  const isIndividual =
    vendorData?.type?.toLowerCase() === VENDOR_MASTER_TYPE.individual.toLowerCase();

  // reset to default on load
  // NOTE: on load is saved is false which should ideally be false only if something is changed
  useEffect(() => {
    if (!router.isReady) return;
    if (shallowRoute) return;
    if (!vendorCurrentState?.isSaved) return;

    setVendorCurrentState(getVendorCurrentStateObj({enabledServices: vendorCurrentState?.enabledServices}));
  }, [
    router.isReady,
    vendorData?.name,
    vendorData?.address,
    vendorData?.vendorAdminUsers,
    vendorData?.website,
    vendorData?.facebookURL,
    vendorData?.instagramURL,
    vendorData?.twitterURL,
    vendorData?.linkedinURL,
    vendorData?.description,
    smeData,
    ctData,
    cdData
  ]);

  useEffect(() => {
    if (shallowRoute) return;
    if (!vendorId) return setEmailId([]);

    loadVendorDetails();

    async function loadVendorDetails() {
      const singleVendorInfo = await getSingleVendorInfo();
      const smeData = await getSmeDetails();
      const crtData = await getCrtDetails();
      const cdData = await getCdDetails();

      const enabledServices = [];
      if (smeData?.isApplicable) enabledServices.push('sme');
      if (crtData?.isApplicable) enabledServices.push('crt');
      if (cdData?.isApplicable) enabledServices.push('cd');
      setVendorCurrentState(getVendorCurrentStateObj({ enabledServices }));

      getVendorAdmins();
      getSMESampleFiles();
      getCRTSampleFiles();
      getCDSampleFiles();

      const isIndividualVendor =
        singleVendorInfo?.type?.toLowerCase() === VENDOR_MASTER_TYPE.individual.toLowerCase();
      if (!isIndividualVendor) return getAllProfileInfo();
    }
  }, [vendorId]);

  useEffect(() => {
    setEmailId(
      vendorAdminUsers
        ?.map((user) => (user?.user_lsp_status !== USER_MAP_STATUS.disable ? user?.email : null))
        ?.filter((email) => email) || []
    );

    if (isIndividual && vendorAdminUsers?.[0]?.email)
      getSingleProfileInfo(vendorAdminUsers?.[0]?.email);
  }, [vendorAdminUsers]);

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
    if (vendorData?.type?.toLowerCase() !== VENDOR_MASTER_TYPE.individual.toLowerCase()) return;

    const allServiceLanguages = [
      ...new Set([...smeData?.languages, ...ctData?.languages, ...cdData?.languages])
    ];

    let [firstName, ...lastName] = vendorData?.name?.split(' ');
    lastName = lastName.join(' ');
    setProfileData(
      getProfileObject({
        ...profileData,
        firstName: firstName || '',
        lastName: lastName || '',
        email:
          emailId?.map((item) => item?.props?.children?.[0] || item)?.filter((e) => !!e)?.[0] || '',
        description: vendorData?.description,
        photoUrl: vendorData?.photoUrl,
        profileImage: vendorData?.vendorProfileImage,
        languages: allServiceLanguages,
        sme_expertises: smeData?.isApplicable ? smeData?.expertises : [],
        crt_expertises: ctData?.isApplicable ? ctData?.expertises : [],
        content_development: cdData?.isApplicable ? cdData?.expertises : []
      })
    );
  }, [vendorData, smeData, cdData, ctData, emailId]);

  const _tabDataObj = { ...vendorTabData };
  _tabDataObj.orders.isHidden = !isDev;

  _tabDataObj.profiles.isHidden = isIndividual;
  _tabDataObj.users.isHidden = isIndividual;

  _tabDataObj.experience.isHidden = !isIndividual;

  const tabData = Object.values(_tabDataObj);

  const [tab, setTab] = useState(vendorTabData?.master?.name);

  return (
    <TabContainer
      tabData={tabData}
      tab={tab}
      setTab={setTab}
      footerObj={{
        showFooter: true,
        submitDisplay: vendorData.vendorId ? 'Update' : 'Save',
        handleSubmit: async () => {
          const _currentState = structuredClone(vendorCurrentState);
          _currentState.isUpdating = true;
          if (!vendorId) _currentState.isSaved = true;
          setVendorCurrentState(_currentState);

          addUpdateVendor(tab === tabData[0].name).then((id) => {
            if (!id) return;

            syncIndividualVendorProfile(id, tab === vendorTabData.experience.name);
            handleMail(id);
          });
          const smeData = await addUpdateSme(tab === tabData[1].name);
          const crtData = await addUpdateCrt(tab === tabData[1].name);
          const cdData = await addUpdateCd(tab === tabData[1].name);

          const enabledServices = structuredClone([...vendorCurrentState.enabledServices]);

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
