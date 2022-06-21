import { atom } from 'recoil';

export const StatusAtom = atom({
  key: 'Status',
  default: null
});

export const STATUS = ['DRAFT', 'SAVED'];
