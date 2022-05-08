export default function ExamFooter() {
  return (
    <div className="footer-panel">
      <div className="left-text">Status:</div>
      <div className="right-text">
        <button>Cancel</button>

        <button>Add</button>
      </div>

      {/* move style to it .scss */}
      <style jsx>{`
        .footer-panel {
          color: var(--white);
          height: 65px;
          // box-shadow: -2px 2px 10px 0 #000000, 2px -2px 5px 0 #686868;
          background-color: #000000;
          border-radius: 0 0 10px 10px;

          display: flex;
          justify-content: space-between;
          align-items: center;

          position: absolute;
          width: 100%;
          bottom: 0;
        }
        .left-text {
          margin-left: 50px;
          font-size: 14px;
        }
        .right-text {
          margin-right: 50px;
        }
        button {
          padding: 10px 20px;
          background-color: transparent;
          color: #858f8f;
          border-radius: 50px;
          min-width: 155px;
          margin: 5px;
          font-family: 'Open Sans';
          font-size: 13px;
          font-weight: 800;
          cursor: pointer;
        }
        button:hover {
          box-shadow: 0 0 10px 0 #959595;
        }
      `}</style>
    </div>
  );
}
