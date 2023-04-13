import { atom } from 'recoil';

export const TrainerDataAtom = atom({
  key: 'trainerData',
  default: getTrainerDataObj()
});

export function getTrainerDataObj(data = {}) {
  return {
    lspId: data?.lspId || '',
    name: data?.name || '',
    email: data?.email || '',
    userId: data?.userId || '',
    photo: data?.photo || null,
    expertise: data?.expertise || [],
    status: data?.status || '',
    tag: data?.tag || null,
    vendorId: data?.vendorId || null,
    inviteEmails: data?.inviteEmails || ''
  };
}
