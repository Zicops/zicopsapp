import styles from "../adminCourse.module.scss"
import LabeledInput from '@/components/common/FormComponents/LabeledInput';
import LabeledDropdown from '@/components/common/FormComponents/LabeledDropdown';
// import UploadForm from '../common/FormComponents/UploadForm';
import LabeledRadioCheckbox from '@/components/common/FormComponents/LabeledRadioCheckbox';
import InputWithCheckbox from '@/common/InputWithCheckbox';
import LabeledTextarea from '@/components/common/FormComponents/LabeledTextarea';
import BrowseAndUpload from '@/components/common/FormComponents/BrowseAndUpload';
import RTE from '@/components/common/FormComponents/RTE';
import Dropdown from '@/components/common/Dropdown';
import DetailsBox from "./DetailsBox";
import SwitchBox from "@/components/Tabs/common/SwitchBox";
const Configuration = () => {
    const detailsInfo = [
        { 
            id:1,
            src: "/images/svg/adminCourse/edit-calendar.svg",
            head: "Created on",
            detail: "12.04.2023"
        },
        {
            id:2,
            src: "/images/svg/adminCourse/account-box.svg",
            head: "created by",
            detail: "Abhishek Ghosh"
        },
        {
            id:3,
            src: "/images/svg/adminCourse/event-available.svg",
            head: "Published for registration on",
            detail: "24.04.2023"
        },
        {
            id:4,
            src: "/images/svg/adminCourse/how-to-reg.svg",
            head: "Published for registration by",
            detail: "Harshad Gholap"
        },
        {
            id:5,
            src: "/images/svg/adminCourse/confirmation-number.svg",
            head: "Published for booking on",
            detail: "26.04.2023"
        },
        {
            id:6,
            src: "/images/svg/adminCourse/publish.svg",
            head: "Published for booking by",
            detail: "ABC vendor"
        },
        {
            id:7,
            src: "/images/svg/adminCourse/event.svg",
            head: "Registration start date",
            detail: "30.04.2023"
        },
        { 
            id:8,
            src: "/images/svg/adminCourse/sensors.svg",
            head: "Booking start date",
            detail: "28.04.2023"
        },
        {
            id:9,
            src: "/images/svg/adminCourse/event-busy.svg",
            head: "Expired on",
            detail: "30.05.2023"
        }
    ]
    return (
        <div className={`${styles.configurationContainer}`}>
            <div className={`${styles.configurationHead}`}>Genaral</div>
            <div className={`${styles.cofigurationSettingLabel}`}>these settings are applicable after completion of course</div>
            <div className={`${styles.configurationCourseContainer}`}>
                <div>
                    <label>Course recording availble upto :</label>
                    <LabeledDropdown
                        dropdownOptions={{
                            inputName: 'percentage',
                            placeholder: 'Select no. of days'
                        }}
                    />
                </div>
                <div>
                    <label>Course accessible to Learners upto : </label>
                    <LabeledDropdown
                        dropdownOptions={{
                            inputName: 'percentage',
                            placeholder: 'Select no. of days'
                        }}
                    />
                </div>
            </div>


            <div className={`${styles.configSettingContainer}`}>
                <div className={` ${styles.registrationBox}`}>
                    <label>Registrations</label>
                    <SwitchBox
                        labeledInputProps={{
                            label: 'Open for registrations',
                            description:
                                'Once enabled, the course will be open for registrations',
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
                    />
                </div>
                <div className={` ${styles.bookingBox}`}>
                    <label>Bookings</label>
                    <SwitchBox
                        labeledInputProps={{
                            label: 'Open for Bookings',
                            description:
                                'Once enabled, the course will be open for booking',
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
                    />
                </div>



            </div>
            <div className={` ${styles.frizeCourse}`}>
                <label>Ready for Publish</label>
                <SwitchBox
                    labeledInputProps={{
                        label: 'Freeze Course',
                        description:
                            'Once a course is frozen, it is no longer available and ready for approval/publishing',
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
                />
            </div>

            <label className={`${styles.configurationDetailhead}`}>Details</label>
            <div className={`${styles.configDetailContainer}`}>
                {
                    detailsInfo.map((data) => {
                        return (
                            <DetailsBox imgSrc={data.src} head={data.head} detail={data.detail} key={data.id} />
                        )
                    })
                }
            </div>
        </div>
    )
};
export default Configuration;
