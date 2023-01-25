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
    addUser: data?.addUser || []
  };
}

export const VendorServicesAtom = atom({
  key: 'vendorServicesState',
  default: getVendorServicesObject()
});

export function getVendorServicesObject(data) {
  return {
    isApplicable: data?.isApplicable || true
  };
}
