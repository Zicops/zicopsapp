import Image from 'next/image';
import React, { useEffect, useState } from 'react';
// import LoginHeadOne from '../Login/LoginHeadOne';
import AddLsp from './AddLsp';
import styles from './learningSpaces.module.scss';
import LspCard from './LspCard';
import { useLazyQuery } from '@apollo/client';
import { useRecoilState, useRecoilValue } from 'recoil';
import LoginHeadOne from '../ZicopsLogin/LoginHeadOne';
import {
  GET_LSP_DETAILS,
  GET_USER_LEARNINGSPACES,
  GET_ORGANIZATIONS_DETAILS
} from '@/api/UserQueries';

import { userClient } from '@/api/UserMutations';
import { useRouter } from 'next/router';
import { USER_MAP_STATUS } from '@/helper/constants.helper';
import { UserDataAtom } from '@/state/atoms/global.atom';
const LearningSpaces = () => {
  const { asPath } = useRouter();

  const [userGlobalData,setUserGlobalData] = useRecoilState(UserDataAtom); 
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
  const [userDetails, setUserDetails] = useState({});
  const [orgDetails, setOrgDetails] = useState([]);
  const [orgIds, setOrgIds] = useState([]);
  const [orglspData, setOrglspData] = useState([]);
  const [userLspIds , setUserLspIds] = useState([]);

  const [getUserLsp] = useLazyQuery(GET_USER_LEARNINGSPACES, {
    client: userClient
  });
  const [getLspDetails] = useLazyQuery(GET_LSP_DETAILS, {
    client: userClient
  });
  const [getOrgDetails] = useLazyQuery(GET_ORGANIZATIONS_DETAILS, {
    client: userClient
  });

  const UserLsp = async () => {
    const userData = JSON.parse(sessionStorage.getItem('loggedUser'));
    setUserDetails(userData);
    console.log(userData);
    const res = await getUserLsp({
      variables: { user_id: userData?.id }
    }).catch((err) => {
      console.error(err);
    });
    const _lspArr = [];
    const _lspStatus = [];
    const _userLspIds = [];
    res?.data?.getUserLsps?.map((data) => {
      if (data.lsp_id === 'd8685567-cdae-4ee0-a80e-c187848a760e') return;
      _lspArr.push(data.lsp_id);
      _lspStatus.push(data.status);
      _userLspIds.push(data?.user_lsp_id);
    });
    setLspIds(_lspArr);
    setLspStatus(_lspStatus);
    setUserLspIds(_userLspIds);
    console.log(_userLspIds,'lspStatus');
  };

  const LspDetails = async () => {
    const res = await getLspDetails({
      variables: { lsp_ids: lspIds }
    }).catch((err) => {
      console.error(err);
    });
    setLspsDetails(res?.data?.getLearningSpaceDetails);
    const _orgArr = [];
    res?.data?.getLearningSpaceDetails?.map((data) => {
      if(data.is_default) return
      _orgArr.push(data.org_id);
    });
    setOrgIds(_orgArr);
    console.log(res?.data?.getLearningSpaceDetails);
  };

  const OrgDetails = async () => {
    const res = await getOrgDetails({
      variables: { org_ids: orgIds }
    }).catch((err) => {
      console.error(err);
    });
    setOrgDetails(res?.data?.getOrganizations);
    console.log(res?.data);
  };


  useEffect(() => {
    setUserGlobalData((prevValue) => ({...prevValue,isPrefAdded:false}));
    if (!domainArr.includes(URL)) return;
    UserLsp();
  }, []);

  useEffect(() => {
    if (!domainArr.includes(URL)) return;
    if (!lspIds.length) return;
    LspDetails();
  }, [lspIds]);

  useEffect(() => {
    if (!orgIds.length) return;
    OrgDetails();
  }, [orgIds]);

  useEffect(() => {
    if (!orgDetails.length) return;
    const _newArr = orgDetails?.map((item, i) => Object.assign({}, item, lspsDetails[i]));
    setOrglspData(_newArr);
  }, [orgDetails]);

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
          {orglspData?.map((data, index) => (
            <LspCard
              image={data.profile_url || '/images/zicopsIcon.png'}
              path={
                lspStatus?.[index].toLowerCase() === USER_MAP_STATUS.invite ? '/account-setup' : '/'
              }
              website={data.subdomain}
              status={data.status}
              isDisabled={lspStatus?.[index].toLowerCase() === USER_MAP_STATUS.disable}
              lspId={data.lsp_id}
              lspName={data.name}
              orgId={data.org_id}
              ouId={data.ou_id}
              userLspId={userLspIds?.[index]}
            />
          ))}
          <>
          {/* only for owners to request for creating new lsp */}
          {/* {userDetails?.role === "Admin" && <AddLsp />} */}
          </>
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
