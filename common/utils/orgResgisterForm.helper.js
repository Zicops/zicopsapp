import { OrganizationDetailsAtom } from '@/state/atoms/organizations.atom';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

export default function useHandleOrgForm() {
  const [orgData, setOrgData] = useRecoilState(OrganizationDetailsAtom);

  const [isUnitFormReady, setIsUnitFormReady] = useState(false);
  const [isContactFormReady, setIsContactFormReady] = useState(false);
  const [isOrgRegisterationReady, setIsOrgRegisterationReady] = useState(false);

  useEffect(() => {
    setIsOrgRegisterationReady(
      !!orgData?.orgName?.length &&
        !!orgData?.orgLogo &&
        !!orgData?.orgIndustry?.length &&
        !!orgData?.orgType?.length &&
        !!orgData?.orgEmployees?.length &&
        !!orgData?.orgUrl.length &&
        !!orgData?.orgLinkdInUrl?.length &&
        !!orgData?.orgFacebookUrl?.length &&
        !!orgData?.orgTwitterUrl?.length
    );
    setIsUnitFormReady(
      !!orgData?.orgName?.length &&
        !!orgData?.orgUnitName?.length &&
        !!orgData?.orgPostalAddress?.length &&
        !!orgData?.orgCountry?.length &&
        !!orgData?.orgState?.length &&
        !!orgData?.orgCity.length &&
        !!orgData?.orgPostalCode?.length &&
        !!orgData?.orgUnitLogo &&
        !!orgData?.orgLearningSpaceName?.length &&
        !!orgData?.orgLearningSpaceUrl?.length &&
        !!orgData?.orgCheckbox
    );
    setIsContactFormReady(
      !!orgData?.orgPersonFirstname?.length &&
        !!orgData?.orgPersonLastname?.length &&
        !!orgData?.orgPersonEmailId?.length &&
        !!orgData?.orgPersonContactNumber?.length &&
        !!orgData?.orgPersonRole?.length &&
        !!orgData?.orgPersonRoleOthers.length &&
        !!orgData?.orgPersonRemarks?.length
    );
  }, [orgData]);
  return { isUnitFormReady, isContactFormReady, isOrgRegisterationReady };
}
