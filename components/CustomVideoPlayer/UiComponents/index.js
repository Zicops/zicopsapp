import Button from '../Button';
import Image from 'next/image';
import styles from '../customVideoPlayer.module.scss';
import useSaveData from '../Logic/useSaveData';
import { useContext, useState } from 'react';
import { truncateToN } from '../../../helper/common.helper';
import { CottageSharp } from '@mui/icons-material';
import { courseContext } from '../../../state/contexts/CourseContext';
import { useRecoilValue } from 'recoil';
import { VideoAtom } from '../../../state/atoms/video.atom';
import { ModuleAtom } from '../../../state/atoms/module.atoms';
import { filterModule } from '../../../helper/data.helper';

export default function UiComponents({ refs, updateIsPlayingTo, set }) {
  const { videoElement, videoContainer } = refs;
  const videoData = useRecoilValue(VideoAtom);
  const moduleData = useRecoilValue(ModuleAtom);
  const { fullCourse } = useContext(courseContext);

  const {
    handleBookmarkChange,
    bookmarkData,
    handleSaveBookmark,
    notes,
    handleNotesChange,
    handleSaveNotes
  } = useSaveData(videoElement);

  const PlayerClose = () => set(false);

  const [BookmarkShow, setBookmarkShow] = useState(false);

  function toggleBookmark() {
    setBookmarkShow((BookmarkShow) => !BookmarkShow);
  }

  const activeModule = filterModule(moduleData, videoData.currentModuleId);
  const currentTopic = videoData?.allModuleTopic
    ? videoData?.allModuleTopic[videoData?.currentTopicIndex]
    : null;
  const displaySequence = `M${activeModule?.sequence}T${currentTopic?.sequence}`;
  // const TopicSequence = 'M2T12';
  const courseTopicName = `${displaySequence} ${currentTopic?.name}`;

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
          <div className={`${styles.centerTextHeading}`}>{truncateToN(fullCourse?.name, 60)}</div>
          <div className={`${styles.centerTextSubheading}`}>{truncateToN(courseTopicName, 80)}</div>
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
