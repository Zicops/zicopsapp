export default function TimerDropdown() {

  return (
    <>
      <div className="smallDropdown">
        <select name="timeDropdown">
          <option value="Current Time">Current Time</option>
          <option value="Time Left">Time Left</option>
        </select>
      </div>
      <style jsx>
        {`
          .smallDropdown {
            padding: 0 !impoptant;
            margin-bottom: 10px;
          }
          .smallDropdown select {
            background-color: var(--darkThree);
            color: var(--white);
            border: 0;
            border-bottom: 1px solid grey;
          }
          .smallDropdown select:focus {
            outline: none;
          }
        `}
      </style>
    </>
  );
}
