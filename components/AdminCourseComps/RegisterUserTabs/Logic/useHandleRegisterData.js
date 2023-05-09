import { useRecoilState } from 'recoil';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { loadQueryDataAsync } from '@/helper/api.helper';
import { viltQueryClient, GET_PAGINATED_REGISTER_USER } from '@/api/ViltQueries';
import { useState } from 'react';

export default function useHandleRegisterData() {
  const [registerTableData, setRegisterTableData] = useState([]);
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);

  async function getPaginatedRegisterUsers(courseId = '', pageCursor = '') {
    const registerUserList = await loadQueryDataAsync(
      GET_PAGINATED_REGISTER_USER,
      { courseId: courseId, pageCursor, Direction: '', pageSize: 100 },
      {},
      viltQueryClient,
    ).catch((err) => setToastMsg({ type: 'danger', message: 'Register Data Load Error' }));

    // if (!vendorList?.getPaginatedVendors?.vendors) return [];

    if (registerUserList.error) {
      setToastMsg({ type: 'danger', message: 'Register Data Load Error' });
      return [];
    }
    setRegisterTableData(registerUserList);
    return registerUserList;
  }

  async function getRegisterUserDetails(registerId = '') {
    // if (!!trainerId) return;

    const registerDetails = await loadQueryDataAsync(
      GET_REGISTRATION_DETAILS,
      { id: registerId },
      {},
      viltQueryClient,
    ).catch((err) => setToastMsg({ type: 'warning', message: 'Register User Not Found' }));

    if (registerDetails.error) {
      setToastMsg({ type: 'warning', message: 'Register User Not Found' });
      return [];
    }

    return registerDetails;
  }

  return {
    getPaginatedRegisterUsers,
    getRegisterUserDetails,
    registerTableData,
  };
}
