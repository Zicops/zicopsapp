import { ADD_USER_COHORT, UPDATE_COHORT_MAIN, UPDATE_USER_COHORT, userClient } from '@/api/UserMutations';
import { getUserData } from '@/helper/loggeduser.helper';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { useMutation } from '@apollo/client';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

export default function addUserData() {
  const [addToCohort, { error, loading }] = useMutation(ADD_USER_COHORT, {
    client: userClient
  });

  const [updateCohortMain, { error: updateCohortError }] = useMutation(UPDATE_COHORT_MAIN, {
    client: userClient
  });

  const [updateUserCohort, { error : updateError }] = useMutation(UPDATE_USER_COHORT, {
    client: userClient
  });

  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);

  async function addUserToCohort(data = {}) {
    const { id, role } = getUserData();
    if (!data?.id) return;
    const sendCohortData = {
      user_id: data?.user_id,
      user_lsp_id: data?.user_lsp_id,
      cohort_id: data?.cohort_id,
      added_by: JSON.stringify({ user_id: id, role: role }),
      membership_status: 'Active',
      role: data?.role || 'Learner'
    };
    // console.log(sendCohortData);
    let isError = false;
    const resCohort = await addToCohort({ variables: { userCohort: sendCohortData } }).catch(
      (err) => {
        console.log(err);
        isError = !!err;
      }
    );
    if (isError)
     return setToastMsg({ type: 'danger', message: 'error occured while adding user cohort mapping' });
    // console.log(resCohort, 'adduserData');
    return isError;
  }

  async function removeCohortUser(userData = null , cohortData = null){
    const { id } = getUserData();
    if(!userData) return false;
    const sendData = {
      user_cohort_id: userData?.user_cohort_id,
      user_id: userData?.user_id,
      user_lsp_id: userData?.user_lsp_id,
      cohort_id: userData?.cohort_id,
      added_by: JSON.stringify({ user_id: id, role: 'Admin' }),
      membership_status: 'Disable',
      role: userData?.role
    };
    // console.log(sendData)
    let isError = false;
    const res = await updateUserCohort({ variables: sendData }).catch((err) => {
      isError = true;
      if (!!err) setToastMsg({ type: 'danger', message: 'Error while removing user' });
    });

    const sendCohortData = {
      cohort_id: cohortData?.id,
      name: cohortData?.cohort_name,
      description: cohortData?.description,
      lsp_id: cohortData?.lsp_id || lspData?.lsp_id,
      code: cohortData?.cohort_code,
      status: 'SAVED',
      type: cohortData?.cohort_type,
      is_active: true,
      size: cohortData?.size - 1 || 1
    }

    const resCohort = await updateCohortMain({ variables: sendCohortData }).catch((err) => {
      // console.log(err);
      isError = !!err;
    });


    // console.log(res);
    return !isError;

  }

  return { addUserToCohort , removeCohortUser };
}
