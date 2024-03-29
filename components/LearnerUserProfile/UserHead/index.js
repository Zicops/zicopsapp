import { GET_USER_DETAIL, userQueryClient } from '@/api/UserQueries';
import UploadAndPreview from '@/components/common/FormComponents/UploadAndPreview';
import useHandleAddUserDetails from '@/components/LoginComp/Logic/useHandleAddUser';
import useUserCourseData from '@/helper/hooks.helper';
import { UsersOrganizationAtom, UserStateAtom } from '@/state/atoms/users.atom';
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
  const [userProfileData, setUserProfiledata] = useRecoilState(UserStateAtom);
  const [userAccountData, setUserAccountdata] = useRecoilState(UsersOrganizationAtom);
  const [fullName, setFullName] = useState('');

  const { updateAboutUser } = useHandleAddUserDetails();
  const { getLoggedUserInfo } = useUserCourseData();

  //used to not immedialty update the full name state

  useEffect(async () => {
    if(!userProfileData?.id) return ;
    if (userProfileData?.isUserUpdated) {
      setFullName(`${userProfileData?.first_name || ''} ${userProfileData?.last_name || ''}`);
      setUserProfiledata((prev) => ({...prev, isUserUpdated: false}));
      return ;
    }
    if(!fullName?.length){
      setFullName(`${userProfileData?.first_name || ''} ${userProfileData?.last_name || ''}`);
      return ;
    }
  }, [userProfileData]);

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

      <div className={`${styles.userName}`}>{userProfileData?.id ? `${fullName}` : ''}</div>
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
