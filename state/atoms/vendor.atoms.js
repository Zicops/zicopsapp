import { atom } from 'recoil';

export const VendorStateAtom = atom({
  key: 'vendorState',
  default: getVendorObject()
});

export function getVendorObject(data) {
  return {
    vendorId: data?.vendorId || null,
    name: data?.name || '',
    vendorType: data?.vendorType || 'company',
    vendorLevel: data?.vendorLevel || 'lsp',
    address: data?.address || '',
    vendorProfileImage: data?.vendorProfileImage || null,
    website: data?.website || '',
    facebookURL: data?.facebookURL || '',
    instagramURL: data?.instagramURL || '',
    linkedinURL: data?.linkedinURL || '',
    twitterURL: data?.twitterURL || '',
    description: data?.description || '',
    users: data?.users || []
  };
}
export const VendorProfileAtom = atom({
  key: 'vendorProfile',
  default: getProfileObject()
});

export function getProfileObject(data) {
  return {
    profileId: data?.profileId || null,
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

export const VendorExpriencesAtom = atom({
  key: 'vendorExpriences',
  default: getExpriencesObject()
});

export function getExpriencesObject(data) {
  return {
    id: data?.id || '',
    title: data?.title || '',
    companyName: data?.companyName || '',
    location: data?.location || '',
    isWorking: data?.isWorking || false,
    employeeType: data?.employeeType || '',
    locationType: data?.locationType || '',
    startMonth: data?.startMonth || '',
    endMonth: data?.endMonth || ''
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
