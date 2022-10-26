import { OrganizationDetailsAtom } from '@/state/atoms/organizations.atom';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

export default function useHandleOrgForm() {
  const [orgData, setOrgData] = useRecoilState(OrganizationDetailsAtom);

  const SHEET_URL = 'http://localhost:3000/api/sheet'

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

  function getBase64(file, onLoadCallback) {
    return new Promise(function(resolve, reject) {
        var reader = new FileReader();
        reader.onload = function() { resolve(reader.result); };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

  async function handleOrgRegisterForm(){
    if(!isOrgRegisterationReady) return false;

    const dataFormat = getOrgResiterObject(orgData) ;

    const orgLogoBase64 = await getBase64(dataFormat?.orgLogo) ;

    const orgDataObject = {...dataFormat , orgLogo: orgLogoBase64};

    const sendData = []

    Object.entries(orgDataObject).forEach(([key, value]) => {
      sendData.push(`${key}: ${value}`);
    })

    console.log(sendData,'sendOrgData');

    const res = await fetch(SHEET_URL, {
      method: 'post',
      headers: {
        Accept: 'application.json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({'data':sendData}),
      cache: 'default'
    })

    console.log(res,'response');
  }

  function getOrgResiterObject(data={}){
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
    }
  }
  return { isUnitFormReady, isContactFormReady, isOrgRegisterationReady , handleOrgRegisterForm };
}
