import {
    UPDATE_USER, userClient
} from '@/api/UserMutations';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import {
    getUserObject, UserStateAtom
} from '@/state/atoms/users.atom';
import { useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

export default function useHandleUserDetails() {
  const [updateAbout, { error: createError }] = useMutation(UPDATE_USER, {
    client: userClient
  });
  
  //recoil states
  const userDataAbout = useRecoilValue(UserStateAtom);
 
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);

  // local state
  const [userAboutData, setUserAboutData] = useState(getUserObject());
 

  // setting up local states
  useEffect(() => {
    setUserAboutData(getUserObject(userDataAbout));
    
  }, [userData]);


  async function updateAboutUser() {
    const sendUserData = {
    id: userAboutData?.id,
      first_name: userAboutData?.first_name,
      last_name: userAboutData?.last_name,

      status: userAboutData?.status,
      role: userAboutData?.role || 'Learner',
      email: userAboutData?.email,
      phone: userAboutData?.phone,
      photo_url: userAboutData?.photo_url || null,
      Photo: userAboutData?.photo || null,
      gender: userAboutData?.gender,

      is_verified: true,
      is_active: true,

      created_by: userAboutData?.created_by || 'Zicops',
      updated_by: userAboutData?.updated_by || 'Zicops'
    };

    console.log(sendUserData, 'updateAboutUser');

    let isError = false;
    const res = await updateAbout({ variables: sendUserData }).catch((err) => {
      console.log(err);
      isError = !!err;
      return setToastMsg({ type: 'danger', message: 'Update User Error' });
    });

    console.log(res);
  }

  return { updateAboutUser };
}

export default function useAddUserDetails() {
    
}