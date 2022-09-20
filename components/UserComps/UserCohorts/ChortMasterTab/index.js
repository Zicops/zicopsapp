import { useEffect, useState } from 'react';
import TabContainer from '@/common/TabContainer';
import CohortMaster from './CohortMaster';
import CohortMapping from './CohortMapping';
import Users from './Users';
import { STATUS, StatusAtom } from '@/state/atoms/utils.atoms';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/router';
import { CohortMasterData, getCohortMasterObject } from '@/state/atoms/users.atom';
import { useHandleCohortMaster } from '../Logic/useHandleCohortMaster.helper';

const UserCohorts = ({ isEdit = false }) => {
  const [status, setStatus] = useRecoilState(StatusAtom);

  const [cohortMasterData, setCohortMasterData] = useRecoilState(CohortMasterData);
  const { saveCohortMaster } = useHandleCohortMaster();

  const router = useRouter();

  useEffect(() => {
    console.log(router?.query);
  }, [router?.query]);
  const tabData = [
    {
      name: 'Cohort Master',
      component: <CohortMaster isEdit={isEdit} />
    },
    {
      name: 'Users',
      component: <Users />
    },
    {
      name: 'Course Mapping',
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
          // submitDisplay: 'Save',
          showFooter: tab === tabData[0].name,
          status: status || STATUS.display[0],
          submitDisplay: cohortMasterData?.id ? 'Update' : 'Save',
          handleSubmit: () => saveCohortMaster(),
          handleCancel: () => {
            setCohortMasterData(getCohortMasterObject());
            router.push('/admin/user/user-cohort/');
          }
        }}
      />
    </>
  );
};

export default UserCohorts;
