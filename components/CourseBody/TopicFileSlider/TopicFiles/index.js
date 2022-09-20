import { FloatingNotesAtom } from '@/state/atoms/notes.atom';
import { userContext } from '@/state/contexts/UserContext';
import { useContext } from 'react';
import { useRecoilValue } from 'recoil';
import { ResourcesAtom } from '../../../../state/atoms/module.atoms';
import { getNotesCount, getResourceCount } from '../../Logic/courseBody.helper';

export default function TopicFiles({ data, handleClick, isResourceShown, isNotes }) {
  const isResourceActive = isResourceShown?.includes(data.id);
  const { bookmarkData } = useContext(userContext);

  const resources = useRecoilValue(ResourcesAtom);
  const notes = useRecoilValue(FloatingNotesAtom);
  let fileCount = isNotes ? getNotesCount(notes, data?.id) : getResourceCount(resources, data?.id);

  const styles = {
    fontSize: '1.25vw',
    padding: '10px',
    wordBreak: 'break-all'
  };
  if (data?.name?.length > 30) {
    styles.fontSize = '1.1vw';
    styles.padding = '0px';
  }
  if (data?.name?.length > 40) {
    styles.fontSize = '1vw';
    styles.padding = '0px';
  }

  if (!isNotes && !fileCount) return null;

  return (
    <>
      <div
        className={`topic ${isResourceActive ? 'highlight' : ''}`}
        onClick={() => handleClick(data)}>
        <div className="topic_head" style={styles}>
          {data.name}
        </div>

        <div className="topic_body" style={isNotes ? { padding: '10px' } : {}}>
          <div className="topic_data">
            <p>
              {fileCount} {isNotes ? 'Notes' : 'Files'}
            </p>
            {isNotes && (
              <p>{bookmarkData?.filter((bm) => bm?.topic_id === data?.id)?.length} Bookmarks</p>
            )}
          </div>

          <div className={`arrow_img ${isResourceActive ? 'rotate' : ''}`}>
            <img src="/images/right-arrow-white.png" alt="" />
          </div>
        </div>
      </div>

      {/* move to .scss */}
      <style jsx>
        {`
          .topic {
            background-color: #323232;
            padding: 10px 20px;
            border-radius: 5px;
            flex: 1;
            margin: 5px;
            border: 1px solid transparent;
            cursor: pointer;
          }
          .topic:hover,
          .highlight {
            border: 1px solid rgb(81, 190, 188);
          }
          .topic_head {
            display: flex;
            min-height: 50px;
            align-items: center;
            color: var(--primary);
            font-weight: 700;
            font-size: 1.25vw;
            padding: 10px;
            text-transform: capitalize;
            border-bottom: 1px solid var(--dark_three);
          }
          .topic_body {
            font-size: 1.1vw;
            color: var(--dark_three);
            padding: 20px 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .arrow_img img {
            width: 10px;
          }
          .rotate {
            transform: rotate(90deg);
          }
        `}
      </style>
    </>
  );
}
