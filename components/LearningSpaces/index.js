import Image from 'next/image';
import { useEffect, useState } from 'react';
// import LoginHeadOne from '../Login/LoginHeadOne';
import { userClient } from '@/api/UserMutations';
import {
  GET_LSP_DETAILS,
  GET_ORGANIZATIONS_DETAILS,
  GET_USER_LEARNINGSPACES
} from '@/api/UserQueries';
import { USER_MAP_STATUS } from '@/helper/constants.helper';
import useUserCourseData from '@/helper/hooks.helper';
import { FeatureFlagsAtom, getUserGlobalDataObj, UserDataAtom } from '@/state/atoms/global.atom';
import { getUserObject, UserStateAtom } from '@/state/atoms/users.atom';
import { useAuthUserContext } from '@/state/contexts/AuthUserContext';
import { useLazyQuery } from '@apollo/client';
import { Skeleton } from '@mui/material';
import Link from 'next/link';
import { useRecoilState, useRecoilValue } from 'recoil';
import LoginHeadOne from '../ZicopsLogin/LoginHeadOne';
import styles from './learningSpaces.module.scss';
import LspCard from './LspCard';
const LearningSpaces = () => {
  const { logOut } = useAuthUserContext();

  const [orgData , setOrgData] = useState(null);

  const [userGlobalData, setUserGlobalData] = useRecoilState(UserDataAtom);
  const [userProfileData, setUserProfileData] = useRecoilState(UserStateAtom);
  const { isDev } = useRecoilValue(FeatureFlagsAtom);
  const skeletonCardCount = isDev ? 1 : 0;

  const [lspIds, setLspIds] = useState([]);
  const [lspsDetails, setLspsDetails] = useState([]);
  const [lspStatus, setLspStatus] = useState([]);

  const { getOrgByDomain } = useUserCourseData();
  const [orgDetails, setOrgDetails] = useState([]);
  const [orgIds, setOrgIds] = useState([]);
  const [orglspData, setOrglspData] = useState([...Array(skeletonCardCount)]);
  const [userLspIds, setUserLspIds] = useState([]);
  const [userDetails, setUserDetails] = useState({});
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
      _lspStatus.push(data?.status?.trim());
      _userLspIds.push(data?.user_lsp_id);
    });
    setLspIds(_lspArr);
    setLspStatus(_lspStatus);
    setUserLspIds(_userLspIds);
  };

  const LspDetails = async () => {
    const res = await getLspDetails({
      variables: { lsp_ids: lspIds }
    }).catch((err) => {
      console.error(err);
    });
    const lsps = res?.data?.getLearningSpaceDetails?.filter((lspData) => !lspData?.is_default);
    if (!lsps?.length) return;
    setLspsDetails([...lsps]);
    const _orgArr = [];
    // res?.data?.getLearningSpaceDetails?.map((data) => {
    //   if (data.is_default) return;
    //   _orgArr.push(data.org_id);
    // });
    lsps?.forEach((lsp) => _orgArr.push(lsp?.org_id));
    setOrgIds(_orgArr);
    // console.log(res?.data?.getLearningSpaceDetails);
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
    setUserGlobalData((prevValue) => ({ ...prevValue, isPrefAdded: false, isOrgAdded: false }));
    // if (!domainArr.includes(URL)) return;
    let orgData = getOrgByDomain();
    setOrgData(orgData);
    UserLsp();
  }, []);

  useEffect(() => {
    // if (!domainArr.includes(URL)) return;
    if (!lspIds?.length) return setOrglspData([]);
    LspDetails();
  }, [lspIds]);

  useEffect(() => {
    if (!orgIds?.length) return setOrglspData([]);
    OrgDetails();
  }, [orgIds]);

  useEffect(() => {
    if (!orgDetails?.length) return setOrglspData([]);
    const _newArr = orgDetails?.map((item, i) =>
      Object.assign({}, item, { org_logo_url: item.logo_url }, lspsDetails[i])
    );
    setOrglspData(_newArr);
  }, [orgDetails]);

  return (
    <div className={`${styles.loginMainContainer}`}>
      <div className={`${styles.ZicopsLogo}`}>
        <div>
          <Link href="/home">
            <Image
              src={
                orgData?.data?.logo_url?.length
                  ? orgData?.data?.logo_url
                  : '/images/svg/asset-6.svg'
              }
              alt="zicops logo"
              width={180}
              height={40}
              objectFit={'contain'}
            />
          </Link>
        </div>
        <div
          className={`${styles.LogoutButton}`}
          onClick={() => {
            setUserGlobalData(getUserGlobalDataObj());
            setUserProfileData(getUserObject());
            logOut();
          }}>
          Logout
        </div>
      </div>
      <div className={`${styles.zicops_login}`}>
        <LoginHeadOne
          showImage={false}
          heading={'Welcome to your Learning spaces'}
          // sub_heading={'Select your Learning space'}
        />
        <div className={`${styles.login_body}`}>
          {!isDev ? (
            <>
              {orglspData?.map((data, index) => {
                return (
                  <LspCard
                    image={data?.profile_url || '/images/zicopsIcon.png'}
                    path={
                      lspStatus?.[index]?.toLowerCase() === USER_MAP_STATUS.invite
                        ? '/account-setup'
                        : '/'
                    }
                    website={data?.subdomain}
                    status={data?.status}
                    isDisabled={lspStatus?.[index]?.toLowerCase() === USER_MAP_STATUS?.disable}
                    lspId={data?.lsp_id}
                    lspName={data?.name}
                    orgId={data?.org_id}
                    logo={data?.org_logo_url}
                    ouId={data?.ou_id}
                    userLspId={userLspIds?.[index]}
                    userId={userDetails?.id}
                    lspLogo={data?.logo_url}
                  />
                );
              })}
            </>
          ) : (
            <>
              {!orglspData?.length ? (
                <span>No LSP Found</span>
              ) : (
                orglspData?.map((data, index) => {
                  if (!data)
                    return (
                      <Skeleton
                        key={index}
                        sx={{ bgcolor: 'dimgray', borderRadius: '5px' }}
                        variant="rectangular"
                        width={250}
                        height={200}
                      />
                    );
                  return (
                    <LspCard
                      image={data?.profile_url || '/images/zicopsIcon.png'}
                      path={
                        lspStatus?.[index]?.toLowerCase() === USER_MAP_STATUS.invite
                          ? '/account-setup'
                          : '/'
                      }
                      website={data?.subdomain}
                      status={data?.status}
                      isDisabled={lspStatus?.[index]?.toLowerCase() === USER_MAP_STATUS?.disable}
                      lspId={data?.lsp_id}
                      lspName={data?.name}
                      orgId={data?.org_id}
                      logo={data?.org_logo_url}
                      ouId={data?.ou_id}
                      userLspId={userLspIds?.[index]}
                      userId={userDetails?.id}
                      lspLogo={data?.logo_url}
                    />
                  );
                })
              )}
            </>
          )}
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
