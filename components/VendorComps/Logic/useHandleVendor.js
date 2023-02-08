import { useEffect, useState } from 'react';
import {
  GET_VENDORS_BY_LSP_FOR_TABLE,
  GET_VENDOR_DETAILS,
  userQueryClient
} from '@/api/UserQueries';
import { loadQueryDataAsync } from '@/helper/api.helper';
import { useMutation } from '@apollo/client';
import { getVendorObject, VendorStateAtom } from '@/state/atoms/vendor.atoms';
import { useRecoilState } from 'recoil';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { VENDOR_MASTER_STATUS } from '@/helper/constants.helper';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { getVendorObject, VendorStateAtom } from '@/state/atoms/vendor.atoms';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { ADD_VENDOR, UPDATE_VENDOR, userClient } from '@/api/UserMutations';

export default function useHandleVendor() {
  const [addNewVendor] = useMutation(ADD_VENDOR, {
    client: userClient
  });
  const [updateVendor] = useMutation(UPDATE_VENDOR, {
    client: userClient
  });

  const [vendorData, setVendorData] = useRecoilState(VendorStateAtom);
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);

  const [vendorDetails, setVendorDetails] = useState([]);
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

  async function getAllVendors() {
    const lspId = sessionStorage?.getItem('lsp_id');
    const vendorList = await loadQueryDataAsync(
      GET_VENDORS_BY_LSP_FOR_TABLE,
      { lsp_id: lspId },
      {},
      userQueryClient
    );
    setVendorDetails(vendorList?.getVendors);
  }

  async function getSingleVendorInfo() {
    const vendorInfo = await loadQueryDataAsync(
      GET_VENDOR_DETAILS,
      { vendor_id: vendorId },
      {},
      userQueryClient
    );
    setVendorData(vendorInfo?.getVendorDetails);
  }

  async function addUpdateVendor() {
    const lspId = sessionStorage?.getItem('lsp_id');
    const sendData = {
      lsp_id: lspId,
      name: vendorData?.name?.trim() || '',
      level: vendorData?.vendorLevel?.trim() || '',
      type: vendorData?.vendorType?.trim() || '',
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

    async function getEditVendors() {
      const lspId = sessionStorage?.getItem('lsp_id');
      const vendorList = await loadQueryDataAsync(
        GET_VENDORS_BY_LSP,
        { lsp_id: lspId },
        {},
        userQueryClient
      );
      const currentVendorInfo = vendorList?.getVendors?.find(
        (vendor) => vendor?.vendorId === vendorId
      );
      setVendorData(currentVendorInfo);
    }

    async function addVendor() {
      const lspId = sessionStorage?.getItem('lsp_id');
      const sendData = {
        lsp_id: lspId,
        name: vendorData?.vendorName.trim(),
        level: vendorLevel,
        type: vendorType,
        photo: vendorData?.vendorProfileImage,
        address: vendorData?.vendorAddress.trim(),
        website: vendorData?.vendorWebsiteURL,
        facebook_url: vendorData.facebookURL,
        instagram_url: vendorData.instagramURL,
        twitter_url: vendorData.twitterURL,
        linkedin_url: vendorData.linkedinURL,
        users: vendorData.users,
        description: vendorData.description.trim(),
        status: VENDOR_MASTER_STATUS.active
      };

      let isError = false;

      if (vendorData?.vendorId) {
        sendData.vendorId = vendorData?.vendorId;
        console.log(sendData);

        await updateVendor({ variables: { variables: sendData } }).catch((err) => {
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
      vendorData,
      vendorLevel,
      vendorType,
      setVendorData,
      setVendorType,
      setVendorLevel,
      addVendor,
      getEditVendors,
      handlePhotoInput
    };
  }

  return {
    vendorDetails,
    addUpdateVendor,
    getSingleVendorInfo,
    handlePhotoInput,
    getAllVendors
  };
}
