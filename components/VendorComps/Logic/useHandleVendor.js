import { useEffect, useState } from 'react';
import {
  GET_VENDORS_BY_LSP,
  GET_VENDORS_BY_LSP_FOR_TABLE,
  userQueryClient
} from '@/api/UserQueries';
import { loadQueryDataAsync } from '@/helper/api.helper';
import { useMutation } from '@apollo/client';
import { ADD_VENDOR, UPDATE_VENDOR, userClient } from '@/api/UserMutations';
import { VendorStateAtom } from '@/state/atoms/vendor.atoms';
import { useRecoilState } from 'recoil';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { VENDOR_MASTER_STATUS } from '@/helper/constants.helper';
import { useRouter } from 'next/router';

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
  const [editVendorDetails, setEditVendorDetails] = useState([]);
  const [vendorType, setVendorType] = useState('company');
  const [vendorLevel, setVendorLevel] = useState('lsp');

  const router = useRouter();
  const vendorId = router.query.vendorId || '0';

  useEffect(() => {
    if (!vendorDetails?.length) getAllVendors();
  }, []);

  // useEffect(() => {
  //   if (!router.isReady) return;
  // }, [router.isReady]);

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
    setEditVendorDetails(currentVendorInfo);
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
      users: vendorData.addUser,
      description: vendorData.saySomething.trim(),
      status: VENDOR_MASTER_STATUS.active
    };

    let isError = false;

    // if (popUpState?.id) {
    //   sendData.id = popUpState?.id;
    //   console.log(sendData);

    //   await updateVendor({ variables: { variables: sendData } }).catch((err) => {
    //     console.log(err);
    //     isError = !!err;
    //     return setToastMsg({ type: 'danger', message: 'Update Category Error' });
    //   });
    //   if (isError) return;
    //   setToastMsg({ type: 'success', message: 'Category Updated' });
    //   return;
    // }

    // const res = await addNewVendor({ variables: sendData }).catch((err) => {
    //   console.log(err);
    //   isError = !!err;
    //   return setToastMsg({ type: 'danger', message: 'Add Category Error' });
    // });
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
    editVendorDetails,
    handlePhotoInput
  };
}
