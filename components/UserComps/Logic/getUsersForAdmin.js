import {
  GET_LSP_USERS_WITH_ROLE,
  GET_USER_DETAIL,
  GET_USER_LSP_MAP_BY_LSPID,
  userQueryClient
} from '@/api/UserQueries';
import { loadQueryDataAsync } from '@/helper/api.helper';
import { USER_LSP_ROLE } from '@/helper/constants.helper';
import { UsersOrganizationAtom } from '@/state/atoms/users.atom';
import { useRecoilState } from 'recoil';

export async function getUsersForAdmin(isAdmin = false) {
  const lspId = sessionStorage.getItem('lsp_id');
  const resLspUser = await loadQueryDataAsync(
    GET_USER_LSP_MAP_BY_LSPID,
    { lsp_id: lspId, pageCursor: '', Direction: '', pageSize: 1000 },
    {},
    userQueryClient
  );
  if (resLspUser?.error) return { error: 'Error while while loading lsp maps!' };

  // console.log(resLspUser,'lspusers');
  //removing duplicate values
  const _lspUsers = resLspUser?.getUserLspMapsByLspId?.user_lsp_maps?.filter(
    (v, i, a) => a?.findIndex((v2) => v2?.user_id === v?.user_id) === i
  );
  const _userIds = _lspUsers?.map((user) => user?.user_id);

  //removing null value
  const userIds = _userIds?.filter((userId) => !!userId);

  // const lspUsers = resLspUser?.getUserLspMapsByLspId?.user_lsp_maps ;

  const resUserDetails = await loadQueryDataAsync(
    GET_USER_DETAIL,
    { user_id: userIds },
    {},
    userQueryClient
  );

  if (resUserDetails?.error) return { error: 'Error while while loading user detail!' };

  // console.log(resUserDetails?.getUserDetails,'sds');

  const userData = resUserDetails?.getUserDetails?.map((item) => ({
    id: item?.id,
    email: item?.email,
    first_name: item?.first_name,
    last_name: item?.last_name,
    status: item?.status,
    role: item?.role,
    full_name: `${item?.first_name} ${item?.last_name}`
  }));

  const users = [];
  if (isAdmin) {
    for (let i = 0; i < userData?.length; i++) {
      for (let j = 0; j < _lspUsers?.length; j++) {
        if (userData[i]?.id === _lspUsers[j]?.user_id) {
          users.push({
            ...userData[i],
            lsp_status: _lspUsers[j]?.status,
            user_lsp_id: _lspUsers[j]?.user_lsp_id,
            lsp_id: _lspUsers[j]?.lsp_id
          });
        }
      }
    }
  }

  if (!userData?.length) return { error: 'No users found!' };
  if (isAdmin) return users;
  return userData;
}

export default function useAdminQuery() {
  const [userOrgData, setUserOrgData] = useRecoilState(UsersOrganizationAtom);

  async function sortArray(arr, param) {
    const sortedArr = await arr?.sort((a, b) => a?.[`${param}`] - b?.[`${param}`]);
    return sortedArr;
  }
  async function getLspUsers() {
    if (!userOrgData?.lsp_id) return;
    const lspId = userOrgData?.lsp_id;
    const usersResult = await loadQueryDataAsync(
      GET_LSP_USERS_WITH_ROLE,
      { lsp_id: lspId, pageCursor: '', Direction: '', pageSize: 1000 },
      {},
      userQueryClient
    );

    if (usersResult?.error) return { error: 'Error occured while while loading lsp Users!' };
    const formatedUsers = usersResult?.getPaginatedLspUsersWithRoles?.data?.map(
      async (singleUser) => {
        let roles = singleUser?.roles;
        let roleData = {};

        if (roles?.length > 1) {
          const latestUpdatedRole = await sortArray(roles, 'updated_at');
          roleData = latestUpdatedRole?.pop();
        } else {
          roleData = roles?.[0];
        }
        return {
          ...singleUser?.user,
          role: roleData?.role,
          roleData: roleData,
          id: singleUser?.user?.id,
          email: singleUser?.user?.email,
          first_name: singleUser?.user?.first_name,
          last_name: singleUser?.user?.last_name,
          full_name: `${singleUser?.user?.first_name} ${singleUser?.user?.last_name}`,
          user_lsp_id: roleData?.user_lsp_id,
          type: roleData?.role?.toLowerCase() === USER_LSP_ROLE?.vendor ? 'external' : 'internal'
        };
      }
    ) || [];

    const users = Promise?.all(formatedUsers);

    return users;
  }

  return {
    getLspUsers
  };
}
