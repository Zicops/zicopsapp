import { useState } from 'react';
import TabContainer from '@/common/TabContainer';
import CohortMaster from './CohortMaster';
import CohortMapping from './CohortMapping';
import Users from './Users';

const UserCohorts = () => {
  const tabData = [
    {
      name: 'Cohort Master',
      component: <CohortMaster />
    },
    {
      name: 'Users',
      component: <Users />
    },
    {
      name: 'Cohort Mapping',
      component: <CohortMapping />
    }
  ];
  const [tab, setTab] = useState(tabData[0].name);

  return (
    <>
      <TabContainer
        tabData={tabData}
        tab={tab}
        setTab={setTab}
        footerObj={{
          submitDisplay: 'Save',
          showFooter: tab !== tabData[1].name
        }}
      />
    </>
  );
};

export default UserCohorts;
