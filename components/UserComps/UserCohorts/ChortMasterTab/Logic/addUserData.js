import { ADD_USER_COHORT, userClient } from '@/api/UserMutations';
import { getUserData } from '@/helper/loggeduser.helper';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { useMutation } from '@apollo/client';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

export default function addUserData() {
  const [addToCohort, { error, loading }] = useMutation(ADD_USER_COHORT, {
    client: userClient
  });

  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);

  async function addUserToCohort(data = {}) {
    const { id, role } = getUserData();
    if (!data?.id) return;
    const sendCohortData = {
      user_id: data?.id,
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
  }

  return { addUserToCohort };
}
