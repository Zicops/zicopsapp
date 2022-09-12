import { ADD_USER_COHORT, userClient } from '@/api/UserMutations';
import { getUserData } from '@/helper/loggeduser.helper';
import { useMutation } from '@apollo/client';
import { useEffect } from 'react';

export default function addUserData() {
  const [addToCohort, { error, loading }] = useMutation(ADD_USER_COHORT, {
    client: userClient
  });

  const { id, role } = getUserData();

  async function addUserToCohort(data = {}) {
    const sendCohortData = {
      user_id: data?.id,
      user_lsp_id: data?.user_lsp_id || 'ZicopsLsp',
      cohort_id: data?.cohort_id,
      added_by: JSON.stringify({ user_id: id, role: role }),
      membership_status: 'Learner'
    };
    console.log(sendCohortData);
    // const resCohort = await addToCohort({ variables: { userCohort: sendCohortData } }).catch((err) =>
    //   console.log(err)
    // );
    // console.log(resCohort);
  }

  return { addUserToCohort };
}
