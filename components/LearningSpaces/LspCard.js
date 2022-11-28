// import Image from 'next/image';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from './learningSpaces.module.scss';
import { useRecoilState } from 'recoil';
import { UsersOrganizationAtom } from '@/state/atoms/users.atom';
const LspCard = ({ image, website, lspName, lspId , orgId, ouId, path, isDisabled=false , userLspId}) => {
  const router = useRouter();
  const [userOrgData ,  setUserOrgData] = useRecoilState(UsersOrganizationAtom);
  const onHandleLsp = () => {
    if (isDisabled) return;
    sessionStorage.setItem('lsp_id',lspId );
    setUserOrgData((prevValue) => ({...prevValue , lsp_id: lspId}));
    sessionStorage.setItem('lsp_name',lspName);
    sessionStorage.setItem('org_id',orgId );
    sessionStorage.setItem('ou_id',ouId );
    sessionStorage.setItem('user_lsp_id',userLspId)
    router.push(path)
  }
  return (
    <div className={`${styles.lspContainer} `} onClick={onHandleLsp}>
      <p className={`${styles.lspWebsiteName}`}>{website}</p>
      <div className={`${styles.lspCardMain} ${isDisabled  ? styles.lspCardDisable : "" }`}>
        <div className={`${styles.lspCardImage} ${isDisabled  ? styles.lspImageDisable : "" }`}>
          <img src={image} alt="" height={50} width={60} />
        </div>
      </div>
      <p className={`${styles.lspName} ${isDisabled ? styles.lspNameDisable : "" }`}>{lspName}</p>
    </div>
  );
};

export default LspCard;
