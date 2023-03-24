import { convertUrlToFile, truncateToN } from '@/helper/common.helper';
import { VENDOR_MASTER_STATUS, VENDOR_MASTER_TYPE } from '@/helper/constants.helper';
import { getEncodedFileNameFromUrl } from '@/helper/utils.helper';
import {
  CdServicesAtom,
  CtServicesAtom,
  getExperiencesObject,
  getProfileObject,
  SmeServicesAtom,
  VendorExperiencesAtom,
  VendorProfileAtom,
  VendorStateAtom
} from '@/state/atoms/vendor.atoms';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

export default function useProfile() {
  const [isOpenExpriences, setIsOpenExpriences] = useState(false);
  const [isOpenLanguage, setIsOpenLanguage] = useState(false);
  const [isOpenSmeExpertise, setOpenSmeExpertise] = useState(false);
  const [isOpenCrtExpertise, setOpenCrtExpertise] = useState(false);
  const [isOpenCdExpertise, setOpenCdExpertise] = useState(false);
  const [expertiseSearch, setExpertiseSearch] = useState('');
  const [profileData, setProfileData] = useRecoilState(VendorProfileAtom);
  const [experiencesData, setExperiencesData] = useRecoilState(VendorExperiencesAtom);
  const [selectedSmeExpertise, setSelectedSmeExpertise] = useState(profileData?.sme_expertises);
  const [tempSmeExpertise, setTempSmeExpertise] = useState(profileData?.sme_expertises);
  const [selectedCrtExpertise, setSelectedCrtExpertise] = useState(profileData?.crt_expertises);
  const [tempCrtExpertise, setTempCrtExpertise] = useState(profileData?.crt_expertises);
  const [selectedCdExpertise, setSelectedCdExpertise] = useState(profileData?.content_development);
  const [tempCdExpertise, setTempCdExpertise] = useState(profileData?.content_development);

  const [selectedLanguages, setSelectedLanguages] = useState(profileData?.languages);
  const [tempLanguages, setTempLanguages] = useState(profileData?.languages);

  const router = useRouter();
  const vendorId = router.query.vendorId || '0';
  const vendorData = useRecoilValue(VendorStateAtom);
  const smeData = useRecoilValue(SmeServicesAtom);
  const ctData = useRecoilValue(CtServicesAtom);
  const cdData = useRecoilValue(CdServicesAtom);

  useEffect(async () => {
    if (vendorData?.type !== VENDOR_MASTER_TYPE.individual) return;
    if (profileData?.profileId) return;

    const allServiceLanguages = [
      ...new Set([...smeData?.languages, ...ctData?.languages, ...cdData?.languages])
    ];

    setProfileData(
      getProfileObject({
        email: vendorData?.users?.[0],
        description: vendorData?.description,
        profileImage: await convertUrlToFile(
          vendorData?.photoUrl,
          getEncodedFileNameFromUrl(vendorData?.photoUrl)
        ),
        languages: allServiceLanguages,
        sme_expertises: smeData?.expertises,
        crt_expertises: ctData?.expertises,
        content_development: cdData?.expertises
      })
    );
    setSelectedLanguages(allServiceLanguages);
    setSelectedSmeExpertise(smeData?.expertises);
    setSelectedCdExpertise(cdData?.expertises);
    setSelectedCrtExpertise(ctData?.expertises);
    setTempLanguages(allServiceLanguages);
    setTempSmeExpertise(smeData?.expertises);
    setTempCdExpertise(cdData?.expertises);
    setTempCrtExpertise(ctData?.expertises);
  }, [vendorData?.type]);

  const completeExperienceHandler = () => {
    const _experienceData = {
      ...experiencesData,
      vendor_id: vendorId || '',
      email: profileData?.email || '',
      status: VENDOR_MASTER_STATUS.active
    };

    setProfileData((prev) => {
      const data = structuredClone(prev);
      const editExpIndex = prev?.experienceData?.findIndex(
        (e) => !!e?.expId && _experienceData?.expId === e?.expId
      );

      if (editExpIndex >= 0) data.experienceData[editExpIndex] = _experienceData;
      if (editExpIndex === -1) data?.experienceData?.push(_experienceData);

      return data;
    });

    setIsOpenExpriences(false);
    setExperiencesData(getExperiencesObject());
  };

  const addLanguagesHandler = () => {
    setProfileData({ ...profileData, languages: [...selectedLanguages] });
    setTempLanguages([...selectedLanguages]);
    setIsOpenLanguage(false);
  };

  const handleLanguageSelection = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedLanguages([...selectedLanguages, value]);
    } else {
      setSelectedLanguages(selectedLanguages?.filter((lang) => lang !== value));
    }
  };

  const handleAddRemoveLanguage = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedLanguages([...selectedLanguages, value]);
    } else {
      setProfileData({
        ...profileData,
        languages: [...profileData?.languages?.filter((lang) => lang !== value)]
      });
      setSelectedLanguages([...selectedLanguages?.filter((lang) => lang !== value)]);
    }
  };

  const closeLanguagesHandler = () => {
    setSelectedLanguages([...tempLanguages]);
    setTempLanguages([...tempLanguages]);
    setIsOpenLanguage(false);
  };

  const handleAddSmeExpertise = () => {
    setProfileData({ ...profileData, sme_expertises: [...selectedSmeExpertise] });
    setTempSmeExpertise([...selectedSmeExpertise]);
    setOpenSmeExpertise(false);
  };
  const handleAddCrtExpertise = () => {
    setProfileData({ ...profileData, crt_expertises: [...selectedCrtExpertise] });
    setTempCrtExpertise([...selectedCrtExpertise]);
    setOpenCrtExpertise(false);
  };
  const handleAddCdExpertise = () => {
    setProfileData({ ...profileData, content_development: [...selectedCdExpertise] });
    setTempCdExpertise([...selectedCdExpertise]);
    setOpenCdExpertise(false);
  };

  const handleAddRemoveSmeExpertise = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedSmeExpertise([...selectedSmeExpertise, value]);
    } else {
      setProfileData({
        ...profileData,
        sme_expertises: [...profileData?.sme_expertises?.filter((lang) => lang !== value)]
      });
      setSelectedSmeExpertise([...selectedSmeExpertise?.filter((lang) => lang !== value)]);
    }
  };
  const handleAddRemoveCrtExpertise = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedCrtExpertise([...selectedCrtExpertise, value]);
    } else {
      setProfileData({
        ...profileData,
        crt_expertises: [...profileData?.crt_expertises?.filter((lang) => lang !== value)]
      });
      setSelectedCrtExpertise([...selectedCrtExpertise?.filter((lang) => lang !== value)]);
    }
  };
  const handleAddRemoveCdExpertise = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      selectedCdExpertise([...selectedCdExpertise, value]);
    } else {
      setProfileData({
        ...profileData,
        content_development: [...profileData?.content_development?.filter((lang) => lang !== value)]
      });
      selectedCdExpertise([...selectedCdExpertise?.filter((lang) => lang !== value)]);
    }
  };

  const closeExpertiseSmeHandler = () => {
    setSelectedSmeExpertise([...tempSmeExpertise]);
    setTempSmeExpertise([...tempSmeExpertise]);
    setOpenSmeExpertise(false);
  };
  const closeExpertiseCrtHandler = () => {
    setSelectedCrtExpertise([...tempCrtExpertise]);
    setTempCrtExpertise([...tempCrtExpertise]);
    setOpenCrtExpertise(false);
  };
  const closeExpertiseCdHandler = () => {
    setSelectedCdExpertise([...tempCdExpertise]);
    setTempCdExpertise([...tempCdExpertise]);
    setOpenCdExpertise(false);
  };
  function getFileName() {
    return truncateToN(
      profileData?.profileImage?.name || getEncodedFileNameFromUrl(profileData?.photoUrl),
      45
    );
  }

  return {
    completeExperienceHandler,
    handleLanguageSelection,
    addLanguagesHandler,
    handleAddSmeExpertise,
    handleAddCrtExpertise,
    handleAddCdExpertise,
    isOpenExpriences,
    setIsOpenExpriences,
    isOpenLanguage,
    setIsOpenLanguage,
    isOpenSmeExpertise,
    setOpenSmeExpertise,
    isOpenCrtExpertise,
    setOpenCrtExpertise,
    isOpenCdExpertise,
    setOpenCdExpertise,
    expertiseSearch,
    setExpertiseSearch,
    profileData,
    setProfileData,
    experiencesData,
    setExperiencesData,
    selectedSmeExpertise,
    setSelectedSmeExpertise,
    selectedCrtExpertise,
    setSelectedCrtExpertise,
    selectedCdExpertise,
    setSelectedCdExpertise,
    selectedLanguages,
    setSelectedLanguages,
    getFileName,
    handleAddRemoveLanguage,
    closeLanguagesHandler,
    tempLanguages,
    handleAddRemoveSmeExpertise,
    handleAddRemoveCrtExpertise,
    handleAddRemoveCdExpertise,
    closeExpertiseSmeHandler,
    closeExpertiseCrtHandler,
    closeExpertiseCdHandler,
    tempSmeExpertise,
    tempCrtExpertise,
    tempCdExpertise
  };
}
