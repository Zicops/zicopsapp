import {
  GET_ORGANIZATIONS_DETAILS,
  GET_USER_ORGANIZATIONS,
  GET_USER_PREFERENCES,
  userQueryClient
} from '@/api/UserQueries';
import PopUp from '@/components/common/PopUp';
import useHandleAddUserDetails from '@/components/LoginComp/Logic/useHandleAddUser';
import ProfilePreferences from '@/components/LoginComp/ProfilePreferences';
import SubCategoriesPreview from '@/components/LoginComp/SubCategoriesPreview';
import { loadQueryDataAsync } from '@/helper/api.helper';
import { USER_LSP_ROLE } from '@/helper/constants.helper';
import { getUserData } from '@/helper/loggeduser.helper';
import { UserDataAtom } from '@/state/atoms/global.atom';
import { UsersOrganizationAtom } from '@/state/atoms/users.atom';
import { useLazyQuery } from '@apollo/client';
import { useRouter } from 'next/router';
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
  const [baseSubCategory, setBaseSubCategory] = useState('');
  const [isOpen, setIsopen] = useState(false);
  const [currentComponent, setCurrentComponent] = useState(2);
  const [selected, setSelected] = useState([]);
  const [userAccountDetails, setUserAccountDetails] = useRecoilState(UsersOrganizationAtom);

  useEffect(async () => {
    const { id } = getUserData();
    if (!id) return;
    const lspId = sessionStorage.getItem('lsp_id');
    const lspName = sessionStorage?.getItem('lsp_name');
    const userLspId = sessionStorage?.getItem('user_lsp_id');
    const userLspRole = sessionStorage?.getItem('user_lsp_role');
    // const userPreferences = await getUserPreferences(userLspId);
    const userPreferences = userDataGlobal?.preferences;
    // const preferenceData = userPreferences.slice(0, 5);
    const preferenceData = userPreferences.filter((item) => item?.is_active);
    // console.log(preferenceData, userPreferences);

    // if (!!preferenceData?.length) setSubCategory([...preferenceData]);

    // if(!userDataGlobal?.preferences?.length) return

    setSelected(
      preferenceData?.map((item) => {
        return {
          ...item,
          name: item?.sub_category,
          category: item?.catData?.Name,
          isSelected: false
        };
      }) || []
    );

    const baseSubcategory = preferenceData.filter((item) => item?.is_base);
    // console.log(baseSubcategory);

    const resOrg = await loadUserOrg({ variables: { user_id: id } }).catch((err) =>
      console.log(err)
    );

    const orgData = resOrg?.data?.getUserOrganizations?.filter(
      (orgMap) => orgMap?.user_lsp_id === userLspId
    );

    const orgId = orgData?.[0]?.organization_id;

    const orgDetails = await loadQueryDataAsync(
      GET_ORGANIZATIONS_DETAILS,
      { org_ids: [orgId] },
      {},
      userQueryClient
    );
    // console.log(orgDetails?.getOrganizations);

    const _orgDetails = orgDetails?.getOrganizations || null;
    if (!_orgDetails) return;
    setUserAccountDetails((prevValue) => ({
      ...prevValue,
      sub_category: baseSubcategory?.[0]?.sub_category,
      learningSpace_name: lspName,

      organization_name: _orgDetails?.[0]?.name,
      user_lsp_role: userLspRole,
      ...orgData?.[0]
    }));
  }, [userDataGlobal?.preferences]);

  const router = useRouter();

  useEffect(() => {
    const basepref = router.query?.basepref;
    if (!basepref) return;
    if (basepref) {
      setIsopen(true);
      setCurrentComponent(3);
      setBaseSubCategory(basepref);
    }
  }, [router.query]);

  return (
    <div className={`${styles.userAboutTab}`}>
      <SingleUserDetail
        isEditable={isEditable === 1}
        toggleEditable={() => setIsEditable((prev) => (prev === 1 ? null : 1))}
        headingText={'Personal Details'}
        userData={userData}
        updateHandle={updateAboutUser}
      />
      {!(userAccountDetails?.user_lsp_role === USER_LSP_ROLE.vendor) && (
        <>
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
          <PopUp positionLeft="50%" popUpState={[isOpen, setIsopen]} isFooterVisible={false}>
            <div className={`${styles.container}`}>
              {currentComponent === 2 && (
                <ProfilePreferences
                  hideBack={true}
                  selected={selected}
                  setSelected={setSelected}
                  setCurrentComponent={setCurrentComponent}
                  customStyle={[styles.prefContainer, styles.prefCat, styles.prefNav]}
                  customClass={styles.preferences}
                  isLearnerSide={true}
                  closePopUp={setIsopen}
                />
              )}
              {currentComponent === 3 && (
                <SubCategoriesPreview
                  isUpdate={true}
                  basepref={baseSubCategory}
                  selected={selected}
                  setSelected={setSelected}
                  setCurrentComponent={setCurrentComponent}
                  customStyle={[styles.prefContainer, styles.prefGrid, styles.prefNav]}
                  popUpClose={setIsopen}
                />
              )}
            </div>
          </PopUp>
        </>
      )}
    </div>
  );
};

export default UserAboutTab;
