import { OrganizationDetailsAtom } from '@/state/atoms/organizations.atom';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

export default function useHandleOrgForm() {
  const [orgData, setOrgData] = useRecoilState(OrganizationDetailsAtom);

  const SHEET_URL = '/api/sheet';

  const [isUnitFormReady, setIsUnitFormReady] = useState(false);
  const [isContactFormReady, setIsContactFormReady] = useState(false);
  const [isOrgRegisterationReady, setIsOrgRegisterationReady] = useState(false);
  const [isButtonDisable , setIsButtonDisable] = useState(false);

  useEffect(() => {
    setIsOrgRegisterationReady(
      !!orgData?.orgName?.length &&
        // !!orgData?.orgLogo &&
        !!orgData?.orgIndustry?.length &&
        !!orgData?.orgType?.length &&
        !!orgData?.orgEmployees?.length &&
        !!orgData?.orgUrl.length
      // !!orgData?.orgLinkdInUrl?.length &&
      // !!orgData?.orgFacebookUrl?.length &&
      // !!orgData?.orgTwitterUrl?.length
    );
    setIsUnitFormReady(
      !!orgData?.orgName?.length &&
        !!orgData?.orgUnitName?.length &&
        !!orgData?.orgPostalAddress?.length &&
        !!orgData?.orgCountry?.value?.length &&
        !!orgData?.orgState?.length &&
        !!orgData?.orgCity.length &&
        !!orgData?.orgPostalCode?.length &&
        !!orgData?.orgUnitLogo &&
        !!orgData?.orgLearningSpaceName?.length &&
        !!orgData?.orgLearningSpaceUrl?.length &&
        !!orgData?.orgCheckbox
    );
    setIsContactFormReady(
      (!!orgData?.orgPersonFirstname?.length &&
        !!orgData?.orgPersonLastname?.length &&
        !!orgData?.orgPersonEmailId?.length &&
        !!orgData?.orgPersonContactNumber?.length &&
        !!orgData?.orgPersonRole?.length) ||
        !!orgData?.orgPersonRoleOthers.length
      // !!orgData?.orgPersonRemarks?.length
    );
  }, [orgData]);

  function getBase64(file, onLoadCallback) {
    if (!file) return '';
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
    setIsButtonDisable(true);

    const dataFormat = getOrgResiterObject(orgData);

    const orgLogoBase64 = await getBase64(dataFormat?.orgLogo);

    const orgDataObject = { ...dataFormat, orgLogo: orgLogoBase64 };

    const sendData = [];

    Object.entries(orgDataObject).forEach(([key, value]) => {
      sendData.push(`${value}`);
    });

    // console.log(sendData, 'sendOrgData');

    const res = await fetch(SHEET_URL, {
      method: 'post',
      headers: {
        Accept: 'application.json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ data: sendData }),
      cache: 'default'
    });

    const resEmail = await sendMail();

    console.log(resEmail, 'response', res?.status);
    setIsButtonDisable(false)
    if(!(resEmail?.status === 200 && res?.status === 200)) return false
    return true ;
  }

  async function handleContactPersonForm() {
    if (!isUnitFormReady && !isContactFormReady) return false;

    if (!orgData?.index) return;
    setIsButtonDisable(true);

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
      sendContactData.push(`${value}`);
    });

    console.log(sendContactData, 'sendContactData');

    const res = await fetch(SHEET_URL, {
      method: 'put',
      headers: {
        Accept: 'application.json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ data: sendContactData, rowStart: orgData?.index }),
      cache: 'default'
    });

    // console.log(res, 'contact form response');
    setIsButtonDisable(false)
    if (!res?.status === 200) return false;
    return res;
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

    console.log(res, 'contact form response');
    return res;
  }

  async function sendMail() {
    if (!orgData?.orgPersonEmailId?.length) return false;
    const res = await fetch('http://localhost:3000/api/sendEmail', {
      method: 'post',
      headers: {
        Accept: 'application.json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        recipient: 'joy@zicops.com',
        subject: 'Request to register organization',
        message: `
        Hello Admin,
        Received a request for creating new Organization from :-
        Contact Persons Email: ${orgData?.orgPersonEmailId} email.
        Organization's Name:   ${orgData?.orgName}
        Organization's Url:    ${orgData?.orgUrl}
        You can find the full request in this google sheet
        https://docs.google.com/spreadsheets/d/10Nn5Wn3jwp7dHjY0AekjQvzT1B25SXsc1_VNR5XW4H8/
        Regards,
        Zicops Bot. `
      }),
      cache: 'default'
    });

    // console.log(res,'res at eiasf');

    return res;
  }

  async function addEmail(){
    if(!orgData?.orgPersonEmailId) return false;

    setIsButtonDisable(true);
    const res = await fetch(SHEET_URL, {
      method: 'post',
      headers: {
        Accept: 'application.json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ data: [orgData?.orgPersonEmailId] , sheet: "Emails" }),
      cache: 'default'
    });

    setIsButtonDisable(false);
    if(!res?.status === 200) return false;
    return true ;

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
      orgTwitterUrl: data?.orgTwitterUrl || '',
      orgPersonEmailId: data?.orgPersonEmailId
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
    fetchUnitFormData,
    addEmail,
    isButtonDisable
  };
}
