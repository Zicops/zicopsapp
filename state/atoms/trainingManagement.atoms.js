import { atom } from 'recoil';

export const TrainerDataAtom = atom({
  key: 'trainerData',
  default: getTrainerDataObj(),
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
    vendorName: data?.vendorName || '',
    inviteEmails: data?.inviteEmails || '',
    id: data?.id || '',
  };
}

export const AddTrainerAtom = atom({
  key: 'addTrainerPopup',
  default: false,
});

export const TrainerProfileAtom = atom({
  key: 'trainerData',
  default: getTrainerProfileObj(),
});

export function getTrainerProfileObj(data = {}) {
  return {
    yearsOfExperience: data?.yearsOfExperience || '',
    linkedinURL: data?.linkedinURL || '',
    twitterURL: data?.twitterURL || '',
    websiteURL: data?.websiteURL || '',
    aboutTrainer: data?.aboutTrainer || '',
  };
}
