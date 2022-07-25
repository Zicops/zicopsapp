import { atom } from 'recoil';

export const userState = atom({
  key: 'userState',
  default: null
});

export const usersEmailId = atom({
  key: 'usersEmailID',
  default: []
});
