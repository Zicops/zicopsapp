import { GET_USER_DETAIL, GET_USER_LSP_MAP_BY_LSPID, userQueryClient } from "@/api/UserQueries";
import { loadQueryDataAsync } from "@/helper/api.helper";
import { LEARNING_SPACE_ID } from "@/helper/constants.helper";

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
  const _userIds = resLspUser?.getUserLspMapsByLspId?.user_lsp_maps
  ?.filter((v, i, a) => a?.findIndex((v2) => v2?.user_id === v?.user_id) === i)
  ?.map((user) => user?.user_id);

//removing null value
const userIds = _userIds?.filter((userId) => !!userId) ;

  const lspUsers = resLspUser?.getUserLspMapsByLspId?.user_lsp_maps ;

  const resUserDetails = await loadQueryDataAsync(
    GET_USER_DETAIL,
    { user_id: userIds },
    {},
    userQueryClient
  );

  if (resUserDetails?.error) return { error: 'Error while while loading user detail!' };

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
  if(isAdmin){ 
  for(let i = 0 ; i < userData?.length ; i++){
    for(let j = 0 ; j < lspUsers?.length ; j++){
      if(userData[i]?.id === lspUsers[j]?.user_id){
        users.push({...userData[i], lsp_status: lspUsers[j]?.status , user_lsp_id :lspUsers[j]?.user_lsp_id , lsp_id: lspUsers[j]?.lsp_id});
      }
    }
  }}

  if (!userData?.length) return { error: 'No users found!' };
  if(isAdmin) return users ;
  return userData;
}