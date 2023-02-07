import { FullCourseDataAtom } from '@/state/atoms/course.atoms';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

export default function useHandleMyCourseAvailability() {
  const cardStatusGlobal = useRecoilValue(FullCourseDataAtom);
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
    setPublishCard(() => {
      let publishCount = cardStatusGlobal?.status;
      if (publishCount === 'PUBLISHED') {
        return { ...previousData, cardCount: publishCount?.length };
      }
    });
  }, [cardStatusGlobal?.status?.length]);
  return [publishCard, readyCard, savedCard, expiredCard];
}
