import LabeledRadioCheckbox from '../FormComponents/LabeledRadioCheckbox';
import styles from './tableSearchComp.module.scss';

let debounceTimer;
export default function TableSearchComp({
  filterOptions = [],
  options = [],
  handleFilterOptionChange = () => {},
  handleOptionChange = () => {},
  handleSearch = null,
  selectedFilter = null,
  delayMS = 1000
}) {
  function startSearch(val, delay) {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      handleSearch(val);
    }, delay);
  }

  return (
    <>
      <div className={styles.searchArea}>
        {!!filterOptions?.length && (
          <div className={`${styles.filterComp}`} style={{ display: 'flex' }}>
            <div className={`w-12`}>Filter By:</div>
            <div className={`w-75`} style={{ display: 'flex', gap: '20px' }}>
              {filterOptions?.map((op) => {
                return (
                  <LabeledRadioCheckbox
                    type="radio"
                    label={op?.label}
                    value={op?.value}
                    isChecked={op?.value === selectedFilter}
                    isDisabled={op?.isDisabled}
                    changeHandler={(e) => handleFilterOptionChange(e.target.value)}
                  />
                );
              })}
            </div>
          </div>
          // <select
          //   className={styles.search}
          //   name="search"
          //   onChange={(e) => handleFilterOptionChange(e?.target?.value)}>
          //   {filterOptions?.map((op) => {
          //     return (
          //       <option value={op?.value} disabled={op?.isDisabled}>
          //         {op?.label}
          //       </option>
          //     );
          // })}
          // </select>
        )}

        <div className={`${styles.searchComp}`}>
          {options?.length ? (
            <select
              className={styles.search}
              name="search"
              onChange={(e) => handleOptionChange(e?.target?.value)}>
              {options?.map((op) => {
                return (
                  <option value={op?.value} disabled={op?.isDisabled}>
                    {op?.label}
                  </option>
                );
              })}
            </select>
          ) : (
            ''
          )}
          {!!handleSearch && (
            <input
              className={styles.search}
              type="text"
              placeholder="Search..."
              onChange={(e) => {
                if (delayMS === 0) return handleSearch(e?.target?.value);

                startSearch(e.target.value, delayMS);
              }}
            />
          )}
        </div>
      </div>
    </>
  );
}
