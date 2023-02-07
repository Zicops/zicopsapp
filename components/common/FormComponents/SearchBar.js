import styles from './formComponents.module.scss';
import LabeledInput from './LabeledInput';

export default function SearchBar({ inputDataObj = {}, styleClass = '' }) {
  return (
    <div className={`${styles.searchInputContainer} ${styleClass}`}>
      <img src="/images/magnifier.png" height={20} alt="" />

      <LabeledInput {...inputDataObj} />
    </div>
  );
}
