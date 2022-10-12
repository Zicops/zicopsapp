import { GET_USER_ORGANIZATIONS, GET_USER_PREFERENCES, userQueryClient } from '@/api/UserQueries';
import PopUp from '@/components/common/PopUp';
import useHandleAddUserDetails from '@/components/LoginComp/Logic/useHandleAddUser';
import ProfilePreferences from '@/components/LoginComp/ProfilePreferences';
import SubCategoriesPreview from '@/components/LoginComp/SubCategoriesPreview';
import { getUserData } from '@/helper/loggeduser.helper';
import { parseJson } from '@/helper/utils.helper';
import { UserDataAtom } from '@/state/atoms/global.atom';
import { UsersOrganizationAtom } from '@/state/atoms/users.atom';
import { useLazyQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import CategoryPreferences from '../CategoryPreferences';
import styles from '../learnerUserProfile.module.scss';
import useCommonHelper from '../Logic/common.helper';
import useHandleUserUpdate from '../Logic/useHandleUserUpdate';
import { orgData, profilePref, userData } from '../Logic/userData.helper.js';
import SingleUserDetail from '../SingleUserDetail';

const UserAboutTab = () => {
  const userDataGlobal = useRecoilValue(UserDataAtom);

  const [isEditable, setIsEditable] = useState(null);
  const { updateUserOrganizationDetails } = useHandleUserUpdate();
  const { updateAboutUser } = useHandleAddUserDetails();
  const [loadUserPreferences] = useLazyQuery(GET_USER_PREFERENCES, {
    client: userQueryClient
  });
  const [loadUserOrg] = useLazyQuery(GET_USER_ORGANIZATIONS, {
    client: userQueryClient
  });

  const { getUserPreferences } = useCommonHelper();

  const [subCategory, setSubCategory] = useState([]);
  const [isOpen, setIsopen] = useState(false);
  const [currentComponent, setCurrentComponent] = useState(2);
  const [selected, setSelected] = useState([]);
  const [userAccountDetails, setUserAccountDetails] = useRecoilState(UsersOrganizationAtom);

  useEffect(async () => {
    const { id } = getUserData();
    const lspData = parseJson(sessionStorage.getItem('lspData'));

    let data;

    //for first time only...will delete later
    if (!lspData?.user_lsp_id) {
      const res = await loadUserPreferences({
        variables: { user_id: id }
      }).catch((err) => {
        console.log(err);
        return;
      });
      data = res?.data?.getUserPreferences[0];
      console.log(data);
    }

    console.log(lspData, 'lspdata');

    let userLspId = !!lspData?.user_lsp_id ? lspData?.user_lsp_id : data?.user_lsp_id;

    if (!lspData) {
      sessionStorage.setItem(
        'lspData',
        JSON.stringify({ user_id: id, user_lsp_id: data?.user_lsp_id })
      );
    }

    // const userPreferences = await getUserPreferences(userLspId);
    const userPreferences = userDataGlobal?.preferences;
    // const preferenceData = userPreferences.slice(0, 5);
    const preferenceData = userPreferences.filter((item) => item?.is_active);
    // console.log(preferenceData, userPreferences);

    // if (!!preferenceData?.length) setSubCategory([...preferenceData]);

    setSelected([...preferenceData]);

    const baseSubcategory = preferenceData.filter((item) => item?.is_base);
    console.log(baseSubcategory);

    const resOrg = await loadUserOrg({ variables: { user_id: id } }).catch((err) =>
      console.log(err)
    );

    const orgData = resOrg?.data?.getUserOrganizations[0];
    setUserAccountDetails((prevValue) => ({
      ...prevValue,
      sub_category: baseSubcategory[0]?.sub_category,
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
      <CategoryPreferences
        subCategoryData={userDataGlobal?.preferences?.filter((s) => s?.is_active)}
      />
      <PopUp popUpState={[isOpen, setIsopen]} isFooterVisible={false}>
        <div className={`${styles.container}`}>
          {currentComponent === 2 && (
            <ProfilePreferences
              hideBack={true}
              selected={selected}
              setSelected={setSelected}
              setCurrentComponent={setCurrentComponent}
              customStyle={[styles.prefContainer, styles.prefCat, styles.prefNav]}
              customClass={styles.preferences}
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
