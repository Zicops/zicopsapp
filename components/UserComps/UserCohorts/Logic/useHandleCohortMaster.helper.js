import {
  ADD_COHORT_MAIN,
  UPDATE_COHORT_MAIN,
  UPDATE_USER_COHORT,
  userClient
} from '@/api/UserMutations';
import { GET_USER_LEARNINGSPACES_DETAILS } from '@/api/UserQueries';
import { loadQueryDataAsync } from '@/helper/api.helper';
import { LEARNING_SPACE_ID } from '@/helper/constants.helper';
import { getUserData } from '@/helper/loggeduser.helper';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { CohortMasterData } from '@/state/atoms/users.atom';
import { STATUS, StatusAtom } from '@/state/atoms/utils.atoms';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import addUserData from '../ChortMasterTab/Logic/addUserData';
import useCohortUserData from '../ChortMasterTab/Logic/useCohortUserData';

export function useHandleCohortMaster() {

  const router = useRouter();
  const [addCohortMain, { error }] = useMutation(ADD_COHORT_MAIN, {
    client: userClient
  });
  const [updateCohortMain, { error: updateCohortError }] = useMutation(UPDATE_COHORT_MAIN, {
    client: userClient
  });
  const [updateUserCohort, { error: userCohortUpdateError }] = useMutation(UPDATE_USER_COHORT, {
    client: userClient
  });

  const { addUserToCohort } = addUserData();
  const { getCohortManager, getCohortUserDetails, getCohortUser } = useCohortUserData();

  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);
  const [status, setStatus] = useRecoilState(StatusAtom);

  const [cohortData, setCohortData] = useRecoilState(CohortMasterData);
  const [cohortMasterData, setCohortMasterData] = useState(null);

  function validatingCohortMaster() {
    const {
      id,
      cohort_name,
      cohort_code,
      status,
      lsp,
      cohort_type,
      description,
      cohort_image,
      managers
    } = cohortData;

    let errorMsg = null;
    if (!cohort_name?.length > 0) errorMsg = 'Cannot leave cohort name empty';

    if (!cohort_code?.length > 0) errorMsg = 'Cannot leave cohort code empty';

    if (!cohort_type?.length > 0) errorMsg = 'Cannot leave cohort type empty';

    if (!description?.length > 0) errorMsg = 'Cannot leave cohort description empty';

    if (!managers?.length > 0) errorMsg = 'Atleast add one manager';

    if (!!errorMsg) setToastMsg({ type: 'danger', message: errorMsg });
    return !!errorMsg;
  }

  useEffect(() => {
    if (toastMsg[0]?.type !== 'danger') return;

    setStatus(STATUS.display[1]);
    if (cohortData?.status) setTimeout(() => setStatus(cohortData?.status), 2000);
  }, [toastMsg]);

  useEffect(() => {
    setCohortMasterData((prevValue) => ({ ...prevValue, ...cohortData }));
  }, [cohortData]);

  async function saveCohortMaster() {
    // console.log(cohortMasterData, cohortData);
    if (validatingCohortMaster()) return;

    const data = getUserData();
    const { id } = data;

    const sendCohortData = {
      name: cohortMasterData?.cohort_name,
      description: cohortMasterData?.description,
      lsp_id: LEARNING_SPACE_ID || lspData?.lsp_id,
      code: cohortMasterData?.cohort_code,
      status: 'SAVED',
      type: cohortMasterData?.cohort_type,
      is_active: true,
      size: cohortMasterData?.managers?.length || 1
    };

    if (cohortMasterData?.cohort_image) sendCohortData.image = cohortMasterData?.cohort_image;
    let isError = false;
    if (cohortMasterData?.id) {
      sendCohortData.cohort_id = cohortMasterData?.id;
      const allUsers = await getCohortUser(cohortMasterData?.id, true);
      if (allUsers?.length) sendCohortData.size = allUsers?.length;
      const oldManagers = allUsers?.filter((item) => item?.role?.toLowerCase() === 'manager');
      const oldLearner = allUsers?.filter((item) => item?.role?.toLowerCase() !== 'manager');

      //promoting learner to manager
      const promoteManager = oldLearner?.filter(({ user_id: id1 }) =>
        cohortMasterData?.managers?.some(({ id: id2 }) => id2 === id1)
      );

      //updating older manager that are removed
      const removeManager = oldManagers?.filter(
        ({ user_id: id1 }) => !cohortMasterData?.managers?.some(({ id: id2 }) => id2 === id1)
      );

      //new manager that are not in cohort
      const newManager = cohortMasterData?.managers?.filter(
        ({ id: id1 }) => !allUsers?.some(({ user_id: id2 }) => id2 === id1)
      );

      // console.log(removeManager, newManager, promoteManager, allUsers);
      // return ;

      if (removeManager?.length) {
        for (let i = 0; i < removeManager?.length; i++) {
          const data = await getCohortUserDetails(cohortMasterData?.id, removeManager[i]?.user_id);
          // console.log(data,removeManager[i]?.user_id);
          // return;
          if (!data?.length) break;
          const sendData = {
            user_cohort_id: data[0]?.user_cohort_id,
            user_id: data[0]?.user_id,
            user_lsp_id: data[0]?.user_lsp_id,
            cohort_id: data[0]?.cohort_id,
            added_by: JSON.stringify({ user_id: id, role: 'Admin' }),
            membership_status: 'Active',
            role: 'Learner'
          };
          const res = await updateUserCohort({ variables: sendData }).catch((err) => {
            if (!!err) setToastMsg({ type: 'danger', message: 'Error while removing manager' });
          });
          // console.log(res);
        }
      }

      // return;
      if (promoteManager?.length) {
        for (let i = 0; i < promoteManager?.length; i++) {
          const data = await getCohortUserDetails(cohortMasterData?.id, promoteManager[i]?.user_id);
          if (!data?.length) break;
          const sendData = {
            user_cohort_id: data[0]?.user_cohort_id,
            user_id: data[0]?.user_id,
            user_lsp_id: data[0]?.user_lsp_id,
            cohort_id: data[0]?.cohort_id,
            added_by: JSON.stringify({ user_id: id, role: 'Admin' }),
            membership_status: 'Active',
            role: 'Manager'
          };
          const res = await updateUserCohort({ variables: sendData }).catch((err) => {
            if (!!err) setToastMsg({ type: 'danger', message: 'Error while removing manager' });
          });
          // console.log(res);
        }
      }

      if (newManager?.length) sendCohortData.size = allUsers?.length + newManager?.length;

      //adding new managers
      if (newManager?.length) {
        for (let i = 0; i < newManager?.length; i++) {
          const sendLspData = {
            user_id: newManager[i]?.id,
            lsp_id: LEARNING_SPACE_ID
          };
          let res = await loadQueryDataAsync(
            GET_USER_LEARNINGSPACES_DETAILS,
            { ...sendLspData },
            {},
            userClient
          );
          const userLspData = res?.getUserLspByLspId;
          const sendAddUserCohortData = {
            id: cohortMasterData?.managers[i]?.id,
            user_lsp_id: userLspData?.user_lsp_id,
            cohort_id: cohortMasterData?.id,
            membership_status: 'Active',
            role: 'Manager'
          };
          await addUserToCohort(sendAddUserCohortData);
        }
      }

      // console.log(sendCohortData);
      const res = await updateCohortMain({ variables: sendCohortData }).catch((err) => {
        // console.log(err);
        isError = !!err;
      });

      // console.log(res);
      if (isError)
        return setToastMsg({ type: 'danger', message: 'Error occured while updating cohort!' });

      return setToastMsg({ type: 'success', message: 'Updated cohort successfully!' });;
    }

    // console.log(sendCohortData, 'add cohortmaster');
    if (!cohortMasterData?.id) {
      const resCohortData = await addCohortMain({ variables: sendCohortData }).catch((err) => {
        // console.log(err);
        isError = !!err;
      });

      if (isError)
        return setToastMsg({ type: 'danger', message: 'Error occured while creating cohort!' });

      // console.log(resCohortData?.data?.addCohortMain?.cohort_id);
      const cohort_id = resCohortData?.data?.addCohortMain?.cohort_id;

      setCohortData((prevValue) => ({ ...prevValue, id: cohort_id }));
      if (!cohort_id)
        return setToastMsg({ type: 'danger', message: 'Error occured in creating cohortID!' });
      for (let i = 0; i < cohortMasterData?.managers?.length; i++) {
        const sendLspData = {
          user_id: cohortMasterData?.managers[i]?.id,
          lsp_id: LEARNING_SPACE_ID
        };
        let res = await loadQueryDataAsync(
          GET_USER_LEARNINGSPACES_DETAILS,
          { ...sendLspData },
          {},
          userClient
        );
        // console.log(res?.getUserLspByLspId);
        const userLspData = res?.getUserLspByLspId;
        const sendAddUserCohortData = {
          id: cohortMasterData?.managers[i]?.id,
          user_lsp_id: userLspData?.user_lsp_id,
          cohort_id: cohort_id,
          membership_status: 'Active',
          role: 'Manager'
        };
        await addUserToCohort(sendAddUserCohortData);
      }
      setToastMsg({ type: 'success', message: 'Added cohort successfully!' });
      return router.push('/admin/user/user-cohort/'+ cohort_id)
    }
    // console.log(res);
  }

  async function assignCourseToUser() {
    //steps to assign courses to user.
    /*
    it will become easy if we take cohort courses based on ids 
    1. take all cohort users(only active)
    2. take all cohort courses
    3. first check if the courses assigned date is less than users cohort added date
       3.1 if date is less then filter the users which has more created date and after that assign them accordingly
       3.2 if date is more then run the loop and assign them.
    4. we can also check this thing for user whenever we add them to the cohort   
    */
  }

  return { saveCohortMaster, assignCourseToUser };
}
