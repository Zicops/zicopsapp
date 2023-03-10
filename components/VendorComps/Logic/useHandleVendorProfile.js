import { VENDOR_MASTER_STATUS } from '@/helper/constants.helper';
import { handleCacheUpdate } from '@/helper/data.helper';
import { userQueryClient } from '@/api/UserQueries';
import { CREATE_PROFILE_VENDOR, UPDATE_PROFILE_VENDOR, userClient } from '@/api/UserMutations';
import { useRecoilState } from 'recoil';
import { VendorProfileAtom } from '@/state/atoms/vendor.atoms';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';

export default function useHandleVendorProfile() {
  const [createProfileVendor] = useMutation(CREATE_PROFILE_VENDOR, { client: userClient });
  const [updateProfileVendor] = useMutation(UPDATE_PROFILE_VENDOR, { client: userClient });

  const [profileData, setProfileData] = useRecoilState(VendorProfileAtom);

  const router = useRouter();
  const vendorId = router.query.vendorId || '0';

  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);

  async function addUpdateProfile() {
    const sendData = {
      vendor_id: vendorId || '',
      first_name: profileData?.firstName?.trim() || '',
      last_name: profileData?.lastName?.trim() || '',
      email: profileData?.email?.trim() || '',
      phone: profileData?.contactNumber.trim() || '',
      photo: profileData?.profileImage || null,
      description: profileData?.description.trim() || '',
      languages: profileData?.languages || [],
      SME_expertise: profileData?.sme_expertises || [],
      Classroom_expertise: profileData?.crt_expertises || [],
      content_development: profileData?.content_development || [],
      experience:
        profileData?.experience?.map((exp) =>
          typeof exp === 'string' ? exp : exp?.title + '@' + exp?.company_name
        ) || [],
      experienceYear: profileData?.experienceYear,
      is_speaker: profileData?.isSpeaker || false,
      status: VENDOR_MASTER_STATUS.active,
      sme: true,
      crt: false,
      cd: false
    };
    if (typeof sendData?.photo === 'string') sendData.photo = null;

    let isError = false;

    if (profileData?.profileId) {
      sendData.profileId = profileData?.profileId;

      await updateProfileVendor({
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

      if (isError) return;
      setToastMsg({ type: 'success', message: 'Vendor Profile Updated' });
      return;
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
        return setToastMsg({ type: 'danger', message: 'Add profile Error' });
      });
      if (isError) return;
      setToastMsg({ type: 'success', message: 'Vendor Profile Created' });
      return res;
    }
  }

  return { addUpdateProfile };
}
