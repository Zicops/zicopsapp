import {
  GET_VENDORS_BY_LSP,
  userQueryClient,
  GET_VENDORS_BY_LSP_FOR_TABLE,
  GET_USER_VENDORS,
  GET_PAGINATED_VENDORS
} from '@/api/UserQueries';
import { loadAndCacheDataAsync, loadQueryDataAsync } from '@/helper/api.helper';
import { useState } from 'react';
import { sortArrByKeyInOrder } from '@/helper/data.helper';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { useRecoilState } from 'recoil';
import { UserStateAtom } from '@/state/atoms/users.atom';

export default function useLoadVendorData() {
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);
  const [userData, setUserData] = useRecoilState(UserStateAtom);

  async function getLspVendors(lspId = null) {
    if (!lspId) return [];

    const vendorList = await loadAndCacheDataAsync(
      GET_VENDORS_BY_LSP,
      { lsp_id: lspId },
      {},
      userQueryClient
    ).catch((err) => setToastMsg({ type: 'Danger', message: 'Vendor Data List Error' }));

    if (vendorList.error) {
      setToastMsg({ type: 'Danger', message: 'Vendor Data Load Error' });
      return [];
    }

    return sortArrByKeyInOrder(vendorList?.getVendors || [], 'updated_at', false);
  }

  async function getVendorsTable() {
    const lspId = sessionStorage?.getItem('lsp_id');
    if (!lspId) return [];

    const vendorList = await loadAndCacheDataAsync(
      GET_VENDORS_BY_LSP_FOR_TABLE,
      { lsp_id: lspId },
      {},
      userQueryClient
    ).catch((err) => setToastMsg({ type: 'Danger', message: 'Vendor Data List Error' }));

    if (vendorList.error) {
      setToastMsg({ type: 'Danger', message: 'Vendor Data Load Error' });
      return [];
    }

    return sortArrByKeyInOrder(vendorList?.getVendors || [], 'updated_at', false);
  }

  async function getPaginatedVendors(pageCursor = '') {
    const lspId = sessionStorage?.getItem('lsp_id');
    if (!lspId) return [];

    const vendorList = await loadQueryDataAsync(
      GET_PAGINATED_VENDORS,
      { lsp_id: lspId, pageCursor, Direction: '', pageSize: 30, filters: {} },
      {},
      userQueryClient
    ).catch((err) => setToastMsg({ type: 'Danger', message: 'Vendor Data Load Error' }));

    if (vendorList.error) {
      setToastMsg({ type: 'Danger', message: 'Vendor Data Load Error' });
      return [];
    }

    vendorList.getPaginatedVendors.vendors = sortArrByKeyInOrder(
      vendorList?.getPaginatedVendors?.vendors || [],
      'updated_at',
      false
    );
    return vendorList?.getPaginatedVendors;
  }

  async function getUserVendors() {
    if (!userData?.id) return;
    // if(!userOrgData?.user_lsp_role !== USER_LSP_ROLE?.vendor) return ;
    const vendorList = await loadQueryDataAsync(
      GET_USER_VENDORS,
      { user_id: userData?.id },
      {},
      userClient
    ).catch((err) => setToastMsg({ type: 'Danger', message: 'Vendor Data List Error' }));

    if (vendorList.error) {
      setToastMsg({ type: 'Danger', message: 'Vendor Data Load Error' });
      return [];
    }
    return sortArrByKeyInOrder(res?.getUserVendor || [], 'updated_at', false);
  }

  return { getLspVendors, getVendorsTable, getUserVendors, getPaginatedVendors };
}
