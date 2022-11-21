import { atom } from 'recoil';

export const OrganizationAtom = atom({
  key: 'organizationState',
  default: getOrgObject()
});

export function getOrgObject(data) {
  return {
    org_id: data?.org_id || '',
    name: data?.name || '',
    logo_url: data?.logo_url || '',
    industry: data?.industry || '',
    type: data?.type || '',
    subdomain: data?.subdomain || '',
    employee_count: data?.employee_count || '',
    website: data?.website || '',
    photo_url: data?.photo_url || '',
    linkedin_url: data?.linkedin_url || '',
    facebook_url: data?.facebook_url || '',
    twitter_url: data?.twitter_url || '',
    status: data?.status || ''
  };
}

export const LearningSpaceAtom = atom({
  key: 'learningSpaceState',
  default: getLSPObject()
});
export function getLSPObject(data) {
  return {
    org_id: data?.org_id || '',
    ou_id: data?.ou_id || '',
    lsp_id: data?.lsp_id || '',
    name: data?.name || '',
    no_users: data?.no_users || '',
    is_default: data?.is_default || '',
    status: data?.status || '',
    logo_url: data?.logo_url || '',
    profile_url: data?.profile_url || '',
    owners: data?.owners || ''
  };
}

export const OrganizationUnitAtom = atom({
  key: 'organizationUnitState',
  default: getOUnitObject()
});

export function getOUnitObject(data) {
  return {
    org_id: data?.org_id || '',
    ou_id: data?.ou_id || '',
    emp_count: data?.emp_count || '',
    address: data?.address || '',
    city: data?.city || '',
    state: data?.state || '',
    country: data?.country || '',
    postal_code: data?.postal_code || '',
    status: data?.status || '',
    created_by: data?.created_by || '',
    updated_by: data?.updated_by || ''
  };
}
