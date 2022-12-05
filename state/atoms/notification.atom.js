import { atom } from 'recoil';

export const FcmTokenAtom = atom({
  key: 'FcmToken',
  default: null
});

export const NotificationAtom = atom({
  key: 'Notification',
  default: []
});

export function getNotificationObj(data) {
  return {
    title: data.title || '',
    body: data.body || '',
    isRead: data.isRead || false,
    img: data?.img || '',
    link: data?.link || '',
    route: data?.route || '',
    fcmMessageId: data.fcmMessageId || null,
    duration: data?.duration || ''
  };
}
