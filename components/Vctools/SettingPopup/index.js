import LabeledDropdown from "@/components/common/FormComponents/LabeledDropdown";
import RangeSlider from "@/components/common/FormComponents/RangeSlider";
import StyledSlider from "@/components/common/FormComponents/RangeSlider/StyledSlider";
import styles from "../vctoolMain.module.scss"
import style from "./vctoolSetting.module.scss"
const SettingPopup = ({ hide }) => {
    return (
        <div className={`${styles.vcToolSettingContainer}`}>
            <div className={`${styles.vctToolSettingHead}`}>
                <div>Settings</div>
                <button onClick={() => {
                    hide()
                }}>
                    <img src="/images/svg/vctool/close.svg" />
                </button>
            </div>

            <div className={`${styles.vcToolSettingScreen}`}>
                <div className={`${style.audioAndVideoSettingContainer}`}>
                    <p>Audio & Video</p>
                    <div>
                        <p>Microphone :</p>
                        <LabeledDropdown
                            styleClass={style.settingInputLable}
                            // isError={!fullCourse?.language?.length && courseError?.master}
                            dropdownOptions={{
                                placeholder: "Built-in Audio",
                            }}
                        // changeHandler={(e) =>
                        //     changeHandler(e, fullCourse, updateCourseMaster, languageDropdownOptions.inputName)
                        // }
                        />
                    </div>
                    <div>
                        <p>Speaker :</p>
                        <LabeledDropdown
                            styleClass={style.settingInputLable}
                            // isError={!fullCourse?.language?.length && courseError?.master}
                            dropdownOptions={{
                                placeholder: "Realtek Audio",
                            }}
                        // changeHandler={(e) =>
                        //     changeHandler(e, fullCourse, updateCourseMaster, languageDropdownOptions.inputName)
                        // }
                        />
                    </div>
                    <div>
                        <p>Camera :</p>
                        <LabeledDropdown
                            styleClass={style.settingInputLable}
                            // isError={!fullCourse?.language?.length && courseError?.master}
                            dropdownOptions={{
                                placeholder: "Integrated Camera",
                            }}
                        // changeHandler={(e) =>
                        //     changeHandler(e, fullCourse, updateCourseMaster, languageDropdownOptions.inputName)
                        // }
                        />
                    </div>
                </div>

                <div className={`${style.vctoolPerformanceContainer}`}>
                    <p>Audio & Video</p>
                    <div className={`${styles.rsliderContainer}`}>
                       <RangeSlider/>
                    </div>
                </div>

                <div className={`${style.vctoolLayout}`}>
                    <p>Layout</p>
                </div>
            </div>
        </div>
    )
};
export default SettingPopup;