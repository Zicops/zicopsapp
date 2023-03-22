import LabeledInput from '@/components/common/FormComponents/LabeledInput';
import LabeledRadioCheckbox from '@/components/common/FormComponents/LabeledRadioCheckbox';
import LabeledTextarea from '@/components/common/FormComponents/LabeledTextarea';
import IconButton from '@/components/common/IconButton';
import { changeHandler } from '@/helper/common.helper';
import { VENDOR_FILE_FORMATS, VENDOR_LANGUAGES } from '@/helper/constants.helper';
import {
  allProfileAtom,
  CdServicesAtom,
  CtServicesAtom,
  getProfileObject,
  getSampleObject,
  SampleAtom,
  SmeServicesAtom,
  VendorProfileAtom
} from '@/state/atoms/vendor.atoms';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import AddSample from '../../AddSample';
import AddVendorProfile from '../../AddVendorProfile';
import VendorPopUp from '../../common/VendorPopUp';
import FileManageVendor from '../../FileManageVendor';
import useHandleVendor from '../../Logic/useHandleVendor';
import ProfileManageVendor from '../../ProfileMangeVendor';
import styles from '../../vendorComps.module.scss';
import AddExpertise from './AddExpertise';

export default function AddServices({ data, setData = () => {}, inputName, experticeName, pType }) {
  const [isOpenProflie, setIsOpenProfile] = useState(false);
  const [expertisePopupState, setExpertisePopupState] = useState(false);
  const [languagePopupState, setLanguagePopupState] = useState(false);
  const [opdeliverablePopupState, setOPDeliverablePopupState] = useState(false);
  const [samplePopupState, setSamplePopupState] = useState(false);
  const [showCompleteProfile, setCompleteProfile] = useState(false);
  const [showCompleteFile, setShowCompleteFile] = useState(false);
  const [expertiseSearch, setExpertiseSearch] = useState('');
  const [selectedExpertise, setSelectedExpertise] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState(data?.languages);
  const [tempLanguages, setTempLanguages] = useState(data?.languages);
  const [selectedFormats, setSelectedFormats] = useState([]);
  const [sampleData, setSampleData] = useRecoilState(SampleAtom);
  const [profileData, setProfileData] = useRecoilState(VendorProfileAtom);
  const [profileDetails, setProfileDetails] = useRecoilState(allProfileAtom);
  const [smeData, setSMEData] = useRecoilState(SmeServicesAtom);
  const [ctData, setCTData] = useRecoilState(CtServicesAtom);
  const [cdData, setCDData] = useRecoilState(CdServicesAtom);
  const [newOPFormat, setNewOPFormat] = useState('');

  const router = useRouter();
  const isViewPage = router.asPath?.includes('view-vendor');

  const [displayFormats, setDisplayFormats] = useState([...VENDOR_FILE_FORMATS, ...data?.formats]);

  const {
    addUpdateProfile,
    addUpdateExperience,
    getAllProfileInfo,
    addSampleFile,
    getSMESampleFiles,
    getCRTSampleFiles,
    getCDSampleFiles
  } = useHandleVendor();

  let getSampleFiles;
  if (pType === 'sme') {
    getSampleFiles = getSMESampleFiles;
  } else if (pType === 'crt') {
    getSampleFiles = getCRTSampleFiles;
  } else {
    getSampleFiles = getCDSampleFiles;
  }
  let fileData = [];
  if (pType === 'sme') {
    fileData.push(smeData?.sampleFiles);
  } else if (pType === 'crt') {
    fileData.push(ctData?.sampleFiles);
  } else {
    fileData.push(cdData?.sampleFiles);
  }

  const completeProfileHandler = async () => {
    await addUpdateProfile();
    await addUpdateExperience();
    getAllProfileInfo();
    setIsOpenProfile(false);
    setCompleteProfile(true);
    setProfileData(getProfileObject());
  };

  const addExpertiseHandler = () => {
    setData({ ...data, expertises: [...selectedExpertise] });
    setExpertisePopupState(false);
  };

  const handleLanguageSelection = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedLanguages([...selectedLanguages, value]);
    } else {
      setSelectedLanguages(selectedLanguages.filter((lang) => lang !== value));
    }
  };

  const handleAddRemoveLanguage = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedLanguages([...selectedLanguages, value]);
    } else {
      setData({ ...data, languages: [...data?.languages?.filter((lang) => lang !== value)] });
      setSelectedLanguages([...selectedLanguages?.filter((lang) => lang !== value)]);
    }
  };

  const handleRemoveExpertise = (e) => {
    const { value, checked } = e.target;
    setData({ ...data, expertises: [...data?.expertises?.filter((lang) => lang !== value)] });
  };

  const handleRemoveFormats = (e) => {
    const { value, checked } = e.target;
    setData({ ...data, formats: [...data?.formats?.filter((lang) => lang !== value)] });
  };
  const addLanguagesHandler = () => {
    setData({ ...data, languages: [...selectedLanguages] });
    setTempLanguages([...selectedLanguages]);
    setLanguagePopupState(false);
  };

  const handleFileSelection = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedFormats([...selectedFormats, value]);
    } else {
      setSelectedFormats(selectedFormats.filter((lang) => lang !== value));
    }
  };

  const addFormatsHandler = () => {
    setData({ ...data, formats: [...selectedFormats] });
    setOPDeliverablePopupState(false);
  };

  const addSampleFileHandler = async () => {
    await addSampleFile(pType);
    getSampleFiles();
    setSamplePopupState(false);
    setShowCompleteFile(true);
    setSampleData(getSampleObject());
  };

  return (
    <>
      <div className={`${styles.addServiceContainer}`}>
        <div>
          <LabeledRadioCheckbox
            label="Applicable"
            type="checkbox"
            name={inputName}
            isChecked={data[`${inputName}`]}
            isDisabled={isViewPage}
            changeHandler={(e) => changeHandler(e, data, setData)}
          />
        </div>
        <div className={`${styles.serviceDescriptionExpertise}`}>
          <div className={`${styles.serviceDescription}`}>
            <label for="serviceDescription">Description: </label>
            <LabeledTextarea
              inputOptions={{
                inputName: 'serviceDescription',
                placeholder: 'Describe your service in 160 characters',
                maxLength: 160,
                value: data.serviceDescription,
                isDisabled: isViewPage || !data?.isApplicable
              }}
              changeHandler={(e) => changeHandler(e, data, setData)}
            />
          </div>

          <div className={`${styles.addExpertise}`}>
            <label for="serviceDescription">Add Expertise: </label>
            {!data?.expertises?.length ? (
              <IconButton
                text={experticeName}
                styleClass={`${styles.button}`}
                imgUrl="/images/svg/add_circle.svg"
                handleClick={() => {
                  setExpertisePopupState(true);
                }}
                isDisabled={isViewPage || !data?.isApplicable}
              />
            ) : (
              <>
                <div className={`${styles.languages}`}>
                  {data?.expertises?.map((expert, index) => (
                    <div className={`${styles.singleLanguage}`} key={index}>
                      <LabeledRadioCheckbox
                        type="checkbox"
                        label={expert}
                        value={expert}
                        isChecked={data?.expertises?.includes(expert)}
                        changeHandler={handleRemoveExpertise}
                        isDisabled={isViewPage || !data?.isApplicable}
                      />
                    </div>
                  ))}
                </div>
                <IconButton
                  text="Add more"
                  styleClass={`${styles.button}`}
                  imgUrl="/images/svg/add_circle.svg"
                  handleClick={() => {
                    setExpertisePopupState(true);
                    setSelectedExpertise([...data?.expertises]);
                  }}
                  isDisabled={isViewPage || !data?.isApplicable}
                />
              </>
            )}
          </div>
        </div>
        <div className={`${styles.addLanguageOPFormat}`}>
          <div className={`${styles.addLanguages}`}>
            <label for="serviceDescription">Language: </label>
            {!data?.languages?.length ? (
              <IconButton
                text="Add language"
                styleClass={`${styles.button}`}
                imgUrl="/images/svg/add_circle.svg"
                handleClick={() => setLanguagePopupState(true)}
                isDisabled={isViewPage || !data?.isApplicable}
              />
            ) : (
              <>
                <div className={`${styles.languages}`}>
                  {tempLanguages?.map((lang, index) => (
                    <div className={`${styles.singleLanguage}`} key={index}>
                      <LabeledRadioCheckbox
                        type="checkbox"
                        label={lang}
                        value={lang}
                        isChecked={selectedLanguages?.includes(lang)}
                        changeHandler={handleAddRemoveLanguage}
                        isDisabled={isViewPage || !data?.isApplicable}
                      />
                    </div>
                  ))}
                </div>
                <IconButton
                  text="Add more"
                  styleClass={`${styles.button}`}
                  imgUrl="/images/svg/add_circle.svg"
                  handleClick={() => {
                    setLanguagePopupState(true);
                    setSelectedLanguages([...selectedLanguages]);
                  }}
                  isDisabled={isViewPage || !data?.isApplicable}
                />
              </>
            )}
          </div>
          <div className={`${styles.addOPFormat}`}>
            <label for="serviceDescription">O/P deliverable formats: </label>
            {!data?.formats?.length ? (
              <IconButton
                text="Add O/P deliverable formats"
                styleClass={`${styles.button}`}
                imgUrl="/images/svg/add_circle.svg"
                handleClick={() => setOPDeliverablePopupState(true)}
                isDisabled={isViewPage || !data?.isApplicable}
              />
            ) : (
              <>
                <div className={`${styles.languages}`}>
                  {data?.formats?.map((format, index) => (
                    <div className={`${styles.singleLanguage}`} key={index}>
                      <LabeledRadioCheckbox
                        type="checkbox"
                        label={format}
                        value={format}
                        isChecked={data?.formats?.includes(format)}
                        changeHandler={handleRemoveFormats}
                        isDisabled={isViewPage || !data?.isApplicable}
                      />
                    </div>
                  ))}
                </div>
                <IconButton
                  text="Add more"
                  styleClass={`${styles.button}`}
                  imgUrl="/images/svg/add_circle.svg"
                  handleClick={() => {
                    setOPDeliverablePopupState(true);
                    setSelectedFormats([...data?.formats]);
                  }}
                  isDisabled={isViewPage || !data?.isApplicable}
                />
              </>
            )}
          </div>
        </div>
        <div className={`${styles.addSampleFilesProfiles}`}>
          <div className={`${styles.addSampleFiles}`}>
            <label for="sampleFiles">Sample Files: </label>
            {!fileData[0]?.length ? (
              <IconButton
                text="Add sample files"
                styleClass={`${styles.button}`}
                imgUrl="/images/svg/add_circle.svg"
                handleClick={() => {
                  setSamplePopupState(true);
                  getSampleFiles();
                }}
                isDisabled={isViewPage || !data?.isApplicable}
              />
            ) : (
              <>
                <div className={`${styles.showFilesMain}`}>
                  {fileData[0]?.map((file) => (
                    <div className={`${styles.showFiles}`}>
                      <img src="/images/svg/description.svg" alt="" />
                      {typeof file === 'string' ? file : file?.name + '.' + file?.fileType}
                    </div>
                  ))}
                </div>
                <IconButton
                  text="Add more"
                  styleClass={`${styles.button}`}
                  imgUrl="/images/svg/add_circle.svg"
                  handleClick={() => {
                    setSamplePopupState(true);
                    getSampleFiles();
                  }}
                  isDisabled={isViewPage || !data?.isApplicable || fileData[0]?.length >= 5}
                />
              </>
            )}
          </div>

          <div className={`${styles.addProfiles}`}>
            <label for="profiles">Add profiles: </label>
            <div className={`${styles.showFilesMain}`}>
              {profileDetails?.map((data) => {
                if (pType === 'sme' && !data?.sme_expertise?.length) return null;
                if (pType === 'crt' && !data?.classroom_expertise?.length) return null;
                if (pType === 'cd' && !data?.content_development?.length) return null;

                return (
                  <div className={`${styles.showFiles}`}>
                    <img src="/images/svg/account_circle.svg" alt="" />
                    {data?.first_name + '(' + data?.email + ')'}
                  </div>
                );
              })}
            </div>
            <IconButton
              text={!profileDetails?.length ? 'Add more' : 'Add Profiles'}
              styleClass={`${styles.button}`}
              imgUrl="/images/svg/add_circle.svg"
              isDisabled={isViewPage || !data?.isApplicable}
              handleClick={() => {
                if (!profileDetails?.length) setProfileData(getProfileObject());
                setIsOpenProfile(true);
              }}
            />
          </div>
        </div>
      </div>
      <VendorPopUp
        open={expertisePopupState}
        popUpState={[expertisePopupState, setExpertisePopupState]}
        size="large"
        title="Add expertise"
        closeBtn={{ name: 'Cancel' }}
        submitBtn={{ name: 'Add', handleClick: addExpertiseHandler }}>
        <AddExpertise
          expertiseValue={expertiseSearch}
          setExpertise={setExpertiseSearch}
          selectedExpertise={selectedExpertise}
          setSelectedExpertise={setSelectedExpertise}
        />
      </VendorPopUp>
      <VendorPopUp
        open={isOpenProflie}
        title="Add profile"
        popUpState={[isOpenProflie, setIsOpenProfile]}
        size="large"
        closeBtn={{ name: 'Cancel' }}
        submitBtn={{ name: 'Done', handleClick: () => setIsOpenProfile(false) }}
        isFooterVisible={true}>
        <ProfileManageVendor />
      </VendorPopUp>

      <VendorPopUp
        open={showCompleteProfile}
        title="Add Profile"
        popUpState={[showCompleteProfile, setCompleteProfile]}
        size="large"
        closeBtn={{ name: 'Cancel' }}
        submitBtn={{ name: 'Done', handleClick: completeProfileHandler }}
        isFooterVisible={true}>
        <AddVendorProfile />
      </VendorPopUp>
      <VendorPopUp
        open={languagePopupState}
        popUpState={[languagePopupState, setLanguagePopupState]}
        size="small"
        title="Add language"
        closeBtn={{ name: 'Cancel' }}
        submitBtn={{ name: 'Add', handleClick: addLanguagesHandler }}>
        {VENDOR_LANGUAGES.map((data, index) => {
          return (
            <div className={`${styles.expertiseCheckbox}`}>
              <LabeledRadioCheckbox
                type="checkbox"
                label={data}
                value={data}
                isChecked={selectedLanguages.includes(data)}
                changeHandler={handleLanguageSelection}
              />
            </div>
          );
        })}
      </VendorPopUp>
      <VendorPopUp
        open={opdeliverablePopupState}
        popUpState={[opdeliverablePopupState, setOPDeliverablePopupState]}
        size="medium"
        title="Add O/P deliverable formats"
        closeBtn={{
          name: 'Cancel',
          handleClick: () => {
            setNewOPFormat('');
            setOPDeliverablePopupState(false);
          }
        }}
        submitBtn={{ name: 'Add', handleClick: addFormatsHandler }}
        onCloseWithCross={() => {
          setNewOPFormat('');
          setOPDeliverablePopupState(false);
        }}>
        <h4>Select Format</h4>
        {displayFormats.map((data, index) => {
          return (
            <div className={`${styles.expertiseCheckbox}`}>
              <LabeledRadioCheckbox
                type="checkbox"
                label={data}
                value={data}
                isChecked={selectedFormats.includes(data)}
                changeHandler={handleFileSelection}
              />
            </div>
          );
        })}
        <h3 className={`${styles.separation}`}>Or</h3>
        <label>Other:</label>
        <LabeledInput
          inputOptions={{
            inputName: 'fileFormat',
            placeholder: 'Enter O/P deliverable format name',
            value: newOPFormat
          }}
          styleClass={`${styles.opdInput}`}
          changeHandler={(e) => setNewOPFormat(e.target.value)}
        />
        <IconButton
          text="Create"
          imgUrl="/images/edit.png"
          styleClass="btnGrey"
          styleClasses={`${styles.opdCreateButton}`}
          handleClick={() => {
            if (!newOPFormat?.trim()?.length) return;
            setDisplayFormats([...displayFormats, newOPFormat]);
            setSelectedFormats([...selectedFormats, newOPFormat]);
            setNewOPFormat();
          }}
        />
      </VendorPopUp>
      <VendorPopUp
        open={samplePopupState}
        popUpState={[samplePopupState, setSamplePopupState]}
        size="large"
        title="Add Sample"
        closeBtn={{ name: 'Cancel' }}
        submitBtn={{
          name: 'Add',
          handleClick: () => {
            setSamplePopupState(false);
          }
        }}>
        <FileManageVendor pType={pType} />
      </VendorPopUp>
      <VendorPopUp
        open={showCompleteFile}
        popUpState={[showCompleteFile, setShowCompleteFile]}
        title="Add Sample"
        size="large"
        closeBtn={{ name: 'Cancel' }}
        submitBtn={{
          name: 'Done',
          handleClick: addSampleFileHandler
        }}>
        <AddSample />
      </VendorPopUp>
    </>
  );
}
