import { GET_PAGINATED_NOTIFICATIONS, notificationClient } from '@/api/NotificationClient';
import { loadQueryDataAsync } from '@/helper/api.helper';
import { FcmTokenAtom, getNotificationObj } from '@/state/atoms/notification.atom';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

export default function useHandleNotifications(btnRef) {
  const fcmToken = useRecoilValue(FcmTokenAtom);

  const [notifications, setNotifications] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);

  useEffect(() => {
    if (!fcmToken) return;
    if (!btnRef?.current) return;

    // load notifications if the user scrolls to bottom and pagecursor is present
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) setPageIndex((prev) => ++prev || null);
    });
    observer.observe(btnRef?.current);
  }, [fcmToken, btnRef?.current]);

  useEffect(() => {
    if (!fcmToken) return;
    if (!pageIndex) return;

    // load notification to display
    loadAllNotifications(fcmToken);
  }, [fcmToken, pageIndex]);

  async function loadAllNotifications(token = null) {
    if (!token) return;
    const queryVariables = { pageIndex, pageSize: 10 };
    // if (pageIndex) queryVariables.prevPageSnapShot = pageIndex;

    const allNotifications = await loadQueryDataAsync(
      GET_PAGINATED_NOTIFICATIONS,
      queryVariables,
      { context: { headers: { 'fcm-token': token } } },
      notificationClient
    );

    const messages = allNotifications?.getAllPaginatedNotifications || [];
    const isNotificationsAvailable = messages?.length === queryVariables.pageSize;

    if (!isNotificationsAvailable) setPageIndex(null);

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

  return { notifications, pageIndex, loadAllNotifications };
}
