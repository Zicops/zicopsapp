// import Image from 'next/image';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from './learningSpaces.module.scss';
const LspCard = ({ image, website, lspName, lspId , path, isDisabled=false}) => {
  const router = useRouter();
  const onHandleLsp = () => {
    sessionStorage.setItem('lsp_id',lspId );
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
