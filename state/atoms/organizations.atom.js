import { atom } from 'recoil';

export const OrganizationDetailsAtom = atom({
  key: 'orgDetailsAtom',
  default: getOrgsTempDetails()
});

export function getOrgsTempDetails(data = {}) {
  return {
    orgName: data?.orgName || '',
    orgLogo: data?.orgLogo || null,
    orgIndustry: data?.orgIndustry || '',
    orgType: data?.orgType || '',

    orgEmployees: data?.orgEmployees || '',
    orgUrl: data?.orgUrl || '',
    orgLinkdInUrl: data?.orgLinkdInUrl || '',
    orgFacebookUrl: data?.orgFacebookUrl || '',
    orgTwitterUrl: data?.orgTwitterUrl || '',

    //org unit data
    orgUnitName: data?.orgUnitName || '',
    orgPostalAddress: data?.orgPostalAddress || '',
    orgCountry: data?.orgCountry || '',
    orgState: data?.orgState || '',
    orgCity: data?.orgCity || '',
    orgPostalCode: data?.orgPostalCode || '',
    orgUnitLogo: data?.orgUnitLogo || null,
    orgLearningSpaceName: data?.orgLearningSpaceName || '',
    orgLearningSpaceUrl: data?.orgLearningSpaceUrl || '',
    orgProfilePhoto: data?.orgProfilePhoto || null,
    orgCheckbox: data?.orgCheckbox || false,

    //org contact person data
    orgPersonFirstname: data?.orgPersonFirstname || '',
    orgPersonLastname: data?.orgPersonLastname || '',
    orgPersonEmailId: data?.orgPersonEmailId || '',
    orgPersonContactNumber: data?.orgPersonContactNumber || '',
    orgPersonRole: data?.orgPersonRole || '',
    orgPersonRoleOthers: data?.orgPersonRoleOthers || '',
    orgPersonRemarks: data?.orgPersonRemarks || ''
  };
}
