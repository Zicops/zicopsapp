import { subCategory } from '@/components/LearnerUserProfile/Logic/userData.helper';
import { COURSE_TYPES, LANGUAGES } from '@/helper/constants.helper';
import { loadCatSubCat } from '@/helper/data.helper';
import { useHandleCatSubCat } from '@/helper/hooks.helper';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { changeHandler, snakeCaseToTitleCase } from '../../../helper/common.helper';
import LabeledDropdown from '../../common/FormComponents/LabeledDropdown';
import Button from '../../CustomVideoPlayer/Button';
import styles from '../search.module.scss';

export default function SearchHeader({
  filters,
  setFilters,
  clearAllFilters,
  catSubCat,
  setActiveCatId
}) {
  const router = useRouter();
  const { searchQuery } = router.query;

  useEffect(() => {
    const { subCat, lang, cat, type } = router.query;
    const _filters = structuredClone(filters);
    if (subCat) _filters.subCategory = subCat;
    if (lang) _filters.lang = lang;
    if (cat) _filters.category = cat;
    if (type) _filters.type = type;
    setFilters(_filters);
  }, [router.query]);
  // cat and sub cat
  // const [catAndSubCatOption, setCatAndSubCatOption] = useState({ cat: [], subCat: [] });

  const Type = COURSE_TYPES?.map((v, i) => {
    return { value: v, label: snakeCaseToTitleCase(v), isDisabled: [1, 2].includes(i) };
  });
  // const Type = [
  //   { value: 'Self Paced', label: 'Self Paced' },
  //   { value: 'Classroom', label: 'Classroom' },
  //   { value: 'Exam', label: 'Exam' },
  //   { value: 'Labs', label: 'Labs' },
  //   { value: 'Blog', label: 'Blog' },
  //   { value: 'Bookmarks', label: 'Bookmarks' }
  // ];

  // update sub cat based on cat
  // loadCatSubCat(catAndSubCatOption, setCatAndSubCatOption, filters?.category);

  const Languages = LANGUAGES?.map((lang) => ({ value: lang, label: lang }));
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
          styleClass={styles.dropdown}
          dropdownOptions={{
            isSearchEnable: true,
            placeholder: 'Language',
            options: Languages,
            value: { value: filters.lang, label: filters.lang }
          }}
          changeHandler={(e) => changeHandler(e, filters, setFilters, 'lang')}
        />
        <LabeledDropdown
          styleClass={styles.dropdown}
          dropdownOptions={{
            isSearchEnable: true,
            placeholder: 'Category',
            options: [{ value: '', label: '-- Select --' }, ...catSubCat?.cat],
            value: { value: filters.category, label: filters.category },
            isSearchEnable: true
          }}
          changeHandler={(e) => {
            setActiveCatId(e);
            setFilters({ ...filters, category: e.value, subCategory: null });
          }}
        />
        <LabeledDropdown
          styleClass={styles.dropdown}
          dropdownOptions={{
            isSearchEnable: true,
            placeholder: 'Sub-category',
            options: [{ value: '', label: '-- Select --' }, ...catSubCat?.subCat],
            value: { value: filters.subCategory, label: filters.subCategory },
            isSearchEnable: true
          }}
          changeHandler={(e) => changeHandler(e, filters, setFilters, 'subCategory')}
        />
        <LabeledDropdown
          styleClass={styles.dropdown}
          dropdownOptions={{
            isSearchEnable: true,
            placeholder: 'Type',
            options: [
              { value: '', label: '-- Select --' },
              ...Type,
              { value: 'Blog', label: 'Blog' },
              { value: 'Bookmarks', label: 'Bookmarks' }
            ],
            value: { value: filters.type, label: snakeCaseToTitleCase(filters.type) }
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
