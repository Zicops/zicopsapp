import BookmarkCard from '@/components/common/BookmarkCard';
import { userContext } from '@/state/contexts/UserContext';
import { useContext, useEffect, useState } from 'react';
import styles from '../customVideoPlayer.module.scss';
import FolderBar from './FolderBar';

export default function Bookmark({
  handleChange,
  value,
  handleSave,
  updateIsPlayingTo,
  playerState,
  bookmarkState,
  freezeState = []
}) {
  const [showAddBookmark, setShowAddBookmark] = useState(true);
  const [viewAllBookmarks, setViewAllBookmarks] = useState(false);
  const [freezeScreen, setFreezeScreen] = freezeState;
  const [bookmarkData, setBookmarkData] = bookmarkState;
  const { bookmarkData: allBookmarks } = useContext(userContext);

  useEffect(() => {
    setFreezeScreen(showAddBookmark);
  }, [showAddBookmark]);

  useEffect(() => {
    updateTimestamp();
  }, [playerState?.timestamp]);

  function updateTimestamp() {
    const timestampArr = playerState?.timestamp?.split(':');
    let _timestamp = `${timestampArr?.[1]}:${timestampArr?.[2]}`;
    if (timestampArr?.[0] !== '00') _timestamp += `${timestampArr?.[0]}:${_timestamp}`;

    setBookmarkData({ ...bookmarkData, timestamp: _timestamp });
  }

  return (
    <div className={`${styles.folderBarContainer} ${styles.bookmarkContainer}`}>
      <FolderBar
        onPlusClick={() => {
          setShowAddBookmark(true);
          updateTimestamp();

          if (playerState?.isPlaying) updateIsPlayingTo(false);
        }}
        onFolderClick={() => {
          setShowAddBookmark(false);
          setViewAllBookmarks(!viewAllBookmarks);
        }}
      />

      <div
        className={`${styles.notesCardsContainer} ${
          document.fullscreenElement ? styles.notesCardsContainerFS : ''
        } ${styles.bookmarkContainer}`}>
        {showAddBookmark ? (
          <div className={`${styles.bookmarksInput}`}>
            <div onClick={() => setShowAddBookmark(false)} className={`${styles.crossBtn}`}>
              X
            </div>

            <section>
              <span>{bookmarkData?.timestamp}</span>
              <span>-</span>

              <input
                className={`${styles.bookmarksField}`}
                type="text"
                placeholder="add bookmark title"
                onChange={(e) => setBookmarkData({ ...bookmarkData, title: e.target.value })}
                value={bookmarkData?.title}
                ref={(elem) => elem?.focus()}
                // onBlur={() => setShowAddBookmark(false)}
              />
            </section>

            <button
              className={`${styles.bookmarksBtn}`}
              type="submit"
              onClick={async () => {
                const isSaved = await handleSave();
                if (isSaved) setShowAddBookmark(false);
              }}>
              Save Bookmark
            </button>
          </div>
        ) : (
          <>
            {viewAllBookmarks && (
              <>
                {allBookmarks.map((bookmark, i) => (
                  <BookmarkCard data={bookmark} key={`${bookmark?.id}-${i}`} />
                ))}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
