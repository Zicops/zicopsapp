import SectionTitle from './SectionTitle';

export default function TargetAudienceList({ goodFor = [], mustFor = [] }) {
  return (
    <>
      <SectionTitle title="Target Audience" />

      <div className="tab_section_summary">
        <div className="row mb_10">
          <div className="col_15">Good For :</div>
          <div className="col_75">
            <ul>
              {goodFor?.map((li, index) => (
                <li key={index}>{li}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="col_15">Must For :</div>
          <div className="col_75">
            <ul>
              {mustFor?.map((li, index) => (
                <li key={index}>{li}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* move to .scss */}
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
        `}
      </style>
    </>
  );
}
