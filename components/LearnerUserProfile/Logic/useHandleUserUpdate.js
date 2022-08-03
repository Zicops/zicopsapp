import { UPDATE_USER, userClient } from '@/api/UserMutations';
import { getUserObject, UserStateAtom } from '@/state/atoms/users.atom';
import { useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';

export default function useHandleUserUpdate() {
  const [updateAbout, { error: createError }] = useMutation(UPDATE_USER, {
    client: userClient
  });

  const userData = useRecoilValue(UserStateAtom);

  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);

  // local state
  const [userAboutData, setUserAboutData] = useState(getUserObject());

  useEffect(() => {
    setUserAboutData(getUserObject(userData));
  }, [userData]);

  async function updateAboutUser() {
    const sendData = {
      id: userAboutData?.id,
      first_name: userAboutData?.first_name,
      last_name: userAboutData?.last_name,

      status: userAboutData?.status,
      role: userAboutData?.role,
      email: userAboutData?.email,
      phone: userAboutData?.phone,
      photo_url: userAboutData?.photo_url,
      gender: userAboutData?.gender,

      is_verified: userAboutData?.is_verified || false,
      is_active: userAboutData?.is_active || false,

      created_by: userAboutData?.created_by || 'Zicops',
      updated_by: userAboutData?.updated_by || 'Zicops',
      created_at: userAboutData?.created_at || null,
      updated_at: userAboutData?.updated_at || null
    };

    console.log(sendData, 'yo');

    let isError = false;
    const res = await updateAbout({ variables: sendData }).catch((err) => {
      console.log(err);
      isError = !!err;
      return setToastMsg({ type: 'danger', message: 'Update User Error' });
    });

    console.log(res);
  }

  return { updateAboutUser };
}
