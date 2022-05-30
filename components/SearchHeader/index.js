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
        Showing results in{' '}
        <span className={`${styles.colorWhite}`}>
          "English + Developement + Java Beginner + Self paced"
        </span>{' '}
        for <span>"{q}"</span>
      </div>
      <div className={`${styles.bar}`}></div>
      <div className={`${styles.searchParamDropdowns}`}>
        <LabeledDropdown
          dropdownOptions={{
            isSearchEnable: true,
            placeholder: 'Language',
            options: Languages,
            // changeHandler: handleInputChange,
            value: ''
          }}
        />
        <LabeledDropdown
          dropdownOptions={{
            isSearchEnable: true,
            placeholder: 'Category',
            options: Type
          }}
        />
        <LabeledDropdown
          dropdownOptions={{
            isSearchEnable: true,
            placeholder: 'Sub-category',
            options: Type
          }}
        />
        <LabeledDropdown
          dropdownOptions={{
            isSearchEnable: true,
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
