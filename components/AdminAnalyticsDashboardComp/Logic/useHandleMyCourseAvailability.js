import { COURSE_STATUS } from '@/helper/constants.helper';
import { CourseTypeAtom } from '@/state/atoms/module.atoms';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { getAllCourseCount } from './adminAnalyticsDashboardComp.helper';

export default function useHandleMyCourseAvailability() {
  const courseType = useRecoilValue(CourseTypeAtom);

  const [publishCard, setPublishCard] = useState({
    id: 1,
    title: 'Published',
    image: '/images/svg/publish.svg',
    count: null,
    caption: 'Published courses',
  });
  const [readyCard, setReadyCard] = useState({
    id: 2,
    title: 'Ready for publishing',
    image: '/images/svg/done.svg',
    count: null,
    caption: 'Ready to be published',
  });
  const [savedCard, setSavedCard] = useState({
    id: 3,
    title: 'Saved',
    image: '/images/svg/save.svg',
    count: null,
    caption: 'Saved courses',
  });
  const [expiredCard, setExpiredCard] = useState({
    id: 4,
    title: 'Expired',
    image: '/images/svg/timer.svg',
    count: null,
    caption: 'Expired courses',
  });
  useEffect(() => {
    const _lspId = sessionStorage.getItem('lsp_id');

    loadAndSetMyCourseAvailability();

    async function loadAndSetMyCourseAvailability() {
      await getAllCourseCount(_lspId, COURSE_STATUS.publish, 'self-paced').then((resp) => {
        setPublishCard({ ...publishCard, count: resp?.getCourseCountStats?.count || 0 });
      });

      await getAllCourseCount(_lspId, COURSE_STATUS.save, 'self-paced').then((resp) => {
        setSavedCard({ ...savedCard, count: resp?.getCourseCountStats?.count || 0 });
      });

      await getAllCourseCount(_lspId, COURSE_STATUS.approvalPending, 'self-paced').then((resp) => {
        setExpiredCard({ ...expiredCard, count: resp?.getCourseCountStats?.count || 0 });
      });

      await getAllCourseCount(_lspId, COURSE_STATUS.reject, 'self-paced').then((resp) => {
        setReadyCard({ ...readyCard, count: resp?.getCourseCountStats?.count || 0 });
      });
    }
  }, [courseType]);

  return [publishCard, readyCard, savedCard, expiredCard];
}
