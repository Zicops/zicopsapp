import { useState } from 'react';
import { GET_VENDORS_BY_LSP_FOR_TABLE, userQueryClient } from '@/api/UserQueries';
import { loadQueryDataAsync } from '@/helper/api.helper';
import { useMutation } from '@apollo/client';
import { ADD_VENDOR, userClient } from '@/api/UserMutations';
export default function useHandleVendor() {
  const [addNewVendor] = useMutation(ADD_VENDOR, {
    client: userClient
  });

  const [vendorData, setVendorData] = useState([]);

  const getVendors = async () => {
    const lspId = sessionStorage?.getItem('lsp_id');
    const vendorList = await loadQueryDataAsync(
      GET_VENDORS_BY_LSP_FOR_TABLE,
      { lsp_id: lspId },
      {},
      userQueryClient
    );
    setVendorData(vendorList?.getVendors);
  };
  if (!vendorData?.length) getVendors();

  const addVendor = async () => {
    const sendData = {
      // CatId: catSubCatData?.CatId,
      // Name: catSubCatData?.Name?.trim(),
      // Description: catSubCatData?.Description?.trim(),
      // ImageFile: catSubCatData?.File,
      // Code: catSubCatData?.Code?.trim(),
      // IsActive: catSubCatData?.IsActive || true,
      // LspId: catSubCatData?.LspId
    };
    const res = await addNewVendor({ variables: sendData });
  };
  return {
    vendorData
  };
}
