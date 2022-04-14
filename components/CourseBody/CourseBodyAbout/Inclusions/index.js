export default function Inclusions({
  languages,
  moduleCount,
  chapterCount,
  topicCount,
  labsCount,
  assesmentCount,
  quizCount
}) {
  return (
    <>
      <div className="tab_heading">Course Inclusion</div>

      <div className="tab_section_summary">
        <div className="row mb_10">
          <div className="col_50 label">
            Multilingual Support <span>:</span>
          </div>
          <div className="col_50">
            {languages.map((e, i) => (
              <span key={i}>{e}, </span>
            ))}
          </div>
        </div>
        <div className="row mb_10">
          <div className="col_50 label">
            Structured View <span>:</span>
          </div>
          <div className="col_50">
            <span>
              Modules: {moduleCount}, Chapters: {chapterCount}, Topics: {topicCount}
            </span>
          </div>
        </div>
        <div className="row mb_10">
          <div className="col_50 label">
            Interactive Quizzes <span>:</span>
          </div>
          <div className="col_50">{quizCount}</div>
        </div>
        <div className="row mb_10">
          <div className="col_50 label">
            Practice Exercises & Labs <span>:</span>
          </div>
          <div className="col_50">{labsCount}</div>
        </div>
        <div className="row">
          <div className="col_50 label">
            Assessments <span>:</span>
          </div>
          <div className="col_50">{assesmentCount}</div>
        </div>
      </div>
      <style jsx>
        {`
          .tab_heading {
            color: var(--primary);
            font-size: 1.5vw;
            padding-bottom: 15px;
            font-weight: 700;
          }
          .tab_section_summary {
            color: var(--primary);
            font-size: 0.9em;
          }
          .tab_section_summary ul {
            padding: 0 15px;
            list-style-type: none;
          }
          .tab_section_summary ul li {
            margin: 5px 0;
          }
          .label {
            display: flex;
            justify-content: space-between;
            margin-right: 20px;
          }
        `}
      </style>
    </>
  );
}
