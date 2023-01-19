import LabeledDropdown from '@/components/common/FormComponents/LabeledDropdown'
import styles from '../dashboardComponents.module.scss'

const categoryDropdownOptions = {
 
  inputName: 'category',
  label: 'Course Category',
  placeholder: 'Select the category of the course',
  options:['All categories','Development'],
  // value: fullCourse?.category
  //   ? { value: fullCourse?.category, label: fullCourse?.category }
  //   : null,
  isSearchEnable: true,
  isDisabled: false
};
export default function Dropdown() {
  return (
    <div>
        <LabeledDropdown
        styleClass={styles.dropdown}
        // isError={!fullCourse?.sub_category?.length && courseError?.master}
        // dropdownOptions={subcategoryDropdownOptions}
        // changeHandler={(e) =>
        //   changeHandler(e, fullCourse, updateCourseMaster, subcategoryDropdownOptions.inputName)
        // }
      />
    </div>
  )
}
