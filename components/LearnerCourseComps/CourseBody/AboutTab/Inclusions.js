import { COURSE_TOPIC_TYPES } from '@/helper/constants.helper';
import { useRecoilValue } from 'recoil';
import { QuizAtom } from '../../../../state/atoms/module.atoms';
import {
  ActiveCourseDataAtom,
  AllCourseModulesDataAtom,
} from '../../atoms/learnerCourseComps.atom';
import SectionTitle from './SectionTitle';

export default function Inclusions({ languages = [] }) {
  const activeCourseData = useRecoilValue(ActiveCourseDataAtom);
  const allModules = useRecoilValue(AllCourseModulesDataAtom);
  let chapterCount = 0;
  let topicCount = 0;
  let assessmentCount = 0;
  let labsCount = 0;

  allModules?.forEach((mod) => {
    mod?.chapters?.forEach((chap) => {
      if (chap?.id) ++chapterCount;
      topicCount += chap?.topics?.length;

      chap?.topics?.forEach((top) => {
        if (top?.type === COURSE_TOPIC_TYPES.assessment) ++assessmentCount;
        if (top?.type === COURSE_TOPIC_TYPES.lab) ++labsCount;
      });
    });
  });
  const quizData = useRecoilValue(QuizAtom);

  return (
    <>
      <SectionTitle title="Course Inclusion" />

      <div className="tab_section_summary">
        <div className="row mb_10">
          <div className="col_50 label">
            Languages <span>:</span>
          </div>
          <div className="col_50">
            {languages?.map((e, i) => (
              <span key={i}>
                {e}
                {i + 1 === languages?.length ? '' : ', '}
              </span>
            ))}
          </div>
        </div>
        <div className="row mb_10">
          <div className="col_50 label">
            Structured View <span>:</span>
          </div>
          <div className="col_50">
            <span>
              Modules: {allModules?.length}, Chapters: {chapterCount}, Topics: {topicCount}
            </span>
          </div>
        </div>
        <div className="row mb_10">
          <div className="col_50 label">
            Interactive Quizzes <span>:</span>
          </div>
          <div className="col_50">{quizData?.length || 0}</div>
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
          <div className="col_50">{assessmentCount}</div>
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
