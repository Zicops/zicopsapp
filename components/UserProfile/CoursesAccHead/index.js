import LabeledDropdown from '../../common/FormComponents/LabeledDropdown';
import LabeledInput from '../../common/FormComponents/LabeledInput';
import styles from './coursesAccHead.module.scss';
const CoursesAccHead = () => {
  return (
    <>
      <div className={`${styles.coursesAcc_Head}`}>
        <div className={styles.searchInputContainer}>
          <img src="/images/magnifier.png" height={20} alt="" />

          <LabeledInput
            styleClass={styles.inputField}
            inputOptions={{
              inputName: 'search',
              placeholder: 'Search'
            }}
          />
        </div>

        <LabeledDropdown
          dropdownOptions={{
            isSearchEnable: true,
            placeholder: 'Category'
          }}
          changeHandler
        />
        <LabeledDropdown
          dropdownOptions={{
            isSearchEnable: true,
            placeholder: 'Sub-Category'
          }}
          changeHandler
        />
        <LabeledDropdown
          dropdownOptions={{
            isSearchEnable: true,
            placeholder: 'Type'
          }}
          changeHandler
        />
      </div>
    </>
  );
};

export default CoursesAccHead;
