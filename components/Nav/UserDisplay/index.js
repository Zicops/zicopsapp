import { GET_USER_DETAIL, userQueryClient } from '@/api/UserQueries';
import { getUserData } from '@/helper/loggeduser.helper';
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
  const [isUpdate, setIsUpdate] = useRecoilState(IsUpdatedAtom);
  const [fullName, setFullName] = useState(
    `${userProfileData?.first_name} ${userProfileData?.last_name}`
  );
  const router = useRouter();

  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);

  useEffect(() => {
    if (!isUpdate) return;
    setFullName(`${userProfileData?.first_name} ${userProfileData?.last_name}`);
    setIsUpdate(false);
    // console.log(userProfileData);
  }, [isUpdate]);

  //refill the  recoil values
  useEffect(async () => {
    if (!userProfileData?.first_name && !userProfileData?.last_name) {
      const data = getUserData();
      const userData = await loadUserData({ variables: { user_id: data?.id } }).catch((err) => {
        console.log(err);
      });
      const basicInfo = userData?.data?.getUserDetails;

      // const { user_id } = JSON.parse(sessionStorage.getItem('lspData'));
      // const resData = await loadUserData({ variables: { user_id: user_id } }).catch((err) => {
      //   console.log(err);
      //   return setToastMsg({ type: 'danger', message: 'Error while retriveinng user data' });
      // });

      // console.log(resData?.data);
      // const userData = resData?.data?.getUserDetails;
      setUserProfileData((prevValue) => ({
        ...prevValue,
        ...data,
        photoUrl: basicInfo?.photoUrl
      }));
      setFullName(`${data?.first_name} ${data?.last_name}`);
      return;
    }
  }, []);

  //update value in sessionStorage

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
                userProfileData?.photo_url ? userProfileData?.photo_url : '/images/swagDP.jpg'
              }`}
            />
          </div>

          <div className={styles.profilename}>
            <div className={styles.name}>{fullName ? truncateTo16(`${fullName}`) : ''}</div>
            <div className={styles.desg}>Zicops</div>
          </div>
        </div>
        <RightDropDownMenu />
      </div>
    </>
  );
};

export default UserDisplay;
