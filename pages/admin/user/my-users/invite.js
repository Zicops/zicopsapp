import PopUp from '@/components/common/PopUp';
import InviteUserEmails from '@/components/UserComps/MyUser/InviteUserEmails';
import { parseJson } from '@/helper/utils.helper';
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
import { CUSTOM_ERROR_MESSAGE, LEARNING_SPACE_ID } from '../../../../helper/constants.helper';

export default function MyUserPage() {
  const [inviteUsers, { data, loading }] = useMutation(INVITE_USERS, {
    client: userClient
  });

  const [emailId, setEmailId] = useRecoilState(UsersEmailIdAtom);
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);
  const [isOpen, setIsOpen] = useState(false);
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
    const { user_lsp_id } = parseJson(sessionStorage?.getItem('lspData'));
    if (loading) return;
    if (emailId.length === 0)
      return setToastMsg({ type: 'warning', message: 'Add at least one email!' });
    let emails = !tabData[0]?.name.includes('Invite')
      ? emailId
      : emailId.map((item) => item?.props?.children[0]);
    // console.log(emails, emailId);
    //for removing duplicate email ids
    emails = emails.filter((value, index) => emails.indexOf(value) === index);
    // console.log(emails);

    let isError = false;
    let errorMsg;
    const resEmail = await inviteUsers({
      variables: { emails: emails, lsp_id: userOrgData?.lsp_id || LEARNING_SPACE_ID }
    }).catch((err) => {
      errorMsg = err.message;
      isError = !!err;
    });

    if (isError) {
      const message = JSON.parse(errorMsg?.split('body:')[1]);
      if (message?.error?.message === CUSTOM_ERROR_MESSAGE?.emailError)
        return setToastMsg({ type: 'danger', message: `Email already exists!` });
      return setToastMsg({ type: 'danger', message: `Error while sending mail!` });
    }

    // if (isError) return setToastMsg({ type: 'danger', message: `Error while sending mail!` });
    // console.log(resEmail);

    setToastMsg({ type: 'success', message: `Emails send successfully!` });

    return setIsOpen(true);
  }

  // set default tab on comp change
  useEffect(() => {
    setTab(tabData[0].name);
  }, [tabData]);

  useEffect(() => {
    setEmailId([]);
  }, []);

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
              handleChange: (e) => setUserType(e.target.value),
              options: [
                { value: 'Internal', display: 'Internal' },
                {
                  value: 'External',
                  display: 'External',
                  isDisabled: !!tabData[0].name.includes('Bulk')
                }
              ]
            }
          }}
        />

        <MainBodyBox>
          <TabContainer
            tabData={tabData}
            tab={tab}
            setTab={setTab}
            footerObj={{
              disableSubmit: loading || !emailId?.length,
              hideStatus: true,
              submitDisplay: tabData[0]?.name.includes('Invite') ? 'Send Invite' : 'Upload',
              isActive: !!emailId?.length,
              customActiveBtnStyles: { backgroundColor: 'var(--primary)', color: 'var(--black)' },
              handleSubmit: handleMail,
              handleCancel: () => {
                if (tabData[0]?.name.includes('Invite')) return router.push('/admin/user/my-users');

                setTabData([{ name: 'Invite User', component: <InviteUser /> }]);
              }
            }}
          />
          <PopUp popUpState={[isOpen, setIsOpen]} isFooterVisible={false}>
            <InviteUserEmails
              closePopUp={setIsOpen}
              userEmails={emailId?.length ? emailId?.map((item) => item?.props?.children[0]) : []}
              userType={userType}
            />
          </PopUp>
        </MainBodyBox>
      </MainBody>
    </>
  );
}
