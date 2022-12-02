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
    body: data.body || '',
    isRead: data.isRead || '',
    title: data.title || '',
    message_id: data.message_id || ''
  };
}
