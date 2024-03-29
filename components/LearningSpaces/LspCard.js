// import Image from 'next/image';
import useUserCourseData from '@/helper/hooks.helper';
import { getCurrentHost } from '@/helper/utils.helper';
import { FeatureFlagsAtom } from '@/state/atoms/global.atom';
import { UsersOrganizationAtom, UserStateAtom } from '@/state/atoms/users.atom';
import { useRouter } from 'next/router';
import { useRecoilState, useRecoilValue } from 'recoil';
import styles from './learningSpaces.module.scss';
const LspCard = ({
  image,
  website,
  lspName,
  lspId,
  orgId,
  ouId,
  logo,
  path,
  isDisabled = false,
  userLspId,
  userId,
  lspLogo
}) => {
  const router = useRouter();
  const userData = useRecoilValue(UserStateAtom);
  const [userOrgData, setUserOrgData] = useRecoilState(UsersOrganizationAtom);
  const { getUserLspRoleLatest } = useUserCourseData();
  const { isDev } = useRecoilValue(FeatureFlagsAtom);

  const onHandleLsp = async () => {
    if (isDisabled) return;

    if (!userLspId && !userId) return;
    setUserOrgData((prev) => ({ ...prev, logo_url: logo }));
    // const lspRoleArr = await loadQueryDataAsync(
    //   GET_USER_LSP_ROLES,
    //   { user_id: userId, user_lsp_ids: [userLspId] },
    //   {},
    //   userQueryClient
    // );

    // const lspRoles = lspRoleArr?.getUserLspRoles;
    let userLspRole = 'learner';

    // if (lspRoleArr?.length > 1) {
    //   const latestUpdatedRole = lspRoles?.sort((a, b) => a?.updated_at - b?.updated_at);
    //   userLspRole = latestUpdatedRole?.pop()?.role;
    // } else {
    //   userLspRole = lspRoles[0]?.role;
    // }

    // console.log(userLspRole, 'role');

    // if (isDev) {
    userLspRole = await getUserLspRoleLatest(userId, userLspId);
    // }
    // const latestUpdatedRole = lspRoleArr?.getUserLspRoles?.sort((a,b) => a?.updated_at - b?.updated_at);

    // const userLspRole = latestUpdatedRole?.pop()?.role ? latestUpdatedRole?.pop()?.role : 'learner';

    sessionStorage.setItem('lsp_id', lspId);
    setUserOrgData((prevValue) => ({
      ...prevValue,
      lsp_id: lspId,
      logo_url: logo,
      lsp_logo_url: lspLogo,
      user_lsp_role: userLspRole
    }));
    sessionStorage.setItem('lsp_name', lspName);
    sessionStorage.setItem('org_id', orgId);
    sessionStorage.setItem('ou_id', ouId);
    sessionStorage.setItem('user_lsp_id', userLspId);
    sessionStorage.setItem('user_lsp_role', userLspRole);
    sessionStorage.setItem('org_domain', website);

    const currentHost = getCurrentHost();
    if (currentHost !== website && path === '/') {
      const token = sessionStorage.getItem('tokenF');

      window.location.href = `https://${website}/auth-verify/?role=${userLspRole}&lspId=${lspId}&userLspId=${userLspId}&token=${token}`;
      return;
    }

    router.push(path);
  };
  return (
    <div className={`${styles.lspContainer} `} onClick={onHandleLsp}>
      <p className={`${styles.lspWebsiteName}`}>{website}</p>
      <div className={`${styles.lspCardMain} ${isDisabled ? styles.lspCardDisable : ''}`}>
        <div className={`${styles.lspCardImage} ${isDisabled ? styles.lspImageDisable : ''}`}>
          <img src={image} alt="" />
        </div>
      </div>
      <p className={`${styles.lspName} ${isDisabled ? styles.lspNameDisable : ''}`}>{lspName}</p>
    </div>
  );
};

export default LspCard;
