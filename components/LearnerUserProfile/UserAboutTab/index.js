import styles from '../learnerUserProfile.module.scss';
import SingleUserDetail from '../SingleUserDetail';
import { userData, orgData, profilePref, subCategory } from '../Logic/userData.helper.js';
import CategoryPreferences from '../CategoryPreferences';
import { useState } from 'react';
import useHandleUserUpdate from '../Logic/useHandleUserUpdate';
import { GET_USER_ORGANIZATIONS, GET_USER_PREFERENCES, userQueryClient } from '@/api/UserQueries';
import { useLazyQuery } from '@apollo/client';
import { useEffect } from 'react';
import PopUp from '@/components/common/PopUp';
import ProfilePreferences from '@/components/LoginComp/ProfilePreferences';
import SubCategoriesPreview from '@/components/LoginComp/SubCategoriesPreview';
import { subCategories } from '@/components/LoginComp/ProfilePreferences/Logic/profilePreferencesHelper';
import useHandleAddUserDetails from '@/components/LoginComp/Logic/useHandleAddUser';
import { useRecoilState } from 'recoil';
import { UsersOrganizationAtom } from '@/state/atoms/users.atom';
import { profilePreferencesData } from '@/components/UserProfile/Logic/userProfile.helper';
import { getUserData } from '@/helper/loggeduser.helper';

const UserAboutTab = () => {
  const [isEditable, setIsEditable] = useState(null);
  const { updateUserOrganizationDetails } = useHandleUserUpdate();
  const { updateAboutUser } = useHandleAddUserDetails();
  const [loadUserPreferences] = useLazyQuery(GET_USER_PREFERENCES, {
    client: userQueryClient
  });
  const [loadUserOrg] = useLazyQuery(GET_USER_ORGANIZATIONS, {
    client: userQueryClient
  });

  const [subCategory, setSubCategory] = useState([]);
  const [isOpen, setIsopen] = useState(false);
  const [currentComponent, setCurrentComponent] = useState(2);
  const [selected, setSelected] = useState([]);
  const [userAccountDetails, setUserAccountDetails] = useRecoilState(UsersOrganizationAtom);

  useEffect(async () => {
    const { id } = getUserData();
    const res = await loadUserPreferences({
      variables: { user_id: id }
    }).catch((err) => {
      console.log(err);
      return;
    });

    const data = res?.data?.getUserPreferences[0];
    // const { user_lsp_id } = JSON.parse(sessionStorage.getItem('lspData'));
    // const prefData = data.filter((item) => {
    //   return item?.user_lsp_id === user_lsp_id;
    // });
    // const prefArr = [];
    // for (let i = 0; i < prefData.length; i++) {
    //   for (let j = 0; j < subCategories.length; j++) {
    //     if (prefData[i].sub_category === subCategories[j].name) {
    //       prefArr.push({
    //         ...subCategories[j],
    //         user_preference_id: prefData[i]?.user_preference_id
    //       });
    //     }
    //   }
    // }

    const newArr = subCategories.filter((item) => item.name === data?.sub_category);

    const preferenceArr = newArr.map((item) => ({
      user_preference_id: data?.user_preference_id,
      sub_category: item?.name,
      user_id: data?.user_id,
      user_lsp_id: data?.user_lsp_id,
      ...item
    }));

    if (data) setSubCategory([data]);

    setSelected([...preferenceArr]);

    const resOrg = await loadUserOrg({ variables: { user_id: id } }).catch((err) =>
      console.log(err)
    );

    const orgData = resOrg?.data?.getUserOrganizations[0];
    setUserAccountDetails((prevValue) => ({
      ...prevValue,
      sub_category: data?.sub_category,
      ...orgData
    }));
  }, []);
  return (
    <div className={`${styles.userAboutTab}`}>
      <SingleUserDetail
        isEditable={isEditable === 1}
        toggleEditable={() => setIsEditable((prev) => (prev === 1 ? null : 1))}
        headingText={'Personal Details'}
        userData={userData}
        updateHandle={updateAboutUser}
      />
      <SingleUserDetail
        isEditable={isEditable === 2}
        toggleEditable={() => setIsEditable((prev) => (prev === 2 ? null : 2))}
        headingText={'Organization Details'}
        userData={orgData}
        isOrg={true}
        updateHandle={updateUserOrganizationDetails}
      />
      <SingleUserDetail
        isEditable={isEditable === 3}
        toggleEditable={() => setIsopen(!isOpen)}
        headingText={'Profile Preferences'}
        userData={profilePref}
        isOrg={true}
      />
      {/* {userData.map((v) => (
        <CategoryPreferences userData={v} />
      ))} */}
      <CategoryPreferences subCategoryData={subCategory} />
      <PopUp popUpState={[isOpen, setIsopen]} isFooterVisible={false}>
        <div className={`${styles.container}`}>
          {currentComponent === 2 && (
            <ProfilePreferences
              hideBack={true}
              selected={selected}
              setSelected={setSelected}
              setCurrentComponent={setCurrentComponent}
              customStyle={[styles.prefContainer, styles.prefCat, styles.prefNav]}
            />
          )}
          {currentComponent === 3 && (
            <SubCategoriesPreview
              isUpdate={true}
              selected={selected}
              setSelected={setSelected}
              setCurrentComponent={setCurrentComponent}
              customStyle={[styles.prefContainer, styles.prefGrid, styles.prefNav]}
              popUpClose={setIsopen}
            />
          )}
        </div>
      </PopUp>
    </div>
  );
};

export default UserAboutTab;
