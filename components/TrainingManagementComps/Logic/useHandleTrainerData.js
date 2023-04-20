import { useRecoilState, useRecoilValue } from 'recoil';
import {
  TrainerDataAtom,
  TrainerExpertiseListAtom,
  getTrainerDataObj,
} from '@/state/atoms/trainingManagement.atoms';
import { CREATE_TRAINER, viltMutationClient } from '@/api/ViltMutations';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import { USER_LSP_ROLE, CUSTOM_ERROR_MESSAGE, USER_TYPE } from '@/helper/constants.helper';
import { INVITE_USERS_WITH_ROLE, userClient } from '@/api/UserMutations';
import { ADD_USER_TAGS, notificationClient } from '@/api/NotificationClient';
import { FcmTokenAtom } from '@/state/atoms/notification.atom';
import { loadQueryDataAsync } from '@/helper/api.helper';
import { GET_PAGINATED_TRAINERS, viltQueryClient } from '@/api/ViltQueries';
import { GET_USER_DETAIL, userQueryClient } from '@/api/UserQueries';

export default function useHandleTrainerData() {
  const [trainerData, setTrainerData] = useRecoilState(TrainerDataAtom);
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);
  const fcmToken = useRecoilValue(FcmTokenAtom);

  const [addNewTrainer] = useMutation(CREATE_TRAINER, { client: viltMutationClient });
  const [addUserTags] = useMutation(ADD_USER_TAGS, { client: notificationClient });

  const [localUserId, setLocalUserId] = useState(null);

  const [inviteUsers, { data }] = useMutation(INVITE_USERS_WITH_ROLE, {
    client: userClient,
  });

  useEffect(() => {
    if (!localUserId) return;
    addUpdateTrainer();
  }, [localUserId]);

  async function addUpdateTrainer() {
    const sendData = {
      ...trainerData,
      name: trainerData?.name || '',
      userId: localUserId || trainerData?.userId || null,
      expertise: trainerData?.expertise || [],
    };

    if (!sendData?.userId)
      return setToastMsg({ type: 'danger', message: 'Please Select your Trainer' });
    if (!sendData?.expertise.length) {
      return setToastMsg({ type: 'danger', message: 'Please Select atleast One Expertise' });
    }

    // console.info(sendData, '1736');
    let isError = false;

    const res = await addNewTrainer({ variables: sendData }).catch((err) => {
      console.log(err);
      isError = !!err;
      return setToastMsg({ type: 'danger', message: err.message || 'Add Trainer Error' });
    });
    // setLoading(false);
    if (isError) return null;

    setToastMsg({ type: 'success', message: 'Added Trainer Successfully' });
    setLocalUserId(null);
  }

  async function handleMail() {
    const lspId = sessionStorage.getItem('lsp_id');

    if (!trainerData?.inviteEmails)
      return setToastMsg({ type: 'danger', message: 'Please Enter an email to invite' });

    if (!trainerData?.tag)
      return setToastMsg({ type: 'danger', message: 'Please Enter an User Type' });

    // send lowercase email only.
    let sendEmails = trainerData?.inviteEmails?.toLowerCase();
    let isError = false;
    let errorMsg;

    const resEmail = await inviteUsers({
      variables: { emails: sendEmails, lsp_id: lspId, role: USER_LSP_ROLE?.trainer },
    }).catch((err) => {
      console.log('error', err);

      errorMsg = err.message;

      isError = !!err;
    });

    if (isError) return setToastMsg({ type: 'danger', message: 'Invite User Failed' });
    if (isError) {
      const message = JSON.parse(errorMsg?.split('body:')[1]);
      if (message?.error?.message === CUSTOM_ERROR_MESSAGE?.emailError)
        return setToastMsg({ type: 'danger', message: `Email already exists!` });
      return setToastMsg({ type: 'danger', message: `Error while sending mail!` });
    }

    if (isError) return setToastMsg({ type: 'danger', message: `Error while sending mail!` });
    console.log(resEmail);

    const resEmails = resEmail?.data?.inviteUsersWithRole;
    setLocalUserId(resEmails?.[0]?.user_id);

    let userLspMaps = [];

    let existingEmails = [];

    resEmails?.forEach((user) => {
      let message = user?.message;
      if (
        message === CUSTOM_ERROR_MESSAGE?.selfInvite ||
        message === CUSTOM_ERROR_MESSAGE?.emailAlreadyExist ||
        !user?.user_id
      )
        existingEmails.push(user?.email);
      else userLspMaps.push({ user_id: user?.user_id, user_lsp_id: user?.user_lsp_id });
    });

    if (!!existingEmails?.length) {
      setToastMsg({
        type: 'info',
        message:
          'User Already exists in the learning space and cannot be mapped as vendor in this learning space.',
      });
    }
    if (userLspMaps?.length) {
      const resTags = await addUserTags({
        variables: { ids: userLspMaps, tags: [trainerData?.tag] },
        context: { headers: { 'fcm-token': fcmToken || sessionStorage?.getItem('fcm-token') } },
      }).catch((err) => {
        isError = true;
      });
    }

    if (isError) return setToastMsg({ type: 'danger', message: 'Error while adding tags!.' });

    if (userLspMaps?.length) setToastMsg({ type: 'success', message: `Emails Sent Successfully!` });
  }

  async function getPaginatedTrainers(pageCursor = '') {
    const lspId = sessionStorage?.getItem('lsp_id');
    if (!lspId) return [];

    const trainerList = await loadQueryDataAsync(
      GET_PAGINATED_TRAINERS,
      { lsp_id: lspId, pageCursor, Direction: '', pageSize: 100, vendor_id: '' },
      {},
      viltQueryClient,
    ).catch((err) => setToastMsg({ type: 'danger', message: 'Trainer Data Load Error' }));

    // if (!vendorList?.getPaginatedVendors?.vendors) return [];

    if (trainerList.error) {
      setToastMsg({ type: 'danger', message: 'Trainer Data Load Error' });
      return [];
    }

    let trainerUserIdArr = trainerList?.getTrainerData?.trainers.map((trainer) => trainer.user_id);

    const userDetails = await loadQueryDataAsync(
      GET_USER_DETAIL,
      { user_id: trainerUserIdArr },
      {},
      userQueryClient,
    ).catch((err) => err);

    const userDeets = userDetails?.getUserDetails;

    return userDeets;
  }

  return { addUpdateTrainer, handleMail, getPaginatedTrainers };
}
