import { useRecoilValue } from 'recoil';
import { ChapterAtom, ModuleAtom, QuizAtom, TopicAtom } from '../../../../state/atoms/module.atoms';

export default function Inclusions({ languages }) {
  const moduleData = useRecoilValue(ModuleAtom);
  const chapter = useRecoilValue(ChapterAtom);
  const topic = useRecoilValue(TopicAtom);
  const quizData = useRecoilValue(QuizAtom);

  return (
    <>
      <div className="tab_heading">Course Inclusion</div>

      <div className="tab_section_summary">
        <div className="row mb_10">
          <div className="col_50 label">
            Languages <span>:</span>
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
              Modules: {moduleData.length}, Chapters: {chapter.length}, Topics: {topic.length}
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
          <div className="col_50">{topic?.filter((t) => t.type === 'Labs')?.length}</div>
        </div>
        <div className="row">
          <div className="col_50 label">
            Assessments <span>:</span>
          </div>
          <div className="col_50">{topic?.filter((t) => t.type === 'Assessment')?.length}</div>
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
