import { GET_USER_DETAIL, GET_USER_LSP_MAP_BY_LSPID, userQueryClient } from "@/api/UserQueries";
import { loadQueryDataAsync } from "@/helper/api.helper";
import { LEARNING_SPACE_ID } from "@/helper/constants.helper";

export async function getUsersForAdmin(){
    const resLspUser = await loadQueryDataAsync(GET_USER_LSP_MAP_BY_LSPID,{lsp_id:LEARNING_SPACE_ID,pageCursor:'',Direction:'',pageSize:1000},{},userQueryClient);
    if(resLspUser?.error) return {error:'Error while while loading lsp maps!'}

    //removing duplicate values
    const userIds = resLspUser?.getUserLspMapsByLspId?.user_lsp_maps?.filter((v,i,a)=> a?.findIndex((v2)=> v2?.user_id === v?.user_id) === i)?.map((user) => user?.user_id);

    const resUserDetails = await loadQueryDataAsync(GET_USER_DETAIL,{user_id:userIds},{},userQueryClient);

    if(resUserDetails?.error) return  {error:'Error while while loading user detail!'} ;
    
    const userData = resUserDetails?.getUserDetails?.map((item) => ({
      ...item,
      id: item?.id,
      email: item?.email,
      first_name: item?.first_name,
      last_name: item?.last_name,
      status: item?.status,
      role: item?.role,
      full_name: `${item?.first_name} ${item?.last_name}`  
    })) ;

    if(!userData?.length) return {error:'No users found!'};
    return userData;
}