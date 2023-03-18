import { truncateToN } from '@/helper/common.helper';
import { VENDOR_MASTER_STATUS } from '@/helper/constants.helper';
import { getEncodedFileNameFromUrl } from '@/helper/utils.helper';
import {
  getExperiencesObject,
  VendorExperiencesAtom,
  VendorProfileAtom
} from '@/state/atoms/vendor.atoms';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useRecoilState } from 'recoil';

export default function useProfile() {
  const [isOpenExpriences, setIsOpenExpriences] = useState(false);
  const [isOpenLanguage, setIsOpenLanguage] = useState(false);
  const [isOpenSmeExpertise, setOpenSmeExpertise] = useState(false);
  const [isOpenCrtExpertise, setOpenCrtExpertise] = useState(false);
  const [isOpenCdExpertise, setOpenCdExpertise] = useState(false);
  const [expertiseSearch, setExpertiseSearch] = useState('');
  const [profileData, setProfileData] = useRecoilState(VendorProfileAtom);
  const [experiencesData, setExperiencesData] = useRecoilState(VendorExperiencesAtom);
  const [selectedSmeExpertise, setSelectedSmeExpertise] = useState([]);
  const [selectedCrtExpertise, setSelectedCrtExpertise] = useState([]);
  const [selectedCdExpertise, setSelectedCdExpertise] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);

  const router = useRouter();
  const vendorId = router.query.vendorId || '0';

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
        (e) => _experienceData?.expId === e?.expId
      );

      if (editExpIndex >= 0) data.experienceData[editExpIndex] = _experienceData;
      if (editExpIndex === -1) data?.experienceData?.push(_experienceData);

      return data;
    });

    setIsOpenExpriences(false);
    setExperiencesData(getExperiencesObject());
  };
  const handleLanguageSelection = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedLanguages([...selectedLanguages, value]);
    } else {
      setSelectedLanguages(selectedLanguages?.filter((lang) => lang !== value));
    }
  };

  const addLanguagesHandler = () => {
    setProfileData({ ...profileData, languages: [...selectedLanguages] });
    setIsOpenLanguage(false);
  };

  const handleAddSmeExpertise = () => {
    setProfileData({ ...profileData, sme_expertises: [...selectedSmeExpertise] });
    setOpenSmeExpertise(false);
  };
  const handleAddCrtExpertise = () => {
    setProfileData({ ...profileData, crt_expertises: [...selectedCrtExpertise] });
    setOpenCrtExpertise(false);
  };
  const handleAddCdExpertise = () => {
    setProfileData({ ...profileData, content_development: [...selectedCdExpertise] });
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
    getFileName
  };
}
