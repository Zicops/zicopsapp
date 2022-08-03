import { atom } from 'recoil';

export const UserStateAtom = atom({
  key: 'userState',
  default: getUserObject()
});

export function getUserObject(data) {
  return {
    id: data?.id || null,
    first_name: data?.first_name || '',
    last_name: data?.last_name || '',
    status: data?.status || null,
    role: data?.role || '',
    email: data?.email || '',
    phone: data?.phone || '',
    photo_url: data?.photo_url || null,
    gender: data?.gender || null,

    is_verified: data?.is_verified || false,
    is_active: data?.is_active || false,
    created_by: data?.created_by || '',
    updated_by: data?.updated_by || '',
    created_at: data?.created_at || null,
    updated_at: data?.updated_at || null
  };
}

export const UsersEmailIdAtom = atom({
  key: 'usersEmailID',
  default: []
});

// will delete later if not used
export const IsUpdatedAtom = atom({
  key: 'IsUpdated',
  default: false
});
