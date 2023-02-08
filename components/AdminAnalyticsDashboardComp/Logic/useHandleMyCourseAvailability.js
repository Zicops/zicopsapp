// import { FullCourseDataAtom } from '@/state/atoms/course.atoms';
import { GET_BASIC_COURSES_STATS } from '@/api/Queries';
import { loadQueryDataAsync } from '@/helper/api.helper';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

export default function useHandleMyCourseAvailability() {
  const [publishCard, setPublishCard] = useState({
    id: 1,
    cardTitle: 'Published',
    cardImage: '/images/svg/publish.svg',
    cardCount: null,
    cardText: 'Published courses'
  });
  const [readyCard, setReadyCard] = useState({
    id: 2,
    cardTitle: 'Ready for publishing',
    cardImage: '/images/svg/done.svg',
    cardCount: null,
    cardText: 'Ready to be published'
  });
  const [savedCard, setSavedCard] = useState({
    id: 3,
    cardTitle: 'Saved',
    cardImage: '/images/svg/save.svg',
    cardCount: null,
    cardText: 'Saved courses'
  });
  const [expiredCard, setExpiredCard] = useState({
    id: 4,
    cardTitle: 'Expired',
    cardImage: '/images/svg/timer.svg',
    cardCount: null,
    cardText: 'Expired courses'
  });
  useEffect(() => {
    const _lspId = sessionStorage.getItem('lsp_id');
     loadQueryDataAsync(GET_BASIC_COURSES_STATS, {
       input: {
         lsp_id: _lspId,
         course_status: 'PUBLISHED',
        //  course_type: 'self-paced',
        //  languages: ['English']
       }
     }).then((data) => {
       console.info(data);
     });
    setPublishCard((previousData) => {
      let course_status = 'PUBLISHED';
      const myPublishCourses = course_status;
      return { ...previousData, cardCount: myPublishCourses?.length };
    });
    setSavedCard((previousData) => {
         let course_status = 'SAVED';
         const mySavedCourses = course_status;
         return { ...previousData, cardCount: mySavedCourses?.length };
    });
     setExpiredCard((previousData) => {
       let course_status = 'REJECTED';
       const myExpiredCourses = course_status;
       return {...previousData, cardCount:myExpiredCourses?.length};
     });

  }, []);
  return [publishCard, readyCard, savedCard, expiredCard];
}
