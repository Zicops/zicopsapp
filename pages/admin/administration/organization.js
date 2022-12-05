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
import { getLspDetails, getLsps, getOrgDetails } from '@/helper/orgdata.helper';
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
  const [allLspData, setAllLspData] = useState([]);
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);
  const [pageSize, setPageSize] = useState(6);
   const [showIcon , setShowIcon] = useState(false)
  useEffect(async () => {
    const orgId = sessionStorage.getItem('org_id');
    const userDetails = JSON.parse(sessionStorage.getItem('loggedUser'));
    const lspId = sessionStorage.getItem('lsp_id');
    const data = await getOrgDetails([orgId]);
    const lspData = await getLsps(orgId);
    setOrgUpdateData(data?.getOrganizations?.[0]);
    const lspdata = lspData?.getLearningSpacesByOrgId?.map((data) => {
      return {...data, id: data?.lsp_id}; 
    })?.filter((data) => data.id)
    const _newLspData = lspdata.filter((data)=> !data.is_default)
    setAllLspData(_newLspData);
    const getOwner = lspData?.getLearningSpacesByOrgId?.filter((data) =>data?.lsp_id === lspId)
    console.log(getOwner?.[0].owners)
      if (getOwner?.[0]?.owners?.map((owner)=> owner === userDetails.id )) {
      setShowIcon(true)
    }
    const _orgData = [
      {
        inputName: 'industry',
        info: data?.getOrganizations?.[0].industry,
        label: 'Industry'
      },
      {
        inputName: 'type',
        info: data?.getOrganizations?.[0].type,
        label: 'Type'
      },
      {
        inputName: 'employee_count',
        info: data?.getOrganizations?.[0].employee_count,
        label: 'Number of Employees'
      },
      {
        inputName: 'website',
        info: data?.getOrganizations?.[0].website,
        label: 'Website'
      },
      {
        inputName: 'subdomain',
        info: data?.getOrganizations?.[0].subdomain,
        label: 'Subdomain'
      },
      {
        inputName: 'facebook_url',
        info: data?.getOrganizations?.[0].facebook_url,
        label: 'Facebook Url'
      },
      {
        inputName: 'linkedin_url',
        info: data?.getOrganizations?.[0].linkedin_url,
        label: 'Linkedin Url'
      },
      {
        inputName: 'twitter_url',
        info: data?.getOrganizations?.[0].twitter_url,
        label: 'Twitter Url'
      }
    ];
    setOrgData(_orgData);
  }, []);

  async function updateOrgDetails(orgData) {
    const res = await updateOrg({ variables: orgData }).catch((err) => {
      console.log(err, 'error at update user');
      return setToastMsg({ type: 'danger', message: 'user is a not zicops admin: Unauthorized' });
    });
    return res;
  }
  const handleUpdate = () => {
    console.log(orgUpdateData);
    updateOrgDetails(orgUpdateData);
    setIsEditable(false);
  };

  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      headerClassName: 'organization-list-header',
      flex: 1.5
    },
    {
      field: 'no_users',
      headerClassName: 'organization-list-header',
      headerName: 'No_users',
      flex: 1
    },
    {
      field: 'status',
      headerClassName: 'organization-list-header',
      headerName: 'Status',
      flex: 1
    },
    // {
    //   field: 'type',
    //   headerClassName: 'organization-list-header',
    //   headerName: 'Type',
    //   flex: 1
    // },
    // {
    //   field: 'website',
    //   headerClassName: 'organization-list-header',
    //   headerName: 'Website',
    //   flex: 1
    // },
    // {
    //   field: 'action',
    //   headerClassName: 'organization-list-header',
    //   headerName: 'Action',
    //   sortable: false,
    //   renderCell: (params) => {
    //     return (
    //       <>
    //         <button
    //           style={{
    //             cursor: 'pointer',
    //             backgroundColor: 'transparent',
    //             outline: '0',
    //             border: '0'
    //           }}
    //           onClick={() => Router.push(`/preview?courseId=${params.row.id}`)}>
    //           <img src="/images/svg/eye-line.svg" width={20}></img>
    //         </button>
    //         <button
    //           style={{
    //             cursor: 'pointer',
    //             backgroundColor: 'transparent',
    //             outline: '0',
    //             border: '0'
    //           }}
    //           onClick={() => editCourse(params.row.id)}>
    //           <img src="/images/svg/edit-box-line.svg" width={20}></img>
    //         </button>
    //       </>
    //     );
    //   },
    //   flex: 0.5
    // }
  ];
 
  return (
    <>
      <Sidebar sidebarItemsArr={administrationSideBarData} />
      <MainBody>
        <AdminHeader
          title={orgUpdateData.name}
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
            <TextHeaderWithEditIcon
              headingText="Organization Details"
              handleClick={() => setIsEditable(!isEditable)}
              showIcon={showIcon}
              isEditable={isEditable}
            />
            <AdminInfoWrapper data={orgData} isEditable={isEditable} handleUpdate={handleUpdate} />
            <TextHeaderWithEditIcon headingText={`Learning Spaces (${allLspData.length})`}  showIcon={false} />
            <ZicopsTable
              columns={columns}
              data={allLspData}
              pageSize={pageSize}
              rowsPerPageOptions={[3]}
              tableHeight="70vh"
              customStyles={{padding:0}}
              // rowId={(row) => row.lsp_id}
              // loading={loading}
            />
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
