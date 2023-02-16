import { useEffect, useState } from 'react';
import {
  GET_VENDORS_BY_LSP_FOR_TABLE,
  GET_VENDOR_DETAILS,
  userQueryClient
} from '@/api/UserQueries';
import { loadAndCacheDataAsync, loadQueryDataAsync } from '@/helper/api.helper';
import { useMutation } from '@apollo/client';
import { getVendorObject, VendorProfileAtom, VendorStateAtom } from '@/state/atoms/vendor.atoms';
import { useRecoilState } from 'recoil';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { VENDOR_MASTER_STATUS } from '@/helper/constants.helper';
import { useRouter } from 'next/router';
import { ADD_VENDOR, UPDATE_VENDOR, userClient } from '@/api/UserMutations';
import { sortArrByKeyInOrder } from '@/helper/data.helper';

export default function useHandleVendor() {
  const [addNewVendor] = useMutation(ADD_VENDOR, { client: userClient });
  const [updateVendor] = useMutation(UPDATE_VENDOR, { client: userClient });

  const [vendorData, setVendorData] = useRecoilState(VendorStateAtom);
  const [profileData, setProfileData] = useRecoilState(VendorProfileAtom);
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);
  const [vendorDetails, setVendorDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const vendorId = router.query.vendorId || '0';

  useEffect(() => {
    if (!router.isReady) return;
    setVendorData(getVendorObject());
  }, [router.isReady]);

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

  async function getSingleVendorInfo() {
    const vendorInfo = await loadQueryDataAsync(
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
      vendorProfileImage: vendorInfo?.getVendorDetails?.photo_url
    };
    setVendorData(getVendorObject(singleData));
  }

  async function addUpdateVendor() {
    const lspId = sessionStorage?.getItem('lsp_id');
    const sendData = {
      // lsp_id: lspId,
      name: vendorData?.name?.trim() || '',
      level: vendorData?.level?.trim() || '',
      type: vendorData?.type?.trim() || '',
      photo: vendorData?.vendorProfileImage || null,
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

    let isError = false;

    if (vendorData?.vendorId) {
      sendData.vendorId = vendorData?.vendorId;

      await updateVendor({ variables: sendData }).catch((err) => {
        console.log(err);
        isError = !!err;
        return setToastMsg({ type: 'danger', message: 'Update Vendor Error' });
      });

      if (isError) return;
      setToastMsg({ type: 'success', message: 'Vendor Updated' });
      return;
    }

    const res = await addNewVendor({ variables: sendData }).catch((err) => {
      console.log(err);
      isError = !!err;
      return setToastMsg({ type: 'danger', message: 'Add Vendor Error' });
    });
    if (isError) return;
    return res;
  }

  return {
    vendorDetails,
    addUpdateVendor,
    getSingleVendorInfo,
    handlePhotoInput,
    handleProfilePhoto,
    getAllVendors,
    loading,
    setLoading
  };
}
