import { useContext, useEffect, useState } from 'react';
import { courseContext } from '../../../state/contexts/CourseContext';
import AboutCard from './AboutCard';
import Inclusions from './Inclusions';
import Lists from './Lists';
import TargetAudienceList from './TargetAudienceList';

export default function CourseBodyAbout() {
  const { fullCourse } = useContext(courseContext);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    setIsDataLoaded(!!fullCourse.name);
  }, [fullCourse]);

  return (
    <>
      <div className="CardCourseAbout">
        <AboutCard isDataLoaded={isDataLoaded} fullCourse={fullCourse} />
      </div>

      <div className="compo_row">
        <div className="col_50 small_compo">
          <Lists title="Benefits" list={fullCourse.benefits} />
        </div>

        <div className="col_50 small_compo">
          <Lists title="Learning Objective" list={fullCourse.outcomes} />
        </div>
      </div>

      <div className="compo_row">
        <div className="col_50 small_compo">
          <Lists title="Pre-quisites" list={fullCourse.prequisites} />
        </div>

        <div className="col_50 small_compo">
          <TargetAudienceList goodFor={fullCourse.goodFor} mustFor={fullCourse.mustFor} />
        </div>
      </div>

      <div className="compo_row">
        <div className="col_50 small_compo">
          <Inclusions
            languages={fullCourse.language}
            quizCount={2}
            labsCount={4}
            assesmentCount={3}
          />
        </div>

        <div className="col_50 small_compo">
          <Lists title="Related Skills" list={fullCourse.related_skills} isPills={true} />
        </div>
      </div>

      {/* move to .scss */}
      <style jsx>
        {`
          .CardCourseAbout {
            margin: 50px calc(5.5% + 25px) 25px;
            background-color: #323232;
            padding: 50px;
            border-radius: 5px;
          }

          .compo_row {
            display: flex;
            width: 100%;
            padding: 0 5.5%;
            font-size: 0.9vw;
          }
          .small_compo {
            flex: 1;
            background-color: #323232;
            margin: 25px;
            padding: 50px;
            border-radius: 5px;
          }
        `}
      </style>
    </>
  );
}
