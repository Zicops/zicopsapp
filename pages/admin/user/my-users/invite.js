import { usersEmailId } from '@/state/atoms/users.atom';
import { useMutation } from '@apollo/client';
import { INVITE_USERS, userClient } from 'API/UserMutations';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import AdminHeader from '../../../../components/common/AdminHeader';
import MainBody from '../../../../components/common/MainBody';
import MainBodyBox from '../../../../components/common/MainBodyBox';
import Sidebar from '../../../../components/common/Sidebar';
import { userSideBarData } from '../../../../components/common/Sidebar/Logic/sidebar.helper';
import TabContainer from '../../../../components/common/TabContainer';
import BulkUpload from '../../../../components/UserComps/BulkUpload';
import InviteUser from '../../../../components/UserComps/InviteUser';

export default function MyUserPage() {
  const [inviteUsers, { error: inviteError }] = useMutation(INVITE_USERS, {
    client: userClient
  });

  const emails = useRecoilValue(usersEmailId);

  const [userType, setUserType] = useState('Internal');
  const [tabData, setTabData] = useState([
    { name: 'Invite User', component: <InviteUser userType={userType} /> }
  ]);
  const [tab, setTab] = useState(tabData[0].name);

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
              submitDisplay: tabData[0]?.name.includes('Invite') ? 'Send Invite' : 'Upload',
              handleSubmit: function () {
                if (emails.length === 0) return console.log('Atleast add one mail id');
                let emailId = emails.map((item) => item?.props?.children[0]);
                console.log(emailId);
              },
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
