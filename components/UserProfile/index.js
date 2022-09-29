import { useState } from 'react';
import TabContainer from '../common/TabContainer';
import ProfileOrganizationDetail from './ProfileOrganizationDetail';
import ProfilePersonelDetail from './ProfilePersonelDetail';
import ProfilePreferences from './ProfilePreferences';

const UserProfile = ({ currentUserData = {}, setCurrentUserData }) => {
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
      name: 'Personal Details',
      component: <ProfilePersonelDetail currentUserData={currentUserData} />
    },
    {
      name: 'Organization Details',
      component: (
        <ProfileOrganizationDetail
          currentUserData={currentUserData}
          setCurrentUserData={setCurrentUserData}
        />
      )
    },
    {
      name: 'Profile Preferences',
      component: <ProfilePreferences currentUserData={currentUserData} />
    }
  ];
  const [tab, setTab] = useState(tabData[0].name);
  return (
    <>
      <TabContainer
        customStyles={{ height: '40vh' }}
        tabData={tabData}
        tab={tab}
        setTab={setTab}
        footerObj={{ showFooter: false }}
      />

      {/* <ProfilePersonelDetail /> */}
      {/* <ProfileOrganizationDetail /> */}
      {/* <ProfilePreferences /> */}
      {/* <AssignedCourses /> */}
    </>
  );
};

export default UserProfile;
