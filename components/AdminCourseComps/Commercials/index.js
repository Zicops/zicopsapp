import LabeledInput from '@/components/common/FormComponents/LabeledInput';
import LabeledDropdown from '@/components/common/FormComponents/LabeledDropdown';
import UploadForm from '@/components/common/FormComponents/UploadForm';
import LabeledRadioCheckbox from '@/components/common/FormComponents/LabeledRadioCheckbox';
import InputWithCheckbox from '@/common/InputWithCheckbox';
import LabeledTextarea from '@/components/common/FormComponents/LabeledTextarea';
import BrowseAndUpload from '@/components/common/FormComponents/BrowseAndUpload';
import RTE from '@/components/common/FormComponents/RTE';
import styles from "../adminCourse.module.scss"
import Dropdown from '@/components/common/Dropdown';
// import DropdownSelect from './Tabs/common/DropdownSelect';
// import TwoRowCarousel from '../common/TwoRowCarousel';
import SwitchButton from '@/common/FormComponents/SwitchButton';
import InputTimePicker from '@/common/FormComponents/InputTimePicker';
import InputDatePicker from '@/common/InputDatePicker';
import DropdownSelect from '@/components/Tabs/common/DropdownSelect';
// import SwitchBox from '../Tabs/common/SwitchBox';
const Commercials=()=>
{
    return(
        <div>
                  <LabeledInput
                inputOptions={{
                    inputName: 'name',
                    label: 'Name :',
                    placeholder: 'Enter name of the course',
                    value: '',

                }}
                styleClass={`${styles}`}
            // changeHandler={(e) => changeHandler(e, vendorData, setVendorData)}
            />
            <LabeledRadioCheckbox
                type="checkbox"
                label="is Mandatory"
                name="isMandatory"
                isChecked={""}
                changeHandler={""}
            />
            <LabeledDropdown
                dropdownOptions={{
                    inputName: 'percentage',
                    placeholder: '%'
                }}
            />


            <LabeledRadioCheckbox
                type="checkbox"
                label={""}
                value={""}
                isChecked={""}
            // changeHandler={}
            />
            <UploadForm
                filePath="/templates/user-invite-template.xlsx"
                fileName="Bulk Invite Template"
                acceptedTypes=".xlsx, .csv"
                handleRemove={() => {
                    // setFileData(null);
                    // setEmails([]);
                }}
            // handleFileUpload={(e) => CSV_XLSX_File_Selected_Event(e.target.files)}
            />


            <LabeledTextarea
                inputOptions={{
                    inputName: 'description',
                    placeholder: 'Describe your service on 160 characters',
                    rows: 5,
                    maxLength: 160,
                    value: ""
                }}
            // changeHandler={(e) => changeHandler(e, profileData, setProfileData)}
            />

            <BrowseAndUpload
                styleClass={`${styles.uploadImage}`}
                styleClassBtn={`${styles.uploadButton}`}
                title="Drag and drop"
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
            <RTE
                changeHandler={(e) => {
                    // if (examId && examTabData?.id !== examId) return;
                    // if (!examId && examTabData?.id) return;
                    // setExamTabData({ ...examTabData, instructions: e });
                }}
                // isReadOnly={isPreview}
                placeholder="Enter instructions in less than 300 characters."
            // value={examTabData?.instructions}
            />

            <Dropdown
                options={""}
                // handleChange={(e) => setFloor(e)}
                value={""}
                customStyles={{ width: '100%' }}
            />

            <DropdownSelect
                classes={styles.acs_dropdown}
                data={['Accounting', 'Bussiness', 'Developement', 'Engg']}
                inputData={{
                    inputName: 'QBank',
                    label: 'Question Bank:',
                    placeholder: 'Select question Bank',
                }}
            />
            <SwitchButton
                label="God Mode Enabled"
                inputName="devMode"
            //   isChecked={isDev}
            //   handleChange={(e) => window?.enableDevMode(e.target.checked)}
            />
            <InputTimePicker
                //   selectedDate={examTabData?.exam_start}
                minDate={new Date()}
            //   changeHandler={(date) => {
            //     const startDate = updateDate(date, examTabData?.exam_start);

            //     const isNewDateAfterEnd = startDate > examTabData?.exam_end;

            //     // setExamTabData({
            //     //   ...examTabData,
            //     //   exam_start: startDate,
            //     //   exam_end: isNewDateAfterEnd ? getTimeWithDuration(startDate) : examTabData?.exam_end
            //     // });
            //   }}
            //   isDisabled={isPreview}


            />
            <InputDatePicker
                //   selectedDate={examTabData?.exam_start}
                minDate={new Date()}
            //   changeHandler={(date) => {
            //     const startDate = updateDate(date, examTabData?.exam_start);

            //     const isNewDateAfterEnd = startDate > examTabData?.exam_end;

            //     setExamTabData({
            //       ...examTabData,
            //       exam_start: startDate,
            //       exam_end: isNewDateAfterEnd ? getTimeWithDuration(startDate) : examTabData?.exam_end
            //     });
            //   }}
            //   isDisabled={isPreview}
            />


            {/* <SwitchBox
                labeledInputProps={{
                    label: 'Freeze',
                    description:
                        'Once a course is frozen it is no longer editable and ready for approval/publishing',
                    name: 'qa_required',
                    // isDisabled: getIsFreezeDisabled(),
                    // isChecked: fullCourse?.qa_required || false,
                    // handleChange: (e) => {
                    //     const isFreeze = e.target.checked;
                    //     if (isFreeze) return setFreezeConfirmBox(true);

                    //     updateCourseMaster({ ...fullCourse, qa_required: isFreeze });
                    // }
                    // handleChange: () => setFreezeConfirmBox(true)
                }}
            /> */}
            {/* <SwitchBox/> */}

        </div>
    )
};
export default Commercials;