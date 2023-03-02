import { Skeleton } from '@mui/material';
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
  const userGender = currentUserData?.gender?.toLowerCase() || '';
  let imageUrl = `/images/Avatars/${userGender}Profile.png`;
  if (currentUserData?.photo_url?.length) imageUrl = currentUserData?.photo_url;
  const tabData = [
    {
      name: 'Personal Details',
      component: !currentUserData ? (
        <Skeleton height={'100%'} />
      ) : (
        <ProfilePersonelDetail currentUserData={currentUserData} imageUrl={imageUrl} />
      )
    },
    {
      name: 'Organization Details',
      component: !currentUserData ? (
        <Skeleton height={'100%'} />
      ) : (
        <ProfileOrganizationDetail
          currentUserData={currentUserData}
          setCurrentUserData={setCurrentUserData}
          imageUrl={imageUrl}
        />
      )
    },
    {
      name: 'Profile Preferences',
      component: !currentUserData ? (
        <Skeleton height={'100%'} />
      ) : (
        <ProfilePreferences currentUserData={currentUserData} imageUrl={imageUrl} />
      )
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
