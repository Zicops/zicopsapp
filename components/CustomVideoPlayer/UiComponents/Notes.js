import DraggableDiv from '../DraggableDiv';
import styles from '../customVideoPlayer.module.scss';
import FolderBar from './FolderBar';

export default function Notes() {
  return (
    <div className={`${styles.folderBarContainer}`}>
      <FolderBar />

      <div className={`${styles.notesCardsContainer}`}>
        <DraggableDiv> "Hello" </DraggableDiv>
        <DraggableDiv> "Hlo" </DraggableDiv>
        <DraggableDiv> "Hii" </DraggableDiv>
      </div>
    </div>
  );
}
