import { userClient, USER_LOGIN } from '@/api/UserMutations';
import { USER_STATUS } from '@/helper/constants.helper';
import { auth } from '@/helper/firebaseUtil/firebaseConfig';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { getUserObject, UserStateAtom } from '@/state/atoms/users.atom';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { truncateTo16 } from '../Logic/nav.helper';
import styles from '../nav.module.scss';
import RightDropDownMenu from '../RightDropDownMenu';

const UserDisplay = () => {
  const [userProfileData, setUserProfileData] = useRecoilState(UserStateAtom);
  // const [userDataGlobal, setUserDataGlobal] = useRecoilState(UserDataAtom);
  const router = useRouter();
  const [userLogin] = useMutation(USER_LOGIN, { client: userClient });
  const [fullName, setFullName] = useState('');
  const [lspName, setLspName] = useState('');
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);
  // const { getLoggedUserInfo } = useUserCourseData();

  useEffect(() => {
    const lspName = sessionStorage?.getItem('lsp_name');
    if (!lspName) return;
    setLspName(lspName);
    if (!userProfileData?.id) return;
    if (userProfileData?.isUserUpdated) {
      setFullName(`${userProfileData?.first_name || ''} ${userProfileData?.last_name || ''}`);
      return;
    }
    if (!fullName?.length) {
      setFullName(`${userProfileData?.first_name || ''} ${userProfileData?.last_name || ''}`);
      return;
    }
    // if (!userProfileData?.id?.length) {
    //   console.log('calledss')
    //   setLspName(lspName);
    //   return loadAndSetUserData();
    // }
    // if (userProfileData?.isUserUpdated) {
    //   setLspName(lspName);
    //   return loadAndSetUserData();
    // }
    // if (userProfileData?.id) {
    //   setFullName(`${userProfileData?.first_name || ''} ${userProfileData?.last_name || ''}`);
    //   return setLspName(lspName);
    // }
  }, [userProfileData]);

  useEffect(() => {
    if (userProfileData?.email) return;

    loginUser();

    async function loginUser() {
      if (!auth?.currentUser?.accessToken) return router.push('/login');

      for (let i = 0; i < 4; i++) {
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

        if (isError) break;

        if (res?.data?.login?.status === USER_STATUS.disable) {
          router.push('/login');
          setToastMsg({ type: 'danger', message: 'Something went wrong' });
          break;
        }

        setUserProfileData(getUserObject(res?.data?.login));
        sessionStorage.setItem('loggedUser', JSON.stringify(res?.data?.login));

        if (!!res?.data?.login?.is_verified) break;
      }
    }
  }, [userProfileData?.email]);

  // async function loadAndSetUserData() {
  //   const userData = await getLoggedUserInfo();
  //   const basicInfo = userData;
  //   console.log('calledss')
  //   setUserProfileData((prevValue) => ({
  //     ...prevValue,
  //     ...basicInfo,
  //     photo_url: basicInfo?.photo_url,
  //     isUserUpdated: false
  //   }));
  // }

  // //refill the  recoil values
  // useEffect(async () => {
  //   if (!userProfileData?.first_name && !userProfileData?.last_name) {
  //     const data = getUserData();
  //     const userId = data?.id;
  //     // const userId = [];
  //     // userId.push(data?.id);
  //     const userData = await loadUserData({ variables: { user_id: [userId] } }).catch((err) => {
  //       console.log(err);
  //     });
  //     if (userData?.error) return console.log('User data load error');
  //     const basicInfo = userData?.data?.getUserDetails[0];

  //     // const { user_id } = JSON.parse(sessionStorage.getItem('lspData'));
  //     // const resData = await loadUserData({ variables: { user_id: user_id } }).catch((err) => {
  //     //   console.log(err);
  //     //   return setToastMsg({ type: 'danger', message: 'Error while retriveinng user data' });
  //     // });

  //     // console.log(resData?.data);
  //     // const userData = resData?.data?.getUserDetails;
  //     setUserProfileData((prevValue) => ({
  //       ...prevValue,
  //       ...data,
  //       photoUrl: basicInfo?.photoUrl
  //     }));
  //     setFullName(`${data?.first_name} ${data?.last_name}`);
  //     return;
  //   }
  // }, []);

  // useEffect(() => {
  //   const user_lsp_id = parseJson(sessionStorage?.getItem('lspData'))?.user_lsp_id || null;
  //   const loggedUserData = parseJson(sessionStorage?.getItem('loggedUser')) || null;
  //   setUserDataGlobal({
  //     ...userDataGlobal,
  //     userDetails: getUserDetailsObj({ ...userProfileData, ...loggedUserData, user_lsp_id })
  //   });
  // }, [userProfileData]);

  //update value in sessionStorage
  let userGender = userProfileData?.gender?.toLowerCase();

  return (
    <>
      <div className={styles.profile}>
        <div
          className={styles.profileInnerContainer}
          onClick={() => {
            router.push('/my-profile?tabName=About', '/my-profile');
          }}>
          <div className={styles.profilepic}>
            <img
              src={`${
                userProfileData?.photo_url
                  ? userProfileData?.photo_url
                  : `/images/Avatars/${userGender}Profile.png`
              }`}
            />
          </div>

          <div className={styles.profilename}>
            <div className={styles.name}>
              {!userProfileData?.id ? '' : truncateTo16(`${fullName}`)}
            </div>
            <div className={styles.desg}>{lspName || 'Zicops'}</div>
          </div>
        </div>
        <RightDropDownMenu />
      </div>
    </>
  );
};

export default UserDisplay;
