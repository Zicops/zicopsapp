import { snakeCaseToTitleCase } from '@/helper/common.helper';
import { COURSE_TYPES } from '@/helper/constants.helper';
import { useHandleCatSubCat } from '@/helper/hooks.helper';
import { useEffect, useState } from 'react';
import LabeledDropdown from '../../common/FormComponents/LabeledDropdown';
import LabeledInput from '../../common/FormComponents/LabeledInput';
import styles from './coursesAccHead.module.scss';
const CoursesAccHead = ({
  isFolder = false,
  handleClick = () => {},
  courseCount = 0,
  getFilters = () => {}
}) => {
  const [filters, setFilters] = useState({
    searchQuery: '',
    cat: '',
    subCat: '',
    type: ''
  });
  const { catSubCat, setActiveCatId } = useHandleCatSubCat();

  useEffect(() => {
    getFilters(filters);
  }, [filters]);

  const Type = COURSE_TYPES?.map((v, i) => {
    return { value: v, label: snakeCaseToTitleCase(v), isDisabled: [1, 2].includes(i) };
  });
  return (
    <>
      <div className={`${styles.coursesAcc_Head}`}>
        <div className={styles.searchInputContainer}>
          <img src="/images/magnifier.png" height={20} alt="" />

          <LabeledInput
            styleClass={styles.inputField}
            inputOptions={{
              inputName: 'search',
              placeholder: 'Search',
              value: filters?.searchQuery
            }}
            changeHandler={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
          />
        </div>

        <LabeledDropdown
          dropdownOptions={{
            isSearchEnable: true,
            options: [{ value: '', label: '-- Select --' }, ...catSubCat?.cat],
            placeholder: 'Category',
            value: { value: filters?.cat, label: filters?.cat }
          }}
          changeHandler={(e) => {
            setActiveCatId(e);
            setFilters({ ...filters, cat: e.value, subCat: '' });
          }}
        />
        <LabeledDropdown
          dropdownOptions={{
            isSearchEnable: true,
            placeholder: 'Sub-Category',
            options: [{ value: '', label: '-- Select --' }, ...catSubCat?.subCat],
            value: { value: filters?.subCat, label: filters?.subCat }
          }}
          changeHandler={(e) => setFilters({ ...filters, subCat: e.value })}
        />
        <LabeledDropdown
          dropdownOptions={{
            isSearchEnable: true,
            placeholder: 'Type',
            options: [
              { value: '', label: '-- Select --' },
              ...Type,
              { value: 'Blog', label: 'Blog' },
              { value: 'Bookmarks', label: 'Bookmarks' }
            ],
            value: { value: filters?.type, label: filters?.type }
          }}
          changeHandler={(e) => setFilters({ ...filters, type: e.value })}
        />
        {isFolder && (
          <div className={`${styles.courseCount}`} data-count={courseCount}>
            <svg
              onClick={() => handleClick()}
              className={`${styles.folderSvg}`}
              width="60"
              height="45"
              viewBox="0 0 60 45"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M0.800049 44.8662V0.866211H22.4L28 6.46621H55.2001V12.5329H6.86671V38.8662L13.2667 17.8662H59.1334L50.9334 44.8662H0.800049Z"
                fill="#6BCFCF"
              />
            </svg>
          </div>
        )}
      </div>
    </>
  );
};

export default CoursesAccHead;
