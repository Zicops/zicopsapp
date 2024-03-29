import { ADD_VENDOR, UPDATE_VENDOR, userClient } from '@/api/UserMutations';
import { GET_VENDOR_DETAILS, userQueryClient } from '@/api/UserQueries';
import { VENDOR_MASTER_STATUS } from '@/helper/constants.helper';
import { handleCacheUpdate } from '@/helper/data.helper';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { VendorStateAtom } from '@/state/atoms/vendor.atoms';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useRecoilState } from 'recoil';

export default function useHandleVendorMaster() {
  const [addNewVendor] = useMutation(ADD_VENDOR, { client: userClient });
  const [updateVendor] = useMutation(UPDATE_VENDOR, { client: userClient });

  const [vendorData, setVendorData] = useRecoilState(VendorStateAtom);
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);

  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const vendorId = router.query.vendorId || null;

  async function addUpdateVendor(displayToaster = true) {
    setLoading(true);
    const sendData = {
      lsp_id: vendorData?.lspId || null,
      name: vendorData?.name?.trim() || '',
      level: vendorData?.level?.trim() || '',
      type: vendorData?.type?.trim() || '',
      address: vendorData?.address?.trim() || '',
      website: vendorData?.website?.trim() || '',
      facebook_url: vendorData?.facebookURL?.trim() || '',
      instagram_url: vendorData?.instagramURL?.trim() || '',
      twitter_url: vendorData?.twitterURL?.trim() || '',
      linkedin_url: vendorData?.linkedinURL?.trim() || '',
      // users: vendorData?.users || [],
      users: [],
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
        context: {
          fetchOptions: {
            useUpload: true,
            onProgress: (ev) =>
              setVendorData({ ...vendorData, fileUploadPercent: (ev.loaded / ev.total) * 100 })
          }
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
    if (vendorData?.name && vendorData?.level && vendorData?.type) {
      const res = await addNewVendor({
        variables: sendData,
        context: {
          fetchOptions: {
            useUpload: true,
            onProgress: (ev) =>
              setVendorData({ ...vendorData, fileUploadPercent: (ev.loaded / ev.total) * 100 })
          }
        }
      }).catch((err) => {
        console.log(err);
        isError = !!err;
        return setToastMsg({ type: 'danger', message: err.message || 'Add Vendor Error' });
      });
      setLoading(false);
      if (isError) return null;

      setToastMsg({ type: 'success', message: 'Added vendor successfully' });
      const _id = res.data.addVendor.vendorId;
      router.push(`/admin/vendor/manage-vendor/update-vendor/${_id}`);
      return _id;
    } else {
      setToastMsg({ type: 'warning', message: 'Please Enter your Vendor Name' });
      setLoading(false);
    }
  }

  return { addUpdateVendor, loading };
}
