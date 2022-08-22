// components\LearnerUserProfile\UserCohortTab\CohortPopUp\CoursesTab.js

import CourseLIstCard from '@/components/common/CourseLIstCard';
import SearchBar from '@/components/common/FormComponents/SearchBar';
import styles from '../../learnerUserProfile.module.scss';
import { courseData } from '../../Logic/userBody.helper';

export default function CoursesTab() {
  return (
    <div className={`${styles.courseTabContainer}`}>
      <div style={{ padding: '0px 5px 15px' }}>
        <SearchBar
          inputDataObj={{
            inputOptions: {
              inputName: 'filter',
              placeholder: 'Search Courses'
            }
          }}
        />
      </div>
      <div className={`${styles.listCardTabContainer}`}>
        <div className={`${styles.cardList}`}>
          {courseData?.map((course) => (
            <CourseLIstCard courseData={course} footerType={'completed'} />
          ))}
        </div>
      </div>
    </div>
  );
}
