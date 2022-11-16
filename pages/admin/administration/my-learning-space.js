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

export default function LspPage() {
  return (
    <>
      <Sidebar sidebarItemsArr={administrationSideBarData} />
      <MainBody>
        <AdminHeader
          title="Zicops Learning Space 1"
          pageRoute="/admin/administration"
        />
      <MainBodyBox>
        <div style={{ padding: '30px' }}>
          <TextHeaderWithEditIcon headingText="Learning Space Details" />
          <AdminInfoWrapper
            data={userData}
            // isEditable={isEditable}
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
    </>
  );
}
