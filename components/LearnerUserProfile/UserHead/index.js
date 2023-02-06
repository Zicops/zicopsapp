import { GET_USER_DETAIL, userQueryClient } from '@/api/UserQueries';
import UploadAndPreview from '@/components/common/FormComponents/UploadAndPreview';
import useHandleAddUserDetails from '@/components/LoginComp/Logic/useHandleAddUser';
import { getUserData } from '@/helper/loggeduser.helper';
import { IsUpdatedAtom, UsersOrganizationAtom, UserStateAtom } from '@/state/atoms/users.atom';
import { useLazyQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import styles from '../learnerUserProfile.module.scss';
const UserHead = () => {
  const [loadUserData] = useLazyQuery(GET_USER_DETAIL, {
    client: userQueryClient
  });
  const [isOpen, setIsopen] = useState(false);
  const [image, setImage] = useState(null);
  const [isUpdate, setIsUpdate] = useRecoilState(IsUpdatedAtom);
  const [userProfileData, setUserProfiledata] = useRecoilState(UserStateAtom);
  const [userAccountData, setUserAccountdata] = useRecoilState(UsersOrganizationAtom);
  const [fullName, setFullName] = useState(
    `${userProfileData?.first_name} ${userProfileData?.last_name}`
  );

  const { updateAboutUser } = useHandleAddUserDetails();

  //used to not immedialty update the Full name state
  useEffect(() => {
    if (!isUpdate) return;
    setFullName(`${userProfileData?.first_name} ${userProfileData?.last_name}`);
    sessionStorage.setItem('loggedUser', JSON.stringify({ ...userProfileData }));
    sessionStorage.setItem('userAccountSetupData', JSON.stringify({ ...userAccountData }));
    setIsUpdate(false);
  }, [isUpdate]);

  useEffect(async () => {
    if (!userProfileData?.first_name && !userProfileData?.last_name) {
      const data = getUserData();
      // const userId = [];
      // userId.push(data?.id);
      const userId = data?.id;
      const userData = await loadUserData({ variables: { user_id: [userId] } }).catch((err) => {
        console.log(err);
      });
      if (userData?.error) return console.log('User data load error');
      const basicInfo = userData?.data?.getUserDetails[0];
      // console.log(basicInfo);

      const orgData = JSON.parse(sessionStorage.getItem('userAccountSetupData'));
      setUserAccountdata((prevValue) => ({ ...prevValue, ...orgData }));
      setUserProfiledata((prevValue) => ({
        ...prevValue,
        ...data,
        photoUrl: basicInfo?.photoUrl
      }));
      setFullName(`${data?.first_name} ${data?.last_name}`);
      return;
    }
  }, []);

  let userGender = userProfileData?.gender?.toLowerCase();
  useEffect(() => {
    setImage(
      userProfileData?.photo_url
        ? userProfileData?.photo_url
        : `/images/Avatars/${userGender}Profile.png`
    );
  }, [userProfileData?.photo_url]);

  return (
    <div className={`${styles.userHead}`}>
      {/* <div className={`${styles.editIcon}`}>
        <img src="/images/svg/edit.svg" />
      </div> */}
      <div className={`${styles.userImageContainer}`}>
        <div className={`${styles.userImage}`}>
          <img
            src={`${
              userProfileData?.photo_url
                ? userProfileData?.photo_url
                : `/images/Avatars/${userGender}Profile.png`
            }`}
          />
        </div>
        <div className={`${styles.editFillIcon}`} onClick={() => setIsopen(true)}>
          <img src="/images/svg/edit-black.svg" />
        </div>
      </div>

      {isOpen && (
        <UploadAndPreview
          inputName={'profile-image'}
          isRemove={true}
          // handleChange={setImage}
          initialImage={image}
          handleUpdateImage={async (updatedFile) => {
            await updateAboutUser(updatedFile);
            setIsopen(false);
          }}
          closePopUp={() => {
            setIsopen(false);
          }}
        />
      )}

      <div className={`${styles.userName}`}>{fullName ? `${fullName}` : ''}</div>
      <div className={`${styles.userRole}`}>
        {userAccountData?.organization_role
          ? `${userAccountData?.organization_role} at ${
              userAccountData?.organization_name || 'Zicops'
            }`
          : ''}
      </div>
    </div>
  );
};

export default UserHead;
