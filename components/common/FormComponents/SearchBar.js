import styles from './formComponents.module.scss';
import LabeledInput from './LabeledInput';

export default function SearchBar({ inputDataObj = {} }) {
  return (
    <div className={styles.searchInputContainer}>
      <img src="/images/magnifier.png" height={20} alt="" />

      <LabeledInput {...inputDataObj} />
    </div>
  );
}
