export default function TopicContentView({ topicContent, isSubtitleAdded }) {
  return (
    <>
      <div className="content_added">
        <div className="content_details">
          <div className="content_top">
            <span className="label">Content Type :</span>
            <span className="value">{topicContent.type}</span>
          </div>
          <div className="content_top">
            <span className="label">Duration :</span>
            <span className="value">{topicContent.duration + ' Sec'}</span>
          </div>
        </div>
        <div className="content_bar">
          <div className="language">{topicContent.language}</div>
          <div className="text">Content Added {isSubtitleAdded ? 'With Subtitle' : ''}</div>
        </div>
      </div>

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
      `}</style>
    </>
  );
}
