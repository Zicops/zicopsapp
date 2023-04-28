import styles from '../../learnerCourseComps.module.scss';
import SectionTitle from './SectionTitle';

export default function Lists({ title = '', list = [], isPills = false }) {
  return (
    <>
      <SectionTitle title={title} />

      <div
        className={`${styles.listContainer}`}
        style={isPills ? { display: 'flex', flexWrap: 'wrap' } : {}}>
        {isPills ? (
          list?.map((li, index) => (
            <div key={index} className={`${styles.pills}`}>
              {li}
            </div>
          ))
        ) : (
          <ul>
            {list?.map((li) => (
              <li key={li}>{li}</li>
            ))}
          </ul>
        )}
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
          }
          .tab_section_summary ul li {
            margin: 10px 0;
          }

          .tab_section_summary .pills {
            border: 2px solid var(--primary);
            padding: 10px 20px;
            margin-right: 20px;
            margin-bottom: 20px;
            border-radius: 20px;
          }
        `}
      </style>
    </>
  );
}
