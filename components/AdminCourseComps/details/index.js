import LabeledDropdown from '@/components/common/FormComponents/LabeledDropdown';
import LabeledTextarea from '@/components/common/FormComponents/LabeledTextarea';
import BrowseAndUpload from '@/components/common/FormComponents/BrowseAndUpload';
import RTE from '@/components/common/FormComponents/RTE';
// import styles from "./adminCourse.module.scss"
import styles from '../adminCourseComps.module.scss';
import DragDrop from './DragAndDrop';
import NextBtn from '../NextBtn';
import { useRecoilState, useRecoilValue } from 'recoil';
import { CourseMetaDataAtom } from '@/state/atoms/courses.atom';
import { UsersOrganizationAtom } from '@/state/atoms/users.atom';
import useHandleCourseData from '../Logic/useHandleCourseData';
import { useHandleCatSubCat } from '@/helper/hooks.helper';
const Details = () => {
    // const courseMetaData = useRecoilValue(CourseMetaDataAtom);
    const userOrgData = useRecoilValue(UsersOrganizationAtom);
    const [courseMetaData, setCourseMetaData] = useRecoilState(CourseMetaDataAtom);
    const { ownerList, handleChange, handleExpertise, handlePreviewVideo, handleImage, handleTileImage } = useHandleCourseData();
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
                            value: { value: courseMetaData?.subCategory, label: courseMetaData?.subCategory }
                        }}
                        changeHandler={(e) => handleChange({ subCategories: courseMetaData.subCategory })}
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
                        changeHandler={(e) => handleChange({ summary: e.target?.value })}
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
                        handleFileUpload={handlePreviewVideo}
                        handleRemove={() => setCourseMetaData({ ...courseMetaData, previewVideo: null })}
                        previewData={{
                            fileName: courseMetaData?.previewVideo?.name,
                            filePath: courseMetaData?.previewVideo
                        }}
                        inputName="previewVideo"
                        // hideRemoveBtn={true}
                        isActive={courseMetaData?.previewVideo}
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
                        handleFileUpload={handleImage}
                        handleRemove={() => setCourseMetaData({ ...courseMetaData, image: null })}
                        previewData={{
                            fileName: courseMetaData?.image?.name,
                            filePath: courseMetaData?.image
                        }}
                        inputName="image"
                        // hideRemoveBtn={true}
                        isActive={courseMetaData?.image}
                    />
                </div>
                <div className={`${styles.courseTitleImag}  ${styles.marginBetweenInputs} `}>
                    <p>Course title image :</p>
                    <BrowseAndUpload
                        styleClass={`${styles.uploadCoursePreviewImage}`}
                        styleClassBtn={`${styles.uploadCourseButton}`}
                        title="Browse and upload"

                        handleFileUpload={handleTileImage}
                        handleRemove={() => setCourseMetaData({ ...courseMetaData, tileImage: null })}
                        previewData={{
                            fileName: courseMetaData?.tileImage?.name,
                            filePath: courseMetaData?.tileImage
                        }}
                        inputName="tileImage"
                        // hideRemoveBtn={true}
                        isActive={courseMetaData?.tileImage}
                    />
                </div>
            </div>
            <NextBtn />
        </>

    )
};
export default Details;