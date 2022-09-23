import { GET_USER_DETAIL, GET_USER_LEARNINGSPACES_DETAILS, userQueryClient } from '@/api/UserQueries';
import { loadQueryDataAsync } from '@/helper/api.helper';
import { HIDE_HEADER_FOOTER_FOR_ROUTE, LEARNING_SPACE_ID } from '@/helper/constants.helper';
import { getUserData } from '@/helper/loggeduser.helper';
import { getUserOrgObject, UsersOrganizationAtom, UserStateAtom } from '@/state/atoms/users.atom';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import Footer from '../Footer';
import Nav from '../Nav';
import { main } from './layout.module.scss';

export default function Layout({ children }) {
  const [userData, setUserData] = useRecoilState(UserStateAtom);
  const [userOrgData, setUserOrgData] = useRecoilState(UsersOrganizationAtom);

  const [isFullHeight, setIsFullHeight] = useState(0);
  const router = useRouter();

  //refill the  recoil values
  useEffect(async () => {
    if (userData?.id) return;

    const data = getUserData();
    if (data === 'User Data Not Found') return;
    // const userId = [];
    // userId.push(data?.id);
    const userId = data?.id;
    const userData = await loadQueryDataAsync(
      GET_USER_DETAIL,
      { user_id: [userId] },
      {},
      userQueryClient
    );
    if (userData?.error) return console.log('User data load error');
    const basicInfo = userData?.getUserDetails?.[0];

    setUserData({ ...userData, ...data, ...basicInfo });

    const userLearningSpaceData =  await loadQueryDataAsync(GET_USER_LEARNINGSPACES_DETAILS,{user_id:userId,lsp_id:LEARNING_SPACE_ID},{},userQueryClient);
    if(userLearningSpaceData?.error) return console.log('User lsp load error!');
    // console.log(userLearningSpaceData,'learning space data');
    //temporary solution only valid for one lsp...need to change later!
    sessionStorage?.setItem('lspData',JSON.stringify(userLearningSpaceData?.getUserLspByLspId));
    // console.log(userLearningSpaceData?.getUserLspByLspId?.user_lsp_id,'lsp')
    setUserOrgData(getUserOrgObject({user_lsp_id:userLearningSpaceData?.getUserLspByLspId?.user_lsp_id}));
    return;
  }, [userData?.id]);

  useEffect(() => {
    setIsFullHeight(HIDE_HEADER_FOOTER_FOR_ROUTE.includes(router.pathname) ? 1 : 0);
  }, [router.pathname]);

  return (
    <>
      {!isFullHeight && <Nav />}
      <main className={main}>{children}</main>
      {!isFullHeight && <Footer />}
    </>
  );
}
