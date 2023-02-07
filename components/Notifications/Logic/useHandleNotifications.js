import { GET_ALL_NOTIFICATIONS, notificationClient } from '@/api/NotificationClient';
import { loadAndCacheDataAsync } from '@/helper/api.helper';
import { FcmTokenAtom, getNotificationObj } from '@/state/atoms/notification.atom';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

export default function useHandleNotifications(btnRef) {
  const fcmToken = useRecoilValue(FcmTokenAtom);

  const [notifications, setNotifications] = useState([]);
  const [pageCursor, setPageCursor] = useState(null);

  useEffect(() => {
    if (!fcmToken) return;

    // load notification to display
    loadAllNotifications(fcmToken);

    if (!btnRef?.current) return;
    // load notifications if the user scrolls to bottom and pagecursor is present
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) loadAllNotifications(fcmToken);
    });
    observer.observe(btnRef?.current);
  }, [fcmToken, btnRef?.current]);

  async function loadAllNotifications(token = null) {
    if (!token) return;
    const queryVariables = { prevPageSnapShot: '', pageSize: 10 };
    if (pageCursor) queryVariables.prevPageSnapShot = pageCursor;

    const allNotifications = await loadAndCacheDataAsync(
      GET_ALL_NOTIFICATIONS,
      queryVariables,
      { context: { headers: { 'fcm-token': token } } },
      notificationClient
    );

    const messages = allNotifications?.getAll?.messages || [];
    setPageCursor(allNotifications?.getAll?.nextPageSnapShot || null);

    const allMsg =
      messages?.map((msg) =>
        getNotificationObj({
          title: msg?.title,
          body: msg?.body,
          isRead: !!msg?.is_read,
          img: `/images/${msg?.title || 'details'}.png`,
          link: msg?.link || '',
          route: '',
          fcmMessageId: msg?.message_id,
          duration: moment.unix(msg?.created_at).fromNow()
        })
      ) || [];

    setNotifications((prev) => [...prev, ...allMsg]);
  }

  return { notifications, pageCursor, loadAllNotifications };
}
