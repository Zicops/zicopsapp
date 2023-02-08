import LabeledDropdown from "@/components/common/FormComponents/LabeledDropdown";
import styles from '../dashboardComponents.module.scss'

export default function Dropdown({ placeholder, options, value, dropdownOptionsProps = {}, changeHandler = () => {} }) {
  return (
    <div>
      <LabeledDropdown
        styleClass={styles.dropdown}
        dropdownOptions={{
          ...dropdownOptionsProps,
          isSearchEnable: true,
          placeholder: placeholder,
          options: options,
          value: value
        }}
        changeHandler={changeHandler}
      />
    </div>
  );
}
