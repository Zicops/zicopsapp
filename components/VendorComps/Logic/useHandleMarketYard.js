import { GET_VENDORS_BY_LSP, userQueryClient } from '@/api/UserQueries';
import { loadAndCacheDataAsync } from '@/helper/api.helper';
import { useState } from 'react';
import { sortArrByKeyInOrder } from '@/helper/data.helper';

export default function useHandleMarketYard() {
  const [vendorDetails, setVendorDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getLspVendors(lspId, isDataReturn = false) {
    setLoading(true);
    const vendorList = await loadAndCacheDataAsync(
      GET_VENDORS_BY_LSP,
      { lsp_id: lspId },
      {},
      userQueryClient
    );

    const _sortedData = sortArrByKeyInOrder(vendorList?.getVendors || [], 'updated_at', false);
    if (isDataReturn) {
      setLoading(false);
      return _sortedData;
    }
    setVendorDetails(_sortedData);
    setLoading(false);
  }

  return { getLspVendors, vendorDetails };
}
