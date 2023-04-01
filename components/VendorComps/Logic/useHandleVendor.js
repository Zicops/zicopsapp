import { ADD_USER_TAGS, notificationClient } from '@/api/NotificationClient';
import { GET_MY_COURSES, queryClient } from '@/api/Queries';
import {
  ADD_VENDOR_USER_MAP,
  CREATE_EXPERIENCE_VENDOR,
  CREATE_PROFILE_VENDOR,
  CREATE_SAMPLE_FILE,
  DELETE_SAMPLE_FILE,
  DISABLE_VENDOR_LSP_MAP,
  INVITE_USERS_WITH_ROLE,
  UPDATE_EXPERIENCE_VENDOR,
  UPDATE_PROFILE_VENDOR,
  UPDATE_USER_LEARNINGSPACE_MAP,
  UPDATE_VENDOR,
  UPDATE_VENDOR_USER_MAP,
  userClient
} from '@/api/UserMutations';
import {
  GET_ALL_PROFILE_DETAILS,
  GET_CD_DETAILS,
  GET_CRT_DETAILS,
  GET_SAMPLE_FILES,
  GET_SINGLE_EXPERIENCE_DETAILS,
  GET_SINGLE_PROFILE_DETAILS,
  GET_SME_DETAILS,
  GET_USER_LEARNINGSPACES,
  GET_USER_LSP_ROLES,
  GET_USER_VENDORS,
  GET_VENDORS_BY_LSP_FOR_TABLE,
  GET_VENDOR_ADMINS,
  GET_VENDOR_DETAILS,
  GET_VENDOR_EXPERIENCES,
  userQueryClient
} from '@/api/UserQueries';
import { loadQueryDataAsync } from '@/helper/api.helper';
import {
  COURSE_STATUS,
  CUSTOM_ERROR_MESSAGE,
  USER_LSP_ROLE,
  USER_MAP_STATUS,
  USER_TYPE,
  VENDOR_MASTER_STATUS,
  VENDOR_MASTER_TYPE
} from '@/helper/constants.helper';
import { handleCacheUpdate, sortArrByKeyInOrder } from '@/helper/data.helper';
import { getUnixFromDate } from '@/helper/utils.helper';
import { CourseTypeAtom } from '@/state/atoms/module.atoms';
import { FcmTokenAtom } from '@/state/atoms/notification.atom';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { UsersOrganizationAtom, UserStateAtom } from '@/state/atoms/users.atom';
import {
  allProfileAtom,
  CdServicesAtom,
  CtServicesAtom,
  getCDServicesObject,
  getCTServicesObject,
  getExperiencesObject,
  getProfileObject,
  getSMEServicesObject,
  getVendorObject,
  IsVendorAdminLoadingAtom,
  SampleAtom,
  SmeServicesAtom,
  VendorAdminsAtom,
  VendorAllExperiencesAtom,
  VendorExperiencesAtom,
  VendorProfileAtom,
  VendorStateAtom,
  vendorUserInviteAtom
} from '@/state/atoms/vendor.atoms';
import { useMutation } from '@apollo/client';
import moment from 'moment';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

export default function useHandleVendor() {
  const [updateVendor] = useMutation(UPDATE_VENDOR, { client: userClient });
  const [createExperienceVendor] = useMutation(CREATE_EXPERIENCE_VENDOR, { client: userClient });
  const [updateExperienceVendor] = useMutation(UPDATE_EXPERIENCE_VENDOR, { client: userClient });
  const [createSampleFiles] = useMutation(CREATE_SAMPLE_FILE, { client: userClient });
  const [deleteFile] = useMutation(DELETE_SAMPLE_FILE, { client: userClient });
  const [disableVendorLspMap] = useMutation(DISABLE_VENDOR_LSP_MAP, { client: userClient });
  const [inviteUsers, { data }] = useMutation(INVITE_USERS_WITH_ROLE, {
    client: userClient
  });
  const [createProfileVendor] = useMutation(CREATE_PROFILE_VENDOR, { client: userClient });
  const [updateProfileVendor] = useMutation(UPDATE_PROFILE_VENDOR, { client: userClient });
  const [addUserTags] = useMutation(ADD_USER_TAGS, { client: notificationClient });
  const [updateUserLspMap] = useMutation(UPDATE_USER_LEARNINGSPACE_MAP, { client: userClient });
  const [addVendorUserMap] = useMutation(ADD_VENDOR_USER_MAP, { client: userClient });
  const [updateVendorUserMap] = useMutation(UPDATE_VENDOR_USER_MAP, { client: userClient });

  const fcmToken = useRecoilValue(FcmTokenAtom);

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
  const [vendorAdminUsers, setVendorAdminUsers] = useRecoilState(VendorAdminsAtom);
  const [isVendorAdminLoading, setIsVendorAdminLoading] = useRecoilState(IsVendorAdminLoadingAtom);

  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);
  const [vendorDetails, setVendorDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [vendorCourses, setVendorCourses] = useState([[...Array(skeletonCardCount)]]);

  const router = useRouter();
  const vendorId = router.query.vendorId || null;
  const time = getUnixFromDate();

  const isIndividual =
    vendorData?.type.toLowerCase() === VENDOR_MASTER_TYPE.individual.toLowerCase();

  async function handleMail(id) {
    if (emailId.length === 0)
      return setToastMsg({ type: 'warning', message: 'Add at least one email!' });
    let emails = emailId?.map((item) => item?.props?.children[0])?.filter((e) => !!e);

    //for removing duplicate email ids
    emails = emails.filter((value, index) => emails.indexOf(value) === index);

    if (!emails?.length) return;

    // send lowercase email only.
    let sendEmails = emails?.map((email) => email?.toLowerCase());
    let isError = false;
    let errorMsg;

    const resEmail = await inviteUsers({
      variables: { emails: sendEmails, lsp_id: userOrgData?.lsp_id, role: USER_LSP_ROLE?.vendor }
    })
      .then(async (res) => {
        if (!res?.data?.inviteUsersWithRole) return;

        const invitedUsers = res?.data?.inviteUsersWithRole;
        for (let i = 0; i < invitedUsers.length; i++) {
          const userData = invitedUsers[i];
          if (!userData?.user_id) continue;

          await addVendorUserMap({
            variables: {
              vendorId: vendorId || id,
              userId: userData?.user_id,
              status: USER_MAP_STATUS.activate
            }
          }).catch((err) => console.log(err));
        }

        return res;
      })
      .catch((err) => {
        console.log('error', err);
        errorMsg = err.message;

        isError = !!err;
      });

    if (isError) return setToastMsg({ type: 'danger', message: 'Invite User Failed' });
    // if (isError) {
    //   // const message = JSON.parse(errorMsg?.split('body:')[1]);
    //   if (message?.error?.message === CUSTOM_ERROR_MESSAGE?.emailError)
    //     return setToastMsg({ type: 'danger', message: `Email already exists!` });
    //   return setToastMsg({ type: 'danger', message: `Error while sending mail!` });
    // }

    // if (isError) return setToastMsg({ type: 'danger', message: `Error while sending mail!` });
    // console.log(resEmail);

    const resEmails = resEmail?.data?.inviteUsersWithRole;
    let userLspMaps = [];

    let existingEmails = [];

    resEmails?.forEach((user) => {
      let message = user?.message;
      if (
        message === CUSTOM_ERROR_MESSAGE?.selfInvite ||
        message === CUSTOM_ERROR_MESSAGE?.emailAlreadyExist ||
        !user?.user_id
      )
        existingEmails.push(user?.email);
      else userLspMaps.push({ user_id: user?.user_id, user_lsp_id: user?.user_lsp_id });
    });

    if (!!existingEmails?.length) {
      setToastMsg({
        type: 'info',
        message:
          'User Already exists in the learning space and cannot be mapped as vendor in this learning space.'
      });
    }
    if (userLspMaps?.length) {
      const resTags = await addUserTags({
        variables: { ids: userLspMaps, tags: [USER_TYPE?.external] },
        context: { headers: { 'fcm-token': fcmToken || sessionStorage?.getItem('fcm-token') } }
      }).catch((err) => {
        isError = true;
      });
    }

    if (isError) return setToastMsg({ type: 'danger', message: 'Error while adding tags!.' });

    if (userLspMaps?.length) setToastMsg({ type: 'success', message: `Emails send successfully!` });
    getVendorAdmins(id);
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
    const vendorList = await loadQueryDataAsync(
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

  async function getVendorAdmins(id) {
    if (!userData?.id) return;
    setIsVendorAdminLoading(true);

    // if(!userOrgData?.user_lsp_role !== USER_LSP_ROLE?.vendor) return ;
    const res = await loadQueryDataAsync(
      GET_VENDOR_ADMINS,
      { vendor_id: vendorId || id },
      {},
      userClient
    );
    const _sortedData = sortArrByKeyInOrder(res?.getVendorAdmins || [], 'updated_at', false);

    setVendorAdminUsers(_sortedData);
    setIsVendorAdminLoading(false);
  }

  async function getSingleVendorInfo() {
    if (!vendorId) return;

    const vendorInfo = await loadQueryDataAsync(
      GET_VENDOR_DETAILS,
      { vendor_id: vendorId },
      {},
      userQueryClient
    );
    const singleData = {
      ...vendorInfo?.getVendorDetails,
      lspId: vendorInfo?.getVendorDetails?.lsp_id,
      facebookURL: vendorInfo?.getVendorDetails?.facebook_url,
      instagramURL: vendorInfo?.getVendorDetails?.instagram_url,
      twitterURL: vendorInfo?.getVendorDetails?.twitter_url,
      linkedinURL: vendorInfo?.getVendorDetails?.linkedin_url,
      photoUrl: vendorInfo?.getVendorDetails?.photo_url
    };
    setVendorData(getVendorObject(singleData));

    // setEmailId(vendorInfo?.getVendorDetails?.users || []);
    return singleData;
  }

  async function getAllProfileInfo() {
    if (isIndividual) return;

    setLoading(true);
    const profileInfo = await loadQueryDataAsync(
      GET_ALL_PROFILE_DETAILS,
      { vendor_id: vendorId },
      {},
      userQueryClient
    );
    let sanetizeProfiles = profileInfo?.viewAllProfiles?.map((data) => {
      let experience = data?.experience?.length ? data?.experience : [];
      return { ...data, experience: experience, vendorId: data?.vendor_id };
    });

    setProfileDetails(sanetizeProfiles);
    setLoading(false);
  }

  async function getSingleProfileInfo(email) {
    if (!email) return;

    setLoading(true);
    const profileInfo = await loadQueryDataAsync(
      GET_SINGLE_PROFILE_DETAILS,
      { vendor_id: vendorId, email: email },
      {},
      userQueryClient
    );

    let profileDetails = profileInfo?.viewProfileVendorDetails || {};

    const allServiceLanguages = [
      ...new Set([...smeData?.languages, ...ctData?.languages, ...cdData?.languages])
    ];

    const individualVendorProfile = getProfileObject({
      email: vendorData?.users?.[0],
      profileId: profileDetails?.pf_id,
      description: vendorData?.description,
      languages: allServiceLanguages,
      sme_expertises: smeData?.expertises,
      crt_expertises: ctData?.expertises,
      content_development: cdData?.expertises,
      languages: allServiceLanguages,
      firstName: profileDetails?.first_name,
      lastName: profileDetails?.last_name,
      contactNumber: profileDetails?.phone,
      photoUrl: profileDetails?.photo_url,
      experienceYear: profileDetails?.experience_years,
      languages: profileDetails?.language,
      isSpeaker: profileDetails?.is_speaker,
      vendorId: profileDetails?.vendor_id
    });

    const experienceRes = await getProfileExperience(profileDetails?.pf_id);

    profileDetails = {
      ...(profileDetails || {}),
      ...individualVendorProfile,
      experienceData: experienceRes?.map((exp) => {
        const startDate = moment(exp?.StartDate * 1000);
        const endDate = moment(exp?.EndDate * 1000);
        const isCurrentlyWorking = +exp?.EndDate === 0;

        return getExperiencesObject({
          expId: exp?.ExpId,
          pfId: exp?.PfId,
          title: exp?.Title,
          companyName: exp?.CompanyName,
          location: exp?.Location,
          isWorking: isCurrentlyWorking,
          employeeType: exp?.EmployementType,
          locationType: exp?.LocationType,
          startMonth: startDate?.format('MMMM'),
          startYear: startDate?.format('YYYY'),
          endMonth: isCurrentlyWorking ? null : endDate?.format('MMMM'),
          endYear: isCurrentlyWorking ? null : endDate?.format('YYYY')
        });
      })
    };

    setProfileData(getProfileObject(profileDetails));
    setLoading(false);
  }

  async function getProfileExperience(pfId) {
    if (!vendorId || !pfId) return [];

    const experienceInfo = await loadQueryDataAsync(
      GET_VENDOR_EXPERIENCES,
      { vendor_id: vendorId, pf_id: pfId },
      {},
      userQueryClient
    );

    // setProfileData((prev) => ({ ...prev, experience: experienceInfo }));
    // setProfileExperience(experienceInfo.getVendorExperience);
    return experienceInfo.getVendorExperience || [];
  }

  async function getSingleExperience(pfId, expId) {
    if (!vendorId || !pfId || !expId) return;

    const experienceInfo = await loadQueryDataAsync(
      GET_SINGLE_EXPERIENCE_DETAILS,
      { vendor_id: vendorId, pf_id: pfId, exp_id: expId },
      {},
      userQueryClient
    );

    setExperiencesData(experienceInfo);
  }

  async function getSampleFiles(p_type = 'sme') {
    const fileInfo = await loadQueryDataAsync(
      GET_SAMPLE_FILES,
      { vendor_id: vendorId, p_type },
      {},
      userQueryClient
    );
    return fileInfo?.getSampleFiles;
  }

  // delete below function later
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

    const fileInfo = await loadQueryDataAsync(
      GET_SME_DETAILS,
      { vendor_id: vendorId },
      {},
      userQueryClient
    );
    const smeData = fileInfo?.getSmeDetails;
    const smeDetails = {
      sme_id: smeData?.sme_id,
      isApplicable: smeData?.is_applicable,
      serviceDescription: smeData?.description,
      languages: smeData?.languages,
      formats: smeData?.output_deliveries,
      sampleFiles: smeData?.sample_files,
      expertises: smeData?.expertise
    };
    setSMEData(getSMEServicesObject(smeDetails));
    return smeDetails;
  }

  async function getCrtDetails() {
    if (!vendorId) return;

    const fileInfo = await loadQueryDataAsync(
      GET_CRT_DETAILS,
      { vendor_id: vendorId },
      {},
      userQueryClient
    );
    const crtData = fileInfo?.getClassRoomTraining;
    const crtDetails = {
      crt_id: crtData?.crt_id,
      isApplicable: crtData?.is_applicable,
      serviceDescription: crtData?.description,
      languages: crtData?.languages,
      formats: crtData?.output_deliveries,
      sampleFiles: crtData?.sample_files,
      expertises: crtData?.expertise
    };
    setCTData(getCTServicesObject(crtDetails));
    return crtDetails;
  }

  async function getCdDetails() {
    if (!vendorId) return;

    const fileInfo = await loadQueryDataAsync(
      GET_CD_DETAILS,
      { vendor_id: vendorId },
      {},
      userQueryClient
    );
    const cdData = fileInfo?.getContentDevelopment;
    const cdDetails = {
      cd_id: cdData?.cd_id,
      isApplicable: cdData?.is_applicable,
      serviceDescription: cdData?.description,
      languages: cdData?.languages,
      formats: cdData?.output_deliveries,
      sampleFiles: cdData?.sample_files,
      expertises: cdData?.expertise
    };
    setCDData(getCDServicesObject(cdDetails));
    return cdDetails;
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

  // for individual vendor
  async function syncIndividualVendorProfile(_vendorId = null, displaySuccessToaster = false) {
    if (!isIndividual) return null;
    if (!(vendorId || _vendorId)) return null;
    if (!profileData?.email) return null;

    const experienceRes = await addUpdateExperience(displaySuccessToaster);

    const experienceData = experienceRes?.map((exp) => {
      const startDate = moment(exp?.StartDate * 1000);
      const endDate = moment(exp?.EndDate * 1000);
      const isCurrentlyWorking = +exp?.EndDate === 0;

      return getExperiencesObject({
        expId: exp?.ExpId,
        pfId: exp?.PfId,
        title: exp?.Title,
        companyName: exp?.CompanyName,
        location: exp?.Location,
        isWorking: isCurrentlyWorking,
        employeeType: exp?.EmployementType,
        locationType: exp?.LocationType,
        startMonth: startDate?.format('MMMM'),
        startYear: startDate?.format('YYYY'),
        endMonth: isCurrentlyWorking ? null : endDate?.format('MMMM'),
        endYear: isCurrentlyWorking ? null : endDate?.format('YYYY')
      });
    });

    const sendData = {
      vendor_id: vendorId || _vendorId,
      first_name: profileData?.firstName?.trim() || '',
      last_name: profileData?.lastName?.trim() || '',
      email: profileData?.email?.trim() || '',
      phone: profileData?.contactNumber.trim() || '',
      photo: profileData?.profileImage || null,
      description: profileData?.description.trim() || '',
      languages: profileData?.languages || [],
      SME_Expertise: profileData?.sme_expertises || [],
      Classroom_expertise: profileData?.crt_expertises || [],
      content_development: profileData?.content_development || [],
      experience: [],
      experienceYear: profileData?.experienceYear || '',
      is_speaker: profileData?.isSpeaker || false,
      status: VENDOR_MASTER_STATUS.active
    };
    if (
      !sendData?.SME_Expertise?.length &&
      !sendData?.Classroom_expertise?.length &&
      !sendData?.content_development?.length
    ) {
      sendData.is_speaker = false;
    }
    if (typeof sendData?.photo === 'string') sendData.photo = null;
    if (profileData?.profileId) {
      sendData.profileId = profileData?.profileId;
      await updateProfileVendor({ variables: sendData })
        .then((response) => {
          const res = response?.data?.updateProfileVendor || {};

          const resData = {
            vendorId: res?.vendor_id || '',
            profileId: res?.pf_id || '',
            firstName: res?.first_name || '',
            lastName: res?.last_name || '',
            email: res?.email || '',
            contactNumber: res?.phone || '',
            description: res?.description || '',
            photoUrl: res?.photo_url || '',
            experienceYears: res?.experience_years || '',
            languages: res?.language || '',
            sme_expertises: res?.sme_expertise || '',
            crt_expertises: res?.classroom_expertise || '',
            content_development: res?.content_development || '',
            experience: res?.experience || '',
            isSpeaker: res?.is_speaker || '',
            sme: res?.sme || '',
            crt: res?.crt || '',
            cd: res?.cd || ''
          };

          if (!!displaySuccessToaster)
            setToastMsg({ type: 'success', message: 'Vendor Profile Updated' });
          setProfileData(getProfileObject({ ...profileData, ...resData, experienceData }));
        })
        .catch((err) => console.log(err));

      return;
    }

    await createProfileVendor({ variables: sendData })
      .then((response) => {
        const res = response?.data?.createProfileVendor || {};

        const resData = {
          vendorId: res?.vendor_id || '',
          profileId: res?.pf_id || '',
          firstName: res?.first_name || '',
          lastName: res?.last_name || '',
          email: res?.email || '',
          contactNumber: res?.phone || '',
          description: res?.description || '',
          photoUrl: res?.photo_url || '',
          experienceYears: res?.experience_years || '',
          languages: res?.language || '',
          sme_expertises: res?.sme_expertise || '',
          crt_expertises: res?.classroom_expertise || '',
          content_development: res?.content_development || '',
          experience: res?.experience || '',
          isSpeaker: res?.is_speaker || '',
          sme: res?.sme || '',
          crt: res?.crt || '',
          cd: res?.cd || ''
        };

        if (!!displaySuccessToaster)
          setToastMsg({ type: 'success', message: 'Vendor Profile Created' });
        setProfileData(getProfileObject({ ...profileData, ...resData, experienceData }));
      })
      .catch((err) => console.log(err));
  }

  async function handleRemoveUser(email) {
    const vendorAdmin = vendorAdminUsers?.find((user) => user?.email === email);
    // for local delete (email is just added and user is try to remove)
    if (!vendorAdmin?.id) return true;

    // load user's all lsp
    const userLspDataRes = await loadQueryDataAsync(
      GET_USER_LEARNINGSPACES,
      { user_id: vendorAdmin?.id },
      {},
      userQueryClient
    );

    const userLspData = userLspDataRes?.getUserLsps || [];
    const userLspIds = userLspData?.map((lspData) => lspData?.user_lsp_id);
    if (!userLspIds?.length) {
      setToastMsg({ type: 'danger', message: 'Something went wrong!' });
      return null;
    }

    // load user roles
    const userLspRolesRes = await loadQueryDataAsync(
      GET_USER_LSP_ROLES,
      { user_id: vendorAdmin?.id, user_lsp_ids: userLspIds },
      {},
      userQueryClient
    );

    // map user lsp data and role
    const userDataArr = userLspData
      ?.map((lspData) => {
        const _data = structuredClone(lspData);
        // find active vendor role
        const activeVendorRole = userLspRolesRes?.getUserLspRoles?.find(
          (roleData) => roleData?.is_active && roleData?.role === USER_LSP_ROLE.vendor
        );

        if (!activeVendorRole?.user_role_id) return null;

        return _data;
      })
      ?.filter((data) => !!data);

    let isError = false;

    const currentLsp = sessionStorage?.getItem('lsp_id');
    // vendor admin is removed from other lsp than vendor creation lsp,
    // then disable user lsp map for that particular lsp
    if (currentLsp !== vendorData?.lspId) {
      const userData = userDataArr?.find((data) => data?.lsp_id === currentLsp);
      if (!userData?.lsp_id)
        return setToastMsg({ type: 'danger', message: 'User Lsp Data Not Found' });

      await updateUserLspMap({
        variables: {
          user_lsp_id: userData?.user_lsp_id,
          user_id: vendorAdmin?.id,
          lsp_id: userData?.lsp_id,
          status: USER_MAP_STATUS.disable
        }
      })
        .then((res) => {
          if (!res?.data?.updateUserLspMap)
            return setToastMsg({ type: 'danger', message: 'User Lsp Map Update Error' });

          setToastMsg({ type: 'success', message: 'User Removed Successfully From Lsp' });
        })
        .catch(() => {
          isError = true;
          setToastMsg({ type: 'danger', message: 'User Lsp Map Update Error' });
        });
      return;
    }

    // vendor admin is removed from vendor and all lsps that user is mapped
    // if the current lsp is vendor creation lsp
    for (let i = 0; i < userDataArr.length; i++) {
      const userData = userDataArr[i];

      await updateUserLspMap({
        variables: {
          user_lsp_id: userData?.user_lsp_id,
          user_id: vendorAdmin?.id,
          lsp_id: userData?.lsp_id,
          status: USER_MAP_STATUS.disable
        }
      }).catch(() => {
        isError = true;
        setToastMsg({ type: 'danger', message: 'User Lsp Map Update Error' });
      });
    }

    await updateVendorUserMap({
      variables: { vendorId, userId: vendorAdmin?.id, status: USER_MAP_STATUS.disable }
    }).catch(() => {
      isError = true;
      setToastMsg({ type: 'danger', message: 'Vendor User Map Update Error' });
    });

    if (isError) {
      setToastMsg({ type: 'success', message: 'User Removed Successfully From Vendor' });
      return true;
    }

    return null;
  }

  async function addUpdateExperience(displaySuccessToaster = false) {
    let isError = false;
    const experienceData = [];
    for (let i = 0; i < profileData?.experienceData?.length; i++) {
      const exp = profileData?.experienceData?.[i];
      const isWorking = exp?.isWorking;
      const startDate = exp?.startMonth?.concat('-', exp?.startYear);
      const start_date = new Date(startDate);
      const start_timestamp = start_date.getTime() / 1000;

      const endDate = exp?.endMonth?.concat('-', exp?.endYear);
      const end_date = new Date(endDate);
      const end_timestamp = end_date.getTime() / 1000;

      let sendData = {
        vendorId: vendorId || '',
        title: exp?.title?.trim() || '',
        email: profileData?.email?.trim() || '',
        companyName: exp?.companyName?.trim() || '',
        employeeType: exp?.employeeType?.trim() || '',
        location: exp?.location?.trim() || '',
        locationType: exp?.locationType?.trim() || '',
        startDate: start_timestamp || null,
        endDate: isWorking ? 0 : end_timestamp || null,
        status: exp?.status
      };

      if (exp?.expId) {
        sendData.expId = exp?.expId;

        const res = await updateExperienceVendor({ variables: sendData }).catch((err) => {
          console.log(err);
          isError = !!err;
          return setToastMsg({ type: 'danger', message: 'Update Experience Error' });
        });

        if (isError) continue;
        if (!!displaySuccessToaster)
          setToastMsg({ type: 'success', message: 'Experience Updated' });
        experienceData.push(res?.data?.updateExperienceVendor);
        continue;
      }

      if (profileData?.email && exp?.title && exp?.companyName) {
        const res = await createExperienceVendor({ variables: sendData }).catch((err) => {
          console.log(err);
          isError = !!err;
          return setToastMsg({ type: 'danger', message: 'Add Experience Error' });
        });
        if (isError) continue;
        if (!!displaySuccessToaster)
          setToastMsg({ type: 'success', message: 'Experience Created' });

        experienceData.push(res?.data?.createExperienceVendor);
        continue;
      }
    }

    return experienceData;
  }

  async function addSampleFile(ptype) {
    const allSampleFiles = {
      sme: smeData?.sampleFiles,
      crt: ctData?.sampleFiles,
      cd: cdData?.sampleFiles
    };
    // duplicate name check
    if (
      allSampleFiles?.[ptype]?.find(
        (smFile) =>
          smFile?.name?.toLowerCase()?.trim() === sampleData?.sampleName?.toLowerCase()?.trim()
      )
    ) {
      setToastMsg({
        type: 'danger',
        message: 'Sample File With same name already exist in this service'
      });
      return null;
    }

    if (
      !sampleData?.sampleName ||
      !sampleData?.description ||
      !sampleData?.sampleFile ||
      !sampleData?.fileType ||
      !sampleData?.rate ||
      !sampleData?.currency ||
      !sampleData?.unit
    ) {
      setToastMsg({ type: 'danger', message: 'Please fill all the fields' });
      return null;
    }

    const sendData = {
      vendorId: vendorId,
      pType: ptype,
      name: sampleData?.sampleName || '',
      description: sampleData?.description || '',
      pricing: '',
      rate: sampleData?.rate || 0,
      currency: sampleData?.currency || '',
      unit: sampleData?.unit || '',
      file: sampleData?.sampleFile || null,
      fileType: sampleData?.fileType || '',
      status: VENDOR_MASTER_STATUS.active
    };

    let isError = false;
    const res = await createSampleFiles({
      variables: sendData,
      context: {
        fetchOptions: {
          useUpload: true,
          onProgress: (ev) =>
            setSampleData({ ...sampleData, fileUploadPercent: (ev.loaded / ev.total) * 100 })
        }
      }
    }).catch((err) => {
      console.log(err);
      isError = !!err;
      return setToastMsg({ type: 'danger', message: 'Create Sample Error' });
    });
    if (isError) return null;
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

    // disable vendor from lsp if current lsp is not vendor creation lsp
    const currentLsp = sessionStorage?.getItem('lsp_id');
    if (currentLsp !== vendorData?.lspId) {
      disableVendorLspMap({
        variables: { vendorId: vendorTableData?.vendorId, lspId: currentLsp }
      })
        .then((res) => {
          if (!res?.data?.disableVendorLspMap)
            return setToastMsg({ type: 'danger', message: 'Vendor Disabled Failed' });

          onSuccess();

          setToastMsg({ type: 'success', message: 'Vendor Disabled From Lsp' });
        })
        .catch((err) => setToastMsg({ type: 'danger', message: 'Disable Vendor Error' }));
      return;
    }

    // mutation for vendor creation lsp
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
    }).catch((err) => {
      console.log('Error', err);
      isError = true;
    });
    if (isError) {
      setToastMsg({ type: 'danger', message: 'Vendor Status Update Error' });
      return false;
    }

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
    getSampleFiles,
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
    syncIndividualVendorProfile,
    handleRemoveUser,
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
