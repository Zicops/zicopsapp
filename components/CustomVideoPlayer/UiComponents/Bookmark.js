import { useState } from 'react';
import styles from '../customVideoPlayer.module.scss';
import FolderBar from './FolderBar';

export default function Bookmark({
  handleChange,
  value,
  handleSave,
  updateIsPlayingTo,
  playerState
}) {
  const [showAddBookmark, setShowAddBookmark] = useState(false);

  return (
    <div className={`${styles.folderBarContainer} ${styles.bookmarkContainer}`}>
      <FolderBar
        onPlusClick={() => {
          setShowAddBookmark(true);

          if (playerState?.isPlaying) updateIsPlayingTo(false);
        }}
      />

      {showAddBookmark && (
        <div className={`${styles.bookmarksInput}`}>
          <input
            className={`${styles.bookmarksField}`}
            type="text"
            placeholder="add bookmark title"
            onChange={handleChange}
            value={value}
            ref={(elem) => elem?.focus()}
            // onBlur={() => setShowAddBookmark(false)}
          />
          <button className={`${styles.bookmarksBtn}`} type="submit" onClick={handleSave}>
            Save Bookmark
          </button>
        </div>
      )}
    </div>
  );
}
