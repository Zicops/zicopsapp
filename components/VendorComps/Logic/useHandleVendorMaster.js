import { ADD_VENDOR, UPDATE_VENDOR, userClient } from '@/api/UserMutations';
import { GET_VENDOR_DETAILS, userQueryClient } from '@/api/UserQueries';
import { VENDOR_MASTER_STATUS } from '@/helper/constants.helper';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { useRecoilState } from 'recoil';
import { VendorStateAtom } from '@/state/atoms/vendor.atoms';
import { handleCacheUpdate } from '@/helper/data.helper';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function useHandleVendorMaster() {
  const [addNewVendor] = useMutation(ADD_VENDOR, { client: userClient });
  const [updateVendor] = useMutation(UPDATE_VENDOR, { client: userClient });
  const [vendorData, setVendorData] = useRecoilState(VendorStateAtom);

  const [loading, setLoading] = useState(false);

  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);

  const router = useRouter();
  const vendorId = router.query.vendorId || '0';

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

    if (typeof vendorData?.vendorProfileImage === 'object')
      sendData.photo = vendorData?.vendorProfileImage;

    let uniqEmails = [...new Set(vendorData?.users)];
    sendData.users = uniqEmails;
    let isError = false;
    if (vendorData?.vendorId) {
      sendData.vendorId = vendorData?.vendorId;

      await updateVendor({
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
        console.log(err);
        isError = !!err;
        return setToastMsg({ type: 'danger', message: 'Update Vendor Error' });
      });
      setLoading(false);

      if (isError) return;

      if (displayToaster) setToastMsg({ type: 'success', message: 'Vendor Updated' });
      return;
    }
    if (
      vendorData?.name &&
      vendorData?.level &&
      vendorData?.type &&
      vendorData?.address &&
      vendorData?.website &&
      (vendorData?.facebookURL ||
        vendorData?.instagramURL ||
        vendorData?.twitterURL ||
        vendorData?.linkedinURL)
    ) {
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
      if (isError) return;

      setToastMsg({ type: 'success', message: 'Added vendor successfully' });
      const _id = res.data.addVendor.vendorId;
      router.push(`/admin/vendor/manage-vendor/update-vendor/${_id}`);
      return res;
    }
  }

  return { addUpdateVendor, loading };
}
