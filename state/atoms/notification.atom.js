import { atom } from 'recoil';

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
