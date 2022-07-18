import { atom } from 'recoil';

export const STATUS = {
  display: ['DRAFT', 'FAILED'],
  flow: [
    'SAVED',
    'APPROVAL_PENDING',
    'APPROVAL_PENDING',
    'ON_HOLD',
    'APPROVED',
    'PUBLISHED',
    'REJECTED'
  ]
};

export const StatusAtom = atom({
  key: 'Status',
  default: STATUS.display[0]
});
