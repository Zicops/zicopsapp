import styles from './adminHeader.module.scss';

export default function AdminSubHeader({
  extraLeftCompArr = [],
  leftBtnData = [],
  dropdownData = {}
}) {
  const [btn1, btn2] = leftBtnData;
  const { label, isHidden = false, handleChange, inputName } = dropdownData;

  return (
    <div className={styles.subHeader}>
      <div className={styles.left}>
        {!!btn1 && btn1?.isHidden !== true && (
          <button onClick={btn1?.handleClick}>{btn1?.text}</button>
        )}

        {!!btn2 && btn2?.isHidden !== true && (
          <button onClick={btn2?.handleClick}>{btn2?.text}</button>
        )}
        {extraLeftCompArr}
      </div>

      {!isHidden && (
        <div className={styles.right}>
          <label htmlFor="dropdown">{label}</label>
          <select name={inputName} id="dropdown" onChange={handleChange}>
            <option value="Internal">Internal</option>
            <option value="External">External</option>
          </select>
        </div>
      )}
    </div>
  );
}
