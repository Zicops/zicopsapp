import AdminHeader from '@/components/common/AdminHeader';
import MainBody from '@/components/common/MainBody';
import MainBodyBox from '@/components/common/MainBodyBox';
import Sidebar from '@/components/common/Sidebar';
import { administrationSideBarData } from '@/components/common/Sidebar/Logic/sidebar.helper';
import TabContainer from '@/components/common/TabContainer';
import TextHeaderWithEditIcon from '@/components/common/TextHeaderWithEditIcon';
import BulkUpload from '@/components/UserComps/BulkUpload';
import InviteUser from '@/components/UserComps/InviteUser';
import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { useMutation } from '@apollo/client';
import AdminInfoWrapper from './AdminInfoWrapper';
import { UPDATE_LEARNING_SPACE_DETAILS, UPDATE_ORGAINIZATION_UNIT_DETAILS, userClient } from '@/api/UserMutations';
import { getOuDetails , getLspDetails} from '@/helper/orgdata.helper';
import { LearningSpaceAtom , OrganizationUnitAtom } from '@/state/atoms/orgs.atom';
import MyUser from '@/components/UserComps/MyUser';


export default function LspPage() {
   const [upadateLsp] = useMutation(UPDATE_LEARNING_SPACE_DETAILS, {
    client: userClient
   });
   const [updateOrgUnit] = useMutation(UPDATE_ORGAINIZATION_UNIT_DETAILS, {
    client: userClient
    });
  const [lspDataArr, setLspDataArr] = useState([]);
  const [isEditable, setIsEditable] = useState(false);
  const [lspUpdateData, setLspUpdateData] = useRecoilState(LearningSpaceAtom);
  const [orgUnitUpdateData, setOrgUnitUpdateData] = useRecoilState(OrganizationUnitAtom);
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);
  const [selectedUser, setSelectedUser] = useState([]);
  const [showIcon , setShowIcon] = useState(false)
  const get_Lsp_Details = async() => {
     const ouId = sessionStorage.getItem('ou_id');
    const lspId = sessionStorage.getItem('lsp_id');
    const userDetails = JSON.parse(sessionStorage.getItem('loggedUser'));
    const orgutdata = await getOuDetails([ouId])
    const lspdata = await getLspDetails([lspId])
    console.log(lspdata);
    setLspUpdateData(lspdata?.getLearningSpaceDetails?.[0])
    setOrgUnitUpdateData(orgutdata?.getOrganizationUnits?.[0])
    const getOwner = lspdata?.getLearningSpaceDetails?.[0]?.owners.map((owner) => owner)
    console.log(getOwner)
    console.log(userDetails.id)
    if (getOwner?.map((owner)=> owner === userDetails.id ) ) {
      setShowIcon(true)
    }
    const lspData = [
    {
      inputName: 'name',
      info: lspdata?.getLearningSpaceDetails?.[0].name,
      label: 'Organization Name'
    },
    {
      inputName: 'country',
      info: orgutdata?.getOrganizationUnits?.[0].country,
      label: 'Country'
    },
    {
      inputName: 'state',
      info: orgutdata?.getOrganizationUnits?.[0].state,
      label: 'State'
    },
    {
      inputName: 'city',
      info: orgutdata?.getOrganizationUnits?.[0].city,
      label: 'City'
    },
    {
      inputName: 'address',
      info: orgutdata?.getOrganizationUnits?.[0].address,
      label: 'Address'
    }
    ];
    setLspDataArr(lspData)
  }
  
  useEffect( () => {
   get_Lsp_Details()
    // console.log(orgutdata?.getOrganizationUnits[0])
  }, [])

  
    async function updateLspDetails(lspData) {
       const res = await upadateLsp({ variables: lspData }).catch((err) => {
          console.log(err,'error at update user');
        
       });
      console.log(res)
      return res;
  }
    async function updateOrgUnitDetails(orgUnitData) {
       const res = await updateOrgUnit({ variables: orgUnitData }).catch((err) => {
          return setToastMsg({ type: 'danger', message: "user is a not zicops admin: Unauthorized" }); 
       });
      console.log(res)
      return res;
  }

    const handleUpdate = () => {
    console.log(lspUpdateData ,orgUnitUpdateData )
      updateLspDetails(lspUpdateData);
      updateOrgUnitDetails(orgUnitUpdateData)
      setIsEditable(false)
  }


  return (
    <>
      <Sidebar sidebarItemsArr={administrationSideBarData} />
      <MainBody>
        <AdminHeader title={lspUpdateData.name} pageRoute="/admin/administration" />
        <MainBodyBox>
          <div style={{ padding: '30px' }}>
            <TextHeaderWithEditIcon headingText="Learning Space Details" showIcon={showIcon} isEditable={isEditable} handleClick={() => setIsEditable(!isEditable)} />
            <AdminInfoWrapper
              data={lspDataArr}
              isEditable={isEditable}
              // toggleEditable={false}
              handleUpdate={handleUpdate}
            />
            <TextHeaderWithEditIcon headingText="Admins" showIcon={false}  />
            {/* <AdminInfoWrapper
              data={userData}
              // isEditable={isEditable}
              // toggleEditable={false}
              // handleUpdate={() => {}}
            /> */}
            <MyUser getUser={(list) => setSelectedUser(list)} customStyle={{padding:'0px 0px'}} isAdministration={true}/>
          </div>
        </MainBodyBox>
      </MainBody>
    </>
  );
}
