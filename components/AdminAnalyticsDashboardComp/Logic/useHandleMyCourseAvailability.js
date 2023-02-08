// import { FullCourseDataAtom } from '@/state/atoms/course.atoms';
import { GET_BASIC_COURSES_STATS } from '@/api/Queries';
import { loadQueryDataAsync } from '@/helper/api.helper';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

export default function useHandleMyCourseAvailability() {
  const [publishCard, setPublishCard] = useState({
    id: 1,
    title: 'Published',
    image: '/images/svg/publish.svg',
    count: null,
    description: 'Published courses'
  });
  const [readyCard, setReadyCard] = useState({
    id: 2,
    title: 'Ready for publishing',
    image: '/images/svg/done.svg',
    count: null,
    description: 'Ready to be published'
  });
  const [savedCard, setSavedCard] = useState({
    id: 3,
    title: 'Saved',
    image: '/images/svg/save.svg',
    count: null,
    description: 'Saved courses'
  });
  const [expiredCard, setExpiredCard] = useState({
    id: 4,
    title: 'Expired',
    image: '/images/svg/timer.svg',
    count: null,
    description: 'Expired courses'
  });
  useEffect(() => {
    const _lspId = sessionStorage.getItem('lsp_id');
    loadQueryDataAsync(GET_BASIC_COURSES_STATS, {
      input: {
        lsp_id: _lspId,
        course_status: 'PUBLISHED'
        //  course_type: 'self-paced',
        //  languages: ['English']
      }
    }).then((data) => {
      console.info(data);
    });
    setPublishCard((previousData) => {
      let course_status = 'PUBLISHED';
      const myPublishCourses = course_status;
      return { ...previousData, count: myPublishCourses?.length };
    });
    setSavedCard((previousData) => {
      let course_status = 'SAVED';
      const mySavedCourses = course_status;
      return { ...previousData, count: mySavedCourses?.length };
    });
    setExpiredCard((previousData) => {
      let course_status = 'REJECTED';
      const myExpiredCourses = course_status;
      return { ...previousData, count: myExpiredCourses?.length };
    });
  }, []);
  return [publishCard, readyCard, savedCard, expiredCard];
}
