// import Image from 'next/image';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from './learningSpaces.module.scss';
import { useRecoilState } from 'recoil';
import { UsersOrganizationAtom } from '@/state/atoms/users.atom';
import { loadQueryDataAsync } from '@/helper/api.helper';
import { GET_USER_LSP_ROLES, userQueryClient } from '@/api/UserQueries';
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
  userId
}) => {
  const router = useRouter();
  const [userOrgData, setUserOrgData] = useRecoilState(UsersOrganizationAtom);
  const onHandleLsp = async () => {
    console.log(logo);
    if (isDisabled) return;

    if (!userLspId && !userId) return;
    const lspRoleArr = await loadQueryDataAsync(
      GET_USER_LSP_ROLES,
      { user_id: userId, user_lsp_ids: [userLspId] },
      {},
      userQueryClient
    );

    // const userLspRole = lspRoleArr?.getUserLspRoles.reduce(function (prev, current) {
    //   return prev.updated_at > current.updated_at ? prev.role : current.role;
    // }, 'learner');

    const lspRoles = lspRoleArr?.getUserLspRoles;
    let userLspRole = 'learner'
    
    if (lspRoleArr?.length > 1) {
      const latestUpdatedRole = lspRoles?.sort((a, b) => a?.updated_at - b?.updated_at);
      userLspRole = latestUpdatedRole?.pop()?.role;
    } else {
      userLspRole = lspRoleArr[0]?.role;
    }
    // const latestUpdatedRole = lspRoleArr?.getUserLspRoles?.sort((a,b) => a?.updated_at - b?.updated_at);

    // const userLspRole = latestUpdatedRole?.pop()?.role ? latestUpdatedRole?.pop()?.role : 'learner';

    sessionStorage.setItem('lsp_id', lspId);
    setUserOrgData((prevValue) => ({ ...prevValue, lsp_id: lspId, logo_url: logo }));
    sessionStorage.setItem('lsp_name', lspName);
    sessionStorage.setItem('org_id', orgId);
    sessionStorage.setItem('ou_id', ouId);
    sessionStorage.setItem('user_lsp_id', userLspId);
    sessionStorage.setItem('user_lsp_role', userLspRole);
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
