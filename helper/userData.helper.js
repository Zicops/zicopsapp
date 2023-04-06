import { GET_USER_DETAIL, userQueryClient } from '@/api/UserQueries';
import { loadQueryDataAsync } from './api.helper';

export async function getUserDetails(userIdArr = []) {
  const _allUserIds = userIdArr?.filter((id) => !!id);

  if (!_allUserIds?.length) return [];

  const userDetails = await loadQueryDataAsync(
    GET_USER_DETAIL,
    { user_id: _allUserIds },
    {},
    userQueryClient
  ).catch((err) => console.log(err));

  return userDetails?.getUserDetails || [];
}
