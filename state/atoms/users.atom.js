import { atom } from 'recoil';

export const UserStateAtom = atom({
  key: 'userState',
  default: null
});

export const UsersEmailIdAtom = atom({
  key: 'usersEmailID',
  default: []
});
