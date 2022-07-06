import DraggableDiv from '../DraggableDiv';
import styles from '../customVideoPlayer.module.scss';

export default function FolderBar() {
  return (
    <div className={`${styles.folderBar}`}>
      <section>
        <img src="/images/plus_big.png" alt="" />
      </section>

      <section>
        <div></div>
      </section>

      <section>
        <img src="/images/svg/folder-primary.svg" alt="" />
      </section>
    </div>
  );
}
