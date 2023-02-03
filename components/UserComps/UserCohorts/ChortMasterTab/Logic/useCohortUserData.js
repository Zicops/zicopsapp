import { GET_COHORT_USERS, GET_USER_DETAIL, userQueryClient } from '@/api/UserQueries';
import { loadQueryDataAsync } from '@/helper/api.helper';
import { getCurrentEpochTime } from '@/helper/common.helper';

export default function useCohortUserData() {
  async function getCohortUser(cohortId = '', cohortDetails = false, isNotDisable = true) {
    if (cohortId === '') return;
    const sendData = {
      cohort_id: cohortId,
      publish_time: getCurrentEpochTime(),
      pageCursor: '',
      pageSize: 99999
    };
    const resUsers = await loadQueryDataAsync(
      GET_COHORT_USERS,
      { ...sendData },
      {},
      userQueryClient
    );
    if (!resUsers?.getCohortUsers?.cohorts?.length) return;
    const _cohortUsers = resUsers?.getCohortUsers?.cohorts;
    if (cohortDetails) return _cohortUsers;
    let cohortUsers = [..._cohortUsers];
    if (isNotDisable) {
      cohortUsers = _cohortUsers?.filter(
        (user) => user?.membership_status?.toLowerCase() === 'active'
      );
    }

    const cohortUserIds = cohortUsers?.map((item) => item?.user_id);
    const cohortUserData = [];

    const userListData = await loadQueryDataAsync(
      GET_USER_DETAIL,
      { user_id: cohortUserIds },
      {},
      userQueryClient
    );
    // console.log(userListData?.getUserDetails);
    const userList = userListData?.getUserDetails;

    for (let i = 0; i < userList?.length; i++) {
      for (let j = 0; j < cohortUsers.length; j++) {
        if (userList[i]?.id === cohortUsers[j]?.user_id) {
          cohortUserData.push({
            id: userList[i]?.id,
            role: cohortUsers[j]?.role,
            name: `${userList[i]?.first_name} ${userList[i]?.last_name}`,
            email: userList[i]?.email,
            first_name: userList[i]?.first_name,
            last_name: userList[i]?.last_name,
            ...cohortUsers[j]
          });
          break;
        }
      }
    }
    return cohortUserData;
  }

  async function getCohortManager(cohortId = '') {
    if (cohortId === '') return;
    const userData = await getCohortUser(cohortId);
    // console.log(userData);
    const cohortManager = userData?.filter((item) => item?.role?.toLowerCase() === 'manager');
    return cohortManager;
  }

  async function getCohortUserDetails(cohortId = '', user_id = null) {
    if (cohortId === '') return;
    if (!user_id) return;
    const userData = await getCohortUser(cohortId, true);
    return userData?.filter((item) => item?.user_id === user_id);
  }

  return { getCohortUser, getCohortManager, getCohortUserDetails };
}
