import LabeledDropdown from "@/components/common/FormComponents/LabeledDropdown";
import styles from '../dashboardComponents.module.scss'

export default function Dropdown() {
     const options = ['Development','Design']?.map((lang) => ({ label: lang, value: lang }));

  return (
    <div>
      <LabeledDropdown
        styleClass={styles.dropdown}
        dropdownOptions={{
          isSearchEnable: true,
          placeholder: 'Category',
          options:  options ,
          value:  options[0],
          isSearchEnable: true,
        }}
      />
    </div>
  );
}
