export default function Bar({ index, text, type }) {
  // let type = data.type;
  // let duration = data.duration;
  // let sub_lang = (data.lang)?data.lang:'';

  return (
    <>
      <div className="content_added">
        <div className="content_bar">
          <div className="index">{index}</div>
          <div className="text">{text}</div>
          <div className="type">{type}</div>
        </div>
      </div>

      <style jsx>{`
        .content_added {
          margin: 10px 30px;
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
        .content_bar .index {
          width: 15%;
        }
        .content_bar .text {
          width: 60%;
        }
        .content_bar .type {
          margin-left: auto;
        }
      `}</style>
    </>
  );
}
