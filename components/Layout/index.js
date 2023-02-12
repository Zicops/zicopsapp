import { GET_USER_DETAIL, userQueryClient } from '@/api/UserQueries';
import { deleteData, loadQueryDataAsync } from '@/helper/api.helper';
import { HIDE_HEADER_FOOTER_FOR_ROUTE } from '@/helper/constants.helper';
import useUserCourseData from '@/helper/hooks.helper';
import { getUserData } from '@/helper/loggeduser.helper';
import { NotificationAtom } from '@/state/atoms/notification.atom';
import { DeleteConfirmDataAtom, getDeleteConfirmDataObj } from '@/state/atoms/popUp.atom';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { UsersOrganizationAtom, UserStateAtom } from '@/state/atoms/users.atom';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import ConfirmPopUp from '../common/ConfirmPopUp';
import Footer from '../Footer';
import Nav from '../Nav';
import { main } from './layout.module.scss';

export default function Layout({ children }) {
  const [userAboutData, setUserData] = useRecoilState(UserStateAtom);
  const [userOrgData, setUserOrgData] = useRecoilState(UsersOrganizationAtom);
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);
  const [deleteConfirmData, setDeleteConfirmData] = useRecoilState(DeleteConfirmDataAtom);
  const [notifications, setNotifications] = useRecoilState(NotificationAtom);
  const { getOrgByDomain, OrgDetails } = useUserCourseData();

  const [isFullHeight, setIsFullHeight] = useState(0);
  const router = useRouter();

  useEffect(async () => {
    if (userOrgData?.logo_url) return;
    if (!sessionStorage?.getItem('org_id')) {
      const orgData = await getOrgByDomain();
      setUserOrgData((prev) => ({
        ...prev,
        logo_url: orgData?.logo_url || '',
        organization_id: orgData?.org_id
      }));
      return;
    }
     OrgDetails();
  }, [router?.asPath]);

  //refill the  recoil values
  useEffect(async () => {
    if (!userAboutData?.id?.length) return loadUserData();

    if (userAboutData?.isUserUpdated) return loadUserData();

    // const userLearningSpaceData =  await loadQueryDataAsync(GET_USER_LEARNINGSPACES_DETAILS,{user_id:userId,lsp_id:<lsp_id>},{},userQueryClient);
    // if(userLearningSpaceData?.error) return console.log('User lsp load error!');
    // //temporary solution only valid for one lsp...need to change later!
    // sessionStorage?.setItem('lspData',JSON.stringify(userLearningSpaceData?.getUserLspByLspId));
    // // console.log(userLearningSpaceData?.getUserLspByLspId?.user_lsp_id,'lsp')
    // setUserOrgData(getUserOrgObject({user_lsp_id:userLearningSpaceData?.getUserLspByLspId?.user_lsp_id}));
    return;
  }, []);

  async function loadUserData() {
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

    setUserData((prev) => ({ ...prev, ...data, ...basicInfo, isUserUpdated: false }));
    return;
  }

  useEffect(() => {
    setIsFullHeight(HIDE_HEADER_FOOTER_FOR_ROUTE.includes(router.pathname) ? 1 : 0);
  }, [router.pathname]);

  return (
    <>
      {!isFullHeight && <Nav />}
      <main className={main}>{children}</main>
      {!isFullHeight && <Footer />}

      {deleteConfirmData?.showConfirm && deleteConfirmData?.mutation && (
        <ConfirmPopUp
          title={
            deleteConfirmData?.confirmMsg ||
            'Are you sure about deleting? This will delete it permanently!'
          }
          btnObj={{
            handleClickLeft: async () => {
              let isDeleted = 'localDelete';
              if (deleteConfirmData?.id) {
                isDeleted = await deleteData(deleteConfirmData?.mutation, {
                  id: deleteConfirmData?.id,
                  ...deleteConfirmData?.variableObj
                });
              }
              console.log(isDeleted, deleteConfirmData);
              setDeleteConfirmData(getDeleteConfirmDataObj());

              if (isDeleted !== 'localDelete' && !isDeleted?.[deleteConfirmData?.resKey])
                return setToastMsg({ type: 'danger', message: 'Failed to Delete' });

              deleteConfirmData?.onDelete();
            },
            handleClickRight: () => setDeleteConfirmData(getDeleteConfirmDataObj())
          }}
        />
      )}
    </>
  );
}
