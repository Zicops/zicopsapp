import LabeledDropdown from '../common/FormComponents/LabeledDropdown';
import Button from '../CustomVideoPlayer/Button';
import styles from './searchHeader.module.scss'
export default function SearchHeader() {
  return (
    <div className={`${styles.searchHeader}`}>
      <div className={`${styles.searchQuery}`}>
        Showing results for <span>"Design"</span>
      </div>
      <div className={`${styles.bar}`}></div>
      <div className={`${styles.searchParamDropdowns}`}>
        {/* <div className="searchParamDropdownitem"> */}
        <LabeledDropdown
          dropdownOptions={{
            placeholder: 'Language',
            options: {}
          }}
        />
        {/* </div> */}

        <LabeledDropdown
          dropdownOptions={{
            placeholder: 'Category',
            options: {}
          }}
        />
        <LabeledDropdown
          dropdownOptions={{
            placeholder: 'Sub-category',
            options: {}
          }}
        />
        <LabeledDropdown
          dropdownOptions={{
            placeholder: 'Type',
            options: {}
          }}
        />
        <div className={`${styles.applyBtn}`}>
          <Button> Apply </Button>
          <span>Clear All</span>
        </div>
      </div>
      <br />
    </div>
  );
};
