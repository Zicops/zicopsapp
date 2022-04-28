import { useRecoilValue } from 'recoil';
import { filterTopicContent } from '../../../../../helper/data.helper';
import { TopicContentAtom, TopicSubtitleAtom } from '../../../../../state/atoms/module.atoms';

export default function TopicContentView({ topicId, toggleTopicContentForm }) {
  const topicSubtitle = useRecoilValue(TopicSubtitleAtom);
  const topicContent = useRecoilValue(TopicContentAtom);
  const filteredTopicContent = filterTopicContent(topicContent, topicId);

  return (
    <>
      {filteredTopicContent && !!filteredTopicContent.length && (
        <>
          {filteredTopicContent.map((content, index) => {
            const isSubtitleAdded = topicSubtitle[index]?.file || topicSubtitle[index]?.subtitleUrl;
            return (
              <div className="content_added" key={content.language}>
                <div className="content_details">
                  <div className="content_top">
                    <span className="label">Content Type :</span>
                    <span className="value">{content.type}</span>
                  </div>
                  <div className="content_top">
                    <span className="label">Duration :</span>
                    <span className="value">{content.duration + ' Sec'}</span>
                  </div>
                </div>
                <div className="content_bar">
                  <div className="language">{content.language}</div>
                  <div className="text">Content Added {isSubtitleAdded ? 'With Subtitle' : ''}</div>
                </div>
              </div>
            );
          })}

          <button className="transparent_button" onClick={toggleTopicContentForm}>
            <span>
              <img src="/images/plus.png" alt="" />
            </span>
            <span>Add Language</span>
          </button>
        </>
      )}

      <style jsx>{`
        .content_added {
          margin: 10px 30px;
        }
        .content_details {
          font-size: 13px;
          display: flex;
          justify-content: space-between;
        }
        .content_details .label {
          color: #868f8f;
        }
        .content_details .value {
          margin-left: 5px;
        }

        .content_bar {
          margin: 10px 0;
          padding: 5px 20px;
          border-radius: 8px;
          display: flex;

          color: #000000;
          background-color: #868f8f;

          font-size: 14px;
          font-width: 700;
          text-transform: uppercase;
        }
        .content_bar .language {
        }
        .content_bar .text {
          margin: auto;
        }

        .transparent_button {
          background-color: transparent;
          color: #868f8f;
          font-family: 'Open Sans';
          border: none;

          cursor: pointer;
          transition: all 0.3s;

          display: flex;
          margin-left: auto;
        }
        .transparent_button:hover {
          color: #ffffff;
        }
        .transparent_button span img {
          width: 13px;
          height: 13px;
          margin-right: 10px;
        }
      `}</style>
    </>
  );
}
