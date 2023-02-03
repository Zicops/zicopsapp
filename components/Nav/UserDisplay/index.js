import { GET_USER_DETAIL, userQueryClient } from '@/api/UserQueries';
import { getUserData } from '@/helper/loggeduser.helper';
import { parseJson } from '@/helper/utils.helper';
import { getUserDetailsObj, UserDataAtom } from '@/state/atoms/global.atom';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { IsUpdatedAtom, UserStateAtom } from '@/state/atoms/users.atom';
import { useLazyQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { truncateTo16 } from '../Logic/nav.helper';
import styles from '../nav.module.scss';
import RightDropDownMenu from '../RightDropDownMenu';

const UserDisplay = () => {
  const [loadUserData] = useLazyQuery(GET_USER_DETAIL, {
    client: userQueryClient
  });

  const [userProfileData, setUserProfileData] = useRecoilState(UserStateAtom);
  const [userDataGlobal, setUserDataGlobal] = useRecoilState(UserDataAtom);
  const [isUpdate, setIsUpdate] = useRecoilState(IsUpdatedAtom);
  const [fullName, setFullName] = useState(
    `${userProfileData?.first_name} ${userProfileData?.last_name}`
  );
  const router = useRouter();

  const [lspName, setLspName] = useState('');
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);

  useEffect(() => {
    if (!isUpdate) return;
    setFullName(`${userProfileData?.first_name || ''} ${userProfileData?.last_name || ''}`);
    setIsUpdate(false);
  }, [isUpdate, userProfileData?.first_name, userProfileData?.last_name]);

  useEffect(() => {
    const lspName = sessionStorage?.getItem('lsp_name');
    if (!lspName) return;
    if (!userProfileData?.id?.length) {
      setLspName(lspName);
      return loadAndSetUserData();
    }
    if (userProfileData?.isUserUpdated) {
      setLspName(lspName);
      return loadAndSetUserData();
    }

    return setLspName(lspName);
  }, [userProfileData]);

  async function loadAndSetUserData() {
    const data = getUserData();
    const userId = data?.id;
    if (!userId) return;
    const userData = await loadUserData({ variables: { user_id: [userId] } }).catch((err) => {
      console.log(err);
    });
    if (userData?.error) return console.log('User data load error');
    const basicInfo = userData?.data?.getUserDetails?.[0];

    setFullName(`${basicInfo?.first_name} ${basicInfo?.last_name}`);
    setUserProfileData((prevValue) => ({
      ...prevValue,
      ...basicInfo,
      photoUrl: basicInfo?.photoUrl,
      isUserUpdated: false
    }));
  }

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

  useEffect(() => {
    const user_lsp_id = parseJson(sessionStorage?.getItem('lspData'))?.user_lsp_id || null;
    const loggedUserData = parseJson(sessionStorage?.getItem('loggedUser')) || null;
    setUserDataGlobal({
      ...userDataGlobal,
      userDetails: getUserDetailsObj({ ...userProfileData, ...loggedUserData, user_lsp_id })
    });
  }, [userProfileData]);

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
            <div className={styles.name}>{fullName ? truncateTo16(`${fullName}`) : ''}</div>
            <div className={styles.desg}>{lspName || 'Zicops'}</div>
          </div>
        </div>
        <RightDropDownMenu />
      </div>
    </>
  );
};

export default UserDisplay;
