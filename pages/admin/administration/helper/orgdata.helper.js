import { UPDATE_ORGANIZATION_DETAILS, userClient } from '@/api/UserMutations';
import { useQuery,useLazyQuery, useMutation } from '@apollo/client';
import { GET_ORGANIZATIONS_DETAILS, GET_LSP_DETAILS , GET_ORG_UNITS_DETAILS, userQueryClient } from '../../../../API/UserQueries';
import { loadAndCacheDataAsync } from '@/helper/api.helper';

export async function getOrgDetails(orgIdsArr) {
  const data = await loadAndCacheDataAsync(GET_ORGANIZATIONS_DETAILS, 
    { org_ids: orgIdsArr },
   {},
   userQueryClient,
  );
  return data;
}
export function getLspDetails(lspIdArr) {
  const data = loadAndCacheDataAsync(GET_LSP_DETAILS,
    { lsp_ids: lspIdArr },
    {},
    userQueryClient,
  );
  return data;
};

export function getOuDetails(ouIdArr) {
  const data = loadAndCacheDataAsync(GET_ORG_UNITS_DETAILS, 
    { ou_ids: ouIdArr },
   {},
  userQueryClient,
  );

  return data;
}

export async function updateOrgDetails() {
    const [updateOrg] = useMutation(UPDATE_ORGANIZATION_DETAILS, {
    client: userClient
    });

   const res = await updateOrg({ variables: orgData }).catch((err) => {
      console.log(err,'error at update user');
    
   });
  return res;
}
