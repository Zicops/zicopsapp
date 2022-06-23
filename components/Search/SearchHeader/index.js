import { useRouter } from 'next/router';
import { changeHandler } from '../../../helper/common.helper';
import LabeledDropdown from '../../common/FormComponents/LabeledDropdown';
import Button from '../../CustomVideoPlayer/Button';
import styles from '../search.module.scss';

export default function SearchHeader({ filters, setFilters, clearAllFilters }) {
  const router = useRouter();
  const { searchQuery } = router.query;

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

  const isFilterPresent =
    !!filters.lang && filters.category && !!filters.subCategory && !!filters.type;

  function isPresent(keyArr) {
    const isValuePresent = keyArr.some((key) => {
      return !!filters[key];
    });

    return isValuePresent ? '+' : '';
  }
  const isMultiFilterPresent =
    !!filters.lang && filters.category && !!filters.subCategory && !!filters.type;

  return (
    <div className={`${styles.searchHeader}`}>
      <div className={`${styles.searchQuery}`}>
        Showing results {isFilterPresent && 'in'}{' '}
        <span className={`${styles.colorWhite}`}>
          {`
            ${
              filters.lang
                ? `${filters.lang} ${isPresent(['category', 'subCategory', 'type'])}`
                : ''
            } 
            ${filters.category ? `${filters.category} ${isPresent(['subCategory', 'type'])}` : ''} 
            ${filters.subCategory ? `${filters.subCategory} ${isPresent(['type'])}` : ''} 
            ${filters.type ? filters.type : ''}
          `}
          {/* "English + Developement + Java Beginner + Self paced" */}
        </span>{' '}
        for <span>"{searchQuery}"</span>
      </div>

      <div className={`${styles.bar}`}></div>

      <div className={`${styles.searchParamDropdowns}`}>
        <LabeledDropdown
          dropdownOptions={{
            isSearchEnable: true,
            placeholder: 'Language',
            options: Languages,
            value: { value: filters.lang, label: filters.lang }
          }}
          changeHandler={(e) => changeHandler(e, filters, setFilters, 'lang')}
        />
        <LabeledDropdown
          dropdownOptions={{
            isSearchEnable: true,
            placeholder: 'Category',
            options: Type,
            value: { value: filters.category, label: filters.category },
            isSearchEnable: true
          }}
          changeHandler={(e) => changeHandler(e, filters, setFilters, 'category')}
        />
        <LabeledDropdown
          dropdownOptions={{
            isSearchEnable: true,
            placeholder: 'Sub-category',
            options: Type,
            value: { value: filters.subCategory, label: filters.subCategory },
            isSearchEnable: true
          }}
          changeHandler={(e) => changeHandler(e, filters, setFilters, 'subCategory')}
        />
        <LabeledDropdown
          dropdownOptions={{
            isSearchEnable: true,
            placeholder: 'Type',
            options: Type,
            value: { value: filters.type, label: filters.type }
          }}
          changeHandler={(e) => changeHandler(e, filters, setFilters, 'type')}
        />

        <div className={`${styles.applyBtn}`}>
          <Button> Apply </Button>
          <span onClick={clearAllFilters}>Clear All</span>
        </div>
      </div>

      <br />
    </div>
  );
}
