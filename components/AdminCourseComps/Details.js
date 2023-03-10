import LabeledInput from '@/components/common/FormComponents/LabeledInput';
import LabeledDropdown from '@/components/common/FormComponents/LabeledDropdown';
// import UploadForm from '../common/FormComponents/UploadForm';
import LabeledRadioCheckbox from '@/components/common/FormComponents/LabeledRadioCheckbox';
import InputWithCheckbox from '@/common/InputWithCheckbox';
import LabeledTextarea from '@/components/common/FormComponents/LabeledTextarea';
import BrowseAndUpload from '@/components/common/FormComponents/BrowseAndUpload';
import RTE from '@/components/common/FormComponents/RTE';
import styles from "./adminCourse.module.scss"
// import BrowseAndUpload from '@/components/common/FormComponents/BrowseAndUpload';
import Dropdown from '@/components/common/Dropdown';
// import DropdownSelect from '../Tabs/common/DropdownSelect';
// import TwoRowCarousel from '../common/TwoRowCarousel';
// import DropdownSelect from '../../Tabs/common/DropdownSelect';
const Details = () => {
  return (
    <>
      <div>
        <label>Course base sub-category :</label>
        <LabeledDropdown
          dropdownOptions={{
            isSearchEnable: true,
            inputName: 'percentage',
            placeholder: 'Development'
          }}
        />
      </div>

      <div className={`${styles.additionalsubCategory}`}>
        <div className={`${styles.detailsSearchDropdown}`}>
          <label>Additional sub-category</label>
          <LabeledDropdown
            dropdownOptions={{
              isSearchEnable: true,
              inputName: 'percentage',
              placeholder: 'Search'
            }}
          />
        </div>

        <div className={`${styles.detailDropDown}`}>
          <img src="/images/svg/adminCourse/swipe-right.svg" />
          <div>Drag & Drop!</div>
        </div>

        <div className={`${styles.detailDropdownSection}`}>
          <BrowseAndUpload
            styleClassBtn={`${styles.button1}`}
            title="Drop here !"
            // handleFileUpload={handlePhotoInput}
            // handleRemove={() => setVendorData({ ...vendorData, vendorProfileImage: null })}
            // previewData={{
            //   fileName: vendorData?.vendorProfileImage?.name,
            //   filePath: vendorData?.vendorProfileImage
            // }}
            // inputName="vendorProfileImage"
            // isActive={vendorData?.vendorProfileImage}
            hidePreviewBtns={true}
            styleClass={`${styles.detailDropDownfile}`} />
        </div>
      </div>


      <div className={`${styles.courseSummery}`}>
        <lable>Course summary :</lable>
        <LabeledTextarea
          inputOptions={{
            inputName: 'description',
            placeholder: 'Privide an outline of the course in less then 500 charactor',
            rows: 4,
            maxLength: 500,
            value: ""
          }}
        // changeHandler={(e) => changeHandler(e, profileData, setProfileData)}
        />
      </div>


      <div className={`${styles.UploadCoursePreview}`}>
        <label>Upload course preview</label>

        <BrowseAndUpload
          styleClass={`${styles.uploadCoursePreviewImage}`}
          styleClassBtn={`${styles.uploadCourseButton}`}
          title="Browse and upload"
        // handleFileUpload={handleProfilePhoto}
        // handleRemove={() => setProfileData({ ...profileData, profileImage: null })}
        // previewData={{
        //   fileName: profileData?.profileImage?.name,
        //   filePath: profileData?.profileImage
        // }}
        // inputName="profileImage"
        // hideRemoveBtn={true}
        // isActive={profileData?.profileImage}
        />
      </div>

      <div className={`${styles.coursePageTitle}`}>

        <div className={`${styles.coursePageImg}`}>
          <label>Course page display image :</label>
          <BrowseAndUpload
            styleClass={`${styles.uploadCoursePreviewImage}`}
            styleClassBtn={`${styles.uploadCourseButton}`}
            title="Browse and upload"
          // handleFileUpload={handleProfilePhoto}
          // handleRemove={() => setProfileData({ ...profileData, profileImage: null })}
          // previewData={{
          //   fileName: profileData?.profileImage?.name,
          //   filePath: profileData?.profileImage
          // }}
          // inputName="profileImage"
          // hideRemoveBtn={true}
          // isActive={profileData?.profileImage}
          />
        </div>
        <div className={`${styles.courseTitleImag}`}>
          <lable>Course title image :</lable>
          <BrowseAndUpload
            styleClass={`${styles.uploadCoursePreviewImage}`}
            styleClassBtn={`${styles.uploadCourseButton}`}
            title="Browse and upload"
          // handleFileUpload={handleProfilePhoto}
          // handleRemove={() => setProfileData({ ...profileData, profileImage: null })}
          // previewData={{
          //   fileName: profileData?.profileImage?.name,
          //   filePath: profileData?.profileImage
          // }}
          // inputName="profileImage"
          // hideRemoveBtn={true}
          // isActive={profileData?.profileImage}
          />
        </div>
      </div>

      <div className={`${styles.courseDetailNextrBtn}`}>
        <button>Next</button>
      </div>
    </>

  )
};
export default Details;