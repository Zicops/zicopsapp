const Bookmark = ({ img, timestamp, title, notes, handlePlay }) => {
  return (
    <>
      <div className="bookmark">
        <div className="image-box">
          <img src={img} alt="" />
        </div>
        <div className="data">
          <div className="data-time">{timestamp}</div>
          <div className="data-title">{title}</div>
          <div className="data-title">{notes}</div>
          <div className="data-btn">
            <button>Play</button>
          </div>
        </div>
      </div>

      <style jsx>
        {`
          .bookmark {
            display: flex;
            flex: 1;
            background-color: #323232;
            color: var(--primary);
            border: 1px solid transparent;
            border-radius: 5px;
            padding: 10px;
            margin-bottom: 15px;
          }
          // .bookmark:hover{
          //     border:1px solid rgb(81, 190, 188);
          // }
          .image-box img {
            border: 2px solid rgb(81, 190, 188);
            width: 150px;
            height: 100px;
            object-fit: cover;
          }
          .data {
            position: relative;
            padding: 5px 25px;
          }
          .data-time,
          .data-title {
            color: rgb(81, 190, 188);
            font-weight: 700;
            font-size: 1.2vw;
          }
          .data-btn button {
            padding: 8px 35px;
            font-size: 0.9vw;
            color: rgb(81, 190, 188);
            background-color: #323232;
            border: 1px solid rgb(81, 190, 188);
            position: absolute;
            bottom: 5px;
            cursor: pointer;
          }
          .data-btn button:hover {
            color: var(--dark_two);
            background-color: var(--primary);
          }
        `}
      </style>
    </>
  );
};
export default Bookmark;
