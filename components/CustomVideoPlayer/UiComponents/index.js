import Button from '../Button';
import Image from 'next/image';
import styles from '../customVideoPlayer.module.scss';
import useSaveData from '../Logic/useSaveData';
import { useState } from 'react';
import { truncateToN } from '../../../helper/common.helper';
import { CottageSharp } from '@mui/icons-material';

export default function UiComponents({ refs, updateIsPlayingTo, set }) {
  const {
    handleBookmarkChange,
    bookmarkData,
    handleSaveBookmark,
    notes,
    handleNotesChange,
    handleSaveNotes
  } = useSaveData(videoElement);

  const PlayerClose = () => set(false);
  const { videoElement, videoContainer } = refs;

  const [BookmarkShow, setBookmarkShow] = useState(false);

  function toggleBookmark() {
    setBookmarkShow((BookmarkShow) => !BookmarkShow);
  }

  const courseName = truncateToN("This is a Course Name This is a Course Name This is a Course", 60);

  const TopicSequence = "M2T12";
  const courseTopicName = truncateToN(TopicSequence+": This is a Course Name for demo run ", 80);

  return (
    <>
      <div className={`${styles.topIconsContainer}`}>
        <div className={`${styles.firstIcon}`} onClick={PlayerClose}>
          <Image src="/images/bigarrowleft.png" width="20px" height="20px" alt="" />
        </div>
        <div className={`${styles.leftIcons}`}>
          <Button>
            <Image src="/images/4019936_2.png" alt="" height="30px" width="28px" />
          </Button>
          <Button>
            <Image src="/images/pot-plant-icon.png" alt="" height="30px" width="30px" />
          </Button>
          <Button>
            <Image
              src="/images/conversation-icon-png-clipart2.png"
              alt=""
              height="30px"
              width="30px"
            />
          </Button>
        </div>
        <div className={`${styles.centerText}`}>
          <div className={`${styles.centerTextHeading}`}>
          {courseName}
          </div>
          <div className={`${styles.centerTextSubheading}`}>
          {courseTopicName}
          </div>
        </div>
        <div className={`${styles.rightIcons}`}>
          <Button>
            <Image
              src="/images/bookmark2.png"
              alt=""
              height="30px"
              width="18px"
              onMouseEnter={() => {
                toggleBookmark();
                updateIsPlayingTo(false);
              }}
            />
          </Button>
          <Button>
            <Image src="/images/Notes Icon2.png" alt="" height="25px" width="25px" />
          </Button>
          <Button>
            <Image src="/images/Quiz Icon2.png" alt="" height="30px" width="30px" />
          </Button>
        </div>
        <div className={`${styles.lastIcon}`}></div>
      </div>
      {/* <div className={`${styles.bookmarkBtn}`}>
          <button onClick={() => updateIsPlayingToPlay(false)}>Bookmark</button>
        </div> */}
      {/* <div className={`${styles.drawer}`}> */}
      {BookmarkShow && (
        <div className={`${styles.bookmarksInput}`}>
          <input
            className={`${styles.bookmarksField}`}
            type="text"
            placeholder="add bookmark title"
            onChange={handleBookmarkChange}
            value={bookmarkData.title}
          />
          <button
            className={`${styles.bookmarksBtn}`}
            type="submit"
            onClick={() => {
              handleSaveBookmark(playerState.progress);
            }}>
            Save Bookmark
          </button>
        </div>
      )}
      {/* <div className={`${styles.NotesInputBox}`}>
            <input
              type="text"
              placeholder="add notes title"
              onChange={handleNotesChange}
              value={notes.title}
              name="title"
            />
            <textarea
              placeholder="add notes"
              onChange={handleNotesChange}
              value={notes.notes}
              name="notes"
            />
            <button
              type="submit"
              onClick={() => {
                handleSaveNotes(playerState.progress);
              }}>
              Save Notes
            </button>
          </div> */}
      <div id="output"></div>
    </>
  );
}
