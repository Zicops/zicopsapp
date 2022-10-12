import { atom } from 'recoil';

export const CatSubCatAtom = atom({
  key: 'CatSubCat',
  default: getCatSubCatDataObj()
});

export function getCatSubCatDataObj(data = {}) {
  return {
    cat: data?.cat || [],
    subCat: data?.subCat || [],
    allSubCat: data?.allSubCat || [],
    subCatGrp: data?.subCatGrp || {},
    isFiltered: data?.isFiltered || null
  };
}

export const UserDataAtom = atom({
  key: 'userData',
  default: {
    userDetails: getUserDetailsObj(),
    orgDetails: getOrgDetailsObj(),
    preferences: []
  }
});

export function getUserDetailsObj(data = {}) {
  return {};
}
export function getOrgDetailsObj(data = {}) {
  return {};
}
