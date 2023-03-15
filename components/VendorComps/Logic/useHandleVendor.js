import { GET_MY_COURSES, queryClient } from '@/api/Queries';
import {
  CREATE_EXPERIENCE_VENDOR,
  CREATE_SAMPLE_FILE,
  DELETE_SAMPLE_FILE,
  INVITE_USERS_WITH_ROLE,
  UPDATE_EXPERIENCE_VENDOR,
  UPDATE_VENDOR,
  userClient
} from '@/api/UserMutations';
import {
  GET_ALL_PROFILE_DETAILS,
  GET_SAMPLE_FILES,
  GET_SINGLE_EXPERIENCE_DETAILS,
  GET_SINGLE_PROFILE_DETAILS,
  GET_USER_VENDORS,
  GET_VENDORS_BY_LSP_FOR_TABLE,
  GET_VENDOR_DETAILS,
  userQueryClient,
  GET_SME_DETAILS,
  GET_CRT_DETAILS,
  GET_CD_DETAILS,
  GET_VENDOR_EXPERIENCES,
  GET_VENDOR_ADMINS
} from '@/api/UserQueries';
import { loadAndCacheDataAsync, loadQueryDataAsync } from '@/helper/api.helper';
import { COURSE_STATUS, USER_LSP_ROLE, VENDOR_MASTER_STATUS } from '@/helper/constants.helper';
import { handleCacheUpdate, sortArrByKeyInOrder } from '@/helper/data.helper';
import { getUnixFromDate } from '@/helper/utils.helper';
import { CourseTypeAtom } from '@/state/atoms/module.atoms';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { UsersOrganizationAtom, UserStateAtom } from '@/state/atoms/users.atom';
import {
  allProfileAtom,
  CdServicesAtom,
  CtServicesAtom,
  getVendorObject,
  SampleAtom,
  SmeServicesAtom,
  VendorExperiencesAtom,
  VendorProfileAtom,
  VendorStateAtom,
  vendorUserInviteAtom,
  getSMEServicesObject,
  getCTServicesObject,
  getCDServicesObject,
  getProfileObject,
  VendorAllExperiencesAtom
} from '@/state/atoms/vendor.atoms';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

export default function useHandleVendor() {
  const [updateVendor] = useMutation(UPDATE_VENDOR, { client: userClient });
  const [createExperienceVendor] = useMutation(CREATE_EXPERIENCE_VENDOR, { client: userClient });
  const [updateExperienceVendor] = useMutation(UPDATE_EXPERIENCE_VENDOR, { client: userClient });
  const [createSampleFiles] = useMutation(CREATE_SAMPLE_FILE, { client: userClient });
  const [deleteFile] = useMutation(DELETE_SAMPLE_FILE, { client: userClient });
  const [inviteUsers, { data }] = useMutation(INVITE_USERS_WITH_ROLE, {
    client: userClient
  });

  const skeletonCardCount = 6;
  const [vendorData, setVendorData] = useRecoilState(VendorStateAtom);
  const [profileData, setProfileData] = useRecoilState(VendorProfileAtom);
  const [sampleData, setSampleData] = useRecoilState(SampleAtom);
  const [profileDetails, setProfileDetails] = useRecoilState(allProfileAtom);
  const [smeData, setSMEData] = useRecoilState(SmeServicesAtom);
  const [ctData, setCTData] = useRecoilState(CtServicesAtom);
  const [cdData, setCDData] = useRecoilState(CdServicesAtom);
  const [userOrgData, setUserOrgData] = useRecoilState(UsersOrganizationAtom);
  const [userData, setUserData] = useRecoilState(UserStateAtom);
  const [emailId, setEmailId] = useRecoilState(vendorUserInviteAtom);
  const [experiencesData, setExperiencesData] = useRecoilState(VendorExperiencesAtom);
  const [profileExperience, setProfileExperience] = useRecoilState(VendorAllExperiencesAtom);
  const courseType = useRecoilValue(CourseTypeAtom);

  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);
  const [vendorDetails, setVendorDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [vendorAdminUsers, setVendorAdminUsers] = useState([]);
  const [vendorCourses, setVendorCourses] = useState([[...Array(skeletonCardCount)]]);

  const router = useRouter();
  const vendorId = router.query.vendorId || null;
  const time = getUnixFromDate();

  async function handleMail() {
    // if (loading) return;
    if (emailId.length === 0)
      return setToastMsg({ type: 'warning', message: 'Add at least one email!' });
    let emails = emailId?.map((item) => item?.props?.children[0]);
    // console.log(emails, emailId);
    //for removing duplicate email ids
    emails = emails.filter((value, index) => emails.indexOf(value) === index);
    // console.log(emails);

    // send lowercase email only.
    let sendEmails = emails?.map((email) => email?.toLowerCase());
    let isError = false;
    let errorMsg;

    const resEmail = await inviteUsers({
      variables: { emails: sendEmails, lsp_id: userOrgData?.lsp_id, role: USER_LSP_ROLE?.vendor }
    }).catch((err) => {
      console.log('error', err);
      errorMsg = err.message;

      isError = !!err;
    });

    if (isError) return setToastMsg({ type: 'danger', message: isError });
    // if (isError) {
    //   // const message = JSON.parse(errorMsg?.split('body:')[1]);
    //   if (message?.error?.message === CUSTOM_ERROR_MESSAGE?.emailError)
    //     return setToastMsg({ type: 'danger', message: `Email already exists!` });
    //   return setToastMsg({ type: 'danger', message: `Error while sending mail!` });
    // }

    // if (isError) return setToastMsg({ type: 'danger', message: `Error while sending mail!` });
    // console.log(resEmail);

    setToastMsg({ type: 'success', message: `Emails send successfully!` });
  }

  function handlePhotoInput(e) {
    const acceptedType = ['image/jpg', 'image/jpeg', 'image/png'];
    if (e.target.files && acceptedType.includes(e.target.files[0]?.type)) {
      setVendorData({
        ...vendorData,
        vendorProfileImage: e.target.files[0]
      });
    }
    e.target.value = '';
  }

  function handleProfilePhoto(e) {
    const acceptedType = ['image/jpg', 'image/jpeg', 'image/png'];
    if (e.target.files && acceptedType.includes(e.target.files[0]?.type)) {
      setProfileData({
        ...profileData,
        profileImage: e.target.files[0]
      });
    }
    e.target.value = '';
  }

  async function getAllVendors() {
    setLoading(true);
    const lspId = sessionStorage?.getItem('lsp_id');
    const vendorList = await loadAndCacheDataAsync(
      GET_VENDORS_BY_LSP_FOR_TABLE,
      { lsp_id: lspId },
      {},
      userQueryClient
    );

    const _sortedData = sortArrByKeyInOrder(vendorList?.getVendors || [], 'updated_at', false);

    setVendorDetails(_sortedData);
    setLoading(false);
  }

  async function getUserVendors() {
    if (!userData?.id) return;
    // if(!userOrgData?.user_lsp_role !== USER_LSP_ROLE?.vendor) return ;
    setLoading(true);
    const res = await loadQueryDataAsync(
      GET_USER_VENDORS,
      { user_id: userData?.id },
      {},
      userClient
    );
    const _sortedData = sortArrByKeyInOrder(res?.getUserVendor || [], 'updated_at', false);

    setVendorDetails(_sortedData);
    setLoading(false);
  }

  async function getVendorAdmins() {
    if (!userData?.id) return;
    // if(!userOrgData?.user_lsp_role !== USER_LSP_ROLE?.vendor) return ;
    setLoading(true);
    const res = await loadQueryDataAsync(
      GET_VENDOR_ADMINS,
      { vendor_id: vendorId },
      {},
      userClient
    );
    const _sortedData = sortArrByKeyInOrder(res?.getVendorAdmins || [], 'updated_at', false);

    setVendorAdminUsers(_sortedData);
    setLoading(false);
  }

  async function getSingleVendorInfo() {
    if (!vendorId) return;

    const vendorInfo = await loadAndCacheDataAsync(
      GET_VENDOR_DETAILS,
      { vendor_id: vendorId },
      {},
      userQueryClient
    );
    const singleData = {
      ...vendorInfo?.getVendorDetails,
      facebookURL: vendorInfo?.getVendorDetails?.facebook_url,
      instagramURL: vendorInfo?.getVendorDetails?.instagram_url,
      twitterURL: vendorInfo?.getVendorDetails?.twitter_url,
      linkedinURL: vendorInfo?.getVendorDetails?.linkedin_url,
      vendorProfileImage: vendorInfo?.getVendorDetails?.photo_url,
      vendorProfileImageUrl: vendorInfo?.getVendorDetails?.photo_url
    };
    setVendorData(getVendorObject(singleData));

    setEmailId(vendorInfo?.getVendorDetails?.users || []);
  }

  async function getAllProfileInfo() {
    setLoading(true);
    const profileInfo = await loadQueryDataAsync(
      GET_ALL_PROFILE_DETAILS,
      { vendor_id: vendorId },
      {},
      userQueryClient
    );
    const sanetizeProfiles = profileInfo?.viewAllProfiles?.map((data) => {
      let experience = data?.experience?.length ? data?.experience : [];
      return { ...data, experience: experience };
    });
    setProfileDetails(sanetizeProfiles);
    setLoading(false);
  }

  async function getSingleProfileInfo() {
    setLoading(true);
    const profileInfo = await loadQueryDataAsync(
      GET_SINGLE_PROFILE_DETAILS,
      { vendor_id: vendorId, email: profileData?.email },
      {},
      userQueryClient
    );
    setProfileData(getProfileObject(profileInfo));
    setLoading(false);
  }

  async function getProfileExperience(pfId) {
    const experienceInfo = await loadQueryDataAsync(
      GET_VENDOR_EXPERIENCES,
      { vendor_id: vendorId, pf_id: pfId },
      {},
      userQueryClient
    );

    setProfileData((prev) => ({ ...prev, experience: experienceInfo }));
    setProfileExperience(experienceInfo.getVendorExperience);
  }

  async function getSingleExperience(pfId, expId) {
    const experienceInfo = await loadQueryDataAsync(
      GET_SINGLE_EXPERIENCE_DETAILS,
      { vendor_id: vendorId, pf_id: pfId, exp_id: expId },
      {},
      userQueryClient
    );

    setExperiencesData(experienceInfo);
  }

  async function getSMESampleFiles() {
    const fileInfo = await loadQueryDataAsync(
      GET_SAMPLE_FILES,
      { vendor_id: vendorId, p_type: 'sme' },
      {},
      userQueryClient
    );
    setSMEData((prev) => ({ ...prev, sampleFiles: fileInfo?.getSampleFiles }));
  }

  async function getCRTSampleFiles() {
    const fileInfo = await loadQueryDataAsync(
      GET_SAMPLE_FILES,
      { vendor_id: vendorId, p_type: 'crt' },
      {},
      userQueryClient
    );
    setCTData((prev) => ({ ...prev, sampleFiles: fileInfo?.getSampleFiles }));
  }

  async function getCDSampleFiles() {
    const fileInfo = await loadQueryDataAsync(
      GET_SAMPLE_FILES,
      { vendor_id: vendorId, p_type: 'cd' },
      {},
      userQueryClient
    );
    setCDData((prev) => ({ ...prev, sampleFiles: fileInfo?.getSampleFiles }));
  }

  async function getSmeDetails() {
    if (!vendorId) return;

    const fileInfo = await loadAndCacheDataAsync(
      GET_SME_DETAILS,
      { vendor_id: vendorId },
      {},
      userQueryClient
    );
    const smeData = fileInfo?.getSmeDetails;
    const smeDetails = {
      sme_id: smeData?.sme_id,
      isApplicableSME: smeData?.is_applicable,
      serviceDescription: smeData?.description,
      languages: smeData?.languages,
      formats: smeData?.output_deliveries,
      sampleFiles: smeData?.sample_files,
      expertises: smeData?.expertise
    };
    setSMEData(getSMEServicesObject(smeDetails));
  }

  async function getCrtDetails() {
    if (!vendorId) return;

    const fileInfo = await loadAndCacheDataAsync(
      GET_CRT_DETAILS,
      { vendor_id: vendorId },
      {},
      userQueryClient
    );
    const crtData = fileInfo?.getClassRoomTraining;
    const crtDetails = {
      crt_id: crtData?.crt_id,
      isApplicableCT: crtData?.is_applicable,
      serviceDescription: crtData?.description,
      languages: crtData?.languages,
      formats: crtData?.output_deliveries,
      sampleFiles: crtData?.sample_files,
      expertises: crtData?.expertise
    };
    setCTData(getCTServicesObject(crtDetails));
  }

  async function getCdDetails() {
    if (!vendorId) return;

    const fileInfo = await loadAndCacheDataAsync(
      GET_CD_DETAILS,
      { vendor_id: vendorId },
      {},
      userQueryClient
    );
    const cdData = fileInfo?.getContentDevelopment;
    const cdDetails = {
      cd_id: cdData?.cd_id,
      isApplicableCD: cdData?.is_applicable,
      serviceDescription: cdData?.description,
      languages: cdData?.languages,
      formats: cdData?.output_deliveries,
      sampleFiles: cdData?.sample_files,
      expertises: cdData?.expertise
    };
    setCDData(getCDServicesObject(cdDetails));
  }

  async function getVendorCourses() {
    const lspId = sessionStorage?.getItem('lsp_id');
    const courseInfo = await loadQueryDataAsync(
      GET_MY_COURSES,
      {
        publish_time: time,
        pageSize: 1000,
        pageCursor: '',
        status: COURSE_STATUS.publish,
        filters: {
          Type: courseType,
          SearchText: '',
          LspId: lspId || userOrgData?.lsp_id,
          Owner: vendorData?.name
        }
      },
      {},
      queryClient
    );
    setVendorCourses(courseInfo?.latestCourses?.courses);
  }

  async function addUpdateExperience() {
    let isError = false;
    for (let i = 0; i < profileData?.experience?.length; i++) {
      let sendData = {
        vendor_id: vendorId || '',
        title: profileData?.experience[i]?.title?.trim() || '',
        email: profileData?.email?.trim() || '',
        company_name: profileData?.experience[i]?.company_name?.trim() || '',
        employement_type: profileData?.experience[i]?.employement_type?.trim() || '',
        location: profileData?.experience[i]?.location?.trim() || '',
        location_type: profileData?.experience[i]?.locationType?.trim() || '',
        start_date: profileData?.experience[i]?.start_date || null,
        end_date: profileData?.experience[i]?.end_date || null,
        status: profileData?.experience[i]?.status
      };

      if (profileData?.experience[i]?.ExpId) {
        sendData.ExpId = profileData?.experience[i]?.ExpId;

        const res = await updateExperienceVendor({ variables: sendData }).catch((err) => {
          console.log(err);
          isError = !!err;
          return setToastMsg({ type: 'danger', message: 'Update Experience Error' });
        });

        if (isError) return;
        setToastMsg({ type: 'success', message: 'Experience Updated' });
        return res;
      }
      if (
        profileData?.email &&
        profileData?.experience[i]?.title &&
        profileData?.experience[i]?.company_name
      ) {
        const res = await createExperienceVendor({ variables: sendData }).catch((err) => {
          console.log(err);
          isError = !!err;
          return setToastMsg({ type: 'danger', message: 'Add Experience Error' });
        });
        if (isError) return;
        setToastMsg({ type: 'success', message: 'Experience Created' });
        return res;
      }
    }
    // return isError;
  }

  async function addSampleFile(ptype) {
    const sendData = {
      vendorId: vendorId,
      pType: ptype,
      name: sampleData?.sampleName || '',
      description: sampleData?.description || '',
      pricing: sampleData?.rate + sampleData?.currency + '/' + sampleData?.unit || '',
      file: sampleData?.sampleFile || null,
      fileType: sampleData?.fileType || '',
      status: VENDOR_MASTER_STATUS.active
    };

    let isError = false;

    const res = await createSampleFiles({ variables: sendData }).catch((err) => {
      console.log(err);
      isError = !!err;
      return setToastMsg({ type: 'danger', message: 'Create Sample Error' });
    });
    if (isError) return;
    setToastMsg({ type: 'success', message: 'Sample File Created' });
    return res;
  }

  async function deleteSample(sfid, pType) {
    const sendData = {
      vendor_id: vendorId,
      sfId: sfid || '',
      p_type: pType
    };

    let isError = false;

    const res = await deleteFile({ variables: sendData }).catch((err) => {
      console.log(err);
      isError = !!err;
      return setToastMsg({ type: 'danger', message: 'Delete File Error' });
    });
    if (isError) return;
    setToastMsg({ type: 'success', message: 'File Deleted' });
    return res;
  }

  async function disableVendor(vendorTableData, isEnabled, onSuccess = () => {}) {
    const sendData = {
      ...vendorTableData,
      status: isEnabled ? VENDOR_MASTER_STATUS.disable : VENDOR_MASTER_STATUS.active
    };

    let isError = false;

    const res = await updateVendor({
      variables: sendData,
      update: (_, { data }) => {
        handleCacheUpdate(
          GET_VENDOR_DETAILS,
          { vendor_id: vendorId },
          (cachedData) => {
            const _cachedData = structuredClone(cachedData?.getVendorDetails);
            const _updatedCache = _cachedData?.map((vendor) => {
              const isCurrentVendor = vendor?.vendorId === data?.updateVendor?.vendorId;
              if (isCurrentVendor) return { ...vendor, ...data?.updateVendor };

              return vendor;
            });

            return { getVendorDetails: _updatedCache };
          },
          userQueryClient
        );
      }
    }).catch((err) => console.log('Error'));
    if (isError) return;

    onSuccess();

    let msg = isEnabled ? 'Vendor Disabled' : 'Vendor Activated';
    setToastMsg({ type: 'success', message: msg });

    return res;
  }

  return {
    getSingleVendorInfo,
    handlePhotoInput,
    handleProfilePhoto,
    getCrtDetails,
    getCdDetails,
    getAllProfileInfo,
    getSingleProfileInfo,
    getSMESampleFiles,
    getCRTSampleFiles,
    getCDSampleFiles,
    getSingleExperience,
    getProfileExperience,
    getSmeDetails,
    getCrtDetails,
    getCdDetails,
    getAllVendors,
    getUserVendors,
    addUpdateExperience,
    addSampleFile,
    handleMail,
    deleteSample,
    setLoading,
    vendorDetails,
    vendorData,
    getVendorAdmins,
    vendorAdminUsers,
    disableVendor,
    getVendorCourses,
    vendorCourses
  };
}
