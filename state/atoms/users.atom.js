import { LEARNING_SPACE_ID } from '@/helper/constants.helper';
import { atom } from 'recoil';

export const UserStateAtom = atom({
  key: 'userState',
  default: getUserObject()
});

export function getUserObject(data) {
  return {
    //users basic info
    id: data?.id || null,
    first_name: data?.first_name || '',
    last_name: data?.last_name || '',
    status: data?.status || null,
    role: data?.role || 'Learner',

    //for now dont update email
    email: data?.email || '',
    phone: data?.phone || '',
    photo_url: data?.photo_url || null,
    Photo: data?.Photo || null,
    gender: data?.gender || null,

    //only do isVerified true when users do its basic account setup
    is_verified: data?.is_verified || false,
    is_active: data?.is_active || true,
    created_by: data?.created_by || '',
    updated_by: data?.updated_by || '',
    created_at: data?.created_at || null,
    updated_at: data?.updated_at || null

    //language mapping
  };
}

export const UsersEmailIdAtom = atom({
  key: 'usersEmailID',
  default: []
});

export const UsersOrganizationAtom = atom({
  key: 'userOrgDetails',
  default: getUserOrgObject()
});

export function getUserOrgObject(data = {}) {
  return {
    user_id: data?.user_id || null,

    //organization data
    organization_name: data?.user_organization_name || 'Zicops',
    organization_unit: data?.organization_unit || 'Zicops ,India',

    user_organization_id: data?.user_organization_id || 'Zicops, Pune',
    organization_id: data?.organization_id || 'Zicops',
    organization_role: data?.organization_role || '',
    employee_id: data?.employee_id || '',
    org_is_active: data?.org_is_active || true, // user language and role mutation also have is_active

    //learning space id basically Organization and we can find its unit for now make unit as pune
    user_lsp_id: data?.user_lsp_id || null,
    lsp_id: data?.lsp_id || LEARNING_SPACE_ID,
    status: data?.status || 'Active',

    // user role data
    user_role_id: data?.user_role_id || null,
    user_role: data?.role || 'Learner',
    role_is_active: data?.role_is_active || true,

    // user language data
    user_language_id: data?.user_language_id || null,
    language: data?.language || 'English',
    is_base_language: data?.is_base_language || false,
    lang_is_active: data?.lang_is_active || true,

    //user preferences data
    user_preference_id: data?.user_preference_id || null,
    sub_category: data?.sub_category || null,
    is_base: data?.is_base || false,
    preferences_is_active: data?.preferences_is_active || true,
    sub_categories: data?.sub_categories || [],

    created_by: data?.created_by || 'Zicops',
    updated_by: data?.updated_by || 'Zicops'
  };
}

// will delete later if not used
export const IsUpdatedAtom = atom({
  key: 'IsUpdated',
  default: false
});

//cohort master atom

export const CohortMasterData = atom({
  key: 'cohortMasterState',
  default: getCohortMasterObject()
});

export function getCohortMasterObject(data = {}) {
  return {
    id: data?.cohort_id || null,
    cohort_name: data?.name || '',
    cohort_code: data?.code || '',
    status: data?.status || '',
    lsp_id: data?.lsp_id || 'Zicops learning Spaces',
    cohort_type: data?.type || '',
    description: data?.description || '',
    cohort_image: data?.cohort_image || null,
    image_url: data?.imageUrl || '',
    managers: []
  };
}

export const SelectedCohortDataAtom = atom({
  key: 'selectedCohortData',
  default: getSelectedCohortDataObject()
});

export function getSelectedCohortDataObject(data = {}) {
  return {
    main: data?.main || null,
    userCohort: data?.userCohort || null,
    cohrotCourses: data?.cohrotCourses || [],
    cohortUsers: data?.cohortUsers || []
  };
}
