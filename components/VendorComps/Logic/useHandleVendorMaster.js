import {
  ADD_VENDOR,
  CREATE_PROFILE_VENDOR,
  UPDATE_PROFILE_VENDOR,
  UPDATE_VENDOR,
  userClient
} from '@/api/UserMutations';
import { GET_VENDOR_DETAILS, userQueryClient } from '@/api/UserQueries';
import { VENDOR_MASTER_STATUS, VENDOR_MASTER_TYPE } from '@/helper/constants.helper';
import { handleCacheUpdate } from '@/helper/data.helper';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { getProfileObject, VendorProfileAtom, VendorStateAtom } from '@/state/atoms/vendor.atoms';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useRecoilState } from 'recoil';

export default function useHandleVendorMaster() {
  const [addNewVendor] = useMutation(ADD_VENDOR, { client: userClient });
  const [updateVendor] = useMutation(UPDATE_VENDOR, { client: userClient });
  const [createProfileVendor] = useMutation(CREATE_PROFILE_VENDOR, { client: userClient });
  const [updateProfileVendor] = useMutation(UPDATE_PROFILE_VENDOR, { client: userClient });

  const [vendorData, setVendorData] = useRecoilState(VendorStateAtom);
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);
  const [profileData, setProfileData] = useRecoilState(VendorProfileAtom);

  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const vendorId = router.query.vendorId || null;

  const isIndividual =
    vendorData?.type.toLowerCase() === VENDOR_MASTER_TYPE.individual.toLowerCase();

  async function addUpdateVendor(displayToaster = true) {
    setLoading(true);
    const sendData = {
      name: vendorData?.name?.trim() || '',
      level: vendorData?.level?.trim() || '',
      type: vendorData?.type?.trim() || '',
      address: vendorData?.address?.trim() || '',
      website: vendorData?.website?.trim() || '',
      facebook_url: vendorData?.facebookURL?.trim() || '',
      instagram_url: vendorData?.instagramURL?.trim() || '',
      twitter_url: vendorData?.twitterURL?.trim() || '',
      linkedin_url: vendorData?.linkedinURL?.trim() || '',
      users: vendorData?.users || [],
      description: vendorData?.description?.trim() || '',
      status: VENDOR_MASTER_STATUS.active
    };

    if (vendorData?.vendorProfileImage) sendData.photo = vendorData?.vendorProfileImage;

    let uniqEmails = [...new Set(vendorData?.users)];
    sendData.users = uniqEmails;
    let isError = false;
    if (vendorData?.vendorId) {
      sendData.vendorId = vendorData?.vendorId;

      const res = await updateVendor({
        variables: sendData,
        update: (_, { data }) => {
          handleCacheUpdate(
            GET_VENDOR_DETAILS,
            { vendor_id: vendorId },
            (cachedData) => ({
              getVendorDetails: { ...cachedData?.getVendorDetails, ...data?.updateVendor }
            }),
            userQueryClient
          );
        }
      }).catch((err) => {
        console.log(err);
        isError = !!err;
        return setToastMsg({ type: 'danger', message: 'Update Vendor Error' });
      });
      setLoading(false);

      if (isError) return null;

      if (displayToaster) setToastMsg({ type: 'success', message: 'Vendor Updated' });
      const _id = res.data.updateVendor.vendorId;
      return _id;
    }
    if (vendorData?.name && vendorData?.level && vendorData?.type && vendorData?.address) {
      const res = await addNewVendor({
        variables: sendData,
        update: (_, { data }) => {
          handleCacheUpdate(
            GET_VENDOR_DETAILS,
            { vendor_id: vendorId },
            (cachedData) => {
              const _cachedData = structuredClone(cachedData?.getVendorDetails);
              const _updatedCache = data?.addVendor?.[0]
                ? [data?.addVendor?.[0], ..._cachedData]
                : _cachedData;

              return { getVendorDetails: _updatedCache };
            },
            userQueryClient
          );
        }
      }).catch((err) => {
        console.log(err);
        isError = !!err;
        return setToastMsg({ type: 'danger', message: 'Add Vendor Error' });
      });
      setLoading(false);
      if (isError) return null;

      setToastMsg({ type: 'success', message: 'Added vendor successfully' });
      const _id = res.data.addVendor.vendorId;
      router.push(`/admin/vendor/manage-vendor/update-vendor/${_id}`);
      return _id;
    }
  }

  // for individual vendor
  async function syncIndividualVendorProfile(_vendorId = null) {
    if (!isIndividual) return null;
    if (!(vendorId || _vendorId)) return null;
    if (!profileData?.email) return null;

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
    if (typeof sendData?.photo === 'string') sendData.photo = null;
    if (profileData?.profileId) {
      sendData.profileId = profileData?.profileId;
      await updateProfileVendor({ variables: sendData }).catch((err) => console.log(err));
      return;
    }

    await createProfileVendor({ variables: sendData })
      .then((response) => {
        const res = response?.data?.createProfileVendor || {};

        const resData = {
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

        setProfileData(getProfileObject(resData));
      })

      .catch((err) => console.log(err));
  }

  return { addUpdateVendor, loading, syncIndividualVendorProfile };
}
