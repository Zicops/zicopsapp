import styles from './textHeaderWithEditIcon.module.scss';

export default function TextHeaderWithEditIcon({headingText, showIcon = true, handleClick}) {
  return (
    <>
      <div className={`${styles.textEditIcon}`}>
        <div className={`${styles.text}`}>{headingText}</div>
        {showIcon && (
          <div className={`${styles.Icon}`} onClick={handleClick}>
            {/* //toggleEditable */}
            <img src="/images/svg/edit.svg" />
          </div>
        )}
      </div>
      <hr />
    </>
  );
}
