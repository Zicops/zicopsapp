import styles from '../customVideoPlayer.module.scss';

export default function FolderBar({ onPlusClick, onFolderClick, count = null }) {
  return (
    <div className={`${styles.folderBar}`}>
      <section onClick={onPlusClick}>
        <img src="/images/plus_big.png" alt="" />
      </section>

      {/* <section onClick={onMinusClick}>
        <div></div>
      </section> */}

      <section
        onClick={onFolderClick}
        className={`${count != null ? styles.showCount : ''}`}
        data-count={count}>
        <img src="/images/svg/folder-primary.svg" alt="" />
      </section>
    </div>
  );
}
