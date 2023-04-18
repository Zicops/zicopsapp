import { atom } from 'recoil';
import { VENDOR_MASTER_STATUS, VENDOR_ORDER_STATUS } from '@/helper/constants.helper';

export const IsVendorAdminLoadingAtom = atom({
  key: 'IsVendorAdminLoading',
  default: null
});

export const VendorCurrentStateAtom = atom({
  key: 'VendorCurrentState',
  default: getVendorCurrentStateObj()
});

export function getVendorCurrentStateObj(data = {}) {
  return {
    isUpdating: data?.isUpdating || false,
    isSaved: data?.isSaved || false,
    errors: data?.errors || [],
    enabledServices: [...new Set(data?.enabledServices || [])]
  };
}

export const VendorStateAtom = atom({
  key: 'vendorState',
  default: getVendorObject()
});

export function getVendorObject(data) {
  return {
    vendorId: data?.vendorId || null,
    lspId: data?.lspId || null,
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
    status: data?.status || VENDOR_MASTER_STATUS.draft,
    fileUploadPercent: data?.fileUploadPercent || 0
  };
}

export const VendorProfileAtom = atom({
  key: 'vendorProfile',
  default: getProfileObject()
});

export function getProfileObject(data) {
  return {
    vendorId: data?.vendorId || null,
    profileId: data?.profileId || null,
    firstName: data?.firstName || '',
    lastName: data?.lastName || '',
    email: data?.email || '',
    contactNumber: data?.contactNumber || '',
    description: data?.description || '',
    profileImage: data?.profileImage || null,
    photoUrl: data?.photoUrl || null,
    experienceYear: data?.experienceYear || null,
    languages: data?.languages || [],
    sme_expertises: data?.sme_expertises || [],
    crt_expertises: data?.crt_expertises || [],
    content_development: data?.content_development || [],
    experience: data?.experience || [],
    experienceData: data?.experienceData || [],
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
    localIndex: data?.localIndex || null,
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

export const VendorAdminsAtom = atom({
  key: 'VendorAdmins',
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
    sampleFiles: data?.sampleFiles || [],
    isExpertiseOnline: data?.isExpertiseOnline || false,
    isExpertiseOffline: data?.isExpertiseOffline || false
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
    sampleFiles: data?.sampleFiles || [],
    isExpertiseOnline: data?.isExpertiseOnline || false,
    isExpertiseOffline: data?.isExpertiseOffline || false
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
    sampleFiles: data?.sampleFiles || [],
    isExpertiseOnline: data?.isExpertiseOnline || false,
    isExpertiseOffline: data?.isExpertiseOffline || false
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
    unit: data?.unit || '',
    fileUploadPercent: data?.fileUploadPercent || 0
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
  default: getVendorOrderObject()
});
export function getVendorOrderObject(data) {
  return {
    orderId: data?.orderId || '',
    vendorId: data?.vendorId || '',
    lspId: data?.lspId || '',
    total: data?.total || 0,
    tax: data?.tax || 0,
    grossTotal: data?.grossTotal || 0,
    description: data?.description || '',
    status: data?.status || VENDOR_ORDER_STATUS?.added,
    currency: data?.currency || ''
  };
}
export const ServicesAtom = atom({
  key: 'servicesState',
  default: getVendorServicesObject()
});

export function getVendorServicesObject() {
  return { sme: [], crt: [], cd: [], speakers: [] };
}

export function getServicesObject(data) {
  return {
    serviceId: data?.serviceId || '',
    orderId: data?.orderId || '',
    serviceType: data?.serviceType || '',
    description: data?.description || '',
    unit: data?.unit || 0,
    rate: data?.rate || 0,
    quantity: data?.quantity || 0,
    total: data?.total || 0,
    status: data?.status || '',
    isActive: data?.isActive || false
  };
}

export const VendorServicesListAtom = atom({
  key: 'vendorServicesList',
  default: getVendorServicesList()
});

export function getVendorServicesList() {
  return { sme: false, crt: false, cd: false, speakers: false };
}

export const AllServicesAtom = atom({
  key: 'allservicesState',
  default: []
});
export const CommercialsAtom = atom({
  key: 'commercialsState',
  default: getCourseCommercialsObject
});
export function getCourseCommercialsObject(data) {
  return {
    id: data?.id || null,
    courseId: data?.courseId || null,
    is_decided: data?.is_decided,
    is_paid_traning: data?.is_paid_traning,
    price_per_seat: data?.price_per_seat || '',
    currency: data?.currency,
    tax_percentage: data?.tax_percentage || null,
    total: data?.total || null,
    is_registration_open: data?.is_registration_open,
    is_booking_open: data?.is_booking_open,
    max_registrations: data?.max_registrations || null,
    registration_end_date: data?.registration_end_date,
    booking_start_date: data?.booking_start_date,
    booking_end_date: data?.booking_end_date,
    registration_publish_by: data?.registration_publish_by,
    registration_publish_on: data?.registration_publish_on,
    booking_publish_on: data?.booking_publish_on,
    booking_publish_by: data?.booking_publish_by,
    registration_start_date: data?.registration_start_date,
    is_publish_date: data?.is_publish_date,
    is_start_date: data?.is_start_date
  };
}
