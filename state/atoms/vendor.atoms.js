import { LEARNING_SPACE_ID } from '@/helper/constants.helper';
import { atom } from 'recoil';

export const VendorStateAtom = atom({
  key: 'vendorState',
  default: getVendorObject()
});

export function getVendorObject(data) {
  return {
    vendorName: data?.vendorName || '',
    vendorAddress: data?.vendorAddress || '',
    vendorProfileImage: data?.vendorProfileImage || null,
    vendorWebsiteURL: data?.vendorWebsiteURL || '',
    facebookURL: data?.facebookURL || '',
    instagramURL: data?.instagramURL || '',
    linkedinURL: data?.linkedinURL || '',
    twitterURL: data?.twitterURL || '',
    saySomething: data?.saySomething || '',
    addUser: data?.addUser || [],
    vendorId: data?.vendorId || ''
  };
}
export const VendorProfileAtom = atom({
  key: 'vendorProfile',
  default: getProfileObject()
});

export function getProfileObject(data) {
  return {
    profileId: data?.profileId || '',
    firstName: data?.firstName || '',
    lastName: data?.lastName || '',
    email: data?.email || '',
    contactNumber: data?.contactNumber || '',
    description: data?.description || '',
    profileImage: data?.profileImage || null,
    experienceYear: data?.experienceYear || null,
    isSpeaker: data?.isSpeaker || false
  };
}

// export const VendorServicesAtom = atom({
//   key: 'vendorServicesState',
//   default: getVendorServicesObject()
// });

// export function getVendorServicesObject(data) {
//   return {
//     isApplicable: data?.isApplicable || true,
//     serviceDescription: data?.serviceDescription || ''
//   };
// }

export const SmeServicesAtom = atom({
  key: 'smeServicesState',
  default: getSMEServicesObject()
});

export function getSMEServicesObject(data) {
  return {
    isApplicableSME: data?.isApplicableSME || false,
    serviceDescription: data?.serviceDescription || ''
  };
}

export const CtServicesAtom = atom({
  key: 'ctServicesState',
  default: getCTServicesObject()
});

export function getCTServicesObject(data) {
  return {
    isApplicableCT: data?.isApplicableCT || false,
    serviceDescription: data?.serviceDescription || ''
  };
}

export const CdServicesAtom = atom({
  key: 'cdServicesState',
  default: getCDServicesObject()
});

export function getCDServicesObject(data) {
  return {
    isApplicableCD: data?.isApplicableCD || false,
    serviceDescription: data?.serviceDescription || ''
  };
}
