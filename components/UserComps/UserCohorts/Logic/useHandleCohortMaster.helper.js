import {
  ADD_COHORT_MAIN,
  UPDATE_COHORT_MAIN,
  UPDATE_USER_COHORT,
  userClient
} from '@/api/UserMutations';
import { GET_USER_LEARNINGSPACES_DETAILS } from '@/api/UserQueries';
import { loadQueryDataAsync, sendEmail, sendNotificationWithLink } from '@/helper/api.helper';
import { getNotificationMsg } from '@/helper/common.helper';
import { EMAIL_TEMPLATE_IDS, NOTIFICATION_TITLES } from '@/helper/constants.helper';
import { getUserData } from '@/helper/loggeduser.helper';
import { FcmTokenAtom } from '@/state/atoms/notification.atom';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { CohortMasterData, UsersOrganizationAtom } from '@/state/atoms/users.atom';
import { STATUS, StatusAtom } from '@/state/atoms/utils.atoms';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
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
  const [userOrgData, setUserOrgData] = useRecoilState(UsersOrganizationAtom);
  const [cohortMasterData, setCohortMasterData] = useState(null);

  const [isSubmitDisable, setIsSubmitDisable] = useState(false);
  const fcmToken = useRecoilValue(FcmTokenAtom);

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

  function sendNotificationOfPromotion(
    userNames = [],
    emails = [],
    userIds = [],
    isDemote = false
  ) {
    let msgType = isDemote ? 'demotedManager' : 'promotedManager';
    const notificationBody = getNotificationMsg(msgType, {
      cohortName: cohortMasterData?.cohort_name
    });

    const bodyData = {
      user_name: '',
      lsp_name: sessionStorage?.getItem('lsp_name'),
      cohort_name: cohortMasterData?.cohort_name,
      link: `${origin}/my-profile?tabName=Cohort`
    };
    const sendEmailBody = {
      to: emails,
      sender_name: sessionStorage?.getItem('lsp_name'),
      user_name: userNames,
      body: JSON.stringify(bodyData),
      template_id: isDemote
        ? EMAIL_TEMPLATE_IDS?.cohortManagerUnassign
        : EMAIL_TEMPLATE_IDS?.cohortManagerAssign
    };
    sendNotificationWithLink(
      {
        body: notificationBody,
        title: NOTIFICATION_TITLES?.cohortAssign,
        user_id: userIds,
        link:''
      },
      { context: { headers: { 'fcm-token': fcmToken || sessionStorage.getItem('fcm-token') } } }
    );
    sendEmail(sendEmailBody, {
      context: { headers: { 'fcm-token': fcmToken || sessionStorage.getItem('fcm-token') } }
    });
  }
  async function saveCohortMaster() {
    // console.log(cohortMasterData, cohortData);
    const lspId = sessionStorage.getItem('lsp_id');
    const _lspId = userOrgData?.lsp_id ? userOrgData?.lsp_id : lspId;
    if (validatingCohortMaster()) return;
    setIsSubmitDisable(true);

    const data = getUserData();
    const { id } = data;

    let cohortSize = 0;

    const sendCohortData = {
      name: cohortMasterData?.cohort_name,
      description: cohortMasterData?.description,
      lsp_id: lspId,
      code: cohortMasterData?.cohort_code,
      status: 'SAVED',
      type: cohortMasterData?.cohort_type,
      is_active: true,
      size: cohortMasterData?.managers?.length || 1
    };

    sendCohortData.image = cohortMasterData?.cohort_image ? cohortMasterData?.cohort_image : null;
    let isError = false;
    if (cohortMasterData?.id) {
      sendCohortData.cohort_id = cohortMasterData?.id;
      const _allUsers = await getCohortUser(cohortMasterData?.id, false, false);
      if (_allUsers?.length) sendCohortData.size = _allUsers?.length;
      const allUsers = _allUsers?.filter(
        (item) => item?.membership_status?.toLowerCase() !== 'disable'
      );
      const oldManagers = allUsers?.filter((item) => item?.role?.toLowerCase() === 'manager');
      const oldLearner = allUsers?.filter((item) => item?.role?.toLowerCase() !== 'manager');
      const disableUsers = _allUsers?.filter(
        (item) => item?.membership_status?.toLowerCase() === 'disable'
      );

      cohortSize = allUsers?.length;

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
        ({ id: id1 }) => !_allUsers?.some(({ user_id: id2 }) => id2 === id1)
      );

      //disable user that are in cohort
      const promoteDisableManager = disableUsers?.filter(({ user_id: id1 }) =>
        cohortMasterData?.managers?.some(({ id: id2 }) => id2 === id1)
      );

      // return;

      if (removeManager?.length) {
        let userIds = [];
        let userNames = [];
        let userMails = [];
        for (let i = 0; i < removeManager?.length; i++) {
          // const data = await getCohortUserDetails(cohortMasterData?.id, removeManager[i]?.user_id);
          let data = [removeManager[i]];
          // return;
          if (!data?.length) break;
          userIds.push(data[0]?.user_id);
          userNames.push(data[0]?.first_name);
          userMails.push(data[0]?.email);
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
            if (!!err)
              return setToastMsg({ type: 'danger', message: 'Error while removing manager' });
          });
        }
        sendNotificationOfPromotion(userNames, userMails, userIds, true);
      }

      // return;
      if (promoteManager?.length) {
        let userIds = [];
        let userNames = [];
        let userMails = [];
        for (let i = 0; i < promoteManager?.length; i++) {
          // const data = await getCohortUserDetails(cohortMasterData?.id, promoteManager[i]?.user_id);

          let data = [promoteManager[i]];

          if (!data?.length) break;
          userIds.push(data[0]?.user_id);
          userNames.push(data[0]?.first_name);
          userMails.push(data[0]?.email);
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
            if (!!err)
              return setToastMsg({ type: 'danger', message: 'Error while updating manager' });
          });
        }
        sendNotificationOfPromotion(userNames, userMails, userIds);
      }

      if (promoteDisableManager?.length) {
        let userIds = [];
        let userNames = [];
        let userMails = [];
        cohortSize = allUsers?.length + promoteDisableManager?.length;
        for (let i = 0; i < promoteDisableManager?.length; i++) {
          // const data = await getCohortUserDetails(
          //   cohortMasterData?.id,
          //   promoteDisableManager[i]?.user_id
          // );
          let data = [promoteDisableManager[i]];
          if (!data?.length) break;
          userIds.push(data[0]?.user_id);
          userNames.push(data[0]?.first_name);
          userMails.push(data[0]?.email);
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
            if (!!err)
              return setToastMsg({ type: 'danger', message: 'Error while updating manager' });
          });
          sendNotificationOfPromotion(userNames, userMails, userIds);
        }
      }

      if (newManager?.length) sendCohortData.size = cohortSize + newManager?.length;

      //adding new managers
      if (newManager?.length) {
        let userIds = [];
        let userNames = [];
        let userMails = [];
        for (let i = 0; i < newManager?.length; i++) {
          // const sendLspData = {
          //   user_id: newManager[i]?.id,
          //   lsp_id: lspId
          // };
          // // console.log('userLspCalled 2')

          // let res = await loadQueryDataAsync(
          //   GET_USER_LEARNINGSPACES_DETAILS,
          //   { ...sendLspData },
          //   {},
          //   userClient
          // );
          // const userLspData = res?.getUserLspByLspId;
          // console.log(userLspData,'userkkhkh')
          const sendAddUserCohortData = {
            user_id: newManager[i]?.id,
            user_lsp_id: newManager[i]?.user_lsp_id,
            cohort_id: cohortMasterData?.id,
            membership_status: 'Active',
            role: 'Manager'
          };
          // console.log(sendAddUserCohortData,'add');
          const add = await addUserToCohort(sendAddUserCohortData);
          // console.log(add,'add');
          userIds.push(newManager[i]?.id);
          userNames.push(newManager[i]?.name);
          userMails.push(newManager[i]?.email);
          if (add) continue;
        }
        sendNotificationOfPromotion(userNames, userMails, userIds);
      }

      const cohortUsers = await getCohortUser(cohortMasterData?.id, true);
      // if (_allUsers?.length) sendCohortData.size = _allUsers?.length;
      const activeUsers = cohortUsers?.filter(
        (item) => item?.membership_status?.toLowerCase() !== 'disable'
      );

      if (activeUsers?.length) sendCohortData.size = activeUsers?.length;
      const res = await updateCohortMain({ variables: sendCohortData }).catch((err) => {
        // console.log(err);
        isError = !!err;
      });

      if (isError)
        return setToastMsg({ type: 'danger', message: 'Error occured while updating cohort!' });

      setIsSubmitDisable(false);

      setCohortData((prevValue) => ({
        ...prevValue,
        image_url: res?.data?.updateCohortMain?.imageUrl
      }));
      return setToastMsg({ type: 'success', message: 'Updated cohort successfully!' });
    }

    // console.log(sendCohortData, 'add cohortmaster');
    if (!cohortMasterData?.id) {
        let userIds = [];
        let userNames = [];
        let userMails = [];
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
          lsp_id: lspId
        };
        let res = await loadQueryDataAsync(
          GET_USER_LEARNINGSPACES_DETAILS,
          { ...sendLspData },
          {},
          userClient
        );
        const userLspData = res?.getUserLspByLspId;
        userIds.push(cohortMasterData?.managers[i]?.id);
        userNames.push(cohortMasterData?.managers[i]?.value);
        userMails.push(cohortMasterData?.managers[i]?.email);
        const sendAddUserCohortData = {
          user_id: cohortMasterData?.managers[i]?.id,
          user_lsp_id: userLspData?.user_lsp_id,
          cohort_id: cohort_id,
          membership_status: 'Active',
          role: 'Manager'
        };
        await addUserToCohort(sendAddUserCohortData);
      }
      sendNotificationOfPromotion(userNames, userMails, userIds);
      setToastMsg({ type: 'success', message: 'Added cohort successfully!' });
      setIsSubmitDisable(false);
      return router.push('/admin/user/user-cohort/' + cohort_id);
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

  return { saveCohortMaster, assignCourseToUser, isSubmitDisable };
}
