import LabeledInput from '@/components/common/FormComponents/LabeledInput';
import LabeledDropdown from '@/components/common/FormComponents/LabeledDropdown';
// import UploadForm from '../common/FormComponents/UploadForm';
import LabeledRadioCheckbox from '@/components/common/FormComponents/LabeledRadioCheckbox';
import LabeledTextarea from '@/components/common/FormComponents/LabeledTextarea';
import RTE from '@/components/common/FormComponents/RTE';
// import styles from "../adminCourse.module.scss"
import styles from '../adminCourseComps.module.scss';
import InputDatePicker from '@/common/InputDatePicker';
import { useState } from 'react';
import NextBtn from '../NextBtn';
import { useRecoilState, useRecoilValue } from 'recoil';
import { CourseMetaDataAtom } from '@/state/atoms/courses.atom';
import { UsersOrganizationAtom } from '@/state/atoms/users.atom';
import useHandleCourseData from '../Logic/useHandleCourseData';
import { useHandleCatSubCat } from '@/helper/hooks.helper';
import BulletPointInput from './BulletPointInput';
import { LANGUAGES } from '@/helper/constants.helper';

const About = () => {
    // const listModerator = ["internal", "Externar"]
    const Trainers = [
        {
            name:"sandeep",
            isSelected:false
        },
        {
            name:"XYZ",
            isSelected:false
        },
        {
            name:"ABC",
            isSelected:false
        }
    ]
    const Moderators = [
        {
            name:"sandeep1",
            isSelected:false
        },
        {
            name:"XYZ1",
            isSelected:false
        },
        {
            name:"ABC1",
            isSelected:false
        }
    ]
    const userOrgData = useRecoilValue(UsersOrganizationAtom);
    const [courseMetaData, setCourseMetaData] = useRecoilState(CourseMetaDataAtom);
    const { ownerList, handleChange, handleExpertise, handlePreviewVideo, handleImage, handleTileImage } = useHandleCourseData();
    const { catSubCat, setActiveCatId } = useHandleCatSubCat();

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
            <div className={`${styles.aboutInputTrainerModerator} ${styles.twoColumnDisplay} ${styles.marginBetweenInputs}`}>
                <div className={`${styles.aboutTrainer}`}>
                    <lable>Trainer :</lable>
                    <LabeledDropdown
                        dropdownOptions={{
                            inputName: 'Trainers',
                            placeholder: 'Select or add trainer',
                            isSearchEnable: true,
                            menuPlacement: 'bottom',
                            isMulti: true,
                            options:Trainers?.map((trainee,index)=>({label:trainee.name,value:trainee.name})),
                            // options: Trainers?.map((trainee) => ({ label: trainee, value: trainee })),
                            value: !!courseMetaData?.Trainers?.length
                                ? courseMetaData?.Trainers?.map((trainee) => ({ label: trainee, value: trainee }))
                                : null
                        }}
                        isFullWidth={true}
                        changeHandler={(e) => handleChange({ Trainers: e?.map((item,index) => item?.value) })}
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
                <div className={`${styles.aboutModerator}`}>
                    <div className={`${styles.aboutTrainerType}`}>
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
                            placeholder: 'Select or add moderator',
                            isSearchEnable: true,
                            menuPlacement: 'bottom',
                            isMulti: true,
                            options:Moderators?.map((mod,index)=>({label:mod.name,value:mod.name})),
                            // options: Moderators?.map((trainee) => ({ label: trainee, value: trainee })),
                            value: !!courseMetaData?.Moderators?.length
                                ? courseMetaData?.Moderators?.map((mod) => ({ label: mod, value: mod }))
                                : null
                        }}
                        isFullWidth={true}
                        changeHandler={(e) => handleChange({ Moderators: e?.map((item,index) => item?.value) })}
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

            <div className={`${styles.aboutDatePicker} ${styles.twoColumnDisplay} ${styles.marginBetweenInputs}`}>
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


            <div className={`${styles.totalDurationLable} ${styles.twoColumnDisplay} ${styles.marginBetweenInputs}`}>
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
                <p>Course discription :</p>

                <LabeledTextarea
                    inputOptions={{
                        inputName: 'description',
                        placeholder: 'Enter course discription',
                        rows: 5,
                        maxLength: 160,
                        value: courseMetaData?.description
                    }}
                    changeHandler={(e) => handleChange({ description: e?.target?.value })}
                />
            </div>

            <div className={`${styles.courseOutcome}`}>
                <p>Course Outcomes :</p>
                {/* <LabeledInput
                    inputOptions={{
                        inputName: 'name',
                        // label:'Learning Duration:',
                        placeholder: 'Enter course outcomes',
                        value: '',

                    }}
                    styleClass={`${styles.inputName1}`}
                    // changeHandler={(e) => changeHandler(e, vendorData, setVendorData)}
                    changeHandler={(e) => handleChange({ outcomes: e?.map((item)=>item?.value) })}
                    // changeHandler={(e) => handleChange({ language: e?.map((item) => item?.value) })}
                /> */}

                <BulletPointInput
                    placeholder='Enter course outcomes'
                    name="outcomes"
                // isError={!fullCourse?.outcomes?.length && courseError?.about}
                // isDisabled={isFreezed}
                />
            </div>

            <div className={`${styles.courseHighlights}`}>
                <label>Course Highlights :</label>
                {/* <LabeledInput
                    inputOptions={{
                        inputName: 'name',
                        // label:'Learning Duration:',
                        placeholder: 'Enter course highlights',
                        value: '',

                    }}
                    styleClass={`${styles.inputName1}`}
                // changeHandler={(e) => changeHandler(e, vendorData, setVendorData)}
                /> */}

                <BulletPointInput
                    placeholder='Enter course Highlights'
                    name="benefits"
                    // isError={!fullCourse?.outcomes?.length && courseError?.about}
                    // isDisabled={isFreezed}
                    customstyle={`${styles.courseHighlightBullet}`}
                />
            </div>

            <div className={`${styles.aboutInputContainer} ${styles.twoColumnDisplay} ${styles.marginBetweenInputs}`}>
                <div>
                    <p>Pre-requisites:</p>
                    {/* <LabeledInput
                        inputOptions={{
                            inputName: 'name',
                            // label:'Learning Duration:',
                            placeholder: 'Add pre-requisites and press enter',
                            value: '',

                        }}
                        styleClass={`${styles.inputName1}`}
                    // changeHandler={(e) => changeHandler(e, vendorData, setVendorData)}
                    /> */}
                    <BulletPointInput
                        placeholder='Enter course Highlights'
                        name="prequisites"
                        // isError={!fullCourse?.outcomes?.length && courseError?.about}
                        // isDisabled={isFreezed}
                        customstyle={`${styles.courseHighlightBullet}`}
                    />
                </div>
                <div>
                    <p>Related skills:</p>
                    {/* <LabeledInput
                        inputOptions={{
                            inputName: 'name',
                            // label:'Learning Duration:',
                            placeholder: 'Add related skills',
                            value: '',

                        }}
                        styleClass={`${styles.inputName1}`}
                    // changeHandler={(e) => changeHandler(e, vendorData, setVendorData)}
                    /> */}
                    <BulletPointInput
                        placeholder='Enter course Highlights'
                        name="relatedSkills"
                        // isError={!fullCourse?.outcomes?.length && courseError?.about}
                        // isDisabled={isFreezed}
                        customstyle={`${styles.courseHighlightBullet}`}
                    />
                </div>
            </div>

            <div className={`${styles.aboutInputContainer} ${styles.twoColumnDisplay} ${styles.marginBetweenInputs}`}>
                <div>
                    <p>Good for:</p>
                    {/* <LabeledInput
                        inputOptions={{
                            inputName: 'name',
                            // label:'Learning Duration:',
                            placeholder: 'Add good for and press enter',
                            value: '',

                        }}
                        styleClass={`${styles.inputName1}`}
                    // changeHandler={(e) => changeHandler(e, vendorData, setVendorData)}
                    /> */}

                    <BulletPointInput
                        placeholder='Add good for and press enter'
                        name="goodFor"
                        // isError={!fullCourse?.outcomes?.length && courseError?.about}
                        // isDisabled={isFreezed}
                        customstyle={`${styles.courseHighlightBullet}`}
                    />
                </div>
                <div>
                    <p>Good for:</p>
                    {/* <LabeledInput
                        inputOptions={{
                            inputName: 'name',
                            // label:'Learning Duration:',
                            placeholder: 'Add must for and press enter',
                            value: '',

                        }}
                        styleClass={`${styles.inputName1}`}
                    // changeHandler={(e) => changeHandler(e, vendorData, setVendorData)}
                    /> */}
                    <BulletPointInput
                        placeholder='Add must for and press enter'
                        name="mustFor"
                        // isError={!fullCourse?.outcomes?.length && courseError?.about}
                        // isDisabled={isFreezed}
                        customstyle={`${styles.courseHighlightBullet}`}
                    />
                </div>
            </div>

            <div className={`${styles.aboutCurriculum}`}>
                <div>
                    <p>Curriculum:</p>
                    <RTE
                        changeHandler={(e) => {
                            // if (examId && examTabData?.id !== examId) return;
                            // if (!examId && examTabData?.id) return;
                            // setExamTabData({ ...examTabData, instructions: e });
                             handleChange({Curriculum:e?.target?.value})
                        }}
                        // isReadOnly={isPreview}

                        placeholder="Enter instructions in less than 300 characters."
                    value={courseMetaData?.Curriculum}

                    />
                </div>
            </div>
    
            <NextBtn />
        </>
    )
};
export default About;