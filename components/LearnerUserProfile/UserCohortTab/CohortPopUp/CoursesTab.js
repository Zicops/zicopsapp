// components\LearnerUserProfile\UserCohortTab\CohortPopUp\CoursesTab.js

import { GET_COHORT_COURSES, queryClient } from '@/api/Queries';
import CourseLIstCard from '@/components/common/CourseLIstCard';
import SearchBar from '@/components/common/FormComponents/SearchBar';
import { loadQueryDataAsync } from '@/helper/api.helper';
import { changeHandler } from '@/helper/common.helper';
import useUserCourseData from '@/helper/hooks.helper';
import { getUserData } from '@/helper/loggeduser.helper';
import { SelectedCohortDataAtom } from '@/state/atoms/users.atom';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import styles from '../../learnerUserProfile.module.scss';
import { courseData } from '../../Logic/userBody.helper';

export default function CoursesTab() {
  const [selectedCohort, setSelectedCohort] = useRecoilState(SelectedCohortDataAtom);
  const [searchQuery, setSearchQuery] = useState('');
  const [courseProgress, setCourseProgress] = useState([]);
  const { getUserCourseData, getCohortUserData } = useUserCourseData();
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    if (!selectedCohort?.main?.cohort_id) return;
    if (selectedCohort?.cohrotCourses?.length)
      return setCourseProgress([...selectedCohort?.cohrotCourses], setLoading(false));

    //loading cohort courses and user course progress
    //getting cohort courses

    const { id } = getUserData();
    const user_id = id;
    const userCourses = await getUserCourseData(100);
    if (!userCourses?.length) return setLoading(false);
    const cohortCourses = await loadQueryDataAsync(
      GET_COHORT_COURSES,
      { cohort_id: selectedCohort?.main?.cohort_id },
      {},
      queryClient
    );
    if (cohortCourses?.error)
      return setToastMsg({ type: 'danger', message: 'Error while loading cohort courses!' });

    // const courseIds = cohortCourses?.getCohortCourseMaps?.length? (cohortCourses?.getCohortCourseMaps?.map((item)=> {item?.CourseId})):[];

    const _cohortCourses = cohortCourses?.getCohortCourseMaps;

    if (!_cohortCourses?.length) return setLoading(false);

    const _userCohortCourse = [];

    //common between usercourses and cohortcourses progress
    for (let i = 0; i < _cohortCourses?.length; i++) {
      for (let j = 0; j < userCourses?.length; j++) {
        // console.log(userCourses[j]?.id, _cohortCourses[i]);
        if (userCourses[j]?.id === _cohortCourses[i]?.CourseId) {
          _userCohortCourse.push({
            ...userCourses[j],
            ExpectedCompletion: _cohortCourses[i]?.ExpectedCompletion
          });
        }
      }
    }

    if (!_userCohortCourse?.length) return setLoading(false);

    setSelectedCohort((prevValue) => ({ ...prevValue, cohrotCourses: [..._userCohortCourse] }));

    return setCourseProgress([..._userCohortCourse], setLoading(false));
  }, [selectedCohort]);
  return (
    <div className={`${styles.courseTabContainer}`}>
      <div style={{ padding: '0px 5px 15px' }}>
        <SearchBar
          inputDataObj={{
            inputOptions: {
              inputName: 'filter',
              placeholder: 'Search Courses',
              value: searchQuery
            },
            changeHandler: (e) => setSearchQuery(e.target.value)
          }}
        />
      </div>
      <div className={`${styles.listCardTabContainer}`}>
        <div className={`${styles.cardList}`}>
          {loading ? (
            <strong className={`${styles.fallbackMsg}`}>Loading Courses...</strong>
          ) : (
            !courseProgress?.length && (
              <strong className={`${styles.fallbackMsg}`}>No Courses Found</strong>
            )
          )}
          {courseProgress?.map((course) => {
            if (!course?.name?.toLowerCase()?.trim()?.includes(searchQuery?.toLowerCase()?.trim()))
              return null;

            return <CourseLIstCard courseData={course} footerType={'onGoing'} />;
          })}
        </div>
      </div>
    </div>
  );
}
