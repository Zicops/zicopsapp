import AdminHeader from '@/components/common/AdminHeader';
import MainBody from '@/components/common/MainBody';
import MainBodyBox from '@/components/common/MainBodyBox';
import Sidebar from '@/components/common/Sidebar';
import { administrationSideBarData } from '@/components/common/Sidebar/Logic/sidebar.helper';
import TabContainer from '@/components/common/TabContainer';
import TextHeaderWithEditIcon from '@/components/common/TextHeaderWithEditIcon';
import BulkUpload from '@/components/UserComps/BulkUpload';
import InviteUser from '@/components/UserComps/InviteUser';
import AdminInfoWrapper from './AdminInfoWrapper';



export default function LspPage() {
  const lspData = [
    {
      image: '/images/svg/account_circle.svg',
      inputName: 'first_name',
      info: 'Zicops',
      label: 'Organization Name'
    },
    {
      image: '/images/svg/account_circle.svg',
      inputName: 'last_name',
      info: 'India',
      label: 'Country'
    },
    {
      image: '/images/svg/call.svg',
      inputName: 'phone',
      info: 'Maharashtra',
      label: 'State'
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
      info: 'Palladion, Hosur Road, Bengaluru',
      label: 'Address'
    }
  ];

  return (
    <>
      <Sidebar sidebarItemsArr={administrationSideBarData} />
      <MainBody>
        <AdminHeader title="Zicops Learning Space 1" pageRoute="/admin/administration" />
        <MainBodyBox>
          <div style={{ padding: '30px' }}>
            <TextHeaderWithEditIcon headingText="Learning Space Details" />
            <AdminInfoWrapper
              data={lspData}
              // isEditable={isEditable}
              // toggleEditable={false}
              // handleUpdate={() => {}}
            />
            <TextHeaderWithEditIcon headingText="Admins" showIcon={false} />
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
