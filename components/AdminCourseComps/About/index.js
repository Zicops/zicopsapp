import LabeledInput from '@/components/common/FormComponents/LabeledInput';
import LabeledDropdown from '@/components/common/FormComponents/LabeledDropdown';
// import UploadForm from '../common/FormComponents/UploadForm';
import LabeledRadioCheckbox from '@/components/common/FormComponents/LabeledRadioCheckbox';
import LabeledTextarea from '@/components/common/FormComponents/LabeledTextarea';
import RTE from '@/components/common/FormComponents/RTE';
import styles from "../adminCourse.module.scss"
import InputDatePicker from '@/common/InputDatePicker';
import { useState } from 'react';

const About = () => {
    // const listModerator = ["internal", "Externar"]
    const [title, settitle] = useState('')
    const [typeMOderator, settypeModerator] = useState("internal")

    function showDropdown(title) {
        if (title === "") return <></>
        const obj = dropDown?.find(data => data.title === title)
        return obj.component;
    }

    const dropDown = [{
        title: "dropdown",
        component: (
            <div className={`${styles.droper}`}>
                <button onClick={() => {
                    settypeModerator("internal")
                    title === "dropdown" ? settitle("") : settitle("dropdown")
                }}>internal</button>
                <button onClick={() => {
                    settypeModerator("Externar")
                    title === "dropdown" ? settitle("") : settitle("dropdown")
                }}>External</button>
            </div>
        )
    }]

    return (
        <>
            <div className={`${styles.aboutHead}`}>Course overview</div>
            <div className={`${styles.aboutInputTrainerModerator}`}>
                <div className={`${styles.aboutTrainer1}`}>
                    <lable>Trainer :</lable>
                    <LabeledDropdown
                        dropdownOptions={{
                            inputName: 'percentage',
                            placeholder: 'Select or add trainer'

                        }}
                    />
                    <div className={`${styles.aboutCheckbox}`}>
                        <LabeledRadioCheckbox
                            type="checkbox"
                            label={""}
                            value={""}
                            isChecked={""}
                        // changeHandler={}
                        />
                        <label>To be Decided</label>
                    </div>
                </div>
                <div>
                    <div className={`${styles.aboutTrainer2}`}>
                        <lable>Moderator :</lable>
                        <div className={`${styles.moderatorDropdown}`}>
                            <div>{typeMOderator}</div>
                            <button className={`${styles.changeModeratorbtn}`} onClick={() => {
                                title === "dropdown" ? settitle("") : settitle("dropdown")
                            }}>
                                <img src="/images/svg/adminCourse/unfold-more.svg" />
                            </button>
                            <>{showDropdown(title)}</>
                        </div>
                    </div>
                    <LabeledDropdown
                        dropdownOptions={{
                            inputName: 'percentage',
                            placeholder: 'Select or add moderator'
                        }}
                    />
                    <div className={`${styles.aboutCheckbox}`}>
                        <LabeledRadioCheckbox
                            type="checkbox"
                            label={""}
                            value={""}
                            isChecked={""}
                        // changeHandler={}
                        />
                        <label>To be Decided</label>
                    </div>
                </div>
            </div>

            <div className={`${styles.aboutDatePicker}`}>
                <div>
                    <label>Course Start date :</label>
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
                        isDisabled={false}
                        styleClass={`${styles.datePicker}`} />
                    <div className={`${styles.aboutCheckbox}`}>
                        <LabeledRadioCheckbox
                            type="checkbox"
                            label={""}
                            value={""}
                            isChecked={""}
                        // changeHandler={}

                        />
                        <label>To be Decided</label>
                    </div>
                </div>
                <div>
                    <label>Course end date :</label>
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
                        styleClass={`${styles.datePicker}`}
                    />
                    <div className={`${styles.aboutCheckbox}`}>
                        <LabeledRadioCheckbox
                            type="checkbox"
                            label={""}
                            value={""}
                            isChecked={""}
                        // changeHandler={}
                        />
                        <label>To be Decided</label>
                    </div>
                </div>
            </div>


            <div className={`${styles.totalDurationLable}`}>
                <div>
                    <label className={`${styles.durationLabel}`}>Total Duration :</label>
                    <LabeledInput
                        inputOptions={{
                            inputName: 'name',
                            // label: 'Total Duration:',
                            placeholder: 'Auto pupulated',
                            value: '',

                        }}
                        styleClass={`${styles.inputName1}`}
                    // changeHandler={(e) => changeHandler(e, vendorData, setVendorData)}
                    />
                </div>
                <div>
                    <label className={`${styles.durationLabel}`}>Learning Duration :</label>
                    <LabeledInput
                        inputOptions={{
                            inputName: 'name',
                            // label:'Learning Duration:',
                            placeholder: 'Auto populated',
                            value: '',

                        }}
                        styleClass={`${styles.inputName1}`}
                    // changeHandler={(e) => changeHandler(e, vendorData, setVendorData)}
                    />
                    <div className={`${styles.durationDiscription}`}> *Completed by the system ones the topic is added</div>
                </div>

            </div>


            <div className={`${styles.courseDiscription}`}>
                <label>Course discription :</label>

                <LabeledTextarea
                    inputOptions={{
                        inputName: 'description',
                        placeholder: 'Enter course discription',
                        rows: 5,
                        maxLength: 160,
                        value: ""
                    }}
                // changeHandler={(e) => changeHandler(e, profileData, setProfileData)}
                />
            </div>

            <div className={`${styles.courseOutcome}`}>
                <label>Course Outcomes :</label>
                <LabeledInput
                    inputOptions={{
                        inputName: 'name',
                        // label:'Learning Duration:',
                        placeholder: 'Enter course outcomes',
                        value: '',

                    }}
                    styleClass={`${styles.inputName1}`}
                // changeHandler={(e) => changeHandler(e, vendorData, setVendorData)}
                />
            </div>

            <div className={`${styles.courseHighlights}`}>
                <label>Course Highlights :</label>
                <LabeledInput
                    inputOptions={{
                        inputName: 'name',
                        // label:'Learning Duration:',
                        placeholder: 'Enter course highlights',
                        value: '',

                    }}
                    styleClass={`${styles.inputName1}`}
                // changeHandler={(e) => changeHandler(e, vendorData, setVendorData)}
                />
            </div>

            <div className={`${styles.aboutInputContainer}`}>
                <div>
                    <label>Pre-requisites:</label>
                    <LabeledInput
                        inputOptions={{
                            inputName: 'name',
                            // label:'Learning Duration:',
                            placeholder: 'Add pre-requisites and press enter',
                            value: '',

                        }}
                        styleClass={`${styles.inputName1}`}
                    // changeHandler={(e) => changeHandler(e, vendorData, setVendorData)}
                    />
                </div>
                <div>
                    <label>Related skills:</label>
                    <LabeledInput
                        inputOptions={{
                            inputName: 'name',
                            // label:'Learning Duration:',
                            placeholder: 'Add related skills',
                            value: '',

                        }}
                        styleClass={`${styles.inputName1}`}
                    // changeHandler={(e) => changeHandler(e, vendorData, setVendorData)}
                    />
                </div>
            </div>

            <div className={`${styles.aboutInputContainer}`}>
                <div>
                    <label>Good for:</label>
                    <LabeledInput
                        inputOptions={{
                            inputName: 'name',
                            // label:'Learning Duration:',
                            placeholder: 'Add good for and press enter',
                            value: '',

                        }}
                        styleClass={`${styles.inputName1}`}
                    // changeHandler={(e) => changeHandler(e, vendorData, setVendorData)}
                    />
                </div>
                <div>
                    <label>Good for:</label>
                    <LabeledInput
                        inputOptions={{
                            inputName: 'name',
                            // label:'Learning Duration:',
                            placeholder: 'Add must for and press enter',
                            value: '',

                        }}
                        styleClass={`${styles.inputName1}`}
                    // changeHandler={(e) => changeHandler(e, vendorData, setVendorData)}
                    />
                </div>
            </div>

            <div className={`${styles.aboutCurriculum}`}>
                <label>Curriculum:</label>
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
            </div>
            <div className={`${styles.aboutNextBtn}`}>
                <button>Next</button>
            </div>
        </>
    )
};
export default About;