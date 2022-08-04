// components\LearnerUserProfile\UserCohortTab\CohortPopUp\CoursesTab.js

import CourseLIstCard from '@/components/common/CourseLIstCard';
import SearchBar from '@/components/common/FormComponents/SearchBar';
import styles from '../../learnerUserProfile.module.scss';
import { courseData } from '../../Logic/userBody.helper';

export default function CoursesTab() {
  return (
    <div className={`${styles.courseTabContainer}`}>
      <SearchBar
        inputDataObj={{
          inputOptions: {
            inputName: 'filter',
            placeholder: 'Search Courses'
          }
        }}
      />

      <div className={`${styles.cardList}`}>
        {courseData?.map((course) => (
          <CourseLIstCard courseData={course} />
        ))}
      </div>
    </div>
  );
}
