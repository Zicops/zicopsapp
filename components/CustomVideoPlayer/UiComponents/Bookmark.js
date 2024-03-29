import BookmarkCard from '@/components/common/BookmarkCard';
import { VideoAtom } from '@/state/atoms/video.atom';
import { courseContext } from '@/state/contexts/CourseContext';
import { userContext } from '@/state/contexts/UserContext';
import { useContext, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import styles from '../customVideoPlayer.module.scss';
import FolderBar from './FolderBar';

export default function Bookmark({
  handleSave,
  updateIsPlayingTo,
  playerState,
  bookmarkState,
  freezeState = [],
  submitIsDisable
}) {
  const videoData = useRecoilValue(VideoAtom);

  const [showAddBookmark, setShowAddBookmark] = useState(true);
  const [viewAllBookmarks, setViewAllBookmarks] = useState(false);
  const [freezeScreen, setFreezeScreen] = freezeState;
  const [bookmarkData, setBookmarkData] = bookmarkState;

  const { bookmarkData: allBookmarks } = useContext(userContext);
  const { fullCourse } = useContext(courseContext);

  useEffect(() => {
    setFreezeScreen(showAddBookmark);
  }, [showAddBookmark]);

  useEffect(() => {
    updateTimestamp();
  }, [playerState?.timestamp]);

  function updateTimestamp() {
    setBookmarkData({ ...bookmarkData, time_stamp: playerState?.timestamp });
  }

  return (
    <div className={`${styles.folderBarContainer} ${styles.bookmarkContainer}`}>
      <FolderBar
        onPlusClick={() => {
          setShowAddBookmark(true);
          setViewAllBookmarks(false);
          updateTimestamp();

          if (playerState?.isPlaying) updateIsPlayingTo(false);
        }}
        count={
          allBookmarks?.filter(
            (bookmark) => bookmark?.topic_id === videoData?.topicContent[0]?.topicId
          )?.length || 0
        }
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
              <span>{bookmarkData?.time_stamp}</span>
              <span>-</span>

              <input
                className={`${styles.bookmarksField}`}
                type="text"
                placeholder="add bookmark title"
                onChange={(e) => setBookmarkData({ ...bookmarkData, name: e.target.value })}
                value={bookmarkData?.name}
                ref={(elem) => elem?.focus()}
                // onBlur={() => setShowAddBookmark(false)}
              />
            </section>

            <button
              className={`${styles.bookmarksBtn}`}
              disabled={submitIsDisable}
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
                {allBookmarks?.map((bookmark, i) => {
                  if (bookmark?.topic_id !== videoData?.topicContent[0]?.topicId) return null;

                  return (
                    <BookmarkCard
                      data={{
                        img: fullCourse?.tileImg,
                        courseName: fullCourse?.name,
                        title: bookmark?.name,
                        timestamp: bookmark?.time_stamp
                      }}
                      key={`${bookmark?.user_bm_id}-${i}`}
                    />
                  );
                })}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
