import LabeledDropdown from '../../common/FormComponents/LabeledDropdown';
import LabeledInput from '../../common/FormComponents/LabeledInput';
import styles from './coursesAccHead.module.scss';
const CoursesAccHead = ({ isFolder = false, handleClick = () => {}, courseCount = 0 }) => {
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
