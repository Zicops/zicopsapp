import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { UsersEmailIdAtom, UsersOrganizationAtom } from '@/state/atoms/users.atom';
import { useMutation } from '@apollo/client';
import { INVITE_USERS, userClient } from 'API/UserMutations';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import AdminHeader from '../../../../components/common/AdminHeader';
import MainBody from '../../../../components/common/MainBody';
import MainBodyBox from '../../../../components/common/MainBodyBox';
import Sidebar from '../../../../components/common/Sidebar';
import { userSideBarData } from '../../../../components/common/Sidebar/Logic/sidebar.helper';
import TabContainer from '../../../../components/common/TabContainer';
import BulkUpload from '../../../../components/UserComps/BulkUpload';
import InviteUser from '../../../../components/UserComps/InviteUser';
import { CUSTOM_ERROR_MESSAGE } from '../../../../helper/constants.helper';

export default function MyUserPage() {
  const [inviteUsers, { data, loading }] = useMutation(INVITE_USERS, {
    client: userClient
  });

  const [emailId, setEmailId] = useRecoilState(UsersEmailIdAtom);
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);
  // const [userOrgData , setUserOrgData] = useRecoilState(UsersOrganizationAtom);
  // const [disableButton, setDisableButton] = useState(false);

  const [userType, setUserType] = useState('Internal');
  const [tabData, setTabData] = useState([
    { name: 'Invite User', component: <InviteUser userType={userType} /> }
  ]);
  const [tab, setTab] = useState(tabData[0].name);
  const [userOrgData, setUserOrgData] = useRecoilState(UsersOrganizationAtom);
  //handle emails
  async function handleMail() {
    if (loading) return;
    if (emailId.length === 0)
      return setToastMsg({ type: 'warning', message: 'Add atleast one email!' });
    let emails = emailId.map((item) => item?.props?.children[0]);
    // console.log(emails, emailId);
    //for removing duplicate email ids
    emails = emails.filter((value, index) => emails.indexOf(value) === index);
    // console.log(emails);

    let isError = false;
    let errorMsg;
    const resEmail = await inviteUsers({
      variables: { emails: emails, lsp_id: userOrgData?.lsp_id }
    }).catch((err) => {
      errorMsg = err.message;
      isError = !!err;
    });

    if (isError) {
      const message = JSON.parse(errorMsg.split('body:')[1]);
      if (message?.error?.message === CUSTOM_ERROR_MESSAGE?.emailError)
        return setToastMsg({ type: 'danger', message: `Email already exists!` });
      return setToastMsg({ type: 'danger', message: `Error while sending mail!` });
    }

    // if (isError) return setToastMsg({ type: 'danger', message: `Error while sending mail!` });
    // console.log(resEmail);

    setToastMsg({ type: 'success', message: `Emails send successfully!` });

    return router.push('/admin/user/my-users');
  }

  // set default tab on comp change
  useEffect(() => {
    setTab(tabData[0].name);
  }, [tabData]);

  // update type props
  useEffect(() => {
    if (tabData[0].name.includes('Invite'))
      return setTabData([{ name: 'Invite User', component: <InviteUser userType={userType} /> }]);

    return setTabData([{ name: 'Bulk Upload', component: <BulkUpload userType={userType} /> }]);
  }, [userType]);

  const router = useRouter();

  return (
    <>
      <Sidebar sidebarItemsArr={userSideBarData} />
      <MainBody>
        <AdminHeader
          title={tabData[0]?.name}
          pageRoute="/admin/user"
          subHeaderData={{
            leftBtnData: [
              {
                text: 'Bulk Upload User',
                handleClick: () => {
                  setTabData([
                    { name: 'Bulk Upload', component: <BulkUpload userType={userType} /> }
                  ]);
                },
                isHidden: tabData[0].name.includes('Bulk')
              }
            ],
            dropdownData: {
              label: 'User Type:',
              value: userType,
              handleChange: (e) => setUserType(e.target.value)
            }
          }}
        />

        <MainBodyBox>
          <TabContainer
            tabData={tabData}
            tab={tab}
            setTab={setTab}
            footerObj={{
              disableSubmit: loading,
              submitDisplay: tabData[0]?.name.includes('Invite') ? 'Send Invite' : 'Upload',
              handleSubmit: handleMail,
              handleCancel: () => {
                if (tabData[0]?.name.includes('Invite')) return router.push('/admin/user/my-users');

                setTabData([{ name: 'Invite User', component: <InviteUser /> }]);
              }
            }}
          />
        </MainBodyBox>
      </MainBody>
    </>
  );
}
