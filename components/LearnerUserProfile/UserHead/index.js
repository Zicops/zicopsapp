import UploadAndPreview from '@/components/common/FormComponents/UploadAndPreview';
import useHandleAddUserDetails from '@/components/LoginComp/Logic/useHandleAddUser';
import { getUserData } from '@/helper/loggeduser.helper';
import { IsUpdatedAtom, UsersOrganizationAtom, UserStateAtom } from '@/state/atoms/users.atom';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import styles from '../learnerUserProfile.module.scss';
const UserHead = () => {
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

  useEffect(() => {
    if (!userProfileData?.first_name && !userProfileData?.last_name) {
      const userData = getUserData();
      const data = JSON.parse(sessionStorage.getItem('userAccountSetupData'));
      setUserAccountdata({ ...data });
      setUserProfiledata({ ...userData });
      setFullName(`${userData?.first_name} ${userData?.last_name}`);
      return;
    }
  }, []);

  useEffect(() => {
    setImage(userProfileData?.photo_url ? userProfileData?.photo_url : '/images/swagDP.jpg');
  }, [userProfileData?.photo_url]);

  return (
    <div className={`${styles.userHead}`}>
      <div className={`${styles.editIcon}`}>
        <img src="/images/svg/edit.svg" />
      </div>
      <div className={`${styles.userImageContainer}`}>
        <div className={`${styles.userImage}`}>
          <img
            src={`${
              userProfileData?.photo_url ? userProfileData?.photo_url : '/images/swagDP.jpg'
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
            console.log(updatedFile);
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
          ? `${userAccountData?.organization_role} at ${userAccountData?.organization_name}`
          : ''}
      </div>
    </div>
  );
};

export default UserHead;
