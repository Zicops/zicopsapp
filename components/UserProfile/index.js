import TabContainer from '../common/TabContainer';
import { useState } from 'react';
import ProfileOrganizationDetail from './ProfileOrganizationDetail';
import ProfilePersonelDetail from './ProfilePersonelDetail';
import ProfilePreferences from './ProfilePreferences';

const UserProfile = () => {
  const tabData = [
    {
      name: 'Personel Details',
      component: <ProfilePersonelDetail />
    },
    {
      name: 'Organization Details',
      component: <ProfileOrganizationDetail />
    },
    {
      name: 'Profile Preferences',
      component: <ProfilePreferences />
    }
  ];
  const [tab, setTab] = useState(tabData[0].name);
  return (
    <>
      <TabContainer tabData={tabData} tab={tab} setTab={setTab} />
      {/* <ProfilePersonelDetail /> */}
      {/* <ProfileOrganizationDetail /> */}
      {/* <ProfilePreferences /> */}
    </>
  );
};

export default UserProfile;
