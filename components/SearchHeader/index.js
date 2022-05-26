import { useRouter } from 'next/router';
import LabeledDropdown from '../common/FormComponents/LabeledDropdown';
import Button from '../CustomVideoPlayer/Button';
import styles from './searchHeader.module.scss'
export default function SearchHeader() {
  const router = useRouter();
  const { q } = router.query;

  const Type = [
    { value: 'Self Paced', label: 'Self Paced' },
    { value: 'Classroom', label: 'Classroom' },
    { value: 'Exam', label: 'Exam' },
    { value: 'Labs', label: 'Labs' },
    { value: 'Blog', label: 'Blog' },
    { value: 'Bookmarks', label: 'Bookmarks' }
  ];
  const Languages = [
    { value: 'Hindi', label: 'Hindi' },
    { value: 'English', label: 'English' },
    { value: 'Marathi', label: 'Marathi' },
    { value: 'Bengali', label: 'Bengali' }
  ];
  return (
    <div className={`${styles.searchHeader}`}>
      <div className={`${styles.searchQuery}`}>
        Showing results for <span>"{ q }"</span>
      </div>
      <div className={`${styles.bar}`}></div>
      <div className={`${styles.searchParamDropdowns}`}>
        {/* <div className="searchParamDropdownitem"> */}
        <LabeledDropdown
          dropdownOptions={{
            placeholder: 'Language',
            options: Languages
          }}
        />
        {/* </div> */}

        <LabeledDropdown
          dropdownOptions={{
            placeholder: 'Category',
            options: Type
          }}
        />
        <LabeledDropdown
          dropdownOptions={{
            placeholder: 'Sub-category',
            options: Type
          }}
        />
        <LabeledDropdown
          dropdownOptions={{
            placeholder: 'Type',
            options: Type
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
