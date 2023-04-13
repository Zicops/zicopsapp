import { useRecoilState } from 'recoil';
import {
  TrainerDataAtom,
  TrainerExpertiseListAtom,
  getTrainerDataObj
} from '@/state/atoms/trainingManagement.atoms';
import { CREATE_TRAINER, viltMutationClient } from '@/api/ViltMutations';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { useMutation } from '@apollo/client';
import { useEffect } from 'react';
import { USER_LSP_ROLE } from '@/helper/constants.helper';
import { INVITE_USERS_WITH_ROLE, userClient } from '@/api/UserMutations';

export default function useHandleTrainerData() {
  const [trainerData, setTrainerData] = useRecoilState(TrainerDataAtom);
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);

  const [addNewTrainer] = useMutation(CREATE_TRAINER, { client: viltMutationClient });

  const lspId = sessionStorage.getItem('lsp_id');

  const [inviteUsers, { data }] = useMutation(INVITE_USERS_WITH_ROLE, {
    client: userClient
  });

  async function addUpdateTrainer(isQueryCall = true) {
    const sendData = {
      name: trainerData?.name || '',
      userId: trainerData?.userId || null,
      expertise: trainerData?.expertise || [],
      ...trainerData
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
  }

  async function handleMail(isQueryCall = false) {
    if (isQueryCall) return;

    if (!trainerData?.inviteEmails)
      return setToastMsg({ type: 'danger', message: 'Please Enter an email to invite' });

    if (!trainerData?.tag)
      return setToastMsg({ type: 'danger', message: 'Please Enter an User Type' });

    // send lowercase email only.
    let sendEmails = trainerData?.inviteEmails?.toLowerCase();
    let isError = false;
    // let errorMsg;

    const resEmail = await inviteUsers({
      variables: { emails: sendEmails, lsp_id: lspId, role: USER_LSP_ROLE?.trainer }
    })
      .then(async (res) => {
        if (!res?.data?.inviteUsersWithRole) return;

        // const invitedUsers = res?.data?.inviteUsersWithRole;
        // for (let i = 0; i < invitedUsers.length; i++) {
        //   const userData = invitedUsers[i];
        //   if (!userData?.user_id) continue;

        //   await addVendorUserMap({
        //     variables: {
        //       vendorId: vendorId || id,
        //       userId: userData?.user_id,
        //       status: USER_MAP_STATUS.activate
        //     }
        //   }).catch((err) => console.log(err));
        // }

        addUpdateTrainer();

        return res;
      })
      .catch((err) => {
        console.log('error', err);
        errorMsg = err.message;

        isError = !!err;
      });

    if (isError) return setToastMsg({ type: 'danger', message: 'Invite User Failed' });
    if (isError) {
      // const message = JSON.parse(errorMsg?.split('body:')[1]);
      if (message?.error?.message === CUSTOM_ERROR_MESSAGE?.emailError)
        return setToastMsg({ type: 'danger', message: `Email already exists!` });
      return setToastMsg({ type: 'danger', message: `Error while sending mail!` });
    }

    if (isError) return setToastMsg({ type: 'danger', message: `Error while sending mail!` });
    console.log(resEmail);

    setToastMsg({ type: 'success', message: `Emails Sent Successfully!` });

    // const resEmails = resEmail?.data?.inviteUsersWithRole;
    // let userLspMaps = [];

    // let existingEmails = [];

    // resEmails?.forEach((user) => {
    //   let message = user?.message;
    //   if (
    //     message === CUSTOM_ERROR_MESSAGE?.selfInvite ||
    //     message === CUSTOM_ERROR_MESSAGE?.emailAlreadyExist ||
    //     !user?.user_id
    //   )
    //     existingEmails.push(user?.email);
    //   else userLspMaps.push({ user_id: user?.user_id, user_lsp_id: user?.user_lsp_id });
    // });

    // if (!!existingEmails?.length) {
    //   setToastMsg({
    //     type: 'info',
    //     message:
    //       'User Already exists in the learning space and cannot be mapped as vendor in this learning space.'
    //   });
    // }
    // if (userLspMaps?.length) {
    //   const resTags = await addUserTags({
    //     variables: { ids: userLspMaps, tags: [USER_TYPE?.external] },
    //     context: { headers: { 'fcm-token': fcmToken || sessionStorage?.getItem('fcm-token') } }
    //   }).catch((err) => {
    //     isError = true;
    //   });
    // }

    // if (isError) return setToastMsg({ type: 'danger', message: 'Error while adding tags!.' });

    // if (userLspMaps?.length) setToastMsg({ type: 'success', message: `Emails Sent Successfully!` });
    // getVendorAdmins(id);
  }

  return { addUpdateTrainer, handleMail };
}
