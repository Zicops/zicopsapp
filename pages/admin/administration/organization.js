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
import { getOrgDetails} from '@/helper/orgdata.helper';
import { useEffect, useState } from 'react';
import AdminInfoWrapper from './AdminInfoWrapper';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { useRecoilState } from 'recoil';
import { useMutation } from '@apollo/client';
import { UPDATE_ORGANIZATION_DETAILS, userClient } from '@/api/UserMutations';
import ZicopsTable from '../../../components/common/ZicopsTable';
import { OrganizationAtom } from '@/state/atoms/orgs.atom';

export default function OrgPage() {
   const [updateOrg] = useMutation(UPDATE_ORGANIZATION_DETAILS, {
    client: userClient
    });
  const [isEditable, setIsEditable] = useState(false);
  const [orgUpdateData, setOrgUpdateData] = useRecoilState(OrganizationAtom);
  const [orgData, setOrgData] = useState([]);
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);
  
  useEffect(async() => {
    const data = await getOrgDetails(["Wmljb3BzaHR0cC8vemljb3BzLmNvbUlU"]) 
    setOrgUpdateData(data.getOrganizations[0])
  const _orgData = [
  {
    inputName: 'industry',
    info: data?.getOrganizations[0].industry,
    label: 'Industry'
  },
  {
    inputName: 'type',
    info: data?.getOrganizations[0].type,
    label: 'Type'
  },
  {
    inputName: 'employee_count',
    info:  data?.getOrganizations[0].employee_count,
    label: 'Number of Employees'
  },
  {
    inputName: 'website',
    info: data?.getOrganizations[0].website,
    label: 'Website'
  },
  {
    inputName: 'subdomain',
    info: data?.getOrganizations[0].subdomain,
    label: 'Subdomain'
  }
    ];
    setOrgData(_orgData)
    console.log(orgUpdateData)
  }, [])
  
    async function updateOrgDetails(orgData) {
       const res = await updateOrg({ variables: orgData }).catch((err) => {
          console.log(err,'error at update user');
        return setToastMsg({ type: 'danger', message: "user is a not zicops admin: Unauthorized" });
       });
      console.log(res)
      return res;
    }
  const handleUpdate = () => {
    console.log(orgUpdateData)
    updateOrgDetails(orgUpdateData);
    setIsEditable(false)
  }
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
            <TextHeaderWithEditIcon headingText="Organization Details"  handleClick={() => setIsEditable(!isEditable)}/>
            <AdminInfoWrapper
              data={orgData}
              isEditable={isEditable}
              handleUpdate={handleUpdate}
            />
            <TextHeaderWithEditIcon headingText="Learning Spaces (2)" showIcon={false} />
              {/* <ZicopsTable
      columns={columns}
      data={latestCourses}
      pageSize={pageSize}
      rowsPerPageOptions={[3]}
      tableHeight="70vh"
      loading={loading}
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
