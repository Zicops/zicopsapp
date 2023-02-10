// import { FullCourseDataAtom } from '@/state/atoms/course.atoms';
import { COURSE_STATUS } from '@/helper/constants.helper';
import { CourseTypeAtom } from '@/state/atoms/module.atoms';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { getAllCourseCountInLsp } from './adminAnalyticsDashboardComp.helper';

export default function useHandleMyCourseAvailability() {
  const courseType = useRecoilValue(CourseTypeAtom);

  const [publishCard, setPublishCard] = useState({
    id: 1,
    title: 'Published',
    image: '/images/svg/publish.svg',
    count: null,
    caption: 'Published courses'
  });
  const [readyCard, setReadyCard] = useState({
    id: 2,
    title: 'Ready for publishing',
    image: '/images/svg/done.svg',
    count: null,
    caption: 'Ready to be published'
  });
  const [savedCard, setSavedCard] = useState({
    id: 3,
    title: 'Saved',
    image: '/images/svg/save.svg',
    count: null,
    caption: 'Saved courses'
  });
  const [expiredCard, setExpiredCard] = useState({
    id: 4,
    title: 'Expired',
    image: '/images/svg/timer.svg',
    count: null,
    caption: 'Expired courses'
  });
  useEffect(() => {
    const _lspId = sessionStorage.getItem('lsp_id');

    loadAndSetMyCourseAvailability();

    async function loadAndSetMyCourseAvailability() {
      const publishedCourseCount = getAllCourseCountInLsp(
        _lspId,
        courseType,
        COURSE_STATUS.publish
      );
      const savedCourseCount = getAllCourseCountInLsp(_lspId, courseType, COURSE_STATUS.save);
      const expiredCourseCount = getAllCourseCountInLsp(_lspId, courseType, COURSE_STATUS.reject);
      const readyCourseCount = getAllCourseCountInLsp(
        _lspId,
        courseType,
        COURSE_STATUS.approvalPending
      );

      setPublishCard({ ...publishCard, count: await publishedCourseCount });
      setSavedCard({ ...savedCard, count: await savedCourseCount });
      setExpiredCard({ ...expiredCard, count: await expiredCourseCount });
      setReadyCard({ ...readyCard, count: await readyCourseCount });
    }
  }, [courseType]);
  return [publishCard, readyCard, savedCard, expiredCard];
}
