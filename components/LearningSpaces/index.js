import Image from 'next/image';
import React, { useEffect, useState } from 'react';
// import LoginHeadOne from '../Login/LoginHeadOne';
import AddLsp from './AddLsp';
import styles from './learningSpaces.module.scss';
import LspCard from './LspCard';
import { useLazyQuery } from '@apollo/client';
import { useRecoilState, useRecoilValue } from 'recoil';
import LoginHeadOne from '../ZicopsLogin/LoginHeadOne';
import { GET_LSP_DETAILS, GET_USER_LEARNINGSPACES } from '@/api/UserQueries';
import { userClient } from '@/api/UserMutations';
import { useRouter } from 'next/router';
import { USER_MAP_STATUS } from '@/helper/constants.helper';
const LearningSpaces = () => {
  const { asPath } = useRouter();
  const origin =
    typeof window !== 'undefined' && window.location.origin ? window.location.origin : '';

  const URL = `${origin}${asPath}`;
  const domainArr = [
    'http://localhost:3000/learning-spaces',
    'https://demo.zicops.com/learning-spaces',
    'https://zicops.com/learning-spaces'
  ];
  const [lspIds, setLspIds] = useState([]);
  const [lspsDetails, setLspsDetails] = useState([]);
  const [lspStatus, setLspStatus] = useState([]);
  const [getUserLsp] = useLazyQuery(GET_USER_LEARNINGSPACES, {
    client: userClient
  });
  const [getLspDetails] = useLazyQuery(GET_LSP_DETAILS, {
    client: userClient
  });
  const UserLsp = async () => {
    let isError = false;
    const userData = JSON.parse(sessionStorage.getItem('loggedUser'));
    console.log(userData);
    const res = await getUserLsp({
      variables: { user_id: userData?.id }
    }).catch((err) => {
      console.log(err);
      // isError = !!err;
      // return setToastMsg({ type: 'danger', message: 'Login Error' });
    });
    const _lspArr = [];
    const _lspStatus = [];
    res?.data?.getUserLsps?.map((data) => {
      if (data.lsp_id === 'd8685567-cdae-4ee0-a80e-c187848a760e') return;
      _lspArr.push(data.lsp_id);
      _lspStatus.push(data.status);
    });
    setLspIds(_lspArr);
    setLspStatus(_lspStatus);
  };

  const LspDetails = async () => {
    let isError = false;
    console.log(lspIds);
    const res = await getLspDetails({
      variables: { lsp_ids: lspIds }
    }).catch((err) => {
      console.log(err);
      // isError = !!err;
      // return setToastMsg({ type: 'danger', message: 'Login Error' });
    });
    setLspsDetails(res?.data?.getLearningSpaceDetails);
    console.log(res?.data?.getLearningSpaceDetails);
  };

  useEffect(() => {
    if (!domainArr.includes(URL)) return;
    UserLsp();
  }, []);
  useEffect(() => {
    if (!domainArr.includes(URL)) return;
    if (!lspIds.length) return;
    LspDetails();
    console.log(lspStatus);
  }, [lspIds]);
  return (
    <div className={`${styles.loginMainContainer}`}>
      <div className={`${styles.ZicopsLogo}`}>
        {/* <Link href="/home"> */}
        <Image src="/images/svg/asset-6.svg" alt="zicops logo" width={180} height={40} />
        {/* </Link> */}
      </div>
      <div className={`${styles.zicops_login}`}>
        <LoginHeadOne
          showImage={false}
          heading={'Welcome to Zicops'}
          sub_heading={'Select your Learning space'}
        />
        <div className={`${styles.login_body}`}>
          {lspsDetails?.map((data, index) => (
            <LspCard
              image={data.logo_url || '/images/svg/amdocs.svg'}
              path={lspStatus?.[index].toLowerCase() === USER_MAP_STATUS.invite ? '/account-setup' : '/'}
              website="www.amdocs.zicops.com"
              status={data.status}
              isDisabled={lspStatus?.[index].toLowerCase() === USER_MAP_STATUS.disable}
              lspId={data.lsp_id}
              lspName={data.name}
              orgId={data.org_id }
              ouId={data.ou_id}
            />
          ))}
        </div>
      </div>
      <div className={`${styles.login_Footer}`}>
        <div className={`${styles.foot_text}`}>
          These learning spaces are empowered by zicops learning technology pvt ltd
        </div>
      </div>
    </div>
  );
};

export default LearningSpaces;
