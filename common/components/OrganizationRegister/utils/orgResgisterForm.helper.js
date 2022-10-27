import { OrganizationDetailsAtom } from '@/state/atoms/organizations.atom';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

export default function useHandleOrgForm() {
  const [orgData, setOrgData] = useRecoilState(OrganizationDetailsAtom);

  const SHEET_URL = 'http://localhost:3000/api/sheet';

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
    return new Promise(function (resolve, reject) {
      var reader = new FileReader();
      reader.onload = function () {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  async function handleOrgRegisterForm() {
    if (!isOrgRegisterationReady) return false;

    const dataFormat = getOrgResiterObject(orgData);

    const orgLogoBase64 = await getBase64(dataFormat?.orgLogo);

    const orgDataObject = { ...dataFormat, orgLogo: orgLogoBase64 };

    const sendData = [];

    Object.entries(orgDataObject).forEach(([key, value]) => {
      sendData.push(`${value}`);
    });

    console.log(sendData, 'sendOrgData');

    const res = await fetch(SHEET_URL, {
      method: 'post',
      headers: {
        Accept: 'application.json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ data: sendData }),
      cache: 'default'
    });

    console.log(res, 'response');
  }

  async function handleContactPersonForm() {
    // if (!isUnitFormReady && !isContactFormReady) return false;

    const contactDataFormat = getOrgContactObject(orgData);

    const orgUnitLogoBase64 = await getBase64(contactDataFormat?.orgUnitLogo);
    const orgProfilePhoto64 = await getBase64(contactDataFormat?.orgProfilePhoto);
    const orgCountryName = contactDataFormat?.orgCountry?.value;

    const orgContactDataObject = {
      ...contactDataFormat,
      orgUnitLogo: orgUnitLogoBase64,
      orgProfilePhoto: orgProfilePhoto64,
      orgCountry: orgCountryName
    };

    if (orgContactDataObject?.orgPersonRole.toLowerCase() === 'others') {
      orgContactDataObject.orgPersonRoleOthers = orgData?.orgPersonRoleOthers;
    }

    const sendContactData = [];

    Object.entries(orgContactDataObject).forEach(([key, value]) => {
      sendContactData.push(`${key}: ${value}`);
    });

    console.log(sendContactData, 'sendContactData');

    // const res = await fetch(SHEET_URL, {
    //   method: 'post',
    //   headers: {
    //     Accept: 'application.json',
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({ data: sendContactData }),
    //   cache: 'default'
    // });

    // console.log(res, 'contact form response');
  }

  async function fetchUnitFormData() {
    const res = await fetch(SHEET_URL, {
      method: 'get',
      headers: {
        Accept: 'application.json',
        'Content-Type': 'application/json'
      },
      cache: 'default'
    }).then((r) => r.json());

    // console.log(res, 'contact form response');
    return res;
  }

  function getOrgResiterObject(data = {}) {
    return {
      orgName: data?.orgName || '',
      orgLogo: data?.orgLogo || null,
      orgIndustry: data?.orgIndustry || '',
      orgType: data?.orgType || '',

      orgEmployees: data?.orgEmployees || '',
      orgUrl: data?.orgUrl || '',
      orgLinkdInUrl: data?.orgLinkdInUrl || '',
      orgFacebookUrl: data?.orgFacebookUrl || '',
      orgTwitterUrl: data?.orgTwitterUrl || ''
    };
  }

  function getOrgContactObject(data = {}) {
    return {
      orgUnitName: data?.orgUnitName || '',
      orgPostalAddress: data?.orgPostalAddress || '',
      orgCountry: data?.orgCountry || { value: '', countryCode: '' },
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
      orgPersonRemarks: data?.orgPersonRemarks || ''
    };
  }

  return {
    isUnitFormReady,
    isContactFormReady,
    isOrgRegisterationReady,
    handleOrgRegisterForm,
    handleContactPersonForm,
    fetchUnitFormData
  };
}
