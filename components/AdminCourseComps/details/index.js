import LabeledInput from '@/components/common/FormComponents/LabeledInput';
import LabeledDropdown from '@/components/common/FormComponents/LabeledDropdown';
// import UploadForm from '../common/FormComponents/UploadForm';
import LabeledRadioCheckbox from '@/components/common/FormComponents/LabeledRadioCheckbox';
import InputWithCheckbox from '@/common/InputWithCheckbox';
import LabeledTextarea from '@/components/common/FormComponents/LabeledTextarea';
import BrowseAndUpload from '@/components/common/FormComponents/BrowseAndUpload';
import RTE from '@/components/common/FormComponents/RTE';
// import styles from "./adminCourse.module.scss"
import styles from '../adminCourseComps.module.scss';
// import BrowseAndUpload from '@/components/common/FormComponents/BrowseAndUpload';
import Dropdown from '@/components/common/Dropdown';
import DragDrop from './DragAndDrop';
import NextBtn from '../NextBtn';
import { useRecoilValue } from 'recoil';
import { CourseMetaDataAtom } from '@/state/atoms/courses.atom';
import { UsersOrganizationAtom } from '@/state/atoms/users.atom';
import useHandleCourseData from '../Logic/useHandleCourseData';
import { useHandleCatSubCat } from '@/helper/hooks.helper';
// import DropdownSelect from '../Tabs/common/DropdownSelect';
// import TwoRowCarousel from '../common/TwoRowCarousel';
// import DropdownSelect from '../../Tabs/common/DropdownSelect';
const Details = () => {
    const courseMetaData = useRecoilValue(CourseMetaDataAtom);
    const userOrgData = useRecoilValue(UsersOrganizationAtom);
  
    const { ownerList, handleChange, handleExpertise } = useHandleCourseData();
    const { catSubCat, setActiveCatId } = useHandleCatSubCat();
    return (
        <>
            <div className={`${styles.courseSubcategory}`}>
                <p>Course base sub-category :</p>
                <div>
                    <LabeledDropdown
                        dropdownOptions={{
                            isSearchEnable: true,
                            inputName: 'percentage',
                            placeholder: 'Development',
                            value: courseMetaData?.subCategories?
                            {value:courseMetaData?.subCategories,label:courseMetaData?.subCategories}
                            :null
                        }}
                        changeHandler={(e)=>handleChange({})}
                    />
                </div>
            </div>
            <div className={`${styles.twoColumnDisplay} ${styles.marginBetweenInputs}`}>
                <DragDrop />
            </div>

            <div className={`${styles.courseSummery}`}>
                <p>Course summary :</p>
                <div>
                    <LabeledTextarea
                        inputOptions={{
                            inputName: 'description',
                            placeholder: 'Privide an outline of the course in less then 500 charactor',
                            rows: 4,
                            maxLength: 500,
                            value: courseMetaData?.summary 
                        }}
                    // changeHandler={(e) => changeHandler(e, profileData, setProfileData)}
                    changeHandler={(e)=>handleChange({...CourseMetaDataAtom, summary:e.target?.value})}
                    // handleChange({ category: e?.value, subCategory: '' });
                    />
                </div>
            </div>


            <div className={`${styles.UploadCoursePreview} ${styles.marginBetweenInputs}`}>
                <p>Upload course preview</p>

                <div>
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

            <div className={`${styles.coursePageTitle} ${styles.twoColumnDisplay}`}>

                <div className={`${styles.coursePageImg}  ${styles.marginBetweenInputs}`}>
                    <p>Course page display image :</p>
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
                <div className={`${styles.courseTitleImag}  ${styles.marginBetweenInputs} `}>
                    <p>Course title image :</p>
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
            <NextBtn />
        </>

    )
};
export default Details;