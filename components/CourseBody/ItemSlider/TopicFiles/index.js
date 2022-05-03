export default function TopicFiles({ fileCount, topic, handleClick, isResourceShown }) {
  const isResourceActive = isResourceShown?.includes(topic.id);

  return (
    <>
      <div
        className={`topic ${isResourceActive ? 'highlight' : ''}`}
        onClick={() => handleClick(topic)}>
        <div className="topic_head">{topic.name}</div>
        <div className="topic_body">
          <div className="topic_data">
            <p>{fileCount} Files</p>
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
