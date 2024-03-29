import { USER_LSP_ROLE } from '@/helper/constants.helper';
import useUserCourseData from '@/helper/hooks.helper';
import { UsersOrganizationAtom } from '@/state/atoms/users.atom';
import { Container, Skeleton } from '@mui/material';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import AccountSetupOrg from './AccountSetupOrg';
import AccountSetupUser from './AccountSetupUser';
import styles from './login.module.scss';
import ProfilePreferences from './ProfilePreferences';
import SubCategoriesPreview from './SubCategoriesPreview';

const LoginComp = () => {
  const [currentComponent, setCurrentComponent] = useState(0);

  const [selected, setSelected] = useState([]);

  const [orgData, setOrgData] = useRecoilState(UsersOrganizationAtom);
  const { OrgDetails } = useUserCourseData();

  const getHeader = () => {
    if (currentComponent === 0) return 'Personal Details';
    if (currentComponent === 1) return 'Organization Details';
    if (currentComponent === 2) return 'Profile Preferences';
    if (currentComponent === 3) return 'Profile Preferences';
  };
  console.log('orgData', orgData);

  useEffect(() => {
    if (orgData?.lsp_logo_url?.length) return;
    OrgDetails(true);
  }, []);

  return (
    // <div style={{width: '100%', height: '100vh', position: 'relative'}}>
    <div className={`${styles.bgContainer}`}>
      <div className={`${styles.header}`}>
        <div className={`${styles.ZicopsLogo}`}>
          {orgData?.lsp_logo_url == null ? (
            <Skeleton height={70} width={120} />
          ) : (
            <img
              src={
                orgData?.lsp_logo_url?.length ? orgData?.lsp_logo_url : '/images/svg/asset-6.svg'
              }
              alt="zicops logo"
            />
          )}
        </div>
        {!(orgData?.user_lsp_role === USER_LSP_ROLE.vendor) && (
          <div className={`${styles.progress_container}`}>
            <div className={`${styles.progress_circle_selected}`} />
            <div
              className={`${
                currentComponent === 0 ? styles.progress_line : styles.progress_line_selected
              }`}
            />
            <div
              className={`${
                currentComponent === 0 ? styles.progress_circle : styles.progress_circle_selected
              }`}
            />
            <div
              className={`${
                currentComponent === 2 || currentComponent === 3
                  ? styles.progress_line_selected
                  : styles.progress_line
              }`}
            />
            <div
              className={`${
                currentComponent === 2 || currentComponent === 3
                  ? styles.progress_circle_selected
                  : styles.progress_circle
              }`}
            />
          </div>
        )}
        <div className={`${styles.account_setup_title}`}>
          <div>Account Setup:</div>
          <p>{getHeader()}</p>
        </div>
      </div>
      <Container maxWidth={'md'} className={`${styles.container}`}>
        {currentComponent === 0 && <AccountSetupUser setCurrentComponent={setCurrentComponent} />}
        {currentComponent === 1 && <AccountSetupOrg setCurrentComponent={setCurrentComponent} />}
        {currentComponent === 2 && (
          <ProfilePreferences
            selected={selected}
            setSelected={setSelected}
            setCurrentComponent={setCurrentComponent}
          />
        )}
        {currentComponent === 3 && (
          <SubCategoriesPreview
            selected={selected}
            setSelected={setSelected}
            setCurrentComponent={setCurrentComponent}
          />
        )}
      </Container>
    </div>
    // </div>
  );
};

export default LoginComp;
