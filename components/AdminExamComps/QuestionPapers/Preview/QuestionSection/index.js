import Accordion from '../../../../common/Accordion';
import McqCard from '../../../common/McqCard';
import styles from './questionSection.module.scss';

const QuestionSection = ({ data }) => {
  return (
    <>
      <div className={`${styles.sectionContainer}`}>
        {data?.sections?.map((section) => {
          // show questions only if not section wise
          if (!data.section_wise)
            return (
              <>
                {section?.questions?.map((question) => {
                  return (
                    <div>
                      <div className={`${styles.line}`}></div>
                      <McqCard questionData={question} />
                    </div>
                  );
                })}
              </>
            );

          return (
            <>
              <Accordion title={section?.name}>
                <div className={`${styles.questionTop}`}>
                  <p>{section?.description}</p>
                  <p>
                    Questions: <span>{section?.total_questions}</span>
                  </p>
                </div>

                {section?.questions?.map((question) => {
                  return (
                    <div>
                      <div className={`${styles.line}`}></div>
                      <McqCard questionData={question} />
                    </div>
                  );
                })}
              </Accordion>
            </>
          );
        })}
      </div>
    </>
  );
};

export default QuestionSection;
