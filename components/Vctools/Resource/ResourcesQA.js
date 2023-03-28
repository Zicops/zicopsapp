import LabeledDropdown from "@/components/common/FormComponents/LabeledDropdown";
import styles from "../vctoolMain.module.scss"
const ResourcesQA = () => {
    return (
        <div className={`${styles.resourcesQAContainer}`}>
            <p>Add new resources</p>
            <div className={`${styles.resourcesInputs}`}>
                <p>Type:</p>
                <LabeledDropdown
                    styleClass={styles.resourceInputLable}
                    // isError={!fullCourse?.language?.length && courseError?.master}
                    dropdownOptions={{
                        placeholder: "Link",
                    }}
                // changeHandler={(e) =>
                //     changeHandler(e, fullCourse, updateCourseMaster, languageDropdownOptions.inputName)
                // }
                />
            </div>
            <div className={`${styles.resourcesInputs}`}>
                <p>Type:</p>
               <input placeholder="Enter resource name" className={`${styles.resourceName}`} type="text"/>
            </div>

            <div className={`${styles.resourcedragAndDropContainer}`}>
               <p>Upload:</p>
               <div className={`${styles.resourcedragAndDrop}`}></div>
            </div>
        </div>
    )
};
export default ResourcesQA;