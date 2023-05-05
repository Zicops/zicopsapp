import { useRecoilState } from 'recoil';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { loadQueryDataAsync, mutateData } from '@/helper/api.helper';
import {
  viltQueryClient,
  GET_PAGINATED_REGISTER_USER,
  GET_REGISTRATION_DETAILS,
} from '@/api/ViltQueries';
import { useState } from 'react';
import { CREATE_REGISTER_COUSER_USER, UPDATE_REGISTER_COUSER_USER } from '@/api/ViltMutations';
import { RegisterUserAtom } from '@/state/atoms/courses.atom';
import { sanitizeFormData } from '@/helper/common.helper';
import { GET_USER_DETAIL, userQueryClient } from '@/api/UserQueries';

export default function useHandleRegisterData() {
  const [registerTableData, setRegisterTableData] = useState([]);
  const [registerUserData, setRegisterUserData] = useRecoilState(RegisterUserAtom);
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

    const userIds = registerUserList?.getAllRegistrations?.data?.map((data) => data?.user_id);
    const userData = await loadQueryDataAsync(
      GET_USER_DETAIL,
      { user_id: userIds },
      {},
      userQueryClient,
    ).catch((err) => setToastMsg({ type: 'danger', message: 'User Data Load Error' }));
    const userDetails = userData?.getUserDetails;
    const regiterUserDatails = registerUserList?.getAllRegistrations?.data?.map((item, index) =>
      Object.assign({}, item, userDetails[index]),
    );
    setRegisterTableData(regiterUserDatails);
    return;
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
    setRegisterUserData(registerDetails?.getRegistrationDetails);
    return;
  }

  async function addUpdateRegisterUser() {
    const sendData = sanitizeFormData(registerUserData);
    // add new module
    if (!registerUserData?.id) {
      mutateData(CREATE_REGISTER_COUSER_USER, sendData).catch(() =>
        setToastMsg({ type: 'warning', message: 'Register User Create Error' }),
      );
      return;
    }

    // update module
    mutateData(UPDATE_REGISTER_COUSER_USER, sendData).catch(() =>
      setToastMsg({ type: 'warning', message: 'Register User Update Error' }),
    );
  }
  return {
    getPaginatedRegisterUsers,
    getRegisterUserDetails,
    registerTableData,
    addUpdateRegisterUser,
  };
}
