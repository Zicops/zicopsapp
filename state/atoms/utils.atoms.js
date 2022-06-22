import { atom } from 'recoil';

export const STATUS = ['DRAFT', 'SAVED'];

export const StatusAtom = atom({
  key: 'Status',
  default: STATUS[0]
});
