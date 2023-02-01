import { COURSE_TYPES, LANGUAGES } from '@/helper/constants.helper';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { changeHandler, snakeCaseToTitleCase } from '@/helper/common.helper';
import LabeledDropdown from '@/common/FormComponents/LabeledDropdown';
import Button from '../../CustomVideoPlayer/Button';
import styles from '../search.module.scss';

export default function SearchHeader({
  filters,
  setFilters,
  clearAllFilters,
  catSubCat,
  setActiveCatId,
  isFiltersDisabled = false
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

  const Type = COURSE_TYPES?.map((v, i) => {
    return { value: v, label: snakeCaseToTitleCase(v), isDisabled: [1, 2].includes(i) };
  });

  const Languages = LANGUAGES?.map((lang) => ({ value: lang, label: lang }));

  function displaySearchText() {
    const displayFilters = [];
    if (!!filters?.lang) displayFilters.push({ filter: 'language', value: filters?.lang });
    if (!!filters?.category) displayFilters.push({ filter: 'category', value: filters?.category });
    if (!!filters?.subCategory)
      displayFilters.push({ filter: 'sub-category', value: filters?.subCategory });
    if (!!filters?.type) displayFilters.push({ filter: 'type', value: filters?.type });

    if (!searchQuery && !displayFilters?.length) return '';

    return (
      <>
        Showing results{' '}
        {!!searchQuery && (
          <>
            for <span>"{searchQuery}" </span>
          </>
        )}
        {!!displayFilters?.length && (
          <>
            in{' '}
            {displayFilters?.map((item, i) => {
              return (
                <>
                  {item?.filter}=<span>{item.value}</span>
                  {displayFilters?.length === i + 1 ? '' : ', '}
                </>
              );
            })}
          </>
        )}
      </>
    );
  }

  return (
    <div className={`${styles.searchHeader}`}>
      <div className={`${styles.searchQuery}`}>{displaySearchText()}</div>

      <div className={`${styles.bar}`}></div>

      <div className={`${styles.searchParamDropdowns}`}>
        <LabeledDropdown
          styleClass={styles.dropdown}
          dropdownOptions={{
            isSearchEnable: true,
            placeholder: 'Language',
            options: [{ value: '', label: '-- Select --' }, ...Languages],
            value: { value: filters.lang, label: filters.lang },
            isDisabled: isFiltersDisabled,
            isSearchEnable: true
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
            isDisabled: isFiltersDisabled,
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
            isDisabled: isFiltersDisabled,
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
            value: { value: filters.type, label: snakeCaseToTitleCase(filters.type) },
            isDisabled: isFiltersDisabled
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
