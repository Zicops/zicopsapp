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
import {LearningSpaceAtom, OrganizationUnitAtom  } from './atoms/orgs.atom';
import { useRecoilState } from 'recoil';
import { useMutation } from '@apollo/client';
import AdminInfoWrapper from './AdminInfoWrapper';
import { getLspDetails , getOuDetails } from './helper/orgdata.helper'
import { UPDATE_LEARNING_SPACE_DETAILS, UPDATE_ORGAINIZATION_UNIT_DETAILS, userClient } from '@/api/UserMutations';


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
  const {data} = getOuDetails(["V21samIzQnphSFIwY0M4dmVtbGpiM0J6TG1OdmJVbFVLb2xrYXRhICwgU2VjdG9yIDU3MDAwMDg4S29sa2F0YVdlc3QgQmVuZ2FsSW5kaWE="])
  
  useEffect(async () => {
    const lspdata = await getLspDetails(["V21samIzQnphSFIwY0M4dmVtbGpiM0J6TG1OdmJVbFVWMjFzYW1JelFucGhTRkl3WTBNNGRtVnRiR3BpTTBKNlRHMU9kbUpWYkZWTGIyeHJZWFJoSUN3Z1UyVmpkRzl5SURVM01EQXdNRGc0UzI5c2EyRjBZVmRsYzNRZ1FtVnVaMkZzU1c1a2FXRT0="])
    setLspUpdateData(lspdata?.getLearningSpaceDetails[0])
    setOrgUnitUpdateData(data?.getOrganizationUnits[0])
    const lspData = [
    {
      inputName: 'name',
      info: lspdata?.getLearningSpaceDetails[0].name,
      label: 'Organization Name'
    },
    {
      inputName: 'country',
      info: data?.getOrganizationUnits[0].country,
      label: 'Country'
    },
    {
      inputName: 'state',
      info: data?.getOrganizationUnits[0].state,
      label: 'State'
    },
    {
      inputName: 'city',
      info: data?.getOrganizationUnits[0].city,
      label: 'City'
    },
    {
      inputName: 'address',
      info: data?.getOrganizationUnits[0].address,
      label: 'Address'
    }
    ];
    setLspDataArr(lspData)
    console.log(data?.getOrganizationUnits[0])
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
          console.log(err,'error at update user');
        
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
        <AdminHeader title="Zicops Learning Space 1" pageRoute="/admin/administration" />
        <MainBodyBox>
          <div style={{ padding: '30px' }}>
            <TextHeaderWithEditIcon headingText="Learning Space Details" handleClick={() => setIsEditable(!isEditable)} />
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
          </div>
        </MainBodyBox>
      </MainBody>
    </>
  );
}
