import { atom } from "recoil";

export const OrganizationDetailsAtom = atom({
  key:'orgDetailsAtom',
  default: getOrgsTempDetails()
})

export function getOrgsTempDetails(data= {}){
    return {
orgName: data?.orgName,
orgLogo:data?.orgLogo,
orgIndustry:data?.orgIndustry,
orgType:data?.orgType,

orgEmployess: data?.orgEmployess ,
orgUrl:data?.orgUrl,
orgLinkdInUrl:data?.orgLinkdInUrl,
orgFacebookUrl:data?.orgFacebookUrl,
orgTwitterUrl:data?.orgTwitterUrl}
}