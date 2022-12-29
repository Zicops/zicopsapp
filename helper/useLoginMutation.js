import { userClient, USER_LOGIN } from '@/api/UserMutations';
import { GIBBERISH_VALUE_FOR_LOGIN_STATE, USER_STATUS } from '@/helper/constants.helper';
import { auth } from '@/helper/firebaseUtil/firebaseConfig';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { getUserObject, UserStateAtom } from '@/state/atoms/users.atom';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';

export function useLoginMutation() {
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);
  const [userData, setUserData] = useRecoilState(UserStateAtom);
  const router = useRouter();
  const [userLogin, { loading: loginLoading, error: loginError }] = useMutation(USER_LOGIN, {
    client: userClient
  });
  async function loginUser() {
    sessionStorage.setItem('tokenF', auth?.currentUser?.accessToken);
    let isError = false;
    const res = await userLogin({
      context: {
        headers: {
          Authorization: auth?.currentUser?.accessToken
            ? `Bearer ${auth?.currentUser?.accessToken}`
            : ''
        }
      }
    }).catch((err) => {
      console.log(err);
      isError = !!err;
      console.log(sessionStorage.getItem('tokenF'));
      return setToastMsg({ type: 'danger', message: 'Login Error' });
    });

    if (isError) return;

    if (res?.data?.login?.status === USER_STATUS.disable)
      return setToastMsg({ type: 'danger', message: 'Login Error' });

    setUserData(getUserObject(res?.data?.login));
    sessionStorage.setItem('loggedUser', JSON.stringify(res?.data?.login));
    localStorage.setItem(GIBBERISH_VALUE_FOR_LOGIN_STATE, GIBBERISH_VALUE_FOR_LOGIN_STATE);

    if (!!res?.data?.login?.is_verified) {
      router.push('/learning-spaces');
      // setTimeout(() => {
      // }, 1500);
      return;
    }

    return router.push('/learning-spaces');
    return router.push('/account-setup');
  }

  return {
    loginUser
  };
}
