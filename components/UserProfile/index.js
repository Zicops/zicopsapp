import { useState } from 'react';
import TabContainer from '../common/TabContainer';
import ProfileOrganizationDetail from './ProfileOrganizationDetail';
import ProfilePersonelDetail from './ProfilePersonelDetail';
import ProfilePreferences from './ProfilePreferences';

const UserProfile = () => {
  // {
  //   status,
  //     (submitDisplay = 'Submit'),
  //     (disableSubmit = false),
  //     (handleSubmit = function () {}),
  //     (cancelDisplay = 'Cancel'),
  //     (handleCancel = function () {}),
  //     (showFooter = true);
  // } = footerObj
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
      <TabContainer tabData={tabData} tab={tab} setTab={setTab} footerObj={{ showFooter: false }} />

      {/* <ProfilePersonelDetail /> */}
      {/* <ProfileOrganizationDetail /> */}
      {/* <ProfilePreferences /> */}
      {/* <AssignedCourses /> */}
    </>
  );
};

export default UserProfile;
