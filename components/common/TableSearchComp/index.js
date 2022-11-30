import styles from './tableSearchComp.module.scss';

let debounceTimer;
export default function TableSearchComp({
  options = [],
  handleOptionChange = () => {},
  handleSearch = () => {},
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
        <input
          className={styles.search}
          type="text"
          placeholder="Search..."
          onChange={(e) => {
            if (delayMS === 0) return handleSearch(e?.target?.value);

            startSearch(e.target.value, delayMS);
          }}
        />
      </div>
    </>
  );
}
