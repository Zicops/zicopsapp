import { atom } from 'recoil';

export const STATUS = {
  display: ['DRAFT', 'FAILED', 'UPDATING'],
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

export const SwitchToTopicAtom = atom({
  key: 'SwitchToTopic',
  default: null
});
