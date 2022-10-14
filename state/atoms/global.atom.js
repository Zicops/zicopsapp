import { atom } from 'recoil';

export const CatSubCatAtom = atom({
  key: 'CatSubCat',
  default: getCatSubCatDataObj()
});

export function getCatSubCatDataObj(data = {}) {
  return {
    cat: data?.cat || [],
    subCat: data?.subCat || [],
    allSubCat: data?.allSubCat || [],
    subCatGrp: data?.subCatGrp || {},
    isFiltered: data?.isFiltered || null
  };
}

export const UserDataAtom = atom({
  key: 'userData',
  default: getUserGlobalDataObj()
});

export function getUserGlobalDataObj(data = {}) {
  return {
    userDetails: data?.userDetails || getUserDetailsObj(),
    orgDetails: data?.orgDetails || getOrgDetailsObj(),
    preferences: data?.preferences || []
  };
}

export function getUserDetailsObj(data = {}) {
  return {
    //users basic info
    id: data?.id || null,
    user_lsp_id: data?.user_lsp_id || null,
    first_name: data?.first_name || '',
    last_name: data?.last_name || '',
    status: data?.status || null,
    role: data?.role || 'Learner',

    email: data?.email || null,
    phone: data?.phone || null,
    photo_url: data?.photo_url || null,
    Photo: data?.Photo || null,
    gender: data?.gender || null,

    is_verified: data?.is_verified || false,
    is_active: data?.is_active || false,
    created_by: data?.created_by || null,
    updated_by: data?.updated_by || null,
    created_at: data?.created_at || null,
    updated_at: data?.updated_at || null
  };
}
export function getOrgDetailsObj(data = {}) {
  return {};
}
