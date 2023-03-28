import { CREATE_PROFILE_VENDOR, UPDATE_PROFILE_VENDOR, userClient } from '@/api/UserMutations';
import { GET_SINGLE_PROFILE_DETAILS, userQueryClient } from '@/api/UserQueries';
import { VENDOR_MASTER_STATUS, VENDOR_MASTER_TYPE } from '@/helper/constants.helper';
import { handleCacheUpdate } from '@/helper/data.helper';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { VendorProfileAtom, VendorStateAtom } from '@/state/atoms/vendor.atoms';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { useRecoilState, useRecoilValue } from 'recoil';

export default function useHandleVendorProfile() {
  const [createProfileVendor] = useMutation(CREATE_PROFILE_VENDOR, { client: userClient });
  const [updateProfileVendor] = useMutation(UPDATE_PROFILE_VENDOR, { client: userClient });

  const [profileData, setProfileData] = useRecoilState(VendorProfileAtom);
  const vendorData = useRecoilValue(VendorStateAtom);

  const router = useRouter();
  const vendorId = router.query.vendorId || '0';

  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);
  const isIndividualVendor =
    vendorData?.type.toLowerCase() === VENDOR_MASTER_TYPE.individual.toLowerCase();

  async function addUpdateProfile() {
    if (isIndividualVendor && !profileData?.experienceYear) {
      setToastMsg({ type: 'danger', message: 'Please Add Years of Experience!' });
      return null;
    }
    if (
      !isIndividualVendor &&
      (!profileData?.firstName ||
        !profileData?.lastName ||
        !profileData?.email ||
        !profileData?.experienceYear)
    ) {
      setToastMsg({
        type: 'danger',
        message: 'Please Add First Name, Last Name, Email and Years of Experience!'
      });
      return null;
    }

    const sendData = {
      vendor_id: vendorId || '',
      first_name: profileData?.firstName?.trim() || '',
      last_name: profileData?.lastName?.trim() || '',
      email: profileData?.email?.trim() || '',
      phone: profileData?.contactNumber.trim() || '',
      photo: profileData?.profileImage || null,
      description: profileData?.description.trim() || '',
      languages: profileData?.languages || [],
      SME_Expertise: profileData?.sme_expertises || [],
      Classroom_Expertise: profileData?.crt_expertises || [],
      content_development: profileData?.content_development || [],
      // experience:
      //   profileData?.experience?.map((exp) =>
      //     typeof exp === 'string' ? exp : exp?.title + '@' + exp?.company_name
      //   ) || [],
      experience: [],
      experienceYear: profileData?.experienceYear,
      is_speaker: profileData?.isSpeaker || false,
      status: VENDOR_MASTER_STATUS.active
    };
    if (typeof sendData?.photo === 'string') sendData.photo = null;
    let isError = false;
    if (profileData?.profileId) {
      sendData.profileId = profileData?.profileId;
      const res = await updateProfileVendor({
        variables: sendData,
        update: (_, { data }) => {
          handleCacheUpdate(
            GET_SINGLE_PROFILE_DETAILS,
            { vendor_id: vendorId, email: profileData?.email },
            (cachedData) => {
              const _cachedData = structuredClone(cachedData?.viewProfileVendorDetails);
              const _updatedCache = _cachedData?.map((vendor) => {
                const isCurrentVendorProfile =
                  vendor?.profileId === data?.updateProfileVendor?.profileId;
                if (isCurrentVendorProfile) return { ...vendor, ...data?.updateProfileVendor };
                return vendor;
              });
              return { viewProfileVendorDetails: _updatedCache };
            },
            userQueryClient
          );
        }
      }).catch((err) => {
        console.log(err);
        isError = !!err;
        return setToastMsg({ type: 'danger', message: 'Update Vendor Profile Error' });
      });
      if (isError) return null;
      setToastMsg({ type: 'success', message: 'Vendor Profile Updated' });
      return res;
    }
    if (
      profileData?.firstName &&
      profileData?.lastName &&
      profileData?.email &&
      profileData?.experienceYear
    ) {
      const res = await createProfileVendor({
        variables: sendData,
        update: (_, { data }) => {
          handleCacheUpdate(
            GET_SINGLE_PROFILE_DETAILS,
            { vendor_id: vendorId, email: profileData?.email },
            (cachedData) => {
              const _cachedData = structuredClone(cachedData?.viewProfileVendorDetails);
              const _updatedCache = data?.createProfileVendor?.[0]
                ? [data?.createProfileVendor?.[0], ..._cachedData]
                : _cachedData;
              return { viewProfileVendorDetails: _updatedCache };
            },
            userQueryClient
          );
        }
      }).catch((err) => {
        console.log(err);
        isError = !!err;
        return setToastMsg({ type: 'danger', message: 'Add Vendor profile Error' });
      });
      if (isError) return null;
      setToastMsg({ type: 'success', message: 'Vendor Profile Created' });
      return res;
    }
  }
  return { addUpdateProfile };
}
