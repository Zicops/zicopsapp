import AdminHeader from '@/components/common/AdminHeader';
import MainBody from '@/components/common/MainBody';
import MainBodyBox from '@/components/common/MainBodyBox';
import Sidebar from '@/components/common/Sidebar';
import { administrationSideBarData } from '@/components/common/Sidebar/Logic/sidebar.helper';
import TabContainer from '@/components/common/TabContainer';
import TextHeaderWithEditIcon from '@/components/common/TextHeaderWithEditIcon';
import SingleUserDetail from '@/components/LearnerUserProfile/SingleUserDetail';
import UserInfoWraper from '@/components/LearnerUserProfile/UserInfoWraper';
import BulkUpload from '@/components/UserComps/BulkUpload';
import InviteUser from '@/components/UserComps/InviteUser';
import { useState } from 'react';
import AdminInfoWrapper from './AdminInfoWrapper';

export default function OrgPage() {
const userData = [
  {
    image: '/images/svg/account_circle.svg',
    inputName: 'first_name',
    info: 'Information Technology',
    label: 'Industry'
  },
  {
    image: '/images/svg/account_circle.svg',
    inputName: 'last_name',
    info: 'Organization',
    label: 'Type'
  },
  {
    image: '/images/svg/mail.svg',
    inputName: 'email',
    info: '750',
    label: 'Number of Employees'
  },
  {
    image: '/images/svg/call.svg',
    inputName: 'phone',
    info: 'Pune',
    label: 'City'
  },
  {
    image: '/images/svg/call.svg',
    inputName: 'phone',
    info: 'https://zicops.com/',
    label: 'Website'
  },
  {
    image: '/images/svg/call.svg',
    inputName: 'phone',
    info: 'www.linkedin.com/company/zicops/',
    label: 'LinkedIn'
  }
];
const [isEditable, setIsEditable] = useState(0);
  return (
    <>
      <Sidebar sidebarItemsArr={administrationSideBarData} />
      <MainBody>
        <AdminHeader
          title="Zicops Learning Space 1"
          pageRoute="/admin/administration"
          // subHeaderData={{
          //   leftBtnData: [
          //     {
          //       text: 'Go to Dashboard',
          //       handleClick: () => {
          //         setTabData([
          //           { name: 'Bulk Upload', component: <BulkUpload userType={userType} /> }
          //         ]);
          //       },
          //       isHidden: false
          //     }
          //   ],
          //   dropdownData: {
          //     label: 'User Type:',
          //     value: 'userType',
          //     handleChange: (e) => setUserType(e.target.value),
          //     options: [
          //       { value: 'Internal', display: 'Internal' },
          //       {
          //         value: 'External',
          //         display: 'External',
          //         isDisabled: false
          //       }
          //     ]
          //   }
          // }}
        />
        <MainBodyBox>
          <div style={{ padding: '30px' }}>
            <TextHeaderWithEditIcon headingText="Organization Details" />
            <AdminInfoWrapper
              data={userData}
              isEditable={isEditable}
              // toggleEditable={false}
              // handleUpdate={() => {}}
            />
            <TextHeaderWithEditIcon headingText="Learning Spaces (2)" />
            {/* <AdminInfoWrapper
              data={userData}
              // isEditable={isEditable}
              // toggleEditable={false}
              // handleUpdate={() => {}}
            /> */}
          </div>
        </MainBodyBox>
      </MainBody>
      {/* <MainBody>
        <AdminHeader
          title="Organization"
          pageRoute="/admin/administration"
          subHeaderData={{
            leftBtnData: [
              {
                text: 'Go to Dashboard',
                handleClick: () => {
                  setTabData([
                    { name: 'Bulk Upload', component: <BulkUpload userType={userType} /> }
                  ]);
                },
                isHidden: false
              }
            ],
            dropdownData: {
              label: 'User Type:',
              value: 'userType',
              handleChange: (e) => setUserType(e.target.value),
              options: [
                { value: 'Internal', display: 'Internal' },
                {
                  value: 'External',
                  display: 'External',
                  isDisabled: false
                }
              ]
            }
          }}
        />

        <MainBodyBox>
          <TabContainer
            tabData={'tabData'}
            tab={'tab'}
            setTab={'setTab'}
            footerObj={{
              disableSubmit: 'loading',
              hideStatus: true,
              // submitDisplay: tabData[0]?.name.includes('Invite') ? 'Send Invite' : 'Upload',
              isActive: true,
              customActiveBtnStyles: { backgroundColor: 'var(--primary)', color: 'var(--black)' },
              handleSubmit: 'handleMail',
              handleCancel: () => {
                // if (tabData[0]?.name.includes('Invite')) return router.push('/admin/user/my-users');

                setTabData([{ name: 'Invite User', component: <InviteUser /> }]);
              }
            }}
          />
        </MainBodyBox>
      </MainBody> */}
    </>
  );
}
