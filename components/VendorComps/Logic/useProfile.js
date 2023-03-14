import { VENDOR_MASTER_STATUS } from '@/helper/constants.helper';
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
    const StartDate = experiencesData?.startMonth?.concat('-', experiencesData?.startYear);
    const start_date = new Date(StartDate);
    const start_timestamp = start_date.getTime() / 1000;
    const EndDate = experiencesData?.endMonth?.concat('-', experiencesData?.endYear);
    const end_date = new Date(EndDate);
    const end_timestamp = end_date.getTime() / 1000;
    const experienceData = {
      vendor_id: vendorId || '',
      title: experiencesData?.title || '',
      email: profileData?.email || '',
      company_name: experiencesData?.companyName || '',
      employement_type: experiencesData?.employeeType || '',
      location: experiencesData?.location || '',
      location_type: experiencesData?.locationType || '',
      start_date: start_timestamp || null,
      end_date: end_timestamp || null,
      status: VENDOR_MASTER_STATUS.active
    };
    setProfileData((prev) => ({ ...prev, experience: [...prev?.experience, experienceData] }));
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
    setSelectedLanguages
  };
}
