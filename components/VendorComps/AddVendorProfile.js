import BrowseAndUpload from '@/components/common/FormComponents/BrowseAndUpload';
import LabeledDropdown from '@/components/common/FormComponents/LabeledDropdown';
import LabeledInput from '@/components/common/FormComponents/LabeledInput';
import LabeledRadioCheckbox from '@/components/common/FormComponents/LabeledRadioCheckbox';
import LabeledTextarea from '@/components/common/FormComponents/LabeledTextarea';
import IconButton from '@/components/common/IconButton';
import { changeHandler } from '@/helper/common.helper';
import { VENDOR_LANGUAGES } from '@/helper/constants.helper';
import {
  getExperiencesObject,
  VendorExperiencesAtom,
  SmeServicesAtom,
  CtServicesAtom,
  CdServicesAtom
} from '@/state/atoms/vendor.atoms';
import { useRouter } from 'next/router';
import { useRecoilState, useRecoilValue } from 'recoil';
import AddExpriences from './AddExpriences';
import AddExpertise from './AddVendor/common/AddExpertise';
import VendorPopUp from './common/VendorPopUp';
import useHandleVendor from './Logic/useHandleVendor';
import useProfile from './Logic/useProfile';
import { optionYearArray } from './Logic/vendorComps.helper';
import styles from './vendorComps.module.scss';

const AddVendorProfile = ({ data = {} }) => {
  const [experiencesData, setExperiencesData] = useRecoilState(VendorExperiencesAtom);
  const smeServices = useRecoilValue(SmeServicesAtom);
  const crtServices = useRecoilValue(CtServicesAtom);
  const cdServices = useRecoilValue(CdServicesAtom);

  const { handleProfilePhoto, getSingleExperience, getProfileExperience } = useHandleVendor();
  const {
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
    selectedSmeExpertise,
    setSelectedSmeExpertise,
    selectedCrtExpertise,
    setSelectedCrtExpertise,
    selectedCdExpertise,
    setSelectedCdExpertise,
    selectedLanguages,
    setSelectedLanguages,
    getFileName
  } = useProfile();

  const router = useRouter();
  const isViewPage = router.asPath?.includes('view-vendor');

  return (
    <div className={`${styles.inputMain}`}>
      <div className={`${styles.inputContainer}`}>
        <div className={`${styles.input1}`}>
          <label for="vendorName">First name: </label>
          <LabeledInput
            inputOptions={{
              inputName: 'firstName',
              placeholder: 'Enter First Name',
              maxLength: 60,
              value: profileData.firstName,
              isDisabled: isViewPage
            }}
            changeHandler={(e) => changeHandler(e, profileData, setProfileData)}
          />
        </div>
        <div className={`${styles.input1}`}>
          <label for="vendorName">Last name: </label>
          <LabeledInput
            inputOptions={{
              inputName: 'lastName',
              placeholder: 'Enter Last Name',
              maxLength: 60,
              value: profileData.lastName,
              isDisabled: isViewPage
            }}
            changeHandler={(e) => changeHandler(e, profileData, setProfileData)}
          />
        </div>
        <div className={`${styles.input1}`}>
          <label for="vendorName">Email id: </label>
          <LabeledInput
            inputOptions={{
              inputName: 'email',
              placeholder: 'Enter email address',
              type: 'email',
              value: profileData.email,
              isDisabled: isViewPage
            }}
            changeHandler={(e) => changeHandler(e, profileData, setProfileData)}
          />
        </div>
        <div className={`${styles.input1}`}>
          <label for="vendorName">Contact number: </label>
          <LabeledInput
            inputOptions={{
              inputName: 'contactNumber',
              placeholder: 'Enter contact number',
              maxLength: 12,
              isNumericOnly: true,
              value: profileData.contactNumber,
              isDisabled: isViewPage
            }}
            changeHandler={(e) => changeHandler(e, profileData, setProfileData)}
          />
        </div>
        <div className={`${styles.input1}`}>
          <label for="vendorName">Description: </label>

          <LabeledTextarea
            inputOptions={{
              inputName: 'description',
              placeholder: 'Describe your service on 160 characters',
              rows: 5,
              maxLength: 160,
              value: profileData.description,
              isDisabled: isViewPage
            }}
            changeHandler={(e) => changeHandler(e, profileData, setProfileData)}
          />
        </div>
        <div className={`${styles.input2}`}>
          <label for="profileImage">Upload photo: </label>
          <BrowseAndUpload
            styleClass={`${styles.uploadImage}`}
            styleClassBtn={`${styles.uploadButton}`}
            title={getFileName() || 'Drag & Drop'}
            handleFileUpload={handleProfilePhoto}
            handleRemove={() => setProfileData({ ...profileData, profileImage: null })}
            previewData={{
              fileName: getFileName(),
              filePath: profileData?.profileImage || profileData?.photoUrl
            }}
            inputName="profileImage"
            filePreview={profileData?.profileImage || profileData?.photoUrl}
            isActive={profileData?.profileImage || profileData?.photoUrl}
            isDisabled={isViewPage}
          />
        </div>
        <div className={`${styles.input1}`}>
          <label for="expriences">Years of experience: </label>
          <LabeledDropdown
            dropdownOptions={{
              inputName: 'experienceYear',
              placeholder: 'Select Years',
              value: {
                label: profileData.experienceYear,
                value: profileData.experienceYear
              },
              options: optionYearArray,
              isDisabled: isViewPage
            }}
            changeHandler={(e) => changeHandler(e, profileData, setProfileData, 'experienceYear')}
            styleClass={styles.dropDownMain}
          />
        </div>
        <div className={`${styles.addExpertise}`}>
          <label for="serviceDescription">Experience: </label>
          {!profileData?.experienceData?.length ? (
            <IconButton
              text="Add experiences"
              styleClass={`${styles.button}`}
              imgUrl="/images/svg/add_circle.svg"
              handleClick={() => setIsOpenExpriences(true)}
              isDisabled={isViewPage}
            />
          ) : (
            <>
              {profileData?.experienceData?.map((exp) => (
                <IconButton
                  text={`${exp?.title} @ ${exp?.companyName}`}
                  styleClasses={`${styles.exButton}`}
                  imgUrl="/images/svg/business_center.svg"
                  handleClick={() => {
                    setIsOpenExpriences(true);
                    setExperiencesData(getExperiencesObject(exp));
                  }}
                  isDisabled={isViewPage}
                />
              ))}
              <IconButton
                text="Add more"
                styleClass={`${styles.button}`}
                imgUrl="/images/svg/add_circle.svg"
                handleClick={() => setIsOpenExpriences(true)}
                isDisabled={isViewPage}
              />
            </>
          )}
        </div>

        <div className={`${styles.addExpertise}`}>
          <label for="serviceDescription">Language: </label>
          {!profileData?.languages?.length ? (
            <IconButton
              text="Add language"
              styleClass={`${styles.button}`}
              imgUrl="/images/svg/add_circle.svg"
              handleClick={() => setIsOpenLanguage(true)}
              isDisabled={isViewPage}
            />
          ) : (
            <>
              <div className={`${styles.languages}`}>
                {profileData?.languages?.map((data, index) => (
                  <div className={`${styles.singleLanguage}`} key={index}>
                    <LabeledRadioCheckbox
                      type="checkbox"
                      label={data}
                      value={data}
                      isChecked={true}
                    />
                  </div>
                ))}
              </div>
              <IconButton
                text="Add more"
                styleClass={`${styles.button}`}
                imgUrl="/images/svg/add_circle.svg"
                isDisabled={isViewPage}
                handleClick={() => {
                  setIsOpenLanguage(true);
                  setSelectedLanguages([...profileData?.languages]);
                }}
              />
            </>
          )}
        </div>
        {!!smeServices.isApplicable && (
          <div className={`${styles.addExpertise}`}>
            <label for="serviceDescription">Subject matter expertise:</label>
            {!profileData?.sme_expertises?.length ? (
              <IconButton
                text="Add subject matter expertise"
                styleClass={`${styles.button}`}
                imgUrl="/images/svg/add_circle.svg"
                isDisabled={isViewPage}
                handleClick={() => {
                  setOpenSmeExpertise(true);
                }}
              />
            ) : (
              <>
                <div className={`${styles.languages}`}>
                  {profileData?.sme_expertises?.map((data, index) => (
                    <div className={`${styles.singleLanguage}`} key={index}>
                      <LabeledRadioCheckbox
                        type="checkbox"
                        label={data}
                        value={data}
                        isChecked={true}
                      />
                    </div>
                  ))}
                </div>
                <IconButton
                  text="Add more"
                  styleClass={`${styles.button}`}
                  imgUrl="/images/svg/add_circle.svg"
                  isDisabled={isViewPage}
                  handleClick={() => {
                    setOpenSmeExpertise(true);
                    setSelectedSmeExpertise([...profileData?.sme_expertises]);
                  }}
                />
              </>
            )}
          </div>
        )}

        {!!crtServices.isApplicable && (
          <div className={`${styles.addExpertise}`}>
            <label for="serviceDescription">Classroom Training Expertise:</label>
            {!profileData?.crt_expertises?.length ? (
              <IconButton
                text="Add classroom training expertise"
                styleClass={`${styles.button}`}
                imgUrl="/images/svg/add_circle.svg"
                isDisabled={isViewPage}
                handleClick={() => setOpenCrtExpertise(true)}
              />
            ) : (
              <>
                <div className={`${styles.languages}`}>
                  {profileData?.crt_expertises?.map((data, index) => (
                    <div className={`${styles.singleLanguage}`} key={index}>
                      <LabeledRadioCheckbox
                        type="checkbox"
                        label={data}
                        value={data}
                        isChecked={true}
                      />
                    </div>
                  ))}
                </div>
                <IconButton
                  text="Add more"
                  styleClass={`${styles.button}`}
                  imgUrl="/images/svg/add_circle.svg"
                  isDisabled={isViewPage}
                  handleClick={() => {
                    setOpenCrtExpertise(true);
                    setSelectedCrtExpertise([...profileData?.crt_expertises]);
                  }}
                />
              </>
            )}
          </div>
        )}

        {!!cdServices.isApplicable && (
          <div className={`${styles.addExpertise}`}>
            <label for="serviceDescription">Content Development Expertise:</label>
            {!profileData?.content_development?.length ? (
              <IconButton
                text="Add content development expertise"
                styleClass={`${styles.button}`}
                imgUrl="/images/svg/add_circle.svg"
                isDisabled={isViewPage}
                handleClick={() => setOpenCdExpertise(true)}
              />
            ) : (
              <>
                <div className={`${styles.languages}`}>
                  {profileData?.content_development?.map((data, index) => (
                    <div className={`${styles.singleLanguage}`} key={index}>
                      <LabeledRadioCheckbox
                        type="checkbox"
                        label={data}
                        value={data}
                        isChecked={true}
                      />
                    </div>
                  ))}
                </div>
                <IconButton
                  text="Add more"
                  styleClass={`${styles.button}`}
                  imgUrl="/images/svg/add_circle.svg"
                  isDisabled={isViewPage}
                  handleClick={() => {
                    setOpenCdExpertise(true);
                    setSelectedCdExpertise([...profileData?.content_development]);
                  }}
                />
              </>
            )}
          </div>
        )}
      </div>

      <div className={`${styles.addProfileContainer}`}>
        <LabeledRadioCheckbox
          label="Is Speaker"
          type="checkbox"
          name="isSpeaker"
          isChecked={profileData?.isSpeaker}
          changeHandler={(e) => changeHandler(e, profileData, setProfileData)}
          isDisabled={isViewPage}
        />
      </div>

      <VendorPopUp
        open={isOpenExpriences}
        title={`${experiencesData?.expId ? 'Edit' : 'Add'} Experience`}
        popUpState={[isOpenExpriences, setIsOpenExpriences]}
        size="large"
        closeBtn={{ name: 'Cancel' }}
        submitBtn={{ name: 'Done', handleClick: completeExperienceHandler }}
        isFooterVisible={true}>
        <AddExpriences />
      </VendorPopUp>
      <div className={`${styles.hr}`}></div>
      <VendorPopUp
        open={isOpenSmeExpertise}
        title="Add Subject matter expertise"
        popUpState={[isOpenSmeExpertise, setOpenSmeExpertise]}
        size="large"
        closeBtn={{ name: 'Cancel' }}
        submitBtn={{ name: 'Add', handleClick: handleAddSmeExpertise }}
        isFooterVisible={true}>
        <AddExpertise
          expertiseValue={expertiseSearch}
          setExpertise={setExpertiseSearch}
          selectedExpertise={selectedSmeExpertise}
          setSelectedExpertise={setSelectedSmeExpertise}
        />
      </VendorPopUp>
      <VendorPopUp
        open={isOpenCrtExpertise}
        title="Add Classroom Training Expertise"
        popUpState={[isOpenCrtExpertise, setOpenCrtExpertise]}
        size="large"
        closeBtn={{ name: 'Cancel' }}
        submitBtn={{ name: 'Add', handleClick: handleAddCrtExpertise }}
        isFooterVisible={true}>
        <AddExpertise
          expertiseValue={expertiseSearch}
          setExpertise={setExpertiseSearch}
          selectedExpertise={selectedCrtExpertise}
          setSelectedExpertise={setSelectedCrtExpertise}
        />
      </VendorPopUp>
      <VendorPopUp
        open={isOpenCdExpertise}
        title="Add Content Development Expertise"
        popUpState={[isOpenCdExpertise, setOpenCdExpertise]}
        size="large"
        closeBtn={{ name: 'Cancel' }}
        submitBtn={{ name: 'Add', handleClick: handleAddCdExpertise }}
        isFooterVisible={true}>
        <AddExpertise
          expertiseValue={expertiseSearch}
          setExpertise={setExpertiseSearch}
          selectedExpertise={selectedCdExpertise}
          setSelectedExpertise={setSelectedCdExpertise}
        />
      </VendorPopUp>
      <VendorPopUp
        open={isOpenLanguage}
        title="Add language"
        popUpState={[isOpenLanguage, setIsOpenLanguage]}
        size="small"
        closeBtn={{ name: 'Cancel' }}
        submitBtn={{ name: 'Add', handleClick: addLanguagesHandler }}
        isFooterVisible={true}>
        {VENDOR_LANGUAGES?.map((data, index) => {
          return (
            <div className={`${styles.expertiseCheckbox}`} key={index}>
              <LabeledRadioCheckbox
                type="checkbox"
                label={data}
                value={data}
                isChecked={selectedLanguages?.includes(data)}
                changeHandler={handleLanguageSelection}
              />
            </div>
          );
        })}
      </VendorPopUp>
    </div>
  );
};

export default AddVendorProfile;
