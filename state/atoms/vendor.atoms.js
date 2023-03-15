import { atom } from 'recoil';
import { VENDOR_MASTER_STATUS } from '@/helper/constants.helper';

export const VendorStateAtom = atom({
  key: 'vendorState',
  default: getVendorObject()
});

export function getVendorObject(data) {
  return {
    vendorId: data?.vendorId || null,
    name: data?.name || '',
    type: data?.type || 'company',
    level: data?.level || 'lsp',
    address: data?.address || '',
    vendorProfileImage: data?.vendorProfileImage || null,
    photoUrl: data?.photoUrl || null,
    website: data?.website || '',
    facebookURL: data?.facebookURL || '',
    instagramURL: data?.instagramURL || '',
    linkedinURL: data?.linkedinURL || '',
    twitterURL: data?.twitterURL || '',
    description: data?.description || '',
    users: data?.users || [],
    status: data?.status || VENDOR_MASTER_STATUS.draft
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
    languages: data?.languages || [],
    sme_expertises: data?.sme_expertises || [],
    crt_expertises: data?.crt_expertises || [],
    content_development: data?.content_development || [],
    experience: data?.experience || [],
    isSpeaker: data?.isSpeaker || false,
    sme: data?.sme || false,
    crt: data?.crt || false,
    cd: data?.cd || false
  };
}

export const allProfileAtom = atom({
  key: 'allprofileState',
  default: []
});

export const VendorExperiencesAtom = atom({
  key: 'vendorExperiences',
  default: getExperiencesObject()
});

export function getExperiencesObject(data) {
  return {
    expId: data?.expId || '',
    pfId: data?.pfId || '',
    title: data?.title || '',
    companyName: data?.companyName || '',
    location: data?.location || '',
    isWorking: data?.isWorking || false,
    employeeType: data?.employeeType || '',
    locationType: data?.locationType || '',
    startMonth: data?.startMonth || '',
    startYear: data?.startYear || '',
    endMonth: data?.endMonth || '',
    endYear: data?.endYear || ''
  };
}

export const VendorAllExperiencesAtom = atom({
  key: 'vendorAllExperiences',
  default: []
});

export const SmeServicesAtom = atom({
  key: 'smeServicesState',
  default: getSMEServicesObject()
});

export function getSMEServicesObject(data) {
  return {
    sme_id: data?.sme_id || '',
    isApplicable: data?.isApplicable || false,
    serviceDescription: data?.serviceDescription || '',
    languages: data?.languages || [],
    expertises: data?.expertises || [],
    formats: data?.formats || [],
    sampleFiles: data?.sampleFiles || []
  };
}

export const CtServicesAtom = atom({
  key: 'ctServicesState',
  default: getCTServicesObject()
});

export function getCTServicesObject(data) {
  return {
    crt_id: data?.crt_id || '',
    isApplicable: data?.isApplicable || false,
    serviceDescription: data?.serviceDescription || '',
    languages: data?.languages || [],
    expertises: data?.expertises || [],
    formats: data?.formats || [],
    sampleFiles: data?.sampleFiles || []
  };
}

export const CdServicesAtom = atom({
  key: 'cdServicesState',
  default: getCDServicesObject()
});

export function getCDServicesObject(data) {
  return {
    cd_id: data?.cd_id || '',
    isApplicable: data?.isApplicable || false,
    serviceDescription: data?.serviceDescription || '',
    languages: data?.languages || [],
    expertises: data?.expertises || [],
    formats: data?.formats || [],
    sampleFiles: data?.sampleFiles || []
  };
}

export const SampleAtom = atom({
  key: 'SampleAtom',
  default: getSampleObject()
});
export function getSampleObject(data) {
  return {
    sampleId: data?.sampleId || null,
    sampleName: data?.sampleName || '',
    description: data?.description || '',
    sampleFile: data?.sampleFile || null,
    fileType: data?.fileType || '',
    rate: data?.rate || '',
    currency: data?.currency || '',
    unit: data?.unit || ''
  };
}
export const allSampleFilesAtom = atom({
  key: 'allSampleFilesState',
  default: []
});

export const vendorUserInviteAtom = atom({
  key: 'vendorUserInviteState',
  default: []
});

export const OrderAtom = atom({
  key: 'orderState',
  default: getOrderObject()
});
export function getOrderObject(data) {
  return {
    order_id: data?.order_id || '',
    vendor_id: data?.vendor_id || '',
    lsp_id: data?.lsp_id || '',
    total: data?.total || 0,
    tax: data?.tax || 0,
    grand_total: data?.grand_total || 0,
    status: data?.status || ''
  };
}
export const SevicesAtom = atom({
  key: 'servicesState',
  default: getServicesObject()
});
export function getServicesObject(data) {
  return {
    service_id: data?.service_id || '',
    order_id: data?.order_id || '',
    service_type: data?.service_type || '',
    description: data?.description || '',
    unit: data?.unit || 0,
    currency: data?.currency || '',
    rate: data?.rate || 0,
    quantity: data?.quantity || 0,
    total: data?.total || 0,
    status: data?.status || ''
  };
}
