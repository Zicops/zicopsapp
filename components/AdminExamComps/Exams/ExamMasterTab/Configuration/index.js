import styles from '../examMasterTab.module.scss';
import SwitchButton from '../../../../common/SwitchButton';

export default function Configuration() {
  return (
    <div className={`${styles.configurationContainer}`}>
      <SwitchButton text={'Question Shuffling'} />
      <SwitchButton text={'Display Answer Hints'} />
      <SwitchButton text={'Show right Answers on finish'} />
      <SwitchButton text={'Show result on finish'} />
    </div>
  );
}
