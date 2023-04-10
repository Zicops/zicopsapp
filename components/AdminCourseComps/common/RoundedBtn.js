import Button from '@/components/common/Button';
import styles from '../adminCourseComps.module.scss';

export default function RoundedBtn({
  display = '',
  isDisabled = false,
  handleClick = () => {},
  isActive = null
}) {
  return (
    <>
      <Button
        text={display}
        styleClass={`${styles.roundedBtn} ${!isActive ? '' : styles.active}`}
        isDisabled={isDisabled}
        clickHandler={handleClick}
      />
    </>
  );
}
